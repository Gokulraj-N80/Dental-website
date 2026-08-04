import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

import assistAppointment from '../assets/assist_appointment.png';
import assistImplants from '../assets/assist_implants.png';
import assistCleaning from '../assets/assist_cleaning.png';
import assistPain from '../assets/assist_pain.png';
import assistAligners from '../assets/assist_aligners.png';
import assistKids from '../assets/assist_kids.png';
import assistEmergency from '../assets/assist_emergency.png';
import assistFollowup from '../assets/assist_followup.png';

const ASSIST_OPTIONS = [
  { id: 'book', name: 'Book Appointment', image: assistAppointment, treatment: 'ROUTINE CHECK UP' },
  { id: 'implants', name: 'Dental Implants', image: assistImplants, treatment: 'DENTAL IMPLANTS' },
  { id: 'cleaning', name: 'Teeth Cleaning & Whitening', image: assistCleaning, treatment: 'ROUTINE CHECK UP' },
  { id: 'pain', name: 'Tooth Pain / Sensitivity', image: assistPain, treatment: 'ROOT CANAL TREATMENT' },
  { id: 'aligners', name: 'Invis Aligners', image: assistAligners, treatment: 'CLEAR ALIGNERS' },
  { id: 'kids', name: 'Kids Dental Care', image: assistKids, treatment: 'PEDIATRIC DENTISTRY' },
  { id: 'emergency', name: 'Emergency Dental Care', image: assistEmergency, treatment: 'WISDOM TOOTH REMOVAL' },
  { id: 'followup', name: 'Follow-up Visit', image: assistFollowup, treatment: 'ROUTINE CHECK UP' },
];

export default function AssistYou({ onSelectTriage }) {
  return (
    <section className="assist-section section">
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }} data-reveal>
        <h2 className="section-title">HOW MAY WE ASSIST YOU <span style={{ color: 'var(--color-secondary)' }}>TODAY?</span></h2>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Please select the option that best describes your needs to proceed.
        </p>
      </div>

      <div className="assist-grid" data-reveal>
        {ASSIST_OPTIONS.map((option) => (
          <div
            key={option.id}
            className="assist-card"
            onClick={() => onSelectTriage(option.treatment)}
          >
            <div className="assist-img-wrap">
              <img src={option.image} alt={option.name} className="assist-card-img" />
            </div>
            <div className="assist-card-bar">
              <span>{option.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
