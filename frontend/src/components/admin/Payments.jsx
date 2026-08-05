import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, TrendingUp, CreditCard } from 'lucide-react';
import { INVOICES } from './data/mockInvoices';

export default function Payments() {
  const [invoices] = useState(INVOICES);

  const totalCollected = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPending = invoices
    .filter(i => i.status === 'Partial' || i.status === 'Unpaid')
    .reduce((sum, i) => sum + (i.amount - (i.paidAmount || 0)), 0);

  // Group transactions by method
  const methods = ['Cash', 'UPI', 'Credit Card', 'Debit Card', 'Insurance', 'Net Banking'];
  const methodStats = methods.map(m => {
    const matching = invoices.filter(i => i.paymentMethod === m);
    const sum = matching.reduce((acc, curr) => acc + curr.amount, 0);
    return { name: m, amount: sum, count: matching.length };
  });

  const maxMethodAmt = Math.max(...methodStats.map(s => s.amount));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Heading */}
      <div className="admin-v2-page-heading">
        <span className="admin-v2-page-eyebrow">Finance Hub</span>
        <h2 className="admin-v2-page-title">Payments Analytics</h2>
        <p className="admin-v2-page-subtitle">Track collections pipelines, check outstanding dues balances, and monitor channel performance.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="admin-v2-dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        
        {/* KPI 1 */}
        <div className="admin-v2-kpi-card">
          <div className="admin-v2-kpi-accent-bar" style={{ backgroundColor: 'var(--adm-accent)' }} />
          <div className="admin-v2-kpi-info">
            <p className="admin-v2-kpi-label">Accumulated Revenue</p>
            <h3 className="admin-v2-kpi-value">₹{totalCollected.toLocaleString('en-IN')}</h3>
            <p className="admin-v2-kpi-sub up">
              <ArrowUpRight size={14} />
              +14.8% growth this month
            </p>
          </div>
          <div className="admin-v2-kpi-icon-wrap" style={{ backgroundColor: 'var(--adm-accent-subtle)', color: 'var(--adm-accent)' }}>
            <DollarSign size={24} strokeWidth={2.5} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="admin-v2-kpi-card">
          <div className="admin-v2-kpi-accent-bar" style={{ backgroundColor: 'var(--adm-red)' }} />
          <div className="admin-v2-kpi-info">
            <p className="admin-v2-kpi-label">Outstanding Pipeline</p>
            <h3 className="admin-v2-kpi-value">₹{totalPending.toLocaleString('en-IN')}</h3>
            <p className="admin-v2-kpi-sub" style={{ color: 'var(--adm-text-tertiary)' }}>
              Awaiting billing checkouts
            </p>
          </div>
          <div className="admin-v2-kpi-icon-wrap" style={{ backgroundColor: 'var(--adm-red-subtle)', color: 'var(--adm-red)' }}>
            <CreditCard size={24} strokeWidth={2.5} />
          </div>
        </div>

      </div>

      <div className="admin-v2-dashboard-row-2">
        
        {/* Column 1: Ledger Table */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3 className="admin-v2-card-title">Recent Invoices & Transactions</h3>
            <span className="admin-v2-card-subtitle">Live ledger</span>
          </div>

          <div className="admin-v2-table-wrapper">
            <table className="admin-v2-table">
              <thead>
                <tr>
                  <th>Inv ID</th>
                  <th>Patient</th>
                  <th>Total Due</th>
                  <th>Paid Amount</th>
                  <th>Channel</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 7).map((inv) => (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: 800, color: 'var(--adm-accent)' }}>{inv.id}</td>
                    <td style={{ fontWeight: 700, color: 'var(--adm-text-primary)' }}>{inv.patientName}</td>
                    <td style={{ fontWeight: 800 }}>₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td style={{ fontWeight: 650, color: 'var(--adm-text-secondary)' }}>₹{(inv.paidAmount || 0).toLocaleString('en-IN')}</td>
                    <td>
                      <span className="admin-v2-stat-pill" style={{ fontSize: '0.7rem', padding: '3px 8px' }}>
                        {inv.paymentMethod}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-v2-badge ${inv.status.toLowerCase()}`} style={{ fontSize: '0.7rem' }}>
                        <span className="admin-v2-badge-dot" />
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 2: Channel Split */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3 className="admin-v2-card-title">Channels Split</h3>
            <span className="admin-v2-card-subtitle">Volume</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {methodStats.map((stat, i) => {
              const widthPct = maxMethodAmt > 0 ? (stat.amount / maxMethodAmt) * 100 : 0;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--adm-text-secondary)' }}>{stat.name}</span>
                    <strong style={{ color: 'var(--adm-text-primary)' }}>₹{stat.amount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="admin-v2-progress-track">
                    <div 
                      className="admin-v2-progress-fill" 
                      style={{ 
                        width: `${widthPct}%`, 
                        backgroundColor: i % 2 === 0 ? 'var(--adm-accent)' : 'var(--adm-blue)' 
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
