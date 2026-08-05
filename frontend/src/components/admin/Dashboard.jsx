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
  // Values: Jan(18), Feb(24), Mar(20), Apr(30), May(35), Jun(42)
  // Max = 45. Min = 0.
  // Y calculation: Y = 160 - (value / 45) * 120
  // Jan: 18 -> 160 - (18/45)*120 = 112
  // Feb: 24 -> 160 - (24/45)*120 = 96
  // Mar: 20 -> 160 - (20/45)*120 = 106.6
  // Apr: 30 -> 160 - (30/45)*120 = 80
  // May: 35 -> 160 - (35/45)*120 = 66.6
  // Jun: 42 -> 160 - (42/45)*120 = 48
  const graphPoints = [
    { label: 'Jan', value: 18, x: 40,  y: 112 },
    { label: 'Feb', value: 24, x: 120, y: 96 },
    { label: 'Mar', value: 20, x: 200, y: 106.6 },
    { label: 'Apr', value: 30, x: 280, y: 80 },
    { label: 'May', value: 35, x: 360, y: 66.6 },
    { label: 'Jun', value: 42, x: 440, y: 48 },
  ];

  // Curve: cubic bezier control points for smooth flow
  // Path formula d
  const linePath = "M 40,112 C 80,104 80,96 120,96 C 160,96 160,106.6 200,106.6 C 240,106.6 240,80 280,80 C 320,80 320,66.6 360,66.6 C 400,66.6 400,48 440,48";
  const areaPath = `${linePath} L 440,160 L 40,160 Z`;

  // Concentric Radial Progress Rings calculations
  // Center is (50, 50). Stroke width = 6.
  const concentricRings = [
    { name: 'Dental Cleaning', pct: 35, color: '#4f7ef8', radius: 36, circ: 2 * Math.PI * 36 }, // outer
    { name: 'Root Canal',      pct: 25, color: '#10b981', radius: 28, circ: 2 * Math.PI * 28 },
    { name: 'Dental Implant',  pct: 20, color: '#8b5cf6', radius: 20, circ: 2 * Math.PI * 20 },
    { name: 'Others',          pct: 20, color: '#f43f5e', radius: 12, circ: 2 * Math.PI * 12 }, // inner
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

        {/* Gradient Curve Area Graph */}
        <div className="admin-v2-card" style={{ position: 'relative' }}>
          <div className="admin-v2-card-header">
            <h3 className="admin-v2-card-title">Patient Intake & Trend Curve</h3>
            <span className="admin-v2-card-subtitle">Last 6 Months</span>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '180px', marginTop: '16px' }}>
            <svg viewBox="0 0 480 180" width="100%" height="100%" style={{ overflow: 'visible' }}>
              <defs>
                {/* Glowing area fill gradient */}
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f7ef8" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#4f7ef8" stopOpacity="0.00" />
                </linearGradient>
                {/* Curve border stroke gradient */}
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#4f7ef8" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="48" x2="440" y2="48" stroke="var(--adm-border)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="40" y1="80" x2="440" y2="80" stroke="var(--adm-border)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="40" y1="112" x2="440" y2="112" stroke="var(--adm-border)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="40" y1="160" x2="440" y2="160" stroke="var(--adm-border)" strokeWidth="1.5" />

              {/* Shaded Area Fill */}
              <path d={areaPath} fill="url(#areaGradient)" />

              {/* Curve Stroke Line */}
              <path d={linePath} fill="none" stroke="url(#strokeGradient)" strokeWidth="3.5" strokeLinecap="round" />

              {/* Circular Node Points */}
              {graphPoints.map((pt, i) => (
                <g key={i} className="admin-v2-tooltip-wrap">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill="white"
                    stroke="#4f7ef8"
                    strokeWidth="3.5"
                    style={{ cursor: 'pointer', transition: 'r 0.15s' }}
                    onMouseOver={(e) => e.target.setAttribute('r', '7')}
                    onMouseOut={(e) => e.target.setAttribute('r', '5')}
                  />
                  {/* Floating Value Labels */}
                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fill="var(--adm-text-secondary)"
                    fontSize="9.5"
                    fontWeight="700"
                  >
                    {pt.value}
                  </text>
                  {/* Month Label */}
                  <text
                    x={pt.x}
                    y="176"
                    textAnchor="middle"
                    fill="var(--adm-text-tertiary)"
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

        {/* Concentric Radial Rings Chart */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3 className="admin-v2-card-title">Treatment Concentric Split</h3>
            <span className="admin-v2-card-subtitle">Volume</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', padding: '12px 0 0 0' }}>
            {/* SVG concentric loops */}
            <div style={{ position: 'relative', width: '130px', height: '130px' }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
                {concentricRings.map((ring, idx) => {
                  const dashOffset = ring.circ - (ring.pct / 100) * ring.circ;
                  return (
                    <g key={idx}>
                      {/* Background track loop */}
                      <circle
                        cx="50"
                        cy="50"
                        r={ring.radius}
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="5"
                      />
                      {/* Animated progress loop */}
                      <circle
                        cx="50"
                        cy="50"
                        r={ring.radius}
                        fill="none"
                        stroke={ring.color}
                        strokeWidth="5.2"
                        strokeDasharray={ring.circ}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        style={{
                          transition: 'stroke-dashoffset 0.8s ease-out',
                          animation: 'adm-spin-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                          animationDelay: `${idx * 0.1}s`
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
              {/* Inner label */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--adm-text-primary)', letterSpacing: '-0.02em' }}>100%</span>
                <span style={{ fontSize: '0.62rem', color: 'var(--adm-text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Case Base</span>
              </div>
            </div>

            {/* Premium details list with color indicators */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {concentricRings.map((ring, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: ring.color, flexShrink: 0 }} />
                    <span style={{ color: 'var(--adm-text-secondary)', fontWeight: 600 }}>{ring.name}</span>
                  </div>
                  <strong style={{ color: 'var(--adm-text-primary)', fontWeight: 700 }}>{ring.pct}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
