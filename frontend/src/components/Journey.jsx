import React from 'react';
import { Calendar, Award, Shield, User, Compass } from 'lucide-react';

const MILESTONES = [
  {
    year: '2016',
    title: 'Career Foundation Begins',
    description: 'Began professional training focusing on general diagnostics and patient safety.',
    icon: User
  },
  {
    year: '2018',
    title: 'Expertise Development',
    description: 'Expanded into advanced implantology, cosmetic design, and teeth straightening.',
    icon: Award
  },
  {
    year: '2021',
    title: 'Independent Practice',
    description: 'Established the first private clinic with digital workflows and patient-first care.',
    icon: Compass
  },
  {
    year: '2023',
    title: 'Operational Growth',
    description: 'Upgraded clinic capacity and integrated Class-B steam sterilization chambers.',
    icon: Shield
  },
  {
    year: '2024',
    title: 'Brand Establishment',
    description: 'Launched the premium clinic brand with digital scanners and a professional team.',
    icon: Calendar
  }
];

export default function Journey() {
  return (
    <section className="journey-section section" id="journey">
      <div className="section-header" data-reveal>
        <span className="section-tag">Our History</span>
        <h2 className="section-title">The Journey of Dr Neemz Dentistry</h2>
        <p className="section-subtitle">
          Milestones that shaped who we are — from clinical foundations to state-of-the-art care.
        </p>
      </div>

      <div className="tree-timeline">
        {/* Central trunk */}
        <div className="tree-trunk" />

        {MILESTONES.map((item, index) => {
          const Icon = item.icon;
          const isLeft = index % 2 === 0;

          return (
            <div
              key={item.year}
              className={`tree-row ${isLeft ? 'row-left' : 'row-right'}`}
              data-reveal
              data-delay={index * 140}
            >
              {/* Year label */}
              <div className="tree-year">{item.year}</div>

              {/* Central node dot */}
              <div className="tree-node">
                <div className="tree-dot">
                  <Icon size={14} />
                </div>
              </div>

              {/* Card Container */}
              <div className="tree-card-container">
                <div className="tree-card">
                  <h3 className="tree-card-title">{item.title}</h3>
                  <p className="tree-card-desc">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Root dot at bottom */}
        <div className="tree-root-cap" />
      </div>
    </section>
  );
}
