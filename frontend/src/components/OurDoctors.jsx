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
    <div>
      {/* Hero Banner */}
      <div className="page-hero-banner">
        <div className="page-hero-inner section">
          <span className="section-tag">Our Team</span>
          <h1 className="page-hero-title">Meet Our Doctors</h1>
          <p className="page-hero-subtitle">
            Board-certified dental specialists committed to delivering exceptional care with the highest clinical standards.
          </p>
        </div>
      </div>

      {/* Doctors Section */}
      <section className="section" id="doctors">
        <div className="doctors-grid">
          {DOCTORS.map((doc, i) => (
            <div key={i} className="doctor-card">
              {/* Avatar */}
              <div className="doctor-avatar-wrap">
                <div className="doctor-avatar-image-container">
                  <img src={doc.image} alt={doc.name} className="doctor-avatar-img" />
                </div>
              </div>

              {/* Info */}
              <div className="doctor-info">
                <div className="doctor-name-block">
                  <h3 className="doctor-name">{doc.name}</h3>
                  <p className="doctor-title">{doc.title}</p>
                  <div className="doctor-exp-badge">
                    <Clock size={14} />
                    <span>{doc.experience}</span>
                  </div>
                </div>

                <p className="doctor-bio">{doc.bio}</p>

                <div className="doctor-education">
                  <GraduationCap size={16} className="doctor-info-icon" />
                  <span>{doc.education}</span>
                </div>

                <div className="doctor-specializations">
                  <Stethoscope size={16} className="doctor-info-icon" />
                  <div className="spec-tags">
                    {doc.specializations.map((spec, j) => (
                      <span key={j} className="spec-tag">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Awards Strip */}
        <div className="awards-strip">
          <div className="award-badge">
            <Award size={24} />
            <div>
              <strong>Best Dental Clinic 2024</strong>
              <p>Regional Healthcare Awards</p>
            </div>
          </div>
          <div className="award-badge">
            <Star size={24} />
            <div>
              <strong>4.9 / 5.0 Rating</strong>
              <p>Based on 320+ patient reviews</p>
            </div>
          </div>
          <div className="award-badge">
            <GraduationCap size={24} />
            <div>
              <strong>Board Certified Specialists</strong>
              <p>All practitioners are fully licensed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
