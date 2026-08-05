import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { getUnreadCount } from './data/mockNotifications';

export default function AdminTopBar({ 
  adminUser, 
  searchVal, 
  setSearchVal, 
  onNotificationClick,
  theme,
  setTheme
}) {
  const unreadCount = getUnreadCount();

  const toggleTheme = () => {
    setTheme(theme === 'neem' ? 'clinical-blue' : theme === 'clinical-blue' ? 'soft-medical-blush' : 'neem');
  };

  return (
    <header className="admin-v2-topbar">
      <div className="admin-v2-search-container">
        <Search size={18} color="#64748b" />
        <input 
          type="text" 
          placeholder="Global search by patient name or ID..." 
          className="admin-v2-search-input"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      <div className="admin-v2-topbar-actions">
        <button 
          onClick={toggleTheme} 
          className="admin-v2-action-btn"
          title="Toggle Theme"
        >
          {theme === 'neem' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          className="admin-v2-action-btn" 
          onClick={onNotificationClick}
          title="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="admin-v2-notification-badge">{unreadCount}</span>
          )}
        </button>

        <div className="admin-v2-admin-profile">
          <div className="admin-v2-avatar">
            {adminUser?.name ? adminUser.name.split(' ').map(n=>n[0]).join('') : 'AG'}
          </div>
          <div className="admin-v2-admin-details">
            <span className="admin-v2-admin-name">{adminUser?.name || 'Admin Gokul'}</span>
            <span className="admin-v2-admin-role">{adminUser?.role || 'Administrator'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
