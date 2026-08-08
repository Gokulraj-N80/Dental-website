import React, { useState } from 'react';
import { Search, Trash2, Calendar, Filter } from 'lucide-react';
import { APPOINTMENTS } from './data/mockAppointments';
import { DOCTORS } from './data/mockDoctors';

export default function Appointments({ searchGlobal, appointments = [], onStatusChange, onDelete }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [searchLocal, setSearchLocal] = useState('');

  // Combine global topbar search & local filters
  const filtered = appointments.filter(a => {
    const query = (searchGlobal || searchLocal).toLowerCase();
    const matchesSearch = 
      a.id.toLowerCase().includes(query) ||
      a.patientName.toLowerCase().includes(query) ||
      a.phone.includes(query) ||
      a.treatment.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || a.doctor === doctorFilter;

    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const handleStatusChange = (id, newStatus) => {
    if (onStatusChange) onStatusChange(id, newStatus);
  };

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Heading */}
      <div className="admin-v2-page-heading">
        <span className="admin-v2-page-eyebrow">Consultation Ledger</span>
        <h2 className="admin-v2-page-title">Appointments Center</h2>
        <p className="admin-v2-page-subtitle">Real-time listing of active appointments, consultations schedules, and treatment check-ins.</p>
      </div>

      <div className="admin-v2-card">
        <div className="admin-v2-table-filters">
          <div className="admin-v2-filter-group">
            {/* Search Input field */}
            <div className="admin-v2-search-field">
              <Search size={16} color="#8b96b0" />
              <input 
                type="text" 
                placeholder="Search appts, patients..." 
                value={searchLocal}
                onChange={(e) => setSearchLocal(e.target.value)}
              />
            </div>

            {/* Filters */}
            <select className="admin-v2-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked In">Checked In</option>
              <option value="In Consultation">In Consultation</option>
              <option value="Treatment Started">Treatment Started</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="No Show">No Show</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>

            <select className="admin-v2-select" value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)}>
              <option value="all">All Doctors</option>
              {DOCTORS.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
          <span className="admin-v2-table-count">Showing {filtered.length} entries</span>
        </div>

        {/* Table layout */}
        <div className="admin-v2-table-wrapper">
          <table className="admin-v2-table">
            <thead>
              <tr>
                <th>Appt ID</th>
                <th>Patient Details</th>
                <th>Treatment</th>
                <th>Assigned Doctor</th>
                <th>Scheduled Date</th>
                <th>Source</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    <div className="admin-v2-empty">
                      <div className="admin-v2-empty-icon">📅</div>
                      <p className="admin-v2-empty-title">No appointments found</p>
                      <p className="admin-v2-empty-sub">Adjust your search parameters or filter options.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ fontWeight: 800, color: 'var(--adm-accent)' }}>{appt.id}</td>
                    <td>
                      <div className="admin-v2-table-avatar-cell">
                        <div className="admin-v2-avatar" style={{ backgroundColor: appt.avatarColor, width: '34px', height: '34px', fontSize: '0.8rem', borderRadius: '10px' }}>
                          {appt.patientInitials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--adm-text-primary)' }}>{appt.patientName}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-tertiary)', marginTop: '2px' }}>
                            {appt.gender}, {appt.age} yrs • {appt.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{appt.treatment}</td>
                    <td>{appt.doctor}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--adm-text-primary)' }}>{appt.date}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-tertiary)', marginTop: '2px' }}>{appt.time}</div>
                    </td>
                    <td>
                      <span className="admin-v2-stat-pill" style={{ padding: '3px 8px', fontSize: '0.7rem' }}>
                        {appt.source}
                      </span>
                    </td>
                    <td>
                      {/* Styled select badge matching selected status */}
                      <span className={`admin-v2-badge ${appt.status.toLowerCase().replace(' ', '-')}`}>
                        <span className="admin-v2-badge-dot" />
                        <select 
                          value={appt.status}
                          onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            color: 'inherit',
                            fontWeight: 'inherit',
                            fontSize: 'inherit',
                            padding: 0,
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Checked In">Checked In</option>
                          <option value="In Consultation">In Consultation</option>
                          <option value="Treatment Started">Treatment Started</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="No Show">No Show</option>
                          <option value="Rescheduled">Rescheduled</option>
                        </select>
                      </span>
                    </td>
                    <td>
                      <span className={`admin-v2-badge ${appt.paymentStatus.toLowerCase()}`}>
                        <span className="admin-v2-badge-dot" />
                        {appt.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(appt.id)}
                        className="admin-v2-btn admin-v2-btn-danger admin-v2-btn-icon"
                        title="Delete Record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
