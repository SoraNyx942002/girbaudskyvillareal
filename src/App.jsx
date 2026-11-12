import { useState, useEffect, useRef } from 'react';
import phasedImage from './assets/phased.png';

/* Automatically discover any images placed inside src/ or src/assets/ */
const BUNDLED_ASSETS = import.meta.glob(
  './**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' }
);

function findBundledImage(keyword) {
  const lowerKey = keyword.toLowerCase();
  for (const [path, url] of Object.entries(BUNDLED_ASSETS)) {
    const fileName = path.split('/').pop()?.toLowerCase() || '';
    if (fileName.startsWith(lowerKey) || fileName.includes(lowerKey)) {
      return url;
    }
  }
  return null;
}

function buildImageCandidates(baseUrl, exactBaseName, searchKeyword, preferJpg = false) {
  const bundled = findBundledImage(searchKeyword || exactBaseName);
  const lower = exactBaseName.toLowerCase();
  const upper = exactBaseName.toUpperCase();

  const pngFirst = [
    bundled,
    `${baseUrl}${exactBaseName}.png`,
    `${baseUrl}${exactBaseName}.jpg`,
    `${baseUrl}${exactBaseName}.jpeg`,
    `${baseUrl}${lower}.png`,
    `${baseUrl}${lower}.jpg`,
    `${baseUrl}${upper}.PNG`,
    `${baseUrl}${upper}.JPG`,
    `${baseUrl}assets/${exactBaseName}.png`,
    `${baseUrl}assets/${exactBaseName}.jpg`,
  ];

  const jpgFirst = [
    bundled,
    `${baseUrl}${exactBaseName}.jpg`,
    `${baseUrl}${exactBaseName}.png`,
    `${baseUrl}${exactBaseName}.jpeg`,
    `${baseUrl}${lower}.jpg`,
    `${baseUrl}${lower}.png`,
    `${baseUrl}${upper}.JPG`,
    `${baseUrl}${upper}.PNG`,
    `${baseUrl}assets/${exactBaseName}.jpg`,
    `${baseUrl}assets/${exactBaseName}.png`,
  ];

  return (preferJpg ? jpgFirst : pngFirst).filter(Boolean);
}

const NOSTALGIC_STARS = [
  { top: '8%', left: '18%', size: 3, delay: '0s', duration: '5.5s', sparkle: false },
  { top: '14%', left: '48%', size: 2, delay: '1.2s', duration: '7s', sparkle: false },
  { top: '11%', left: '78%', size: 4, delay: '2.5s', duration: '6.2s', sparkle: true },
  { top: '24%', left: '88%', size: 2, delay: '0.8s', duration: '8s', sparkle: false },
  { top: '29%', left: '8%', size: 3, delay: '3.1s', duration: '6.5s', sparkle: false },
  { top: '36%', left: '64%', size: 2, delay: '1.9s', duration: '7.4s', sparkle: false },
  { top: '44%', left: '28%', size: 4, delay: '4.0s', duration: '5.8s', sparkle: true },
  { top: '52%', left: '92%', size: 3, delay: '2.2s', duration: '6.9s', sparkle: false },
  { top: '59%', left: '14%', size: 2, delay: '0.4s', duration: '7.8s', sparkle: false },
  { top: '67%', left: '54%', size: 3, delay: '3.6s', duration: '6.1s', sparkle: false },
  { top: '74%', left: '82%', size: 4, delay: '1.5s', duration: '5.9s', sparkle: true },
  { top: '81%', left: '22%', size: 2, delay: '2.8s', duration: '7.2s', sparkle: false },
  { top: '88%', left: '68%', size: 3, delay: '0.9s', duration: '6.6s', sparkle: false },
  { top: '93%', left: '38%', size: 2, delay: '3.9s', duration: '8.2s', sparkle: false },
];

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

