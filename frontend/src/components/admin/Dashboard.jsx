import React from 'react';
import {
  Calendar,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { APPOINTMENTS } from './data/mockAppointments';
import { PATIENTS } from './data/mockPatients';

function statusBadgeClass(status) {
  return `admin-v2-badge ${status.toLowerCase().replace(/\s+/g, '-')}`;
}

const MONTHLY = [
  { label: 'Jan', booked: 18, completed: 12 },
  { label: 'Feb', booked: 24, completed: 18 },
  { label: 'Mar', booked: 20, completed: 15 },
  { label: 'Apr', booked: 30, completed: 25 },
  { label: 'May', booked: 35, completed: 28 },
  { label: 'Jun', booked: 42, completed: 38 },
];

const CHART_MAX = 48;

function DonutChart({ segments, centerValue, centerLabel }) {
  const r = 54;
  const stroke = 13;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  let accumulated = 0;

  return (
    <div className="admin-v2-donut-svg-wrap">
      <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--adm-chart-track)"
          strokeWidth={stroke}
        />
        <g transform="translate(60, 60) rotate(-90)">
          {segments.map((seg, i) => {
            const len = total > 0 ? (seg.value / total) * C : 0;
            const gap = 3;
            const dash = Math.max(len - gap, 0);
            const el = (
              <circle
                key={seg.label}
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${C - dash}`}
                strokeDashoffset={-accumulated}
                className="admin-v2-donut-segment"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            );
            accumulated += len;
            return el;
          })}
        </g>
      </svg>
      <div className="admin-v2-donut-center">
        <div className="admin-v2-donut-center-value">{centerValue}</div>
        <div className="admin-v2-donut-center-label">{centerLabel}</div>
      </div>
    </div>
  );
}

export default function Dashboard({ onNavigateToSection, appointments = [] }) {
  const today = new Date().toISOString().split('T')[0];

  const todayAppts = appointments.filter((a) => a.date === today);
  const upcomingToday = [...todayAppts]
    .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
    .slice(0, 5);

  const totalPatients = PATIENTS.length;
  const totalRevenue = appointments.filter((a) => a.status === 'Completed').reduce(
    (sum, a) => sum + (a.fee || 0),
    0,
  );

  const pendingToday = todayAppts.filter((a) =>
    ['Pending', 'Confirmed'].includes(a.status),
  ).length;

  const kpis = [
    {
      label: "Today's Appointments",
      value: todayAppts.length,
      sub: `${pendingToday} awaiting check-in`,
      icon: Calendar,
      iconClass: 'admin-v2-kpi-icon-wrap--teal',
      trend: { pct: '12%', up: true, since: 'since yesterday' },
      accent: 'var(--adm-chart-1)',
    },
    {
      label: 'Total Patients',
      value: totalPatients,
      sub: 'Registered in system',
      icon: Users,
      iconClass: 'admin-v2-kpi-icon-wrap--green',
      trend: { pct: '4%', up: true, since: 'this month' },
      accent: 'var(--adm-green)',
    },
    {
      label: 'Revenue Collected',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      sub: 'From completed cases',
      icon: DollarSign,
      iconClass: 'admin-v2-kpi-icon-wrap--coral',
      trend: { pct: '8.2%', up: true, since: 'since last week' },
      accent: 'var(--adm-chart-2)',
    },
  ];

  const efficiencySegments = [
    { label: 'Booked', value: 85, color: 'var(--adm-chart-1)' },
    { label: 'Consultations', value: 76, color: 'var(--adm-chart-2)' },
    { label: 'Treatment slots', value: 60, color: 'var(--adm-chart-3)' },
  ];

  const capacityPct = Math.round(
    efficiencySegments.reduce((s, c) => s + c.value, 0) / efficiencySegments.length,
  );

  return (
    <div className="admin-v2-dashboard-stack">

      <div className="admin-v2-dashboard-hero">
        <div className="admin-v2-dashboard-hero-content">
          <span className="admin-v2-page-eyebrow" style={{ color: '#2563eb' }}>Clinical overview</span>
          <h2 className="admin-v2-dashboard-hero-title">Your practice, today</h2>
          <p className="admin-v2-page-subtitle">
            Schedule, patient growth, and collections — updated from live clinic data.
          </p>
        </div>
        <div className="admin-v2-dashboard-hero-actions">
          <button
            type="button"
            className="admin-v2-btn admin-v2-btn-primary btn-blue"
            onClick={() => onNavigateToSection?.('appointments')}
          >
            <Calendar size={16} />
            Manage appointments
          </button>
          <button
            type="button"
            className="admin-v2-btn admin-v2-btn-ghost"
            onClick={() => onNavigateToSection?.('reports')}
          >
            View reports
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="admin-v2-dashboard-grid">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="admin-v2-kpi-card">
              <div className="admin-v2-kpi-accent-bar" style={{ background: kpi.accent }} />

              <div className="admin-v2-kpi-info">
                <p className="admin-v2-kpi-label">{kpi.label}</p>
                <h3 className="admin-v2-kpi-value">{kpi.value}</h3>
                <p className="admin-v2-kpi-sub">{kpi.sub}</p>

                <div className="admin-v2-kpi-trend-row">
                  <span className={`admin-v2-kpi-trend ${kpi.trend.up ? 'up' : 'down'}`}>
                    {kpi.trend.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {kpi.trend.pct}
                  </span>
                  <span className="admin-v2-kpi-trend-since">{kpi.trend.since}</span>
                </div>
              </div>

              <div className={`admin-v2-kpi-icon-wrap ${kpi.iconClass}`}>
                <Icon size={22} strokeWidth={2.2} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-v2-dashboard-row-2">
        <div className="admin-v2-card chart-canvas admin-v2-chart-card admin-v2-chart-panel">
          <div className="admin-v2-card-header">
            <div>
              <h3 className="admin-v2-card-title">Bookings vs. completed</h3>
              <p className="admin-v2-card-desc">Monthly comparison — last 6 months</p>
            </div>
            <div className="admin-v2-chart-legend">
              <div className="admin-v2-chart-legend-item">
                <span className="admin-v2-chart-legend-dot admin-v2-chart-legend-dot--teal" />
                Booked
              </div>
              <div className="admin-v2-chart-legend-item">
                <span className="admin-v2-chart-legend-dot admin-v2-chart-legend-dot--coral" />
                Completed
              </div>
            </div>
          </div>

          <div className="admin-v2-chart-bar-wrap admin-v2-chart-bar-wrap--grouped">
            <div className="admin-v2-chart-grid" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="admin-v2-chart-grid-line" />
              ))}
            </div>

            {MONTHLY.map((m, i) => (
              <div key={m.label} className="admin-v2-chart-bar-col admin-v2-chart-bar-col--grouped">
                <div className="admin-v2-chart-bar-group">
                  <div
                    className="admin-v2-chart-bar-pair admin-v2-chart-bar-pair--booked"
                    style={{
                      height: `${(m.booked / CHART_MAX) * 100}%`,
                      animationDelay: `${i * 0.06}s`,
                    }}
                    title={`Booked: ${m.booked}`}
                  />
                  <div
                    className="admin-v2-chart-bar-pair admin-v2-chart-bar-pair--done"
                    style={{
                      height: `${(m.completed / CHART_MAX) * 100}%`,
                      animationDelay: `${i * 0.06 + 0.03}s`,
                    }}
                    title={`Completed: ${m.completed}`}
                  />
                </div>
                <span className="admin-v2-chart-bar-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-v2-card chart-canvas admin-v2-chart-panel">
          <div className="admin-v2-card-header">
            <h3 className="admin-v2-card-title">Capacity mix</h3>
            <span className="admin-v2-card-subtitle">Efficiency</span>
          </div>

          <div className="admin-v2-donut-layout">
            <DonutChart
              segments={efficiencySegments}
              centerValue={`${capacityPct}%`}
              centerLabel="Avg. utilization"
            />

            <div className="admin-v2-donut-legend">
              {efficiencySegments.map((seg) => (
                <div key={seg.label} className="admin-v2-donut-legend-row">
                  <div className="admin-v2-donut-legend-left">
                    <span className="admin-v2-chart-legend-dot" style={{ background: seg.color }} />
                    {seg.label}
                  </div>
                  <span className="admin-v2-donut-legend-pct">{seg.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="admin-v2-card admin-v2-today-card admin-v2-chart-panel">
        <div className="admin-v2-card-header">
          <div>
            <h3 className="admin-v2-card-title">Today&apos;s schedule</h3>
            <p className="admin-v2-card-desc">
              {todayAppts.length === 0
                ? 'No appointments booked for today'
                : `${todayAppts.length} appointment${todayAppts.length === 1 ? '' : 's'} on the calendar`}
            </p>
          </div>
          <button
            type="button"
            className="admin-v2-link-btn"
            onClick={() => onNavigateToSection?.('appointments')}
          >
            View all
            <ChevronRight size={14} />
          </button>
        </div>

        {upcomingToday.length === 0 ? (
          <div className="admin-v2-empty-inline">
            <Clock size={28} strokeWidth={1.5} />
            <p>Your calendar is clear for today. New bookings will appear here.</p>
          </div>
        ) : (
          <div className="admin-v2-table-wrapper admin-v2-table-wrapper--flush">
            <table className="admin-v2-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Treatment</th>
                  <th>Doctor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingToday.map((appt) => (
                  <tr key={appt.id}>
                    <td>
                      <span className="admin-v2-time-cell">{appt.time}</span>
                    </td>
                    <td>
                      <div className="admin-v2-table-avatar-cell">
                        <div className="admin-v2-mini-avatar">
                          {appt.patientName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <span>{appt.patientName}</span>
                      </div>
                    </td>
                    <td>{appt.treatment}</td>
                    <td className="admin-v2-muted-cell">{appt.doctor}</td>
                    <td>
                      <span className={statusBadgeClass(appt.status)}>
                        <span className="admin-v2-badge-dot" />
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
