import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Phone, Award, Shield } from 'lucide-react';
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

  return (
    <section className="hero-split-section">

      {/* ─── LEFT COLUMN ─── */}
      <div className="hero-split-left">

        <div className="hero-tag-premium animate-fade-in-down delay-1">
          <Sparkles size={13} className="hero-tag-icon" />
          <span>ESTABLISHED 2012 • PRIVATE CLINICAL PRACTICE</span>
        </div>

        <h1 className="hero-split-title animate-fade-in delay-2">
          Smile Confidently <br />
          With Modern <br />
          <span className="hero-title-accent">Dental Care.</span>
        </h1>

        <p className="hero-split-desc animate-fade-in delay-3">
          Welcome to Dr Neemz Dentistry. We deliver professional,
          anxiety-free treatments in a calming environment using
          surgical-grade safety procedures and 100% digital diagnostics.
        </p>

        <div className="hero-split-actions animate-fade-in delay-4">
          <button className="btn btn-primary btn-lg btn-ripple" onClick={onBookClick}>
            BOOK APPOINTMENT
            <ArrowRight size={18} />
          </button>
          <button className="btn btn-outline-green btn-lg" onClick={onServicesClick}>
            EXPLORE TREATMENTS
          </button>
        </div>

        <div className="hero-split-strip animate-fade-in delay-5">
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
      <div className="hero-split-right animate-fade-in-right delay-3">
        {/* Decorative ring behind image */}
        <div className="hero-img-ring" />
        <div className="hero-img-ring hero-img-ring-2" />

        {/* Floating stat badges */}
        <div className="hero-float-badge hero-badge-top animate-float delay-1">
          <span className="hbadge-num">{patientsCount.toLocaleString()}+</span>
          <span className="hbadge-label">Happy Patients</span>
        </div>

        <div className="hero-float-badge hero-badge-bottom animate-float delay-3">
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
