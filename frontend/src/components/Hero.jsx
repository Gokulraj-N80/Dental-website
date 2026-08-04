import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Phone, Award, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import heroDentist from '../assets/clinical_tooth.jpg';

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

export default function Hero({ onBookClick, onServicesClick }) {
  const patientsCount = useCounter(1500, 1800);
  const experienceCount = useCounter(10, 1000);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 30; // Max offset 30px
      const y = (e.clientY - innerHeight / 2) / 30;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    // Left content staggered fade-in up
    tl.from('.hero-tag-premium', { opacity: 0, y: -20, duration: 0.8 }, 0.2)
      .from('.hero-split-title', { opacity: 0, y: 30 }, '-=0.6')
      .from('.hero-split-desc', { opacity: 0, y: 20 }, '-=0.8')
      .from('.hero-split-actions', { opacity: 0, y: 15 }, '-=0.8')
      .from('.hero-split-strip .strip-item', { opacity: 0, y: 15, stagger: 0.12 }, '-=0.8');

    // Right column entrance
    tl.from('.hero-img-wrap', { opacity: 0, scale: 0.9, rotate: -2, duration: 1.4 }, 0.4)
      .from('.hero-img-ring', { opacity: 0, scale: 0.8, stagger: 0.15 }, '-=1.0')
      .from('.hero-badge-top', { opacity: 0, x: 30 }, '-=1.0')
      .from('.hero-badge-bottom', { opacity: 0, x: -30 }, '-=1.0');
  }, { scope: containerRef });

  return (
    <section className="hero-split-section" ref={containerRef}>

      {/* ─── LEFT COLUMN ─── */}
      <div 
        className="hero-split-left"
        style={{
          transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)`
        }}
      >

        <div className="hero-tag-premium">
          <Sparkles size={13} className="hero-tag-icon" />
          <span>ESTABLISHED 2012 • PRIVATE CLINICAL PRACTICE</span>
        </div>

        <h1 className="hero-split-title">
          Smile Confidently <br />
          With Modern <br />
          <span className="hero-title-accent">Dental Care.</span>
        </h1>

        <p className="hero-split-desc">
          Welcome to Dr Neemz Dentistry. We deliver professional,
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
      <div 
        className="hero-split-right"
        style={{
          transform: `translate(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px)`
        }}
      >
        {/* Decorative ring behind image */}
        <div className="hero-img-ring" />
        <div className="hero-img-ring hero-img-ring-2" />

        {/* Floating stat badges */}
        <div 
          className="hero-float-badge hero-badge-top"
          style={{
            transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`
          }}
        >
          <span className="hbadge-num">{patientsCount.toLocaleString()}+</span>
          <span className="hbadge-label">Happy Patients</span>
        </div>

        <div 
          className="hero-float-badge hero-badge-bottom"
          style={{
            transform: `translate(${mouseOffset.x * -0.3}px, ${mouseOffset.y * -0.3}px)`
          }}
        >
          <span className="hbadge-num">{experienceCount}+ Yrs</span>
          <span className="hbadge-label">Clinical Experience</span>
        </div>

        <div className="hero-img-wrap">
          <img
            src={heroDentist}
            alt="Professional Dentist at Dr Neemz Dentistry"
            className="hero-dentist-img"
          />
        </div>
      </div>

    </section>
  );
}
