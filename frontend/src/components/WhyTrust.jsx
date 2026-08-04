import React, { useRef } from 'react';
import { Stethoscope, Cpu, Users, ShieldCheck, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import doctorImg from '../assets/doctor_trust.png';

gsap.registerPlugin(ScrollTrigger);

const TRUST_PILLARS = [
  {
    icon: Stethoscope,
    title: 'Expert Dental Care',
    points: [
      'Experienced and skilled dental professionals',
      'Focused on accurate diagnosis and effective treatments',
      'Patient-first approach in every consultation',
    ],
  },
  {
    icon: Cpu,
    title: 'Advanced Solutions',
    points: [
      'Modern equipment for precise treatments',
      'Safe and reliable dental procedures',
      'Updated techniques for better results',
    ],
  },
  {
    icon: Users,
    title: 'Family-Friendly Care',
    points: [
      'Comfortable care for adults and children',
      'Friendly and stress-free clinic environment',
      'Complete dental care under one roof',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Hygiene & Safety',
    points: [
      'Strict sterilization protocols followed',
      'Clean, safe, and hygienic environment',
      'Patient safety is our top priority',
    ],
  },
];

export default function WhyTrust() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.wt-visual', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0, x: -40, duration: 1.0, ease: 'power3.out',
    });
    gsap.from('.wt-header > *', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0, y: 20, stagger: 0.12, duration: 0.8, ease: 'power3.out',
    });
    gsap.from('.wt-pillar', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full py-24 px-6 md:px-12"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* ── Left: image with badge ── */}
        <div className="wt-visual relative flex justify-center">
          <div
            className="relative w-full max-w-[420px] rounded-[28px] overflow-hidden shadow-2xl"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <img
              src={doctorImg}
              alt="Our dentist providing care"
              className="w-full h-full object-cover"
            />
            {/* Floating badge */}
            <div
              className="absolute bottom-6 right-6 flex flex-col items-center px-5 py-3 rounded-2xl shadow-xl"
              style={{
                backgroundColor: 'var(--color-secondary)',
                color: '#fff',
                animation: 'floatSlow 5s ease-in-out infinite',
              }}
            >
              <span className="text-2xl font-black">15+</span>
              <span className="text-xs font-semibold opacity-90">Years of Excellence</span>
            </div>
          </div>
        </div>

        {/* ── Right: content ── */}
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="wt-header flex flex-col gap-3">
            <span
              className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: 'var(--color-gold-soft)', color: 'var(--color-secondary)' }}
            >
              Why Choose Us
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}
            >
              Trusted Care,<br />
              <span style={{ color: 'var(--color-secondary)' }}>Exceptional Results</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
              We combine clinical expertise with modern technology to deliver dental care
              that is safe, comfortable, and truly effective.
            </p>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TRUST_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="wt-pillar flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-accent-light)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary-soft)', color: 'var(--color-secondary)' }}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  {/* Title */}
                  <h4
                    className="text-sm font-bold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {pillar.title}
                  </h4>
                  {/* Points */}
                  <ul className="flex flex-col gap-1.5">
                    {pillar.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
                        <CheckCircle size={13} strokeWidth={2} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
