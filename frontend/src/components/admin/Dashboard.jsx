import React from 'react';
import { Calendar, Users, DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
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
      color: '#4f7ef8',
      bg: 'rgba(79, 126, 248, 0.08)',
      trend: { pct: "12%", up: true, since: "since yesterday" },
      accent: '#4f7ef8',
    },
    {
      label: "Total Patients",
      value: totalPatients,
      sub: "Registered in system",
      icon: Users,
      color: '#00d084',
      bg: 'rgba(0, 208, 132, 0.08)',
      trend: { pct: "4%", up: true, since: "this month" },
      accent: '#00d084',
    },
    {
      label: "Revenue Collected",
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      sub: "From completed cases",
      icon: DollarSign,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.08)',
      trend: { pct: "8.2%", up: true, since: "since last week" },
      accent: '#f59e0b',
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
    { name: 'Dental Cleaning', pct: 35, color: '#00d084' },
    { name: 'Root Canal',      pct: 25, color: '#4f7ef8' },
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Page Heading */}
      <div className="admin-v2-page-heading">
        <span className="admin-v2-page-eyebrow">Enterprise Overview</span>
        <h2 className="admin-v2-page-title">Dashboard Overview</h2>
        <p className="admin-v2-page-subtitle">
          Real-time summary of appointments, patient demographic distribution, and clinical billing.
        </p>
      </div>

      {/* 3 KPI Cards */}
      <div className="admin-v2-dashboard-grid">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="admin-v2-kpi-card">
              {/* Colored Left Accent Line */}
              <div className="admin-v2-kpi-accent-bar" style={{ backgroundColor: kpi.accent }} />
              
              <div className="admin-v2-kpi-info">
                <p className="admin-v2-kpi-label">{kpi.label}</p>
                <h3 className="admin-v2-kpi-value">{kpi.value}</h3>
                
                {/* Comparison trend indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span className={`admin-v2-kpi-trend ${kpi.trend.up ? 'up' : 'down'}`}>
                    {kpi.trend.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {kpi.trend.pct}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#8b96b0' }}>{kpi.trend.since}</span>
                </div>
              </div>

              <div className="admin-v2-kpi-icon-wrap" style={{ backgroundColor: kpi.bg, color: kpi.color }}>
                <Icon size={22} strokeWidth={2.2} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2 Graphs Row */}
      <div className="admin-v2-dashboard-row-2">

        {/* Bar Chart — Monthly Appointments */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3 className="admin-v2-card-title">Monthly Appointment Trends</h3>
            <span className="admin-v2-card-subtitle">Last 6 months</span>
          </div>

          <div className="admin-v2-chart-bar-wrap">
            {/* Grid Line background */}
            <div className="admin-v2-chart-grid">
              <div className="admin-v2-chart-grid-line" />
              <div className="admin-v2-chart-grid-line" />
              <div className="admin-v2-chart-grid-line" />
              <div className="admin-v2-chart-grid-line" />
            </div>

            {monthlyData.map((d, i) => {
              const heightPct = (d.appts / maxAppts) * 100;
              return (
                <div key={i} className="admin-v2-chart-bar-col">
                  <span className="admin-v2-chart-bar-val">{d.appts}</span>
                  <div
                    className="admin-v2-chart-bar"
                    style={{
                      height: `${heightPct}%`,
                      background: 'linear-gradient(180deg, #00d084 0%, #00a86b 100%)',
                      boxShadow: '0 4px 12px rgba(0, 208, 132, 0.15)'
                    }}
                  >
                    <div className="admin-v2-chart-bar-tooltip">
                      {d.month}: {d.appts} appts · ₹{d.revenue.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <span className="admin-v2-chart-bar-label">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut Chart — Treatment Distribution */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3 className="admin-v2-card-title">Treatment Split</h3>
            <span className="admin-v2-card-subtitle">Distribution</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '8px 0 0 0' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '130px', height: '130px' }}>
              <svg viewBox="0 0 36 36" width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="3.2" />
                {segments.map((seg, i) => (
                  <circle
                    key={i}
                    cx="18" cy="18" r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="3.2"
                    strokeDasharray={`${seg.dash} ${seg.gap}`}
                    strokeDashoffset={seg.offset}
                    style={{
                      strokeLinecap: 'round',
                      animation: 'adm-spin-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                      animationDelay: `${i * 0.08}s`
                    }}
                  />
                ))}
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a0f1e', letterSpacing: '-0.02em' }}>100%</span>
                <span style={{ fontSize: '0.62rem', color: '#8b96b0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>split</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {treatmentShare.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: t.color, flexShrink: 0 }} />
                    <span style={{ color: '#4b5878', fontWeight: 500 }}>{t.name}</span>
                  </div>
                  <strong style={{ color: '#0a0f1e', fontWeight: 700 }}>{t.pct}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
