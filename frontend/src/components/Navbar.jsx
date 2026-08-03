import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const DENTAL_TREATMENTS = [
  'ROUTINE CHECK UP', 'DENTAL FILLINGS', 'ROOT CANAL TREATMENT', 'WISDOM TOOTH REMOVAL',
  'DENTAL BRIDGES', 'DENTAL DENTURE', 'DENTAL IMPLANTS', 'CLEAR ALIGNERS', 'DENTAL BRACES',
  'SMILE MAKEOVERS', 'PEDIATRIC DENTISTRY', 'GUM TREATMENT', 'DENTAL CROWN', 'LASER-DENTISTRY'
];

export default function Navbar({ currentTab, setCurrentTab, onSelectTreatment }) {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'treatments' | null

  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = (id) => {
    setCurrentTab('home');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleTreatmentClick = (item) => {
    onSelectTreatment(item);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-wrapper">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <div className="logo-icon"></div>
          <span className="logo-text">LUMINA</span>
        </div>

        {/* Desktop Links */}
        <div className="navbar-links">
          <button 
            className="nav-link-neemz"
            onClick={() => handleNavClick('home')}
          >
            HOME
          </button>

          <button 
            className="nav-link-neemz"
            onClick={() => handleNavClick('about')}
          >
            ABOUT US
          </button>
          
          {/* Dental Treatments Dropdown */}
          <div 
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setActiveDropdown('treatments')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className={`nav-link-neemz dropdown-nav ${activeDropdown === 'treatments' ? 'active' : ''}`}
              onClick={() => toggleDropdown('treatments')}
            >
              <span>DENTAL TREATMENTS</span>
              <ChevronDown size={14} />
            </button>
            {activeDropdown === 'treatments' && (
              <div className="dropdown-panel treatments-grid-panel animate-fade-in">
                {DENTAL_TREATMENTS.map((item) => (
                  <button 
                    key={item} 
                    className="dropdown-item"
                    onClick={() => handleTreatmentClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className="nav-link-neemz"
            onClick={() => handleNavClick('blog')}
          >
            BLOG
          </button>
          
          <button 
            className="nav-link-neemz"
            onClick={() => handleNavClick('doctors')}
          >
            OUR DOCTORS
          </button>
          
          <button 
            className="btn btn-consultation"
            onClick={() => handleNavClick('booking')}
          >
            BOOK APPOINTMENT
          </button>
        </div>
      </div>
    </nav>
  );
}
