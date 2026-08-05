import React, { useState } from 'react';
import { Search, Eye, X, Activity, User, Award, DollarSign } from 'lucide-react';
import { PATIENTS } from './data/mockPatients';

export default function Patients({ searchGlobal }) {
  const [patients] = useState(PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [drawerTab, setDrawerTab] = useState('clinical');
  const [searchLocal, setSearchLocal] = useState('');

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
      <div className="admin-v2-page-heading">
        <span className="admin-v2-page-eyebrow">Medical Registry</span>
        <h2 className="admin-v2-page-title">Patients Directory</h2>
        <p className="admin-v2-page-subtitle">Unified registry of clinical profiles, diagnostics records, case files history, and ledger accounts.</p>
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
                      {p.medicalConditions.length > 0 ? (
                        <span className="admin-v2-badge cancelled" style={{ fontSize: '0.7rem' }}>
                          <span className="admin-v2-badge-dot" />
                          {p.medicalConditions[0]}
                        </span>
                      ) : (
                        <span className="admin-v2-badge confirmed" style={{ fontSize: '0.7rem' }}>
                          <span className="admin-v2-badge-dot" />
                          Healthy
                        </span>
                      )}
                    </td>
                    <td style={{ fontWeight: 700, color: p.outstandingBalance > 0 ? 'var(--adm-red)' : 'var(--adm-text-primary)' }}>
                      ₹{p.outstandingBalance.toLocaleString('en-IN')}
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
                      {selectedPatient.medicalConditions.length > 0 ? (
                        selectedPatient.medicalConditions.map((c, idx) => (
                          <span key={idx} className="admin-v2-badge cancelled" style={{ fontSize: '0.78rem' }}>
                            <span className="admin-v2-badge-dot" />
                            {c}
                          </span>
                        ))
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
                      {selectedPatient.treatmentHistory.map((h, idx) => (
                        <div key={idx} style={{ padding: '14px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--adm-text-primary)', fontSize: '0.85rem' }}>{h.treatment}</div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-tertiary)', marginTop: '4px' }}>by {h.doctor}</div>
                          </div>
                          <span className="admin-v2-stat-pill" style={{ fontSize: '0.72rem' }}>{h.date}</span>
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
                        ₹{selectedPatient.totalBilled.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Outstanding</span>
                      <span className="admin-v2-detail-value" style={{ color: selectedPatient.outstandingBalance > 0 ? 'var(--adm-red)' : 'var(--adm-accent)' }}>
                        ₹{selectedPatient.outstandingBalance.toLocaleString('en-IN')}
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
                      {selectedPatient.invoices.map((inv, idx) => (
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
    </div>
  );
}
