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
        {/* Weekly Trend Chart */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3>Weekly Appointment & Revenue Volume</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Active Week</span>
          </div>
          <div className="admin-v2-sparkline-container">
            {daysOfWeek.map((day, idx) => {
              const pct = (day.count / 50) * 100;
              return (
                <div className="admin-v2-sparkline-bar-wrap" key={idx}>
                  <div 
                    className="admin-v2-sparkline-bar" 
                    style={{ height: `${pct}%` }} 
                    data-value={`${day.count} Appts (${day.revenue})`}
                  />
                  <span className="admin-v2-sparkline-label">{day.name}</span>
                </div>
              );
            })}
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
    </div>
  );
}
