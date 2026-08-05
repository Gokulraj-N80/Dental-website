import React, { useState } from 'react';
import { TREATMENTS_DB } from './data/mockTreatments';
import { DollarSign, Clock, HelpCircle } from 'lucide-react';

export default function Treatments() {
  const [treatments] = useState(TREATMENTS_DB);
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(treatments.map(t => t.category))];

  const filtered = treatments.filter(t => 
    filterCategory === 'all' || t.category === filterCategory
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Heading */}
      <div className="admin-v2-page-heading">
        <span className="admin-v2-page-eyebrow">Medical Catalog</span>
        <h2 className="admin-v2-page-title">Treatments Database</h2>
        <p className="admin-v2-page-subtitle">Configure diagnostic services catalog pricing, average sessions duration, and medical materials.</p>
      </div>

      <div className="admin-v2-card">
        <div className="admin-v2-table-filters">
          <div className="admin-v2-filter-group">
            <select 
              className="admin-v2-select" 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ textTransform: 'capitalize' }}
            >
              {categories.map((c, i) => (
                <option key={i} value={c}>{c === 'all' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>
          <span className="admin-v2-table-count">Showing {filtered.length} entries</span>
        </div>

        {/* Table */}
        <div className="admin-v2-table-wrapper">
          <table className="admin-v2-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Avg. Duration</th>
                <th>Cost Bracket (₹)</th>
                <th>Primary Equipment</th>
                <th>Min. Visits Required</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--adm-text-primary)' }}>{t.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-tertiary)', marginTop: '4px', maxWidth: '300px', whiteSpace: 'normal', lineHeight: '1.4' }}>
                        {t.description}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="admin-v2-stat-pill" style={{ textTransform: 'capitalize', fontSize: '0.7rem', padding: '3px 8px' }}>
                      {t.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                      <Clock size={14} color="#8b96b0" />
                      {t.duration}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 850, color: 'var(--adm-accent)' }}>
                      ₹{t.cost}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{t.equipmentsRequired}</td>
                  <td>
                    <span className="admin-v2-badge confirmed" style={{ fontSize: '0.7rem' }}>
                      <span className="admin-v2-badge-dot" />
                      {t.visits} Visit{t.visits > 1 ? 's' : ''}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
