import React, { useState, useEffect } from 'react';
import { Lock, User as UserIcon, LogOut } from 'lucide-react';
import './AdminPanel.css';

// Importing sub-components
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import Dashboard from './Dashboard';
import Appointments from './Appointments';
import Patients from './Patients';
import Doctors from './Doctors';
import Treatments from './Treatments';
import Invoices from './Invoices';
import Payments from './Payments';
import Reviews from './Reviews';
import Messages from './Messages';
import Reports from './Reports';
import WebsiteCMS from './WebsiteCMS';
import Notifications from './Notifications';
import Settings from './Settings';

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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        fontFamily: 'system-ui'
      }}>
        <div style={{
          width: '400px',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          color: '#f8fafc'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '3rem' }}>🦷</span>
            <h2 style={{ margin: '12px 0 6px 0', fontSize: '1.5rem', fontWeight: 800 }}>DR. MARCUS DENTISTRY</h2>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Enterprise Management Administration Gate</p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {errorMsg && (
              <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem', textAlign: 'center' }}>
                {errorMsg}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Username</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px' }}>
                <UserIcon size={18} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="Enter admin username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  style={{ border: 'none', background: 'transparent', outline: 'none', color: '#f8fafc', fontSize: '0.9rem', marginLeft: '10px', width: '100%' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Password</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px' }}>
                <Lock size={18} color="#94a3b8" />
                <input 
                  type="password" 
                  placeholder="Enter admin password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  style={{ border: 'none', background: 'transparent', outline: 'none', color: '#f8fafc', fontSize: '0.9rem', marginLeft: '10px', width: '100%' }}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              style={{
                marginTop: '10px',
                padding: '12px',
                backgroundColor: '#10b981',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
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
          theme={theme}
          setTheme={setTheme}
        />

        <div className="admin-v2-content-area">
          {currentSection === 'dashboard' && <Dashboard onNavigateToSection={setCurrentSection} />}
          {currentSection === 'appointments' && <Appointments searchGlobal={globalSearch} />}
          {currentSection === 'patients' && <Patients searchGlobal={globalSearch} />}
          {currentSection === 'doctors' && <Doctors />}
          {currentSection === 'treatments' && <Treatments />}
          {currentSection === 'invoices' && <Invoices />}
          {currentSection === 'payments' && <Payments />}
          {currentSection === 'reviews' && <Reviews />}
          {currentSection === 'messages' && <Messages />}
          {currentSection === 'reports' && <Reports />}
          {currentSection === 'cms' && <WebsiteCMS />}
          {currentSection === 'notifications' && <Notifications />}
          {currentSection === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}
