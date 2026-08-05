import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function WebsiteCMS() {
  const [heroTitle, setHeroTitle] = useState('Smile Without Limits.');
  const [heroDesc, setHeroDesc] = useState('Experience premium dental care in a soothing environment, designed around your comfort.');
  const [workingHrs, setWorkingHrs] = useState('Mon - Sat: 9:00 AM - 7:00 PM');
  const [seoTitle, setSeoTitle] = useState('Dr. Marcus Dentistry | Premium Dental Clinic Chennai');

  const handleSave = (section) => {
    alert(`Website CMS: ${section} content configuration settings saved successfully!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Website CMS Manager</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Configure text layout copy, working hours, active banners, and SEO title meta settings.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Hero Section */}
        <div className="admin-v2-cms-section">
          <h4>Hero Layout Content</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="admin-v2-detail-item">
              <span className="admin-v2-detail-label" style={{ marginBottom: '6px' }}>Headline Text</span>
              <input 
                type="text" 
                className="admin-v2-input" 
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
              />
            </div>
            <div className="admin-v2-detail-item">
              <span className="admin-v2-detail-label" style={{ marginBottom: '6px' }}>Subtext Description</span>
              <textarea 
                className="admin-v2-input" 
                rows={3}
                value={heroDesc}
                onChange={(e) => setHeroDesc(e.target.value)}
                style={{ resize: 'none', padding: '10px' }}
              />
            </div>
            <button 
              onClick={() => handleSave('Hero Layout')}
              className="admin-v2-btn admin-v2-btn-primary" 
              style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>

        {/* Working Hours */}
        <div className="admin-v2-cms-section">
          <h4>Working Hours Info</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="admin-v2-detail-item">
              <span className="admin-v2-detail-label" style={{ marginBottom: '6px' }}>Available Hours Display</span>
              <input 
                type="text" 
                className="admin-v2-input" 
                value={workingHrs}
                onChange={(e) => setWorkingHrs(e.target.value)}
              />
            </div>
            <button 
              onClick={() => handleSave('Working Hours')}
              className="admin-v2-btn admin-v2-btn-primary" 
              style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>

        {/* SEO Metadata */}
        <div className="admin-v2-cms-section">
          <h4>Global SEO Metadata</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="admin-v2-detail-item">
              <span className="admin-v2-detail-label" style={{ marginBottom: '6px' }}>Browser Title tag</span>
              <input 
                type="text" 
                className="admin-v2-input" 
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
              />
            </div>
            <button 
              onClick={() => handleSave('SEO Metadata')}
              className="admin-v2-btn admin-v2-btn-primary" 
              style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
