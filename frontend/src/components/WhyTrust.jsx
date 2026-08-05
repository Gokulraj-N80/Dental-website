import React, { useEffect, useRef, useState } from 'react';
import { Stethoscope, Cpu, Users, ShieldCheck, CheckCircle } from 'lucide-react';
import doctorImg from '../assets/doctor_trust.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const [yearsCount, setYearsCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge count up timeline triggered by scroll
      const countObj = { val: 0 };
      gsap.to(countObj, {
        val: 15,
        duration: 1.5,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.wt-badge',
          start: 'top 85%',
        },
        onUpdate: () => {
          setYearsCount(Math.floor(countObj.val));
        }
      });

      // Stagger elements entry
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      tl.from('.wt-img-frame', {
        opacity: 0,
        x: -50,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.wt-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2)'
      }, '-=0.5')
      .from('.wt-header', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.7')
      .from('.wt-pillar', {
        opacity: 0,
        y: 35,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out'
      }, '-=0.5');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="wt-section" ref={containerRef}>
      <div className="wt-inner">
        {/* Left — image with overlay badge */}
        <div className="wt-visual">
          <div className="wt-img-frame">
            <img src={doctorImg} alt="Our dentist providing care" />
            <div className="wt-badge">
              <span className="wt-badge-number">{yearsCount}+</span>
              <span className="wt-badge-label">Years of Excellence</span>
            </div>
          </div>
        </div>

        {/* Right — content */}
        <div className="wt-content">
          <div className="wt-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="wt-title">
              Trusted Care,<br />
              <span className="wt-title-accent">Exceptional Results</span>
            </h2>
            <p className="wt-desc">
              We combine clinical expertise with modern technology to deliver dental care
              that is safe, comfortable, and truly effective.
            </p>
          </div>

          <div className="wt-pillars">
            {TRUST_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="wt-pillar interactive-card"
                >
                  <div className="wt-pillar-icon-wrap">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className="wt-pillar-body">
                    <h4>{pillar.title}</h4>
                    <ul>
                      {pillar.points.map((pt, j) => (
                        <li key={j}>
                          <CheckCircle size={14} strokeWidth={2} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

