import React from 'react';
import { 
  LayoutDashboard, Calendar, Users, HeartPulse, FileText, 
  DollarSign, Star, MessageSquare, BarChart3, Settings, 
  LogOut, Globe, Bell, ChevronLeft, ChevronRight, Laptop
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'treatments', label: 'Treatments', icon: Laptop },
  { id: 'payments', label: 'Payments', icon: DollarSign },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'cms', label: 'Website CMS', icon: Globe },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
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
      <div className="admin-v2-sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '1.5rem' }}>🦷</span>
          <span className="admin-v2-sidebar-logo-text">DR. MARCUS</span>
        </div>
      </div>

      <nav className="admin-v2-sidebar-nav">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`admin-v2-nav-item ${currentSection === item.id ? 'active' : ''}`}
            >
              <div className="admin-v2-nav-item-icon">
                <Icon size={20} />
              </div>
              <span className="admin-v2-nav-item-text">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '8px 12px' }}>
        <button
          onClick={onGoToPublic}
          className="admin-v2-nav-item"
          style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}
        >
          <div className="admin-v2-nav-item-icon">
            <Globe size={20} />
          </div>
          <span className="admin-v2-nav-item-text">View Site</span>
        </button>
      </div>

      <div className="admin-v2-sidebar-footer">
        <button 
          onClick={onLogout}
          className="admin-v2-nav-item"
          style={{ color: '#ef4444' }}
        >
          <div className="admin-v2-nav-item-icon">
            <LogOut size={20} />
          </div>
          <span className="admin-v2-nav-item-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}
