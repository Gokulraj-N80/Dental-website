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
    <section className="w-full py-16 px-6 md:px-12" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div
        className="max-w-[1000px] mx-auto rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] shadow-xl border"
        style={{
          backgroundColor: 'var(--color-primary)',
          borderColor: 'var(--color-accent-light)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Left — decorative panel */}
        <div
          className="flex flex-col justify-center p-8 md:p-12 text-white"
          style={{
            background: 'linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-gradient-end) 100%)',
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center self-start text-white">
              <Send size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-extrabold leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Book Your<br />
              <span className="opacity-90">Appointment</span>
            </h3>
            <p className="text-xs leading-relaxed opacity-85 max-w-[280px]">
              Schedule a visit in seconds. Our team will confirm your appointment within 24 hours.
            </p>
            <div className="flex flex-col gap-2.5 pt-2">
              {['Free Consultation', 'No Hidden Charges', 'Same Day Available'].map((text) => (
                <div key={text} className="flex items-center gap-2 text-xs font-semibold opacity-90">
                  <ShieldCheck size={16} className="text-white shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <form className="p-8 md:p-12 flex flex-col gap-5 justify-center" onSubmit={handleSubmit}>
          {submitted && (
            <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold">
              Success! Appointment requested.
            </div>
          )}

          <div className="relative flex items-center">
            <User size={18} className="absolute left-4" style={{ color: 'var(--color-accent-medium)' }} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-3.5 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
              style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative flex items-center">
              <Phone size={18} className="absolute left-4" style={{ color: 'var(--color-accent-medium)' }} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3.5 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative flex items-center">
              <Mail size={18} className="absolute left-4" style={{ color: 'var(--color-accent-medium)' }} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3.5 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative flex items-center">
              <MapPin size={18} className="absolute left-4" style={{ color: 'var(--color-accent-medium)' }} />
              <select
                name="city"
                className="w-full pl-12 pr-4 py-3.5 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 appearance-none"
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={form.city}
                onChange={handleChange}
                required
              >
                <option value="">Select City</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="captcha"
                placeholder="Captcha"
                className="w-full px-4 py-3.5 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={form.captcha}
                onChange={handleChange}
                required
              />
              <div
                className="flex items-center justify-center rounded-xl font-black text-sm tracking-[2px] text-white select-none"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                {captchaCode}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-ripple self-start px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}
