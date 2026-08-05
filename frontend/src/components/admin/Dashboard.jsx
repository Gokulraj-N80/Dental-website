import React from 'react';
import { Calendar, Users, DollarSign } from 'lucide-react';
import { APPOINTMENTS } from './data/mockAppointments';
import { PATIENTS } from './data/mockPatients';

export default function Dashboard() {
  const today = new Date().toISOString().split('T')[0];

  const todayAppts = APPOINTMENTS.filter(a => a.date === today);
  const totalPatients = PATIENTS.length;
  const totalRevenue = APPOINTMENTS
    .filter(a => a.status === 'Completed')
    .reduce((sum, a) => sum + (a.fee || 0), 0);

  const kpis = [
    {
      label: "Today's Appointments",
      value: todayAppts.length,
      sub: "Scheduled for today",
      icon: Calendar,
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      label: "Total Patients",
      value: totalPatients,
      sub: "Registered in the system",
      icon: Users,
      color: '#10b981',
      bg: '#ecfdf5',
    },
    {
      label: "Revenue Collected",
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      sub: "From completed treatments",
      icon: DollarSign,
      color: '#f59e0b',
      bg: '#fffbeb',
    },
  ];

  // Monthly appointment data (simulated, last 6 months)
  const monthlyData = [
    { month: 'Jan', appts: 18, revenue: 68000 },
    { month: 'Feb', appts: 24, revenue: 92000 },
    { month: 'Mar', appts: 20, revenue: 75000 },
    { month: 'Apr', appts: 30, revenue: 114000 },
    { month: 'May', appts: 35, revenue: 138000 },
    { month: 'Jun', appts: 42, revenue: 162000 },
  ];

  const maxAppts = Math.max(...monthlyData.map(d => d.appts));

  // Treatment share data
  const treatmentShare = [
    { name: 'Dental Cleaning', pct: 35, color: '#10b981' },
    { name: 'Root Canal',      pct: 25, color: '#3b82f6' },
    { name: 'Dental Implant',  pct: 20, color: '#8b5cf6' },
    { name: 'Others',          pct: 20, color: '#f59e0b' },
  ];

  // Build SVG donut segments
  const radius = 15.915;
  const circumference = 2 * Math.PI * radius; // ≈ 100
  let offset = 25; // start at top
  const segments = treatmentShare.map(t => {
    const dash = (t.pct / 100) * circumference;
    const gap  = circumference - dash;
    const seg  = { ...t, dash, gap, offset };
    offset = offset - dash; // subtract to move clockwise
    return seg;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Page heading */}
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
          Dashboard Overview
        </h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem' }}>
          Clinic summary — appointments, patients, and revenue at a glance.
        </p>
      </div>

      {/* 3 KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="admin-v2-kpi-card"
              style={{ padding: '24px' }}
            >
              <div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {kpi.label}
                </p>
                <p style={{ margin: '0 0 6px 0', fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
                  {kpi.value}
                </p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8' }}>
                  {kpi.sub}
                </p>
              </div>
              <div
                className="admin-v2-kpi-icon-wrap"
                style={{ backgroundColor: kpi.bg, color: kpi.color, width: '52px', height: '52px', borderRadius: '12px' }}
              >
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2 Graphs Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>

        {/* Line/Area Chart — Monthly Appointments */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Monthly Appointment Trend</h3>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Last 6 months</span>
          </div>

          {/* Bar chart using CSS — clear, readable */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '180px', padding: '12px 0 0 0' }}>
            {monthlyData.map((d, i) => {
              const heightPct = (d.appts / maxAppts) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>{d.appts}</span>
                  <div
                    title={`${d.month}: ${d.appts} appts · ₹${d.revenue.toLocaleString('en-IN')}`}
                    style={{
                      width: '100%',
                      height: `${heightPct}%`,
                      background: 'linear-gradient(180deg, #10b981, #059669)',
                      borderRadius: '6px 6px 0 0',
                      cursor: 'pointer',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.opacity = '0.75'}
                    onMouseOut={e => e.currentTarget.style.opacity = '1'}
                  />
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut Chart — Treatment Distribution */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Treatment Split</h3>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>By category</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '140px', height: '140px' }}>
              <svg viewBox="0 0 36 36" width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                {segments.map((seg, i) => (
                  <circle
                    key={i}
                    cx="18" cy="18" r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="3.5"
                    strokeDasharray={`${seg.dash} ${seg.gap}`}
                    strokeDashoffset={seg.offset}
                    style={{ transition: 'stroke-dasharray 0.4s ease' }}
                  />
                ))}
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>100%</span>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>cases</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {treatmentShare.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: t.color, flexShrink: 0 }} />
                    <span style={{ color: '#475569' }}>{t.name}</span>
                  </div>
                  <strong style={{ color: '#0f172a' }}>{t.pct}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
