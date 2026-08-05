import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Phone, Award, Shield } from 'lucide-react';
import heroDentist from '../assets/clinical_tooth.jpg';
import { gsap } from 'gsap';

// Dynamic count up hook
function useCounter(target, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10);
    
    let timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export default function Hero({ onBookClick, onServicesClick, startAnimation }) {
  const patientsCount = useCounter(1500, 1800);
  const experienceCount = useCounter(10, 1000);

  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // Immediate initial hidden state to prevent flash
  useEffect(() => {
    gsap.set('.hero-tag-premium', { opacity: 0, y: -20 });
    gsap.set('.word-span', { opacity: 0, y: 30 });
    gsap.set('.hero-split-desc', { opacity: 0, y: 20 });
    gsap.set('.hero-split-actions button', { opacity: 0, scale: 0.95 });
    gsap.set('.strip-item', { opacity: 0, y: 15 });
    gsap.set('.hero-img-wrap', { scale: 0.9, opacity: 0, rotation: -0.8 });
    gsap.set('.hero-float-badge', { opacity: 0, scale: 0 });
    gsap.set('.hero-img-ring', { opacity: 0, scale: 0.5 });
  }, []);

  useEffect(() => {
    if (!startAnimation) return;

    const leftEl = leftColRef.current;
    const rightEl = rightColRef.current;
    if (!leftEl || !rightEl) return;

    // Smooth inertia mouse move with quickTo
    const xToLeft = gsap.quickTo(leftEl, 'x', { duration: 0.5, ease: 'power2.out' });
    const yToLeft = gsap.quickTo(leftEl, 'y', { duration: 0.5, ease: 'power2.out' });
    const xToRight = gsap.quickTo(rightEl, 'x', { duration: 0.8, ease: 'power3.out' });
    const yToRight = gsap.quickTo(rightEl, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xVal = (e.clientX - innerWidth / 2) / 35;
      const yVal = (e.clientY - innerHeight / 2) / 35;
      
      xToLeft(xVal * 0.3);
      yToLeft(yVal * 0.3);
      xToRight(xVal * -0.6);
      yToRight(yVal * -0.6);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // GSAP Entrance Timeline (Optimized for faster content reveal)
    const tl = gsap.timeline();
    
    tl.to('.hero-tag-premium', { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' })
      .to('.word-span', { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'back.out(1.5)' }, '-=0.15')
      .to('.hero-split-desc', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.25')
      .to('.hero-split-actions button', { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'power3.out' }, '-=0.2')
      .to('.hero-img-wrap', { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to('.hero-img-ring', { opacity: 0.4, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.5')
      .to('.hero-float-badge', { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.4')
      .to('.strip-item', { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }, '-=0.35');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
    };
  }, [startAnimation]);

  return (
    <section className="hero-split-section" ref={containerRef}>

      {/* ─── LEFT COLUMN ─── */}
      <div className="hero-split-left" ref={leftColRef}>

        <div className="hero-tag-premium">
          <Sparkles size={13} className="hero-tag-icon" />
          <span>ESTABLISHED 2012 • PRIVATE CLINICAL PRACTICE</span>
        </div>

        <h1 className="hero-split-title">
          <span className="word-span" style={{ display: 'inline-block' }}>Smile</span>{' '}
          <span className="word-span" style={{ display: 'inline-block' }}>Confidently</span><br />
          <span className="word-span" style={{ display: 'inline-block' }}>With</span>{' '}
          <span className="word-span" style={{ display: 'inline-block' }}>Modern</span><br />
          <span className="word-span hero-title-accent" style={{ display: 'inline-block' }}>Dental Care.</span>
        </h1>

        <p className="hero-split-desc">
          Welcome to Dr. Neemz Dentistry. We deliver professional,
          anxiety-free treatments in a calming environment using
          surgical-grade safety procedures and 100% digital diagnostics.
        </p>

        <div className="hero-split-actions">
          <button className="btn btn-primary btn-lg btn-ripple" onClick={onBookClick}>
            BOOK APPOINTMENT
            <ArrowRight size={18} />
          </button>
          <button className="btn btn-outline-green btn-lg" onClick={onServicesClick}>
            EXPLORE TREATMENTS
          </button>
        </div>

        <div className="hero-split-strip">
          <div className="strip-item">
            <Award size={17} className="strip-icon" />
            <span>Board Certified Specialists</span>
          </div>
          <div className="strip-item">
            <Phone size={17} className="strip-icon" />
            <span>Same-Day Emergency Care</span>
          </div>
          <div className="strip-item">
            <Shield size={17} className="strip-icon" />
            <span>ISO 9001 Hygiene Certified</span>
          </div>
        </div>
      </div>

      {/* ─── RIGHT COLUMN — Image ─── */}
      <div className="hero-split-right" ref={rightColRef}>
        {/* Decorative ring behind image */}
        <div className="hero-img-ring" />
        <div className="hero-img-ring hero-img-ring-2" />

        {/* Floating stat badges */}
        <div className="hero-float-badge hero-badge-top">
          <span className="hbadge-num">{patientsCount.toLocaleString()}+</span>
          <span className="hbadge-label">Happy Patients</span>
        </div>

        <div className="hero-float-badge hero-badge-bottom">
          <span className="hbadge-num">{experienceCount}+ Yrs</span>
          <span className="hbadge-label">Clinical Experience</span>
        </div>

        <div className="hero-img-wrap">
          <img
            src={heroDentist}
            alt="Professional Dentist at Dr. Neemz Dentistry"
            className="hero-dentist-img"
          />
        </div>
      </div>

    </section>
  );
}

