import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor on desktop / non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Set initial properties
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });

    // Create high-performance quickTo setters
    const xToCursor = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3.out' });
    const yToCursor = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3.out' });
    
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });

    let isVisible = false;

    const handleMouseMove = (e) => {
      if (!isVisible) {
        gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, dot], { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Expand / hover states
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.classList.contains('interactive-card') ||
        target.closest('.interactive-card') ||
        target.hasAttribute('data-hover-expand');

      if (isInteractive) {
        gsap.to(cursor, {
          scale: 2,
          backgroundColor: 'rgba(var(--shadow-color-rgb), 0.1)',
          borderColor: 'var(--color-secondary)',
          borderWidth: '1px',
          duration: 0.3
        });
        gsap.to(dot, {
          scale: 0.5,
          backgroundColor: 'var(--color-secondary)',
          duration: 0.3
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'var(--color-accent-medium)',
          borderWidth: '1.5px',
          duration: 0.3
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: 'var(--color-secondary)',
          duration: 0.3
        });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor-ring" ref={cursorRef} style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: 9999 }} />
      <div className="custom-cursor-dot" ref={dotRef} style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: 9999 }} />
    </>
  );
}
