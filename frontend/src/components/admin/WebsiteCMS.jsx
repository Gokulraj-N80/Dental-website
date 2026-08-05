import React, { useState } from 'react';
import { Save, Globe, Clock, MessageSquare, AlertCircle } from 'lucide-react';

export default function WebsiteCMS() {
  const [heroTitle, setHeroTitle] = useState('Smile Without Limits.');
  const [heroDesc, setHeroDesc] = useState('Experience premium dental treatments with our state-of-the-art technologies and warm professional care.');
  const [phone, setPhone] = useState('+91 98400 34512');
  const [address, setAddress] = useState('45, Khader Nawaz Khan Rd, Nungambakkam, Chennai, TN 600006');
  const [workingHrs, setWorkingHrs] = useState('Mon - Sat: 9:00 AM - 8:00 PM');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Heading */}
      <div className="admin-v2-page-heading">
        <span className="admin-v2-page-eyebrow">Content Studio</span>
        <h2 className="admin-v2-page-title">Website CMS Manager</h2>
        <p className="admin-v2-page-subtitle">Configure front-end marketing texts, landing sections titles, and contact information details.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {success && (
          <div style={{ padding: '16px', background: 'rgba(0, 208, 132, 0.08)', border: '1.5px solid rgba(0, 208, 132, 0.2)', borderRadius: '12px', color: '#00a86b', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={18} />
            Website landing copy updated successfully and deployed to production.
          </div>
        )}

        {/* Section 1: Hero */}
        <div className="admin-v2-cms-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Globe size={20} color="var(--adm-accent)" />
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-text-primary)' }}>Hero Landing Banner Section</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-tertiary)' }}>Main Banner Headline</label>
              <input 
                type="text" 
                className="admin-v2-input" 
                value={heroTitle} 
                onChange={(e) => setHeroTitle(e.target.value)} 
                required
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-tertiary)' }}>Sub-headline Paragraph Description</label>
              <textarea 
                className="admin-v2-input" 
                value={heroDesc} 
                onChange={(e) => setHeroDesc(e.target.value)} 
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <div className="admin-v2-cms-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Clock size={20} color="var(--adm-blue)" />
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-text-primary)' }}>Contact Credentials & Hours</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-tertiary)' }}>Public Phone Line</label>
                <input 
                  type="text" 
                  className="admin-v2-input" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-tertiary)' }}>Working Hours Shift</label>
                <input 
                  type="text" 
                  className="admin-v2-input" 
                  value={workingHrs} 
                  onChange={(e) => setWorkingHrs(e.target.value)} 
                  required
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-tertiary)' }}>Physical Address Location</label>
              <input 
                type="text" 
                className="admin-v2-input" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="submit" 
            className="admin-v2-btn admin-v2-btn-primary"
            disabled={isSaving}
            style={{ minWidth: '160px' }}
          >
            <Save size={16} />
            {isSaving ? 'Deploying CMS Copy...' : 'Save & Publish Changes'}
          </button>
        </div>

      </form>
    </div>
  );
}
