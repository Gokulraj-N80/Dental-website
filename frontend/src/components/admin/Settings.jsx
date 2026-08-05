import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  // Config options
  const [clinicName, setClinicName] = useState('Dr. Marcus Dentistry');
  const [clinicEmail, setClinicEmail] = useState('care@drmarcus.com');
  const [smsGateway, setSmsGateway] = useState('Twilio SMS Sandbox');
  const [backupPeriod, setBackupPeriod] = useState('Daily');

  const handleSave = (tab) => {
    alert(`Settings: ${tab} configurations settings updated successfully.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Clinic Settings</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Configure rules parameters, user permissions, email notification settings, and SMS templates.</p>
      </div>

      <div className="admin-v2-card" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '30px', alignItems: 'start' }}>
        {/* Navigation tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('general')}
            className={`admin-v2-nav-item ${activeTab === 'general' ? 'active' : ''}`}
            style={{ padding: '8px 12px' }}
          >
            General settings
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`admin-v2-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            style={{ padding: '8px 12px' }}
          >
            SMS / Email setup
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`admin-v2-nav-item ${activeTab === 'security' ? 'active' : ''}`}
            style={{ padding: '8px 12px' }}
          >
            Database backup
          </button>
        </div>

        {/* Tab body content */}
        <div style={{ minWidth: 0 }}>
          {activeTab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>General Information</h3>
              <div className="admin-v2-detail-item">
                <span className="admin-v2-detail-label" style={{ marginBottom: '6px' }}>Clinic Name</span>
                <input 
                  type="text" 
                  className="admin-v2-input" 
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                />
              </div>
              <div className="admin-v2-detail-item">
                <span className="admin-v2-detail-label" style={{ marginBottom: '6px' }}>Contact Email Address</span>
                <input 
                  type="email" 
                  className="admin-v2-input" 
                  value={clinicEmail}
                  onChange={(e) => setClinicEmail(e.target.value)}
                />
              </div>
              <button 
                onClick={() => handleSave('General Info')}
                className="admin-v2-btn admin-v2-btn-primary"
                style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Save size={16} /> Save Settings
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Notifications Gateway</h3>
              <div className="admin-v2-detail-item">
                <span className="admin-v2-detail-label" style={{ marginBottom: '6px' }}>SMS Gateway Vendor</span>
                <input 
                  type="text" 
                  className="admin-v2-input" 
                  value={smsGateway}
                  onChange={(e) => setSmsGateway(e.target.value)}
                />
              </div>
              <button 
                onClick={() => handleSave('SMS Vendor')}
                className="admin-v2-btn admin-v2-btn-primary"
                style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Save size={16} /> Save Gateway
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>System Security</h3>
              <div className="admin-v2-detail-item">
                <span className="admin-v2-detail-label" style={{ marginBottom: '6px' }}>Backup Cycle Period</span>
                <select className="admin-v2-select" value={backupPeriod} onChange={(e) => setBackupPeriod(e.target.value)}>
                  <option value="Daily">Daily Backup</option>
                  <option value="Weekly">Weekly Backup</option>
                  <option value="Monthly">Monthly Backup</option>
                </select>
              </div>
              <button 
                onClick={() => handleSave('System Security')}
                className="admin-v2-btn admin-v2-btn-primary"
                style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Save size={16} /> Save System rules
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
