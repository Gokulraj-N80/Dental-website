import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Lock, User as UserIcon, LogOut, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientWaves from './GradientWaves';
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

import { APPOINTMENTS } from './admin/data/mockAppointments';

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

const mapBackendAppointment = (bAppt) => {
  const name = bAppt.name || 'Unknown Patient';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const avatarColor = colors[Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length];
  
  let status = 'Pending';
  if (bAppt.status === 'approved') status = 'Confirmed';
  else if (bAppt.status === 'cancelled') status = 'Cancelled';
  else if (bAppt.status === 'pending') status = 'Pending';

  return {
    id: bAppt._id,
    patientId: bAppt._id,
    patientName: name,
    patientInitials: initials || 'P',
    avatarColor,
    age: 30,
    gender: 'N/A',
    phone: bAppt.phone || '',
    email: bAppt.email || '',
    treatment: bAppt.service || 'General Consultation',
    doctor: bAppt.doctor || 'Dr. Neemz',
    date: bAppt.date ? bAppt.date.split('T')[0] : '',
    time: bAppt.timeSlot || '',
    source: 'Website',
    status,
    paymentStatus: 'Pending',
    fee: 0,
    notes: bAppt.notes || '',
    createdAt: bAppt.createdAt ? bAppt.createdAt.split('T')[0] : '',
    isNew: true,
  };
};

