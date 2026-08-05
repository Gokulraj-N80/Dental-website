import React, { useState } from 'react';
import { Save, Shield, Sliders, Database, Mail } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  // Config options
  const [clinicName, setClinicName] = useState('Dr. Marcus Dentistry');
  const [currency, setCurrency] = useState('INR');
  const [smsGateway, setSmsGateway] = useState('twilio');
  const [autoSms, setAutoSms] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupSchedule, setBackupSchedule] = useState('daily');
  const [isSaving, setIsSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedMsg(false);
    setTimeout(() => {
      setIsSaving(false);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Heading */}
      <div className="admin-v2-page-heading">
        <span className="admin-v2-page-eyebrow">System Config</span>
        <h2 className="admin-v2-page-title">Settings Console</h2>
        <p className="admin-v2-page-subtitle">Configure medical database variables, automation triggers, SMS gateways, and backups.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px', alignItems: 'flex-start' }}>
        
        {/* Navigation Sidebar-Tabs */}
        <div className="admin-v2-card" style={{ padding: '16px 12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button 
              onClick={() => setActiveTab('general')} 
              className={`admin-v2-nav-item ${activeTab === 'general' ? 'active' : ''}`}
            >
              <Sliders size={16} />
              <span className="admin-v2-nav-item-text" style={{ fontSize: '0.82rem' }}>General Settings</span>
            </button>
            <button 
              onClick={() => setActiveTab('sms')} 
              className={`admin-v2-nav-item ${activeTab === 'sms' ? 'active' : ''}`}
            >
              <Mail size={16} />
              <span className="admin-v2-nav-item-text" style={{ fontSize: '0.82rem' }}>SMS Notifications</span>
            </button>
            <button 
              onClick={() => setActiveTab('backup')} 
              className={`admin-v2-nav-item ${activeTab === 'backup' ? 'active' : ''}`}
            >
              <Database size={16} />
              <span className="admin-v2-nav-item-text" style={{ fontSize: '0.82rem' }}>Backup & Restore</span>
            </button>
          </div>
        </div>

        {/* Configurations Fields */}
        <div className="admin-v2-card">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {savedMsg && (
              <div style={{ padding: '16px', background: 'rgba(0, 208, 132, 0.08)', border: '1.5px solid rgba(0, 208, 132, 0.2)', borderRadius: '12px', color: '#00a86b', fontSize: '0.875rem', fontWeight: 600 }}>
                System configurations saved successfully and applied locally.
              </div>
            )}

            {activeTab === 'general' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700 }}>General Clinic Profile</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-tertiary)' }}>Clinic Brand Name</label>
                  <input 
                    type="text" 
                    className="admin-v2-input" 
                    value={clinicName} 
                    onChange={(e) => setClinicName(e.target.value)} 
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-tertiary)' }}>Billing Currency Code</label>
                  <select 
                    className="admin-v2-select" 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="INR">INR (₹) - Indian Rupee</option>
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'sms' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700 }}>Patient Auto SMS Configuration</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-tertiary)' }}>SMS Delivery Service Provider</label>
                  <select 
                    className="admin-v2-select" 
                    value={smsGateway} 
                    onChange={(e) => setSmsGateway(e.target.value)}
                  >
                    <option value="twilio">Twilio SMS Integration</option>
                    <option value="plivo">Plivo Cloud Gateway</option>
                    <option value="msg91">MSG91 Standard</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <input 
                    type="checkbox" 
                    id="autoSms"
                    checked={autoSms} 
                    onChange={(e) => setAutoSms(e.target.checked)} 
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--adm-accent)' }}
                  />
                  <label htmlFor="autoSms" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--adm-text-secondary)', cursor: 'pointer' }}>
                    Send automated booking confirmations and checkin schedules texts.
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700 }}>Database Backups Scheduler</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--adm-text-tertiary)' }}>Backup Cron Schedule</label>
                  <select 
                    className="admin-v2-select" 
                    value={backupSchedule} 
                    onChange={(e) => setBackupSchedule(e.target.value)}
                  >
                    <option value="daily">Every 24 Hours (Daily)</option>
                    <option value="weekly">Every 7 Days (Weekly)</option>
                    <option value="monthly">Every 30 Days (Monthly)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <input 
                    type="checkbox" 
                    id="autoBackup"
                    checked={autoBackup} 
                    onChange={(e) => setAutoBackup(e.target.checked)} 
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--adm-accent)' }}
                  />
                  <label htmlFor="autoBackup" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--adm-text-secondary)', cursor: 'pointer' }}>
                    Enable automatic system JSON backups to cloud storage bucket.
                  </label>
                </div>
              </div>
            )}

            <div className="admin-v2-divider" />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="submit" 
                className="admin-v2-btn admin-v2-btn-primary"
                disabled={isSaving}
                style={{ minWidth: '140px' }}
              >
                <Save size={16} />
                {isSaving ? 'Saving Configurations...' : 'Save Settings'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
