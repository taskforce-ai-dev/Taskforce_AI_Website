import React from 'react';
import { SEO } from '../seo/SEO';
import { Footer } from '../layout/Footer';

const LAST_UPDATED = 'September 2026';

/**
 * Privacy Policy. Standard, professional boilerplate tailored to TaskForce AI —
 * intended to be reviewed/adjusted by the business as needed. The global Header
 * renders above this route; this page supplies the site Footer.
 */
export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <SEO
        title="Privacy Policy - TaskForce AI"
        description="How TaskForce AI collects, uses, and protects your personal information."
        url="/privacy"
      />

      <main className="container mx-auto px-6 pt-32 md:pt-40 pb-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed [&_h2]:text-white [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:mt-8 [&_a]:text-primary-light">
          <p>
            TaskForce AI (“we”, “us”, “our”) operates the website
            www.taskforceai.tech and provides AI voice agents and business
            automation services. This policy explains what information we collect,
            how we use it, and the choices you have.
          </p>

          <div>
            <h2>Information we collect</h2>
            <p>
              We collect information you provide directly — such as your name,
              email address, phone number, company, and any message you send —
              when you fill in a contact or demo-booking form, message us on
              WhatsApp, or otherwise contact us. We also collect limited technical
              data automatically (such as IP address, browser type, and pages
              viewed) through standard analytics.
            </p>
          </div>

          <div>
            <h2>How we use your information</h2>
            <p>
              We use your information to respond to your enquiries, provide and
              improve our services, schedule demos and consultations, send
              information you request, and comply with legal obligations. We do
              not sell your personal information.
            </p>
          </div>

          <div>
            <h2>Service providers</h2>
            <p>
              We share information only with providers that help us operate,
              including our website/CMS hosting, our form and booking database
              provider, WhatsApp/Meta (when you choose to message us), and
              analytics and advertising providers such as Google. These providers
              process data on our behalf under their own terms.
            </p>
          </div>

          <div>
            <h2>Cookies and analytics</h2>
            <p>
              We use cookies and similar technologies to run the site and
              understand how it is used. You can control cookies through your
              browser settings; disabling them may affect some features.
            </p>
          </div>

          <div>
            <h2>Data retention & security</h2>
            <p>
              We keep personal information only as long as needed for the purposes
              above or as required by law, and we apply reasonable technical and
              organisational measures to protect it. No method of transmission or
              storage is completely secure.
            </p>
          </div>

          <div>
            <h2>Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information, and you may opt out of marketing messages at
              any time. To make a request, contact us using the details below.
            </p>
          </div>

          <div>
            <h2>Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The “last updated” date
              above reflects the latest version.
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
