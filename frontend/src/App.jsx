import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandRevealLoader from './components/BrandRevealLoader';
import WhyTrust from './components/WhyTrust';
import QuickBooking from './components/QuickBooking';
import TreatmentsGrid from './components/TreatmentsGrid';
import Journey from './components/Journey';
import Footer from './components/Footer';
import Logo from './components/Logo';
import AssistYou from './components/AssistYou';
import GoogleReviewsBar from './components/GoogleReviewsBar';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

// Lazy loaded page components
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Blog = lazy(() => import('./components/Blog'));
const BookingForm = lazy(() => import('./components/BookingForm'));
const TreatmentDetails = lazy(() => import('./components/TreatmentDetails'));
const PatientCare = lazy(() => import('./components/PatientCare'));
const OurDoctors = lazy(() => import('./components/OurDoctors'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

function TabLoadingFallback() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '16px' }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: '3px solid var(--color-accent-light, #e2e8f0)',
        borderTopColor: 'var(--color-secondary, #0d9488)',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-medium, #64748b)', fontWeight: 500, letterSpacing: '0.5px' }}>Loading page...</span>
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

/* ---- Global scroll-reveal ---- */
function useScrollReveal(currentTab) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = Number(el.dataset.delay || 0);
            setTimeout(() => el.classList.add('visible'), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const observeNewTargets = () => {
      const targets = document.querySelectorAll('[data-reveal]:not(.revealer-observed)');
      targets.forEach((el) => {
        el.classList.add('revealer-observed');
        io.observe(el);
      });
    };

    // Initial check
    observeNewTargets();

    // Setup mutation observer to watch for lazy loaded components mounting
    const mutationObserver = new MutationObserver(() => {
      observeNewTargets();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      io.disconnect();
      mutationObserver.disconnect();
    };
  }, [currentTab]);
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [isPreloading, setIsPreloading] = useState(true);
  const [theme, setTheme] = useState('neem');
  
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.001 : 1.2,
      smoothWheel: !prefersReducedMotion,
      syncTouch: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1,
      lerp: prefersReducedMotion ? 1 : 0.08,
    });

    lenisRef.current = lenis;

    // Drive Lenis with GSAP's ticker
    function update(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(update);

    // Synchronize ScrollTrigger updates with Lenis scrolling
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleLoaderComplete = (logoSvg, logoText, preloaderOverlay) => {
    // Fade out preloader overlay background quickly
    gsap.to(preloaderOverlay, {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.out',
      onComplete: () => {
        setIsPreloading(false);
      }
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useScrollReveal(currentTab);

  const navigate = (tab) => {
    setCurrentTab(tab);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [currentTab]);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="app-container">
      {isPreloading && (
        <BrandRevealLoader onComplete={handleLoaderComplete} />
      )}

      <div className="app-reveal-wrapper">
        {/* Premium Apple-style top scroll indicator */}
        <div className="scroll-progress-indicator" style={{ width: `${scrollProgress}%` }} />

        {/* Dynamic drifting background particles / mesh blur blooms */}
        <div className="ambient-glow-container" aria-hidden="true">
          <div className="ambient-blob ambient-blob-1" />
          <div className="ambient-blob ambient-blob-2" />
        </div>

        {currentTab !== 'admin' && (
          <Navbar
            currentTab={currentTab}
            setCurrentTab={(tab) => {
              navigate(tab);
              setSelectedTreatment(null);
            }}
            onSelectTreatment={(item) => {
              setSelectedTreatment(item);
              navigate('treatment-details');
            }}
            theme={theme}
            setTheme={setTheme}
          />
        )}

        <main className="main-content">
          <Suspense fallback={<TabLoadingFallback />}>
            {currentTab === 'home' && (
              <>
                <Hero 
                  onBookClick={() => navigate('booking')} 
                  onServicesClick={() => navigate('services')}
                  startAnimation={!isPreloading}
                />
                <GoogleReviewsBar />
                
                {/* 1. How May We Assist You */}
                <AssistYou onSelectTriage={(treatment) => {
                  setSelectedTreatment(treatment);
                  navigate('booking');
                }} />
                
                <hr className="section-divider" />
                
                {/* 2. Why Trust Dr */}
                <WhyTrust />
                
                <hr className="section-divider" />
                
                {/* 3. Inline Booking Form */}
                <section className="home-booking-inline-section section">
                  <div className="section-header">
                    <span className="section-tag">Appointment</span>
                    <h2 className="section-title">Book an Appointment</h2>
                    <p className="section-subtitle">Select your preferred date, time, and service to secure your visit instantly.</p>
                  </div>
                  <BookingForm defaultService={selectedTreatment} />
                </section>
                
                <hr className="section-divider" />
                
                <Testimonials />

                <hr className="section-divider" />

                {/* 6. Frequently Asked Questions */}
                <FAQ />

              </>
            )}

            {currentTab === 'about' && <About />}
            {currentTab === 'services' && <Services onBookClick={() => navigate('booking')} />}
            {currentTab === 'blog' && <Blog />}
            {currentTab === 'booking' && <BookingForm defaultService={selectedTreatment} />}
            {currentTab === 'patient-care' && <PatientCare />}
            {currentTab === 'doctors' && <OurDoctors />}
            {currentTab === 'admin' && (
              <AdminPanel
                onGoToPublic={() => setCurrentTab('home')}
                theme={theme}
                setTheme={setTheme}
              />
            )}

            {currentTab === 'treatment-details' && selectedTreatment && (
              <TreatmentDetails
                treatmentName={selectedTreatment}
                onBack={() => { setSelectedTreatment(null); navigate('home'); }}
                onBook={(item) => { setSelectedTreatment(item); navigate('booking'); }}
              />
            )}
          </Suspense>
        </main>

        {currentTab !== 'admin' && (
          <Footer onNavClick={(tab) => {
            setCurrentTab(tab);
            setSelectedTreatment(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}

        {/* Floating Premium Theme Switcher Widget to make themes noticeable */}
        <div className="floating-theme-switch-indicator" role="complementary" aria-label="Theme selector">
          <span className="ft-label">Themes:</span>
          <div className="ft-buttons-group">
            <button onClick={() => setTheme('neem')} className={`ft-btn ${theme === 'neem' ? 'active' : ''}`} aria-label="Neem Theme">🌿</button>
            <button onClick={() => setTheme('clinical-blue')} className={`ft-btn ${theme === 'clinical-blue' ? 'active' : ''}`} aria-label="Clinical Theme">💙</button>
            <button onClick={() => setTheme('soft-medical-blush')} className={`ft-btn ${theme === 'soft-medical-blush' ? 'active' : ''}`} aria-label="Blush Theme">🌸</button>
          </div>
        </div>
      </div>
    </div>
  );
}
