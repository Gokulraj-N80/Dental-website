import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onNavClick }) {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo" style={{ cursor: 'pointer' }} onClick={() => onNavClick('home')}>
              <Logo size={42} showText={true} textColor="#ffffff" />
            </div>
            <p className="brand-description">
              State-of-the-art dental care communicating professionalism, cleanliness, and patient comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <button onClick={() => onNavClick('home')}>Home</button>
              <button onClick={() => onNavClick('services')}>Services</button>
              <button onClick={() => onNavClick('about')}>About Us</button>
              <button onClick={() => onNavClick('blog')}>Blog / Insights</button>
              <button onClick={() => onNavClick('doctors')}>Our Doctors</button>
              <button onClick={() => onNavClick('booking')}>E-Consultation</button>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="footer-hours-col">
            <h4>Clinic Hours</h4>
            <div className="hours-list">
              <div className="hours-row">
                <Clock size={16} />
                <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-row">
                <Clock size={16} />
                <span>Saturday: 9:00 AM - 3:00 PM</span>
              </div>
              <div className="hours-row text-closed">
                <Clock size={16} />
                <span>Sunday: Closed (Emergencies only)</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="footer-contact-col">
            <h4>Contact Info</h4>
            <div className="contact-list">
              <div className="contact-row">
                <MapPin size={18} />
                <span>Salem, Tamil Nadu, India</span>
              </div>
              <div className="contact-row">
                <Phone size={18} />
                <span>+91 74485 60350</span>
              </div>
              <div className="contact-row">
                <Mail size={18} />
                <span>care@drneemz.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Dr Neemz Dentistry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
