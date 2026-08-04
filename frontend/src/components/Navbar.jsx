import React, { useState, useEffect } from 'react';
import { ChevronDown, X, Menu } from 'lucide-react';
import Logo from './Logo';

const DENTAL_TREATMENTS = [
  'ROUTINE CHECK UP', 'DENTAL FILLINGS', 'ROOT CANAL TREATMENT', 'WISDOM TOOTH REMOVAL',
  'DENTAL BRIDGES', 'DENTAL DENTURE', 'DENTAL IMPLANTS', 'CLEAR ALIGNERS', 'DENTAL BRACES',
  'SMILE MAKEOVERS', 'PEDIATRIC DENTISTRY', 'GUM TREATMENT', 'DENTAL CROWN', 'LASER-DENTISTRY',
];

const NAV_LINKS = [
  { label: 'HOME',        tab: 'home'    },
  { label: 'ABOUT US',   tab: 'about'   },
  { label: 'BLOG',       tab: 'blog'    },
  { label: 'OUR DOCTORS',tab: 'doctors' },
  { label: 'ADMIN',      tab: 'admin'   },
];

const THEMES = [
  { key: 'neem',              label: '🌿 Neem'     },
  { key: 'clinical-blue',     label: '💙 Clinical' },
  { key: 'soft-medical-blush',label: '🌸 Blush'    },
];

export default function Navbar({ currentTab, setCurrentTab, onSelectTreatment, theme, setTheme }) {
  const [scrolled,             setScrolled]             = useState(false);
  const [activeDropdown,       setActiveDropdown]       = useState(null);
  const [isThemeDropdownOpen,  setIsThemeDropdownOpen]  = useState(false);
  const [isMobileDrawerOpen,   setIsMobileDrawerOpen]   = useState(false);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveDropdown(null);
  };

  const handleTreatmentClick = (item) => {
    onSelectTreatment(item);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // shared link class helper
  const linkCls = (tab) =>
    `text-[0.82rem] font-extrabold tracking-[1px] uppercase border-none bg-transparent cursor-pointer py-2 transition-all duration-200 ${
      currentTab === tab
        ? 'text-[var(--color-secondary)]'
        : 'text-[var(--color-accent-medium)] hover:text-[var(--color-accent)]'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[76px] z-[1000] flex items-center px-8 md:px-10 transition-all duration-300 border-b border-[var(--color-accent-light)] ${
        scrolled
          ? 'shadow-md'
          : ''
      }`}
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between h-full">

        {/* Logo */}
        <div className="cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
          <Logo size={42} showText={true} />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--color-accent-light)] transition-colors"
          style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent)' }}
          onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          aria-label="Toggle menu"
        >
          {isMobileDrawerOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">

          {NAV_LINKS.map(({ label, tab }) => (
            <button key={tab} className={linkCls(tab)} onClick={() => handleNavClick(tab)}>
              {label}
            </button>
          ))}

          {/* Treatments dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('treatments')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`${linkCls('treatments')} inline-flex items-center gap-1`}
              onClick={() => setActiveDropdown(activeDropdown === 'treatments' ? null : 'treatments')}
            >
              DENTAL TREATMENTS
              <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'treatments' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'treatments' && (
              <div
                className="absolute top-[calc(100%+4px)] left-0 w-[240px] rounded-2xl border p-2.5 flex flex-col gap-1 z-[1000] animate-[fadeInDown_0.2s_ease-out] shadow-xl"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderColor: 'var(--color-accent-light)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {DENTAL_TREATMENTS.map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-3 py-2 rounded-lg text-[0.78rem] font-semibold transition-all duration-150 hover:opacity-100"
                    style={{ color: 'var(--color-accent-medium)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-secondary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-accent-medium)'; }}
                    onClick={() => handleTreatmentClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme switcher */}
          <div className="relative">
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.78rem] font-bold border transition-all duration-200"
              style={{
                borderColor: 'var(--color-accent-light)',
                color: 'var(--color-accent)',
                backgroundColor: 'transparent',
              }}
            >
              {THEMES.find((t) => t.key === theme)?.label ?? '🌿 Neem'}
              <ChevronDown size={11} />
            </button>

            {isThemeDropdownOpen && (
              <div
                className="absolute top-[calc(100%+6px)] right-0 rounded-xl border p-1.5 flex flex-col gap-0.5 z-[1000] min-w-[120px] shadow-lg"
                style={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-accent-light)', boxShadow: 'var(--shadow-md)' }}
              >
                {THEMES.filter((t) => t.key !== theme).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => { setTheme(key); setIsThemeDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-[0.78rem] font-semibold transition-all duration-150"
                    style={{ color: 'var(--color-accent)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA button */}
          <button
            onClick={() => handleNavClick('booking')}
            className="btn-ripple px-5 py-2.5 rounded-full text-[0.82rem] font-extrabold uppercase tracking-wider text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            E-CONSULTATION
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMobileDrawerOpen && (
          <div
            className="md:hidden absolute top-[76px] left-0 right-0 flex flex-col gap-1 p-5 border-b z-[999] animate-[fadeInDown_0.25s_ease-out]"
            style={{
              backgroundColor: 'var(--color-primary)',
              borderColor: 'var(--color-accent-light)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {NAV_LINKS.map(({ label, tab }) => (
              <button
                key={tab}
                onClick={() => { handleNavClick(tab); setIsMobileDrawerOpen(false); }}
                className="text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
                style={{
                  color: currentTab === tab ? 'var(--color-secondary)' : 'var(--color-accent-medium)',
                  backgroundColor: currentTab === tab ? 'var(--color-secondary-soft)' : 'transparent',
                }}
              >
                {label}
              </button>
            ))}

            {/* Mobile theme row */}
            <div
              className="mt-3 pt-3 border-t flex flex-col gap-2"
              style={{ borderColor: 'var(--color-accent-light)' }}
            >
              <span className="text-xs font-bold uppercase tracking-widest px-4" style={{ color: 'var(--color-accent-medium)' }}>
                Switch Theme
              </span>
              <div className="flex gap-2 px-4">
                {THEMES.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => { setTheme(key); setIsMobileDrawerOpen(false); }}
                    className="flex-1 text-xs font-bold py-2 rounded-lg border transition-all"
                    style={{
                      borderColor: theme === key ? 'var(--color-secondary)' : 'var(--color-accent-light)',
                      color: theme === key ? 'var(--color-secondary)' : 'var(--color-accent-medium)',
                      backgroundColor: theme === key ? 'var(--color-secondary-soft)' : 'transparent',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { handleNavClick('booking'); setIsMobileDrawerOpen(false); }}
              className="mt-2 mx-4 py-3 rounded-full text-sm font-bold text-white text-center transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              E-CONSULTATION
            </button>
          </div>
        )}

      </div>
    </nav>
  );
}
