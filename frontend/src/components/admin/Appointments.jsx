import React, { useState } from 'react';
import { Search, Eye, Trash2 } from 'lucide-react';
import { APPOINTMENTS } from './data/mockAppointments';
import { DOCTORS } from './data/mockDoctors';

export default function Appointments({ searchGlobal }) {
  const [appointments, setAppointments] = useState(APPOINTMENTS);
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
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleDelete = (id) => {
    if(window.confirm('Delete this appointment record?')) {
      setAppointments(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Appointments Center</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Real-time listing of active appointments, consultations schedules, and treatment check-ins.</p>
      </div>

      <div className="admin-v2-card">
        <div className="admin-v2-table-filters">
          <div className="admin-v2-filter-group">
            <input 
              type="text" 
              placeholder="Search appointments..." 
              className="admin-v2-input"
              value={searchLocal}
              onChange={(e) => setSearchLocal(e.target.value)}
              style={{ width: '220px' }}
            />
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
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Showing {filtered.length} entries</span>
        </div>

        <div className="admin-v2-table-wrapper">
          <table className="admin-v2-table">
            <thead>
              <tr>
                <th>Appt ID</th>
                <th>Patient Details</th>
                <th>Treatment</th>
                <th>Assigned Doctor</th>
                <th>Date & Time</th>
                <th>Source</th>
                <th>Appt Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((appt) => (
                <tr key={appt.id}>
                  <td style={{ fontWeight: 700, color: '#10b981' }}>{appt.id}</td>
                  <td>
                    <div className="admin-v2-table-avatar-cell">
                      <div className="admin-v2-avatar" style={{ backgroundColor: appt.avatarColor, width: '32px', height: '32px', fontSize: '0.8rem' }}>
                        {appt.patientInitials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{appt.patientName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{appt.gender}, {appt.age} yrs • {appt.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>{appt.treatment}</td>
                  <td>{appt.doctor}</td>
                  <td>
                    <div>{appt.date}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{appt.time}</div>
                  </td>
                  <td>{appt.source}</td>
                  <td>
                    <select 
                      className={`admin-v2-select admin-v2-badge ${appt.status.toLowerCase().replace(' ', '-')}`}
                      value={appt.status}
                      onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                      style={{ border: 'none', cursor: 'pointer', outline: 'none', fontWeight: 700 }}
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
                  </td>
                  <td>
                    <span className={`admin-v2-badge ${appt.paymentStatus.toLowerCase()}`}>
                      {appt.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleDelete(appt.id)}
                        className="admin-v2-btn admin-v2-btn-danger admin-v2-btn-icon"
                        title="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
