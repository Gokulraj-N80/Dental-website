import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';

const DENTAL_TREATMENTS = [
  'ROUTINE CHECK UP', 'DENTAL FILLINGS', 'ROOT CANAL TREATMENT', 'WISDOM TOOTH REMOVAL',
  'DENTAL BRIDGES', 'DENTAL DENTURE', 'DENTAL IMPLANTS', 'CLEAR ALIGNERS', 'DENTAL BRACES',
  'SMILE MAKEOVERS', 'PEDIATRIC DENTISTRY', 'GUM TREATMENT', 'DENTAL CROWN', 'LASER-DENTISTRY'
];

export default function Navbar({ currentTab, setCurrentTab, onSelectTreatment, theme, setTheme, hideLogo }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'treatments' | null
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

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
    <nav className={`navbar-container ${scrolled ? 'scrolled-glass-shadow' : ''}`}>
      <div className="navbar-wrapper">
        {/* Logo */}
        <div className={`navbar-logo header-logo-target ${hideLogo ? 'logo-hidden' : ''}`} onClick={() => handleNavClick('home')}>
          <Logo size={42} showText={true} />
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-menu-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>

        {/* Desktop Links */}
        <div className="navbar-links desktop-only-links">
          <button 
            className={`nav-link-neemz ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            HOME
          </button>

          <button 
            className={`nav-link-neemz ${currentTab === 'about' ? 'active' : ''}`}
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
            className={`nav-link-neemz ${currentTab === 'blog' ? 'active' : ''}`}
            onClick={() => handleNavClick('blog')}
          >
            BLOG
          </button>
          
          <button 
            className={`nav-link-neemz ${currentTab === 'doctors' ? 'active' : ''}`}
            onClick={() => handleNavClick('doctors')}
          >
            OUR DOCTORS
          </button>
          
          <button 
            className={`nav-link-neemz ${currentTab === 'admin' ? 'active' : ''}`}
            onClick={() => handleNavClick('admin')}
          >
            ADMIN
          </button>
          
          <div className="theme-dropdown-wrapper" style={{ position: 'relative' }}>
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="theme-toggle-btn"
              style={{
                background: 'transparent',
                border: '1.5px solid var(--color-accent-light)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: '700',
                color: 'var(--color-accent)',
                cursor: 'pointer',
                outline: 'none',
                fontFamily: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'var(--transition-smooth)'
              }}
            >
              {theme === 'neem' ? '🌿 Neem' : theme === 'clinical-blue' ? '💙 Clinical' : '🌸 Blush'}
              <ChevronDown size={11} />
            </button>
            
            {isThemeDropdownOpen && (
              <div
                className="theme-dropdown-panel"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  backgroundColor: 'var(--color-primary)',
                  border: '1.5px solid var(--color-accent-light)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 1000,
                  minWidth: '120px'
                }}
              >
                {theme !== 'neem' && (
                  <button
                    onClick={() => { setTheme('neem'); setIsThemeDropdownOpen(false); }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      color: 'var(--color-accent)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'var(--transition-smooth)',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    🌿 Neem
                  </button>
                )}
                {theme !== 'clinical-blue' && (
                  <button
                    onClick={() => { setTheme('clinical-blue'); setIsThemeDropdownOpen(false); }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      color: 'var(--color-accent)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'var(--transition-smooth)',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    💙 Clinical
                  </button>
                )}
                {theme !== 'soft-medical-blush' && (
                  <button
                    onClick={() => { setTheme('soft-medical-blush'); setIsThemeDropdownOpen(false); }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      color: 'var(--color-accent)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'var(--transition-smooth)',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    🌸 Blush
                  </button>
                )}
              </div>
            )}
          </div>

          <button 
            className="btn btn-consultation"
            onClick={() => handleNavClick('booking')}
          >
            E-CONSULTATION
          </button>
        </div>

        {/* Mobile Navigation Drawer Side Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-navbar-drawer animate-fade-in">
            <button 
              className={`mobile-nav-link ${currentTab === 'home' ? 'active' : ''}`}
              onClick={() => { handleNavClick('home'); setIsMobileMenuOpen(false); }}
            >
              HOME
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'about' ? 'active' : ''}`}
              onClick={() => { handleNavClick('about'); setIsMobileMenuOpen(false); }}
            >
              ABOUT US
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'blog' ? 'active' : ''}`}
              onClick={() => { handleNavClick('blog'); setIsMobileMenuOpen(false); }}
            >
              BLOG
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'doctors' ? 'active' : ''}`}
              onClick={() => { handleNavClick('doctors'); setIsMobileMenuOpen(false); }}
            >
              OUR DOCTORS
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'admin' ? 'active' : ''}`}
              onClick={() => { handleNavClick('admin'); setIsMobileMenuOpen(false); }}
            >
              ADMIN
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'booking' ? 'active' : ''}`}
              onClick={() => { handleNavClick('booking'); setIsMobileMenuOpen(false); }}
            >
              E-CONSULTATION
            </button>

            {/* Mobile Theme Switches */}
            <div className="mobile-theme-switches">
              <span className="mobile-theme-label">Switch Theme</span>
              <div className="mobile-theme-buttons-row">
                <button onClick={() => { setTheme('neem'); setIsMobileMenuOpen(false); }} className={`mtheme-btn ${theme === 'neem' ? 'active' : ''}`}>🌿 Neem</button>
                <button onClick={() => { setTheme('clinical-blue'); setIsMobileMenuOpen(false); }} className={`mtheme-btn ${theme === 'clinical-blue' ? 'active' : ''}`}>💙 Clinical</button>
                <button onClick={() => { setTheme('soft-medical-blush'); setIsMobileMenuOpen(false); }} className={`mtheme-btn ${theme === 'soft-medical-blush' ? 'active' : ''}`}>🌸 Blush</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
