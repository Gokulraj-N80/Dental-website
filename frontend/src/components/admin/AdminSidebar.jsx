import React from 'react';
import { 
  LayoutDashboard, Calendar, Users, Laptop,
  DollarSign, BarChart3, Settings, 
  LogOut, Globe, Bell, ChevronLeft, ChevronRight,
  Moon, Sun
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard',      label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'appointments',   label: 'Appointments',   icon: Calendar },
  { id: 'patients',       label: 'Patients',       icon: Users },
  { id: 'treatments',     label: 'Treatments',     icon: Laptop },
  { id: 'payments',       label: 'Payments',       icon: DollarSign },
  { id: 'reports',        label: 'Reports',        icon: BarChart3 },
  { id: 'cms',            label: 'Website CMS',    icon: Globe },
  { id: 'notifications',  label: 'Notifications',  icon: Bell },
  { id: 'settings',       label: 'Settings',       icon: Settings },
];

export default function AdminSidebar({ 
  currentSection, 
  onSelectSection, 
  isCollapsed, 
  setIsCollapsed,
  onGoToPublic,
  onLogout
}) {
  return (
    <aside className={`admin-v2-sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      {/* Header / Logo */}
      <div className="admin-v2-sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <div className="admin-v2-sidebar-logo-icon">🦷</div>
          <span className="admin-v2-sidebar-logo-text">
            DRNEEMZ
            <small>Admin Console</small>
          </span>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        className="admin-v2-collapse-btn"
        onClick={() => setIsCollapsed(c => !c)}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed
          ? <ChevronRight size={13} strokeWidth={2.5} />
          : <ChevronLeft  size={13} strokeWidth={2.5} />
        }
      </button>

      {/* Navigation */}
      <nav className="admin-v2-sidebar-nav">
        <span className="admin-v2-nav-section-label">Main Menu</span>

        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`admin-v2-nav-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <div className="admin-v2-nav-item-icon">
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="admin-v2-nav-item-text">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="admin-v2-sidebar-footer">
        <span className="admin-v2-nav-section-label" style={{ padding: '0 4px 6px' }}>Quick Links</span>

        <button
          onClick={onGoToPublic}
          className="admin-v2-nav-item"
          title={isCollapsed ? 'View Website' : undefined}
          style={{ color: '#6b7a99' }}
        >
          <div className="admin-v2-nav-item-icon">
            <Globe size={18} strokeWidth={2} />
          </div>
          <span className="admin-v2-nav-item-text">View Website</span>
        </button>

        <button
          onClick={onLogout}
          className="admin-v2-nav-item"
          title={isCollapsed ? 'Logout' : undefined}
          style={{ color: '#f43f5e' }}
        >
          <div className="admin-v2-nav-item-icon">
            <LogOut size={18} strokeWidth={2} />
          </div>
          <span className="admin-v2-nav-item-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}
