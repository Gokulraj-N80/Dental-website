import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandRevealLoader from './components/BrandRevealLoader';
import WhyTrust from './components/WhyTrust';
import QuickBooking from './components/QuickBooking';
import TreatmentsGrid from './components/TreatmentsGrid';
import Journey from './components/Journey';
import About from './components/About';
import Services from './components/Services';
import Blog from './components/Blog';
import BookingForm from './components/BookingForm';
import TreatmentDetails from './components/TreatmentDetails';
import PatientCare from './components/PatientCare';
import OurDoctors from './components/OurDoctors';
import Footer from './components/Footer';
import Logo from './components/Logo';
import AssistYou from './components/AssistYou';
import GoogleReviewsBar from './components/GoogleReviewsBar';
import Testimonials from './components/Testimonials';
import AdminPanel from './components/AdminPanel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ---- Global scroll-reveal ---- */
function useScrollReveal(currentTab) {
  useEffect(() => {
    const observe = () => {
      const targets = document.querySelectorAll('[data-reveal]');
      if (!targets.length) return;
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
      targets.forEach((el) => io.observe(el));
      return io;
    };

    const frame = requestAnimationFrame(() => {
      const io = observe();
      return () => io && io.disconnect();
    });
    return () => cancelAnimationFrame(frame);
  }, [currentTab]);
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [isPreloading, setIsPreloading] = useState(true);
  const [hideNavbarLogo, setHideNavbarLogo] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'neem');
  
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
    const targetEl = document.querySelector('.header-logo-target');
    if (!targetEl) {
      setIsPreloading(false);
      setHideNavbarLogo(false);
      return;
    }

    // Get exact target bounds in header
    const targetRect = targetEl.getBoundingClientRect();
    const currentRect = logoSvg.getBoundingClientRect();

    // Flight offset measurements
    const deltaX = targetRect.left - currentRect.left;
    const deltaY = targetRect.top - currentRect.top;
    const scaleFactor = 42 / 90; // target size 42 / loader size 90

    const flightTl = gsap.timeline({
      onComplete: () => {
        setHideNavbarLogo(false);
        setIsPreloading(false);
      }
    });

    // Animate flight path & radial page reveal mask
    flightTl
      .to(logoText, {
        opacity: 0,
        x: 30,
        duration: 0.4,
        ease: 'power2.in'
      })
      .to(logoSvg, {
        x: deltaX,
        y: deltaY,
        scale: scaleFactor,
        transformOrigin: 'top left',
        duration: 1.3,
        ease: 'power4.inOut'
      }, '-=0.15')
      .to('.app-reveal-wrapper', {
        clipPath: 'circle(150% at 50% 50%)',
        duration: 1.5,
        ease: 'power3.inOut'
      }, '-=0.9')
      .to(preloaderOverlay, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4');

    // Staggered Navbar links fade in during flight
    flightTl.fromTo('.desktop-only-links .nav-link-neemz, .desktop-only-links .nav-dropdown-wrapper', {
      opacity: 0,
      y: -15
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.06,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.8');
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

      <div className={`app-reveal-wrapper ${isPreloading ? 'clipped' : ''}`}>
        {/* Premium Apple-style top scroll indicator */}
        <div className="scroll-progress-indicator" style={{ width: `${scrollProgress}%` }} />

        {/* Dynamic drifting background particles / mesh blur blooms */}
        <div className="ambient-glow-container" aria-hidden="true">
          <div className="ambient-blob ambient-blob-1" />
          <div className="ambient-blob ambient-blob-2" />
        </div>

        <Navbar
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            setSelectedTreatment(null);
          }}
          onSelectTreatment={(item) => {
            setSelectedTreatment(item);
            navigate('treatment-details');
          }}
          theme={theme}
          setTheme={setTheme}
          hideLogo={hideNavbarLogo}
        />

        <main className="main-content">
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
              
              {/* 5. Google reviews & video testimonial slide */}
              <Testimonials />

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
        </main>

        {currentTab !== 'admin' && (
          <Footer onNavClick={(tab) => {
            setCurrentTab(tab);
            setSelectedTreatment(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}
      </div>
    </div>
  );
}
