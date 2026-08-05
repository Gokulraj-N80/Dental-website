import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Janakarajan S',
    role: 'Orthodontics Patient',
    text: 'I had a wonderful experience with my orthodontics treatment at this clinic. I initially had crooked and crowded teeth which made me feel self-conscious while smiling. The doctor explained the entire treatment plan in detail and suggested braces. Throughout the treatment every appointment was handled clean and well maintained. I am extremely happy with the results!',
    stars: 5
  },
  {
    id: 2,
    name: 'Barani S',
    role: 'Root Canal & Zirconia Crown Patient',
    text: 'I underwent root canal treatment followed by zirconia brux care crown fixing and the entire experience was excellent. The doctor explained the procedure clearly and ensured complete comfort throughout. The RCT was painless, and the zirconia crown feels extremely strong, fits perfectly, and looks very natural.',
    stars: 5
  },
  {
    id: 3,
    name: 'Kalaiselvi N',
    role: 'Composite Filling Patient',
    text: "I done my light cure composite filling treatment in Dr. Marcus Dentistry... it's very good treatment... and the doctor treated me very friendly and gave so many information about my teeth... and the staff also very friendly. It's a very nice experience.",
    stars: 5
  }
];

export default function Testimonials() {
  // Duplicate data to ensure seamless infinite looping marquee
  const doubleTestimonials = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section className="testimonials-section section">
      <div className="section-header">
        <span className="section-tag">Google Reviews</span>
        <h2 className="section-title">Smiles Shared by Our Patients</h2>
        <p className="section-subtitle">
          Read genuine reviews from patients who experienced our premium dental care.
        </p>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubleTestimonials.map((t, idx) => {
            const initials = t.name
              .split(' ')
              .map((n) => n[0])
              .join('');
            return (
              <div key={`${t.id}-${idx}`} className="testimonial-card testimonial-marquee-card">
                <Quote size={40} className="testimonial-quote-icon" />
                
                <div className="testimonial-stars">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-secondary)" color="var(--color-secondary)" />
                  ))}
                </div>
                
                <p className="testimonial-text">"{t.text}"</p>
                
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {initials}
                  </div>
                  <div className="testimonial-author-info">
                    <h4 className="author-name">{t.name}</h4>
                    <span className="author-role">{t.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

