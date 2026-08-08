import React, { useState } from 'react';
import { Search, Eye, X, Activity, User, Award, DollarSign, Plus } from 'lucide-react';
import { PATIENTS } from './data/mockPatients';

export default function Patients({ searchGlobal }) {
  const [patients, setPatients] = useState(PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [drawerTab, setDrawerTab] = useState('clinical');
  const [searchLocal, setSearchLocal] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    city: '',
    email: '',
    medicalHistory: 'None reported',
    pendingAmount: 0
  });

  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.phone) return;

    const names = newPatient.name.trim().split(' ');
    const initials = names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const id = `PT-${String(patients.length + 101).padStart(3, '0')}`;
    const avatarColors = ['#0d9488', '#0ea5e9', '#f97316', '#8b5cf6', '#10b981'];
    const avatarColor = avatarColors[patients.length % avatarColors.length];

    const added = {
      id,
      name: newPatient.name,
      age: parseInt(newPatient.age) || 30,
      gender: newPatient.gender,
      phone: newPatient.phone,
      city: newPatient.city || 'Chennai',
      email: newPatient.email || `${newPatient.name.toLowerCase().replace(/ /g, '')}@example.com`,
      initials,
      avatarColor,
      lastVisit: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      medicalHistory: newPatient.medicalHistory || 'None reported',
      medicalConditions: newPatient.medicalHistory ? [newPatient.medicalHistory] : ['Healthy'],
      pendingAmount: parseFloat(newPatient.pendingAmount) || 0,
      billingLedger: [
        {
          id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          treatment: 'Registration & General Consultation',
          amount: parseFloat(newPatient.pendingAmount) || 0,
          status: parseFloat(newPatient.pendingAmount) > 0 ? 'Pending' : 'Settled'
        }
      ]
    };

    setPatients(prev => [added, ...prev]);
    setShowAddModal(false);
    // Reset form
    setNewPatient({
      name: '',
      age: '',
      gender: 'Male',
      phone: '',
      city: '',
      email: '',
      medicalHistory: 'None reported',
      pendingAmount: 0
    });
  };

  const filtered = patients.filter(p => {
    const query = (searchGlobal || searchLocal).toLowerCase();
    return (
      p.id.toLowerCase().includes(query) ||
      p.name.toLowerCase().includes(query) ||
      p.phone.includes(query) ||
      p.city.toLowerCase().includes(query) ||
      p.medicalConditions.some(c => c.toLowerCase().includes(query))
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Heading */}
      <div className="admin-v2-page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="admin-v2-page-eyebrow">Medical Registry</span>
          <h2 className="admin-v2-page-title">Patients Directory</h2>
          <p className="admin-v2-page-subtitle">Unified registry of clinical profiles, diagnostics records, case files history, and ledger accounts.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="admin-v2-btn admin-v2-btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', height: '40px', fontWeight: 600 }}
        >
          <Plus size={16} /> Register Patient
        </button>
      </div>

      <div className="admin-v2-card">
        <div className="admin-v2-table-filters">
          <div className="admin-v2-filter-group">
            <div className="admin-v2-search-field">
              <Search size={16} color="#8b96b0" />
              <input 
                type="text" 
                placeholder="Search patient, phone..." 
                value={searchLocal}
                onChange={(e) => setSearchLocal(e.target.value)}
              />
            </div>
          </div>
          <span className="admin-v2-table-count">Showing {filtered.length} entries</span>
        </div>

        {/* Table layout */}
        <div className="admin-v2-table-wrapper">
          <table className="admin-v2-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Details</th>
                <th>City</th>
                <th>Last Visit</th>
                <th>Medical Tag</th>
                <th>Outstanding</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="admin-v2-empty">
                      <div className="admin-v2-empty-icon">👥</div>
                      <p className="admin-v2-empty-title">No patient records found</p>
                      <p className="admin-v2-empty-sub">Adjust your search parameters or query keywords.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 800, color: 'var(--adm-accent)' }}>{p.id}</td>
                    <td>
                      <div className="admin-v2-table-avatar-cell">
                        <div className="admin-v2-avatar" style={{ backgroundColor: p.avatarColor, width: '34px', height: '34px', fontSize: '0.8rem', borderRadius: '10px' }}>
                          {p.initials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--adm-text-primary)' }}>{p.name}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-tertiary)', marginTop: '2px' }}>
                            {p.gender}, {p.age} yrs • {p.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{p.city}</td>
                    <td style={{ fontWeight: 600 }}>{p.lastVisit}</td>
                    <td>
                      {p.medicalHistory && p.medicalHistory !== 'None reported' && p.medicalHistory !== 'No significant history' ? (
                        <span className="admin-v2-badge cancelled" style={{ fontSize: '0.7rem' }}>
                          <span className="admin-v2-badge-dot" />
                          {p.medicalHistory}
                        </span>
                      ) : (
                        <span className="admin-v2-badge confirmed" style={{ fontSize: '0.7rem' }}>
                          <span className="admin-v2-badge-dot" />
                          Healthy
                        </span>
                      )}
                    </td>
                    <td style={{ fontWeight: 700, color: p.pendingAmount > 0 ? 'var(--adm-red)' : 'var(--adm-text-primary)' }}>
                      ₹{p.pendingAmount.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <button 
                        onClick={() => setSelectedPatient(p)}
                        className="admin-v2-btn admin-v2-btn-secondary admin-v2-btn-icon"
                        title="View Profile Details"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Details Overlay */}
      {selectedPatient && (
        <div className="admin-v2-drawer-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="admin-v2-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="admin-v2-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="admin-v2-avatar" style={{ backgroundColor: selectedPatient.avatarColor, width: '46px', height: '46px', fontSize: '1.05rem', borderRadius: '12px' }}>
                  {selectedPatient.initials}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--adm-text-primary)' }}>{selectedPatient.name}</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--adm-text-tertiary)', fontWeight: 500 }}>
                    Patient ID: <span style={{ color: 'var(--adm-accent)', fontWeight: 700 }}>{selectedPatient.id}</span>
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="admin-v2-btn admin-v2-btn-secondary admin-v2-btn-icon">
                <X size={16} />
              </button>
            </div>

            <div className="admin-v2-drawer-content">
              {/* Drawer Tabs */}
              <div className="admin-v2-drawer-tabs">
                <div 
                  className={`admin-v2-drawer-tab ${drawerTab === 'clinical' ? 'active' : ''}`}
                  onClick={() => setDrawerTab('clinical')}
                >
                  Clinical Summary
                </div>
                <div 
                  className={`admin-v2-drawer-tab ${drawerTab === 'billing' ? 'active' : ''}`}
                  onClick={() => setDrawerTab('billing')}
                >
                  Billing Ledger
                </div>
              </div>

              {drawerTab === 'clinical' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="admin-v2-detail-grid">
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Gender</span>
                      <span className="admin-v2-detail-value">{selectedPatient.gender}</span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Age</span>
                      <span className="admin-v2-detail-value">{selectedPatient.age} yrs</span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Phone</span>
                      <span className="admin-v2-detail-value">{selectedPatient.phone}</span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Email</span>
                      <span className="admin-v2-detail-value" style={{ fontSize: '0.8rem' }}>{selectedPatient.email}</span>
                    </div>
                  </div>

                  <div className="admin-v2-divider" />

                  {/* Clinical condition chips */}
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: 'var(--adm-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Diagnostic Conditions
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {selectedPatient.medicalHistory && selectedPatient.medicalHistory !== 'None reported' && selectedPatient.medicalHistory !== 'No significant history' ? (
                        <span className="admin-v2-badge cancelled" style={{ fontSize: '0.78rem' }}>
                          <span className="admin-v2-badge-dot" />
                          {selectedPatient.medicalHistory}
                        </span>
                      ) : (
                        <span className="admin-v2-badge confirmed" style={{ fontSize: '0.78rem' }}>
                          <span className="admin-v2-badge-dot" />
                          No medical complications reported
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="admin-v2-divider" />

                  {/* Treatment history log */}
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: 'var(--adm-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Clinical Treatment History
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {(selectedPatient.previousTreatments || [selectedPatient.treatment]).map((trt, idx) => (
                        <div key={idx} style={{ padding: '14px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--adm-text-primary)', fontSize: '0.85rem' }}>{trt}</div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-tertiary)', marginTop: '4px' }}>by {selectedPatient.assignedDoctor}</div>
                          </div>
                          <span className="admin-v2-stat-pill" style={{ fontSize: '0.72rem' }}>{selectedPatient.lastVisit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="admin-v2-detail-grid">
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Total Billed</span>
                      <span className="admin-v2-detail-value" style={{ color: 'var(--adm-text-primary)' }}>
                        ₹{selectedPatient.totalBills.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Outstanding</span>
                      <span className="admin-v2-detail-value" style={{ color: selectedPatient.pendingAmount > 0 ? 'var(--adm-red)' : 'var(--adm-accent)' }}>
                        ₹{selectedPatient.pendingAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="admin-v2-divider" />

                  {/* Invoices list */}
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: 'var(--adm-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Invoices & Collections Ledgers
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { id: `INV-${selectedPatient.id.split('-')[1]}-01`, treatment: selectedPatient.treatment, amount: selectedPatient.totalBills, status: selectedPatient.paymentStatus }
                      ].map((inv, idx) => (
                        <div key={idx} style={{ padding: '14px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--adm-text-primary)', fontSize: '0.85rem' }}>{inv.id}</div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-tertiary)', marginTop: '4px' }}>{inv.treatment}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontWeight: 700, color: 'var(--adm-text-primary)', fontSize: '0.85rem' }}>₹{inv.amount.toLocaleString('en-IN')}</span>
                            <span className={`admin-v2-badge ${inv.status.toLowerCase()}`} style={{ fontSize: '0.7rem' }}>
                              <span className="admin-v2-badge-dot" />
                              {inv.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'var(--adm-surface, #ffffff)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            padding: '28px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            boxSizing: 'border-box',
            border: '1px solid var(--adm-border, #e2e8f0)',
            fontFamily: "'Outfit', sans-serif"
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--adm-text-primary)' }}>Register Offline Patient</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--adm-text-tertiary)' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPatientSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>Patient Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter full name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--adm-border)', borderRadius: '8px', background: 'var(--adm-surface-2)', color: 'var(--adm-text-primary)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>Age *</label>
                  <input 
                    type="number" 
                    required
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, age: e.target.value }))}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--adm-border)', borderRadius: '8px', background: 'var(--adm-surface-2)', color: 'var(--adm-text-primary)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>Gender</label>
                  <select 
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, gender: e.target.value }))}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--adm-border)', borderRadius: '8px', background: 'var(--adm-surface-2)', color: 'var(--adm-text-primary)', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>Phone *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Phone number"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--adm-border)', borderRadius: '8px', background: 'var(--adm-surface-2)', color: 'var(--adm-text-primary)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>City *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="City"
                    value={newPatient.city}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, city: e.target.value }))}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--adm-border)', borderRadius: '8px', background: 'var(--adm-surface-2)', color: 'var(--adm-text-primary)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="patient@example.com"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--adm-border)', borderRadius: '8px', background: 'var(--adm-surface-2)', color: 'var(--adm-text-primary)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>Medical History</label>
                  <input 
                    type="text" 
                    placeholder="None, Diabetes, etc."
                    value={newPatient.medicalHistory}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, medicalHistory: e.target.value }))}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--adm-border)', borderRadius: '8px', background: 'var(--adm-surface-2)', color: 'var(--adm-text-primary)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>Pending Payment (₹)</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    value={newPatient.pendingAmount}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, pendingAmount: e.target.value }))}
                    style={{ width: '100%', height: '40px', padding: '0 12px', border: '1px solid var(--adm-border)', borderRadius: '8px', background: 'var(--adm-surface-2)', color: 'var(--adm-text-primary)', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="admin-v2-btn admin-v2-btn-secondary"
                  style={{ height: '40px', padding: '0 16px', borderRadius: '8px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-v2-btn admin-v2-btn-primary"
                  style={{ height: '40px', padding: '0 20px', borderRadius: '8px' }}
                >
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
