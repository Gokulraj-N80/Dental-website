import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from './data/mockReviews';

export default function Reviews() {
  const [reviews, setReviews] = useState(REVIEWS);
  const [replyText, setReplyText] = useState({});

  const handleReplyChange = (id, text) => {
    setReplyText(prev => ({ ...prev, [id]: text }));
  };

  const submitReply = (id) => {
    const text = replyText[id];
    if (!text) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, replied: true, reply: text } : r));
    setReplyText(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Patient Reviews & Ratings</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Patient feedbacks tracker, star ratings, and reply portal.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {reviews.map((rev) => (
          <div className="admin-v2-card" key={rev.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="admin-v2-avatar" style={{ backgroundColor: rev.avatarColor, width: '36px', height: '36px', fontSize: '0.9rem' }}>
                  {rev.patientInitials}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{rev.patientName}</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Reviewed on {rev.reviewDate} • Via {rev.platform}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    color={i < rev.rating ? "#eab308" : "#cbd5e1"} 
                    fill={i < rev.rating ? "#eab308" : "transparent"} 
                  />
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#334155', margin: '0 0 16px 0', fontStyle: 'italic', lineHeight: '1.5' }}>
              "{rev.text}"
            </p>

            <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#64748b', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '16px' }}>
              <span>Treatment: <strong>{rev.treatment}</strong></span>
              <span>Doctor: <strong>{rev.doctor}</strong></span>
            </div>

            {/* Reply thread */}
            {rev.replied ? (
              <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '4px' }}>Clinic Response:</span>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>{rev.reply}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input 
                  type="text" 
                  placeholder="Type clinic response reply..." 
                  className="admin-v2-input"
                  style={{ flex: 1, fontSize: '0.85rem' }}
                  value={replyText[rev.id] || ''}
                  onChange={(e) => handleReplyChange(rev.id, e.target.value)}
                />
                <button 
                  onClick={() => submitReply(rev.id)}
                  className="admin-v2-btn admin-v2-btn-primary"
                  style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                >
                  Post Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
