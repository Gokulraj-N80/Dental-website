import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { getUnreadCount } from './data/mockNotifications';

const SECTION_TITLES = {
  dashboard: 'Dashboard',
  appointments: 'Appointments',
  patients: 'Patients',
  treatments: 'Treatments',
  invoices: 'Invoices',
  payments: 'Payments',
  reviews: 'Reviews',
  messages: 'Messages',
  reports: 'Reports',
  cms: 'Website CMS',
  notifications: 'Notifications',
  settings: 'Settings',
};

export default function AdminTopBar({
  adminUser,
  searchVal,
  setSearchVal,
  onNotificationClick,
  currentSection = 'dashboard',
}) {
  const unreadCount = getUnreadCount();
  const sectionTitle = SECTION_TITLES[currentSection] || 'Console';

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const todayLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="admin-v2-topbar">
      <div className="admin-v2-topbar-lead">
        <p className="admin-v2-topbar-greeting">
          {greeting}, <span>{adminUser?.name?.split(' ')[0] || 'Admin'}</span>
        </p>
        <h1 className="admin-v2-topbar-title">{sectionTitle}</h1>
        <p className="admin-v2-topbar-date">{todayLabel}</p>
      </div>

      <div className="admin-v2-search-container">
        <Search size={18} className="admin-v2-search-icon" />
        <input
          type="text"
          placeholder="Search patients, appointments, IDs…"
          className="admin-v2-search-input"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      <div className="admin-v2-topbar-actions">

        <button
          type="button"
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
            {adminUser?.name
              ? adminUser.name.split(' ').map((n) => n[0]).join('')
              : 'AG'}
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
