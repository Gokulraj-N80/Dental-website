import React, { useState } from 'react';
import { Send, MapPin, User, Phone, Mail, ShieldCheck } from 'lucide-react';

const CITIES = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Bangalore', 'Hyderabad'];

function generateCaptcha() {
  return Math.floor(1000 + Math.random() * 9000);
}

export default function QuickBooking() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', captcha: '' });
  const [captchaCode] = useState(() => generateCaptcha());
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (String(form.captcha) !== String(captchaCode)) {
      alert('Incorrect captcha. Please try again.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', phone: '', email: '', city: '', captcha: '' });
  };

  return (
    <section className="qb-section">
      <div className="qb-inner" data-reveal>
        {/* Left — decorative panel */}
        <div className="qb-left">
          <div className="qb-left-content">
            <div className="qb-left-icon">
              <Send size={28} strokeWidth={1.5} />
            </div>
            <h3 className="qb-left-title">
              Book Your<br />
              <span>Appointment</span>
            </h3>
            <p className="qb-left-desc">
              Schedule a visit in seconds. Our team will confirm your appointment within 24 hours.
            </p>
            <div className="qb-left-features">
              <div className="qb-feature">
                <ShieldCheck size={16} /> <span>Free Consultation</span>
              </div>
              <div className="qb-feature">
                <ShieldCheck size={16} /> <span>No Hidden Charges</span>
              </div>
              <div className="qb-feature">
                <ShieldCheck size={16} /> <span>Same Day Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <form className="qb-form" onSubmit={handleSubmit}>
          <div className="qb-field">
            <User size={18} className="qb-field-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="qb-field-row">
            <div className="qb-field">
              <Phone size={18} className="qb-field-icon" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="qb-field">
              <Mail size={18} className="qb-field-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="qb-field-row">
            <div className="qb-field">
              <MapPin size={18} className="qb-field-icon" />
              <select name="city" value={form.city} onChange={handleChange} required>
                <option value="" disabled>Select City</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="qb-captcha-group">
              <div className="qb-field">
                <input
                  type="text"
                  name="captcha"
                  placeholder="Enter code"
                  value={form.captcha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="qb-captcha-code">{captchaCode}</div>
            </div>
          </div>

          <button type="submit" className="qb-btn" disabled={submitted}>
            {submitted ? (
              <><ShieldCheck size={18} /> Submitted!</>
            ) : (
              <><Send size={18} /> Book Appointment</>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
