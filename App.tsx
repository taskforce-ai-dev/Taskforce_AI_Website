import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';
import { Header } from './components/layout/Header';
import { Home } from './components/pages/Home';
import { ServiceDetail } from './components/pages/ServiceDetail';
import { BookDemo } from './components/pages/BookDemo';
import { Contact } from './components/pages/Contact';
import { About } from './components/pages/About';
import { Blog } from './components/pages/Blog';
import { BlogPost } from './components/pages/BlogPost';
import { Chat } from './components/pages/Chat';
import { Privacy } from './components/pages/Privacy';
import { Terms } from './components/pages/Terms';
import { NotFound } from './components/pages/NotFound';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BlogEditor } from './components/admin/BlogEditor';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { GlobalSpotlight } from './components/ui/GlobalSpotlight';
import { InteractiveBackground } from './components/ui/InteractiveBackground';
import { TechScrollIndicator } from './components/ui/TechScrollIndicator';
import Chatbot from './components/ui/Chatbot';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // Skip the loading screen during prerendering so Puppeteer captures real content
  const isPrerender =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('prerender') === '1';

  // The /chat WhatsApp ad landing page must load instantly (Google Ads checks
  // landing-page speed), so skip the 2.2s brand loader there.
  const isChatPage =
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/chat');

  const [isLoading, setIsLoading] = useState(!isPrerender && !isChatPage);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isPrerender) return; // No timer needed — already skipped
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;

    if (i18n.language === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [i18n.language]);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />

        <div className="text-white min-h-screen selection:bg-primary-DEFAULT selection:text-white relative">
          <InteractiveBackground />
          <GlobalSpotlight />
          <TechScrollIndicator />

          <>
              <Header />

              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/service/:id" element={<ServiceDetail />} />
                  <Route path="/book-demo" element={<BookDemo />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />

                  <Route path="/chat" element={<Chat />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />

                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/new"
                    element={
                      <ProtectedRoute>
                        <BlogEditor />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/edit/:id"
                    element={
                      <ProtectedRoute>
                        <BlogEditor />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Chatbot />
            </>

          {/* Brand loading screen as a fade-out OVERLAY on top of the already-
              rendered page, so the real content is ALWAYS in the DOM for
              crawlers. Previously the loader replaced the content for 2.2s, so a
              JS-rendering crawler could capture "Launching Interface… System
              Check 100%" as the page body. LoadingScreen is fixed inset-0
              z-[100] and opaque, so the visual is identical. Skipped during
              prerender (isPrerender ⇒ isLoading=false), so prerendered HTML is
              unchanged. */}
          <AnimatePresence>
            {isLoading && <LoadingScreen />}
          </AnimatePresence>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;