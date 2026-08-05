import React, { useLayoutEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import assistAppointment from '../assets/assist_appointment.png';
import assistImplants from '../assets/assist_implants.png';
import assistCleaning from '../assets/assist_cleaning.png';
import assistPain from '../assets/assist_pain.png';
import assistAligners from '../assets/assist_aligners.png';
import assistKids from '../assets/assist_kids.png';
import assistEmergency from '../assets/assist_emergency.png';
import assistFollowup from '../assets/assist_followup.png';
import serviceHygiene from '../assets/service_hygiene.png';
import serviceOrtho from '../assets/service_ortho.png';

const ASSIST_OPTIONS = [
  { 
    id: 'book', 
    name: 'Book Appointment', 
    image: assistAppointment, 
    treatment: 'ROUTINE CHECK UP', 
    desc: 'Schedule your dental visit instantly with our easy online appointment system.',
    fade: 'rgba(61, 107, 83, 0.3)',
    accent: '#3d6b53'
  },
  { 
    id: 'implants', 
    name: 'Dental Implants', 
    image: assistImplants, 
    treatment: 'DENTAL IMPLANTS', 
    desc: 'Replace missing teeth with strong, natural-looking dental implants for a permanent smile.',
    fade: 'rgba(2, 132, 199, 0.3)',
    accent: '#0284c7'
  },
  { 
    id: 'cleaning', 
    name: 'Teeth Cleaning & Whitening', 
    image: assistCleaning, 
    treatment: 'ROUTINE CHECK UP', 
    desc: 'Professional cleaning and whitening to keep your teeth healthy, bright and beautiful.',
    fade: 'rgba(225, 90, 128, 0.3)',
    accent: '#e15a80'
  },
  { 
    id: 'pain', 
    name: 'Tooth Pain / Sensitivity', 
    image: assistPain, 
    treatment: 'ROOT CANAL TREATMENT', 
    desc: 'Get relief from tooth pain, cavities and sensitivity with expert dental care.',
    fade: 'rgba(217, 119, 6, 0.3)',
    accent: '#d97706'
  },
  { 
    id: 'aligners', 
    name: 'Invis Aligners', 
    image: assistAligners, 
    treatment: 'CLEAR ALIGNERS', 
    desc: 'Straighten your teeth discreetly with custom-made clear aligners for a perfect smile.',
    fade: 'rgba(124, 58, 237, 0.3)',
    accent: '#7c3aed'
  },
  { 
    id: 'kids', 
    name: 'Kids Dental Care', 
    image: assistKids, 
    treatment: 'PEDIATRIC DENTISTRY', 
    desc: 'Gentle and friendly dental care to keep your child\'s teeth healthy and bright.',
    fade: 'rgba(13, 148, 136, 0.3)',
    accent: '#0d9488'
  },
  { 
    id: 'emergency', 
    name: 'Emergency Dental Care', 
    image: assistEmergency, 
    treatment: 'WISDOM TOOTH REMOVAL', 
    desc: 'Same-day emergency dental care for quick relief from severe toothache or injuries.',
    fade: 'rgba(220, 38, 38, 0.3)',
    accent: '#dc2626'
  },
  { 
    id: 'followup', 
    name: 'Follow-up Visit', 
    image: assistFollowup, 
    treatment: 'ROUTINE CHECK UP', 
    desc: 'Routine follow-up examinations to ensure your dental treatments are healing perfectly.',
    fade: 'rgba(219, 39, 119, 0.3)',
    accent: '#db2777'
  },
  { 
    id: 'hygiene', 
    name: 'Hygiene & Prevention', 
    image: serviceHygiene, 
    treatment: 'ROUTINE CHECK UP', 
    desc: 'Preventive treatments and dental cleanings to protect against plaque and gum disease.',
    fade: 'rgba(5, 150, 105, 0.3)',
    accent: '#059669'
  },
  { 
    id: 'ortho', 
    name: 'Braces Alignment', 
    image: serviceOrtho, 
    treatment: 'DENTAL BRACES', 
    desc: 'Traditional and modern orthodontic braces to correct misalignment and bite issues.',
    fade: 'rgba(79, 70, 229, 0.3)',
    accent: '#4f46e5'
  },
];

export default function AssistYou({ onSelectTriage }) {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout (> 1024px)
      mm.add('(min-width: 1025px)', () => {
        const grid = gridRef.current;
        const viewport = viewportRef.current;
        const section = containerRef.current;
        if (!grid || !viewport || !section) return;

        // Entrance animation timeline on scroll reveal
        gsap.from('.assist-card', {
          opacity: 0,
          y: 45,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });

        // Horizontal pin scroll timeline
        gsap.to(grid, {
          x: () => {
            const scrollDistance = grid.scrollWidth - viewport.offsetWidth + 480; // Increased to 480px for complete clearance
            return -scrollDistance;
          },
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.2,
            start: 'top top',
            end: () => `+=${(grid.scrollWidth - viewport.offsetWidth + 480) * 1.6}`,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      });

      // Mobile/Tablet layout (<= 1024px)
      mm.add('(max-width: 1024px)', () => {
        gsap.from('.assist-card', {
          opacity: 0,
          y: 45,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.assist-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Color reveal animation for each card independently on scroll (all viewports)
      const cards = gsap.utils.toArray('.assist-card');
      cards.forEach((card) => {
        const overlay = card.querySelector('.card-gradient-overlay');
        if (!overlay) return;

        gsap.set(overlay, { scaleY: 0, opacity: 0 });
        gsap.to(overlay, {
          scaleY: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true
          }
        });
      });

    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="assist-section section" ref={containerRef}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '20px' }} data-reveal>
        <h2 className="section-title">HOW MAY WE ASSIST YOU <span style={{ color: 'var(--color-secondary)' }}>TODAY?</span></h2>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Please select the option that best describes your needs to proceed.
        </p>
      </div>

      <div className="assist-viewport" ref={viewportRef}>
        <div className="assist-grid" ref={gridRef}>
          {ASSIST_OPTIONS.map((option) => (
            <div
              key={option.id}
              className="assist-card interactive-card"
              onClick={() => onSelectTriage(option.treatment)}
            >
              <div className="assist-img-wrap">
                <img src={option.image} alt={option.name} className="assist-card-img" />
              </div>
              <div className="assist-card-content">
                <h3 className="assist-card-title">{option.name}</h3>
                <p className="assist-card-desc">{option.desc}</p>
                <div className="assist-card-action">
                  <span className="assist-card-btn" style={{ backgroundColor: option.accent }}>
                    Book Appointment <ChevronRight size={14} />
                  </span>
                </div>
              </div>
              <div className="card-gradient-overlay" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

