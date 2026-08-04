import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Janakarajan S',
    role: 'Orthodontics Patient',
    stars: 5,
    text: 'I had a wonderful experience with my orthodontics treatment at this clinic. I initially had crooked and crowded teeth which made me feel self-conscious while smiling. The doctor explained the entire treatment plan in detail and suggested braces. Throughout the treatment every appointment was handled clean and well maintained. I am extremely happy with the results!',
  },
  {
    id: 2,
    name: 'Barani S',
    role: 'Root Canal & Zirconia Crown Patient',
    stars: 5,
    text: 'I underwent root canal treatment followed by zirconia brux care crown fixing and the entire experience was excellent. The doctor explained the procedure clearly and ensured complete comfort throughout. The RCT was painless, and the zirconia crown feels extremely strong, fits perfectly, and looks very natural.',
  },
  {
    id: 3,
    name: 'Kalaiselvi N',
    role: 'Composite Filling Patient',
    stars: 5,
    text: "I done my light cure composite filling treatment in Neemz Dentistry... it's very good treatment... and the doctor treated me very friendly and gave so many information about my teeth... and the staff also very friendly. It's a very nice experience.",
  },
];

export default function Testimonials() {
  const doubled = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section className="w-full py-20 overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* Header */}
      <div className="text-center px-6 mb-12">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ backgroundColor: 'var(--color-gold-soft)', color: 'var(--color-secondary)' }}
        >
          Google Reviews
        </span>
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}
        >
          Smiles Shared by Our Patients
        </h2>
        <p className="text-base max-w-[520px] mx-auto" style={{ color: 'var(--color-accent-medium)' }}>
          Read genuine reviews from patients who experienced our premium dental care.
        </p>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="flex flex-col gap-4 p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                width: '360px',
                flexShrink: 0,
                backgroundColor: 'var(--color-primary)',
                borderColor: 'var(--color-accent-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Quote size={28} style={{ color: 'var(--color-secondary)', opacity: 0.4 }} />
              <div className="flex gap-1">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--color-secondary)" color="var(--color-secondary)" />
                ))}
              </div>
              <p
                className="text-sm leading-relaxed italic flex-1"
                style={{ color: 'var(--color-accent)' }}
              >
                "{t.text}"
              </p>
              <div
                className="flex flex-col gap-1 border-t pt-4"
                style={{ borderColor: 'var(--color-accent-light)' }}
              >
                <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>
                  {t.name}
                </span>
                <span className="text-xs font-semibold" style={{ color: 'var(--color-secondary)' }}>
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
