import React from 'react';
import {
  Sparkles, Sun, PenTool, Zap,
  Scissors, CircleDot, SmilePlus, Wrench,
  Crown, BrickWall, Layers, HeartPulse, Smile,
  ArrowRight
} from 'lucide-react';

const TREATMENTS = [
  { icon: Sparkles, name: 'Teeth Cleaning', color: '#2d9a5c' },
  { icon: Sun, name: 'Teeth Whitening', color: '#d4a017' },
  { icon: PenTool, name: 'Dental Fillings', color: '#3584c4' },
  { icon: Zap, name: 'Root Canal (RCT)', color: '#c0392b' },
  { icon: Scissors, name: 'Tooth Extraction', color: '#8e44ad' },
  { icon: CircleDot, name: 'Dental Implants', color: '#1abc9c' },
  { icon: SmilePlus, name: 'Braces', color: '#e67e22' },
  { icon: Wrench, name: 'Invis Aligner', color: '#2980b9' },
  { icon: Crown, name: 'Dental Crowns', color: '#c0872a' },
  { icon: BrickWall, name: 'Dental Bridges', color: '#27ae60' },
  { icon: Layers, name: 'Dentures', color: '#7f8c8d' },
  { icon: HeartPulse, name: 'Gum Treatment', color: '#e74c6f' },
  { icon: Smile, name: 'Smile Designing', color: '#f39c12' },
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
