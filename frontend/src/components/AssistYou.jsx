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
    <section className="section py-16" id="assist">
      <div className="section-header">
        <span className="section-tag">How may we help?</span>
        <h2 className="section-title">
          HOW MAY WE ASSIST YOU <span style={{ color: 'var(--color-secondary)' }}>TODAY?</span>
        </h2>
        <p className="section-subtitle">
          Please select the option that best describes your needs to proceed.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {ASSIST_OPTIONS.map((option) => (
          <div
            key={option.id}
            className="flex flex-col rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{
              backgroundColor: 'var(--color-primary)',
              borderColor: 'var(--color-accent-light)',
              boxShadow: 'var(--shadow-sm)',
            }}
            onClick={() => onSelectTriage(option.treatment)}
          >
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img src={option.image} alt={option.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="p-4 text-center font-bold text-xs md:text-sm" style={{ color: 'var(--color-accent)' }}>
              <span>{option.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