/* -------------------------------------------------------------------------- */
/*  SOFT AESTHETIC SURFACE CARD                                               */
/* -------------------------------------------------------------------------- */
function AestheticCard({ children, className = '', isDark = false }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl transition-all duration-500 h-full ${
        isDark
          ? 'bg-[#1A1917]/85 border border-[#2E2C29] hover:border-[#44403C] shadow-2xl shadow-black/35'
          : 'bg-white/85 border border-[#E7E5E0] hover:border-[#D6D3CD] shadow-[0_10px_35px_-15px_rgba(28,25,23,0.06)] hover:shadow-[0_18px_45px_-15px_rgba(28,25,23,0.1)]'
      } backdrop-blur-xl ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-700 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isDark
            ? `radial-gradient(520px circle at ${coords.x}px ${coords.y}px, rgba(214, 211, 205, 0.05), transparent 45%)`
            : `radial-gradient(520px circle at ${coords.x}px ${coords.y}px, rgba(168, 162, 158, 0.08), transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  UNIVERSAL SMART IMAGE LOADER                                              */
/* -------------------------------------------------------------------------- */
function SmartImage({ candidates = [], alt, className = '', fallbackText }) {
  const valid = candidates.filter(Boolean);
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(valid.length === 0);

  useEffect(() => {
    setIdx(0);
    setFailed(valid.length === 0);
  }, [valid.length]);

  if (failed || valid.length === 0) {
    return (
      <div className="w-full h-full min-h-[220px] p-6 flex flex-col items-center justify-center text-center border border-dashed border-stone-500/30 rounded-2xl">
        <div className="font-display font-bold text-sm">{alt}</div>
        {fallbackText && (
          <div className="text-xs opacity-70 mt-1 max-w-xs">{fallbackText}</div>
        )}
      </div>
    );
  }

  return (
    <img
      src={valid[idx]}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (idx + 1 < valid.length) {
          setIdx(idx + 1);
        } else {
          setFailed(true);
        }
      }}
      className={className}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  INTERACTIVE SCROLLABLE WEBSITE VIEWPORT FOR AIRBNB.PNG                    */
/* -------------------------------------------------------------------------- */
function AirbnbScrollableWebsitePreview({
  airbnbRoomUrl,
  airbnbShortUrl,
  airbnbCandidates = [],
  isDark,
  borderLine,
  pillBg,
  onOpenZoomModal,
}) {
  const scrollRef = useRef(null);
  const valid = airbnbCandidates.filter(Boolean);
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(valid.length === 0);
  const [scrollPct, setScrollPct] = useState(0);
  const [magnifyOn, setMagnifyOn] = useState(false);
  const [lens, setLens] = useState({ visible: false, x: 0, y: 0, bgX: 0, bgY: 0 });

  useEffect(() => {
    setIdx(0);
    setFailed(valid.length === 0);
  }, [valid.length]);

  const activeImg = !failed ? valid[idx] : null;

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setScrollPct(max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0);
  };

  const scrollStep = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      top: dir === 'down' ? 380 : -380,
      behavior: 'smooth',
    });
  };

  const handleMouseMove = (e) => {
    if (!magnifyOn || !activeImg) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({
      visible: true,
      x,
      y,
      bgX: (x / rect.width) * 100,
      bgY: (y / rect.height) * 100,
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`px-4 sm:px-6 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs ${borderLine} ${
          isDark ? 'bg-[#141311]' : 'bg-[#F5F3EE]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/85 shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/85 shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/85 shrink-0" />
          <a
            href={airbnbRoomUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-1.5 text-[11px] font-medium truncate opacity-80 hover:opacity-100 hover:underline"
          >
            https://www.{airbnbShortUrl} — Scroll inside viewport to tour full listing
          </a>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMagnifyOn((prev) => !prev)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all flex items-center gap-1 ${
              magnifyOn
                ? 'bg-[#FF385C] text-white border-[#FF385C] shadow-sm'
                : pillBg
            }`}
          >
            <span>🔍</span>
            <span>{magnifyOn ? 'Magnifier ON' : 'Magnify'}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollStep('up')}
            className={`w-7 h-7 rounded-full border text-xs flex items-center justify-center transition-transform hover:scale-105 ${pillBg}`}
            title="Scroll Up"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => scrollStep('down')}
            className={`w-7 h-7 rounded-full border text-xs flex items-center justify-center transition-transform hover:scale-105 ${pillBg}`}
            title="Scroll Down"
          >
            ↓
          </button>

          <button
            type="button"
            onClick={onOpenZoomModal}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${pillBg}`}
          >
            ⤢ Fullscreen Zoom
          </button>
        </div>
      </div>

      <div className={`h-[3px] w-full ${isDark ? 'bg-[#242220]' : 'bg-[#E5E2DC]'}`}>
        <div
          className="h-full bg-[#FF385C] transition-all duration-150"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] overflow-y-auto overflow-x-hidden bg-white scroll-smooth"
      >
        {activeImg ? (
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setLens((prev) => ({ ...prev, visible: false }))}
            onClick={() => {
              if (!magnifyOn) window.open(airbnbRoomUrl, '_blank', 'noopener,noreferrer');
            }}
            className={`relative w-full ${
              magnifyOn ? 'cursor-crosshair' : 'cursor-pointer'
            }`}
          >
            <img
              src={activeImg}
              alt="Cozy Studio in ARCA South — Full Airbnb Listing Page"
              onError={() => {
                if (idx + 1 < valid.length) {
                  setIdx(idx + 1);
                } else {
                  setFailed(true);
                }
              }}
              className="w-full h-auto block select-none"
            />

            {magnifyOn && lens.visible && (
              <div
                className="pointer-events-none absolute w-48 h-48 rounded-full border-2 border-[#FF385C] shadow-[0_15px_40px_rgba(0,0,0,0.65)] z-30"
                style={{
                  left: `${lens.x - 96}px`,
                  top: `${lens.y - 96}px`,
                  backgroundImage: `url(${activeImg})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '235%',
                  backgroundPosition: `${lens.bgX}% ${lens.bgY}%`,
                }}
              />
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-zinc-700 space-y-2">
            <div className="font-display font-bold text-base">
              AIRBNB.png Preview Ready
            </div>
            <p className="text-xs max-w-md opacity-75">
              Make sure <strong>AIRBNB.png</strong> is saved inside your <code>public/</code> folder so the full scrollable Airbnb listing renders here.
            </p>
          </div>
        )}

        <div className="sticky bottom-3 left-0 right-0 px-4 flex items-center justify-between pointer-events-none z-20">
          <span className="px-3.5 py-1.5 rounded-full backdrop-blur-md bg-black/70 text-white text-[11px] font-medium shadow-lg">
            ↕ Scroll to explore full Airbnb page {scrollPct > 0 ? `(${scrollPct}%)` : ''}
          </span>

          <a
            href={airbnbRoomUrl}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto px-4 py-1.5 rounded-full bg-[#FF385C] hover:bg-[#E00B41] text-white text-[11px] font-display font-bold shadow-lg flex items-center gap-1.5 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Open Live Listing on Airbnb ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  2-COLUMN FACEBOOK SHOWCASE (AVIDA.PNG ON LEFT + DETAILS ON RIGHT)         */
/* -------------------------------------------------------------------------- */
function FacebookSplitShowcase({
  facebookPageUrl,
  airbnbRoomUrl,
  avidaPosterCandidates = [],
  isDark,
  textMain,
  textSub,
  textSoft,
  pillBg,
  onCopyNumber,
  onOpenPosterLightbox,
}) {
  const valid = avidaPosterCandidates.filter(Boolean);
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(valid.length === 0);

  return (
    <div className={isDark ? 'bg-[#151412]' : 'bg-[#F7F5F0]'}>
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-7">
          {!failed && valid.length > 0 ? (
            <div
              onClick={() => onOpenPosterLightbox(valid[idx])}
              className="relative group cursor-zoom-in rounded-2xl overflow-hidden border border-stone-300/70 dark:border-stone-700/70 shadow-xl bg-black/5"
            >
              <img
                src={valid[idx]}
                alt="Avida Towers Vireo Tower 1 — For Lease ₱19,000/Month"
                onError={() => {
                  if (idx + 1 < valid.length) {
                    setIdx(idx + 1);
                  } else {
                    setFailed(true);
                  }
                }}
                className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              />
              <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Click to Magnify Poster ⤢
              </div>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-stone-300 dark:border-stone-700 shadow-xl bg-gradient-to-br from-[#2B6CB0] via-[#4299E1] to-[#1A365D] p-6 text-white space-y-4">
              <div className="font-display font-extrabold text-xl sm:text-2xl tracking-wide">
                AVIDA TOWERS VIREO <span className="text-sm font-bold">TOWER 1</span>
              </div>
              <div className="bg-[#FAF8F5] text-zinc-900 rounded-2xl p-5 space-y-2 shadow-md">
                <div className="font-display font-bold text-lg text-zinc-900">
                  FOR LEASE: ₱19,000 / Month
                </div>
                <p className="text-xs text-zinc-700">
                  Place <strong>AVIDA.png</strong> inside your <code>public/</code> folder to display the full poster image here.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1877F2]/15 text-[#1877F2] border border-[#1877F2]/30">
              Official Facebook Leasing Page
            </span>
            <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight pt-1 ${textMain}`}>
              Cozy Studio at Avida Towers Vireo
            </h3>
            <p className={`text-xs ${textSoft}`}>
              Avida Vireo Tower 1, South Union Drive, ARCA South, Taguig City
            </p>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${textSub}`}>
            Looking for a stylish and hassle-free home in Taguig? Our modern{' '}
            <strong>23 sqm fully furnished studio in Tower 1</strong> is ready for long-term occupancy at{' '}
            <strong>₱19,000 / month</strong> (inclusive of Association Dues), right next to Ayala Malls Arca South & Landers Superstore.
          </p>

          <div
            className={`p-4 rounded-2xl border space-y-2 text-xs ${
              isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0] shadow-sm'
            }`}
          >
            <div className={`font-display font-bold ${textMain}`}>
              UNIT HIGHLIGHTS & TERMS:
            </div>
            <ul className={`space-y-1.5 ${textSub}`}>
              <li>• Fully Furnished Studio with Smart & Cozy Partitioned Layout</li>
              <li>• Queen bed, wardrobe, loveseat, dining/workspace bar & pendant lights</li>
              <li>• Samsung fridge, microwave, induction cooker, kettle & rice cooker</li>
              <li>• 24/7 Security, Swimming Pool & Indoor Gym (subject to PMO guidelines)</li>
              <li>• Max 2 Occupants • 1 mo advance + 2 mos deposit (PDCs) • Strictly NO PETS</li>
            </ul>
          </div>

          <div className="space-y-1.5">
            <div className={`text-[10px] uppercase tracking-wider font-semibold ${textSoft}`}>
              Direct Inquiries (Click to Copy Viber / WhatsApp):
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onCopyNumber('09206290342', 'Viber / WhatsApp (09206290342)')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${pillBg}`}
              >
                📋 09206290342
              </button>
              <button
                type="button"
                onClick={() => onCopyNumber('09282898594', 'Viber / Call (09282898594)')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${pillBg}`}
              >
                📋 09282898594
              </button>
              <button
                type="button"
                onClick={() => onCopyNumber('09936460660', 'WhatsApp (09936460660)')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${pillBg}`}
              >
                📋 09936460660
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white font-display font-bold text-xs text-center shadow-md transition-colors"
            >
              Visit Facebook Page ↗
            </a>
            <a
              href={airbnbRoomUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 rounded-xl bg-[#FF385C] hover:bg-[#E00B41] text-white font-display font-semibold text-xs text-center shadow-sm transition-colors"
            >
              Airbnb Link ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SCROLLABLE & MAGNIFIABLE UI VIEWPORT FOR WEB & MOBILE DESIGNS             */
/* -------------------------------------------------------------------------- */
function ScrollableUiViewport({ project, isDark, onOpenInspector }) {
  const scrollContainerRef = useRef(null);
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const [magnifyEnabled, setMagnifyEnabled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [lensState, setLensState] = useState({
    visible: false,
    x: 0,
    y: 0,
    bgX: 0,
    bgY: 0,
  });

  const screens = project.screens || [
    { label: 'Full Scrollable View', candidates: project.candidates },
  ];
  const currentScreen = screens[activeScreenIdx] || screens[0];
  const validCandidates = (currentScreen?.candidates || []).filter(Boolean);

  const [candidateIdx, setCandidateIdx] = useState(0);
  const [imgFailed, setImgFailed] = useState(validCandidates.length === 0);

  useEffect(() => {
    setCandidateIdx(0);
    setImgFailed(validCandidates.length === 0);
    setScrollPercent(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeScreenIdx, project.id, validCandidates.length]);

  const activeImgUrl = !imgFailed ? validCandidates[candidateIdx] : null;

  const handleViewportScroll = (e) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    setScrollPercent(
      maxScroll > 0 ? Math.min(100, Math.round((el.scrollTop / maxScroll) * 100)) : 0
    );
  };

  const handleImageMouseMove = (e) => {
    if (!magnifyEnabled || !activeImgUrl) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensState({
      visible: true,
      x,
      y,
      bgX: (x / rect.width) * 100,
      bgY: (y / rect.height) * 100,
    });
  };

  const handleQuickScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      top: direction === 'down' ? 280 : -280,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className={`px-3.5 py-2.5 rounded-t-2xl border border-b-0 flex items-center justify-between gap-2 ${
          isDark ? 'bg-[#141311] border-[#2E2C29]' : 'bg-[#F3F1EC] border-[#E5E2DC]'
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0" />
          <span className="ml-1.5 text-[11px] font-medium truncate opacity-75">
            {project.viewportLabel}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {project.id !== 'caiantrix-ui' && (
            <button
              type="button"
              onClick={() => setMagnifyEnabled((prev) => !prev)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all flex items-center gap-1 whitespace-nowrap ${
                magnifyEnabled
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : isDark
                  ? 'bg-[#242220] text-[#E7E5E0] border-[#35322F] hover:bg-[#2E2C29]'
                  : 'bg-white text-[#44403C] border-[#E5E2DC] hover:bg-stone-100'
              }`}
            >
              <span>🔍</span>
              <span>{magnifyEnabled ? 'Lens ON' : 'Magnify'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => handleQuickScroll('up')}
            className={`w-6 h-6 rounded-full border text-[10px] flex items-center justify-center ${
              isDark ? 'bg-[#242220] border-[#35322F]' : 'bg-white border-[#E5E2DC]'
            }`}
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => handleQuickScroll('down')}
            className={`w-6 h-6 rounded-full border text-[10px] flex items-center justify-center ${
              isDark ? 'bg-[#242220] border-[#35322F]' : 'bg-white border-[#E5E2DC]'
            }`}
          >
            ↓
          </button>
        </div>
      </div>

      {project.isTallWeb && (
        <div className={`h-[2px] w-full ${isDark ? 'bg-[#242220]' : 'bg-[#E5E2DC]'}`}>
          <div
            className="h-full bg-emerald-500 transition-all duration-150"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      )}

      {screens.length > 1 && (
        <div
          className={`px-3 py-2 border-x flex items-center gap-1.5 overflow-x-auto no-scrollbar ${
            isDark ? 'bg-[#181715] border-[#2E2C29]' : 'bg-[#FAF8F5] border-[#E5E2DC]'
          }`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-60 mr-1 shrink-0">
            Screens:
          </span>
          {screens.map((scr, idx) => (
            <button
              key={scr.label}
              type="button"
              onClick={() => setActiveScreenIdx(idx)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap shrink-0 ${
                activeScreenIdx === idx
                  ? isDark
                    ? 'bg-[#F5F3EF] text-[#121110] font-semibold shadow-sm'
                    : 'bg-[#1C1917] text-[#FAF8F5] font-semibold shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {scr.label}
            </button>
          ))}
        </div>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={handleViewportScroll}
        className={`relative w-full h-[360px] sm:h-[420px] overflow-y-auto overflow-x-hidden rounded-b-2xl border transition-all ${
          isDark ? 'bg-[#0F0E0D] border-[#2E2C29]' : 'bg-[#F5F2EC] border-[#E5E2DC]'
        }`}
      >
        {project.id === 'caiantrix-ui' ? (
          <div className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-500/20 pb-3">
              <div>
                <div className="text-xs font-display font-bold">
                  CAIANTRIX GROCERY POS & INVENTORY v2.4
                </div>
                <div className="text-[10px] opacity-65">
                  Daily Store Operations & Real-Time SKU Tracking
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                ● Live Terminal
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { k: 'Active SKUs', v: '2,840', s: '100% Indexed' },
                { k: 'Checkout Speed', v: '-35% Time', s: 'Low-Friction UI' },
                { k: 'Stock Accuracy', v: '99.4%', s: 'Auto-Audit' },
              ].map((m) => (
                <div
                  key={m.k}
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'
                  }`}
                >
                  <div className="text-[10px] opacity-60">{m.k}</div>
                  <div className="font-display font-bold text-base mt-0.5">{m.v}</div>
                  <div className="text-[10px] text-emerald-500 mt-0.5">{m.s}</div>
                </div>
              ))}
            </div>

            <div
              className={`p-3.5 rounded-xl border space-y-2 ${
                isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'
              }`}
            >
              <div className="text-xs font-semibold">Quick Barcode & Category Filter</div>
              {[
                { item: 'Fresh Farm Milk 1L', code: 'SKU-1042', stock: '48 in stock', price: '₱115.00' },
                { item: 'Whole Wheat Loaf', code: 'SKU-2089', stock: '22 in stock', price: '₱78.00' },
                { item: 'Organic Brown Rice 5kg', code: 'SKU-3190', stock: '16 in stock', price: '₱340.00' },
              ].map((row) => (
                <div
                  key={row.code}
                  className={`flex items-center justify-between p-2 rounded-lg border text-[11px] ${
                    isDark ? 'bg-[#121110] border-[#2E2C29]' : 'bg-[#FAF8F5] border-[#E7E5E0]'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{row.item}</div>
                    <div className="text-[10px] opacity-60">
                      {row.code} • {row.stock}
                    </div>
                  </div>
                  <span className="font-display font-bold">{row.price}</span>
                </div>
              ))}
            </div>
          </div>
        ) : activeImgUrl ? (
          <div
            onMouseMove={handleImageMouseMove}
            onMouseLeave={() => setLensState((prev) => ({ ...prev, visible: false }))}
            onClick={() => onOpenInspector(project, activeScreenIdx)}
            className={`relative w-full mx-auto ${
              project.isMobile ? 'max-w-[260px] py-4' : 'w-full'
            } ${magnifyEnabled ? 'cursor-crosshair' : 'cursor-zoom-in'}`}
          >
            <img
              src={activeImgUrl}
              alt={`${project.title} - ${currentScreen.label}`}
              onError={() => {
                if (candidateIdx + 1 < validCandidates.length) {
                  setCandidateIdx(candidateIdx + 1);
                } else {
                  setImgFailed(true);
                }
              }}
              className={`w-full h-auto block select-none ${
                project.isMobile ? 'rounded-2xl shadow-xl mx-auto' : ''
              }`}
            />

            {magnifyEnabled && lensState.visible && (
              <div
                className="pointer-events-none absolute w-40 h-40 rounded-full border-2 border-white shadow-2xl z-30"
                style={{
                  left: `${lensState.x - 80}px`,
                  top: `${lensState.y - 80}px`,
                  backgroundImage: `url(${activeImgUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '240%',
                  backgroundPosition: `${lensState.bgX}% ${lensState.bgY}%`,
                }}
              />
            )}
          </div>
        ) : (
          <div className="p-6 text-center h-full flex flex-col items-center justify-center space-y-2">
            <div className="font-display font-bold text-sm">{project.title}</div>
            <p className="text-xs opacity-75 max-w-xs">
              Place <strong>{project.fileHint}</strong> inside <code>public/</code> to enable scrolling & magnification.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MAIN PORTFOLIO APPLICATION                                                */
/* -------------------------------------------------------------------------- */
export default function App() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('gsv-aesthetic-theme');
      return saved ? saved === 'dark' : false;
    } catch {
      return false;
    }
  });

  const baseUrl = import.meta.env.BASE_URL;
  const portraitCandidates = buildImageCandidates(baseUrl, 'profile', 'profile', true);
  const [portraitIdx, setPortraitIdx] = useState(0);
  const [photoError, setPhotoError] = useState(false);
  const resumePdfUrl = `${baseUrl}resume.pdf`;

  const rotatingTitles = [
    "I'm Girbaud Sky",
    "I'm a Front-End Developer",
    "I'm a UI/UX Designer",
    "I'm a Property Host & Tech Exec",
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTitleFading, setIsTitleFading] = useState(false);

  const [timeString, setTimeString] = useState('');
  const [activeNav, setActiveNav] = useState('about');
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [openProcessIdx, setOpenProcessIdx] = useState(0);
  const [openExpIds, setOpenExpIds] = useState(['villman', 'arca-host', 'undecide']);
  const [phasedView, setPhasedView] = useState('live');
  const [arcaView, setArcaView] = useState('airbnb');

  const [uiCategoryFilter, setUiCategoryFilter] = useState('all');
  const [activeUiSlide, setActiveUiSlide] = useState(0);
  const uiCarouselRef = useRef(null);

  const [inspectorModal, setInspectorModal] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lightboxData, setLightboxData] = useState(null);

  const [cvFilter, setCvFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const airbnbRoomUrl =
    'https://www.airbnb.com/rooms/1790979755480894562?guests=1&adults=1&s=67&unique_share_id=12659c23-ca20-49e5-8666-7e455be2320d&source_impression_id=p3_1793973358_P3XeULVGRC-tQlS8';
  const airbnbShortUrl = 'airbnb.com/h/cozystudioarcasouth';
  const facebookPageUrl =
    'https://www.facebook.com/people/Cozy-Studio-at-Avida-Towers-Vireo/61594962617625/';
  const airbnbScreenshotCandidates = buildImageCandidates(baseUrl, 'AIRBNB', 'airbnb');
  const avidaPosterCandidates = buildImageCandidates(baseUrl, 'AVIDA', 'avida');

  const uiDesignWorks = [
    {
      id: 'casa-amelinda',
      number: '01',
      title: 'Casa Amelinda Resort',
      subtitle: 'Hospitality & Resort Booking Web UI',
      category: 'web',
      badge: 'Full-Page Web UI',
      fileHint: 'CAR.png',
      viewportLabel: 'casa-amelinda-resort.ui • Scrollable Web Page',
      isTallWeb: true,
      isMobile: false,
      candidates: buildImageCandidates(baseUrl, 'CAR', 'car'),
      description:
        'Designed a vibrant, welcoming full-page resort interface ("Be Our Guest, Feel Your Best") for Casa Amelinda Resort in Dingalan, Aurora. Features categorized event packages, a 6-card Popular Rooms gallery, and guest reviews.',
      highlights: [
        'Structured vertical hierarchy guiding guests from hero discovery to instant room booking.',
        'High-contrast gold action buttons paired with coastal azure surfaces.',
      ],
      tags: ['Figma Web UI', 'Hospitality UX', 'Booking Flow', 'Responsive Layout'],
    },
    {
      id: 'heartful-haven-orphanage',
      number: '02',
      title: 'Heartful Haven — Orphanage UI',
      subtitle: 'Non-Profit & Community Sanctuary Web UI',
      category: 'web',
      badge: 'Long-Scroll Web UI',
      fileHint: 'ORPHANAGE.png',
      viewportLabel: 'heartful-haven-orphanage.org • Scrollable Web Page',
      isTallWeb: true,
      isMobile: false,
      candidates: buildImageCandidates(baseUrl, 'ORPHANAGE', 'orphanage'),
      description:
        'Crafted an empathetic, story-driven web platform ("Where Every Child Belongs, and Every Heart is Home") for Heartful Haven Orphanage to inspire community volunteering and donor trust.',
      highlights: [
        'Dedicated split-grid sections for Mission & Vision paired with authentic photography.',
        'Interactive family testimony carousel and video-backed volunteer onboarding cards.',
      ],
      tags: ['Non-Profit Web UI', 'Visual Storytelling', 'Volunteer UX', 'Figma Prototype'],
    },
    {
      id: 'golden-sunset-resort',
      number: '03',
      title: 'Golden Sunset — Resort Landing Page',
      subtitle: 'Editorial Coastal Travel & Events Landing Page UI',
      category: 'web',
      badge: 'Web Landing Page',
      fileHint: 'webuibrown.png',
      viewportLabel: 'golden-sunset-resort.ph • Scrollable Web Page',
      isTallWeb: true,
      isMobile: false,
      candidates: buildImageCandidates(baseUrl, 'webuibrown', 'webuibrown'),
      description:
        'Designed an earth-toned resort landing page ("Sunsets: nature’s daily masterpiece.") for Golden Sunset Beach Resorts in Cabangan, Zambales.',
      highlights: [
        'Icon-driven Events bar (Wedding, Birthday, Reunion, Team Building, Seminar).',
        'Curated "Popular Scenery" rating cards leading into the booking callout.',
      ],
      tags: ['Landing Page UI', 'Editorial Layout', 'Color Architecture', 'Travel & Resort'],
    },
    {
      id: 'zenara-mobile-ui',
      number: '04',
      title: 'Zenara — Social & Gamified Messaging UI',
      subtitle: '3-Screen Mobile App Suite ("Connect with your happiness.")',
      category: 'mobile',
      badge: '3-Screen Mobile UI',
      fileHint: 'ZENARA1.png, ZENARA2.png, ZENARA3.png',
      viewportLabel: 'Zenara Mobile App • Switch & Scroll Screens',
      isTallWeb: false,
      isMobile: true,
      screens: [
        { label: '01 / Login UI', candidates: buildImageCandidates(baseUrl, 'ZENARA1', 'zenara1') },
        { label: '02 / Social Feed', candidates: buildImageCandidates(baseUrl, 'ZENARA2', 'zenara2') },
        { label: '03 / Messages & QuizQuest', candidates: buildImageCandidates(baseUrl, 'ZENARA3', 'zenara3') },
      ],
      description:
        'Designed a 3-screen mobile social networking and messaging application featuring a lotus brand identity, glassmorphic login cards, creator stories, and a gamified inbox.',
      highlights: [
        'Screen 1: Frosted-glass login interface over fluid magenta-violet shapes.',
        'Screen 2 & 3: Creator feed, active status bubbles, and an integrated QuizQuest gaming bar (Lvl. 128).',
      ],
      tags: ['Mobile App UI', 'Glassmorphism', 'Social & Messaging UX', 'Gamification'],
    },
    {
      id: 'caiantrix-ui',
      number: '05',
      title: 'Caiantrix Grocery System',
      subtitle: 'Retail Point-of-Sale & Inventory Management UI',
      category: 'system',
      badge: 'System & POS UI',
      fileHint: 'Interactive System Preview',
      viewportLabel: 'caiantrix-pos-system.local • Interactive Preview',
      isTallWeb: false,
      isMobile: false,
      candidates: [],
      description:
        'Redesigned the operational user interface for a retail grocery management system to streamline daily cashier checkout workflows and real-time SKU inventory tracking.',
      highlights: [
        'High-contrast dashboard metrics for active SKUs and rapid category filtering.',
        'Structured for fast keyboard and touch interaction during peak hours.',
      ],
      tags: ['System UI', 'Operations UX', 'POS Interface', 'Inventory Dashboard'],
    },
  ];

  const filteredUiWorks =
    uiCategoryFilter === 'all'
      ? uiDesignWorks
      : uiDesignWorks.filter((w) => w.category === uiCategoryFilter);

  const scrollToUiSlide = (index) => {
    if (!uiCarouselRef.current || filteredUiWorks.length === 0) return;
    const bounded = Math.max(0, Math.min(index, filteredUiWorks.length - 1));
    const cards = uiCarouselRef.current.querySelectorAll('[data-ui-card]');
    if (cards[bounded]) {
      cards[bounded].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setActiveUiSlide(bounded);
    }
  };

  const handleUiCarouselScroll = () => {
    if (!uiCarouselRef.current) return;
    const container = uiCarouselRef.current;
    const cards = container.querySelectorAll('[data-ui-card]');
    let closestIdx = 0;
    let minDistance = Infinity;
    const containerLeft = container.getBoundingClientRect().left;
    cards.forEach((card, idx) => {
      const dist = Math.abs(card.getBoundingClientRect().left - containerLeft);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });
    setActiveUiSlide(closestIdx);
  };

  useEffect(() => {
    setActiveUiSlide(0);
    if (uiCarouselRef.current) {
      uiCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [uiCategoryFilter]);

  const certifications = [
    {
      id: 'tesda-ncii',
      title: 'National Certificate II in Computer Systems Servicing',
      issuer: 'Technical Education and Skills Development Authority (TESDA)',
      date: 'Issued Oct 22, 2026 • Valid until Oct 21, 2031',
      credentialId: 'Cert No. 26131402035012',
      badge: 'National Certificate II',
      candidates: buildImageCandidates(baseUrl, 'TESDANCII', 'tesda'),
      description:
        'Certified in installing and configuring computer systems, setting up computer networks and servers, and maintaining enterprise computer systems and networks.',
      tags: ['Computer Systems', 'Computer Networks', 'Server Setup', 'System Maintenance'],
    },
    {
      id: 'cisco-data-science',
      title: 'Introduction to Data Science',
      issuer: 'Cisco Networking Academy • DICT-ITU DTC Initiative',
      date: 'Completed Jan 31, 2026',
      credentialId: 'Instructor: John Philip Tan',
      badge: 'Cisco Verified',
      candidates: buildImageCandidates(baseUrl, 'CISCOCERT', 'cisco', true),
      description:
        'Successfully completed training in data science principles, analytics workflows, and modern data-driven decision systems.',
      tags: ['Data Science', 'Analytics', 'Cisco NetAcad', 'DICT-ITU'],
    },
    {
      id: 'ncba-ai-education',
      title: 'Artificial Intelligence in Education: How Student Can Use AI Responsibly',
      issuer: 'NCBA Fairview Campus • ISSOC',
      date: 'Given Feb 5, 2026',
      credentialId: 'ISSOC Webinar Series',
      badge: 'AI Literacy',
      candidates: buildImageCandidates(baseUrl, 'NCBA', 'ncba', true),
      description:
        'Recognized for active participation in essential AI literacy skills, ethical usage, and responsible exploration of AI in education and digital innovation.',
      tags: ['AI Literacy', 'Responsible AI', 'Digital Innovation'],
    },
  ];

  const defaultReviews = [
    {
      id: 'ralph-verified',
      name: 'Ralph',
      role: 'Client / Peer Reviewer',
      rating: 5,
      comment: 'He exhibits good communication skills and is very responsive. Thank you sir.',
      date: '2026',
    },
    {
      id: 'collaborator-verified',
      name: 'Project Collaborator',
      role: 'Undecide Dev Team',
      rating: 5,
      comment:
        'Exceptional UI/UX eye and front-end execution. Translated complex AI security workflows into a clean, intuitive interface right on schedule.',
      date: '2026',
    },
    {
      id: 'enterprise-verified',
      name: 'Enterprise Client',
      role: 'Hardware & Systems Consultation',
      rating: 5,
      comment:
        'Very patient, knowledgeable, and clear communicator. Made choosing the right technical setup effortless and accurate.',
      date: '2026',
    },
  ];

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('gsv-performance-reviews-v3');
      return saved ? JSON.parse(saved) : defaultReviews;
    } catch {
      return defaultReviews;
    }
  });

  const [ratingInput, setRatingInput] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRole, setReviewerRole] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const suggestedPhrases = [
    'Exceptional UI/UX eye & attention to detail.',
    'Fast, clean React & front-end execution.',
    'Clear communicator & reliable technical partner.',
    'Translated our ideas into a calm, intuitive design.',
    'Highly professional and delivers quality work on time.',
  ];

  useEffect(() => {
    try {
      localStorage.setItem('gsv-aesthetic-theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
    document.documentElement.style.backgroundColor = isDark ? '#121110' : '#FAF8F5';
  }, [isDark]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTitleFading(true);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
        setIsTitleFading(false);
      }, 320);
    }, 3200);
    return () => clearInterval(interval);
  }, [rotatingTitles.length]);

  useEffect(() => {
    const updateClock = () => {
      setTimeString(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Manila',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date())
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxData(null);
        setInspectorModal(null);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    setTimeout(() => {
      elements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('active');
        }
      });
    }, 80);
    return () => observer.disconnect();
  }, []);

  /* Scroll Spy + PHASED-Style Shrinking Fixed Navbar Trigger */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsNavScrolled(scrollTop > 40);

      const sections = [
        'about',
        'process',
        'work',
        'ui-works',
        'hosting',
        'experience',
        'certifications',
        'capabilities',
        'ratings',
      ];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 260) {
            setActiveNav(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpAccordion = (id) => {
    setOpenExpIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(''), 2500);
  };

  const handleOpenUiInspector = (project, initialScreenIdx = 0) => {
    setZoomLevel(1);
    setInspectorModal({ project, screenIdx: initialScreenIdx });
  };

  const handleAddSuggestedPhrase = (phrase) => {
    setReviewComment((prev) => {
      if (!prev.trim()) return phrase;
      if (prev.includes(phrase)) return prev;
      return `${prev.trim()} ${phrase}`;
    });
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    const newEntry = {
      id: Date.now(),
      name: reviewerName.trim() || 'Verified Visitor',
      role: reviewerRole.trim() || 'Client / Peer Reviewer',
      rating: ratingInput,
      comment: reviewComment.trim(),
      date: 'Just now',
    };
    const updated = [newEntry, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('gsv-performance-reviews-v3', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setReviewerName('');
    setReviewerRole('');
    setReviewComment('');
    setRatingInput(5);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3500);
  };

  const designProcess = [
    {
      step: '01',
      title: 'Empathize & Discover',
      subtitle: 'Understanding human & operational needs',
      description:
        'Every effective product starts with active listening. Drawing from my experience in client consultation, property guest relations, and technical sales, I map real user pain points, business goals, and daily workflows before sketching a single screen.',
      deliverables: ['Stakeholder Interviews', 'Workflow Auditing', 'Information Architecture'],
    },
    {
      step: '02',
      title: 'Structure & Wireframe',
      subtitle: 'Clarity over complexity',
      description:
        'I translate requirements into low-friction user flows and clean wireframes. The focus is on removing unnecessary steps so users always feel grounded and confident.',
      deliverables: ['Interactive Wireframes', 'User Journey Mapping', 'Screen Flow Logic'],
    },
    {
      step: '03',
      title: 'Visual Craft & Prototyping',
      subtitle: 'Calm, intentional interface systems',
      description:
        'Using Figma and my foundation in commercial illustration, I design cohesive component libraries with balanced typography, accessible contrast, and subtle micro-interactions.',
      deliverables: ['Figma Design Systems', 'High-Fidelity Prototypes', 'Visual Identity'],
    },
    {
      step: '04',
      title: 'Front-End Engineering',
      subtitle: 'Shipping responsive production code',
      description:
        'Because I build what I design using React, React Native, and Tailwind CSS, nothing is lost in handoff. Every responsive breakpoint and animation is engineered with care.',
      deliverables: ['React & React Native UI', 'MERN Stack Integration', 'Responsive Layouts'],
    },
  ];

  const experiences = [
    {
      id: 'villman',
      role: 'Sales & Technical Executive',
      company: 'VillMan Computer Systems Inc.',
      location: 'SM City North EDSA, Quezon City',
      period: '2023 — Present',
      active: true,
      highlights: [
        'Guide clients through complex hardware and enterprise system decisions, translating technical specifications into clear, practical solutions.',
        'Manage end-to-end quotations, promotional campaigns, daily sales auditing, and monthly tax computations with strict accuracy.',
        'Maintain comprehensive account summary reports to support smooth daily branch operations.',
      ],
      tags: ['Client Consultation', 'Technical Sales', 'Sales Accounting', 'Financial Reporting', 'Hardware Systems'],
    },
    {
      id: 'arca-host',
      role: 'Property Manager & Airbnb Host (Guest Relations)',
      company: 'Cozy Studio at Avida Towers Vireo — ARCA South',
      location: 'ARCA South, Taguig City',
      period: '2026 — Present',
      active: true,
      highlights: [
        'Client Engagement: Serve as the primary point of contact for all guest and tenant inquiries across Airbnb, Facebook Page, Viber, and WhatsApp—screening prospective long-term residents and ensuring clear, professional communication from inquiry through checkout.',
        'Issue Resolution: Act as the direct liaison with Airbnb Support and building property management (PMO) to swiftly troubleshoot and resolve platform, billing, contract, or policy issues.',
        'Digital Leasing Management: Manage the verified Airbnb listing and official Facebook real estate page for a fully furnished 23 sqm studio in Tower 1.',
      ],
      tags: ['Property Management', 'Guest Relations', 'Client Engagement', 'Issue Resolution', 'Airbnb Hosting', 'Lease Administration'],
    },
    {
      id: 'undecide',
      role: 'UI/UX Designer & Front-End Developer',
      company: 'Undecide Dev Team',
      location: 'Quezon City',
      period: '2025 — 2026',
      active: false,
      highlights: [
        'Led the user interface design and front-end engineering for PHASED, an AI-powered web and mobile security platform built with the MERN stack and React Native.',
        'Transformed complex threat-detection workflows into intuitive wireframes, Figma design systems, and responsive React components.',
      ],
      tags: ['UI/UX Design', 'Figma', 'React.js', 'React Native', 'MERN Stack', 'Tailwind CSS', 'Wireframing'],
    },
    {
      id: 'freelance',
      role: 'Freelance Graphic & UI/UX Designer',
      company: 'Independent Studio Practice',
      location: 'Metro Manila',
      period: '2025 — Present',
      active: true,
      highlights: [
        'Craft bespoke visual identities, digital branding, and responsive web interfaces tailored to diverse client goals.',
        'Guide projects from early wireframes through to polished, production-ready assets.',
      ],
      tags: ['UI/UX Design', 'Graphic Design', 'Figma', 'Adobe Photoshop', 'Canva', 'Visual Art'],
    },
    {
      id: 'cronica',
      role: 'Book Illustrator',
      company: 'Golden Cronica Publishing Incorporated',
      location: 'Philippines',
      period: '2020 — 2022',
      active: false,
      highlights: [
        'Created original, print-ready illustrations for registered educational and commercial publications under strict editorial timelines.',
      ],
      tags: ['Visual Art', 'Graphic Design', 'Adobe Photoshop'],
    },
    {
      id: 'freewill',
      role: 'Resident Tattoo Artist & Illustrator',
      company: 'Freewill Tattoo Shop',
      location: 'Quezon City',
      period: '2017 — 2024',
      active: false,
      highlights: [
        'Collaborated closely with clients to translate personal stories into custom artwork while assisting with studio operations and safety standards.',
      ],
      tags: ['Visual Art', 'Client Consultation'],
    },
  ];

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'process', label: 'Process' },
    { id: 'work', label: 'PHASED' },
    { id: 'ui-works', label: 'UI Studio' },
    { id: 'hosting', label: 'Condo' },
    { id: 'experience', label: 'Resume' },
    { id: 'certifications', label: 'Certs' },
    { id: 'ratings', label: 'Reviews' },
  ];

  const textMain = isDark ? 'text-[#F5F3EF]' : 'text-[#1C1917]';
  const textSub = isDark ? 'text-[#A8A29E]' : 'text-[#57534E]';
  const textSoft = 'text-[#78716C]';
  const borderLine = isDark ? 'border-[#2E2C29]' : 'border-[#E7E5E0]';
  const pillBg = isDark
    ? 'bg-[#242220] text-[#E7E5E0] border-[#35322F]'
    : 'bg-[#F3F1EC] text-[#44403C] border-[#E5E2DC]';
  const sageBadge = isDark
    ? 'bg-[#23312B] text-[#9CC5B0] border-[#31453C]'
    : 'bg-[#EBF2EE] text-[#355245] border-[#D5E3DC]';

  const plainCircleBorder = isDark ? 'border-white/[0.11]' : 'border-stone-900/[0.11]';
  const plainRingBorder = isDark ? 'border-white/[0.15]' : 'border-stone-900/[0.15]';

  const averageRating = (
    reviews.reduce((acc, item) => acc + item.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 relative overflow-x-hidden ${
        isDark
          ? 'bg-[#121110] text-[#F5F3EF] selection:bg-[#E7E5E0] selection:text-[#121110]'
          : 'bg-[#FAF8F5] text-[#1C1917] selection:bg-[#1C1917] selection:text-[#FAF8F5]'
      }`}
    >
      {/* BACKGROUND: LOWKEY NOSTALGIC STARS + PLAIN CIRCLES WITH 3D RING */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className={`absolute -top-24 right-[8%] w-72 sm:w-[460px] h-72 sm:h-[460px] rounded-full blur-[115px] animate-calm-orbit-1 ${
            isDark ? 'bg-[#2D3E35]/20' : 'bg-[#DCE8E1]/70'
          }`}
        />
        <div
          className={`absolute top-[40%] -left-24 w-72 sm:w-[440px] h-72 sm:h-[440px] rounded-full blur-[115px] animate-calm-orbit-2 ${
            isDark ? 'bg-[#3A2E25]/20' : 'bg-[#EFE6DC]/75'
          }`}
        />

        {NOSTALGIC_STARS.map((star, index) => (
          <div
            key={index}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
            className="absolute animate-star-twinkle select-none"
          >
            {star.sparkle ? (
              <span
                className={`text-[10px] sm:text-xs leading-none block ${
                  isDark ? 'text-stone-200/40' : 'text-stone-700/35'
                }`}
              >
                ✦
              </span>
            ) : (
              <span
                style={{ width: `${star.size}px`, height: `${star.size}px` }}
                className={`block rounded-full ${
                  isDark ? 'bg-stone-200/40' : 'bg-stone-700/35'
                }`}
              />
            )}
          </div>
        ))}

        <div
          className="absolute top-[14%] left-[4%] sm:left-[8%] w-64 h-64 sm:w-96 sm:h-96 flex items-center justify-center animate-calm-orbit-1"
          style={{ perspective: '900px' }}
        >
          <div className={`w-36 h-36 sm:w-56 sm:h-56 rounded-full border ${plainCircleBorder}`} />
          <div className={`absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border ${plainRingBorder} animate-plain-ring-1`}>
            <span className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${isDark ? 'bg-white/25' : 'bg-stone-800/25'}`} />
          </div>
        </div>

        <div
          className="absolute bottom-[10%] right-[2%] sm:right-[7%] w-72 h-72 sm:w-[430px] sm:h-[430px] flex items-center justify-center animate-calm-orbit-2"
          style={{ perspective: '900px' }}
        >
          <div className={`w-44 h-44 sm:w-64 sm:h-64 rounded-full border ${plainCircleBorder}`} />
          <div className={`absolute w-72 h-72 sm:w-[430px] sm:h-[430px] rounded-full border ${plainRingBorder} animate-plain-ring-2`}>
            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${isDark ? 'bg-white/25' : 'bg-stone-800/25'}`} />
          </div>
        </div>
      </div>

      {/* Copy Toast Notification */}
      <div
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full font-display font-semibold text-xs shadow-xl transition-all duration-500 ${
          isDark ? 'bg-[#F5F3EF] text-[#121110]' : 'bg-[#1C1917] text-[#FAF8F5]'
        } ${
          copiedLabel ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Copied {copiedLabel} to clipboard</span>
      </div>

      {/* ==================================================================== */}
      {/*  FIXED SCROLL-FOLLOWING & SHRINKING NAVIGATION BAR                   */}
      {/* ==================================================================== */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div
          className={`pointer-events-auto mx-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full border flex items-center justify-between gap-2 ${
            isNavScrolled
              ? 'max-w-4xl h-12 sm:h-13 px-3 sm:px-4 backdrop-blur-2xl shadow-2xl'
              : 'max-w-6xl h-14 sm:h-16 px-4 sm:px-6 backdrop-blur-xl shadow-lg'
          } ${
            isDark
              ? isNavScrolled
                ? 'bg-[#161513]/95 border-[#35322F] shadow-black/75'
                : 'bg-[#1A1917]/85 border-[#2E2C29] shadow-black/45'
              : isNavScrolled
              ? 'bg-white/95 border-[#D6D3CD] shadow-[0_12px_35px_rgba(28,25,23,0.12)]'
              : 'bg-white/85 border-[#E7E5E0] shadow-[0_8px_30px_rgba(28,25,23,0.05)]'
          }`}
        >
          {/* Left: Interlocked All-Caps "GSV" Monogram & Wordmark */}
          <GsvBrandLogo
            isDark={isDark}
            isScrolled={isNavScrolled}
            textMain={textMain}
            textSoft={textSoft}
          />

          {/* Center: Recessed Inner Track with Concise Single-Word Links */}
          <nav
            className={`hidden lg:flex items-center gap-0.5 p-1 rounded-full border transition-all duration-500 ${
              isDark
                ? 'bg-[#121110]/70 border-[#292724]'
                : 'bg-[#F5F3EE]/85 border-[#E7E5E0]'
            }`}
          >
            {navItems.map((item) => {
              const isActive =
                activeNav === item.id ||
                (item.id === 'certifications' && activeNav === 'capabilities');
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                    isNavScrolled
                      ? 'px-2.5 py-1 text-[11px]'
                      : 'px-3 py-1.5 text-xs'
                  } ${
                    isActive
                      ? isDark
                        ? 'bg-[#F5F3EF] text-[#121110] font-semibold shadow-sm'
                        : 'bg-[#1C1917] text-[#FAF8F5] font-semibold shadow-sm'
                      : `${textSub} hover:${textMain}`
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Clean Action Cluster (Theme Toggle + Let's Talk) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle color theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`rounded-full border flex items-center justify-center transition-all duration-300 ${
                isNavScrolled ? 'w-8 h-8 text-xs' : 'w-8 h-8 sm:w-9 sm:h-9 text-sm'
              } ${
                isDark
                  ? 'bg-[#242220] border-[#35322F] text-amber-200 hover:bg-[#2E2C29]'
                  : 'bg-[#F3F1EC] border-[#E5E2DC] text-[#44403C] hover:bg-[#E7E5E0]'
              }`}
            >
              {isDark ? '☀' : '☾'}
            </button>

            <a
              href="mailto:girbaudforwork@gmail.com"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full font-display font-semibold transition-all duration-300 whitespace-nowrap ${
                isNavScrolled
                  ? 'px-3.5 py-1.5 text-[11px]'
                  : 'px-4 py-2 text-xs'
              } ${
                isDark
                  ? 'bg-[#F5F3EF] text-[#121110] hover:bg-white'
                  : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#35312E]'
              }`}
            >
              <span>Let’s Talk</span>
              <span>↗</span>
            </a>

            {/* Mobile & Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center ${
                isDark ? 'border-[#2E2C29] text-[#F5F3EF]' : 'border-[#E7E5E0] text-[#1C1917]'
              }`}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 8h16M4 16h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer */}
        <div
          className={`pointer-events-auto lg:hidden max-w-xl mx-auto accordion-grid ${
            isMobileMenuOpen ? 'open mt-2' : ''
          }`}
        >
          <div className="accordion-inner">
            <div
              className={`p-4 rounded-3xl border backdrop-blur-2xl shadow-xl space-y-1.5 ${
                isDark ? 'bg-[#1A1917]/95 border-[#2E2C29]' : 'bg-white/95 border-[#E7E5E0]'
              }`}
            >
              <div className="grid grid-cols-2 gap-1.5">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-display font-semibold transition-colors ${
                      activeNav === item.id ? pillBg : textMain
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="pt-2 flex gap-2">
                <a
                  href={resumePdfUrl}
                  download="Girbaud_Sky_Villareal_Resume_CV.pdf"
                  className={`flex-1 text-center py-2.5 rounded-2xl text-xs font-display font-semibold border ${pillBg}`}
                >
                  Resume/CV ↓
                </a>
                <a
                  href="mailto:girbaudforwork@gmail.com"
                  className={`flex-1 text-center py-2.5 rounded-2xl text-xs font-display font-semibold ${
                    isDark ? 'bg-[#F5F3EF] text-[#121110]' : 'bg-[#1C1917] text-[#FAF8F5]'
                  }`}
                >
                  Let’s Talk ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-24 space-y-20 sm:space-y-28 relative z-10">
        
        {/* SECTION 1: HERO & COMPACT PERMANENT PORTRAIT */}
        <section id="about" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-8 space-y-6 order-2 lg:order-1">
              <div className="reveal flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border ${sageBadge}`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for UI/UX, Front-End, Tech & Property Operations
                </span>
                <span className={`text-xs ${textSoft}`}>
                  Quezon City & Taguig, PH {timeString && `• ${timeString}`}
                </span>
              </div>

              <div className="reveal space-y-4">
                <div className="space-y-1">
                  <span className={`text-xs sm:text-sm uppercase tracking-widest font-semibold block ${textSoft}`}>
                    Portfolio & Digital Hub
                  </span>
                  <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight leading-[1.15] min-h-[2.4em] sm:min-h-[1.25em] flex items-center">
                    <span
                      className={`inline-block transition-all duration-300 ease-out ${
                        isTitleFading
                          ? 'opacity-0 translate-y-2 blur-[3px]'
                          : 'opacity-100 translate-y-0 blur-0'
                      } ${textMain}`}
                    >
                      {rotatingTitles[titleIndex]}
                      <span className="font-serif-editorial italic font-normal text-emerald-600 dark:text-emerald-400">
                        .
                      </span>
                    </span>
                  </h1>
                </div>

                <p className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl ${textSub}`}>
                  With a foundation in Information Technology, commercial illustration, technical executive operations, and residential property management, I bridge{' '}
                  <strong className={`font-semibold ${textMain}`}>thoughtful user interface design</strong>,{' '}
                  <strong className={`font-semibold ${textMain}`}>clean React & MERN engineering</strong>, and{' '}
                  <strong className={`font-semibold ${textMain}`}>high-trust client & guest relations</strong> — turning complex systems and living spaces into calm, seamless experiences.
                </p>
              </div>

              <div className="reveal pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => copyToClipboard('girbaudforwork@gmail.com', 'email address')}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className={`text-xs font-semibold truncate ${textMain}`}>girbaudforwork@gmail.com</div>
                      <div className={`text-[11px] ${textSoft}`}>
                        {copiedLabel === 'email address' ? '✓ Copied' : 'Direct Email'}
                      </div>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 ${pillBg}`}>
                      {copiedLabel === 'email address' ? 'Copied' : 'Copy'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => copyToClipboard('+639206290342', 'phone number')}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className={`text-xs font-semibold ${textMain}`}>+63 920 629 0342</div>
                      <div className={`text-[11px] ${textSoft}`}>Viber / WhatsApp / SMS</div>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 ${pillBg}`}>
                      {copiedLabel === 'phone number' ? 'Copied' : 'Copy'}
                    </span>
                  </button>

                  <a
                    href="https://github.com/SoraNyx942002"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className={`text-xs font-semibold ${textMain}`}>GitHub Portfolio</div>
                      <div className={`text-[11px] ${textSoft}`}>@SoraNyx942002</div>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 ${pillBg}`}>
                      Visit ↗
                    </span>
                  </a>

                  <a
                    href={resumePdfUrl}
                    download="Girbaud_Sky_Villareal_Resume_CV.pdf"
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className={`text-xs font-semibold ${textMain}`}>Resume/CV</div>
                      <div className={`text-[11px] ${textSoft}`}>Download Official PDF</div>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 ${sageBadge}`}>
                      PDF ↓
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Compact, Permanent Portrait Card */}
            <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end reveal">
              <AestheticCard
                isDark={isDark}
                className="w-full max-w-[235px] sm:max-w-[265px] lg:max-w-[290px] p-3"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/4.6] bg-gradient-to-b from-[#E5E0D8] to-[#D6CFC5] dark:from-[#262421] dark:to-[#1C1A17]">
                  {!photoError && portraitCandidates.length > 0 ? (
                    <img
                      src={portraitCandidates[portraitIdx]}
                      alt="Girbaud Sky Villareal"
                      onError={() => {
                        if (portraitIdx + 1 < portraitCandidates.length) {
                          setPortraitIdx(portraitIdx + 1);
                        } else {
                          setPhotoError(true);
                        }
                      }}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center ${
                        isDark
                          ? 'bg-gradient-to-br from-[#23211E] via-[#1A1917] to-[#292623]'
                          : 'bg-gradient-to-br from-[#F3EFEA] via-[#EAE4DC] to-[#DFD8CE]'
                      }`}
                    >
                      <div
                        className={`w-20 h-20 rounded-full border flex items-center justify-center font-serif-editorial italic text-4xl mb-3 shadow-inner ${
                          isDark
                            ? 'bg-[#121110]/60 border-[#3A3632] text-[#F5F3EF]'
                            : 'bg-white/75 border-white text-[#1C1917]'
                        }`}
                      >
                        GSV
                      </div>
                      <span className={`font-display font-bold text-sm ${textMain}`}>
                        Girbaud Sky Villareal
                      </span>
                      <span className={`text-[11px] mt-0.5 ${textSoft}`}>
                        UI/UX • Dev • Host
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-x-2.5 bottom-2.5 px-3 py-2 rounded-xl backdrop-blur-xl bg-black/55 border border-white/15 text-white flex items-center justify-between">
                    <div className="truncate">
                      <div className="font-display font-bold text-[11px] tracking-tight truncate">
                        Girbaud Sky Villareal
                      </div>
                      <div className="text-[10px] text-white/75 truncate">
                        BSIT ’26 • Designer, Dev & Host
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 ml-2" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-2.5 text-center">
                  <div className={`py-2 px-1 rounded-xl border ${pillBg}`}>
                    <div className={`font-serif-editorial italic text-base leading-none ${textMain}`}>7+ yrs</div>
                    <div className={`text-[9px] mt-0.5 ${textSoft}`}>Visual Craft</div>
                  </div>
                  <div className={`py-2 px-1 rounded-xl border ${pillBg}`}>
                    <div className={`font-serif-editorial italic text-base leading-none ${textMain}`}>BSIT</div>
                    <div className={`text-[9px] mt-0.5 ${textSoft}`}>QCU ’26</div>
                  </div>
                  <div className={`py-2 px-1 rounded-xl border ${pillBg}`}>
                    <div className={`font-serif-editorial italic text-base leading-none ${textMain}`}>Host</div>
                    <div className={`text-[9px] mt-0.5 ${textSoft}`}>ARCA South</div>
                  </div>
                </div>
              </AestheticCard>
            </div>
          </div>
        </section>

        {/* SECTION 2: DESIGN PROCESS ACCORDION */}
        <section id="process" className="reveal space-y-6 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                01 / Design Philosophy & Workflow
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                How I approach{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  product design
                </span>
              </h2>
            </div>
            <p className={`text-xs sm:text-sm max-w-md ${textSub}`}>
              Click any stage below to smoothly expand my workflow from discovery to code.
            </p>
          </div>

          <div className="space-y-3">
            {designProcess.map((item, idx) => {
              const isOpen = openProcessIdx === idx;
              return (
                <AestheticCard key={item.step} isDark={isDark}>
                  <button
                    type="button"
                    onClick={() => setOpenProcessIdx(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
                      <span
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-serif-editorial italic text-xl sm:text-2xl shrink-0 transition-colors duration-300 border ${
                          isOpen
                            ? isDark
                              ? 'bg-[#F5F3EF] text-[#121110] border-[#F5F3EF]'
                              : 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                            : pillBg
                        }`}
                      >
                        {item.step}
                      </span>
                      <div className="min-w-0">
                        <h3 className={`font-display font-bold text-base sm:text-lg truncate ${textMain}`}>
                          {item.title}
                        </h3>
                        <p className={`text-xs sm:text-sm truncate ${textSoft}`}>{item.subtitle}</p>
                      </div>
                    </div>
                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-500 ${pillBg} ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      ↓
                    </span>
                  </button>

                  <div className={`accordion-grid ${isOpen ? 'open' : ''}`}>
                    <div className="accordion-inner">
                      <div className={`px-5 sm:px-6 pb-6 pt-2 border-t space-y-4 ${borderLine}`}>
                        <p className={`text-xs sm:text-sm leading-relaxed max-w-3xl ${textSub}`}>
                          {item.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] uppercase tracking-wider font-semibold mr-1 ${textSoft}`}>
                            Deliverables:
                          </span>
                          {item.deliverables.map((del) => (
                            <span
                              key={del}
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${sageBadge}`}
                            >
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AestheticCard>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: FLAGSHIP FULL-STACK & AI SYSTEM — PHASED */}
        <section id="work" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                02 / Flagship Engineering & UI Case Study
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Featured{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  application
                </span>
              </h2>
            </div>
            <span className={`text-xs ${textSoft}`}>
              Interact with the live embedded preview or open directly
            </span>
          </div>

          <AestheticCard isDark={isDark} className="overflow-hidden">
            <div className={`p-4 sm:p-6 border-b flex flex-wrap items-center justify-between gap-3 ${borderLine}`}>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${sageBadge}`}>
                  PHASED
                </span>
                <span className={`text-xs font-medium ${textSub}`}>
                  <strong>PH</strong>ishing <strong>A</strong>nd <strong>S</strong>ocial <strong>E</strong>ngineering <strong>D</strong>etection
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className={`inline-flex p-1 rounded-full border ${pillBg}`}>
                  {[
                    { id: 'live', label: 'Live Website Preview' },
                    { id: 'image', label: 'UI Artwork' },
                    { id: 'ux', label: 'Architecture & UX' },
                  ].map((tab) => (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => setPhasedView(tab.id)}
                      className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap ${
                        phasedView === tab.id
                          ? isDark
                            ? 'bg-[#F5F3EF] text-[#121110] font-semibold shadow-sm'
                            : 'bg-[#1C1917] text-[#FAF8F5] font-semibold shadow-sm'
                          : `${textSub} hover:${textMain}`
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <a
                  href="https://phased.undecide.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-display font-semibold transition-all shadow-sm ${
                    isDark
                      ? 'bg-[#F5F3EF] text-[#121110] hover:bg-white'
                      : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#35312E]'
                  }`}
                >
                  <span>Visit Live Site</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {phasedView === 'live' && (
              <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] bg-transparent">
                <iframe
                  src="https://phased.undecide.dev/"
                  title="PHASED Live Interactive Website Preview"
                  className="w-full h-full border-0 block"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute bottom-3 right-3 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/60 text-white text-[11px] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Preview: phased.undecide.dev</span>
                </div>
              </div>
            )}

            {phasedView === 'image' && (
              <div
                onClick={() =>
                  setLightboxData({
                    certId: 'phased',
                    title: 'PHASED — PHishing And Social Engineering Detection',
                    subtitle: 'Full UI Showcase',
                    candidates: [phasedImage],
                  })
                }
                className="relative w-full cursor-zoom-in group"
              >
                <img
                  src={phasedImage}
                  alt="PHASED — Phishing and Social Engineering Detection UI"
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                />
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Expand Full Resolution ⤢
                </div>
              </div>
            )}

            {phasedView === 'ux' && (
              <div className={`p-6 sm:p-10 space-y-6 ${isDark ? 'bg-[#161513]' : 'bg-[#F6F4EF]'}`}>
                <div className="grid sm:grid-cols-3 gap-5">
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>Why “PHASED”?</div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                      <strong>PHASED</strong> stands for <strong>PH</strong>ishing <strong>A</strong>nd <strong>S</strong>ocial <strong>E</strong>ngineering <strong>D</strong>etection — built to analyze deceptive links and messages in real time before users are compromised.
                    </p>
                  </div>
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>UI/UX Craft</div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                      Designed a calm, high-clarity interface across web and mobile so non-technical users immediately understand threat levels without security jargon.
                    </p>
                  </div>
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>Tech Stack</div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                      Engineered using MongoDB, Express.js, React.js, Node.js (MERN Stack), React Native for cross-platform mobile protection, and AI threat classification.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className={`p-5 sm:p-7 border-t flex flex-col md:flex-row md:items-center justify-between gap-4 ${borderLine}`}>
              <div className="space-y-1.5 max-w-2xl">
                <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${textMain}`}>
                  PHASED — AI Cybersecurity Platform
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${textSub}`}>
                  Engineered with the MERN stack and React Native to detect phishing links and social engineering threats across web and mobile.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                {['UI/UX Design', 'MERN Stack', 'React Native', 'AI Security'].map((tag) => (
                  <span key={tag} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AestheticCard>
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 4: HORIZONTAL STUDIO CAROUSEL — UI/UX DESIGN WORKS          */}
        {/* ==================================================================== */}
        <section id="ui-works" className="reveal space-y-6 scroll-mt-24">
          <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b pb-5 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                03 / Interactive Interface Gallery
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                UI/UX design{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  works & prototypes
                </span>
              </h2>
              <p className={`text-xs sm:text-sm mt-1.5 max-w-xl ${textSub}`}>
                Glide horizontally through the studio showcase, scroll vertically inside any web frame, or toggle the <strong>🔍 Magnify</strong> lens to inspect details.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-3">
              <div
                className={`inline-flex items-center flex-nowrap gap-1 p-1.5 rounded-full border overflow-x-auto max-w-full no-scrollbar ${pillBg}`}
              >
                {[
                  { id: 'all', label: 'All UI Works (5)' },
                  { id: 'web', label: 'Web Pages (3)' },
                  { id: 'mobile', label: 'Mobile UI (1)' },
                  { id: 'system', label: 'System / POS (1)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setUiCategoryFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${
                      uiCategoryFilter === tab.id
                        ? isDark
                          ? 'bg-[#F5F3EF] text-[#121110] font-semibold shadow-sm'
                          : 'bg-[#1C1917] text-[#FAF8F5] font-semibold shadow-sm'
                        : `${textSub} hover:${textMain}`
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToUiSlide(activeUiSlide - 1)}
                  disabled={activeUiSlide <= 0}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs transition-all ${pillBg} ${
                    activeUiSlide <= 0 ? 'opacity-35 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                  aria-label="Previous UI project"
                >
                  ←
                </button>
                <span className={`px-3 py-1.5 rounded-full text-xs font-display font-bold border ${pillBg}`}>
                  {String(activeUiSlide + 1).padStart(2, '0')} /{' '}
                  {String(filteredUiWorks.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToUiSlide(activeUiSlide + 1)}
                  disabled={activeUiSlide >= filteredUiWorks.length - 1}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs transition-all ${pillBg} ${
                    activeUiSlide >= filteredUiWorks.length - 1
                      ? 'opacity-35 cursor-not-allowed'
                      : 'hover:scale-105'
                  }`}
                  aria-label="Next UI project"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div
            ref={uiCarouselRef}
            onScroll={handleUiCarouselScroll}
            className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 no-scrollbar"
          >
            {filteredUiWorks.map((project) => (
              <div
                key={project.id}
                data-ui-card
                className="w-[90vw] sm:w-[600px] lg:w-[860px] xl:w-[920px] shrink-0 snap-start"
              >
                <AestheticCard isDark={isDark} className="p-4 sm:p-6 lg:p-7">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch h-full">
                    <div className="lg:col-span-7 flex flex-col">
                      <ScrollableUiViewport
                        project={project}
                        isDark={isDark}
                        onOpenInspector={handleOpenUiInspector}
                      />
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${sageBadge}`}>
                            {project.badge}
                          </span>
                          <span className={`font-serif-editorial italic text-2xl ${textSoft}`}>
                            {project.number} / {String(filteredUiWorks.length).padStart(2, '0')}
                          </span>
                        </div>

                        <div>
                          <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${textMain}`}>
                            {project.title}
                          </h3>
                          <p className={`text-xs font-medium mt-0.5 ${textSoft}`}>
                            {project.subtitle}
                          </p>
                        </div>

                        <p className={`text-xs sm:text-sm leading-relaxed ${textSub}`}>
                          {project.description}
                        </p>

                        <div
                          className={`p-3.5 rounded-2xl border space-y-2 ${
                            isDark ? 'bg-[#141311]/90 border-[#2E2C29]' : 'bg-[#FAF8F5] border-[#E7E5E0]'
                          }`}
                        >
                          <div className={`text-[10px] uppercase tracking-wider font-semibold ${textSoft}`}>
                            Key Interface Highlights
                          </div>
                          <ul className={`space-y-1.5 text-xs leading-relaxed ${textSub}`}>
                            {project.highlights.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className={`mt-6 pt-4 border-t space-y-3.5 ${borderLine}`}>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] border ${pillBg}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {project.id !== 'caiantrix-ui' && (
                          <button
                            type="button"
                            onClick={() => handleOpenUiInspector(project, 0)}
                            className={`w-full py-2.5 px-4 rounded-xl text-xs font-display font-semibold border transition-all flex items-center justify-center gap-2 ${
                              isDark
                                ? 'bg-[#F5F3EF] text-[#121110] border-[#F5F3EF] hover:bg-white'
                                : 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] hover:bg-[#35312E]'
                            }`}
                          >
                            <span>⤢ Fullscreen Scroll & Magnifier</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </AestheticCard>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            {filteredUiWorks.map((proj, idx) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => scrollToUiSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeUiSlide === idx
                    ? isDark
                      ? 'w-8 bg-[#F5F3EF]'
                      : 'w-8 bg-[#1C1917]'
                    : isDark
                    ? 'w-2 bg-[#35322F] hover:bg-[#57534E]'
                    : 'w-2 bg-[#D6D3CD] hover:bg-[#A8A29E]'
                }`}
              />
            ))}
          </div>
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 5: AIRBNB (SCROLLABLE AIRBNB.PNG) & FACEBOOK SPLIT STUDIO   */}
        {/* ==================================================================== */}
        <section id="hosting" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                04 / Property Management & Guest Relations
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Cozy Studio in{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  ARCA South
                </span>
              </h2>
            </div>
            <span className={`text-xs ${textSoft}`}>
              Avida Towers Vireo, Taguig City • ₱19,000 / month
            </span>
          </div>

          <AestheticCard isDark={isDark} className="overflow-hidden">
            {/* 1. TOP STUDIO HEADER BAR: Switcher + Airbnb Red & Facebook Blue Buttons */}
            <div className={`p-4 sm:p-6 border-b flex flex-wrap items-center justify-between gap-3 ${borderLine}`}>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${sageBadge}`}>
                  ARCA SOUTH CONDO
                </span>
                <span className={`text-xs font-medium ${textSub}`}>
                  Entire Condo · 2 Guests · 1 Bedroom · 1 Bed · 1 Bath (23 sqm Tower 1)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className={`inline-flex items-center p-1 rounded-full border ${pillBg}`}>
                  {[
                    { id: 'airbnb', label: 'Airbnb Preview' },
                    { id: 'facebook', label: 'Facebook Preview' },
                    { id: 'details', label: 'Role & Lease Details' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setArcaView(tab.id)}
                      className={`px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap ${
                        arcaView === tab.id
                          ? isDark
                            ? 'bg-[#F5F3EF] text-[#121110] font-semibold shadow-sm'
                            : 'bg-[#1C1917] text-[#FAF8F5] font-semibold shadow-sm'
                          : `${textSub} hover:${textMain}`
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <a
                  href={airbnbRoomUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-display font-semibold bg-[#FF385C] hover:bg-[#E00B41] text-white transition-all shadow-sm whitespace-nowrap"
                >
                  <span>View Airbnb</span>
                  <span>↗</span>
                </a>
                <a
                  href={facebookPageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-display font-semibold bg-[#1877F2] hover:bg-[#166FE5] text-white transition-all shadow-sm whitespace-nowrap"
                >
                  <span>Facebook Page</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* 2A. AIRBNB TAB: FULL-WIDTH SCROLLABLE WEBSITE PREVIEW OF AIRBNB.PNG */}
            {arcaView === 'airbnb' && (
              <AirbnbScrollableWebsitePreview
                airbnbRoomUrl={airbnbRoomUrl}
                airbnbShortUrl={airbnbShortUrl}
                airbnbCandidates={airbnbScreenshotCandidates}
                isDark={isDark}
                borderLine={borderLine}
                pillBg={pillBg}
                onOpenZoomModal={() => {
                  setZoomLevel(1);
                  setInspectorModal({
                    project: {
                      id: 'airbnb-full-page',
                      title: 'Cozy Studio in ARCA South — Full Airbnb Listing Page',
                      subtitle: 'Avida Towers Vireo, Taguig City • Scroll vertically & use zoom controls',
                      isMobile: false,
                      candidates: airbnbScreenshotCandidates,
                    },
                    screenIdx: 0,
                  });
                }}
              />
            )}

            {/* 2B. FACEBOOK TAB: 2-COLUMN LAYOUT (AVIDA POSTER ON LEFT + DETAILS ON RIGHT) */}
            {arcaView === 'facebook' && (
              <FacebookSplitShowcase
                facebookPageUrl={facebookPageUrl}
                airbnbRoomUrl={airbnbRoomUrl}
                avidaPosterCandidates={avidaPosterCandidates}
                isDark={isDark}
                textMain={textMain}
                textSub={textSub}
                textSoft={textSoft}
                borderLine={borderLine}
                pillBg={pillBg}
                onCopyNumber={copyToClipboard}
                onOpenPosterLightbox={(srcUrl) =>
                  setLightboxData({
                    certId: 'avida-poster',
                    title: 'Avida Towers Vireo Tower 1 — ARCA South, Taguig City',
                    subtitle: 'For Lease: ₱19,000 / Month • Official Facebook Leasing Poster',
                    candidates: [srcUrl, ...avidaPosterCandidates],
                  })
                }
              />
            )}

            {/* 2C. ROLE & LEASE DETAILS TAB */}
            {arcaView === 'details' && (
              <div className={`p-6 sm:p-10 space-y-6 ${isDark ? 'bg-[#161513]' : 'bg-[#F6F4EF]'}`}>
                <div className="grid sm:grid-cols-3 gap-5">
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>
                      Property Management (My Role)
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                      <strong>Client Engagement:</strong> Serve as primary point of contact for guest inquiries, screening long-term tenants, and ensuring clear communication from booking through checkout.<br /><br />
                      <strong>Issue Resolution:</strong> Direct liaison with Airbnb Support & building PMO to swiftly resolve platform, billing, or policy matters.
                    </p>
                  </div>

                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>
                      Space & Inclusions (23 sqm)
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                      Fully furnished Tower 1 studio with a slatted room divider, queen-sized bed, furnished wardrobe, loveseat, dining/workspace bar with pendant lights, and equipped kitchen (Samsung refrigerator, microwave, induction cooker, kettle, and rice cooker).
                    </p>
                  </div>

                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>
                      Leasing Terms & Contacts
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                      <strong>₱19,000 / month</strong> (Inclusive of Association Dues) • 1-year contract (PDCs) • Max 2 occupants • 1 mo advance + 2 mos deposit. Utilities billed separately by meter.<br /><br />
                      <strong>Viber:</strong> 09206290342 / 09282898594<br />
                      <strong>WhatsApp:</strong> 09206290342 / 09936460660
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. CLEAN, ALIGNED 3-COLUMN EXECUTIVE FOOTER */}
            <div className={`p-5 sm:p-7 border-t ${borderLine}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <div className={`text-[11px] uppercase tracking-wider font-semibold ${textSoft}`}>
                    01 / Space & Location
                  </div>
                  <h4 className={`font-display font-bold text-sm sm:text-base ${textMain}`}>
                    Avida Towers Vireo (Tower 1 • 23 sqm)
                  </h4>
                  <p className={`text-xs leading-relaxed ${textSub}`}>
                    Fully furnished studio with a slatted room divider, queen bed, loveseat, dining/workspace bar, and equipped kitchen. Walking distance to Landers & Ayala Malls Arca South.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className={`text-[11px] uppercase tracking-wider font-semibold ${textSoft}`}>
                    02 / Property Management (My Role)
                  </div>
                  <h4 className={`font-display font-bold text-sm sm:text-base ${textMain}`}>
                    Client Engagement & Issue Resolution
                  </h4>
                  <p className={`text-xs leading-relaxed ${textSub}`}>
                    Serve as primary contact for guest inquiries and long-term tenant screening, while acting as direct liaison with Airbnb Support and building PMO to resolve billing or policy matters.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className={`text-[11px] uppercase tracking-wider font-semibold ${textSoft}`}>
                    03 / Leasing Terms & Inquiries
                  </div>
                  <h4 className={`font-display font-bold text-sm sm:text-base ${textMain}`}>
                    ₱19,000 / month (Inc. Assoc. Dues)
                  </h4>
                  <p className={`text-xs leading-relaxed ${textSub}`}>
                    Tailored for 1-year residential leases (1 mo advance + 2 mos deposit, PDCs).{' '}
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard('09206290342', 'Viber / WhatsApp (09206290342)')
                      }
                      className={`underline font-semibold mt-0.5 inline-block ${textMain}`}
                    >
                      Viber / WhatsApp: 0920 629 0342 (Copy)
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </AestheticCard>
        </section>

        {/* SECTION 6: INTERACTIVE RESUME/CV WITH SMOOTH ACCORDIONS */}
        <section id="experience" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                05 / Resume/CV
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Experience &{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  academic background
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className={`inline-flex items-center flex-nowrap p-1 rounded-full border overflow-x-auto no-scrollbar ${pillBg}`}>
                {[
                  { id: 'all', label: 'Full Resume/CV' },
                  { id: 'work', label: 'Work History' },
                  { id: 'education', label: 'Education & Community' },
                ].map((tab) => (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setCvFilter(tab.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                      cvFilter === tab.id
                        ? isDark
                          ? 'bg-[#F5F3EF] text-[#121110] font-semibold shadow-sm'
                          : 'bg-[#1C1917] text-[#FAF8F5] font-semibold shadow-sm'
                        : `${textSub} hover:${textMain}`
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <a
                href={resumePdfUrl}
                download="Girbaud_Sky_Villareal_Resume_CV.pdf"
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-display font-semibold border transition-all ${sageBadge}`}
              >
                <span>Download Resume/CV</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          {(cvFilter === 'all' || cvFilter === 'work') && (
            <div className="space-y-3">
              {experiences.map((exp) => {
                const isOpen = openExpIds.includes(exp.id);
                const isHighlighted = selectedSkill && exp.tags.includes(selectedSkill);
                return (
                  <AestheticCard
                    key={exp.id}
                    isDark={isDark}
                    className={isHighlighted ? 'ring-2 ring-emerald-500/50' : ''}
                  >
                    <button
                      type="button"
                      onClick={() => toggleExpAccordion(exp.id)}
                      className="w-full p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className={`font-display text-base sm:text-lg font-bold ${textMain}`}>
                            {exp.role}
                          </h3>
                          {exp.active && (
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] border ${sageBadge}`}>
                              Current
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-medium ${textSub}`}>
                          {exp.company} • {exp.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-center">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full border ${pillBg}`}>
                          {exp.period}
                        </span>
                        <span
                          className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-transform duration-500 ${pillBg} ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          ↓
                        </span>
                      </div>
                    </button>

                    <div className={`accordion-grid ${isOpen ? 'open' : ''}`}>
                      <div className="accordion-inner">
                        <div className={`px-5 sm:px-6 pb-6 pt-3 border-t space-y-4 ${borderLine}`}>
                          <ul className={`space-y-2 text-xs sm:text-sm leading-relaxed ${textSub}`}>
                            {exp.highlights.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {exp.tags.map((tag) => (
                              <button
                                type="button"
                                key={tag}
                                onClick={() => setSelectedSkill(selectedSkill === tag ? null : tag)}
                                className={`px-3 py-1 rounded-full text-[11px] border transition-all ${
                                  selectedSkill === tag
                                    ? isDark
                                      ? 'bg-[#F5F3EF] text-[#121110] font-semibold'
                                      : 'bg-[#1C1917] text-[#FAF8F5] font-semibold'
                                    : pillBg
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AestheticCard>
                );
              })}
            </div>
          )}

          {(cvFilter === 'all' || cvFilter === 'education') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <AestheticCard isDark={isDark} className="p-6 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                    Academic Profile
                  </span>
                  <span className={`font-serif-editorial italic text-xl ${textSoft}`}>Education</span>
                </div>
                <div className="space-y-4">
                  <div className={`pb-4 border-b ${borderLine}`}>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`font-display font-bold text-sm sm:text-base ${textMain}`}>
                        Bachelor of Science in Information Technology
                      </h4>
                      <span className={`text-xs shrink-0 ${textSoft}`}>2022 — 2026</span>
                    </div>
                    <p className={`text-xs mt-1 ${textSub}`}>Quezon City University</p>
                  </div>
                  <div className={`pb-4 border-b ${borderLine}`}>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`font-display font-bold text-sm ${textMain}`}>
                        Information & Communications Technology (With Honors)
                      </h4>
                      <span className={`text-xs shrink-0 ${textSoft}`}>2020 — 2021</span>
                    </div>
                    <p className={`text-xs mt-1 ${textSub}`}>St. Clare College of Caloocan</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`font-display font-bold text-sm ${textMain}`}>
                        Secondary Education • With Honors
                      </h4>
                      <span className={`text-xs shrink-0 ${textSoft}`}>2015 — 2019</span>
                    </div>
                    <p className={`text-xs mt-1 ${textSub}`}>Cielito Zamora Junior High School</p>
                  </div>
                </div>
              </AestheticCard>

              <AestheticCard isDark={isDark} className="p-6 sm:p-7">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                      Community & Practicum
                    </span>
                    <span className={`font-serif-editorial italic text-xl ${textSoft}`}>Service</span>
                  </div>
                  <div className="space-y-4">
                    <div className={`pb-4 border-b ${borderLine}`}>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className={`font-display font-bold text-sm sm:text-base ${textMain}`}>
                          Student Tutor — DSWD Tara, Basa! Tutoring Program
                        </h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] border shrink-0 ${sageBadge}`}>
                          2025
                        </span>
                      </div>
                      <p className={`text-xs mt-1.5 leading-relaxed ${textSub}`}>
                        Facilitated structured reading and literacy sessions for public elementary students.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className={`font-display font-bold text-sm ${textMain}`}>
                          Finance & Accounting Intern (Practicum 1 • 296 Hours)
                        </h4>
                        <span className={`text-xs shrink-0 ${textSoft}`}>2026</span>
                      </div>
                      <p className={`text-xs mt-1 leading-relaxed ${textSub}`}>
                        Completed 296 training hours at CoverDesk PH alongside enterprise retail hardware and technical operations.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="#certifications"
                  className={`mt-6 p-4 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${pillBg}`}
                >
                  <div>
                    <div className={`text-xs font-display font-bold ${textMain}`}>
                      View Verified Certifications Gallery Below
                    </div>
                    <div className={`text-[11px] ${textSoft}`}>
                      TESDA NC II • Cisco NetAcad • NCBA AI Webinar
                    </div>
                  </div>
                  <span className="text-sm">↓</span>
                </a>
              </AestheticCard>
            </div>
          )}
        </section>

        {/* SECTION 7: VERIFIED CERTIFICATIONS GALLERY (ALIGNED BOTTOM BUTTONS) */}
        <section id="certifications" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                06 / Official Credentials & Licenses
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Verified{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  certifications
                </span>
              </h2>
            </div>
            <span className={`text-xs ${textSoft}`}>
              Click any certificate card to inspect full resolution
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {certifications.map((cert) => (
              <AestheticCard
                key={cert.id}
                isDark={isDark}
                className="p-4 sm:p-5 group"
              >
                <div className="flex-1 flex flex-col">
                  <div
                    onClick={() =>
                      setLightboxData({
                        certId: cert.id,
                        title: cert.title,
                        subtitle: `${cert.issuer} • ${cert.date}`,
                        candidates: cert.candidates,
                      })
                    }
                    className={`relative w-full h-56 sm:h-60 rounded-2xl overflow-hidden border p-3 flex items-center justify-center cursor-zoom-in transition-all ${
                      isDark
                        ? 'bg-[#121110] border-[#2E2C29] group-hover:border-[#44403C]'
                        : 'bg-[#F5F2EC] border-[#E5E0D8] group-hover:border-[#D6D3CD]'
                    }`}
                  >
                    <SmartImage
                      candidates={cert.candidates}
                      alt={cert.title}
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-md transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-end justify-end p-3">
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Inspect Certificate ⤢
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${sageBadge}`}>
                        {cert.badge}
                      </span>
                      <span className={`text-[11px] font-medium truncate ${textSoft}`}>
                        {cert.credentialId}
                      </span>
                    </div>

                    <h3 className={`font-display font-bold text-base sm:text-lg leading-snug ${textMain}`}>
                      {cert.title}
                    </h3>

                    <p className={`text-xs font-medium ${textSub}`}>{cert.issuer}</p>
                    <p className={`text-[11px] ${textSoft}`}>{cert.date}</p>
                    <p className={`text-xs leading-relaxed pt-1 ${textSub}`}>{cert.description}</p>
                  </div>
                </div>

                <div className={`mt-6 pt-4 border-t flex flex-col justify-end gap-3.5 ${borderLine}`}>
                  <div className="flex flex-wrap gap-1.5 min-h-[52px] content-start">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] border ${pillBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setLightboxData({
                        certId: cert.id,
                        title: cert.title,
                        subtitle: `${cert.issuer} • ${cert.date}`,
                        candidates: cert.candidates,
                      })
                    }
                    className={`w-full py-2.5 rounded-xl text-xs font-display font-semibold border transition-all flex items-center justify-center gap-1.5 ${pillBg} hover:opacity-90`}
                  >
                    <span>View Full Certificate</span>
                    <span>⤢</span>
                  </button>
                </div>
              </AestheticCard>
            ))}
          </div>
        </section>

        {/* SECTION 8: CAPABILITIES & TOOLKIT */}
        <section id="capabilities" className="reveal space-y-6 scroll-mt-24">
          <div className={`border-b pb-4 ${borderLine}`}>
            <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
              07 / Capabilities
            </span>
            <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
              Design, code &{' '}
              <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                operations toolkit
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
            <AestheticCard isDark={isDark} className="p-6">
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>01. UI/UX & Visuals</div>
              <p className={`text-xs mb-4 ${textSoft}`}>Human-centered design & branding</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'UI/UX Design',
                  'Figma Prototyping',
                  'Wireframing',
                  'Design Systems',
                  'Graphic Design',
                  'Adobe Photoshop',
                  'Canva',
                  'Visual Illustration',
                ].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </AestheticCard>

            <AestheticCard isDark={isDark} className="p-6">
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>02. Front-End & Code</div>
              <p className={`text-xs mb-4 ${textSoft}`}>Modern web & mobile engineering</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'React.js',
                  'React Native',
                  'MERN Stack',
                  'Tailwind CSS',
                  'JavaScript (ES6+)',
                  'Node.js & Express',
                  'MongoDB',
                  'Vite',
                ].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </AestheticCard>

            <AestheticCard isDark={isDark} className="p-6">
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>
                03. Tech Ops & Property Mgmt
              </div>
              <p className={`text-xs mb-4 ${textSoft}`}>
                Enterprise systems, sales & residential hosting
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Property & Lease Management',
                  'Airbnb Hosting & Guest Relations',
                  'Tenant Screening',
                  'Conflict & Issue Resolution',
                  'Technical Sales & Quotations',
                  'Computer Systems Servicing NC II',
                  'Sales Accounting',
                ].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </AestheticCard>
          </div>
        </section>

        {/* SECTION 9: PERFORMANCE RATINGS & FEEDBACK */}
        <section id="ratings" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                08 / Performance & Feedback
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Rate my{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  performance
                </span>
              </h2>
            </div>

            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border self-start ${sageBadge}`}>
              <div className="flex items-center text-amber-500 text-sm">{'★★★★★'}</div>
              <span className="text-xs font-display font-bold">
                {averageRating} / 5.0 ({reviews.length} Ratings)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <AestheticCard isDark={isDark} className="lg:col-span-7 p-6 sm:p-8">
              <form onSubmit={handleRatingSubmit} className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className={`font-display font-bold text-lg ${textMain}`}>
                      Leave a Rating & Endorsement
                    </h3>
                    <p className={`text-xs mt-0.5 ${textSoft}`}>
                      Worked with me or reviewed my portfolio? Share your rating or tap a suggested phrase below.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.04] px-3 py-1.5 rounded-full border border-inherit self-start">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating || ratingInput) >= star;
                      return (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRatingInput(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className={`text-xl transition-transform duration-200 hover:scale-125 focus:outline-none ${
                            active ? 'text-amber-400' : 'text-stone-400/40'
                          }`}
                          aria-label={`Rate ${star} out of 5 stars`}
                        >
                          ★
                        </button>
                      );
                    })}
                    <span className={`ml-2 text-xs font-display font-bold ${textMain}`}>
                      {ratingInput}/5
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className={`text-[11px] uppercase tracking-wider font-semibold block ${textSoft}`}>
                    Suggested Words (Click to insert):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedPhrases.map((phrase) => (
                      <button
                        type="button"
                        key={phrase}
                        onClick={() => handleAddSuggestedPhrase(phrase)}
                        className={`text-left px-3 py-1.5 rounded-full text-xs border transition-all hover:scale-[1.02] active:scale-95 ${pillBg}`}
                      >
                        + “{phrase}”
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    id="reviewer-name"
                    name="reviewerName"
                    aria-label="Your Name"
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border bg-transparent focus:outline-none ${borderLine} ${textMain}`}
                  />
                  <input
                    id="reviewer-role"
                    name="reviewerRole"
                    aria-label="Role or Company"
                    type="text"
                    value={reviewerRole}
                    onChange={(e) => setReviewerRole(e.target.value)}
                    placeholder="Role or Company (Optional)"
                    className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border bg-transparent focus:outline-none ${borderLine} ${textMain}`}
                  />
                </div>

                <textarea
                  id="review-comment"
                  name="reviewComment"
                  aria-label="Feedback comment"
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write your feedback or click a suggested phrase above..."
                  className={`w-full p-4 rounded-2xl text-xs sm:text-sm border bg-transparent focus:outline-none resize-none ${borderLine} ${textMain}`}
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  {reviewSubmitted ? (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      ✓ Thank you! Your 5-star feedback has been added.
                    </span>
                  ) : (
                    <span className={`text-[11px] ${textSoft}`}>
                      Instant publish to portfolio feedback feed
                    </span>
                  )}

                  <button
                    type="submit"
                    className={`px-6 py-2.5 rounded-full text-xs font-display font-semibold transition-all shadow-sm ${
                      isDark
                        ? 'bg-[#F5F3EF] text-[#121110] hover:bg-white'
                        : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#35312E]'
                    }`}
                  >
                    Submit Rating ({ratingInput}/5 ★)
                  </button>
                </div>
              </form>
            </AestheticCard>

            <div className="lg:col-span-5 space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {reviews.map((rev) => (
                <AestheticCard key={rev.id} isDark={isDark} className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-display font-bold text-sm ${textMain}`}>{rev.name}</div>
                      <div className={`text-[11px] ${textSoft}`}>
                        {rev.role} • {rev.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-amber-500 text-xs font-bold border-amber-500/20 bg-amber-500/10">
                      <span>{'★'.repeat(rev.rating)}</span>
                      <span className={textMain}>{rev.rating}/5</span>
                    </div>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${textSub}`}>
                    “{rev.comment}”
                  </p>
                </AestheticCard>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${borderLine} ${textSoft}`}>
          <div>
            © 2026 <strong className={textMain}>Girbaud Sky Villareal</strong>. Crafted in Quezon City.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={resumePdfUrl}
              download="Girbaud_Sky_Villareal_Resume_CV.pdf"
              className={`underline hover:${textMain}`}
            >
              Download Resume/CV
            </a>
            <span>•</span>
            <span>References available upon request</span>
          </div>
        </footer>
      </main>

      {/* FULLSCREEN SCROLLABLE & MAGNIFIABLE UI DESIGN / AIRBNB INSPECTOR MODAL */}
      {inspectorModal && (
        <div
          onClick={() => setInspectorModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full mx-auto mb-3 p-3 sm:px-5 rounded-2xl bg-[#181715] border border-white/15 text-white flex flex-wrap items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="font-display font-bold text-sm sm:text-base truncate">
                {inspectorModal.project.title}
              </div>
              <div className="text-[11px] text-zinc-400 truncate">
                {inspectorModal.project.subtitle} • Scroll vertically & use zoom controls
              </div>
            </div>

            {inspectorModal.project.screens && (
              <div className="flex items-center gap-1 bg-black/50 p-1 rounded-full border border-white/10 overflow-x-auto no-scrollbar">
                {inspectorModal.project.screens.map((scr, idx) => (
                  <button
                    key={scr.label}
                    type="button"
                    onClick={() =>
                      setInspectorModal((prev) => ({ ...prev, screenIdx: idx }))
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                      inspectorModal.screenIdx === idx
                        ? 'bg-white text-zinc-950 font-semibold'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {scr.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-zinc-400 mr-1 hidden sm:inline">
                Magnify:
              </span>
              {[1, 1.5, 2, 2.5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setZoomLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    zoomLevel === lvl
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400'
                      : 'bg-white/10 text-zinc-200 border-white/10 hover:bg-white/20'
                  }`}
                >
                  {lvl * 100}%
                </button>
              ))}

              <button
                type="button"
                onClick={() => setInspectorModal(null)}
                className="ml-2 px-4 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200"
              >
                Close (Esc)
              </button>
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full mx-auto flex-1 overflow-auto rounded-2xl bg-[#0C0C0E] border border-white/15 p-4 sm:p-8"
          >
            {(() => {
              const proj = inspectorModal.project;
              const activeScr = proj.screens
                ? proj.screens[inspectorModal.screenIdx]
                : { candidates: proj.candidates, label: proj.title };
              const cands = (activeScr?.candidates || []).filter(Boolean);

              return (
                <div
                  className="mx-auto transition-all duration-300 origin-top"
                  style={{
                    width: proj.isMobile
                      ? `${Math.min(100, 38 * zoomLevel)}%`
                      : `${100 * zoomLevel}%`,
                    minWidth: proj.isMobile ? '280px' : undefined,
                  }}
                >
                  <SmartImage
                    candidates={cands}
                    alt={proj.title}
                    className="w-full h-auto block rounded-xl shadow-2xl mx-auto"
                  />
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* UNIVERSAL FULLSCREEN LIGHTBOX FOR CERTIFICATES, PHASED & AVIDA POSTER */}
      {lightboxData && (
        <div
          onClick={() => setLightboxData(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <div className="max-w-5xl w-full flex items-center justify-between gap-4 mb-3 text-xs text-zinc-200">
            <div className="truncate">
              <div className="font-display font-bold text-sm text-white truncate">
                {lightboxData.title}
              </div>
              {lightboxData.subtitle && (
                <div className="text-[11px] text-zinc-400 truncate">
                  {lightboxData.subtitle}
                </div>
              )}
            </div>
            <button
              onClick={() => setLightboxData(null)}
              className="px-4 py-1.5 rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200 shrink-0"
            >
              Close (Esc)
            </button>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full max-h-[84vh] overflow-y-auto rounded-2xl bg-black/40 p-4 flex items-center justify-center"
          >
            <SmartImage
              candidates={lightboxData.candidates}
              alt={lightboxData.title}
              className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-xl shadow-2xl mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}