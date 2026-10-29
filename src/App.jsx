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

function buildImageCandidates(baseUrl, exactBaseName, searchKeyword) {
  const bundled = findBundledImage(searchKeyword || exactBaseName);
  const lower = exactBaseName.toLowerCase();
  const upper = exactBaseName.toUpperCase();
  return [
    bundled,
    `${baseUrl}${exactBaseName}.png`,
    `${baseUrl}${exactBaseName}.jpg`,
    `${baseUrl}${exactBaseName}.jpeg`,
    `${baseUrl}${lower}.png`,
    `${baseUrl}${lower}.jpg`,
    `${baseUrl}${lower}.jpeg`,
    `${baseUrl}${upper}.PNG`,
    `${baseUrl}${upper}.JPG`,
    `${baseUrl}assets/${exactBaseName}.png`,
    `${baseUrl}assets/${exactBaseName}.jpg`,
    `${baseUrl}assets/${lower}.png`,
    `${baseUrl}assets/${lower}.jpg`,
  ].filter(Boolean);
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
/*  SOFT AESTHETIC SURFACE CARD (FULL-HEIGHT FLEX FOR BOTTOM BUTTON ALIGN)    */
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
/*  SCROLLABLE & MAGNIFIABLE UI VIEWPORT FOR WEB & MOBILE DESIGNS             */
/* -------------------------------------------------------------------------- */
function ScrollableUiViewport({
  project,
  isDark,
  onOpenInspector,
}) {
  const scrollContainerRef = useRef(null);
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const [magnifyEnabled, setMagnifyEnabled] = useState(false);
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
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeScreenIdx, project.id, validCandidates.length]);

  const activeImgUrl = !imgFailed ? validCandidates[candidateIdx] : null;

  const handleImageMouseMove = (e) => {
    if (!magnifyEnabled || !activeImgUrl) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    setLensState({
      visible: true,
      x,
      y,
      bgX,
      bgY,
    });
  };

  const handleQuickScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      top: direction === 'down' ? 260 : -260,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col">
      {/* Top Interactive Viewport Bar */}
      <div
        className={`px-3.5 py-2.5 rounded-t-2xl border border-b-0 flex flex-wrap items-center justify-between gap-2 ${
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

        {/* Controls: Magnifier Toggle + Scroll Helpers */}
        <div className="flex items-center gap-1.5">
          {project.id !== 'caiantrix-ui' && (
            <button
              type="button"
              onClick={() => setMagnifyEnabled((prev) => !prev)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all flex items-center gap-1 ${
                magnifyEnabled
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : isDark
                  ? 'bg-[#242220] text-[#E7E5E0] border-[#35322F] hover:bg-[#2E2C29]'
                  : 'bg-white text-[#44403C] border-[#E5E2DC] hover:bg-stone-100'
              }`}
              title="Toggle 2.2x Hover Magnifying Lens"
            >
              <span>🔍</span>
              <span>{magnifyEnabled ? 'Magnifier ON' : 'Magnify'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleQuickScroll('up')}
            className={`w-6 h-6 rounded-full border text-[10px] flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-[#242220] border-[#35322F] hover:bg-[#2E2C29]'
                : 'bg-white border-[#E5E2DC] hover:bg-stone-100'
            }`}
            title="Scroll Up"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => handleQuickScroll('down')}
            className={`w-6 h-6 rounded-full border text-[10px] flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-[#242220] border-[#35322F] hover:bg-[#2E2C29]'
                : 'bg-white border-[#E5E2DC] hover:bg-stone-100'
            }`}
            title="Scroll Down"
          >
            ↓
          </button>
        </div>
      </div>

      {/* Multi-Screen Switcher Bar (Used for Zenara 3-Screen Mobile Suite) */}
      {screens.length > 1 && (
        <div
          className={`px-3 py-2 border-x flex flex-wrap items-center gap-1.5 ${
            isDark ? 'bg-[#181715] border-[#2E2C29]' : 'bg-[#FAF8F5] border-[#E5E2DC]'
          }`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-60 mr-1">
            Screens:
          </span>
          {screens.map((scr, idx) => (
            <button
              key={scr.label}
              type="button"
              onClick={() => setActiveScreenIdx(idx)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
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

      {/* Scrollable Viewport Window (Supports Long Full-Page Web Designs) */}
      <div
        ref={scrollContainerRef}
        className={`relative w-full h-[360px] sm:h-[400px] overflow-y-auto overflow-x-hidden rounded-b-2xl border transition-all ${
          isDark ? 'bg-[#0F0E0D] border-[#2E2C29]' : 'bg-[#F5F2EC] border-[#E5E2DC]'
        }`}
      >
        {project.id === 'caiantrix-ui' ? (
          /* Interactive Scrollable System UI Preview for Caiantrix Grocery POS */
          <div className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-500/20 pb-3">
              <div>
                <div className="text-xs font-display font-bold">CAIANTRIX GROCERY POS & INVENTORY v2.4</div>
                <div className="text-[10px] opacity-65">Daily Store Operations & Real-Time SKU Tracking</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                ● Live Terminal
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                <div className="text-[10px] opacity-60">Active SKUs</div>
                <div className="font-display font-bold text-base mt-0.5">2,840</div>
                <div className="text-[10px] text-emerald-500 mt-0.5">100% Indexed</div>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                <div className="text-[10px] opacity-60">Checkout Speed</div>
                <div className="font-display font-bold text-base mt-0.5">-35% Time</div>
                <div className="text-[10px] text-emerald-500 mt-0.5">Low-Friction UI</div>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                <div className="text-[10px] opacity-60">Stock Accuracy</div>
                <div className="font-display font-bold text-base mt-0.5">99.4%</div>
                <div className="text-[10px] text-emerald-500 mt-0.5">Auto-Audit</div>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border space-y-2.5 ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Quick Barcode & Category Filter</span>
                <span className="text-[10px] opacity-60">Produce • Pantry • Dairy • Beverages</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                {[
                  { item: 'Fresh Farm Milk 1L', code: 'SKU-1042', stock: '48 in stock', price: '₱115.00' },
                  { item: 'Whole Wheat Loaf', code: 'SKU-2089', stock: '22 in stock', price: '₱78.00' },
                  { item: 'Organic Brown Rice 5kg', code: 'SKU-3190', stock: '16 in stock', price: '₱340.00' },
                  { item: 'Arabica Ground Coffee', code: 'SKU-4011', stock: '31 in stock', price: '₱265.00' },
                ].map((row) => (
                  <div
                    key={row.code}
                    className={`flex items-center justify-between p-2 rounded-lg border ${
                      isDark ? 'bg-[#121110] border-[#2E2C29]' : 'bg-[#FAF8F5] border-[#E7E5E0]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{row.item}</div>
                      <div className="text-[10px] opacity-60">{row.code} • {row.stock}</div>
                    </div>
                    <span className="font-display font-bold">{row.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeImgUrl ? (
          <div
            onMouseMove={handleImageMouseMove}
            onMouseLeave={() => setLensState((prev) => ({ ...prev, visible: false }))}
            onClick={() => onOpenInspector(project, activeScreenIdx)}
            className={`relative w-full mx-auto ${
              project.isMobile ? 'max-w-[270px] py-4' : 'w-full'
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

            {/* Interactive 2.2x Magnifying Glass Lens */}
            {magnifyEnabled && lensState.visible && (
              <div
                className="pointer-events-none absolute w-40 h-40 rounded-full border-2 border-white shadow-[0_10px_35px_rgba(0,0,0,0.65)] z-30"
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
          /* Clean Visual Preview Fallback if Image File is Not Yet in public/ or src/assets/ */
          <div className="p-6 text-center h-full flex flex-col items-center justify-center space-y-3">
            <div className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/30">
              {project.fileHint}
            </div>
            <div className="font-display font-bold text-base">{project.title}</div>
            <p className="text-xs opacity-75 max-w-xs leading-relaxed">
              Place <strong>{project.fileHint}</strong> inside your <code>public/</code> or <code>src/assets/</code> folder to enable full vertical scrolling and magnification.
            </p>
          </div>
        )}

        {/* Floating Scroll Hint Pill */}
        {project.isTallWeb && (
          <div className="sticky bottom-2.5 left-0 right-0 flex justify-center pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-medium shadow-md">
              ↕ Scroll inside frame or click to magnify full page
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  HIGH-RES BUILT-IN VISUAL CERTIFICATE REPLICA (IF CERT FILE IS MISSING)    */
/* -------------------------------------------------------------------------- */
function BuiltInCertificateDocument({ certId }) {
  if (certId === 'tesda-ncii') {
    return (
      <div className="w-full h-full max-w-[380px] aspect-[1/1.35] bg-white text-zinc-900 rounded-lg p-4 border-2 border-indigo-900/30 shadow-md flex flex-col justify-between text-center select-none mx-auto overflow-hidden relative">
        <div>
          <div className="w-7 h-7 rounded-full bg-blue-900 text-white text-[8px] font-bold flex items-center justify-center mx-auto mb-1">
            TESDA
          </div>
          <div className="text-[7px] uppercase tracking-wider text-zinc-600">
            Republic of the Philippines
          </div>
          <div className="text-[8px] font-bold tracking-wide text-zinc-800">
            TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
          </div>
          <div className="my-1.5 py-1 bg-yellow-200/80 text-blue-950 font-extrabold text-[11px] tracking-wider">
            NATIONAL CERTIFICATE II
          </div>
          <div className="text-[8px] italic text-zinc-500">in</div>
          <div className="text-[10px] font-extrabold text-zinc-900 tracking-wide">
            COMPUTER SYSTEMS SERVICING
          </div>
          <div className="text-[7px] italic text-zinc-500 mt-1">is hereby awarded to</div>
          <div className="text-[11px] font-extrabold text-zinc-900 mt-0.5">
            GIRBAUD SKY E. VILLAREAL
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-left text-[6px] text-zinc-700 border-t border-b border-zinc-200 py-1.5 my-1">
          <div>
            <div className="font-bold text-zinc-900">BASIC & COMMON</div>
            <div>• Workplace communication</div>
            <div>• Apply quality standards</div>
            <div>• Perform computer operations</div>
          </div>
          <div>
            <div className="font-bold text-zinc-900">CORE COMPETENCIES</div>
            <div>• Install & configure systems</div>
            <div>• Set-up Computer Networks</div>
            <div>• Set-up Computer Servers</div>
          </div>
        </div>
        <div className="flex items-end justify-between text-[6.5px] text-zinc-700 pt-1">
          <div className="text-left">
            <div className="font-bold text-blue-900">TESDA</div>
            <div>Cert No: 26131402035012</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-zinc-900">JOSE FRANCISCO &quot;KIKO&quot; B. BENITEZ</div>
            <div className="text-[6px]">DIRECTOR GENERAL</div>
          </div>
          <div className="text-right">
            <div>Issued: Oct 22, 2026</div>
            <div>Valid: Oct 21, 2031</div>
          </div>
        </div>
      </div>
    );
  }

  if (certId === 'cisco-data-science') {
    return (
      <div className="w-full h-full max-w-[440px] aspect-[1.42/1] bg-white text-zinc-900 rounded-lg p-4 border border-zinc-300 shadow-md flex flex-col justify-between text-center select-none mx-auto">
        <div className="flex items-center justify-start gap-1.5 text-left">
          <span className="font-extrabold text-[10px] tracking-tighter text-zinc-900">CISCO</span>
          <span className="text-[9px] text-sky-600 font-medium">Networking Academy</span>
        </div>
        <div className="space-y-1 my-auto py-2">
          <div className="text-[8px] text-zinc-500">This certificate is awarded to</div>
          <div className="text-sm sm:text-base font-extrabold text-sky-700">
            Girbaud Sky Villareal
          </div>
          <div className="text-[8px] text-zinc-600">for successfully completing</div>
          <div className="text-xs font-extrabold text-sky-800">
            Introduction to Data Science
          </div>
          <div className="text-[7.5px] text-zinc-500">
            offered by DICT-ITU DTC Initiative through the Cisco Networking Academy program.
          </div>
        </div>
        <div className="flex items-end justify-between text-[7.5px] text-zinc-600 border-t border-zinc-200 pt-2">
          <div className="text-left">
            <div className="font-semibold text-zinc-800">John Philip Tan</div>
            <div>Instructor • DICT-ITU DTC Initiative</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-zinc-900">31 Jan 2026</div>
            <div>Completion Date</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-[440px] aspect-[1.42/1] bg-[#FCFBF7] text-zinc-900 rounded-lg p-4 border-2 border-amber-600/50 shadow-md flex flex-col justify-between text-center select-none mx-auto">
      <div>
        <div className="text-[7px] font-bold uppercase tracking-wider text-emerald-950">
          NATIONAL COLLEGE OF BUSINESS AND ARTS – FAIRVIEW CAMPUS
        </div>
        <div className="text-[6.5px] text-zinc-600">
          INFORMATION SYSTEM STUDENT ORGANIZATION COUNCIL
        </div>
        <div className="text-sm font-extrabold tracking-widest text-emerald-900 mt-1 border-b border-emerald-800/30 pb-0.5 inline-block px-4">
          CERTIFICATE OF PARTICIPATION
        </div>
      </div>
      <div className="my-auto py-1">
        <div className="text-[7.5px] text-zinc-600">This Certificate is Proudly Presented to</div>
        <div className="font-serif-editorial italic text-lg sm:text-xl text-emerald-800 leading-tight my-0.5">
          Girbaud Sky E. Villareal
        </div>
        <div className="text-[7.5px] font-bold text-zinc-800">
          “Artificial Intelligence in Education: How Student Can Use AI Responsibly”
        </div>
        <div className="text-[6.5px] text-zinc-600 mt-0.5">
          Given this 5th Day of February 2026 • Essential skills in AI literacy & digital innovation
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 text-[6px] text-zinc-700 border-t border-amber-500/30 pt-1.5">
        <div>
          <div className="font-bold text-emerald-950">Mr. Ryan Lyster Pascua</div>
          <div>ISSOC President</div>
        </div>
        <div>
          <div className="font-bold text-emerald-950">Ms. Cyrille Anne Nery, MSIT</div>
          <div>ISSOC Advisor</div>
        </div>
        <div>
          <div className="font-bold text-emerald-950">Mr. Julius Salonga, MSCS</div>
          <div>IS Department Head</div>
        </div>
      </div>
    </div>
  );
}

function SmartCertImage({ candidates = [], certId, alt, className = '' }) {
  const validCandidates = candidates.filter(Boolean);
  const [idx, setIdx] = useState(0);
  const [allFailed, setAllFailed] = useState(validCandidates.length === 0);

  useEffect(() => {
    setIdx(0);
    setAllFailed(validCandidates.length === 0);
  }, [certId, validCandidates.length]);

  if (allFailed) {
    return <BuiltInCertificateDocument certId={certId} />;
  }

  return (
    <img
      src={validCandidates[idx]}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (idx + 1 < validCandidates.length) {
          setIdx(idx + 1);
        } else {
          setAllFailed(true);
        }
      }}
      className={className}
    />
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
  const portraitCandidates = buildImageCandidates(baseUrl, 'profile', 'profile');
  const [portraitIdx, setPortraitIdx] = useState(0);
  const [photoError, setPhotoError] = useState(false);

  const resumePdfUrl = `${baseUrl}resume.pdf`;

  const rotatingTitles = [
    "I'm Girbaud Sky",
    "I'm a Front-End Developer",
    "I'm a UI/UX Designer",
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTitleFading, setIsTitleFading] = useState(false);

  const [timeString, setTimeString] = useState('');
  const [activeNav, setActiveNav] = useState('about');
  const [copiedLabel, setCopiedLabel] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [openProcessIdx, setOpenProcessIdx] = useState(0);
  const [openExpIds, setOpenExpIds] = useState(['villman', 'undecide']);
  const [phasedView, setPhasedView] = useState('live');
  const [uiCategoryFilter, setUiCategoryFilter] = useState('all');

  /* Fullscreen Scroll & Zoom Inspector Modal State */
  const [inspectorModal, setInspectorModal] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  /* Universal Lightbox State for Certificates */
  const [lightboxData, setLightboxData] = useState(null);

  const [cvFilter, setCvFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);

  /* ------------------------------------------------------------------------ */
  /*  UI DESIGN WORKS DATA (SCROLLABLE & MAGNIFIABLE GALLERY)                 */
  /* ------------------------------------------------------------------------ */
  const uiDesignWorks = [
    {
      id: 'casa-amelinda',
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
        'Designed a vibrant, welcoming full-page resort interface ("Be Our Guest, Feel Your Best") for Casa Amelinda Resort in Brgy. Butas Na Bato, Dingalan, Aurora. Features a clear hero booking callout, categorized event packages (Wedding, Reunion, Birthday, Seminar, Meeting), a 6-card Popular Rooms gallery (Mini Bar, En Suite Tub, Dining Room, Elegant Kitchen, Family Pool, Living Room), and a verified guest review spotlight.',
      highlights: [
        'Structured vertical visual hierarchy guiding guests from hero discovery to room selection and instant booking.',
        'High-contrast gold action buttons paired with coastal azure surfaces for effortless readability.',
      ],
      tags: ['Figma Web UI', 'Hospitality UX', 'Booking Flow', 'Responsive Layout'],
    },
    {
      id: 'heartful-haven-orphanage',
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
        'Crafted an empathetic, story-driven web platform ("Where Every Child Belongs, and Every Heart is Home — Fostering Hope, Creating Homes") for Heartful Haven Orphanage. Designed to build donor trust and inspire community volunteering through warm earthy tones and structured storytelling.',
      highlights: [
        'Dedicated split-grid sections for "Our Mission" and "Our Vision" paired with authentic photography.',
        'Interactive "Meet the Santos family!" testimony carousel and video-backed volunteer onboarding cards (Event Manager, Maintenance & Renovation, Tutoring).',
      ],
      tags: ['Non-Profit Web UI', 'Visual Storytelling', 'Volunteer UX', 'Figma Prototype'],
    },
    {
      id: 'golden-sunset-resort',
      title: 'Golden Sunset — Web Resort Landing Page',
      subtitle: 'Editorial Coastal Travel & Events Landing Page UI',
      category: 'web',
      badge: 'Web Landing Page',
      fileHint: 'webuibrown.png',
      viewportLabel: 'golden-sunset-resort.ph • Scrollable Web Page',
      isTallWeb: true,
      isMobile: false,
      candidates: buildImageCandidates(baseUrl, 'webuibrown', 'webuibrown'),
      description:
        'Designed an earth-toned, editorial resort landing page ("Sunsets: nature’s daily masterpiece.") for Golden Sunset Beach Resorts in Cabangan, Zambales. Balances warm olive-gold tones with clean white space to highlight coastal experiences and event packages.',
      highlights: [
        'Icon-driven Events bar (Wedding, Birthday, Reunion, Team Building, Seminar) for rapid user navigation.',
        'Curated "Popular Scenery" rating cards (Bonfire, Swing, and Pool by the beach) leading into the "Unleash Wanderlust With Sunset" booking section.',
      ],
      tags: ['Landing Page UI', 'Editorial Layout', 'Color Architecture', 'Travel & Resort'],
    },
    {
      id: 'zenara-mobile-ui',
      title: 'Zenara — Social & Gamified Messaging UI',
      subtitle: '3-Screen Mobile App Suite ("Connect with your happiness.")',
      category: 'mobile',
      badge: '3-Screen Mobile UI',
      fileHint: 'ZENARA1.png, ZENARA2.png, ZENARA3.png',
      viewportLabel: 'Zenara Mobile App • Switch & Scroll Screens',
      isTallWeb: false,
      isMobile: true,
      screens: [
        {
          label: '01 / Login UI',
          caption: 'Glassmorphic Authentication & Onboarding (ZENARA1)',
          candidates: buildImageCandidates(baseUrl, 'ZENARA1', 'zenara1'),
        },
        {
          label: '02 / Social Feed',
          caption: 'Stories Tray & Creator Photo Feed (ZENARA2)',
          candidates: buildImageCandidates(baseUrl, 'ZENARA2', 'zenara2'),
        },
        {
          label: '03 / Messages & QuizQuest',
          caption: 'Direct Messaging & Gamified QuizQuest Widget (ZENARA3)',
          candidates: buildImageCandidates(baseUrl, 'ZENARA3', 'zenara3'),
        },
      ],
      description:
        'Designed a cohesive 3-screen mobile social networking and messaging application ("Connect with your happiness.") featuring a lotus brand identity, soft glassmorphic login cards, an interactive stories and creator feed, and a gamified direct messaging inbox.',
      highlights: [
        'Screen 1 (ZENARA1): Frosted-glass login interface over fluid magenta-violet ambient shapes.',
        'Screen 2 & 3 (ZENARA2 & ZENARA3): Creator stories tray, high-engagement photo feed, active status thought bubbles ("Hi!", "Follow me!"), and an integrated "Play QuizQuest" social gaming bar (Lvl. 128 • Exp. 2456/3000).',
      ],
      tags: ['Mobile App UI', 'Glassmorphism', 'Social & Messaging UX', 'Gamification'],
    },
    {
      id: 'caiantrix-ui',
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
        'Redesigned the operational user interface for a retail grocery management system to streamline daily cashier checkout workflows, reduce item lookup friction, and improve real-time SKU inventory tracking.',
      highlights: [
        'High-contrast dashboard metrics for active SKUs, stock sync accuracy, and rapid category filtering.',
        'Structured for fast keyboard and touch interaction during peak store hours.',
      ],
      tags: ['System UI', 'Operations UX', 'POS Interface', 'Inventory Dashboard'],
    },
  ];

  const filteredUiWorks =
    uiCategoryFilter === 'all'
      ? uiDesignWorks
      : uiDesignWorks.filter((w) => w.category === uiCategoryFilter);

  /* Official Certifications Data */
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
        'Certified in installing and configuring computer systems, setting up computer networks and servers, and maintaining and repairing enterprise computer systems and networks.',
      tags: ['Computer Systems', 'Computer Networks', 'Server Setup', 'System Maintenance'],
    },
    {
      id: 'cisco-data-science',
      title: 'Introduction to Data Science',
      issuer: 'Cisco Networking Academy • DICT-ITU DTC Initiative',
      date: 'Completed Jan 31, 2026',
      credentialId: 'Instructor: John Philip Tan',
      badge: 'Cisco Verified',
      candidates: buildImageCandidates(baseUrl, 'CISCOCERT', 'cisco'),
      description:
        'Successfully completed training in data science principles, analytics workflows, and modern data-driven decision systems.',
      tags: ['Data Science', 'Analytics', 'Cisco NetAcad', 'DICT-ITU'],
    },
    {
      id: 'ncba-ai-education',
      title: 'Artificial Intelligence in Education: How Student Can Use AI Responsibly',
      issuer: 'NCBA Fairview Campus • Information System Student Organization Council',
      date: 'Given Feb 5, 2026',
      credentialId: 'ISSOC Webinar Series',
      badge: 'AI Literacy',
      candidates: buildImageCandidates(baseUrl, 'NCBA', 'ncba'),
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
      // ignore storage errors
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
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date());
      setTimeString(formatted);
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'about',
        'process',
        'work',
        'ui-works',
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
    setInspectorModal({
      project,
      screenIdx: initialScreenIdx,
    });
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
      // ignore storage errors
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
        'Every effective product starts with active listening. Drawing from my experience in client consultation and technical sales, I map real user pain points, business goals, and daily workflows before sketching a single screen.',
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

  const textMain = isDark ? 'text-[#F5F3EF]' : 'text-[#1C1917]';
  const textSub = isDark ? 'text-[#A8A29E]' : 'text-[#57534E]';
  const textSoft = isDark ? 'text-[#78716C]' : 'text-[#78716C]';
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

        {/* Plain Circle Planet 1 (Upper-Left) */}
        <div
          className="absolute top-[14%] left-[4%] sm:left-[8%] w-64 h-64 sm:w-96 sm:h-96 flex items-center justify-center animate-calm-orbit-1"
          style={{ perspective: '900px' }}
        >
          <div className={`w-36 h-36 sm:w-56 sm:h-56 rounded-full border ${plainCircleBorder}`} />
          <div className={`absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border ${plainRingBorder} animate-plain-ring-1`}>
            <span className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${isDark ? 'bg-white/25' : 'bg-stone-800/25'}`} />
          </div>
        </div>

        {/* Plain Circle Planet 2 (Lower-Right) */}
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

      {/* FLOATING NAVIGATION BAR */}
      <header className="sticky top-3 sm:top-4 z-40 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-1">
        <div
          className={`backdrop-blur-2xl rounded-full px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between border transition-all duration-500 ${
            isDark
              ? 'bg-[#1A1917]/85 border-[#2E2C29] shadow-2xl shadow-black/50'
              : 'bg-white/85 border-[#E7E5E0] shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          }`}
        >
          <a href="#about" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-serif-editorial italic text-base sm:text-lg shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                isDark ? 'bg-[#F5F3EF] text-[#121110]' : 'bg-[#1C1917] text-[#FAF8F5]'
              }`}
            >
              G
            </div>
            <div className="truncate">
              <span className={`font-display font-bold text-xs sm:text-sm tracking-tight block truncate ${textMain}`}>
                Girbaud Sky Villareal
              </span>
              <span className={`text-[10px] sm:text-[11px] hidden sm:block truncate ${textSoft}`}>
                UI/UX • Front-End • Tech Executive
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'process', label: 'Process' },
              { id: 'work', label: 'PHASED' },
              { id: 'ui-works', label: 'UI Designs' },
              { id: 'experience', label: 'Resume/CV' },
              { id: 'certifications', label: 'Certificates' },
              { id: 'capabilities', label: 'Skills' },
              { id: 'ratings', label: 'Ratings' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeNav === item.id
                    ? isDark
                      ? 'bg-[#F5F3EF] text-[#121110] font-semibold'
                      : 'bg-[#1C1917] text-[#FAF8F5] font-semibold'
                    : `${textSub} hover:${textMain}`
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={resumePdfUrl}
              download="Girbaud_Sky_Villareal_Resume_CV.pdf"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${pillBg}`}
            >
              <span>Resume/CV</span>
              <span>↓</span>
            </a>

            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle color theme"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? 'bg-[#242220] border-[#35322F] text-amber-200 hover:bg-[#2E2C29]'
                  : 'bg-[#F3F1EC] border-[#E5E2DC] text-[#44403C] hover:bg-[#E7E5E0]'
              }`}
            >
              {isDark ? '☀' : '☾'}
            </button>

            <a
              href="mailto:girbaudforwork@gmail.com"
              className={`hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all duration-300 ${
                isDark
                  ? 'bg-[#F5F3EF] text-[#121110] hover:bg-white'
                  : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#35312E]'
              }`}
            >
              <span>Let’s Talk</span>
              <span>↗</span>
            </a>

            <button
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

        {/* Mobile Drawer */}
        <div className={`lg:hidden accordion-grid ${isMobileMenuOpen ? 'open mt-2' : ''}`}>
          <div className="accordion-inner">
            <div
              className={`p-4 rounded-3xl border backdrop-blur-2xl shadow-xl space-y-1.5 ${
                isDark ? 'bg-[#1A1917]/95 border-[#2E2C29]' : 'bg-white/95 border-[#E7E5E0]'
              }`}
            >
              {[
                { id: 'about', label: 'About & Links' },
                { id: 'process', label: 'Design Process' },
                { id: 'work', label: 'Featured System (PHASED)' },
                { id: 'ui-works', label: 'UI Design Works Studio (5)' },
                { id: 'experience', label: 'Experience & Resume/CV' },
                { id: 'certifications', label: 'Verified Certifications (3)' },
                { id: 'capabilities', label: 'Capabilities & Skills' },
                { id: 'ratings', label: 'Performance Ratings' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-display font-semibold transition-colors ${
                    activeNav === item.id ? pillBg : textMain
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 flex gap-2">
                <a
                  href={resumePdfUrl}
                  download="Girbaud_Sky_Villareal_Resume_CV.pdf"
                  className={`flex-1 text-center py-2.5 rounded-2xl text-xs font-display font-semibold border ${pillBg}`}
                >
                  Download Resume/CV ↓
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-24 space-y-20 sm:space-y-28 relative z-10">
        
        {/* SECTION 1: HERO & COMPACT PERMANENT PORTRAIT */}
        <section id="about" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-8 space-y-6 order-2 lg:order-1">
              <div className="reveal flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border ${sageBadge}`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for UI/UX, Front-End & Technical Roles
                </span>
                <span className={`text-xs ${textSoft}`}>
                  Quezon City, PH {timeString && `• ${timeString}`}
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
                  With a foundation in Information Technology, commercial illustration, and technical executive operations, I bridge{' '}
                  <strong className={`font-semibold ${textMain}`}>thoughtful user interface design</strong>,{' '}
                  <strong className={`font-semibold ${textMain}`}>clean React & MERN engineering</strong>, and{' '}
                  <strong className={`font-semibold ${textMain}`}>clear client communication</strong> — turning complex systems into calm, intuitive digital experiences.
                </p>
              </div>

              <div className="reveal pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
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
                    onClick={() => copyToClipboard('+639206290342', 'phone number')}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className={`text-xs font-semibold ${textMain}`}>+63 920 629 0342</div>
                      <div className={`text-[11px] ${textSoft}`}>Bagong Pag-Asa, QC</div>
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
                        UI/UX & Front-End
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-x-2.5 bottom-2.5 px-3 py-2 rounded-xl backdrop-blur-xl bg-black/55 border border-white/15 text-white flex items-center justify-between">
                    <div className="truncate">
                      <div className="font-display font-bold text-[11px] tracking-tight truncate">
                        Girbaud Sky Villareal
                      </div>
                      <div className="text-[10px] text-white/75 truncate">
                        BSIT ’26 • Quezon City
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
                    <div className={`font-serif-editorial italic text-base leading-none ${textMain}`}>NC II</div>
                    <div className={`text-[9px] mt-0.5 ${textSoft}`}>TESDA CSS</div>
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
                      key={tab.id}
                      onClick={() => setPhasedView(tab.id)}
                      className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all ${
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

            <div className={`p-5 sm:p-7 border-t flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${borderLine}`}>
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${textMain}`}>PHASED</h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border ${pillBg}`}>
                    PHishing And Social Engineering Detection
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${textSub}`}>
                  An AI-powered cybersecurity platform engineered with the MERN stack and React Native to detect phishing links and social engineering threats across web and mobile.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {['UI/UX Design', 'MERN Stack', 'React Native', 'AI Security'].map((tag) => (
                  <span key={tag} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>
                    {tag}
                  </span>
                ))}
                <a
                  href="https://phased.undecide.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${sageBadge}`}
                >
                  phased.undecide.dev ↗
                </a>
              </div>
            </div>
          </AestheticCard>
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 4: UI/UX DESIGN WORKS STUDIO (SCROLLABLE & MAGNIFIABLE)     */}
        {/* ==================================================================== */}
        <section id="ui-works" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b pb-4 ${borderLine}`}>
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
              <p className={`text-xs sm:text-sm mt-1.5 max-w-2xl ${textSub}`}>
                Scroll vertically inside any web preview frame, toggle the <strong>🔍 Magnify</strong> lens to inspect pixel details, or open the fullscreen zoomable inspector.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className={`inline-flex flex-wrap p-1 rounded-full border self-start ${pillBg}`}>
              {[
                { id: 'all', label: 'All UI Works (5)' },
                { id: 'web', label: 'Web Landing Pages (3)' },
                { id: 'mobile', label: 'Mobile App UI (1)' },
                { id: 'system', label: 'System / POS UI (1)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setUiCategoryFilter(tab.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
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
          </div>

          {/* UI Design Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">
            {filteredUiWorks.map((project) => (
              <AestheticCard
                key={project.id}
                isDark={isDark}
                className="p-4 sm:p-6 flex flex-col justify-between"
              >
                <div className="flex-1 flex flex-col">
                  {/* Scrollable + Magnifiable Viewport */}
                  <ScrollableUiViewport
                    project={project}
                    isDark={isDark}
                    onOpenInspector={handleOpenUiInspector}
                  />

                  {/* Project Description & Details */}
                  <div className="mt-5 space-y-2.5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-3 py-0.5 rounded-full text-[10px] font-semibold border ${sageBadge}`}>
                        {project.badge}
                      </span>
                      <span className={`text-[11px] font-medium ${textSoft}`}>
                        {project.subtitle}
                      </span>
                    </div>

                    <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${textMain}`}>
                      {project.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${textSub}`}>
                      {project.description}
                    </p>

                    <ul className={`space-y-1.5 pt-1 text-xs leading-relaxed ${textSub}`}>
                      {project.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Anchored Tags & Fullscreen Zoom Trigger */}
                <div className={`mt-6 pt-4 border-t flex flex-col justify-end gap-3.5 ${borderLine}`}>
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
                      className={`w-full py-2.5 rounded-xl text-xs font-display font-semibold border transition-all flex items-center justify-center gap-2 ${
                        isDark
                          ? 'bg-[#F5F3EF] text-[#121110] border-[#F5F3EF] hover:bg-white'
                          : 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] hover:bg-[#35312E]'
                      }`}
                    >
                      <span>⤢ Open Fullscreen Scroll & Magnifier</span>
                    </button>
                  )}
                </div>
              </AestheticCard>
            ))}
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE RESUME/CV WITH SMOOTH ACCORDIONS */}
        <section id="experience" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                04 / Resume/CV
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Experience &{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  academic background
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className={`inline-flex p-1 rounded-full border ${pillBg}`}>
                {[
                  { id: 'all', label: 'Full Resume/CV' },
                  { id: 'work', label: 'Work History' },
                  { id: 'education', label: 'Education & Community' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCvFilter(tab.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
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
                          IT Practicum & On-the-Job Training (296 Hours)
                        </h4>
                        <span className={`text-xs shrink-0 ${textSoft}`}>2026</span>
                      </div>
                      <p className={`text-xs mt-1 leading-relaxed ${textSub}`}>
                        Applied hardware diagnostics, technical sales consultancy, and operational systems management.
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

        {/* SECTION 6: VERIFIED CERTIFICATIONS GALLERY (ALIGNED BOTTOM BUTTONS) */}
        <section id="certifications" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                05 / Official Credentials & Licenses
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
                    <SmartCertImage
                      candidates={cert.candidates}
                      certId={cert.id}
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

        {/* SECTION 7: CAPABILITIES & TOOLKIT */}
        <section id="capabilities" className="reveal space-y-6 scroll-mt-24">
          <div className={`border-b pb-4 ${borderLine}`}>
            <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
              06 / Capabilities
            </span>
            <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
              Design & technical{' '}
              <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                toolkit
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
            <AestheticCard isDark={isDark} className="p-6">
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>01. UI/UX & Visuals</div>
              <p className={`text-xs mb-4 ${textSoft}`}>Human-centered design & branding</p>
              <div className="flex flex-wrap gap-1.5">
                {['UI/UX Design', 'Figma Prototyping', 'Wireframing', 'Design Systems', 'Graphic Design', 'Adobe Photoshop', 'Canva', 'Visual Illustration'].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>{skill}</span>
                ))}
              </div>
            </AestheticCard>

            <AestheticCard isDark={isDark} className="p-6">
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>02. Front-End & Code</div>
              <p className={`text-xs mb-4 ${textSoft}`}>Modern web & mobile engineering</p>
              <div className="flex flex-wrap gap-1.5">
                {['React.js', 'React Native', 'MERN Stack', 'Tailwind CSS', 'JavaScript (ES6+)', 'Node.js & Express', 'MongoDB', 'Vite'].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>{skill}</span>
                ))}
              </div>
            </AestheticCard>

            <AestheticCard isDark={isDark} className="p-6">
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>03. Systems & Ops</div>
              <p className={`text-xs mb-4 ${textSoft}`}>Hardware, networks & accounting</p>
              <div className="flex flex-wrap gap-1.5">
                {['Technical Sales', 'Computer Systems Servicing', 'Active Directory (Win Server)', 'Sales Accounting', 'Financial Reporting', 'Client Consultation'].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>{skill}</span>
                ))}
              </div>
            </AestheticCard>
          </div>
        </section>

        {/* SECTION 8: PERFORMANCE RATINGS & FEEDBACK */}
        <section id="ratings" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                07 / Performance & Feedback
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
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border bg-transparent focus:outline-none ${borderLine} ${textMain}`}
                  />
                  <input
                    type="text"
                    value={reviewerRole}
                    onChange={(e) => setReviewerRole(e.target.value)}
                    placeholder="Role or Company (Optional)"
                    className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border bg-transparent focus:outline-none ${borderLine} ${textMain}`}
                  />
                </div>

                <textarea
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

      {/* ---------------------------------------------------------------------- */}
      {/*  FULLSCREEN SCROLLABLE & MAGNIFIABLE UI DESIGN INSPECTOR MODAL         */}
      {/* ---------------------------------------------------------------------- */}
      {inspectorModal && (
        <div
          onClick={() => setInspectorModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-3 sm:p-6"
        >
          {/* Top Inspector Toolbar */}
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

            {/* Screen Switcher (If Zenara Multi-Screen) */}
            {inspectorModal.project.screens && (
              <div className="flex items-center gap-1 bg-black/50 p-1 rounded-full border border-white/10">
                {inspectorModal.project.screens.map((scr, idx) => (
                  <button
                    key={scr.label}
                    type="button"
                    onClick={() =>
                      setInspectorModal((prev) => ({ ...prev, screenIdx: idx }))
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
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

            {/* Magnification Controls (100% -> 250%) */}
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

          {/* Scrollable High-Resolution Canvas */}
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
                  <SmartCertImage
                    candidates={cands}
                    certId={proj.id}
                    alt={proj.title}
                    className="w-full h-auto block rounded-xl shadow-2xl mx-auto"
                  />
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Universal Fullscreen Lightbox for Certificates & PHASED UI Artwork */}
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
            <SmartCertImage
              candidates={lightboxData.candidates}
              certId={lightboxData.certId}
              alt={lightboxData.title}
              className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-xl shadow-2xl mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}