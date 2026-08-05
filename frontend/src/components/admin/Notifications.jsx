import React, { useState } from 'react';
import { NOTIFICATIONS } from './data/mockNotifications';

export default function Notifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Clinic Notifications</h2>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Activity alerts, payments received, bookings status, and diagnostic checkins tracking.</p>
        </div>
        <button onClick={markAllRead} className="admin-v2-btn admin-v2-btn-secondary" style={{ fontSize: '0.85rem' }}>
          Mark all as read
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map((notif) => (
          <div 
            className="admin-v2-card" 
            key={notif.id}
            onClick={() => toggleRead(notif.id)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              cursor: 'pointer',
              borderLeft: notif.read ? '1px solid #e2e8f0' : `4px solid ${notif.color}`,
              backgroundColor: notif.read ? 'white' : '#f8fafc'
            }}
          >
            <div style={{ fontSize: '1.5rem' }}>
              {notif.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{notif.title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>{notif.body}</p>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
