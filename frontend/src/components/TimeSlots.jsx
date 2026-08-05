/**
 * TimeSlots.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Side-by-side time slot panel rendered beside the calendar.
 * GSAP stagger-animates pills every time selectedDate changes.
 * Scrollable 2-column pill grid — same max-height as the calendar card.
 */

import React, { useRef, useEffect, useCallback, memo } from 'react';
import { Check, Clock, CalendarDays } from 'lucide-react';
import { gsap } from 'gsap';

/* ─── Slot definitions (18 slots → 2 cols = 9 rows, fits scroll) ─────────── */

const ALL_SLOTS = [
  '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
];

/**
 * Deterministic slot availability per date.
 * Status: 'available' | 'few' | 'booked'
 */
function getSlotStatus(date, idx) {
  if (!date) return 'available';
  const seed = (date.getDate() * 3 + date.getMonth() * 7 + idx * 5) % 9;
  if (seed === 0 || seed === 3 || seed === 6) return 'booked';
  if (seed === 1 || seed === 4)               return 'few';
  return 'available';
}

/* ─── TimeSlots component ──────────────────────────────────────────────────── */

function TimeSlots({ selectedDate, selectedSlot, onSlotSelect }) {
  const pillRefs = useRef([]);

  /* ── GSAP stagger every time date changes ── */
  useEffect(() => {
    if (!selectedDate) return;

    const pills = pillRefs.current.filter(Boolean);
    if (!pills.length) return;

    // Kill any running animation, reset all pills
    gsap.killTweensOf(pills);
    gsap.set(pills, { opacity: 0, y: 10, scale: 0.92 });

    // Stagger them in
    const tl = gsap.timeline();
    tl.to(pills, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.025,
      duration: 0.25,
      ease: 'power3.out',
    });

    return () => tl.kill();
  }, [selectedDate]);

  /* ── Slot click ── */
  const handleClick = useCallback((slot, status) => {
    if (status === 'booked') return;
    onSlotSelect(slot);
  }, [onSlotSelect]);

  /* ── Empty state (no date selected) ── */
  if (!selectedDate) {
    return (
      <div className="ts-panel">
        <div className="ts-header">
          <Clock size={13} className="ts-header-icon" />
          <span className="ts-header-title">Available Times</span>
        </div>
        <div className="ts-empty">
          <CalendarDays size={28} className="ts-empty-icon" />
          <p className="ts-empty-text">
            Select a date from the<br />calendar to view available times
          </p>
        </div>
      </div>
    );
  }

  const dayName = selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <div className="ts-panel">

      {/* ── Header ── */}
      <div className="ts-header">
        <Clock size={12} className="ts-header-icon" />
        <span className="ts-header-title">Available Times</span>
        <span className="ts-header-date">{dayName}</span>
      </div>

      {/* ── Scrollable pill grid ── */}
      <div className="ts-scroll" data-lenis-prevent>
        <div
          className="ts-grid"
          role="listbox"
          aria-label="Select a time slot"
        >
          {ALL_SLOTS.map((slot, i) => {
            const status   = getSlotStatus(selectedDate, i);
            const isSel    = selectedSlot === slot;
            const isBooked = status === 'booked';

            const cls = [
              'ts-pill',
              isSel    ? 'ts-selected' : '',
              isBooked ? 'ts-booked'   : '',
              status === 'few' && !isSel ? 'ts-few' : '',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={slot}
                type="button"
                role="option"
                ref={el => { pillRefs.current[i] = el; }}
                className={cls}
                aria-selected={isSel}
                aria-disabled={isBooked}
                onClick={() => handleClick(slot, status)}
              >
                {isSel && <Check size={11} className="ts-check" />}
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Mini legend ── */}
      <div className="ts-legend">
        <span className="ts-legend-item available">Available</span>
        <span className="ts-legend-item few">Few Slots</span>
        <span className="ts-legend-item booked">Fully Booked</span>
      </div>
    </div>
  );
}

export default memo(TimeSlots);
