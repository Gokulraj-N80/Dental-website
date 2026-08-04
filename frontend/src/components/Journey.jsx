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
    <section className="section py-16" id="journey">
      <div className="section-header">
        <span className="section-tag">Our History</span>
        <h2 className="section-title">The Journey of Dr Neemz Dentistry</h2>
        <p className="section-subtitle">
          Milestones that shaped who we are — from clinical foundations to state-of-the-art care.
        </p>
      </div>

      <div className="relative max-w-[800px] mx-auto flex flex-col gap-8">
        {/* Central timeline trunk line */}
        <div
          className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
          style={{ backgroundColor: 'var(--color-accent-light)' }}
        />

        {MILESTONES.map((item, index) => {
          const Icon = item.icon;
          const isLeft = index % 2 === 0;

          return (
            <div
              key={item.year}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                isLeft ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Card half */}
              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                <div
                  className="p-6 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    borderColor: 'var(--color-accent-light)',
                  }}
                >
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-secondary)' }}>
                    {item.year}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-accent)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Center Dot */}
              <div
                className="absolute left-[20px] md:left-1/2 top-6 md:top-auto w-10 h-10 -translate-x-1/2 rounded-full border-4 flex items-center justify-center z-10"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderColor: 'var(--color-secondary)',
                  color: 'var(--color-secondary)',
                }}
              >
                <Icon size={14} />
              </div>

              {/* Empty half for spacing on desktop */}
              <div className="hidden md:block w-1/2" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
