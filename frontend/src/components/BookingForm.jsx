import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { AlertCircle, CheckCircle2, CalendarDays, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import BookingCalendar from './BookingCalendar';
import TimeSlots       from './TimeSlots';
import './BookingCalendar.css';
import { DOCTORS } from './admin/data/mockDoctors';

/* ─── Static data ─────────────────────────────────────────────────────────── */

const SERVICES = [
  'Teeth Cleaning & Hygiene', 'Teeth Whitening (Bleaching)', 'Dental Fillings',
  'Root Canal Treatment (RCT)', 'Tooth Extraction', 'Dental Implants', 'Braces',
  'Invis Aligner', 'Dental Crowns (Caps)', 'Dental Bridges',
  'Dentures (Complete/Partial)', 'Gum Treatment (Periodontal Care)',
  'Smile Designing', 'Pediatric Care',
];
const BRANCHES = ['Salem (Main Branch)'];

/** Deterministic availability map for the next 90 days */
function buildAvailMap() {
  const map = {};
  const today = new Date();
  for (let i = 1; i <= 90; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0) continue; // Sunday closed
    const key = [
      d.getFullYear(),
      String(d.getMonth()+1).padStart(2,'0'),
      String(d.getDate()).padStart(2,'0'),
    ].join('-');
    const r = (d.getDate() + d.getMonth()*3) % 7;
    map[key] = r===0 ? 'booked' : r<=2 ? 'few' : 'available';
  }
  return map;
}

/* ─── Success screen (unchanged) ────────────────────────────────────────────── */

