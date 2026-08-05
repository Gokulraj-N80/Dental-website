import React from 'react';
import { 
  Calendar, Users, CheckCircle2, DollarSign, Star, AlertTriangle, TrendingUp, Clock
} from 'lucide-react';
import { APPOINTMENTS } from './data/mockAppointments';
import { PATIENTS } from './data/mockPatients';
import { DOCTORS } from './data/mockDoctors';

export default function Dashboard({ onNavigateToSection }) {
  // Calculated stats
  const today = new Date().toISOString().split('T')[0];
  
  const todayAppts = APPOINTMENTS.filter(a => a.date === today);
  const upcomingAppts = APPOINTMENTS.filter(a => a.date > today);
  const completedAppts = APPOINTMENTS.filter(a => a.status === 'Completed');
  const cancelledAppts = APPOINTMENTS.filter(a => a.status === 'Cancelled');
  
  const newPatients = PATIENTS.filter(p => p.status === 'New').length;
  const totalPatients = PATIENTS.length;
  const activePatients = PATIENTS.filter(p => p.status === 'Active').length;
  const returningPatients = PATIENTS.filter(p => p.previousTreatments.length > 0).length;

  const totalRevenue = APPOINTMENTS
    .filter(a => a.status === 'Completed')
    .reduce((sum, a) => sum + (a.fee || 0), 0);
  
  const monthlyRevenue = totalRevenue * 0.45; // Simulated subset for the current month
  const todayRevenue = todayAppts
    .filter(a => a.status === 'Completed')
    .reduce((sum, a) => sum + (a.fee || 0), 0) || 4500; // fallback default for aesthetic completeness
  
  const outstandingPayments = PATIENTS.reduce((sum, p) => sum + (p.pendingAmount || 0), 0);
  const avgRating = 4.8;
  const doctorsAvailable = DOCTORS.filter(d => d.workingDays.length > 0).length;
  const emergencyCases = 3;

  const kpis = [
    { label: "Today's Appointments", value: todayAppts.length, sub: "Scheduled today", icon: Calendar, color: "#3b82f6", bg: "#eff6ff" },
    { label: "Upcoming Appointments", value: upcomingAppts.length, sub: "Next 30 days", icon: Clock, color: "#8b5cf6", bg: "#f5f3ff" },
    { label: "New Patients Today", value: newPatients, sub: "+12% vs last week", icon: Users, color: "#10b981", bg: "#ecfdf5", trend: "up" },
    { label: "Total Patients", value: totalPatients, sub: "Registered base", icon: Users, color: "#06b6d4", bg: "#ecfeff" },
    { label: "Active Patients", value: activePatients, sub: "Recent interactions", icon: CheckCircle2, color: "#14b8a6", bg: "#f0fdfa" },
    { label: "Returning Patients", value: returningPatients, sub: "Loyalty rate", icon: TrendingUp, color: "#6366f1", bg: "#eef2ff" },
    { label: "Completed Treatments", value: completedAppts.length, sub: "All time records", icon: CheckCircle2, color: "#10b981", bg: "#ecfdf5" },
    { label: "Cancelled Bookings", value: cancelledAppts.length, sub: "Cancellation rate", icon: AlertTriangle, color: "#ef4444", bg: "#fef2f2" },
    { label: "Revenue Today", value: `₹${todayRevenue.toLocaleString('en-IN')}`, sub: "Collected fees", icon: DollarSign, color: "#10b981", bg: "#ecfdf5" },
    { label: "Monthly Revenue", value: `₹${Math.round(monthlyRevenue).toLocaleString('en-IN')}`, sub: "Current month", icon: DollarSign, color: "#059669", bg: "#ecfdf5" },
    { label: "Outstanding Payments", value: `₹${outstandingPayments.toLocaleString('en-IN')}`, sub: "Pending invoices", icon: AlertTriangle, color: "#f59e0b", bg: "#fffbeb" },
    { label: "Average Patient Rating", value: `${avgRating} / 5.0`, sub: "30 verified reviews", icon: Star, color: "#eab308", bg: "#fef8e6" },
    { label: "Available Doctors", value: `${doctorsAvailable} / ${DOCTORS.length}`, sub: "Currently on duty", icon: Users, color: "#3b82f6", bg: "#eff6ff" },
    { label: "Emergency Cases Today", value: emergencyCases, sub: "Urgent attention", icon: AlertTriangle, color: "#ef4444", bg: "#fef2f2" },
  ];

  // Pure CSS bar chart heights based on simulated weekly trends
  const daysOfWeek = [
    { name: 'Mon', count: 24, revenue: '₹22,000' },
    { name: 'Tue', count: 32, revenue: '₹34,000' },
    { name: 'Wed', count: 28, revenue: '₹29,000' },
    { name: 'Thu', count: 35, revenue: '₹38,000' },
    { name: 'Fri', count: 42, revenue: '₹48,000' },
    { name: 'Sat', count: 38, revenue: '₹40,000' },
    { name: 'Sun', count: 10, revenue: '₹12,000' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Dashboard Overview</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Real-time clinic activity, appointments tracking, and financial metrics summary.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="admin-v2-dashboard-grid">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div className="admin-v2-kpi-card" key={idx}>
              <div className="admin-v2-kpi-info">
                <h4>{kpi.label}</h4>
                <p className="admin-v2-kpi-value">{kpi.value}</p>
                <div className={`admin-v2-kpi-sub ${kpi.trend === 'up' ? 'up' : kpi.trend === 'down' ? 'down' : ''}`}>
                  {kpi.sub}
                </div>
              </div>
              <div className="admin-v2-kpi-icon-wrap" style={{ backgroundColor: kpi.bg, color: kpi.color }}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-v2-dashboard-row-2">
        {/* Revenue Trend Area/Line SVG Chart */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3>Revenue Growth & Patient Volume Trends</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Last 6 Months</span>
          </div>
          <div style={{ position: 'relative', height: '220px', width: '100%', marginTop: '10px' }}>
            <svg viewBox="0 0 500 200" width="100%" height="100%" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              {/* Area path */}
              <path 
                d="M 10 140 Q 90 90 170 120 T 330 60 T 490 40 L 490 180 L 10 180 Z" 
                fill="url(#chart-grad)" 
              />
              {/* Trend Line */}
              <path 
                d="M 10 140 Q 90 90 170 120 T 330 60 T 490 40" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />
              {/* Points */}
              <circle cx="10" cy="140" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <circle cx="90" cy="90" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <circle cx="170" cy="120" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <circle cx="250" cy="80" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <circle cx="330" cy="60" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <circle cx="410" cy="50" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <circle cx="490" cy="40" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 10px' }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => (
              <span key={idx} style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{month}</span>
            ))}
          </div>
        </div>

        {/* Treatment Share SVG Donut Ring Chart */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3>Treatment Distribution Share</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Total Share</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', height: '220px' }}>
            <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" width="100%" height="100%">
                {/* Background circle */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                {/* Root Canal - 40% */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="40 60" strokeDashoffset="25" />
                {/* Implants - 30% */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="85" />
                {/* Braces - 20% */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="55" />
                {/* Others - 10% */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="35" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', display: 'block' }}>230+</span>
                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>Cases</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              {[
                { name: 'Root Canal', pct: '40%', color: '#10b981' },
                { name: 'Implants', pct: '30%', color: '#3b82f6' },
                { name: 'Braces', pct: '20%', color: '#8b5cf6' },
                { name: 'Others', pct: '10%', color: '#f59e0b' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                    <span style={{ color: '#475569', fontWeight: 500 }}>{item.name}</span>
                  </div>
                  <strong style={{ color: '#0f172a' }}>{item.pct}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Doctor Performance Summary */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3>Top Doctors Active</h3>
            <button onClick={() => onNavigateToSection('doctors')} style={{ color: '#10b981', border: 'none', background: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {DOCTORS.slice(0, 4).map((doc, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="admin-v2-avatar" style={{ backgroundColor: doc.color, width: '34px', height: '34px', fontSize: '0.85rem' }}>
                    {doc.initials}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{doc.name}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{doc.specialization}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#10b981' }}>★ {doc.rating}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{doc.totalPatients} Patients</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
