import React from 'react';

export default function Logo({ size = 48, showText = true, textColor = 'var(--color-accent)' }) {
  // Each leaf is a small SVG ellipse rotated at an angle to look like a real leaf
  const leaves = [
    // Left Lobe / Crown top left
    { cx: 32, cy: 15, r: 2.5, rotate: -30 }, { cx: 28, cy: 18, r: 3, rotate: -45 }, { cx: 24, cy: 22, r: 2.5, rotate: -60 },
    { cx: 22, cy: 27, r: 3, rotate: -70 }, { cx: 20, cy: 33, r: 2.5, rotate: -75 }, { cx: 22, cy: 39, r: 3, rotate: -60 },
    { cx: 25, cy: 44, r: 2.5, rotate: -45 }, { cx: 29, cy: 48, r: 3, rotate: -30 },
    
    // Right Lobe / Crown top right
    { cx: 68, cy: 15, r: 2.5, rotate: 30 }, { cx: 72, cy: 18, r: 3, rotate: 45 }, { cx: 76, cy: 22, r: 2.5, rotate: 60 },
    { cx: 78, cy: 27, r: 3, rotate: 70 }, { cx: 80, cy: 33, r: 2.5, rotate: 75 }, { cx: 78, cy: 39, r: 3, rotate: 60 },
    { cx: 75, cy: 44, r: 2.5, rotate: 45 }, { cx: 71, cy: 48, r: 3, rotate: 30 },

    // Valley / Dip at the top
    { cx: 50, cy: 25, r: 2.5, rotate: 0 }, { cx: 45, cy: 22, r: 3, rotate: -15 }, { cx: 55, cy: 22, r: 3, rotate: 15 },
    { cx: 40, cy: 18, r: 2.5, rotate: -20 }, { cx: 60, cy: 18, r: 2.5, rotate: 20 },
    
    // Left side curve / roots area
    { cx: 33, cy: 53, r: 2.5, rotate: -30 }, { cx: 36, cy: 58, r: 3, rotate: -20 }, { cx: 38, cy: 63, r: 2.5, rotate: -10 },
    { cx: 40, cy: 68, r: 3, rotate: -5 }, { cx: 42, cy: 72, r: 2, rotate: 5 },
    
    // Right side curve / roots area
    { cx: 67, cy: 53, r: 2.5, rotate: 30 }, { cx: 64, cy: 58, r: 3, rotate: 20 }, { cx: 62, cy: 63, r: 2.5, rotate: 10 },
    { cx: 60, cy: 68, r: 3, rotate: 5 }, { cx: 58, cy: 72, r: 2, rotate: -5 },

    // Inner foliage / body of the tooth - left
    { cx: 30, cy: 28, r: 2, rotate: -50 }, { cx: 35, cy: 25, r: 3, rotate: -25 }, { cx: 40, cy: 28, r: 2.5, rotate: -10 },
    { cx: 34, cy: 34, r: 3, rotate: -40 }, { cx: 38, cy: 38, r: 2.5, rotate: -20 }, { cx: 33, cy: 42, r: 3, rotate: -50 },
    { cx: 42, cy: 44, r: 2, rotate: -15 }, { cx: 37, cy: 48, r: 2.5, rotate: -35 }, { cx: 41, cy: 52, r: 3, rotate: -20 },
    
    // Inner foliage / body of the tooth - right
    { cx: 70, cy: 28, r: 2, rotate: 50 }, { cx: 65, cy: 25, r: 3, rotate: 25 }, { cx: 60, cy: 28, r: 2.5, rotate: 10 },
    { cx: 66, cy: 34, r: 3, rotate: 40 }, { cx: 62, cy: 38, r: 2.5, rotate: 20 }, { cx: 67, cy: 42, r: 3, rotate: 50 },
    { cx: 58, cy: 44, r: 2, rotate: 15 }, { cx: 63, cy: 48, r: 2.5, rotate: 35 }, { cx: 59, cy: 52, r: 3, rotate: 20 },

    // Upper center foliage
    { cx: 46, cy: 30, r: 2, rotate: -10 }, { cx: 54, cy: 30, r: 2, rotate: 10 }, { cx: 50, cy: 33, r: 3, rotate: 0 },
    { cx: 45, cy: 36, r: 2.5, rotate: -15 }, { cx: 55, cy: 36, r: 2.5, rotate: 15 }, { cx: 49, cy: 40, r: 3, rotate: -5 },
    { cx: 46, cy: 45, r: 2, rotate: -10 }, { cx: 54, cy: 45, r: 2, rotate: 10 }, { cx: 50, cy: 48, r: 3, rotate: 0 }
  ];

  return (
    <div className="logo-container-neemz" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* SVG Logo Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Red Clinical Cross at Top Left */}
        <path 
          d="M 6,26 H 14 V 18 H 19 V 26 H 27 V 31 H 19 V 39 H 14 V 31 H 6 Z" 
          fill="#e53935" 
          style={{ transformOrigin: '16px 28px' }}
        />

        {/* Tree Trunk & Branches (Brown) */}
        <path 
          d="M 48,75 C 49,70 49,62 48,54 C 44,46 39,41 36,38 C 39,41 42,47 48,50 C 49,42 47,35 41,31 C 46,35 49,41 50,47 C 51,41 54,35 59,31 C 53,35 51,42 52,50 C 58,47 61,41 64,38 C 61,41 56,46 52,54 C 51,62 51,70 52,75 Z" 
          fill="#795548" 
        />

        {/* Roots at the Bottom (Brown) */}
        <path 
          d="M 48,75 C 44,77 40,79 36,81 C 40,79 44,77 47,76 C 45,77 42,79 40,82 C 43,80 46,78 48,77 C 47,79 46,81 45,84 C 48,81 49,79 50,77 C 51,79 52,81 55,84 C 54,81 53,79 52,77 C 54,78 57,80 60,82 C 58,79 55,77 53,76 C 56,77 60,79 64,81 C 60,79 56,77 52,75 Z" 
          fill="#795548" 
        />

        {/* Leaf Cluster forming the Tooth — using ellipses rotated to look like real leaves */}
        {leaves.map((leaf, index) => (
          <ellipse
            key={index}
            cx={leaf.cx}
            cy={leaf.cy}
            rx={leaf.r * 1.6}   // wider horizontally
            ry={leaf.r}          // normal height
            fill={index % 4 === 0 ? 'var(--color-logo-leaf-1)' : 'var(--color-logo-leaf-2)'}
            transform={`rotate(${leaf.rotate}, ${leaf.cx}, ${leaf.cy})`}
          />
        ))}
      </svg>

      {/* Typography Side */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
            <span style={{ 
              fontWeight: '900', 
              fontSize: size > 48 ? '1.45rem' : '1.2rem', 
              letterSpacing: '0.8px', 
              color: 'var(--color-secondary)' 
            }}>
              DR. MARCUS
            </span>
            <span style={{ 
              fontWeight: '800', 
              fontSize: size > 48 ? '1.1rem' : '0.9rem', 
              letterSpacing: '0.8px', 
              color: textColor 
            }}>
              DENTISTRY
            </span>
          </div>
          <span style={{ 
            fontSize: '0.62rem', 
            fontWeight: '600', 
            letterSpacing: '0.5px', 
            color: 'var(--color-accent-medium)',
            marginTop: '2px'
          }}>
            Smile Confident with Neem
          </span>
        </div>
      )}
    </div>
  );
}
