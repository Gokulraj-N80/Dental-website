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
    <section className="section py-16" id="treatments">
      <div className="section-header">
        <span className="section-tag">Our Treatments</span>
        <h2 className="section-title">Comprehensive Dental Services</h2>
        <p className="section-subtitle">
          From routine cleaning to advanced cosmetic procedures — everything under one roof.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TREATMENTS.map((t, i) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className="flex flex-col gap-4 p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderColor: 'var(--color-accent-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
              onClick={() => onGetMore && onGetMore(t.name)}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center self-start"
                style={{ backgroundColor: 'var(--color-secondary-soft)', color: t.color }}
              >
                <Icon size={24} strokeWidth={1.8} />
              </div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>
                {t.name}
              </h4>
              <button
                className="self-start text-xs font-bold inline-flex items-center gap-1.5 transition-opacity hover:opacity-75"
                style={{ color: 'var(--color-secondary)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onGetMore && onGetMore(t.name);
                }}
              >
                Learn More <ArrowRight size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
