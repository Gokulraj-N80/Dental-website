import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyTrust from './components/WhyTrust';
import QuickBooking from './components/QuickBooking';
import TreatmentsGrid from './components/TreatmentsGrid';
import Journey from './components/Journey';
import About from './components/About';
import CtaBanner from './components/CtaBanner';
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
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'neem');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useScrollReveal(currentTab);

  const navigate = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  if (isPreloading) {
    return (
      <div className="preloader-overlay">
        <div className="preloader-logo-wrap" style={{ animation: 'pulseScale 2s infinite ease-in-out' }}>
          <Logo size={80} showText={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
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
      />

      <main className="main-content">
        {currentTab === 'home' && (
          <>
            <Hero onBookClick={() => navigate('booking')} onServicesClick={() => navigate('services')} />
            <GoogleReviewsBar />
            <AssistYou onSelectTriage={(treatment) => {
              setSelectedTreatment(treatment);
              navigate('booking');
            }} />
            <hr className="section-divider" />
            <WhyTrust />
            <hr className="section-divider" />
            <TreatmentsGrid onGetMore={(name) => { setSelectedTreatment(name); navigate('treatment-details'); }} />
            <hr className="section-divider" />
            <Testimonials />
            <hr className="section-divider" />
            <CtaBanner onBookClick={() => navigate('booking')} />
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

      <Footer onNavClick={(tab) => {
        setCurrentTab(tab);
        setSelectedTreatment(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
