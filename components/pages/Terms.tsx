import React from 'react';
import { SEO } from '../seo/SEO';
import { Footer } from '../layout/Footer';

const LAST_UPDATED = 'September 2026';

/**
 * Terms of Service. Standard, professional boilerplate tailored to TaskForce AI —
 * intended to be reviewed/adjusted by the business as needed. The global Header
 * renders above this route; this page supplies the site Footer.
 */
export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <SEO
        title="Terms of Service - TaskForce AI"
        description="The terms and conditions for using the TaskForce AI website and services."
        url="/terms"
      />

      <main className="container mx-auto px-6 pt-32 md:pt-40 pb-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed [&_h2]:text-white [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:mt-8 [&_a]:text-primary-light">
          <p>
            These Terms of Service (“Terms”) govern your use of the website
            www.taskforceai.tech and the services provided by TaskForce AI (“we”,
            “us”, “our”). By accessing or using our website, you agree to these
            Terms.
          </p>

          <div>
            <h2>Use of the website</h2>
            <p>
              You may use our website for lawful purposes only. You agree not to
              misuse the site, interfere with its operation, or attempt to access
              it in any unauthorised way.
            </p>
          </div>

          <div>
            <h2>Our services</h2>
            <p>
              We provide AI voice agents, automation, and related consulting
              services. Specific deliverables, pricing, and timelines are agreed
              separately in a proposal or contract. Information on this website is
              general and does not constitute a binding offer.
            </p>
          </div>

          <div>
            <h2>Intellectual property</h2>
            <p>
              All content on this website — including text, graphics, logos, and
              software — is owned by or licensed to TaskForce AI and is protected
              by applicable intellectual-property laws. You may not reproduce or
              distribute it without our written permission.
            </p>
          </div>

          <div>
            <h2>Third-party links and services</h2>
            <p>
              Our website may link to third-party services (for example WhatsApp).
              We are not responsible for the content or practices of those third
              parties; their own terms and policies apply.
            </p>
          </div>

          <div>
            <h2>Disclaimers</h2>
            <p>
              The website and its content are provided “as is” without warranties
              of any kind, to the fullest extent permitted by law. We do not
              guarantee that the site will be uninterrupted, error-free, or secure.
            </p>
          </div>

          <div>
            <h2>Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, TaskForce AI is not liable
              for any indirect, incidental, or consequential damages arising from
              your use of the website.
            </p>
          </div>

          <div>
            <h2>Governing law</h2>
            <p>
              These Terms are governed by the laws of Sri Lanka, and any disputes
              are subject to the exclusive jurisdiction of its courts.
            </p>
          </div>

          <div>
            <h2>Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              website after changes take effect constitutes acceptance of the
              updated Terms.
            </p>
          </div>

          <div>
            <h2>Contact us</h2>
            <p>
              TaskForce AI — Nugegoda Business Centre, Unit 37, 2nd Floor, 80
              Nawala Road, Nugegoda 10250, Sri Lanka.
              <br />
              Email: <a href="mailto:info@taskforceai.tech">info@taskforceai.tech</a>{' '}
              · Phone: <a href="tel:+94776697566">+94 77 669 7566</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
