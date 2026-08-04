import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Calendar } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
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
  'Pediatric Care',
];

const BRANCHES = ['Salem (Main Branch)'];

const inputCls =
  'w-full px-4 py-3.5 border rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '',
    timeSlot: '', service: '', branch: '', notes: '',
  });
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [successData, setSuccessData] = useState(null);
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaGenerated] = useState('5010');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!formData.name || !formData.email || !formData.phone || !formData.date ||
        !formData.timeSlot || !formData.service || !formData.branch) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    try {
      const payload = { ...formData, notes: `[Branch: ${formData.branch}] ${formData.notes}` };
      delete payload.branch;
      const res  = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
      setSuccessData(data.appointment);
      setFormData({ name: '', email: '', phone: '', date: '', timeSlot: '', service: '', notes: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split('T')[0];
  };

  /* ── Success Screen ── */
  if (successData) {
    return (
      <section className="w-full py-20 px-6 md:px-12" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div
          className="max-w-[560px] mx-auto flex flex-col items-center gap-6 p-10 rounded-3xl text-center animate-[fadeInUp_0.6s_ease-out]"
          style={{ backgroundColor: 'var(--color-primary)', boxShadow: 'var(--shadow-lg)' }}
        >
          <CheckCircle2 size={56} style={{ color: 'var(--color-secondary)' }} />
          <h2 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>
            Appointment Requested!
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
            Thank you, <strong>{successData.name}</strong>. We have received your booking details.
            A confirmation email will be sent once approved.
          </p>
          <div
            className="w-full flex flex-col gap-3 p-6 rounded-2xl text-left text-sm"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            {[
              ['Treatment', successData.service],
              ['Date',      new Date(successData.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
              ['Time Slot', successData.timeSlot],
              ['Status',    'Pending Confirmation'],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span style={{ color: 'var(--color-accent-medium)' }}>{label}:</span>
                <strong style={{ color: 'var(--color-accent)' }}>{val}</strong>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSuccessData(null)}
            className="px-8 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            Book Another Appointment
          </button>
        </div>
      </section>
    );
  }

  /* ── Form ── */
  return (
    <section
      id="booking"
      className="w-full py-20 px-6 md:px-12"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-center animate-[fadeInUp_0.8s_ease-out]">

        {/* Left */}
        <div className="flex flex-col gap-5">
          <span
            className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ backgroundColor: 'var(--color-gold-soft)', color: 'var(--color-secondary)' }}
          >
            <Calendar size={13} />
            Book an Appointment
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}
          >
            Book an<br />
            Appointment at<br />
            <span style={{ color: 'var(--color-secondary)' }}>Dr Neemz Dental</span><br />
            Near You
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-accent-medium)' }}>
            Fill in the form and our team will confirm your booking within 24 hours.
          </p>
        </div>

        {/* Right */}
        <div>
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 bg-red-50 border border-red-200 mb-6">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text" name="name" placeholder="Full Name"
                className={inputCls}
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={formData.name} onChange={handleChange} required
              />
              <input
                type="tel" name="phone" placeholder="Phone Number"
                className={inputCls}
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={formData.phone} onChange={handleChange} required
              />
              <input
                type="email" name="email" placeholder="Email Address"
                className={inputCls}
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={formData.email} onChange={handleChange} required
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date" name="date" min={getMinDate()}
                className={inputCls}
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={formData.date} onChange={handleChange} required
              />
              <select
                name="timeSlot"
                className={inputCls}
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={formData.timeSlot} onChange={handleChange} required
              >
                <option value="">Select Time Slot</option>
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="service"
                className={inputCls}
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={formData.service} onChange={handleChange} required
              >
                <option value="">Select Treatment</option>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                name="branch"
                className={inputCls}
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={formData.branch} onChange={handleChange} required
              >
                <option value="">Select Branch</option>
                {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Captcha Row */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text" placeholder="Enter captcha code"
                className={inputCls}
                style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
                value={captchaValue} onChange={(e) => setCaptchaValue(e.target.value)} required
              />
              <div
                className="flex items-center justify-center rounded-xl text-white text-xl font-black tracking-[4px] select-none"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                {captchaGenerated}
              </div>
            </div>

            {/* Notes */}
            <textarea
              name="notes" placeholder="Additional notes (optional)"
              rows={3}
              className={`${inputCls} resize-none`}
              style={{ borderColor: 'var(--color-accent-light)', backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
              value={formData.notes} onChange={handleChange}
            />

            <button
              type="submit" disabled={loading}
              className="btn-ripple self-start px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:opacity-90 hover:scale-105 disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              {loading ? 'Processing...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
