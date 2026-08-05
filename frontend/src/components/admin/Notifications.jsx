import React, { useState } from 'react';
import { NOTIFICATIONS } from './data/mockNotifications';
import { Check, CheckSquare } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const getRelativeTime = (isoString) => {
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHrs = Math.round(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    
    return d.toLocaleDateString();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Heading */}
      <div className="admin-v2-page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="admin-v2-page-eyebrow">System Events</span>
          <h2 className="admin-v2-page-title">Notifications Manager</h2>
          <p className="admin-v2-page-subtitle">View booking events logs, system logs, patient entries alerts, and payments updates.</p>
        </div>
        <button className="admin-v2-btn admin-v2-btn-secondary" onClick={markAllRead}>
          <CheckSquare size={14} />
          Mark All Read
        </button>
      </div>

      <div className="admin-v2-card" style={{ padding: '8px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {notifications.length === 0 ? (
            <div className="admin-v2-empty">
              <div className="admin-v2-empty-icon">🔔</div>
              <p className="admin-v2-empty-title">All caught up!</p>
              <p className="admin-v2-empty-sub">No new system alerts or bookings events.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n.id} 
                className="admin-v2-activity-item" 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  background: !n.read ? 'var(--adm-accent-subtle)' : 'transparent',
                  padding: '18px 12px',
                  borderRadius: '12px',
                  margin: '4px 0',
                  borderBottom: 'none'
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', backgroundColor: !n.read ? 'white' : 'var(--adm-bg)', border: '1px solid var(--adm-border)' }}>
                    {n.icon || '🔔'}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: !n.read ? 800 : 650, color: 'var(--adm-text-primary)' }}>
                        {n.title}
                      </h4>
                      {!n.read && <span className="admin-v2-pulse-dot" style={{ position: 'relative', top: 0, right: 0 }} />}
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--adm-text-secondary)', lineHeight: '1.4' }}>{n.body}</p>
                    <span className="admin-v2-activity-time">{getRelativeTime(n.time)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => toggleRead(n.id)}
                  className={`admin-v2-btn admin-v2-btn-icon ${!n.read ? 'admin-v2-btn-primary' : 'admin-v2-btn-secondary'}`}
                  title={!n.read ? 'Mark Read' : 'Mark Unread'}
                  style={{ width: '30px', height: '30px', padding: 0 }}
                >
                  <Check size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
