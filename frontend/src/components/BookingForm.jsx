import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM'
];

const SERVICES = [
  'Teeth Cleaning & Hygiene',
  'Teeth Whitening (Bleaching)',
  'Dental Fillings',
  'Root Canal Treatment (RCT)',
  'Tooth Extraction',
  'Dental Implants',
  'Braces',
  'Invis Aligner',
  'Dental Crowns (Caps)',
  'Dental Bridges',
  'Dentures (Complete/Partial)',
  'Gum Treatment (Periodontal Care)',
  'Smile Designing',
  'Pediatric Care'
];

const BRANCHES = [
  'Salem (Main Branch)',
  'Chennai',
  'Bangalore'
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    service: '',
    branch: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.timeSlot || !formData.service || !formData.branch) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        notes: `[Branch: ${formData.branch}] ${formData.notes}`
      };
      delete payload.branch; // Clean up before sending

      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setSuccessData(data.appointment);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        timeSlot: '',
        service: '',
        notes: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date string for min date (format YYYY-MM-DD)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (successData) {
    return (
      <section className="booking-section section">
        <div className="booking-success animate-fade-in">
          <div className="success-icon-box">
            <CheckCircle2 size={48} color="var(--color-secondary)" />
          </div>
          <h2 className="success-title">Appointment Requested!</h2>
          <p className="success-subtitle">
            Thank you, {successData.name}. We have received your booking details. An confirmation email will be sent once approved.
          </p>
          
          <div className="booking-summary-card">
            <h3>Appointment Details</h3>
            <div className="summary-row">
              <span>Treatment:</span>
              <strong>{successData.service}</strong>
            </div>
            <div className="summary-row">
              <span>Date:</span>
              <strong>{new Date(successData.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </div>
            <div className="summary-row">
              <span>Time Slot:</span>
              <strong>{successData.timeSlot}</strong>
            </div>
            <div className="summary-row">
              <span>Status:</span>
              <span className="status-badge pending">Pending Confirmation</span>
            </div>
          </div>

          <button className="btn btn-secondary" onClick={() => setSuccessData(null)}>
            Book Another Appointment
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="booking-section section" id="booking">
      <div className="section-header">
        <span className="section-tag">Booking</span>
        <h2 className="section-title">Dental E-Consultation</h2>
        <p className="section-subtitle">
          Fill the form and our team will contact you shortly to confirm your consultation.
        </p>
      </div>

      <div className="booking-card animate-fade-in">
        {error && (
          <div className="error-message">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="e.g. John Doe"
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="e.g. john@example.com"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="e.g. +91 74485 60350"
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="branch">Clinic Location *</label>
              <select 
                id="branch" 
                name="branch" 
                value={formData.branch} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Location</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="service">Treatment Required *</label>
              <select 
                id="service" 
                name="service" 
                value={formData.service} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Treatment</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="date">Appointment Date *</label>
              <div className="input-with-icon">
                <Calendar size={18} className="input-icon" />
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  min={getMinDate()}
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="timeSlot">Preferred Time Slot *</label>
              <div className="input-with-icon">
                <Clock size={18} className="input-icon" />
                <select 
                  id="timeSlot" 
                  name="timeSlot" 
                  value={formData.timeSlot} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Time Slot</option>
                  {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Notes / Symptoms (Optional)</label>
            <textarea 
              id="notes" 
              name="notes" 
              rows="4" 
              placeholder="Please describe any issues or dental concerns you're currently experiencing..."
              value={formData.notes} 
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span>Scheduling...</span>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Request Appointment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
