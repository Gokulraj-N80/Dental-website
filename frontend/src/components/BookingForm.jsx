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
  'Salem (Main Branch)'
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

  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaGenerated] = useState('5010');

  return (
    <section className="booking-section section" id="booking">
      <div className="booking-premium-wrap animate-fade-in">
        
        {/* Left text column */}
        <div className="booking-left-text">
          <h2 className="booking-display-title">
            Book an<br />
            Appointment at<br />
            Dr Neemz Dental<br />
            Near You
          </h2>
        </div>

        {/* Right form inputs column */}
        <div className="booking-right-inputs-card">
          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-form-compact">
            <div className="booking-compact-grid">
              
              <div className="bfield-wrap">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name"
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="bfield-wrap">
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone Number"
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="bfield-wrap">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address"
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="bfield-wrap">
                <select 
                  name="branch" 
                  value={formData.branch} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select City</option>
                  {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="bfield-wrap">
                <input 
                  type="text" 
                  placeholder="Captcha" 
                  value={captchaValue}
                  onChange={(e) => setCaptchaValue(e.target.value)}
                  required 
                />
              </div>

              <div className="captcha-display-box">
                {captchaGenerated}
              </div>

            </div>

            <div className="booking-submit-row">
              <button type="submit" className="btn-compact-submit" disabled={loading}>
                {loading ? 'Processing...' : 'Book Now'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
