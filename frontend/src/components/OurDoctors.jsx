import React from 'react';
import { Star, Award, GraduationCap, Stethoscope, Clock } from 'lucide-react';
import drVanceImg from '../assets/dr_marcus_vance.png';
import drSharmaImg from '../assets/dr_priya_sharma.png';
import drOseiImg from '../assets/dr_kelvin_osei.png';

const DOCTORS = [
  {
    name: 'Dr. Marcus Vance',
    title: 'Lead Dentist & Implantologist',
    experience: '14 Years Experience',
    specializations: ['Dental Implants', 'Cosmetic Dentistry', 'Oral Surgery'],
    education: 'BDS, MDS — Harvard School of Dental Medicine',
    bio: 'Dr. Vance brings over a decade of expertise in restorative and cosmetic dentistry. He specializes in complex full-arch implant reconstruction and smile design, combining surgical precision with an artistic eye to create beautiful, lasting results.',
    image: drVanceImg,
  },
  {
    name: 'Dr. Priya Sharma',
    title: 'Orthodontist & Aligners Specialist',
    experience: '10 Years Experience',
    specializations: ['Invisalign', 'Dental Braces', 'Smile Makeovers'],
    education: 'BDS, Orthodontic Specialty — NYU College of Dentistry',
    bio: 'Dr. Sharma is a certified Invisalign provider with thousands of successful case completions. She is passionate about creating life-changing smile transformations using the most discreet and comfortable alignment solutions available.',
    image: drSharmaImg,
  },
  {
    name: 'Dr. Kelvin Osei',
    title: 'Periodontist & Gum Specialist',
    experience: '9 Years Experience',
    specializations: ['Gum Treatment', 'Laser Dentistry', 'Bone Grafting'],
    education: 'BDS, Periodontics Specialty — King\'s College London',
    bio: 'Dr. Osei focuses on the health of the gums and supporting structures of the teeth. His expertise in laser periodontal therapy and minimally invasive techniques ensures faster recovery with superior outcomes for patients with gum disease.',
    image: drOseiImg,
  }
];

export default function OurDoctors() {
  return (
    <div style={{ backgroundColor: 'var(--color-primary)' }}>
      {/* Hero Banner */}
      <div
        className="w-full py-20 px-8 text-center"
        style={{
          background: 'linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-gradient-end) 100%)',
        }}
      >
        <div className="max-w-[800px] mx-auto flex flex-col gap-3">
          <span
            className="inline-flex self-center items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white/90"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Meet Our Doctors
          </h1>
          <p className="text-sm md:text-base text-white/80 max-w-[600px] mx-auto leading-relaxed">
            Board-certified dental specialists committed to delivering exceptional care with the highest clinical standards.
          </p>
        </div>
      </div>

      {/* Doctors Section */}
      <section className="section py-16" id="doctors">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doc, i) => (
            <div
              key={i}
              className="flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderColor: 'var(--color-accent-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Avatar */}
              <div className="w-full aspect-[4/3] bg-neutral-100 overflow-hidden relative">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-4 flex-grow">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>
                    {doc.name}
                  </h3>
                  <p className="text-xs font-bold" style={{ color: 'var(--color-secondary)' }}>
                    {doc.title}
                  </p>
                  <div
                    className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border mt-2"
                    style={{ borderColor: 'var(--color-accent-light)', color: 'var(--color-accent-medium)' }}
                  >
                    <Clock size={12} />
                    <span>{doc.experience}</span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
                  {doc.bio}
                </p>

                <div className="border-t pt-4 flex flex-col gap-3" style={{ borderColor: 'var(--color-accent-light)' }}>
                  <div className="flex items-start gap-2.5">
                    <GraduationCap size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    <span className="text-[11px] leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
                      {doc.education}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Stethoscope size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specializations.map((spec, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Awards Strip */}
        <div
          className="mt-16 p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8 border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-accent-light)',
          }}
        >
          <div className="flex items-center gap-4">
            <Award size={32} style={{ color: 'var(--color-secondary)' }} />
            <div>
              <strong className="text-sm block" style={{ color: 'var(--color-accent)' }}>Best Dental Clinic 2024</strong>
              <p className="text-xs" style={{ color: 'var(--color-accent-medium)' }}>Regional Healthcare Awards</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Star size={32} style={{ color: 'var(--color-secondary)' }} />
            <div>
              <strong className="text-sm block" style={{ color: 'var(--color-accent)' }}>4.9 / 5.0 Rating</strong>
              <p className="text-xs" style={{ color: 'var(--color-accent-medium)' }}>Based on 320+ patient reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GraduationCap size={32} style={{ color: 'var(--color-secondary)' }} />
            <div>
              <strong className="text-sm block" style={{ color: 'var(--color-accent)' }}>Board Certified Specialists</strong>
              <p className="text-xs" style={{ color: 'var(--color-accent-medium)' }}>All practitioners are fully licensed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
