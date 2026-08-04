import React, { useState, useRef } from 'react';
import { Activity, ShieldAlert, Sparkles, Smile, RefreshCw, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import imgHygiene from '../assets/service_hygiene.png';
import imgOrtho from '../assets/service_ortho.png';
import imgImplants from '../assets/service_implants.png';
import imgWhitening from '../assets/service_whitening.png';
import imgRootcanal from '../assets/service_rootcanal.png';
import imgPediatric from '../assets/service_pediatric.png';

const SERVICES_DATA = [
  {
    id: 'hygiene',
    icon: Smile,
    image: imgHygiene,
    title: 'Teeth Cleaning & Hygiene',
    shortDesc: 'Regular scaling and prophylaxis to keep your teeth bright and prevent gum disease.',
    longDesc: 'Our preventative cleaning programs focus on plaque removal, calculus scraping, polishing, and comprehensive dental examinations. Early detection of potential issues guarantees a lifetime of clean smiles.'
  },
  {
    id: 'ortho',
    icon: Activity,
    image: imgOrtho,
    title: 'Invisalign & Orthodontics',
    shortDesc: 'Discreet aligners and modern braces to straighten your teeth with minimal discomfort.',
    longDesc: 'Say goodbye to metal braces. Using advanced 3D scanning technology, we formulate transparent Invisalign aligners custom-made to shift your teeth into perfect alignment comfortably and invisibly.'
  },
  {
    id: 'implants',
    icon: ShieldAlert,
    image: imgImplants,
    title: 'Dental Implants',
    shortDesc: 'Premium titanium restorations that look, feel, and function like natural teeth.',
    longDesc: 'Missing teeth can impact your speech, chewing, and self-confidence. Our implantology specialists use titanium roots and high-grade ceramic crowns to deliver permanent, structurally sound restorations.'
  },
  {
    id: 'aesthetic',
    icon: Sparkles,
    image: imgWhitening,
    title: 'Cosmetic Whitening',
    shortDesc: 'Professional bleaching services to safely enhance the brightness of your smile.',
    longDesc: 'Our state-of-the-art office bleaching treatments can lift shade brightness by up to 8 levels in under an hour. Safe, painless, and monitored by professional dental specialists.'
  },
  {
    id: 'root-canal',
    icon: RefreshCw,
    image: imgRootcanal,
    title: 'Root Canal Treatment',
    shortDesc: 'Microscopic therapy to save damaged teeth and eliminate internal nerve pain.',
    longDesc: 'Using local anesthesia and high-precision microscopes, we clear bacterial infections from the tooth root canal, reseal the chamber, and prevent extraction so you can keep your natural tooth.'
  },
  {
    id: 'pediatric',
    icon: Heart,
    image: imgPediatric,
    title: 'Pediatric Care',
    shortDesc: 'A comfortable, friendly, and gentle dental experience tailored for children.',
    longDesc: 'We introduce kids to dental health in a fun, non-threatening environment. From initial assessments to cavity prevention treatments and habit counseling, we set up strong habits early.'
  }
];

export default function Services({ onBookClick }) {
  const [selectedService, setSelectedService] = useState(null);
  const containerRef = useRef(null);

  React.useEffect(() => {
    // Only run horizontal scroll pinning on desktop viewports (>= 768px)
    const isMobile = window.innerWidth < 768;

    let pinScroll;

    if (!isMobile) {
      const scrollContainer = document.querySelector('.services-scroll-container');
      
      const getScrollAmount = () => {
        const containerWidth = scrollContainer.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(containerWidth - viewportWidth + 100);
      };

      pinScroll = gsap.to(scrollContainer, {
        x: () => getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.services-section-wrapper',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1, // stable crisp scrubbing rate
          start: 'top top',
          end: () => `+=${scrollContainer.scrollWidth - window.innerWidth + 100}`,
          invalidateOnRefresh: true,
        }
      });
    }

    return () => {
      pinScroll?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section className="services-section-wrapper" ref={containerRef}>
      <div className="services-pin-panel">
        <div className="section-header services-anim-header">
          <span className="section-tag">Treatments</span>
          <h2 className="section-title">Dr Neemz Treatments</h2>
          <p className="section-subtitle">
            We combine medical precision with patient comfort to deliver high-quality dental treatments.
          </p>
        </div>

        <div className="services-scroll-container">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="service-card">
                <div className="service-card-image-wrap">
                  <img src={service.image} alt={service.title} className="service-card-img" />
                </div>
                <div className="service-icon-box">
                  <Icon size={24} className="service-icon" />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.shortDesc}</p>
                <div className="service-card-footer">
                  <button 
                    className="service-learn-more"
                    onClick={() => setSelectedService(service)}
                  >
                    Learn Detail
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="service-icon-box">
                {React.createElement(selectedService.icon, { size: 28, className: "service-icon" })}
              </div>
              <h3 className="modal-title">{selectedService.title}</h3>
            </div>
            <div className="modal-body">
              <p className="modal-text">{selectedService.longDesc}</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSelectedService(null);
                  onBookClick();
                }}
              >
                Book This Treatment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
