import React from 'react';
import { Stethoscope, Cpu, Users, ShieldCheck, CheckCircle } from 'lucide-react';
import doctorImg from '../assets/doctor_trust.png';

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
  return (
    <section className="wt-section">
      <div className="wt-inner">
        {/* Left — image with overlay badge */}
        <div className="wt-visual" data-reveal>
          <div className="wt-img-frame">
            <img src={doctorImg} alt="Our dentist providing care" />
            <div className="wt-badge animate-float-slow">
              <span className="wt-badge-number">15+</span>
              <span className="wt-badge-label">Years of Excellence</span>
            </div>
          </div>
        </div>

        {/* Right — content */}
        <div className="wt-content">
          <div className="wt-header" data-reveal>
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
                  className="wt-pillar"
                  data-reveal
                  data-delay={i * 120}
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
