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

  useScrollReveal(currentTab);

  const navigate = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
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
      />

      <main className="main-content">
        {currentTab === 'home' && (
          <>
            <Hero onBookClick={() => navigate('booking')} onServicesClick={() => navigate('services')} />
            <hr className="section-divider" />
            <WhyTrust />
            <hr className="section-divider" />
            <QuickBooking />
            <hr className="section-divider" />
            <TreatmentsGrid onGetMore={(name) => { setSelectedTreatment(name); navigate('treatment-details'); }} />
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
