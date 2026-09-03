import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { SEO } from '../seo/SEO';

const logoWordmark = new URL(
  '../../Logo_Files/Taskforce Ai logo - Name Horizontal/Taskforce-Ai-logo---Name-Horizontal-reverse.png',
  import.meta.url
).href;

// Direct WhatsApp click-to-chat link, Meta format: full international number,
// no "+"/spaces/dashes. This is the SINGLE destination of the manual button.
const WHATSAPP_NUMBER = '94776697566';
const WHATSAPP_MESSAGE =
  "Hi TaskForce AI, I saw your ad and I'd like to know more about your AI voice agents and automation.";
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/**
 * Google Ads bridge/landing page for WhatsApp campaigns.
 *
 * Google disapproves ads whose Final URL is a raw wa.me link ("Destination
 * Mismatch"). This page is the compliant destination: real branding + content +
 * contact info + Privacy/Terms, hosted on our own domain. The visitor MUST tap
 * the button to reach WhatsApp — there is deliberately NO auto-redirect
 * (no meta refresh, no timer, no window.location), which is what triggers the
 * disapproval/suspension. It is noindex (an ad page, not organic content) but
 * stays crawlable so Google Ads review can read it.
 */
export const Chat: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col">
      <SEO
        title="Chat with TaskForce AI on WhatsApp"
        description="Message the TaskForce AI team on WhatsApp for instant pricing, a free consultation, and answers about our AI voice agents and business automation."
        url="/chat"
        noindex
      />

      {/* Header / branding — must match the Google Ads account business name */}
      <header className="w-full border-b border-white/10">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="TaskForce AI home">
            <img
              src={logoWordmark}
              alt="TaskForce AI"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
            Sri Lanka · Middle East
          </span>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 flex flex-col items-center justify-center text-center py-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Team online now
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Chat with our team on WhatsApp
          </h1>

          <p className="text-lg text-gray-300 mb-3">
            Get instant pricing and a free consultation on{' '}
            <strong className="text-white">AI voice agents</strong> and{' '}
            <strong className="text-white">business automation</strong> for your company.
          </p>
          <p className="text-sm text-gray-400 mb-10">
            Tap the button below to open WhatsApp and message us directly — a real
            member of the TaskForce AI team will reply.
          </p>

          {/* The one manual call-to-action. No auto-redirect anywhere on this
              page: the visitor must click this to reach WhatsApp. */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-black font-bold text-lg shadow-[0_0_40px_rgba(37,211,102,0.35)] transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            Chat on WhatsApp
          </a>

          <p className="text-xs text-gray-500 mt-4">
            Prefer not to use WhatsApp? Reach us through any option below.
          </p>

          {/* Alternative contact — helps Google's automated review confirm this
              is a genuine business page. */}
          <div className="grid sm:grid-cols-3 gap-4 mt-14 text-left">
            <a
              href="mailto:info@taskforceai.tech"
              className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <Mail className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300 break-all">info@taskforceai.tech</span>
            </a>
            <a
              href="tel:+94776697566"
              className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <Phone className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">+94 77 669 7566</span>
            </a>
            <address className="not-italic flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <MapPin className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">
                Nugegoda Business Centre, Unit 37, 2nd Floor, 80 Nawala Road,
                Nugegoda 10250
              </span>
            </address>
          </div>
        </div>
      </main>

      {/* Footer with Privacy + Terms links (required for Google Ads approval) */}
      <footer className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} TaskForce AI</span>
          <nav className="flex items-center gap-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};
