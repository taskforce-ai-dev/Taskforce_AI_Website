<?php
/**
 * Blog soft-404 guard.
 *
 * The /blog/* rewrite in .htaccess sends any blog URL that has NO prerendered
 * static file to this script — that's either a brand-new post not yet built, OR
 * a deleted / renamed / garbage slug. We must tell the two apart so we keep
 * "instant publish" working WITHOUT turning every non-existent blog URL into a
 * soft 404 (the old behaviour served the homepage at HTTP 200 for all of them).
 *
 *   - Slug exists in WordPress -> HTTP 200 + SPA shell (post renders live)
 *   - No such post             -> real HTTP 404
 *   - WordPress unreachable     -> fail OPEN to 200 shell (never hide a real post)
 *
 * Prerendered posts never reach this file: the .htaccess `!-f` check serves
 * their static HTML directly, so this runs only on the rare blog "miss".
 */

$docroot  = __DIR__;
$shell    = $docroot . '/index.html';
$notFound = $docroot . '/404.html';

function tf_serve(string $file, int $status): void {
    http_response_code($status);
    header('Content-Type: text/html; charset=UTF-8');
    // A "miss" response must never be cached as the canonical copy of this URL:
    // a slug that 404s today may be a real post tomorrow (and vice versa).
    header('Cache-Control: no-store, must-revalidate');
    if (is_readable($file)) {
        readfile($file);
    } elseif ($status === 404) {
        echo 'Not Found';
    }
    exit;
}

// --- resolve the requested slug ---------------------------------------------
$uri  = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '';
$path = trim($uri, '/');                        // e.g. "blog/my-post"
$rest = preg_replace('#^blog/?#', '', $path);   // "my-post" (or "" for /blog)
$slug = strtok($rest, '/');                     // first path segment only
if ($slug === false) {
    $slug = '';
}

// The /blog listing itself (no slug) is a real page — serve the shell.
if ($slug === '') {
    tf_serve($shell, 200);
}

// Real WordPress slugs are lowercase alphanumeric + hyphens. Anything else
// cannot be a valid post slug, so 404 immediately (also keeps the WP query clean
// and prevents any injection into the outbound URL).
if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
    tf_serve($notFound, 404);
}

// --- ask WordPress whether a post with this slug exists ---------------------
// wp.taskforceai.tech/wp-json is intentionally public (see the headless posture
// in CLAUDE.md), so this server-side read needs no auth. The host is hardcoded
// because this shim runs on the server with no build-time env — keep its host in
// sync with VITE_WP_API.
$endpoint = 'https://wp.taskforceai.tech/wp-json/wp/v2/posts?_fields=id&slug='
          . rawurlencode($slug);

$exists = null; // null = could not determine (treat as WP unreachable)

if (function_exists('curl_init')) {
    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_TIMEOUT        => 4,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    ]);
    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($body !== false && $code >= 200 && $code < 300) {
        $data   = json_decode($body, true);
        $exists = is_array($data) && count($data) > 0;
    }
}

// --- decide -----------------------------------------------------------------
if ($exists === true) {
    tf_serve($shell, 200);    // real post -> instant publish preserved
}
if ($exists === false) {
    tf_serve($notFound, 404); // confirmed missing -> proper 404 (no more soft 404)
}

// WordPress unreachable/timed out: fail open to the shell (HTTP 200), matching
// the old behaviour, so a genuine new post is never hidden by a transient WP
// hiccup. This only affects unbuilt/garbage slugs, which are rare.
tf_serve($shell, 200);
