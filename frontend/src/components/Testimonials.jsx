import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Emily Watson',
    role: 'Orthodontics Patient',
    text: 'Getting braces as an adult was a big decision, but Dr. Marcus Vance made the process so clear. The Invisalign treatment was smooth, and the clinic is incredibly relaxing.',
    stars: 5
  },
  {
    id: 2,
    name: 'Liam Neill',
    role: 'Implant Patient',
    text: 'Verdant Clinic is modern and extremely clean. I got a dental implant done here and felt virtually no pain. The entire team was professional and caring throughout.',
    stars: 5
  },
  {
    id: 3,
    name: 'Sophia Martinez',
    role: 'General Dentistry Patient',
    text: 'I have dental anxiety, but the staff here goes above and beyond to make you feel comfortable. The gentle cleanings and calming environment have completely changed my outlook.',
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section section">
      <div className="section-header">
        <span className="section-tag">Testimonials</span>
        <h2 className="section-title">What Our Patients Say</h2>
        <p className="section-subtitle">
          Read genuine reviews from patients who experienced our premium dental care.
        </p>
      </div>

      <div className="grid-3">
        {TESTIMONIALS_DATA.map((t) => (
          <div key={t.id} className="testimonial-card">
            <Quote size={32} className="testimonial-quote-icon" />
            <div className="testimonial-stars">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} size={16} fill="var(--color-secondary)" color="var(--color-secondary)" />
              ))}
            </div>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <h4 className="author-name">{t.name}</h4>
              <span className="author-role">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
