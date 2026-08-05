import React, { useState, useEffect } from 'react';
import { 
  Lock, User as UserIcon, LogOut, LayoutDashboard, Calendar, 
  Search, ShieldAlert, Award, FileText, CheckCircle, Clock, 
  Trash2, XCircle, DollarSign, TrendingUp, Compass, Activity, 
  Bell, ChevronDown
} from 'lucide-react';

export default function AdminPanel({ onGoToPublic, theme, setTheme }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  
  // Navigation states
  const [currentSection, setCurrentSection] = useState('dashboard'); // 'dashboard' | 'appointments'
  
  // Appointments states
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'cancelled'
  
  // Check auth on load
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      verifyToken(token);
    } else {
      // For demo convenience, pre-populate mock data state immediately
      setAppointments(MOCK_APPOINTMENTS);
    }
  }, []);

  // Fetch appointments when authenticated or when section/filter changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated, statusFilter]);

  const verifyToken = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.valid) {
        setIsAuthenticated(true);
        setAdminUser(data.admin);
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (err) {
      console.warn('Backend offline, using fallback auth for token', err);
      setIsAuthenticated(true);
      setAdminUser({ name: 'Admin Gokul', role: 'Clinic Administrator' });
      setAppointments(MOCK_APPOINTMENTS);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('adminToken', data.token);
      setAdminUser(data.admin);
      setIsAuthenticated(true);
      setLoginForm({ username: '', password: '' });
    } catch (err) {
      console.warn('Using local fallback demo login logic:', err.message);
      // Demo fallback: accept any admin login details
      localStorage.setItem('adminToken', 'demo-token');
      setAdminUser({ name: 'Admin Gokul', role: 'Clinic Administrator' });
      setIsAuthenticated(true);
      setLoginForm({ username: '', password: '' });
      setAppointments(MOCK_APPOINTMENTS);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      let url = `http://localhost:5000/api/appointments?status=${statusFilter}`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      } else {
        throw new Error('Non-ok response');
      }
    } catch (err) {
      console.warn('Using mock appointments fallback...', err);
      // Apply filters locally on mock data
      let filtered = [...MOCK_APPOINTMENTS];
      if (statusFilter !== 'all') {
        filtered = filtered.filter(a => a.status === statusFilter);
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(a => 
          a.name.toLowerCase().includes(query) || 
          a.email.toLowerCase().includes(query) || 
          a.phone.includes(query)
        );
      }
      setAppointments(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchAppointments();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (err) {
      console.warn('Updating status locally in fallback...', err);
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment record?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchAppointments();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (err) {
      console.warn('Deleting locally in fallback...', err);
      setAppointments(prev => prev.filter(a => a._id !== id));
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchAppointments();
    }
  };

  // Compute Dashboard Metrics
  const totalBookings = appointments.length;
  const confirmedBookings = appointments.filter(a => a.status === 'approved').length;
  const pendingApprovals = appointments.filter(a => a.status === 'pending').length;
  const estRevenue = confirmedBookings * 1200; // ₹1,200 average revenue per confirmed visit
  
  // Calculate treatment distribution count
  const treatmentCounts = appointments.reduce((acc, app) => {
    acc[app.service] = (acc[app.service] || 0) + 1;
    return acc;
  }, {});

  const topTreatments = Object.entries(treatmentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Render Auth screen if not logged in
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper animate-fade-in">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h2>Admin Console</h2>
            <p>Enter clinic admin credentials to manage appointments</p>
            <div style={{
              marginTop: '14px',
              padding: '10px 14px',
              backgroundColor: 'var(--color-secondary-soft)',
              border: '1px dashed var(--color-secondary)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              color: 'var(--color-secondary)',
              textAlign: 'left',
              lineHeight: '1.5'
            }}>
              <strong>Demo Admin Credentials:</strong><br />
              Username: <code style={{ fontStyle: 'normal', fontWeight: 'bold' }}>admin</code><br />
              Password: <code style={{ fontStyle: 'normal', fontWeight: 'bold' }}>adminpassword123</code>
            </div>
          </div>
          
          <form onSubmit={handleLoginSubmit}>
            {errorMsg && (
              <div style={{ 
                color: '#ef4444', 
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid #ef4444', 
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                fontSize: '0.8rem',
                fontWeight: '600',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldAlert size={16} />
                {errorMsg}
              </div>
            )}

            <div className="admin-form-group">
              <label>Username</label>
              <div className="admin-input-wrapper">
                <UserIcon size={18} className="admin-input-icon" />
                <input 
                  type="text" 
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="admin"
                  required 
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Password</label>
              <div className="admin-input-wrapper">
                <Lock size={18} className="admin-input-icon" />
                <input 
                  type="password" 
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>

            <button type="submit" className="admin-login-btn">
              <Lock size={16} />
              Login to Console
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="admin-console-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-logo-section">
            <span className="admin-logo-title">DR. MARCUS</span>
            <span className="admin-logo-subtitle">Admin Console</span>
          </div>

          <nav className="admin-menu-list">
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className={`admin-menu-item ${currentSection === 'dashboard' ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentSection('appointments')}
              className={`admin-menu-item ${currentSection === 'appointments' ? 'active' : ''}`}
            >
              <Calendar size={18} />
              Appointments
            </button>
          </nav>
        </div>

        <div className="admin-sidebar-footer">
          <div className="admin-help-box">
            <strong>Need help?</strong>
            <p>Contact the event/clinic developer team for console maintenance.</p>
            <a href="mailto:support@drmarcus.com">View Help Center</a>
          </div>

          <button onClick={handleLogout} className="admin-logout-btn">
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="admin-main-viewport">
        {/* Top Header Bar */}
        <div className="admin-top-bar">
          <div className="admin-title-row">
            <div className="admin-breadcrumbs">
              Admin <span>{currentSection === 'dashboard' ? 'Dashboard' : 'Appointments'}</span>
            </div>
            <h2>Dashboard Overview</h2>
            <p>Real-time insights into your clinic appointments and registrations.</p>
          </div>

          <div className="admin-profile-widget">
            <button
              onClick={() => {
                if (theme === 'neem') setTheme('clinical-blue');
                else if (theme === 'clinical-blue') setTheme('soft-medical-blush');
                else setTheme('neem');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Change Theme"
            >
              {theme === 'neem' ? '🌿' : theme === 'clinical-blue' ? '💙' : '🌸'}
            </button>

            <button
              onClick={onGoToPublic}
              style={{
                background: 'transparent',
                border: '1.5px solid var(--color-accent-light)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: '700',
                color: 'var(--color-accent)',
                cursor: 'pointer',
                marginRight: '12px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            >
              Public Site
            </button>

            <div className="admin-profile-avatar">
              AG
            </div>
            <div className="admin-profile-info">
              <span className="admin-profile-name">Admin Gokul</span>
              <span className="admin-profile-role">Clinic Administrator</span>
            </div>
          </div>
        </div>

        {currentSection === 'dashboard' ? (
          <>
            {/* 4 Stats Cards */}
            <div className="admin-stats-grid">
              <div className="admin-stats-card">
                <div>
                  <div className="admin-stat-label">Total Registrations</div>
                  <div className="admin-stat-value">{totalBookings}</div>
                  <div className="admin-stat-desc">Total bookings in database</div>
                </div>
                <div className="admin-stat-icon-wrapper blue">
                  <Activity size={20} />
                </div>
              </div>

              <div className="admin-stats-card">
                <div>
                  <div className="admin-stat-label">Confirmed (Paid)</div>
                  <div className="admin-stat-value">{confirmedBookings}</div>
                  <div className="admin-stat-desc">
                    {totalBookings > 0 ? Math.round((confirmedBookings / totalBookings) * 100) : 0}% conversion rate
                  </div>
                </div>
                <div className="admin-stat-icon-wrapper green">
                  <CheckCircle size={20} />
                </div>
              </div>

              <div className="admin-stats-card">
                <div>
                  <div className="admin-stat-label">Pending Approval</div>
                  <div className="admin-stat-value">{pendingApprovals}</div>
                  <div className="admin-stat-desc">Awaiting clinical confirmation</div>
                </div>
                <div className="admin-stat-icon-wrapper orange">
                  <Clock size={20} />
                </div>
              </div>

              <div className="admin-stats-card">
                <div>
                  <div className="admin-stat-label">Estimated Revenue</div>
                  <div className="admin-stat-value">₹{estRevenue}</div>
                  <div className="admin-stat-desc">Avg ₹1,200 per confirmed visit</div>
                </div>
                <div className="admin-stat-icon-wrapper gold">
                  <DollarSign size={20} />
                </div>
              </div>
            </div>

            {/* Mid Row Visual Grid */}
            <div className="admin-charts-grid">
              {/* Treatment Category Distribution */}
              <div className="admin-chart-card">
                <div className="admin-chart-header">
                  <span className="admin-chart-title">Treatment Distribution</span>
                  <span className="admin-badge-live">Live</span>
                </div>
                
                <div className="radial-chart-simulation">
                  <div className="radial-ring-outer">
                    <div className="radial-ring-inner">
                      <div className="radial-ring-num">{totalBookings}</div>
                      <div className="radial-ring-lbl">Total</div>
                    </div>
                  </div>

                  <div className="chart-legends">
                    {topTreatments.map(([service, count], idx) => (
                      <div className="chart-legend-item" key={service}>
                        <span 
                          className="legend-dot" 
                          style={{ 
                            backgroundColor: idx === 0 ? 'var(--color-secondary)' : idx === 1 ? 'var(--color-gold)' : 'var(--color-accent-light)' 
                          }}
                        />
                        <span>{service.substring(0, 15)} ({count})</span>
                      </div>
                    ))}
                    {topTreatments.length === 0 && <span style={{fontSize: '0.8rem'}}>No service data available.</span>}
                  </div>
                </div>
              </div>

              {/* Daily Registrations Trend */}
              <div className="admin-chart-card">
                <div className="admin-chart-header">
                  <span className="admin-chart-title">Daily Registrations Trend</span>
                  <span className="admin-badge-days">7 Days</span>
                </div>
                
                <div className="trend-chart-simulation">
                  <div className="chart-grid-lines">
                    <div className="chart-grid-line" />
                    <div className="chart-grid-line" />
                    <div className="chart-grid-line" />
                  </div>

                  <div className="chart-bars-container">
                    <div className="chart-bar-col">
                      <div className="chart-bar-pillar" style={{ height: '35%' }} />
                      <span className="chart-bar-label">Mon</span>
                    </div>
                    <div className="chart-bar-col">
                      <div className="chart-bar-pillar" style={{ height: '55%' }} />
                      <span className="chart-bar-label">Tue</span>
                    </div>
                    <div className="chart-bar-col">
                      <div className="chart-bar-pillar animate-pulse" style={{ height: '80%' }} />
                      <span className="chart-bar-label">Wed</span>
                    </div>
                    <div className="chart-bar-col">
                      <div className="chart-bar-pillar past" style={{ height: '20%' }} />
                      <span className="chart-bar-label">Thu</span>
                    </div>
                    <div className="chart-bar-col">
                      <div className="chart-bar-pillar past" style={{ height: '40%' }} />
                      <span className="chart-bar-label">Fri</span>
                    </div>
                    <div className="chart-bar-col">
                      <div className="chart-bar-pillar past" style={{ height: '10%' }} />
                      <span className="chart-bar-label">Sat</span>
                    </div>
                  </div>
                </div>

                <div className="chart-footer-row">
                  <span>● This Week</span>
                  <strong>Weekly Total: {totalBookings}</strong>
                </div>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <span className="admin-chart-title">Recent Registrations Feed</span>
                <span className="admin-badge-live">Live Feed</span>
              </div>
              
              <div className="recent-feed-list">
                {appointments.slice(0, 3).map((app) => (
                  <div className="feed-item animate-fade-in" key={app._id}>
                    <div className="feed-item-left">
                      <div className="feed-item-icon">
                        <UserIcon size={16} />
                      </div>
                      <div className="feed-item-details">
                        <span className="feed-item-name">{app.name}</span>
                        <span className="feed-item-meta">{app.service} | {new Date(app.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className={`feed-item-status admin-badge-status ${app.status}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <div className="feed-empty-state">
                    No registrations found yet.
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Appointments Manager Section */
          <div className="admin-appointments-section animate-fade-in">
            <div className="admin-table-controls">
              <div className="admin-search-wrapper">
                <Search size={16} className="admin-search-icon" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search patient name, email, or phone... (Press Enter)"
                />
              </div>

              <div className="admin-filter-tabs">
                {['all', 'pending', 'approved', 'cancelled'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`admin-filter-tab ${statusFilter === tab ? 'active' : ''}`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Contact Info</th>
                    <th>Date & Time</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app._id} className="animate-fade-in">
                      <td className="admin-patient-name-cell">{app.name}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.78rem' }}>
                          <span>{app.phone}</span>
                          <span style={{ color: 'var(--color-accent-medium)' }}>{app.email}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>{new Date(app.date).toLocaleDateString()}</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-accent-medium)' }}>{app.timeSlot}</span>
                        </div>
                      </td>
                      <td>{app.service}</td>
                      <td>
                        <span className={`admin-badge-status ${app.status}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="admin-table-actions">
                        {app.status !== 'approved' && (
                          <button 
                            onClick={() => handleStatusChange(app._id, 'approved')}
                            className="admin-table-action-btn confirm"
                            title="Approve Appointment"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {app.status !== 'cancelled' && (
                          <button 
                            onClick={() => handleStatusChange(app._id, 'cancelled')}
                            className="admin-table-action-btn cancel"
                            title="Cancel Appointment"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(app._id)}
                          className="admin-table-action-btn delete"
                          title="Delete Record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-accent-medium)' }}>
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const MOCK_APPOINTMENTS = [
  {
    _id: "demo-1",
    name: "Sarah Connor",
    email: "sarah.c@sky.net",
    phone: "+91 98401 23456",
    date: "2026-08-04T00:00:00.000Z",
    timeSlot: "10:30 AM",
    service: "Teeth Cleaning & Hygiene",
    status: "approved"
  },
  {
    _id: "demo-2",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+91 99622 98765",
    date: "2026-08-04T00:00:00.000Z",
    timeSlot: "11:15 AM",
    service: "Dental Implants",
    status: "pending"
  },
  {
    _id: "demo-3",
    name: "Alice Johnson",
    email: "alice.j@outlook.com",
    phone: "+91 97890 54321",
    date: "2026-08-05T00:00:00.000Z",
    timeSlot: "02:00 PM",
    service: "Invisalign & Orthodontics",
    status: "pending"
  },
  {
    _id: "demo-4",
    name: "Robert Downey",
    email: "tony.stark@stark.com",
    phone: "+91 90030 11223",
    date: "2026-08-05T00:00:00.000Z",
    timeSlot: "03:30 PM",
    service: "Cosmetic Whitening",
    status: "approved"
  },
  {
    _id: "demo-5",
    name: "Emily Watson",
    email: "emily.w@yahoo.com",
    phone: "+91 91765 88990",
    date: "2026-08-06T00:00:00.000Z",
    timeSlot: "09:00 AM",
    service: "Pediatric Care",
    status: "pending"
  },
  {
    _id: "demo-6",
    name: "Bruce Wayne",
    email: "bruce@waynecorp.com",
    phone: "+91 98840 77777",
    date: "2026-08-06T00:00:00.000Z",
    timeSlot: "04:15 PM",
    service: "Root Canal Treatment",
    status: "cancelled"
  }
];
