import React, { useState } from 'react';
import { Search, Eye, X } from 'lucide-react';
import { PATIENTS } from './data/mockPatients';

export default function Patients({ searchGlobal }) {
  const [patients] = useState(PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchLocal, setSearchLocal] = useState('');
  const [drawerTab, setDrawerTab] = useState('medical'); // 'medical' | 'billing'

  const filtered = patients.filter(p => {
    const query = (searchGlobal || searchLocal).toLowerCase();
    return (
      p.id.toLowerCase().includes(query) ||
      p.name.toLowerCase().includes(query) ||
      p.phone.includes(query) ||
      p.email.toLowerCase().includes(query)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Patient Records Directory</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Database of clinical histories, diagnostic notes, allergies records, and invoicing metrics.</p>
      </div>

      <div className="admin-v2-card">
        <div className="admin-v2-table-filters">
          <input 
            type="text" 
            placeholder="Search by ID, name, email or phone..." 
            className="admin-v2-input"
            value={searchLocal}
            onChange={(e) => setSearchLocal(e.target.value)}
            style={{ width: '300px' }}
          />
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Showing {filtered.length} Patients</span>
        </div>

        <div className="admin-v2-table-wrapper">
          <table className="admin-v2-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Contact info</th>
                <th>Blood Group</th>
                <th>Assigned Doctor</th>
                <th>Last Visit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((patient) => (
                <tr key={patient.id}>
                  <td style={{ fontWeight: 700, color: '#10b981' }}>{patient.id}</td>
                  <td>
                    <div className="admin-v2-table-avatar-cell">
                      <div className="admin-v2-avatar" style={{ backgroundColor: patient.avatarColor, width: '32px', height: '32px', fontSize: '0.8rem' }}>
                        {patient.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{patient.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{patient.gender}, {patient.age} yrs</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{patient.phone}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{patient.email}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{patient.bloodGroup}</td>
                  <td>{patient.assignedDoctor}</td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <span className={`admin-v2-badge ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => setSelectedPatient(patient)}
                      className="admin-v2-btn admin-v2-btn-secondary admin-v2-btn-icon"
                      title="View Detailed Records"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer slide-in panel */}
      {selectedPatient && (
        <div className="admin-v2-drawer-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="admin-v2-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="admin-v2-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="admin-v2-avatar" style={{ backgroundColor: selectedPatient.avatarColor, width: '48px', height: '48px', fontSize: '1.2rem' }}>
                  {selectedPatient.initials}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>{selectedPatient.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{selectedPatient.id} • Registered {selectedPatient.registrationDate}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPatient(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={24} />
              </button>
            </div>

            <div className="admin-v2-drawer-tabs">
              <div 
                className={`admin-v2-drawer-tab ${drawerTab === 'medical' ? 'active' : ''}`}
                onClick={() => setDrawerTab('medical')}
              >
                Clinical Profile
              </div>
              <div 
                className={`admin-v2-drawer-tab ${drawerTab === 'billing' ? 'active' : ''}`}
                onClick={() => setDrawerTab('billing')}
              >
                Billing Info
              </div>
            </div>

            <div className="admin-v2-drawer-content">
              {drawerTab === 'medical' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="admin-v2-detail-grid">
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Age & Gender</span>
                      <span className="admin-v2-detail-value">{selectedPatient.age} yrs • {selectedPatient.gender}</span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Blood Group</span>
                      <span className="admin-v2-detail-value">{selectedPatient.bloodGroup}</span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Occupation</span>
                      <span className="admin-v2-detail-value">{selectedPatient.occupation}</span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Insurance Provider</span>
                      <span className="admin-v2-detail-value">{selectedPatient.insurance}</span>
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '10px 0' }} />

                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#0f172a' }}>Medical History & Allergies</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <span className="admin-v2-badge cancelled" style={{ fontWeight: 600 }}>Allergy: {selectedPatient.allergies}</span>
                      <span className="admin-v2-badge pending" style={{ fontWeight: 600 }}>Condition: {selectedPatient.medicalHistory}</span>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#0f172a' }}>Active Dental Problems</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#334155' }}>{selectedPatient.dentalProblems}</p>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#0f172a' }}>Clinical Notes</h4>
                    <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                      <p style={{ margin: 0, fontSize: '0.85rem', fontStyle: 'italic', color: '#475569' }}>
                        "{selectedPatient.clinicalNotes}"
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="admin-v2-detail-grid">
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Total Invoiced</span>
                      <span className="admin-v2-detail-value" style={{ color: '#0f172a', fontSize: '1.2rem' }}>₹{selectedPatient.totalBills.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Paid Amount</span>
                      <span className="admin-v2-detail-value" style={{ color: '#10b981', fontSize: '1.2rem' }}>₹{selectedPatient.paidAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Outstanding Balance</span>
                      <span className="admin-v2-detail-value" style={{ color: '#ef4444', fontSize: '1.2rem' }}>₹{selectedPatient.pendingAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="admin-v2-detail-item">
                      <span className="admin-v2-detail-label">Payment Status</span>
                      <span className={`admin-v2-badge ${selectedPatient.paymentStatus.toLowerCase()}`} style={{ width: 'fit-content', marginTop: '4px' }}>
                        {selectedPatient.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '10px 0' }} />

                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#0f172a' }}>Billing Transactions History</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '8px', fontSize: '0.85rem' }}>
                        <div>
                          <strong style={{ color: '#0f172a' }}>{selectedPatient.treatment}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Consultation & Surgery Fee</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>₹{selectedPatient.totalBills.toLocaleString('en-IN')}</div>
                          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Completed</span>
                        </div>
                      </div>
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
