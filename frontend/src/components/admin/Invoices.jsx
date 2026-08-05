import React, { useState } from 'react';
import { Eye, Printer, X } from 'lucide-react';
import { INVOICES } from './data/mockInvoices';

export default function Invoices() {
  const [invoices, setInvoices] = useState(INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = invoices.filter(inv => 
    filterStatus === 'all' || inv.paymentStatus === filterStatus
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Invoice Ledger</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Financial accounts invoicing records, clinical consultation charges, tax fees and payments tracking.</p>
      </div>

      <div className="admin-v2-card">
        <div className="admin-v2-table-filters">
          <div className="admin-v2-filter-group">
            <select className="admin-v2-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Showing {filtered.length} Invoices</span>
        </div>

        <div className="admin-v2-table-wrapper">
          <table className="admin-v2-table">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Patient Details</th>
                <th>Treatment</th>
                <th>Doctor</th>
                <th>Total Cost</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Invoice Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 40).map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 700, color: '#10b981' }}>{inv.id}</td>
                  <td>
                    <div className="admin-v2-table-avatar-cell">
                      <div className="admin-v2-avatar" style={{ backgroundColor: inv.avatarColor, width: '32px', height: '32px', fontSize: '0.8rem' }}>
                        {inv.patientInitials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{inv.patientName}</div>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{inv.patientId}</span>
                      </div>
                    </div>
                  </td>
                  <td>{inv.treatment}</td>
                  <td>{inv.doctor}</td>
                  <td style={{ fontWeight: 700 }}>₹{inv.total.toLocaleString('en-IN')}</td>
                  <td>{inv.paymentMethod}</td>
                  <td>
                    <span className={`admin-v2-badge ${inv.paymentStatus.toLowerCase()}`}>
                      {inv.paymentStatus}
                    </span>
                  </td>
                  <td>{inv.invoiceDate}</td>
                  <td>
                    <button 
                      onClick={() => setSelectedInvoice(inv)}
                      className="admin-v2-btn admin-v2-btn-secondary admin-v2-btn-icon"
                      title="View Invoice Detail"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice modal */}
      {selectedInvoice && (
        <div className="admin-v2-modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div className="admin-v2-modal" style={{ width: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-v2-modal-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Invoice Summary ({selectedInvoice.id})</h3>
              <button 
                onClick={() => setSelectedInvoice(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b' }}
              >
                ✕
              </button>
            </div>
            <div className="admin-v2-modal-content">
              {/* Detailed Invoice printable preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>Dr. Marcus Dentistry</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>12, Cathedral Road, Chennai - 600086</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h4 style={{ margin: 0, color: '#10b981' }}>{selectedInvoice.paymentStatus.toUpperCase()}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Date: {selectedInvoice.invoiceDate}</p>
                  </div>
                </div>

                <div className="admin-v2-detail-grid">
                  <div className="admin-v2-detail-item">
                    <span className="admin-v2-detail-label">Patient Details</span>
                    <span className="admin-v2-detail-value">{selectedInvoice.patientName} ({selectedInvoice.patientId})</span>
                  </div>
                  <div className="admin-v2-detail-item">
                    <span className="admin-v2-detail-label">Doctor</span>
                    <span className="admin-v2-detail-value">{selectedInvoice.doctor}</span>
                  </div>
                </div>

                <table className="admin-v2-table" style={{ border: '1px solid #e2e8f0' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc' }}>
                      <th>Billing Item</th>
                      <th style={{ textAlign: 'right' }}>Price (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Consultation Fee</td>
                      <td style={{ textAlign: 'right' }}>₹{selectedInvoice.consultationFee}</td>
                    </tr>
                    <tr>
                      <td>{selectedInvoice.treatment} Cost</td>
                      <td style={{ textAlign: 'right' }}>₹{selectedInvoice.treatmentCost}</td>
                    </tr>
                    {selectedInvoice.additionalCharges > 0 && (
                      <tr>
                        <td>Additional Consumables</td>
                        <td style={{ textAlign: 'right' }}>₹{selectedInvoice.additionalCharges}</td>
                      </tr>
                    )}
                    {selectedInvoice.discount > 0 && (
                      <tr style={{ color: '#ef4444' }}>
                        <td>Promotional Discount</td>
                        <td style={{ textAlign: 'right' }}>-₹{selectedInvoice.discount}</td>
                      </tr>
                    )}
                    <tr style={{ fontWeight: 600, borderTop: '2px solid #e2e8f0' }}>
                      <td>CGST + SGST (9%)</td>
                      <td style={{ textAlign: 'right' }}>₹{selectedInvoice.tax}</td>
                    </tr>
                    <tr style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', borderTop: '2px solid #e2e8f0' }}>
                      <td>Total Invoice Cost</td>
                      <td style={{ textAlign: 'right' }}>₹{selectedInvoice.total.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="admin-v2-modal-footer">
              <button 
                onClick={() => window.print()}
                className="admin-v2-btn admin-v2-btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Printer size={16} /> Print Invoice
              </button>
              <button onClick={() => setSelectedInvoice(null)} className="admin-v2-btn admin-v2-btn-secondary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
