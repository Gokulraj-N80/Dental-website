import React from 'react';
import { FileText, Download, BarChart2, TrendingUp, Users } from 'lucide-react';

export default function Reports() {
  const reportCards = [
    { 
      title: 'Clinic Appointments Summary', 
      desc: 'Detailed log of checkins, cancellations, no shows, and scheduling channels statistics.',
      icon: FileText,
      color: 'var(--adm-blue)',
      bg: 'var(--adm-blue-subtle)'
    },
    { 
      title: 'Financial Ledger & Tax Audit', 
      desc: 'Compiled ledger billing statements, pending dues balances, tax cuts and payments history export.',
      icon: TrendingUp,
      color: 'var(--adm-accent)',
      bg: 'var(--adm-accent-subtle)'
    },
    { 
      title: 'Patients Medical Histories', 
      desc: 'Complete case files record indexes containing diagnosed tags, treatment durations and doctors logs.',
      icon: Users,
      color: 'var(--adm-purple)',
      bg: 'rgba(139, 92, 246, 0.08)'
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Heading */}
      <div className="admin-v2-page-heading">
        <span className="admin-v2-page-eyebrow">Data Center</span>
        <h2 className="admin-v2-page-title">Reporting & Exports</h2>
        <p className="admin-v2-page-subtitle">Download clinic ledger balances sheets, patient clinical files records, and calendar statistics.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {reportCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="admin-v2-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px', padding: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', backgroundColor: card.bg, color: card.color, justifyContent: 'center' }}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-text-primary)' }}>{card.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--adm-text-tertiary)', lineHeight: '1.5', fontWeight: 400 }}>{card.desc}</p>
                </div>
              </div>
              
              <button className="admin-v2-btn admin-v2-btn-secondary" style={{ width: '100%' }}>
                <Download size={14} />
                Generate CSV Report
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
