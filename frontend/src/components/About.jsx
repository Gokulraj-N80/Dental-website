import React from 'react';
import { ShieldCheck, Award, Heart, Stethoscope, Settings } from 'lucide-react';
import clinicInterior from '../assets/clinic_interior.png';
import Journey from './Journey';

const BADGES = [
  { icon: Stethoscope, title: 'Customized Treatments', desc: 'Custom treatments tailored for every age group, from pediatric to senior dental care.' },
  { icon: Award, title: 'Experienced Specialists', desc: 'A team of board-certified dentists and specialist clinical practitioners.' },
  { icon: Heart, title: 'Comfortable Environment', desc: 'A relaxing, comforting clinic layout designed to completely soothe dental anxiety.' },
  { icon: Settings, title: 'Modern Technology', desc: 'State-of-the-art diagnostic imaging scans and high-precision laser equipment.' },
  { icon: ShieldCheck, title: 'Strict Safety Protocols', desc: 'Autoclave Class-B steam sterilization chambers and strict clinical hygiene standards.' }
];

export default function About() {
  return (
    <section className="about-section section" id="about">
      <div className="section-header" data-reveal>
        <span className="section-tag">About Us</span>
        <h2 className="section-title">Professional Care You Can Trust</h2>
        <p className="section-subtitle">
          Learn about our clinic values, qualifications, and certified safety procedures.
        </p>
      </div>

      <div className="grid-2" style={{ marginBottom: '64px' }}>
        {/* Image side — slides in from left */}
        <div className="about-visual-premium reveal-left" data-reveal>
          <div className="about-image-wrapper">
            <img src={clinicInterior} alt="Premium Clinic Equipment" className="about-img" />
            <div className="about-img-badge animate-float-slow">
              <span className="badge-title">HYGIENE FIRST</span>
              <span className="badge-subtitle">ISO 9001 Certified</span>
            </div>
          </div>
        </div>

        {/* Text side — slides in from right */}
        <div className="about-content reveal-right" data-reveal>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', fontWeight: '700' }}>
            Redefining the Dental Experience
          </h3>
          <p className="about-p">
            At Dr. Neemz Dentistry, we believe dental care shouldn't feel stressful. We have created a bright,
            quiet, and welcoming space where patients receive high-quality dental treatments from a team of qualified specialists.
          </p>
          <p className="about-p">
            By investing in digital workflows—like low-radiation 3D X-rays, intraoral cameras, and modern
            chair-side computer systems—we ensure accurate diagnostics, transparent pricing, and treatments
            that are highly effective and virtually painless.
          </p>
        </div>
      </div>

      {/* Badge cards with staggered reveal */}
      <div className="about-badges-grid">
        {BADGES.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.title}
              className="about-badge-card reveal-scale"
              data-reveal
              data-delay={i * 100}
            >
              <Icon className="badge-card-icon" size={24} />
              <h4>{badge.title}</h4>
              <p>{badge.desc}</p>
            </div>
          );
        })}
      </div>

      <hr className="section-divider" />

      {/* History Tree Timeline */}
      <Journey />
    </section>
  );
}
