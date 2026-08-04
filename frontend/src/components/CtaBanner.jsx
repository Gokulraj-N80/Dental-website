import React from 'react';
import { Calendar } from 'lucide-react';

export default function CtaBanner({ onBookClick }) {
  return (
    <section className="w-full px-6 md:px-12 py-16" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div
        className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-12 rounded-3xl animate-[fadeInUp_0.8s_ease-out]"
        style={{
          background: 'linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-gradient-end) 100%)',
          boxShadow: 'var(--shadow-gold)',
        }}
      >
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Your Journey to a Happier Smile Starts Here
          </h2>
          <p className="text-sm md:text-base opacity-80 text-white max-w-[500px]">
            Schedule a digital intraoral consultation and speak with our board-certified dental specialists today.
          </p>
        </div>

        <button
          onClick={onBookClick}
          className="btn-ripple inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white border-2 border-white/30 transition-all duration-300 hover:bg-white/10 hover:scale-105 shrink-0"
        >
          <Calendar size={18} />
          <span>Book Your Appointment</span>
        </button>
      </div>
    </section>
  );
}
