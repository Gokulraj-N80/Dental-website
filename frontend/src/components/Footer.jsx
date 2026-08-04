import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onNavClick }) {
  return (
    <footer style={{ backgroundColor: 'var(--color-footer-bg)' }}>
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div className="cursor-pointer" onClick={() => onNavClick('home')}>
              <Logo size={42} showText={true} textColor="var(--color-footer-text)" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-footer-text)', opacity: 0.7 }}>
              State-of-the-art dental care communicating professionalism, cleanliness, and patient comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-footer-text)' }}
            >
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Home',           tab: 'home' },
                { label: 'Services',       tab: 'services' },
                { label: 'About Us',       tab: 'about' },
                { label: 'Blog / Insights',tab: 'blog' },
                { label: 'Our Doctors',    tab: 'doctors' },
                { label: 'E-Consultation', tab: 'booking' },
              ].map(({ label, tab }) => (
                <button
                  key={tab}
                  onClick={() => onNavClick(tab)}
                  className="text-sm text-left transition-opacity hover:opacity-100 w-fit"
                  style={{ color: 'var(--color-footer-text)', opacity: 0.65 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Clinic Hours */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-footer-text)' }}
            >
              Clinic Hours
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { text: 'Mon - Fri: 8:00 AM - 6:00 PM', closed: false },
                { text: 'Saturday: 9:00 AM - 3:00 PM',  closed: false },
                { text: 'Sunday: Closed (Emergencies only)', closed: true },
              ].map(({ text, closed }) => (
                <div key={text} className="flex items-start gap-2">
                  <Clock size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-footer-text)', opacity: 0.5 }} />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--color-footer-text)', opacity: closed ? 0.4 : 0.7 }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-footer-text)' }}
            >
              Contact Info
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { icon: MapPin, text: 'Salem, Tamil Nadu, India' },
                { icon: Phone, text: '+91 74485 60350' },
                { icon: Mail,  text: 'care@drneemz.com' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2">
                  <Icon size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                  <span className="text-sm" style={{ color: 'var(--color-footer-text)', opacity: 0.75 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t text-center text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-footer-text)', opacity: 0.45 }}
        >
          © {new Date().getFullYear()} Dr Neemz Dentistry. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
