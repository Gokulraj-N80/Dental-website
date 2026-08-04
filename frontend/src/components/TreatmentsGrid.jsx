import React from 'react';
import {
  Sparkles, Sun, PenTool, Zap,
  Scissors, CircleDot, SmilePlus, Wrench,
  Crown, BrickWall, Layers, HeartPulse, Smile,
  ArrowRight
} from 'lucide-react';

const TREATMENTS = [
  { icon: Sparkles, name: 'Teeth Cleaning', color: 'var(--color-secondary)' },
  { icon: Sun, name: 'Teeth Whitening', color: 'var(--color-gold)' },
  { icon: PenTool, name: 'Dental Fillings', color: 'var(--color-secondary)' },
  { icon: Zap, name: 'Root Canal (RCT)', color: 'var(--color-gold)' },
  { icon: Scissors, name: 'Tooth Extraction', color: 'var(--color-secondary)' },
  { icon: CircleDot, name: 'Dental Implants', color: 'var(--color-gold)' },
  { icon: SmilePlus, name: 'Braces', color: 'var(--color-secondary)' },
  { icon: Wrench, name: 'Invis Aligner', color: 'var(--color-gold)' },
  { icon: Crown, name: 'Dental Crowns', color: 'var(--color-secondary)' },
  { icon: BrickWall, name: 'Dental Bridges', color: 'var(--color-gold)' },
  { icon: Layers, name: 'Dentures', color: 'var(--color-secondary)' },
  { icon: HeartPulse, name: 'Gum Treatment', color: 'var(--color-gold)' },
  { icon: Smile, name: 'Smile Designing', color: 'var(--color-secondary)' },
];

export default function TreatmentsGrid({ onGetMore }) {
  return (
    <section className="tg-section section">
      <div className="section-header" data-reveal>
        <span className="section-tag">Our Treatments</span>
        <h2 className="section-title">Comprehensive Dental Services</h2>
        <p className="section-subtitle">
          From routine cleaning to advanced cosmetic procedures — everything under one roof.
        </p>
      </div>

      <div className="tg-grid">
        {TREATMENTS.map((t, i) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className="tg-card"
              data-reveal
              data-delay={i * 50}
              onClick={() => onGetMore && onGetMore(t.name)}
            >
              <div className="tg-card-icon" style={{ '--card-accent': t.color }}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h4 className="tg-card-name">{t.name}</h4>
              <button className="tg-card-link" onClick={(e) => { e.stopPropagation(); onGetMore && onGetMore(t.name); }}>
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
