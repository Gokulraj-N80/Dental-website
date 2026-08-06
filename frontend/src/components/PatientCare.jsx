import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, CreditCard, ShieldCheck, Star, MessageSquare } from 'lucide-react';

const FAQS = [
  {
    q: 'Do you accept walk-in patients?',
    a: 'We prioritize appointments to ensure every patient gets dedicated time with our dentists. However, we do reserve slots for same-day emergencies. Please call us to check availability.'
  },
  {
    q: 'How often should I visit the dentist?',
    a: 'For most patients, we recommend a check-up and professional cleaning every six months. Patients with gum disease or other ongoing conditions may need more frequent visits.'
  },
  {
    q: 'Is dental treatment painful?',
    a: 'We use local anesthesia and advanced numbing techniques to ensure you feel minimal to no discomfort during all procedures. Patient comfort is our top priority.'
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. We offer flexible payment installment plans and accept all major insurance networks. Our admin team can help you navigate your coverage options.'
  },
  {
    q: 'What should I do in a dental emergency?',
    a: 'Call our clinic immediately. We reserve urgent-care slots for emergencies including severe toothache, broken teeth, or knocked-out teeth. Do not delay treatment.'
  },
  {
    q: 'How long do dental implants last?',
    a: 'With proper care, dental implants can last 20–25 years or even a lifetime. Good oral hygiene and regular checkups are essential to preserving them.'
  }
];

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    treatment: 'Dental Implants',
    rating: 5,
    text: 'Absolutely incredible experience. The team made me feel completely at ease, and my implants look and feel totally natural. I could not be happier.'
  },
  {
    name: 'James R.',
    treatment: 'Invisalign',
    rating: 5,
    text: 'I was nervous about getting braces at 32, but Invisalign changed everything. Within months, my smile transformed and nobody even noticed I was wearing them.'
  },
  {
    name: 'Priya K.',
    treatment: 'Cosmetic Whitening',
    rating: 5,
    text: 'I had my whitening done here and the results were stunning — 8 shades brighter after just one visit. The staff is friendly, professional, and very knowledgeable.'
  }
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && <div className="faq-answer"><p>{a}</p></div>}
    </div>
  );
}

export default function PatientCare() {
  return (
    <div className="patient-care-page">
      {/* HERO BANNER */}
      <div className="page-hero-banner">
        <div className="page-hero-inner section">
          <span className="section-tag">Patient Care</span>
          <h1 className="page-hero-title">Your Health, Our Priority</h1>
          <p className="page-hero-subtitle">
            Everything you need to know before, during, and after your visit to DrNeemz Dentistry.
          </p>
        </div>
      </div>

      {/* FAQS */}
      <section className="section patient-care-section" id="faqs">
        <div className="section-header">
          <HelpCircle size={32} className="section-icon-lead" />
          <span className="section-tag">FAQs</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about visiting us, treatments, payments, and more.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      <hr className="section-divider" />

      {/* INSURANCE & PAYMENTS */}
      <section className="section patient-care-section" id="insurance">
        <div className="grid-2 insurance-grid">
          <div>
            <span className="section-tag">Financial Flexibility</span>
            <h2 className="section-title" style={{ textAlign: 'left', maxWidth: 'none', marginBottom: '24px' }}>Insurance & Payment Options</h2>
            <p className="about-p">We believe quality dental care should be accessible to everyone. That's why we accept a wide range of insurance plans and offer flexible financing options designed to fit your budget.</p>
            <div className="insurance-features">
              <div className="insurance-feat-item">
                <ShieldCheck size={20} className="feat-icon" />
                <span>All major insurance networks accepted</span>
              </div>
              <div className="insurance-feat-item">
                <CreditCard size={20} className="feat-icon" />
                <span>Flexible 0% installment payment plans</span>
              </div>
              <div className="insurance-feat-item">
                <ShieldCheck size={20} className="feat-icon" />
                <span>Transparent pricing — no hidden fees</span>
              </div>
              <div className="insurance-feat-item">
                <CreditCard size={20} className="feat-icon" />
                <span>Direct billing to most insurance providers</span>
              </div>
            </div>
          </div>
          <div className="insurance-card-visual">
            <div className="insurance-card-item">
              <h4>Basic Checkup</h4>
              <p>From <strong>$0</strong> with most insurance plans</p>
            </div>
            <div className="insurance-card-item highlight">
              <h4>Dental Implants</h4>
              <p>Monthly plans from <strong>$89/month</strong></p>
            </div>
            <div className="insurance-card-item">
              <h4>Invisalign</h4>
              <p>Monthly plans from <strong>$149/month</strong></p>
            </div>
            <div className="insurance-card-item">
              <h4>Cosmetic Whitening</h4>
              <p>One-time from <strong>$299</strong></p>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* TESTIMONIALS */}
      <section className="section patient-care-section" id="testimonials">
        <div className="section-header">
          <MessageSquare size={32} className="section-icon-lead" />
          <span className="section-tag">Patient Testimonials</span>
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-subtitle">Real experiences from patients who trust us with their smiles.</p>
        </div>
        <div className="grid-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card-premium">
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>
              <p className="testimonial-quote">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <p className="testimonial-treatment">{t.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
