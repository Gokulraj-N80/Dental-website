import React, { useState } from 'react';
import { Mail, Phone, Clock, Star, Calendar } from 'lucide-react';
import { DOCTORS } from './data/mockDoctors';

export default function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Doctors Directory</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Profiles, medical credentials, working schedules, and performance ratings of the clinical team.</p>
      </div>

      <div className="admin-v2-doctor-grid">
        {DOCTORS.map((doc) => (
          <div className="admin-v2-doctor-card" key={doc.id}>
            <div className="admin-v2-doctor-card-hero" style={{ backgroundColor: doc.color + '20' }}>
              <div className="admin-v2-doctor-card-avatar" style={{ backgroundColor: doc.color }}>
                {doc.initials}
              </div>
            </div>
            <div className="admin-v2-doctor-card-body">
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{doc.name}</h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.8rem', fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {doc.specialization}
              </p>
              
              <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#64748b', lineBreak: 'anywhere' }}>
                {doc.qualification}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={16} color="#eab308" fill="#eab308" />
                  <span><strong>{doc.rating} Rating</strong> ({doc.totalPatients} Patients)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="#64748b" />
                  <span>{doc.experience} yrs Experience</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} color="#64748b" />
                  <span>{doc.workingDays.join(', ')}</span>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setSelectedDoctor(doc)}
                  className="admin-v2-btn admin-v2-btn-secondary"
                  style={{ flex: 1, fontSize: '0.8rem' }}
                >
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Modal */}
      {selectedDoctor && (
        <div className="admin-v2-modal-overlay" onClick={() => setSelectedDoctor(null)}>
          <div className="admin-v2-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-v2-modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Doctor Information</h3>
              <button 
                onClick={() => setSelectedDoctor(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b' }}
              >
                ✕
              </button>
            </div>
            <div className="admin-v2-modal-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div className="admin-v2-avatar" style={{ backgroundColor: selectedDoctor.color, width: '56px', height: '56px', fontSize: '1.3rem' }}>
                  {selectedDoctor.initials}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{selectedDoctor.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedDoctor.specialization}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Biography</h5>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', lineHeight: '1.5' }}>{selectedDoctor.bio}</p>
                </div>

                <div className="admin-v2-detail-grid">
                  <div className="admin-v2-detail-item">
                    <span className="admin-v2-detail-label">Consultation Fee</span>
                    <span className="admin-v2-detail-value">₹{selectedDoctor.consultationFee}</span>
                  </div>
                  <div className="admin-v2-detail-item">
                    <span className="admin-v2-detail-label">Languages Spoken</span>
                    <span className="admin-v2-detail-value">{selectedDoctor.languages.join(', ')}</span>
                  </div>
                </div>

                <div>
                  <h5 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Available Time Slots</h5>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedDoctor.timeSlots.map((slot, idx) => (
                      <span key={idx} className="admin-v2-badge confirmed" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-v2-modal-footer">
              <button onClick={() => setSelectedDoctor(null)} className="admin-v2-btn admin-v2-btn-secondary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
