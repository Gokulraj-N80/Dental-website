import React from 'react';
import { Calendar } from 'lucide-react';

export default function CtaBanner({ onBookClick }) {
  return (
    <section className="cta-banner-section section">
      <div className="cta-banner-card animate-fade-in">
        <div className="cta-banner-content">
          <h2 className="cta-banner-title">Your Journey to a Happier Smile Starts Here</h2>
          <p className="cta-banner-subtitle">
            Schedule a digital intraoral consultation and speak with our board-certified dental specialists today.
          </p>
        </div>
        
        <div className="cta-banner-action">
          <button className="btn btn-primary btn-lg" onClick={onBookClick}>
            <Calendar size={18} style={{ marginRight: '8px' }} />
            <span>BOOK YOUR APPOINTMENT</span>
          </button>
        </div>
      </div>
    </section>
  );
}