const DotMap = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const routes = [
    {
      start: { x: 100, y: 150, delay: 0 },
      end: { x: 200, y: 80, delay: 2 },
      color: "#2563eb",
    },
    {
      start: { x: 200, y: 80, delay: 2 },
      end: { x: 260, y: 120, delay: 4 },
      color: "#2563eb",
    },
    {
      start: { x: 50, y: 50, delay: 1 },
      end: { x: 150, y: 180, delay: 3 },
      color: "#2563eb",
    },
    {
      start: { x: 280, y: 60, delay: 0.5 },
      end: { x: 180, y: 180, delay: 2.5 },
      color: "#2563eb",
    },
  ];

  const generateDots = (width, height) => {
    const dots = [];
    const gap = 12;
    const dotRadius = 1;

    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        const isInMapShape =
          ((x < width * 0.25 && x > width * 0.05) && (y < height * 0.4 && y > height * 0.1)) ||
          ((x < width * 0.25 && x > width * 0.15) && (y < height * 0.8 && y > height * 0.4)) ||
          ((x < width * 0.45 && x > width * 0.3) && (y < height * 0.35 && y > height * 0.15)) ||
          ((x < width * 0.5 && x > width * 0.35) && (y < height * 0.65 && y > height * 0.35)) ||
          ((x < width * 0.7 && x > width * 0.45) && (y < height * 0.5 && y > height * 0.1)) ||
          ((x < width * 0.8 && x > width * 0.65) && (y < height * 0.8 && y > height * 0.6));

        if (isInMapShape && Math.random() > 0.3) {
          dots.push({
            x,
            y,
            radius: dotRadius,
            opacity: Math.random() * 0.5 + 0.2,
          });
        }
      }
    }
    return dots;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = generateDots(dimensions.width, dimensions.height);
    let animationFrameId;
    let startTime = Date.now();

    function drawDots() {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61, 107, 83, ${dot.opacity})`;
        ctx.fill();
      });
    }

    function drawRoutes() {
      const currentTime = (Date.now() - startTime) / 1000;
      routes.forEach(route => {
        const elapsed = currentTime - route.start.delay;
        if (elapsed <= 0) return;
        
        const duration = 3;
        const progress = Math.min(elapsed / duration, 1);
        
        const x = route.start.x + (route.end.x - route.start.x) * progress;
        const y = route.start.y + (route.end.y - route.start.y) * progress;
        
        ctx.beginPath();
        ctx.moveTo(route.start.x, route.start.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `var(--color-secondary)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(route.start.x, route.start.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `var(--color-secondary)`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `var(--color-gold)`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(117, 183, 57, 0.4)";
        ctx.fill();
        
        if (progress === 1) {
          ctx.beginPath();
          ctx.arc(route.end.x, route.end.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `var(--color-secondary)`;
          ctx.fill();
        }
      });
    }
    
    function animate() {
      drawDots();
      drawRoutes();
      const currentTime = (Date.now() - startTime) / 1000;
      if (currentTime > 15) {
        startTime = Date.now();
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default function AdminPanel({ onGoToPublic, theme, setTheme }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');

  const fetchAppointments = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map(mapBackendAppointment);
        setAppointments([...formatted, ...APPOINTMENTS]);
      } else {
        setAppointments(APPOINTMENTS);
      }
    } catch (err) {
      setAppointments(APPOINTMENTS);
    }
  };

  // Check auth token
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      fetch('http://localhost:5000/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Invalid token');
      })
      .then(data => {
        setIsAuthenticated(true);
        setAdminUser({ name: data.admin.username, role: 'Principal Administrator' });
        fetchAppointments(token);
      })
      .catch(() => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      });
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginForm.username, password: loginForm.password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }
      localStorage.setItem('adminToken', data.token);
      setAdminUser({ name: data.admin.username, role: 'Principal Administrator' });
      setIsAuthenticated(true);
      setLoginForm({ username: '', password: '' });
      fetchAppointments(data.token);
    } catch (err) {
      setErrorMsg(err.message || 'Please input valid credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminUser(null);
    setAppointments([]);
  };

  const handleStatusChange = async (id, newStatus) => {
    const isBackendAppt = /^[0-9a-fA-F]{24}$/.test(id);
    if (isBackendAppt) {
      let backendStatus = 'pending';
      if (newStatus === 'Confirmed' || newStatus === 'Approved') backendStatus = 'approved';
      else if (newStatus === 'Cancelled') backendStatus = 'cancelled';

      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: backendStatus })
        });
        if (!res.ok) {
          throw new Error('Failed to update status on backend');
        }
      } catch (err) {
        console.error(err);
        alert('Could not update appointment status on server.');
        return;
      }
    }
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this appointment record?')) {
      const isBackendAppt = /^[0-9a-fA-F]{24}$/.test(id);
      if (isBackendAppt) {
        try {
          const token = localStorage.getItem('adminToken');
          const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!res.ok) {
            throw new Error('Failed to delete appointment on backend');
          }
        } catch (err) {
          console.error(err);
          alert('Could not delete appointment on server.');
          return;
        }
      }
      setAppointments(prev => prev.filter(a => a.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6 relative" style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif", boxSizing: 'border-box', overflow: 'hidden' }}>
        {/* Background Waves */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}>
          <GradientWaves
            horizonColor="#09090e"
            waveColor="#15102a"
            crestColor="#2d1b54"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1}
            opacity={1}
            grain
            grainIntensity={0.05}
            mouseInteraction
            parallaxStrength={0.5}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl overflow-hidden rounded-2xl flex bg-white shadow-2xl z-10"
          style={{ minHeight: '560px', position: 'relative' }}
        >
          {/* Left side - Interactive Map */}
          <div className="hidden md:block w-1/2 relative overflow-hidden border-r border-gray-100 bg-gradient-to-br from-teal-50 to-emerald-100">
            <DotMap />
            
            {/* Logo and text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-4"
              >
                <button 
                  onClick={onGoToPublic}
                  title="Back to Website"
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-200 hover:scale-105 active:scale-95 transition-transform"
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  <ArrowLeft className="text-white h-6 w-6" />
                </button>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-3xl font-bold mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-700"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                DrNeemz Console
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-sm text-center text-gray-600"
                style={{ maxWidth: '280px', lineHeight: 1.5 }}
              >
                Access the clinician workspace, review active schedules, and manage patient files.
              </motion.p>
            </div>
          </div>
          
          {/* Right side - Sign In Form */}
          <div className="w-full md:w-1/2 bg-white" style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>Welcome back</h1>
              <p className="text-gray-500 mb-6 text-sm">Sign in to your account</p>
              
              {/* Credentials Note */}
              <div style={{ 
                padding: '12px 14px', 
                background: 'rgba(16, 185, 129, 0.05)', 
                border: '1px solid rgba(16, 185, 129, 0.15)', 
                borderRadius: '10px', 
                fontSize: '0.78rem', 
                color: '#065f46', 
                marginBottom: '20px',
                lineHeight: 1.5,
                boxSizing: 'border-box'
              }}>
                <p style={{ margin: '0 0 6px 0', fontWeight: 700, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Console Credentials</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>Username:</span><code style={{ color: '#059669', fontWeight: 600 }}>admin</code></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Password:</span><code style={{ color: '#059669', fontWeight: 600 }}>adminpassword123</code></div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-sm text-center font-medium mb-5" style={{ boxSizing: 'border-box' }}>
                  {errorMsg}
                </div>
              )}
              
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label htmlFor="username" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Username / Email <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter admin username"
                    required
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '42px',
                      padding: '0 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#f8fafc',
                      fontSize: '0.875rem',
                      color: '#1e293b',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Password <span className="text-emerald-600">*</span>
                  </label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter admin password"
                      required
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '42px',
                        padding: '0 40px 0 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#f8fafc',
                        fontSize: '0.875rem',
                        color: '#1e293b',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        height: '24px',
                        width: '24px',
                        zIndex: 2
                      }}
                    >
                      {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  style={{ marginTop: '6px' }}
                >
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)',
                      transition: 'opacity 0.2s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <span>Sign in</span>
                    <ArrowRight className="h-4 w-4" />
                    {isHovered && (
                      <motion.span
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{ filter: "blur(8px)" }}
                      />
                    )}
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
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
            {currentSection === 'dashboard' && <Dashboard onNavigateToSection={setCurrentSection} appointments={appointments} />}
            {currentSection === 'appointments' && <Appointments searchGlobal={globalSearch} appointments={appointments} onStatusChange={handleStatusChange} onDelete={handleDelete} />}
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
