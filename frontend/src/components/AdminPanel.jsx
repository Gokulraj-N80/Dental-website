import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Lock, User as UserIcon, LogOut } from 'lucide-react';
import './admin/AdminPanel.css';

// Importing sub-components
import AdminSidebar from './admin/AdminSidebar';
import AdminTopBar from './admin/AdminTopBar';

const Dashboard = lazy(() => import('./admin/Dashboard'));
const Appointments = lazy(() => import('./admin/Appointments'));
const Patients = lazy(() => import('./admin/Patients'));
const Treatments = lazy(() => import('./admin/Treatments'));
const Invoices = lazy(() => import('./admin/Invoices'));
const Payments = lazy(() => import('./admin/Payments'));
const Reviews = lazy(() => import('./admin/Reviews'));
const Messages = lazy(() => import('./admin/Messages'));
const Reports = lazy(() => import('./admin/Reports'));
const WebsiteCMS = lazy(() => import('./admin/WebsiteCMS'));
const Notifications = lazy(() => import('./admin/Notifications'));
const Settings = lazy(() => import('./admin/Settings'));

function AdminViewFallback() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '40px', gap: '20px', width: '100%', height: '80vh' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '200px', height: '28px', borderRadius: '6px', background: 'var(--adm-border)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ width: '120px', height: '36px', borderRadius: '8px', background: 'var(--adm-border)', animation: 'pulse 1.5s infinite' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <div style={{ height: '120px', borderRadius: '12px', background: 'var(--adm-surface-2)', border: '1px solid var(--adm-border)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: '120px', borderRadius: '12px', background: 'var(--adm-surface-2)', border: '1px solid var(--adm-border)', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: '120px', borderRadius: '12px', background: 'var(--adm-surface-2)', border: '1px solid var(--adm-border)', animation: 'pulse 1.5s infinite' }} />
      </div>
      <div style={{ height: '250px', borderRadius: '16px', background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', animation: 'pulse 1.5s infinite' }} />
    </div>
  );
}

export default function AdminPanel({ onGoToPublic, theme, setTheme }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  
  // Sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');

  // Check auth token
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setAdminUser({ name: 'Admin Gokul', role: 'Principal Administrator' });
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.username && loginForm.password) {
      localStorage.setItem('adminToken', 'demo-token');
      setAdminUser({ name: 'Admin Gokul', role: 'Principal Administrator' });
      setIsAuthenticated(true);
      setLoginForm({ username: '', password: '' });
    } else {
      setErrorMsg('Please input valid credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-v2-login-wrap">
        <div className="admin-v2-login-card">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '3rem', display: 'inline-block', marginBottom: '12px' }}>🦷</span>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '1.4rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>DRNEEMZ DENTISTRY</h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--adm-sidebar-text)', fontWeight: 500 }}>Enterprise Console Gate</p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {errorMsg && (
              <div style={{ padding: '12px', backgroundColor: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: '10px', color: '#fca5a5', fontSize: '0.82rem', textAlign: 'center', fontWeight: 600 }}>
                {errorMsg}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--adm-sidebar-text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Username</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px' }}>
                <UserIcon size={18} color="var(--adm-sidebar-text)" />
                <input 
                  type="text" 
                  placeholder="Enter admin username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  style={{ border: 'none', background: 'transparent', outline: 'none', color: '#f8fafc', fontSize: '0.875rem', marginLeft: '10px', width: '100%' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--adm-sidebar-text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px' }}>
                <Lock size={18} color="var(--adm-sidebar-text)" />
                <input 
                  type="password" 
                  placeholder="Enter admin password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  style={{ border: 'none', background: 'transparent', outline: 'none', color: '#f8fafc', fontSize: '0.875rem', marginLeft: '10px', width: '100%' }}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="admin-v2-btn admin-v2-btn-primary"
              style={{ marginTop: '10px', padding: '12px' }}
            >
              Sign In to Console
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-v2-wrapper">
      <AdminSidebar 
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onGoToPublic={onGoToPublic}
        onLogout={handleLogout}
      />

      <main className="admin-v2-main">
        <AdminTopBar
          adminUser={adminUser}
          searchVal={globalSearch}
          setSearchVal={setGlobalSearch}
          onNotificationClick={() => setCurrentSection('notifications')}
          currentSection={currentSection}
        />

        <div className="admin-v2-content-area" data-lenis-prevent>
          <Suspense fallback={<AdminViewFallback />}>
            {currentSection === 'dashboard' && <Dashboard onNavigateToSection={setCurrentSection} />}
            {currentSection === 'appointments' && <Appointments searchGlobal={globalSearch} />}
            {currentSection === 'patients' && <Patients searchGlobal={globalSearch} />}
            {currentSection === 'treatments' && <Treatments />}
            {currentSection === 'invoices' && <Invoices />}
            {currentSection === 'payments' && <Payments />}
            {currentSection === 'reviews' && <Reviews />}
            {currentSection === 'messages' && <Messages />}
            {currentSection === 'reports' && <Reports />}
            {currentSection === 'cms' && <WebsiteCMS />}
            {currentSection === 'notifications' && <Notifications />}
            {currentSection === 'settings' && <Settings />}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
