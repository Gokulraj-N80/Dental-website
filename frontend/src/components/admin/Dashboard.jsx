import React from 'react';
import { Calendar, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.08)',
      trend: { pct: "4%", up: true, since: "this month" },
      accent: '#10b981',
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

  // Monthly data mapping points: Width=500, Height=180
  // Values Line 1 (Appointments): Jan(18), Feb(24), Mar(20), Apr(30), May(35), Jun(42)
  // Values Line 2 (Completed): Jan(12), Feb(18), Mar(15), Apr(25), May(28), Jun(38)
  const line1Points = [
    { label: 'Jan', value: 18, x: 40,  y: 112 },
    { label: 'Feb', value: 24, x: 120, y: 96 },
    { label: 'Mar', value: 20, x: 200, y: 106.6 },
    { label: 'Apr', value: 30, x: 280, y: 80 },
    { label: 'May', value: 35, x: 360, y: 66.6 },
    { label: 'Jun', value: 42, x: 440, y: 48 },
  ];

  const line2Points = [
    { label: 'Jan', value: 12, x: 40,  y: 128 },
    { label: 'Feb', value: 18, x: 120, y: 112 },
    { label: 'Mar', value: 15, x: 200, y: 120 },
    { label: 'Apr', value: 25, x: 280, y: 93.3 },
    { label: 'May', value: 28, x: 360, y: 85.3 },
    { label: 'Jun', value: 38, x: 440, y: 58.6 },
  ];

  const line1Path = "M 40,112 C 80,104 80,96 120,96 C 160,96 160,106.6 200,106.6 C 240,106.6 240,80 280,80 C 320,80 320,66.6 360,66.6 C 400,66.6 400,48 440,48";
  const area1Path = `${line1Path} L 440,160 L 40,160 Z`;

  const line2Path = "M 40,128 C 80,120 80,112 120,112 C 160,112 160,120 200,120 C 240,120 240,93.3 280,93.3 C 320,93.3 320,85.3 360,85.3 C 400,85.3 400,58.6 440,58.6";
  const area2Path = `${line2Path} L 440,160 L 40,160 Z`;

  // Semi-Circular Gauge calculations
  // Radius = 32. Path starts left, curves up, ends right.
  // Circumference of semi-circle = Math.PI * 32 ≈ 100.53
  const gaugeCirc = Math.PI * 32;
  const capacityPct = 85; // Clinic Capacity Rate
  const gaugeOffset = gaugeCirc - (capacityPct / 100) * gaugeCirc;

  // Categories list below the gauge
  const categories = [
    { name: 'Appointments Booked', pct: 85, color: '#4f7ef8' },
    { name: 'Successful Consultations', pct: 76, color: '#10b981' },
    { name: 'Active Treatment Slots', pct: 60, color: '#8b5cf6' },
  ];

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
              <div className="admin-v2-kpi-accent-bar" style={{ backgroundColor: kpi.accent }} />
              
              <div className="admin-v2-kpi-info">
                <p className="admin-v2-kpi-label">{kpi.label}</p>
                <h3 className="admin-v2-kpi-value">{kpi.value}</h3>
                
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

        {/* Dual-Line Comparison Area Chart */}
        <div className="admin-v2-card chart-canvas" style={{ position: 'relative' }}>
          <div className="admin-v2-card-header">
            <div>
              <h3 className="admin-v2-card-title">Bookings vs. Completed Cases</h3>
              <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--adm-text-tertiary)' }}>Comparative intake trends analysis</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4f7ef8' }} />
                <span style={{ color: 'var(--adm-text-secondary)' }}>Booked</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ color: 'var(--adm-text-secondary)' }}>Completed</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '180px', marginTop: '16px' }}>
            <svg viewBox="0 0 480 180" width="100%" height="100%" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="area1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f7ef8" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#4f7ef8" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="area2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="lineGrad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7aa2ff" />
                  <stop offset="100%" stopColor="#4f7ef8" />
                </linearGradient>
                <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="48" x2="440" y2="48" stroke="var(--adm-chart-grid)" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="40" y1="80" x2="440" y2="80" stroke="var(--adm-chart-grid)" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="40" y1="112" x2="440" y2="112" stroke="var(--adm-chart-grid)" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="40" y1="160" x2="440" y2="160" stroke="var(--adm-chart-grid)" strokeWidth="1.5" />

              {/* Area fills */}
              <path d={area1Path} fill="url(#area1)" />
              <path d={area2Path} fill="url(#area2)" />

              {/* Lines with soft glow */}
              <path d={line1Path} fill="none" stroke="url(#lineGrad1)" strokeWidth="3.5" strokeLinecap="round" filter="url(#glowBlue)" />
              <path d={line2Path} fill="none" stroke="url(#lineGrad2)" strokeWidth="3.5" strokeLinecap="round" filter="url(#glowGreen)" />

              {/* Highlighted data-point nodes */}
              {line1Points.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="7" fill="#4f7ef8" opacity="0.18" />
                  <circle cx={pt.x} cy={pt.y} r="4" fill="var(--adm-surface)" stroke="#4f7ef8" strokeWidth="2.5" />
                  <circle cx={pt.x} cy={line2Points[i].y} r="7" fill="#10b981" opacity="0.18" />
                  <circle cx={pt.x} cy={line2Points[i].y} r="4" fill="var(--adm-surface)" stroke="#10b981" strokeWidth="2.5" />
                  <text
                    x={pt.x}
                    y="176"
                    textAnchor="middle"
                    fill="var(--adm-chart-axis)"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Semi-Circular Radial Gauge Chart */}
        <div className="admin-v2-card chart-canvas">
          <div className="admin-v2-card-header">
            <h3 className="admin-v2-card-title">Clinic Efficiency Index</h3>
            <span className="admin-v2-card-subtitle">Performance</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '16px 0 0 0' }}>
            {/* SVG semi-circular gauge */}
            <div style={{ position: 'relative', width: '150px', height: '90px', overflow: 'hidden' }}>
              <svg viewBox="0 0 100 60" width="100%" height="100%">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4f7ef8" />
                    <stop offset="60%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Background track path */}
                <path
                  d="M 18,50 A 32,32 0 0,1 82,50"
                  fill="none"
                  stroke="var(--adm-chart-track)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Colored progress path with glow */}
                <path
                  d="M 18,50 A 32,32 0 0,1 82,50"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="8.2"
                  strokeDasharray={gaugeCirc}
                  strokeDashoffset={gaugeOffset}
                  strokeLinecap="round"
                  filter="url(#gaugeGlow)"
                  style={{
                    transition: 'stroke-dashoffset 0.8s ease-out',
                    animation: 'adm-spin-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                  }}
                />
                {/* Cap dot at the leading edge of the arc (85% of the semi-circle) */}
                <circle
                  cx="78.5"
                  cy="35.5"
                  r="3"
                  fill="#10b981"
                  filter="url(#gaugeGlow)"
                />
              </svg>
              {/* Central text stats */}
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: '1.2' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--adm-text-primary)', letterSpacing: '-0.03em' }}>{capacityPct}%</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--adm-text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>Capacity Rate</div>
              </div>
            </div>

            {/* List breakdown */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.map((c, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c.color, flexShrink: 0 }} />
                    <span style={{ color: 'var(--adm-text-secondary)', fontWeight: 600 }}>{c.name}</span>
                  </div>
                  <strong style={{ color: 'var(--adm-text-primary)', fontWeight: 700 }}>{c.pct}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
