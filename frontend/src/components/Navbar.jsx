import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';

const DENTAL_TREATMENTS = [
  'ROUTINE CHECK UP', 'DENTAL FILLINGS', 'ROOT CANAL TREATMENT', 'WISDOM TOOTH REMOVAL',
  'DENTAL BRIDGES', 'DENTAL DENTURE', 'DENTAL IMPLANTS', 'CLEAR ALIGNERS', 'DENTAL BRACES',
  'SMILE MAKEOVERS', 'PEDIATRIC DENTISTRY', 'GUM TREATMENT', 'DENTAL CROWN', 'LASER-DENTISTRY'
];

export default function Navbar({ currentTab, setCurrentTab, onSelectTreatment, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'treatments' | null
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

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
    <nav className={`fixed top-0 left-0 right-0 h-[76px] z-[1000] border-b border-[var(--color-accent-light)] transition-all duration-300 flex items-center justify-between px-[40px] ${scrolled ? 'bg-white/80 dark:bg-[var(--color-primary)]/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <div className="cursor-pointer flex items-center shrink-0" onClick={() => handleNavClick('home')}>
          <Logo size={42} showText={true} />
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-[32px] h-[32px] bg-transparent border-none cursor-pointer"
          onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="w-[20px] h-[2px] bg-[var(--color-accent)] transition-all duration-300" />
          <span className="w-[20px] h-[2px] bg-[var(--color-accent)] transition-all duration-300" />
          <span className="w-[20px] h-[2px] bg-[var(--color-accent)] transition-all duration-300" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-[24px]">
          <button 
            className={`font-sans text-[0.82rem] font-extrabold tracking-[1px] uppercase border-none bg-transparent cursor-pointer py-[8px] transition-all duration-300 ${currentTab === 'home' ? 'text-[var(--color-secondary)] border-b-[2px] border-[var(--color-secondary)]' : 'text-[var(--color-accent-medium)] hover:text-[var(--color-accent)]'}`}
            onClick={() => handleNavClick('home')}
          >
            HOME
          </button>

          <button 
            className={`font-sans text-[0.82rem] font-extrabold tracking-[1px] uppercase border-none bg-transparent cursor-pointer py-[8px] transition-all duration-300 ${currentTab === 'about' ? 'text-[var(--color-secondary)] border-b-[2px] border-[var(--color-secondary)]' : 'text-[var(--color-accent-medium)] hover:text-[var(--color-accent)]'}`}
            onClick={() => handleNavClick('about')}
          >
            ABOUT US
          </button>
          
          {/* Dental Treatments Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('treatments')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className={`font-sans text-[0.82rem] font-extrabold tracking-[1px] uppercase border-none bg-transparent cursor-pointer py-[8px] transition-all duration-300 flex items-center gap-[4px] ${activeDropdown === 'treatments' ? 'text-[var(--color-secondary)]' : 'text-[var(--color-accent-medium)]'}`}
              onClick={() => toggleDropdown('treatments')}
            >
              <span>DENTAL TREATMENTS</span>
              <ChevronDown size={14} />
            </button>
            {activeDropdown === 'treatments' && (
              <div className="absolute top-[100%] left-0 w-[240px] bg-[var(--color-primary)] border border-[var(--color-accent-light)] rounded-md shadow-md p-[10px] flex flex-col gap-[6px] z-[1000] animate-[fadeInUp_0.3s_ease-out]">
                {DENTAL_TREATMENTS.map((item) => (
                  <button 
                    key={item} 
                    className="w-full text-left bg-transparent border-none py-[8px] px-[12px] rounded-sm text-[var(--color-accent-medium)] hover:text-[var(--color-secondary)] hover:bg-[var(--color-surface)] text-[0.8rem] font-bold cursor-pointer transition-all duration-200"
                    onClick={() => handleTreatmentClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className={`font-sans text-[0.82rem] font-extrabold tracking-[1px] uppercase border-none bg-transparent cursor-pointer py-[8px] transition-all duration-300 ${currentTab === 'blog' ? 'text-[var(--color-secondary)] border-b-[2px] border-[var(--color-secondary)]' : 'text-[var(--color-accent-medium)] hover:text-[var(--color-accent)]'}`}
            onClick={() => handleNavClick('blog')}
          >
            BLOG
          </button>
          
          <button 
            className={`font-sans text-[0.82rem] font-extrabold tracking-[1px] uppercase border-none bg-transparent cursor-pointer py-[8px] transition-all duration-300 ${currentTab === 'doctors' ? 'text-[var(--color-secondary)] border-b-[2px] border-[var(--color-secondary)]' : 'text-[var(--color-accent-medium)] hover:text-[var(--color-accent)]'}`}
            onClick={() => handleNavClick('doctors')}
          >
            OUR DOCTORS
          </button>
          
          <button 
            className={`font-sans text-[0.82rem] font-extrabold tracking-[1px] uppercase border-none bg-transparent cursor-pointer py-[8px] transition-all duration-300 ${currentTab === 'admin' ? 'text-[var(--color-secondary)] border-b-[2px] border-[var(--color-secondary)]' : 'text-[var(--color-accent-medium)] hover:text-[var(--color-accent)]'}`}
            onClick={() => handleNavClick('admin')}
          >
            ADMIN
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="bg-transparent border border-[var(--color-accent-light)] rounded-full p-[6px_12px] text-[0.78rem] font-extrabold text-[var(--color-accent)] cursor-pointer inline-flex items-center gap-[6px] transition-all duration-300 hover:bg-[var(--color-surface)]"
            >
              {theme === 'neem' ? '🌿 Neem' : theme === 'clinical-blue' ? '💙 Clinical' : '🌸 Blush'}
              <ChevronDown size={11} />
            </button>
            
            {isThemeDropdownOpen && (
              <div className="absolute top-[calc(100%+8px)] right-0 bg-[var(--color-primary)] border border-[var(--color-accent-light)] rounded-md shadow-md p-[6px] flex flex-col gap-[4px] z-[1000] min-width-[120px]">
                {theme !== 'neem' && (
                  <button
                    onClick={() => { setTheme('neem'); setIsThemeDropdownOpen(false); }}
                    className="bg-transparent border-none rounded-sm p-[8px_12px] text-[0.78rem] font-semibold text-[var(--color-accent)] text-left cursor-pointer flex items-center gap-[6px] hover:bg-[var(--color-surface)] transition-all duration-300 w-full"
                  >
                    🌿 Neem
                  </button>
                )}
                {theme !== 'clinical-blue' && (
                  <button
                    onClick={() => { setTheme('clinical-blue'); setIsThemeDropdownOpen(false); }}
                    className="bg-transparent border-none rounded-sm p-[8px_12px] text-[0.78rem] font-semibold text-[var(--color-accent)] text-left cursor-pointer flex items-center gap-[6px] hover:bg-[var(--color-surface)] transition-all duration-300 w-full"
                  >
                    💙 Clinical
                  </button>
                )}
                {theme !== 'soft-medical-blush' && (
                  <button
                    onClick={() => { setTheme('soft-medical-blush'); setIsThemeDropdownOpen(false); }}
                    className="bg-transparent border-none rounded-sm p-[8px_12px] text-[0.78rem] font-semibold text-[var(--color-accent)] text-left cursor-pointer flex items-center gap-[6px] hover:bg-[var(--color-surface)] transition-all duration-300 w-full"
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
        {isThemeDropdownOpen && (
          <div className="mobile-navbar-drawer animate-fade-in">
            <button 
              className={`mobile-nav-link ${currentTab === 'home' ? 'active' : ''}`}
              onClick={() => { handleNavClick('home'); setIsThemeDropdownOpen(false); }}
            >
              HOME
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'about' ? 'active' : ''}`}
              onClick={() => { handleNavClick('about'); setIsThemeDropdownOpen(false); }}
            >
              ABOUT US
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'blog' ? 'active' : ''}`}
              onClick={() => { handleNavClick('blog'); setIsThemeDropdownOpen(false); }}
            >
              BLOG
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'doctors' ? 'active' : ''}`}
              onClick={() => { handleNavClick('doctors'); setIsThemeDropdownOpen(false); }}
            >
              OUR DOCTORS
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'admin' ? 'active' : ''}`}
              onClick={() => { handleNavClick('admin'); setIsThemeDropdownOpen(false); }}
            >
              ADMIN
            </button>
            <button 
              className={`mobile-nav-link ${currentTab === 'booking' ? 'active' : ''}`}
              onClick={() => { handleNavClick('booking'); setIsThemeDropdownOpen(false); }}
            >
              E-CONSULTATION
            </button>

            {/* Mobile Theme Switches */}
            <div className="mobile-theme-switches">
              <span className="mobile-theme-label">Switch Theme</span>
              <div className="mobile-theme-buttons-row">
                <button onClick={() => { setTheme('neem'); setIsThemeDropdownOpen(false); }} className={`mtheme-btn ${theme === 'neem' ? 'active' : ''}`}>🌿 Neem</button>
                <button onClick={() => { setTheme('clinical-blue'); setIsThemeDropdownOpen(false); }} className={`mtheme-btn ${theme === 'clinical-blue' ? 'active' : ''}`}>💙 Clinical</button>
                <button onClick={() => { setTheme('soft-medical-blush'); setIsThemeDropdownOpen(false); }} className={`mtheme-btn ${theme === 'soft-medical-blush' ? 'active' : ''}`}>🌸 Blush</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
