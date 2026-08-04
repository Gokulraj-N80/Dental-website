import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Janakarajan S', text: 'Crooked/crowded teeth corrected with braces. Detailed explanation and clean appointments. Happy with results!' },
  { name: 'Barani S',       text: 'Painless Root Canal & zirconia crown fixing. Feels extremely strong, fits perfectly, looks very natural.' },
  { name: 'Kalaiselvi N',   text: 'Done composite filling in Neemz Dentistry... very friendly doctor and staff. Nice experience.' },
];

export default function GoogleReviewsBar() {
  return (
    <div
      className="w-full py-4 border-y"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-accent-light)' }}
    >
      <div className="reviews-ticker-wrapper">
        <div className="reviews-ticker">
          {REVIEWS.concat(REVIEWS).concat(REVIEWS).map((r, idx) => (
            <div key={idx} className="inline-flex items-center gap-3 shrink-0 px-2">
              <span className="text-xs font-bold" style={{ color: 'var(--color-secondary)' }}>
                {r.name}
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>
              <span className="text-xs italic" style={{ color: 'var(--color-accent-medium)' }}>
                "{r.text}"
              </span>
              <span className="text-[var(--color-accent-light)] mx-3 text-lg">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
