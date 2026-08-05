import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, TrendingUp, CreditCard } from 'lucide-react';
import { INVOICES } from './data/mockInvoices';

export default function Payments() {
  const [invoices] = useState(INVOICES);

  // Financial aggregation
  const totalInvoiced = invoices.reduce((sum, i) => sum + i.total, 0);
  const paidRevenue = invoices
    .filter(i => i.paymentStatus === 'Paid')
    .reduce((sum, i) => sum + i.total, 0);
  const pendingRevenue = invoices
    .filter(i => i.paymentStatus === 'Pending')
    .reduce((sum, i) => sum + i.total, 0);
  const partialRevenue = invoices
    .filter(i => i.paymentStatus === 'Partial')
    .reduce((sum, i) => sum + i.total * 0.4, 0); // simulated partial collection

  const totalCollected = paidRevenue + partialRevenue;

  const paymentMethods = invoices.reduce((acc, inv) => {
    acc[inv.paymentMethod] = (acc[inv.paymentMethod] || 0) + inv.total;
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Payments & Revenue</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Financial transaction history, collection methods distribution, and earnings summary.</p>
      </div>

      <div className="admin-v2-dashboard-grid">
        <div className="admin-v2-kpi-card">
          <div className="admin-v2-kpi-info">
            <h4>Total Revenue Billed</h4>
            <p className="admin-v2-kpi-value" style={{ color: '#0f172a' }}>₹{Math.round(totalInvoiced).toLocaleString('en-IN')}</p>
            <span className="admin-v2-kpi-sub">Billing catalog cumulative</span>
          </div>
          <div className="admin-v2-kpi-icon-wrap" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            <DollarSign size={22} />
          </div>
        </div>

        <div className="admin-v2-kpi-card">
          <div className="admin-v2-kpi-info">
            <h4>Total Revenue Collected</h4>
            <p className="admin-v2-kpi-value" style={{ color: '#10b981' }}>₹{Math.round(totalCollected).toLocaleString('en-IN')}</p>
            <span className="admin-v2-kpi-sub">Paid + Partial collect</span>
          </div>
          <div className="admin-v2-kpi-icon-wrap" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            <TrendingUp size={22} />
          </div>
        </div>

        <div className="admin-v2-kpi-card">
          <div className="admin-v2-kpi-info">
            <h4>Pending Receivables</h4>
            <p className="admin-v2-kpi-value" style={{ color: '#ef4444' }}>₹{Math.round(pendingRevenue).toLocaleString('en-IN')}</p>
            <span className="admin-v2-kpi-sub">Overdue & draft status</span>
          </div>
          <div className="admin-v2-kpi-icon-wrap" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
            <ArrowUpRight size={22} />
          </div>
        </div>
      </div>

      <div className="admin-v2-dashboard-row-2">
        {/* Transaction listing */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3>Recent Collections</h3>
          </div>
          <div className="admin-v2-table-wrapper">
            <table className="admin-v2-table">
              <thead>
                <tr>
                  <th>Inv ID</th>
                  <th>Patient</th>
                  <th>Total Billed</th>
                  <th>Method</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {invoices.filter(i=>i.paymentStatus==='Paid').slice(0, 8).map((inv) => (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: 700, color: '#10b981' }}>{inv.id}</td>
                    <td>{inv.patientName}</td>
                    <td style={{ fontWeight: 700 }}>₹{inv.total.toLocaleString('en-IN')}</td>
                    <td>{inv.paymentMethod}</td>
                    <td>{inv.invoiceDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods Chart */}
        <div className="admin-v2-card">
          <div className="admin-v2-card-header">
            <h3>Collection Channels</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(paymentMethods).map(([method, amount], idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600, color: '#475569' }}>{method}</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{amount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${(amount / totalInvoiced) * 100}%`,
                      backgroundColor: idx % 2 === 0 ? '#10b981' : '#3b82f6',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
