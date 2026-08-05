import React, { useState } from 'react';
import { TREATMENTS_DB } from './data/mockTreatments';

export default function Treatments() {
  const [treatments] = useState(TREATMENTS_DB);
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = Array.from(new Set(treatments.map(t => t.category)));

  const filtered = treatments.filter(t => 
    filterCategory === 'all' || t.category === filterCategory
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Treatment Catalog</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Catalog of procedures, costs, duration, recovery details, and equipment assets.</p>
      </div>

      <div className="admin-v2-card">
        <div className="admin-v2-table-filters">
          <div className="admin-v2-filter-group">
            <select className="admin-v2-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Showing {filtered.length} Procedures</span>
        </div>

        <div className="admin-v2-table-wrapper">
          <table className="admin-v2-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Treatment Name</th>
                <th>Category</th>
                <th>Avg Cost (₹)</th>
                <th>Duration</th>
                <th>Visits Required</th>
                <th>Specialist</th>
                <th>Key Equipment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 700, color: '#10b981' }}>{t.id}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{t.name}</td>
                  <td>
                    <span className="admin-v2-badge in-consultation">{t.category}</span>
                  </td>
                  <td style={{ fontWeight: 700 }}>₹{t.cost}</td>
                  <td>{t.duration}</td>
                  <td>{t.visits}</td>
                  <td>{t.doctor}</td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'normal', maxWidth: '220px' }}>{t.equipment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
