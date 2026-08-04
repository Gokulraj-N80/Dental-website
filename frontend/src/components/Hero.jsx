import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Phone, Award, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import heroDentist from '../assets/clinical_tooth.jpg';

function useCounter(target, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;
    const incrementTime = Math.max(Math.floor(duration / end), 10);
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) { clearInterval(timer); setCount(end); }
      else setCount(start);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function Hero({ onBookClick, onServicesClick }) {
  const patientsCount   = useCounter(1500, 1800);
  const experienceCount = useCounter(10, 1000);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMouseOffset({
        x: (e.clientX - innerWidth  / 2) / 30,
        y: (e.clientY - innerHeight / 2) / 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    tl.from('.hero-tag-premium', { opacity: 0, y: -20, duration: 0.8 }, 0.2)
      .from('.hero-split-title',   { opacity: 0, y: 30 }, '-=0.6')
      .from('.hero-split-desc',    { opacity: 0, y: 20 }, '-=0.8')
      .from('.hero-split-actions', { opacity: 0, y: 15 }, '-=0.8')
      .from('.hero-strip-item',    { opacity: 0, y: 15, stagger: 0.12 }, '-=0.8')
      .from('.hero-img-wrap',      { opacity: 0, scale: 0.9, rotate: -2, duration: 1.4 }, 0.4)
      .from('.hero-img-ring',      { opacity: 0, scale: 0.8, stagger: 0.15 }, '-=1.0')
      .from('.hero-badge-top',     { opacity: 0, x: 30 }, '-=1.0')
      .from('.hero-badge-bottom',  { opacity: 0, x: -30 }, '-=1.0');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-[76px]"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-secondary-soft) 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">

        {/* ── LEFT COLUMN ── */}
        <div
          style={{ transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)`, transition: 'transform 0.1s ease-out' }}
          className="flex flex-col gap-6"
        >
          {/* Tag */}
          <div
            className="hero-tag-premium inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ backgroundColor: 'var(--color-gold-soft)', color: 'var(--color-secondary)' }}
          >
            <Sparkles size={13} />
            <span>Established 2012 • Private Clinical Practice</span>
          </div>

          {/* Heading */}
          <h1
            className="hero-split-title text-5xl md:text-6xl font-extrabold leading-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}
          >
            Smile Confidently<br />
            With Modern<br />
            <span style={{ color: 'var(--color-secondary)' }}>Dental Care.</span>
          </h1>

          {/* Description */}
          <p
            className="hero-split-desc text-base md:text-lg leading-relaxed max-w-[480px]"
            style={{ color: 'var(--color-accent-medium)' }}
          >
            Welcome to Dr Neemz Dentistry. We deliver professional,
            anxiety-free treatments in a calming environment using
            surgical-grade safety procedures and 100% digital diagnostics.
          </p>

          {/* CTA Buttons */}
          <div className="hero-split-actions flex flex-wrap gap-4">
            <button
              onClick={onBookClick}
              className="btn-ripple inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              Book Appointment
              <ArrowRight size={18} />
            </button>
            <button
              onClick={onServicesClick}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-wider border-2 transition-all duration-300 hover:scale-105"
              style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)', backgroundColor: 'transparent' }}
            >
              Explore Treatments
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-6 pt-2">
            {[
              { icon: Award,  label: 'Board Certified Specialists' },
              { icon: Phone,  label: 'Same-Day Emergency Care' },
              { icon: Shield, label: 'ISO 9001 Hygiene Certified' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="hero-strip-item flex items-center gap-2 text-sm font-semibold"
                style={{ color: 'var(--color-accent-medium)' }}
              >
                <Icon size={17} style={{ color: 'var(--color-secondary)' }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div
          className="relative flex items-center justify-center"
          style={{ transform: `translate(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px)`, transition: 'transform 0.1s ease-out' }}
        >
          {/* Decorative rings */}
          <div
            className="hero-img-ring absolute w-[360px] h-[360px] md:w-[460px] md:h-[460px] rounded-full border-2 opacity-20"
            style={{ borderColor: 'var(--color-secondary)' }}
          />
          <div
            className="hero-img-ring absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full border opacity-10"
            style={{ borderColor: 'var(--color-secondary)' }}
          />

          {/* Top floating badge */}
          <div
            className="hero-badge-top absolute top-4 right-0 md:-right-4 flex flex-col items-center px-5 py-3 rounded-2xl shadow-xl z-10"
            style={{
              backgroundColor: 'var(--color-primary)',
              border: '1px solid var(--color-accent-light)',
              transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <span className="text-2xl font-black" style={{ color: 'var(--color-secondary)' }}>
              {patientsCount.toLocaleString()}+
            </span>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-accent-medium)' }}>
              Happy Patients
            </span>
          </div>

          {/* Bottom floating badge */}
          <div
            className="hero-badge-bottom absolute bottom-4 left-0 md:-left-4 flex flex-col items-center px-5 py-3 rounded-2xl shadow-xl z-10"
            style={{
              backgroundColor: 'var(--color-primary)',
              border: '1px solid var(--color-accent-light)',
              transform: `translate(${mouseOffset.x * -0.3}px, ${mouseOffset.y * -0.3}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <span className="text-2xl font-black" style={{ color: 'var(--color-secondary)' }}>
              {experienceCount}+ Yrs
            </span>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-accent-medium)' }}>
              Clinical Experience
            </span>
          </div>

          {/* Main image */}
          <div
            className="hero-img-wrap relative w-[280px] h-[340px] md:w-[360px] md:h-[430px] rounded-[32px] overflow-hidden shadow-2xl"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <img
              src={heroDentist}
              alt="Professional Dentist at Dr Neemz Dentistry"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
