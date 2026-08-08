import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "What treatments does DrNeemz Dentistry offer?",
    answer: "We offer comprehensive dental care including general cleanings, advanced implantology, cosmetic design (invisible aligners, veneers), digital root canals, wisdom tooth extractions, and pediatric dentistry."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book instantly using our digital booking form above. Choose your preferred service, select an available date/time slot, and receive instant clinical confirmation."
  },
  {
    question: "What dental technology do you use?",
    answer: "Our clinic is equipped with advanced intraoral scanners, digital low-radiation radiography, and hospital-grade Class-B steam autoclave sterilization chambers for complete patient safety."
  },
  {
    question: "Do you offer flexible payment plans?",
    answer: "Yes. We support transparent billing and offer interest-free monthly EMI payment options for major dental treatments, in addition to accepting all major credit cards, UPI, and insurances."
  },
  {
    question: "What safety protocols do you follow?",
    answer: "Patient safety is our primary focus. We strictly adhere to medical sterilization standards, run regular clinical audits, utilize air filtration systems, and sanitize treatment rooms thoroughly between patients."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section section" id="faq">
      <div className="section-header" data-reveal>
        <span className="section-tag">FAQ</span>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Everything you need to know about our clinical treatments, booking process, and safety standards.
        </p>
      </div>

      <div className="faq-container">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index} 
              className={`faq-item ${isOpen ? 'active' : ''}`}
              data-reveal
              data-delay={index * 80}
            >
              <button 
                className="faq-question-btn" 
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
                  <HelpCircle size={20} className="faq-icon" />
                  <span>{item.question}</span>
                </div>
                <ChevronDown size={18} className="faq-chevron" />
              </button>
              
              <div className="faq-answer-wrapper" style={{ maxHeight: isOpen ? '200px' : '0' }}>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
