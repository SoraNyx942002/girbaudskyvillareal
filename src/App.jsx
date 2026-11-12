/* -------------------------------------------------------------------------- */
/*  INTERLOCKED ALL-CAPS "GSV" VECTOR MONOGRAM & EDITORIAL WORDMARK LOGO      */
/* -------------------------------------------------------------------------- */
function GsvBrandLogo({ isDark, isScrolled, textMain, textSoft }) {
  const emblemBg = isDark ? '#161513' : '#1C1917';
  const emblemInk = isDark ? '#F5F3EF' : '#FAF8F5';
  const accentGold = isDark ? '#D6CFC2' : '#E7E0D3';

  return (
    <a
      href="#about"
      className="flex items-center gap-2.5 sm:gap-3 group shrink-0 focus:outline-none"
      aria-label="Girbaud Sky Villareal — Back to top"
    >
      {/* Bespoke Interlocked All-Caps GSV Monogram Crest */}
      <div
        className={`relative flex items-center justify-center rounded-2xl border transition-all duration-500 ease-out group-hover:scale-105 ${
          isScrolled ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-11 sm:h-11'
        } ${
          isDark
            ? 'bg-gradient-to-br from-[#23211E] via-[#161513] to-[#0E0D0C] border-[#3F3B36] shadow-lg shadow-black/50'
            : 'bg-gradient-to-br from-[#262320] via-[#1C1917] to-[#110F0E] border-[#1C1917] shadow-md'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Architectural Octagon / Crest Bezel */}
          <polygon
            points="30,7 70,7 93,30 93,70 70,93 30,93 7,70 7,30"
            stroke={accentGold}
            strokeWidth="2.2"
            strokeOpacity="0.32"
          />
          <circle
            cx="50"
            cy="50"
            r="41"
            stroke={emblemInk}
            strokeWidth="1.2"
            strokeOpacity="0.16"
            strokeDasharray="4 3"
          />

          {/* LAYER 1: CAPITAL "G" (Left-Center Interlocked Anchor) */}
          <text
            x="33"
            y="67"
            textAnchor="middle"
            fill={emblemInk}
            stroke={emblemBg}
            strokeWidth="5"
            style={{
              paintOrder: 'stroke fill',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '48px',
              letterSpacing: '-0.05em',
            }}
          >
            G
          </text>

          {/* LAYER 2: CAPITAL "V" (Right-Center Interlocked Wing) */}
          <text
            x="67"
            y="67"
            textAnchor="middle"
            fill={accentGold}
            stroke={emblemBg}
            strokeWidth="5"
            style={{
              paintOrder: 'stroke fill',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '48px',
              letterSpacing: '-0.05em',
            }}
          >
            V
          </text>

          {/* SHARED LIGATURE BAR (Physically welds G, S, and V together) */}
          <rect
            x="28"
            y="48.5"
            width="44"
            height="4.2"
            rx="2.1"
            fill={emblemInk}
            stroke={emblemBg}
            strokeWidth="2.2"
          />

          {/* LAYER 3: CAPITAL "S" (Elevated Center Spine Weaving Over G & V) */}
          <text
            x="50"
            y="71"
            textAnchor="middle"
            fill={emblemInk}
            stroke={emblemBg}
            strokeWidth="5.5"
            style={{
              paintOrder: 'stroke fill',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 700,
              fontSize: '62px',
            }}
          >
            S
          </text>

          {/* Top & Bottom Monogram Crown Diamond Accents */}
          <polygon points="50,10 53,14 50,18 47,14" fill="#10B981" />
          <polygon points="50,82 52.5,85.5 50,89 47.5,85.5" fill={accentGold} fillOpacity="0.6" />
        </svg>

        {/* Live Emerald Availability Dot */}
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 ${
            isDark ? 'border-[#1A1917]' : 'border-white'
          }`}
        />
      </div>

      {/* Responsive Editorial Name Lockup */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-baseline gap-1.5 truncate">
          <span
            className={`font-display font-bold tracking-tight transition-all duration-500 ${
              isScrolled ? 'text-xs sm:text-sm' : 'text-xs sm:text-[15px]'
            } ${textMain}`}
          >
            Girbaud Sky
          </span>
          <span
            className={`font-serif-editorial italic font-normal transition-all duration-500 ${
              isScrolled
                ? 'text-sm sm:text-base hidden xl:inline'
                : 'text-sm sm:text-[17px]'
            } ${textMain}`}
          >
            Villareal
          </span>
        </div>

        {/* Subtitle smoothly collapses when navbar shrinks on scroll */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-4 opacity-100 mt-0.5'
          }`}
        >
          <span
            className={`text-[9px] uppercase tracking-[0.18em] font-semibold block truncate ${textSoft}`}
          >
            GSV • UI/UX & Front-End
          </span>
        </div>
      </div>
    </a>
  );
}