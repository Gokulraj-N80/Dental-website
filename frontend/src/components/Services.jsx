import React, { useState, useRef } from 'react';
import { Activity, ShieldAlert, Sparkles, Smile, RefreshCw, Heart, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import imgHygiene   from '../assets/service_hygiene.png';
import imgOrtho     from '../assets/service_ortho.png';
import imgImplants  from '../assets/service_implants.png';
import imgWhitening from '../assets/service_whitening.png';
import imgRootcanal from '../assets/service_rootcanal.png';
import imgPediatric from '../assets/service_pediatric.png';

const SERVICES_DATA = [
  {
    id: 'hygiene',   icon: Smile,       image: imgHygiene,
    title: 'Teeth Cleaning & Hygiene',
    shortDesc: 'Regular scaling and prophylaxis to keep your teeth bright and prevent gum disease.',
    longDesc:  'Our preventative cleaning programs focus on plaque removal, calculus scraping, polishing, and comprehensive dental examinations. Early detection of potential issues guarantees a lifetime of clean smiles.',
  },
  {
    id: 'ortho',     icon: Activity,    image: imgOrtho,
    title: 'Invisalign & Orthodontics',
    shortDesc: 'Discreet aligners and modern braces to straighten your teeth with minimal discomfort.',
    longDesc:  'Say goodbye to metal braces. Using advanced 3D scanning technology, we formulate transparent Invisalign aligners custom-made to shift your teeth into perfect alignment comfortably and invisibly.',
  },
  {
    id: 'implants',  icon: ShieldAlert, image: imgImplants,
    title: 'Dental Implants',
    shortDesc: 'Premium titanium restorations that look, feel, and function like natural teeth.',
    longDesc:  'Missing teeth can impact your speech, chewing, and self-confidence. Our implantology specialists use titanium roots and high-grade ceramic crowns to deliver permanent, structurally sound restorations.',
  },
  {
    id: 'aesthetic', icon: Sparkles,    image: imgWhitening,
    title: 'Cosmetic Whitening',
    shortDesc: 'Professional bleaching services to safely enhance the brightness of your smile.',
    longDesc:  'Our state-of-the-art office bleaching treatments can lift shade brightness by up to 8 levels in under an hour. Safe, painless, and monitored by professional dental specialists.',
  },
  {
    id: 'root-canal',icon: RefreshCw,   image: imgRootcanal,
    title: 'Root Canal Treatment',
    shortDesc: 'Microscopic therapy to save damaged teeth and eliminate internal nerve pain.',
    longDesc:  'Using local anesthesia and high-precision microscopes, we clear bacterial infections from the tooth root canal, reseal the chamber, and prevent extraction so you can keep your natural tooth.',
  },
  {
    id: 'pediatric', icon: Heart,       image: imgPediatric,
    title: 'Pediatric Care',
    shortDesc: 'A comfortable, friendly, and gentle dental experience tailored for children.',
    longDesc:  'We introduce kids to dental health in a fun, non-threatening environment. From initial assessments to cavity prevention treatments and habit counseling, we set up strong habits early.',
  },
];

export default function Services({ onBookClick }) {
  const [selectedService, setSelectedService] = useState(null);
  const containerRef = useRef(null);

  React.useEffect(() => {
    const isMobile = window.innerWidth < 768;
    let pinScroll;
    if (!isMobile) {
      const scrollContainer = document.querySelector('.services-scroll-container');
      const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth + 100);
      pinScroll = gsap.to(scrollContainer, {
        x: () => getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.services-section-wrapper',
          pin: true, pinSpacing: true, anticipatePin: 1,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollContainer.scrollWidth - window.innerWidth + 100}`,
          invalidateOnRefresh: true,
        },
      });
    }
    return () => { pinScroll?.scrollTrigger?.kill(); };
  }, []);

  return (
    <section className="services-section-wrapper" ref={containerRef}>
      <div className="services-pin-panel">

        {/* Header */}
        <div className="services-anim-header text-center px-8 mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: 'var(--color-gold-soft)', color: 'var(--color-secondary)' }}
          >
            Treatments
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}
          >
            Dr Neemz Treatments
          </h2>
          <p className="text-base max-w-[560px] mx-auto" style={{ color: 'var(--color-accent-medium)' }}>
            We combine medical precision with patient comfort to deliver high-quality dental treatments.
          </p>
        </div>

        {/* Scrolling cards */}
        <div className="services-scroll-container">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="flex-shrink-0 w-[300px] md:w-[320px] rounded-3xl overflow-hidden flex flex-col border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderColor: 'var(--color-accent-light)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Image */}
                <div className="w-full h-[200px] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                {/* Body */}
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary-soft)', color: 'var(--color-secondary)' }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-accent-medium)' }}>
                    {service.shortDesc}
                  </p>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="self-start text-sm font-bold underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Learn Detail →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-[520px] rounded-3xl p-8 flex flex-col gap-5 animate-[fadeInUp_0.4s_ease-out]"
            style={{ backgroundColor: 'var(--color-primary)', boxShadow: 'var(--shadow-lg)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-secondary-soft)', color: 'var(--color-secondary)' }}
              >
                {React.createElement(selectedService.icon, { size: 26 })}
              </div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>
                {selectedService.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
              {selectedService.longDesc}
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedService(null)}
                className="flex-1 py-3 rounded-full text-sm font-bold border transition-all"
                style={{ borderColor: 'var(--color-accent-light)', color: 'var(--color-accent-medium)' }}
              >
                Close
              </button>
              <button
                onClick={() => { setSelectedService(null); onBookClick(); }}
                className="flex-1 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--color-secondary)' }}
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
