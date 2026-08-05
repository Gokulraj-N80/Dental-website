import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BrandRevealLoader({ onComplete }) {
  const containerRef = useRef(null);
  const logoSvgRef = useRef(null);
  const textRef = useRef(null);

  // SVG Paths of Dr. Neemz logo
  const crossPathRef = useRef(null);
  const trunkPathRef = useRef(null);
  const rootsPathRef = useRef(null);
  const leafRefs = useRef([]);

  // Leaf coordinates
  const leaves = [
    { cx: 32, cy: 15, r: 2.5 }, { cx: 28, cy: 18, r: 3 }, { cx: 24, cy: 22, r: 2.5 },
    { cx: 22, cy: 27, r: 3 }, { cx: 20, cy: 33, r: 2.5 }, { cx: 22, cy: 39, r: 3 },
    { cx: 25, cy: 44, r: 2.5 }, { cx: 29, cy: 48, r: 3 },
    { cx: 68, cy: 15, r: 2.5 }, { cx: 72, cy: 18, r: 3 }, { cx: 76, cy: 22, r: 2.5 },
    { cx: 78, cy: 27, r: 3 }, { cx: 80, cy: 33, r: 2.5 }, { cx: 78, cy: 39, r: 3 },
    { cx: 75, cy: 44, r: 2.5 }, { cx: 71, cy: 48, r: 3 },
    { cx: 50, cy: 25, r: 2.5 }, { cx: 45, cy: 22, r: 3 }, { cx: 55, cy: 22, r: 3 },
    { cx: 40, cy: 18, r: 2.5 }, { cx: 60, cy: 18, r: 2.5 },
    { cx: 33, cy: 53, r: 2.5 }, { cx: 36, cy: 58, r: 3 }, { cx: 38, cy: 63, r: 2.5 },
    { cx: 40, cy: 68, r: 3 }, { cx: 42, cy: 72, r: 2 },
    { cx: 67, cy: 53, r: 2.5 }, { cx: 64, cy: 58, r: 3 }, { cx: 62, cy: 63, r: 2.5 },
    { cx: 60, cy: 68, r: 3 }, { cx: 58, cy: 72, r: 2 },
    { cx: 30, cy: 28, r: 2 }, { cx: 35, cy: 25, r: 3 }, { cx: 40, cy: 28, r: 2.5 },
    { cx: 34, cy: 34, r: 3 }, { cx: 38, cy: 38, r: 2.5 }, { cx: 33, cy: 42, r: 3 },
    { cx: 42, cy: 44, r: 2 }, { cx: 37, cy: 48, r: 2.5 }, { cx: 41, cy: 52, r: 3 },
    { cx: 70, cy: 28, r: 2 }, { cx: 65, cy: 25, r: 3 }, { cx: 60, cy: 28, r: 2.5 },
    { cx: 66, cy: 34, r: 3 }, { cx: 62, cy: 38, r: 2.5 }, { cx: 67, cy: 42, r: 3 },
    { cx: 58, cy: 44, r: 2 }, { cx: 63, cy: 48, r: 2.5 }, { cx: 59, cy: 52, r: 3 },
    { cx: 46, cy: 30, r: 2 }, { cx: 54, cy: 30, r: 2 }, { cx: 50, cy: 33, r: 3 },
    { cx: 45, cy: 36, r: 2.5 }, { cx: 55, cy: 36, r: 2.5 }, { cx: 49, cy: 40, r: 3 },
    { cx: 46, cy: 45, r: 2 }, { cx: 54, cy: 45, r: 2 }, { cx: 50, cy: 48, r: 3 }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete(logoSvgRef.current, textRef.current, containerRef.current);
        }
      });
      tl.to(containerRef.current, { opacity: 1, duration: 1.0 });
      return () => tl.kill();
    }

    // Set initial states
    gsap.set(logoSvgRef.current, { scale: 0.85, opacity: 0 });
    gsap.set(textRef.current, { opacity: 0, x: -15 });

    // Initialize SVG dash lengths
    const paths = [crossPathRef.current, trunkPathRef.current, rootsPathRef.current];
    paths.forEach(path => {
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fillOpacity: 0,
          stroke: 'var(--color-secondary)'
        });
      }
    });

    gsap.set(leafRefs.current, { scale: 0, opacity: 0, transformOrigin: '50% 50%' });

    // Master Timeline
    const master = gsap.timeline({
      onComplete: () => {
        onComplete(logoSvgRef.current, textRef.current, containerRef.current);
      }
    });

    master
      // Stage 1: Initial Silence (50ms)
      .to({}, { duration: 0.05 })

      // Stage 2: Logo SVG container fades & scales in (0.3s)
      .to(logoSvgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power3.out'
      })

      // Stage 3: Deliberate and natural SVG Outline drawing (Fast outlines)
      .to(crossPathRef.current, {
        strokeDashoffset: 0,
        duration: 0.3,
        ease: 'sine.inOut'
      })
      .to(trunkPathRef.current, {
        strokeDashoffset: 0,
        duration: 0.45,
        ease: 'sine.inOut'
      }, '-=0.18')
      .to(rootsPathRef.current, {
        strokeDashoffset: 0,
        duration: 0.3,
        ease: 'sine.inOut'
      }, '-=0.18')

      // Stage 4: Fill Paths and Leaf Cluster Fade-In (0.2s)
      .to([crossPathRef.current, trunkPathRef.current, rootsPathRef.current], {
        fillOpacity: 1,
        strokeWidth: 0,
        duration: 0.2,
        ease: 'power2.out'
      }, '-=0.1')
      .to(leafRefs.current, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        stagger: {
          each: 0.004,
          from: 'center'
        },
        ease: 'back.out(1.2)'
      }, '-=0.12')

      // Stage 5: Typography Reveal & Ambient Glow
      .to(textRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.2,
        ease: 'power3.out'
      }, '-=0.1')
      .to(logoSvgRef.current, {
        filter: 'drop-shadow(0 0 8px rgba(61, 107, 83, 0.2))',
        duration: 0.2
      }, '-=0.2')

      // Breathe Animation stage (Subtle looping scale while waiting briefly)
      .to(logoSvgRef.current, {
        scale: 1.01,
        duration: 0.15,
        repeat: 0,
        yoyo: true,
        ease: 'sine.inOut'
      })
      .to({}, { duration: 0.05 });

    return () => {
      master.kill();
    };
  }, [onComplete]);

  return (
    <div className="brand-reveal-loader-container" ref={containerRef}>
      <div className="loader-stage">
        {/* Shared Logo Reveal Core */}
        <div className="loader-logo-wrapper">
          <div className="loader-logo-flex">
            {/* SVG Logo Container */}
            <svg 
              className="loader-logo-svg"
              ref={logoSvgRef} 
              width="90" 
              height="90" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Clinical Red Cross Outline */}
              <path 
                ref={crossPathRef}
                d="M 6,26 H 14 V 18 H 19 V 26 H 27 V 31 H 19 V 39 H 14 V 31 H 6 Z" 
                fill="#e53935"
                strokeWidth="1.5"
              />

              {/* Tree Trunk & Branches */}
              <path 
                ref={trunkPathRef}
                d="M 48,75 C 49,70 49,62 48,54 C 44,46 39,41 36,38 C 39,41 42,47 48,50 C 49,42 47,35 41,31 C 46,35 49,41 50,47 C 51,41 54,35 59,31 C 53,35 51,42 52,50 C 58,47 61,41 64,38 C 61,41 56,46 52,54 C 51,62 51,70 52,75 Z" 
                fill="#795548"
                strokeWidth="1.5"
              />

              {/* Roots */}
              <path 
                ref={rootsPathRef}
                d="M 48,75 C 44,77 40,79 36,81 C 40,79 44,77 47,76 C 45,77 42,79 40,82 C 43,80 46,78 48,77 C 47,79 46,81 45,84 C 48,81 49,79 50,77 C 51,79 52,81 55,84 C 54,81 53,79 52,77 C 54,78 57,80 60,82 C 58,79 55,77 53,76 C 56,77 60,79 64,81 C 60,79 56,77 52,75 Z" 
                fill="#795548"
                strokeWidth="1.5"
              />

              {/* Leaf Cluster Circles */}
              {leaves.map((leaf, index) => (
                <circle 
                  key={index} 
                  ref={el => leafRefs.current[index] = el}
                  cx={leaf.cx} 
                  cy={leaf.cy} 
                  r={leaf.r} 
                  fill={index % 4 === 0 ? 'var(--color-logo-leaf-1)' : 'var(--color-logo-leaf-2)'} 
                />
              ))}
            </svg>

            {/* Typography Side */}
            <div className="loader-logo-text" ref={textRef}>
              <div className="loader-text-row">
                <span className="ltext-bold">DR. NEEMZ</span>
                <span className="ltext-light">DENTISTRY</span>
              </div>
              <span className="ltext-tagline">Smile Confident with Neem</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
