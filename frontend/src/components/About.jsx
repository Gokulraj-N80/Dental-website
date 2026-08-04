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
    <section className="section py-16" id="about">
      <div className="section-header">
        <span className="section-tag">About Us</span>
        <h2 className="section-title">Professional Care You Can Trust</h2>
        <p className="section-subtitle">
          Learn about our clinic values, qualifications, and certified safety procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        {/* Image side */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <img src={clinicInterior} alt="Premium Clinic Equipment" className="w-full h-full object-cover" />
            <div
              className="absolute bottom-6 left-6 flex flex-col px-5 py-3 rounded-2xl shadow-lg"
              style={{ backgroundColor: 'var(--color-secondary)', color: '#fff', animation: 'floatSlow 5s ease-in-out infinite' }}
            >
              <span className="text-xs font-bold uppercase tracking-wider">HYGIENE FIRST</span>
              <span className="text-[10px] opacity-80">ISO 9001 Certified</span>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
            Redefining the Dental Experience
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
            At Dr Neemz Dentistry, we believe dental care shouldn't feel stressful. We have created a bright,
            quiet, and welcoming space where patients receive high-quality dental treatments from a team of qualified specialists.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
            By investing in digital workflows—like low-radiation 3D X-rays, intraoral cameras, and modern
            chair-side computer systems—we ensure accurate diagnostics, transparent pricing, and treatments
            that are highly effective and virtually painless.
          </p>
        </div>
      </div>

      {/* Badge cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {BADGES.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.title}
              className="flex flex-col gap-3 p-6 rounded-2xl border transition-all duration-300 hover:shadow-md"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-accent-light)',
              }}
            >
              <Icon size={24} style={{ color: 'var(--color-secondary)' }} />
              <h4 className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>
                {badge.title}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
                {badge.desc}
              </p>
            </div>
          );
        })}
      </div>

      <hr className="section-divider my-16" />

      {/* History Tree Timeline */}
      <Journey />
    </section>
  );
}