function SuccessScreen({ data, onReset }) {
  return (
    <section className="booking-section section">
      <div className="booking-success animate-fade-in">
        <div className="success-icon-box">
          <CheckCircle2 size={48} color="var(--color-secondary)" />
        </div>
        <h2 className="success-title">Appointment Requested!</h2>
        <p className="success-subtitle">
          Thank you, {data.name}. We have received your booking details.
          A confirmation will be sent once approved.
        </p>
        <div className="booking-summary-card">
          <h3>Appointment Details</h3>
          <div className="summary-row"><span>Treatment:</span><strong>{data.service}</strong></div>
          {data.doctor && <div className="summary-row"><span>Doctor:</span><strong>{data.doctor}</strong></div>}
          <div className="summary-row">
            <span>Date:</span>
            <strong>
              {new Date(data.date).toLocaleDateString(undefined, {
                weekday:'long', year:'numeric', month:'long', day:'numeric',
              })}
            </strong>
          </div>
          <div className="summary-row"><span>Time:</span><strong>{data.timeSlot}</strong></div>
          <div className="summary-row">
            <span>Status:</span>
            <span className="status-badge pending">Pending Confirmation</span>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={onReset}>
          Book Another Appointment
        </button>
      </div>
    </section>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────────── */

export default function BookingForm({ defaultService }) {
  const availMap = useMemo(() => buildAvailMap(), []);
  const DAYS_OF_WEEK = useMemo(() => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], []);

  const [formData,    setFormData]    = useState({
    name:'', email:'', phone:'', service: defaultService||'', doctor:'', branch:'', notes:'',
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');

  // Helper to convert "02:30 PM" -> "14:30"
  const convert12hTo24h = useCallback((slotStr) => {
    if (!slotStr) return '';
    const [time, modifier] = slotStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    return `${hours.padStart(2, '0')}:${minutes}`;
  }, []);

  // Filter available doctors based on selectedDate and selectedSlot
  const availableDoctors = useMemo(() => {
    return DOCTORS.filter(doc => {
      // Weekday check
      if (selectedDate) {
        const dayName = DAYS_OF_WEEK[selectedDate.getDay()];
        if (!doc.workingDays.includes(dayName)) return false;
      }
      // Time slot check
      if (selectedSlot) {
        const slot24 = convert12hTo24h(selectedSlot);
        if (!doc.timeSlots.includes(slot24)) return false;
      }
      return true;
    });
  }, [selectedDate, selectedSlot, DAYS_OF_WEEK, convert12hTo24h]);

  // Reset doctor selection if they become unavailable
  useEffect(() => {
    if (formData.doctor) {
      const isAvailable = availableDoctors.some(doc => doc.name === formData.doctor);
      if (!isAvailable) {
        setFormData(prev => ({ ...prev, doctor: '' }));
      }
    }
  }, [selectedDate, selectedSlot, availableDoctors, formData.doctor]);
  
  // Dynamic random captcha generator
  const generateRandomCaptcha = useCallback(() => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }, []);

  const [captchaCode, setCaptchaCode]                   = useState('');
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');
  const [doctorHint,   setDoctorHint]   = useState(false);

  const handleDoctorLockedClick = useCallback(() => {
    if (!selectedDate || !selectedSlot) {
      setDoctorHint(true);
      setTimeout(() => setDoctorHint(false), 2500);
    }
  }, [selectedDate, selectedSlot]);
  const [successData,  setSuccessData]  = useState(null);

  const containerRef = useRef(null);

  // Set initial captcha on mount
  useEffect(() => {
    setCaptchaCode(generateRandomCaptcha());
  }, [generateRandomCaptcha]);

  /* Premium GSAP page entrance animation */
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Select elements to animate
    const leftCard = containerRef.current.querySelector('.booking-left-text');
    const rightCard = containerRef.current.querySelector('.booking-right-inputs-card');
    const formFields = containerRef.current.querySelectorAll('.bfield-wrap');
    const bottomRow = containerRef.current.querySelector('.booking-form-compact > div:last-child');
    
    // Set initial styles
    gsap.set([leftCard, rightCard], { opacity: 0 });
    gsap.set(formFields, { opacity: 0, y: 12 });
    if (bottomRow) gsap.set(bottomRow, { opacity: 0, y: 8 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(leftCard, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      from: { x: -30 }
    })
    .to(rightCard, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      from: { x: 30 }
    }, '-=0.46')
    .to(formFields, {
      opacity: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.45
    }, '-=0.3')
    .to(bottomRow, {
      opacity: 1,
      y: 0,
      duration: 0.4
    }, '-=0.15');

    return () => tl.kill();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setSelectedSlot('');
  }, []);

  const handleSlotSelect = useCallback((slot) => {
    setSelectedSlot(slot);
  }, []);

  const handleReset = useCallback(() => {
    setSuccessData(null);
    setFormData({ name:'', email:'', phone:'', service: defaultService||'', branch:'', notes:'' });
    setSelectedDate(null);
    setSelectedSlot('');
    setCaptchaValue('');
    setCaptchaCode(generateRandomCaptcha());
  }, [defaultService, generateRandomCaptcha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.phone || !formData.service || !formData.doctor || !formData.branch) {
      setError('Please fill in all required fields.'); return;
    }
    if (!selectedDate) {
      setError('Please select a date from the calendar.'); return;
    }
    if (!selectedSlot) {
      setError('Please select a time slot.'); return;
    }
    if (captchaValue.trim() !== captchaCode) {
      setError('Captcha does not match. Please try again.');
      setCaptchaValue('');
      setCaptchaCode(generateRandomCaptcha());
      return;
    }

    setLoading(true);

    const dateStr = [
      selectedDate.getFullYear(),
      String(selectedDate.getMonth()+1).padStart(2,'0'),
      String(selectedDate.getDate()).padStart(2,'0'),
    ].join('-');

    const payload = {
      name: formData.name, email: formData.email, phone: formData.phone,
      service: formData.service, doctor: formData.doctor, date: dateStr, timeSlot: selectedSlot,
      notes: `[Branch: ${formData.branch}] ${formData.notes}`.trim(),
    };

    try {
      const res  = await fetch('http://localhost:5000/api/appointments', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong.');
      setSuccessData(data.appointment);
    } catch {
      // Demo fallback when backend is offline
      setSuccessData({ ...payload, name: formData.name });
    } finally {
      setLoading(false);
    }
  };

  if (successData) return <SuccessScreen data={successData} onReset={handleReset} />;

  const selectedDateLabel = selectedDate
    ? selectedDate.toLocaleDateString('en-IN', {
        weekday:'long', day:'numeric', month:'long', year:'numeric',
      })
    : null;

  return (
    <section className="booking-section section" id="booking" ref={containerRef}>
      <div className="booking-premium-wrap">

        {/* ══ LEFT — Dark Branding Card (original, unchanged) ══ */}
        <div className="booking-left-text">
          <h2 className="booking-display-title">
            Book an<br />Appointment<br />at DrNeemz<br />Dental
          </h2>

          <div style={{ marginTop:'auto', paddingTop:'24px' }}>
            {[
              { icon:'✦', text:'Instant appointment confirmation' },
              { icon:'✦', text:'No waiting — choose your slot' },
              { icon:'✦', text:'Expert dental care since 2010' },
              { icon:'✦', text:'574+ verified patient reviews' },
            ].map(item => (
              <div key={item.text} style={{
                display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'10px',
              }}>
                <span style={{ color:'var(--color-gold)', fontWeight:900, fontSize:'0.7rem', marginTop:'3px', flexShrink:0 }}>
                  {item.icon}
                </span>
                <span style={{ fontFamily:'var(--font-main)', fontSize:'0.85rem', color:'rgba(255,255,255,0.75)', lineHeight:1.5 }}>
                  {item.text}
                </span>
              </div>
            ))}

            <div style={{
              marginTop:'16px', padding:'10px 14px',
              background:'rgba(255,255,255,0.07)',
              borderRadius:'10px', border:'1px solid rgba(255,255,255,0.12)',
            }}>
              <p style={{ fontFamily:'var(--font-main)', fontSize:'0.72rem', color:'rgba(255,255,255,0.5)', fontWeight:600, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:'3px' }}>
                Clinic Hours
              </p>
              <p style={{ fontFamily:'var(--font-main)', fontSize:'0.86rem', color:'rgba(255,255,255,0.82)', fontWeight:600 }}>
                Mon – Sat &nbsp;·&nbsp; 9:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* ══ RIGHT — Compact form (original style) + side-by-side cal/slots ══ */}
        <div className="booking-right-inputs-card">

          {/* Error */}
          {error && (
            <div className="error-message" style={{ marginBottom:'12px' }}>
              <AlertCircle size={16} /><span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-form-compact" noValidate>

            {/* ── Original 3-column input grid ── */}
            <div className="booking-compact-grid">

              <div className="bfield-wrap">
                <input type="text" name="name" placeholder="Full Name *"
                  value={formData.name} onChange={handleChange} required autoComplete="name" />
              </div>

              <div className="bfield-wrap">
                <input type="tel" name="phone" placeholder="Phone Number *"
                  value={formData.phone} onChange={handleChange} required autoComplete="tel" />
              </div>

              <div className="bfield-wrap">
                <input type="email" name="email" placeholder="Email Address"
                  value={formData.email} onChange={handleChange} autoComplete="email" />
              </div>

              {/* Service */}
              <div className="bfield-wrap">
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="">Select Treatment *</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Doctor */}
              <div className="bfield-wrap" style={{ position: 'relative' }}>
                {/* Invisible overlay to catch clicks when select is disabled */}
                {(!selectedDate || !selectedSlot) && (
                  <div
                    onClick={handleDoctorLockedClick}
                    style={{
                      position: 'absolute', inset: 0,
                      zIndex: 2, cursor: 'not-allowed',
                    }}
                    title="Select a date and time slot first"
                  />
                )}
                {/* Hint tooltip */}
                {doctorHint && (
                  <div style={{
                    position: 'absolute', bottom: 'calc(100% + 6px)', left: 0,
                    background: '#1e293b', color: '#fff',
                    fontSize: '0.78rem', fontFamily: 'var(--font-main)',
                    padding: '6px 12px', borderRadius: '8px',
                    whiteSpace: 'nowrap', zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                    pointerEvents: 'none',
                    animation: 'fadeIn 0.2s ease',
                  }}>
                    📅 Please select a date &amp; time slot first
                  </div>
                )}
                <select 
                  name="doctor" 
                  value={formData.doctor} 
                  onChange={handleChange} 
                  required
                  disabled={!selectedDate || !selectedSlot}
                  style={!selectedDate || !selectedSlot ? { opacity: 0.55, cursor: 'not-allowed' } : {}}
                >
                  <option value="">
                    {!selectedDate || !selectedSlot
                      ? 'Select Date & Time first *'
                      : availableDoctors.length === 0
                        ? 'No Doctors Available at this time'
                        : 'Select Doctor *'
                    }
                  </option>
                  {availableDoctors.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.specialization})</option>
                  ))}
                </select>
              </div>

              {/* City / Branch */}
              <div className="bfield-wrap">
                <select name="branch" value={formData.branch} onChange={handleChange} required>
                  <option value="">Select City *</option>
                  {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

            </div>

            {/* ── Date + slot summary badge placeholder to avoid layout shift ── */}
            <div style={{ height: '32px', display: 'flex', alignItems: 'center' }}>
              {selectedDateLabel && (
                <div style={{
                  display:'inline-flex',
                  alignItems:'center',
                  gap:'7px',
                  background:'var(--color-secondary-soft)',
                  border:'1px solid var(--color-secondary)',
                  borderRadius:'999px',
                  padding:'4px 12px',
                  fontFamily:'var(--font-main)',
                  fontSize:'0.76rem',
                  fontWeight:700,
                  color:'var(--color-secondary)',
                  animation:'badgeFadeIn 0.22s ease',
                }}>
                  <CalendarDays size={13} />
                  {selectedDateLabel}
                  {selectedSlot && (
                    <><span style={{opacity:0.5}}>·</span><Clock size={12} />{selectedSlot}</>
                  )}
                </div>
              )}
            </div>

            {/* ── SIDE-BY-SIDE: Calendar | Time Slots ── */}
            <div className="bfn-cal-row">
              <BookingCalendar
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                availMap={availMap}
              />
              <TimeSlots
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onSlotSelect={handleSlotSelect}
              />
            </div>

            {/* ── Original captcha + submit row ── */}
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>

              <div style={{ flex:1, display:'flex', gap:'10px' }}>
                <div className="bfield-wrap" style={{ flex:1 }}>
                  <input
                    type="text"
                    placeholder="Enter Captcha *"
                    value={captchaValue}
                    onChange={e => setCaptchaValue(e.target.value)}
                    required
                    maxLength={6}
                    aria-label="Captcha"
                  />
                </div>
                <div className="captcha-display-box" aria-label="Captcha code">
                  {captchaCode}
                </div>
              </div>

              <div className="booking-submit-row">
                <button type="submit" className="btn-compact-submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32 32" opacity="0.25"></circle>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="16 32"></circle>
                      </svg>
                      <span>Processing…</span>
                    </>
                  ) : (
                    <span>Book Now →</span>
                  )}
                </button>
              </div>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
