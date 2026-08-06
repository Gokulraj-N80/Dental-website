import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Janakarajan S', text: 'Crooked/crowded teeth corrected with braces. Detailed explanation and clean appointments. Happy with results!' },
  { name: 'Barani S', text: 'Painless Root Canal & zirconia crown fixing. Feels extremely strong, fits perfectly, looks very natural.' },
  { name: 'Kalaiselvi N', text: 'Done composite filling in DrNeemz Dentistry... very friendly doctor and staff. Nice experience.' },
];

export default function GoogleReviewsBar() {
  return (
    <div className="google-reviews-bar">
      <div className="reviews-ticker-wrapper">
        <div className="reviews-ticker">
          {REVIEWS.concat(REVIEWS).concat(REVIEWS).map((r, idx) => (
            <div key={idx} className="ticker-review-item">
              <span className="ticker-reviewer">{r.name}</span>
              <div className="ticker-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>
              <span className="ticker-text">"{r.text}"</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
