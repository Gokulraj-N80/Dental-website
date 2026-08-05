import React from 'react';
import { FileText, Download, BarChart2, TrendingUp, Users } from 'lucide-react';

export default function Reports() {
  const reportCards = [
    { title: 'Clinic Appointments Summary', desc: 'Detailed log of checkins, cancellations, rescheduled slots, and doctor workloads.', icon: BarChart2, type: 'excel' },
    { title: 'Revenue & Financial Ledger', desc: 'Earnings logs, tax statements, billing breakdowns, outstanding payments, and methods analysis.', icon: TrendingUp, type: 'csv' },
    { title: 'Patient Registration Directory', desc: 'List of registered patients base, demographics breakdown, medical logs catalog.', icon: Users, type: 'excel' },
    { title: 'Treatments Frequency Report', desc: 'Statistical frequency logs of treatments, costs, categories, and duration analytics.', icon: FileText, type: 'pdf' },
  ];

  const handleDownload = (title) => {
    alert(`Exporting ${title} report. The document is being compiled and downloaded.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Reports & Analytics</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Export medical performance audits, transaction logs, and appointments metrics charts.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {reportCards.map((rep, idx) => {
          const Icon = rep.icon;
          return (
            <div className="admin-v2-card" key={idx} style={{ display: 'flex', flexDirection: 'column', justifyBlock: 'space-between', height: '100%' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '12px', backgroundColor: '#e6fbf4', color: '#10b981', borderRadius: '10px', height: 'fit-content' }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{rep.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>{rep.desc}</p>
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <span className="admin-v2-badge confirmed" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                  Format: {rep.type.toUpperCase()}
                </span>
                <button 
                  onClick={() => handleDownload(rep.title)}
                  className="admin-v2-btn admin-v2-btn-primary"
                  style={{ fontSize: '0.8rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Download size={14} /> Export
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
