import { useState, useEffect, useRef } from 'react';
import phasedImage from './assets/phased.png';

/* -------------------------------------------------------------------------- */
/*  SOFT AESTHETIC SURFACE CARD WITH GENTLE HOVER GLOW                        */
/* -------------------------------------------------------------------------- */
function AestheticCard({ children, className = '', isDark = false }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-[2rem] transition-all duration-500 ${
        isDark
          ? 'bg-[#1A1917]/90 border border-[#2E2C29] hover:border-[#44403C] shadow-2xl shadow-black/40'
          : 'bg-white/85 border border-[#E7E5E0] hover:border-[#D6D3CD] shadow-[0_12px_40px_-15px_rgba(28,25,23,0.06)] hover:shadow-[0_20px_50px_-15px_rgba(28,25,23,0.1)]'
      } backdrop-blur-xl ${className}`}
    >
      {/* Subtle warm radial glow following cursor */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-700 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isDark
            ? `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(214, 211, 205, 0.055), transparent 45%)`
            : `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(168, 162, 158, 0.08), transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MAIN PORTFOLIO COMPONENT                                                  */
/* -------------------------------------------------------------------------- */
export default function App() {
  /* Defaults to Calm Warm Alabaster Light Mode ('light') */
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('gsv-aesthetic-theme');
      return saved ? saved === 'dark' : false;
    } catch {
      return false;
    }
  });

  /* Portrait Photo State: Loads /profile.jpg from public folder or custom preview */
  const defaultPublicPhoto = `${import.meta.env.BASE_URL}profile.jpg`;
  const [customPhoto, setCustomPhoto] = useState(() => {
    try {
      return localStorage.getItem('gsv-custom-portrait') || '';
    } catch {
      return '';
    }
  });
  const [photoLoadError, setPhotoLoadError] = useState(false);
  const fileInputRef = useRef(null);

  const [timeString, setTimeString] = useState('');
  const [activeNav, setActiveNav] = useState('about');
  const [copiedLabel, setCopiedLabel] = useState('');
  const [activeProcess, setActiveProcess] = useState(0);
  const [phasedTab, setPhasedTab] = useState('showcase');
  const [cvFilter, setCvFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* Persist theme choice */
  useEffect(() => {
    try {
      localStorage.setItem('gsv-aesthetic-theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
    document.documentElement.style.backgroundColor = isDark ? '#121110' : '#FAF8F5';
  }, [isDark]);

  /* Live Manila Clock */
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      setTimeString(formatted);
    };
    updateClock();
    const interval = setInterval(updateClock, 15000);
    return () => clearInterval(interval);
  }, []);

  /* Choreographed Scroll Reveal Observer */
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
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

  /* Active Section Spy */
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'process', 'work', 'experience', 'capabilities'];
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

  /* Escape key handler for Lightbox */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /* Handle Local Photo Preview Upload */
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setCustomPhoto(result);
        setPhotoLoadError(false);
        try {
          localStorage.setItem('gsv-custom-portrait', result);
        } catch {
          // ignore quota errors if image is huge
        }
      }
    };
    reader.readAsDataURL(file);
  };

  /* Copy Helper */
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(''), 2500);
  };

  /* UI/UX Design Process Data */
  const designProcess = [
    {
      step: '01',
      title: 'Empathize & Discover',
      subtitle: 'Understanding human & operational needs',
      description:
        'Every great interface starts with listening. Drawing from my experience in client consultation and technical sales, I begin by mapping real user pain points, business constraints, and daily operational workflows before drawing a single pixel.',
      deliverables: ['User & Stakeholder Interviews', 'Workflow Auditing', 'Information Architecture'],
    },
    {
      step: '02',
      title: 'Structure & Wireframe',
      subtitle: 'Clarity over complexity',
      description:
        'I translate abstract requirements into low-friction user flows and clean wireframes. The goal is to eliminate unnecessary clicks and cognitive overload so users always know where they are and what to do next.',
      deliverables: ['Interactive Wireframes', 'User Journey Mapping', 'Screen Flow Logic'],
    },
    {
      step: '03',
      title: 'Visual Craft & Prototyping',
      subtitle: 'Calm, intentional interface systems',
      description:
        'Using Figma and my background in commercial illustration, I craft cohesive design systems with balanced typography, accessible contrast, and tactile micro-interactions that feel natural and trustworthy.',
      deliverables: ['Figma Design Systems', 'High-Fidelity Prototypes', 'Visual Brand Identity'],
    },
    {
      step: '04',
      title: 'Front-End Engineering',
      subtitle: 'Bringing designs to life in production code',
      description:
        'Because I engineer what I design using React, React Native, and Tailwind CSS, nothing gets lost in handoff. Every animation, responsive breakpoint, and state transition is built true to the original vision.',
      deliverables: ['React & React Native UI', 'MERN Stack Integration', 'Responsive Architecture'],
    },
  ];

  /* Experience Data */
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
      period: '2025 — Present',
      active: true,
      highlights: [
        'Lead the user interface design and front-end engineering for AI-powered web and mobile applications using the MERN stack and React Native.',
        'Transform complex security workflows into intuitive wireframes, Figma design systems, and responsive React components.',
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
        'Guide projects from early moodboards and wireframes through to polished, production-ready assets.',
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

  /* Theme Palette Tokens */
  const textMain = isDark ? 'text-[#F5F3EF]' : 'text-[#1C1917]';
  const textSub = isDark ? 'text-[#A8A29E]' : 'text-[#57534E]';
  const textSoft = isDark ? 'text-[#78716C]' : 'text-[#78716C]';
  const borderLine = isDark ? 'border-[#2E2C29]' : 'border-[#E7E5E0]';
  const pillBg = isDark ? 'bg-[#242220] text-[#E7E5E0] border-[#35322F]' : 'bg-[#F3F1EC] text-[#44403C] border-[#E5E2DC]';
  const sageBadge = isDark
    ? 'bg-[#23312B] text-[#9CC5B0] border-[#31453C]'
    : 'bg-[#EBF2EE] text-[#355245] border-[#D5E3DC]';

  const activePortraitSrc = customPhoto || defaultPublicPhoto;

  return (
    <div
      className={`min-h-screen transition-colors duration-700 relative overflow-x-hidden ${
        isDark
          ? 'bg-[#121110] text-[#F5F3EF] selection:bg-[#E7E5E0] selection:text-[#121110]'
          : 'bg-[#FAF8F5] text-[#1C1917] selection:bg-[#1C1917] selection:text-[#FAF8F5]'
      }`}
    >
      {/* Hidden File Input for Instant Portrait Testing */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* Soft Organic Ambient Background Aura */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 no-print">
        <div
          className={`absolute -top-40 right-1/4 w-[650px] h-[650px] rounded-full blur-[130px] transition-opacity duration-700 ${
            isDark ? 'bg-[#2E3B34]/20' : 'bg-[#E4ECE7]/70'
          }`}
        />
        <div
          className={`absolute top-[35%] -left-32 w-[550px] h-[550px] rounded-full blur-[130px] transition-opacity duration-700 ${
            isDark ? 'bg-[#382E27]/20' : 'bg-[#F2EAE1]/80'
          }`}
        />
      </div>

      {/* Gentle Copy Notification Pill */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full font-display font-semibold text-xs shadow-xl transition-all duration-500 no-print ${
          isDark ? 'bg-[#F5F3EF] text-[#121110]' : 'bg-[#1C1917] text-[#FAF8F5]'
        } ${
          copiedLabel ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Copied {copiedLabel} to clipboard</span>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/*  FLOATING EDITORIAL NAVIGATION BAR                                     */}
      {/* ---------------------------------------------------------------------- */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4 sm:px-8 pt-2 no-print">
        <div
          className={`backdrop-blur-2xl rounded-full px-4 sm:px-6 h-16 flex items-center justify-between border transition-all duration-500 ${
            isDark
              ? 'bg-[#1A1917]/80 border-[#2E2C29] shadow-2xl shadow-black/50'
              : 'bg-white/80 border-[#E7E5E0] shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          }`}
        >
          {/* Left: Monogram & Name */}
          <a href="#about" className="flex items-center gap-3 group">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-serif-editorial italic text-lg transition-transform duration-300 group-hover:scale-105 ${
                isDark ? 'bg-[#F5F3EF] text-[#121110]' : 'bg-[#1C1917] text-[#FAF8F5]'
              }`}
            >
              G
            </div>
            <div>
              <span className={`font-display font-bold text-xs sm:text-sm tracking-tight block ${textMain}`}>
                Girbaud Sky Villareal
              </span>
              <span className={`text-[11px] hidden sm:block ${textSoft}`}>
                UI/UX Designer & Front-End Developer
              </span>
            </div>
          </a>

          {/* Center: Smooth Section Pills (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'about', label: 'Story' },
              { id: 'process', label: 'Process' },
              { id: 'work', label: 'Selected Work' },
              { id: 'experience', label: 'Experience & CV' },
              { id: 'capabilities', label: 'Capabilities' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
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

          {/* Right: Theme Switcher, Mobile Menu & Let's Talk */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle color theme"
              title={isDark ? 'Switch to Calm Light Mode' : 'Switch to Velvet Dark Mode'}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? 'bg-[#242220] border-[#35322F] text-amber-200 hover:bg-[#2E2C29]'
                  : 'bg-[#F3F1EC] border-[#E5E2DC] text-[#44403C] hover:bg-[#E7E5E0]'
              }`}
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <a
              href="mailto:girbaudforwork@gmail.com"
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all duration-300 ${
                isDark
                  ? 'bg-[#F5F3EF] text-[#121110] hover:bg-white'
                  : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#35312E]'
              }`}
            >
              <span>Let’s Talk</span>
              <span>↗</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden w-9 h-9 rounded-full border flex items-center justify-center ${
                isDark ? 'border-[#2E2C29] text-[#F5F3EF]' : 'border-[#E7E5E0] text-[#1C1917]'
              }`}
              aria-label="Open navigation menu"
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

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden mt-2 p-5 rounded-3xl border backdrop-blur-2xl shadow-xl space-y-3 ${
              isDark ? 'bg-[#1A1917]/95 border-[#2E2C29]' : 'bg-white/95 border-[#E7E5E0]'
            }`}
          >
            {[
              { id: 'about', label: 'Story & Portrait' },
              { id: 'process', label: 'Design Process' },
              { id: 'work', label: 'Selected Work' },
              { id: 'experience', label: 'Experience & CV' },
              { id: 'capabilities', label: 'Capabilities' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-sm font-display font-semibold ${textMain}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ---------------------------------------------------------------------- */}
      {/*  MAIN CONTENT CONTAINER                                                */}
      {/* ---------------------------------------------------------------------- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-28 space-y-24 sm:space-y-32 relative z-10">
        
        {/* ==================================================================== */}
        {/*  SECTION 1: HERO, EDITORIAL INTRO & PORTRAIT SHOWCASE                */}
        {/* ==================================================================== */}
        <section id="about" className="scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Story & Linktree Hub (7 Columns) */}
            <div className="lg:col-span-7 space-y-7">
              <div className="reveal flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border ${sageBadge}`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for UI/UX, Front-End & Tech Roles
                </span>
                <span className={`text-xs ${textSoft}`}>
                  Quezon City, PH {timeString && `• ${timeString}`}
                </span>
              </div>

              <div className="reveal delay-100 space-y-4">
                <h1 className={`font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.12] ${textMain}`}>
                  Designing{' '}
                  <span className="font-serif-editorial italic font-normal text-5xl sm:text-6xl lg:text-[4rem] px-1">
                    calm, intuitive
                  </span>{' '}
                  digital products with human warmth.
                </h1>

                <p className={`text-base sm:text-lg leading-relaxed max-w-2xl font-normal ${textSub}`}>
                  Hello, I’m <strong className={`font-semibold ${textMain}`}>Girbaud Sky Villareal</strong> — a UI/UX Designer, Front-End Developer, and Technical Executive with a background in visual illustration. I bridge thoughtful interface design, clean React & MERN code, and clear client communication.
                </p>
              </div>

              {/* Soft Aesthetic Linktree & Quick Contact Hub */}
              <div className="reveal delay-200 pt-2">
                <div className={`text-[11px] uppercase tracking-widest font-semibold mb-3 ${textSoft}`}>
                  Direct Channels & Quick Links
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email Pill */}
                  <button
                    onClick={() => copyToClipboard('girbaudforwork@gmail.com', 'email address')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${pillBg}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="truncate">
                        <div className={`text-xs font-semibold truncate ${textMain}`}>
                          girbaudforwork@gmail.com
                        </div>
                        <div className={`text-[11px] ${textSoft}`}>
                          {copiedLabel === 'email address' ? '✓ Copied to clipboard' : 'Click to copy email'}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${pillBg}`}>
                      {copiedLabel === 'email address' ? 'Copied' : 'Copy'}
                    </span>
                  </button>

                  {/* Phone Pill */}
                  <button
                    onClick={() => copyToClipboard('+639206290342', 'phone number')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${pillBg}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${textMain}`}>+63 920 629 0342</div>
                        <div className={`text-[11px] ${textSoft}`}>Bagong Pag-Asa, QC</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${pillBg}`}>
                      {copiedLabel === 'phone number' ? 'Copied' : 'Copy'}
                    </span>
                  </button>

                  {/* GitHub Profile Pill */}
                  <a
                    href="https://github.com/SoraNyx942002"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${pillBg}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${textMain}`}>GitHub Portfolio</div>
                        <div className={`text-[11px] ${textSoft}`}>@SoraNyx942002</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${pillBg} group-hover:translate-x-0.5 transition-transform`}>
                      Visit ↗
                    </span>
                  </a>

                  {/* Save PDF Resume Pill */}
                  <button
                    onClick={() => window.print()}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${pillBg}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${textMain}`}>Curriculum Vitae</div>
                        <div className={`text-[11px] ${textSoft}`}>Print / Save as PDF</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${pillBg}`}>
                      PDF ↓
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Dedicated Portrait Section (5 Columns) */}
            <div className="lg:col-span-5 reveal delay-200">
              <AestheticCard isDark={isDark} className="p-3 sm:p-4">
                <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] bg-gradient-to-b from-[#E5E0D8] to-[#D6CFC5] dark:from-[#262421] dark:to-[#1C1A17] group">
                  
                  {/* Portrait Image (Loads public/profile.jpg or uploaded preview) */}
                  {!photoLoadError ? (
                    <img
                      src={activePortraitSrc}
                      alt="Girbaud Sky Villareal Portrait"
                      onError={() => setPhotoLoadError(true)}
                      className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  ) : (
                    /* Editorial Portrait Fallback if public/profile.jpg isn't dropped in yet */
                    <div
                      className={`w-full h-full flex flex-col items-center justify-center p-8 text-center ${
                        isDark
                          ? 'bg-gradient-to-br from-[#23211E] via-[#1A1917] to-[#292623]'
                          : 'bg-gradient-to-br from-[#F3EFEA] via-[#EAE4DC] to-[#DFD8CE]'
                      }`}
                    >
                      <div
                        className={`w-24 h-24 rounded-full border flex items-center justify-center font-serif-editorial italic text-5xl mb-5 shadow-inner ${
                          isDark
                            ? 'bg-[#121110]/60 border-[#3A3632] text-[#F5F3EF]'
                            : 'bg-white/70 border-white text-[#1C1917]'
                        }`}
                      >
                        GSV
                      </div>
                      <p className={`font-display font-bold text-base ${textMain}`}>
                        Your Portrait Section
                      </p>
                      <p className={`text-xs leading-relaxed mt-1.5 max-w-xs ${textSub}`}>
                        Drop your photo named <code className="font-semibold">profile.jpg</code> into the <code className="font-semibold">public</code> folder, or click below to preview a photo right now.
                      </p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`mt-5 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all shadow-sm ${
                          isDark
                            ? 'bg-[#F5F3EF] text-[#121110] hover:bg-white'
                            : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#35312E]'
                        }`}
                      >
                        Upload / Preview Photo
                      </button>
                    </div>
                  )}

                  {/* Subtle Bottom Editorial Caption Overlay */}
                  <div className="absolute inset-x-3 bottom-3 p-3.5 rounded-2xl backdrop-blur-xl bg-black/55 border border-white/15 text-white flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-xs tracking-tight">
                        Girbaud Sky Villareal
                      </div>
                      <div className="text-[11px] text-white/75">
                        BSIT ’26 • Designer & Developer
                      </div>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors no-print"
                      title="Change or test portrait photo"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Below-Portrait Quick Highlights */}
                <div className="grid grid-cols-3 gap-2 pt-3 px-1 text-center">
                  <div className={`p-2.5 rounded-2xl border ${pillBg}`}>
                    <div className={`font-serif-editorial italic text-xl leading-none ${textMain}`}>7+ yrs</div>
                    <div className={`text-[10px] mt-1 ${textSoft}`}>Visual & UI Craft</div>
                  </div>
                  <div className={`p-2.5 rounded-2xl border ${pillBg}`}>
                    <div className={`font-serif-editorial italic text-xl leading-none ${textMain}`}>BSIT</div>
                    <div className={`text-[10px] mt-1 ${textSoft}`}>QCU Graduate ’26</div>
                  </div>
                  <div className={`p-2.5 rounded-2xl border ${pillBg}`}>
                    <div className={`font-serif-editorial italic text-xl leading-none ${textMain}`}>NC II</div>
                    <div className={`text-[10px] mt-1 ${textSoft}`}>TESDA Certified</div>
                  </div>
                </div>
              </AestheticCard>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 2: INTERACTIVE UI/UX DESIGN PHILOSOPHY & PROCESS            */}
        {/* ==================================================================== */}
        <section id="process" className="reveal space-y-8 scroll-mt-28">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-5 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                01 / Design Philosophy
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                How I approach{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  product design
                </span>
              </h2>
            </div>
            <p className={`text-xs sm:text-sm max-w-md ${textSub}`}>
              Great design isn’t about flashy decoration—it’s about making complex systems feel calm, obvious, and human.
            </p>
          </div>

          {/* Interactive 4-Step Process Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
              {designProcess.map((item, idx) => {
                const isSelected = activeProcess === idx;
                return (
                  <button
                    key={item.step}
                    onClick={() => setActiveProcess(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-3xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? isDark
                          ? 'bg-[#F5F3EF] text-[#121110] border-[#F5F3EF] shadow-lg'
                          : 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-lg'
                        : isDark
                        ? 'bg-[#1A1917]/70 hover:bg-[#242220] border-[#2E2C29] text-[#F5F3EF]'
                        : 'bg-white/75 hover:bg-white border-[#E7E5E0] text-[#1C1917]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-serif-editorial italic text-2xl ${
                          isSelected ? 'opacity-90' : textSoft
                        }`}
                      >
                        {item.step}
                      </span>
                      <div>
                        <div className="font-display font-bold text-sm sm:text-base">
                          {item.title}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSelected ? 'opacity-80' : textSoft
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm opacity-70">→</span>
                  </button>
                );
              })}
            </div>

            {/* Active Process Stage Detail Card */}
            <div className="lg:col-span-7">
              <AestheticCard isDark={isDark} className="p-7 sm:p-10 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-medium border ${sageBadge}`}>
                      Stage {designProcess[activeProcess].step} of 04
                    </span>
                    <span className={`font-serif-editorial italic text-3xl ${textSoft}`}>
                      {designProcess[activeProcess].title}
                    </span>
                  </div>

                  <h3 className={`font-display text-2xl sm:text-3xl font-bold tracking-tight pt-2 ${textMain}`}>
                    {designProcess[activeProcess].subtitle}
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed ${textSub}`}>
                    {designProcess[activeProcess].description}
                  </p>
                </div>

                <div className={`pt-6 mt-8 border-t ${borderLine}`}>
                  <div className={`text-[11px] uppercase tracking-widest font-semibold mb-3 ${textSoft}`}>
                    Key Deliverables & Focus
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {designProcess[activeProcess].deliverables.map((del) => (
                      <span
                        key={del}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${pillBg}`}
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </AestheticCard>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 3: SELECTED WORKS & CURATED CASE STUDIES                    */}
        {/* ==================================================================== */}
        <section id="work" className="reveal space-y-10 scroll-mt-28">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-5 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                02 / Curated Portfolio
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Selected{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  case studies
                </span>
              </h2>
            </div>
            <span className={`text-xs ${textSoft}`}>
              Click any project view or image to inspect closely
            </span>
          </div>

          {/* FEATURED CASE STUDY: PHASED */}
          <AestheticCard isDark={isDark} className="p-4 sm:p-7">
            {/* Soft Studio Top Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-1">
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${sageBadge}`}>
                  Featured Capstone
                </span>
                <span className={`text-xs font-medium ${textSoft}`}>
                  UI/UX Lead & Front-End Engineer
                </span>
              </div>

              {/* Soft Pill Switcher */}
              <div className={`inline-flex p-1 rounded-full border ${pillBg}`}>
                {[
                  { id: 'showcase', label: 'Visual Showcase' },
                  { id: 'ux', label: 'UX Story' },
                  { id: 'stack', label: 'Architecture' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPhasedTab(tab.id)}
                    className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                      phasedTab === tab.id
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

            {/* Dynamic Stage: 100% Uncropped Image Frame */}
            {phasedTab === 'showcase' && (
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="relative rounded-[1.5rem] overflow-hidden bg-[#0A0A0C] border border-black/10 p-3 sm:p-6 cursor-zoom-in group"
              >
                <img
                  src={phasedImage}
                  alt="Phased UI Design Showcase"
                  className="w-full h-auto block rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                />
                <div className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Expand Full Resolution ⤢
                </div>
              </div>
            )}

            {phasedTab === 'ux' && (
              <div className={`rounded-[1.5rem] p-6 sm:p-10 border space-y-6 ${pillBg}`}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                      The Human Problem
                    </div>
                    <h4 className={`font-display text-lg font-bold ${textMain}`}>
                      Security tools often intimidate everyday users
                    </h4>
                    <p className={`text-sm leading-relaxed ${textSub}`}>
                      Most phishing and threat-detection platforms display dense technical logs that confuse non-technical users during high-stress social engineering attempts.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                      The Design Solution
                    </div>
                    <h4 className={`font-display text-lg font-bold ${textMain}`}>
                      Calm visual hierarchy & instant risk clarity
                    </h4>
                    <p className={`text-sm leading-relaxed ${textSub}`}>
                      Designed a clean, high-contrast interface across web and mobile that distills AI threat heuristics into clear status badges and plain-language guidance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {phasedTab === 'stack' && (
              <div className={`rounded-[1.5rem] p-6 sm:p-10 border ${pillBg}`}>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>01. Interface</div>
                    <div className={`font-display font-bold text-sm mt-1 ${textMain}`}>
                      Figma, React.js & React Native
                    </div>
                    <p className={`text-xs leading-relaxed mt-1.5 ${textSub}`}>
                      Cohesive component library delivering a unified experience on desktop browsers and mobile devices.
                    </p>
                  </div>
                  <div>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>02. Intelligence</div>
                    <div className={`font-display font-bold text-sm mt-1 ${textMain}`}>
                      AI Phishing Detection Engine
                    </div>
                    <p className={`text-xs leading-relaxed mt-1.5 ${textSub}`}>
                      Evaluates suspicious links, messages, and social engineering patterns in real time.
                    </p>
                  </div>
                  <div>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>03. Backend</div>
                    <div className={`font-display font-bold text-sm mt-1 ${textMain}`}>
                      Node.js, Express & MongoDB
                    </div>
                    <p className={`text-xs leading-relaxed mt-1.5 ${textSub}`}>
                      Scalable MERN architecture managing scan histories, telemetry, and threat signatures.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Case Study Caption Footer */}
            <div className="pt-6 px-1 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className={`font-display text-2xl sm:text-3xl font-bold tracking-tight ${textMain}`}>
                  Phased — AI Phishing Detection System
                </h3>
                <p className={`text-sm sm:text-base mt-1.5 max-w-2xl ${textSub}`}>
                  Developed an artificial intelligence security platform to detect phishing threats using the MERN stack and React Native.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {['UI/UX Design', 'MERN Stack', 'React Native', 'AI Security'].map((tag) => (
                  <span key={tag} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AestheticCard>

          {/* SECONDARY CASE STUDIES GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Caiantrix Grocery System */}
            <AestheticCard isDark={isDark} className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Soft Editorial UI Preview Card */}
                <div
                  className={`w-full rounded-2xl p-5 mb-6 border transition-all group ${
                    isDark ? 'bg-[#141311] border-[#2E2C29]' : 'bg-[#F5F2EC] border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-display font-semibold ${textMain}`}>
                      Caiantrix Inventory & POS
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${sageBadge}`}>
                      UI Redesign
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                      <div className={`text-[10px] ${textSoft}`}>Daily Flow</div>
                      <div className={`font-display font-bold text-sm mt-0.5 ${textMain}`}>Streamlined</div>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                      <div className={`text-[10px] ${textSoft}`}>Stock Audit</div>
                      <div className={`font-display font-bold text-sm mt-0.5 ${textMain}`}>Real-Time</div>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                      <div className={`text-[10px] ${textSoft}`}>Clarity</div>
                      <div className={`font-display font-bold text-sm mt-0.5 ${textMain}`}>High-Contrast</div>
                    </div>
                  </div>
                </div>

                <span className={`text-xs uppercase tracking-wider font-semibold ${textSoft}`}>
                  Operations & Retail UX
                </span>
                <h3 className={`font-display text-xl sm:text-2xl font-bold mt-1 ${textMain}`}>
                  Caiantrix Grocery System
                </h3>
                <p className={`text-sm leading-relaxed mt-2 ${textSub}`}>
                  Updated the user interface for a grocery management system to improve daily operations, reduce staff checkout friction, and simplify inventory tracking.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-inherit">
                <span className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>System UI</span>
                <span className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>Workflow Design</span>
              </div>
            </AestheticCard>

            {/* Casa Amelinda Resort */}
            <AestheticCard isDark={isDark} className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Soft Editorial Hospitality UI Mockup */}
                <div
                  className={`w-full rounded-2xl p-5 mb-6 border transition-all group ${
                    isDark ? 'bg-[#141311] border-[#2E2C29]' : 'bg-[#F5F2EC] border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-serif-editorial italic text-lg ${textMain}`}>
                      Casa Amelinda Resort
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${pillBg}`}>
                      Figma Prototype
                    </span>
                  </div>
                  <div className={`p-3.5 rounded-xl border space-y-2.5 ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className={textSoft}>Check-In → Check-Out</span>
                      <span className={`font-semibold ${textMain}`}>2 Guests • Suite</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className={`h-2 flex-1 rounded-full ${isDark ? 'bg-[#35322F]' : 'bg-[#E7E5E0]'}`} />
                      <div className={`h-2 flex-1 rounded-full ${isDark ? 'bg-[#9CC5B0]' : 'bg-[#355245]'}`} />
                      <div className={`h-2 flex-1 rounded-full ${isDark ? 'bg-[#242220]' : 'bg-[#F3F1EC]'}`} />
                    </div>
                  </div>
                </div>

                <span className={`text-xs uppercase tracking-wider font-semibold ${textSoft}`}>
                  Hospitality & Booking Experience
                </span>
                <h3 className={`font-display text-xl sm:text-2xl font-bold mt-1 ${textMain}`}>
                  Casa Amelinda Resort
                </h3>
                <p className={`text-sm leading-relaxed mt-2 ${textSub}`}>
                  Designed calm, responsive screen layouts in Figma for a clear and welcoming guest booking interface across desktop and mobile devices.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-inherit">
                <span className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>Figma Design</span>
                <span className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>Responsive UI</span>
              </div>
            </AestheticCard>
          </div>
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 4: EDITORIAL CURRICULUM VITAE & EXPERIENCE                  */}
        {/* ==================================================================== */}
        <section id="experience" className="reveal space-y-8 scroll-mt-28">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-5 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                03 / Curriculum Vitae
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Experience &{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  academic background
                </span>
              </h2>
            </div>

            {/* Soft Filter Switcher */}
            <div className={`inline-flex p-1 rounded-full border self-start no-print ${pillBg}`}>
              {[
                { id: 'all', label: 'Complete CV' },
                { id: 'work', label: 'Work History' },
                { id: 'education', label: 'Education & Certs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCvFilter(tab.id)}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
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
          </div>

          {selectedSkill && (
            <div className={`flex items-center justify-between px-5 py-3 rounded-2xl border text-xs ${sageBadge}`}>
              <span>
                Filtering roles where I applied: <strong>{selectedSkill}</strong>
              </span>
              <button onClick={() => setSelectedSkill(null)} className="underline font-semibold">
                Reset Filter ×
              </button>
            </div>
          )}

          {/* Professional Experience Cards */}
          {(cvFilter === 'all' || cvFilter === 'work') && (
            <div className="space-y-4">
              {experiences.map((exp) => {
                const isHighlighted = selectedSkill && exp.tags.includes(selectedSkill);
                return (
                  <AestheticCard
                    key={exp.id}
                    isDark={isDark}
                    className={`p-6 sm:p-8 ${isHighlighted ? 'ring-2 ring-emerald-600/50' : ''}`}
                  >
                    <div className="grid md:grid-cols-12 gap-4 md:gap-8">
                      <div className="md:col-span-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${textSoft}`}>{exp.period}</span>
                          {exp.active && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] border ${sageBadge}`}>
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className={`font-display text-lg sm:text-xl font-bold ${textMain}`}>
                          {exp.role}
                        </h3>
                        <p className={`text-xs font-medium ${textSub}`}>
                          {exp.company} • {exp.location}
                        </p>
                      </div>

                      <div className="md:col-span-8 space-y-4">
                        <ul className={`space-y-2 text-sm leading-relaxed ${textSub}`}>
                          {exp.highlights.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 pt-2">
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
                  </AestheticCard>
                );
              })}
            </div>
          )}

          {/* Education & Certifications Editorial Grid */}
          {(cvFilter === 'all' || cvFilter === 'education') && (
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Education Card */}
              <AestheticCard isDark={isDark} className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                    Academic Profile
                  </span>
                  <span className={`font-serif-editorial italic text-xl ${textSoft}`}>
                    Education
                  </span>
                </div>

                <div className="space-y-5">
                  <div className={`pb-4 border-b ${borderLine}`}>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`font-display font-bold text-base ${textMain}`}>
                        Bachelor of Science in Information Technology
                      </h4>
                      <span className={`text-xs font-medium shrink-0 ${textSoft}`}>2022 — 2026</span>
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
                    <p className={`text-xs mt-1 ${textSub}`}>St. Clare College, Caloocan City</p>
                  </div>

                  <div className={`pb-4 border-b ${borderLine}`}>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`font-display font-bold text-sm ${textMain}`}>
                        Junior High School • With Honors
                      </h4>
                      <span className={`text-xs shrink-0 ${textSoft}`}>2018 — 2019</span>
                    </div>
                    <p className={`text-xs mt-1 ${textSub}`}>Cielito Zamora Junior High School</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`font-display font-bold text-sm ${textMain}`}>
                        High School • With Honors
                      </h4>
                      <span className={`text-xs shrink-0 ${textSoft}`}>2015 — 2018</span>
                    </div>
                    <p className={`text-xs mt-1 ${textSub}`}>Maligaya High School</p>
                  </div>
                </div>
              </AestheticCard>

              {/* Certifications & Community Card */}
              <AestheticCard isDark={isDark} className="p-6 sm:p-8">
                <div className="flex flex-col justify-between h-full gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                        Credentials & Training
                      </span>
                      <span className={`font-serif-editorial italic text-xl ${textSoft}`}>
                        Certifications
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className={`pb-4 border-b ${borderLine}`}>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className={`font-display font-bold text-sm sm:text-base ${textMain}`}>
                            Computer Systems Servicing NC II (CSS)
                          </h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] border shrink-0 ${sageBadge}`}>
                            TESDA • 2026
                          </span>
                        </div>
                        <p className={`text-xs mt-2 leading-relaxed ${textSub}`}>
                          Configured, diagnosed, and maintained computer hardware and enterprise networks. Executed Windows Server 2019 deployments, Active Directory Domain Services, user provisioning, and Group Policy management.
                        </p>
                      </div>

                      <div className={`pb-4 border-b ${borderLine}`}>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className={`font-display font-bold text-sm ${textMain}`}>
                            Introduction to Data Science
                          </h4>
                          <span className={`text-xs shrink-0 ${textSoft}`}>Jan 2026</span>
                        </div>
                        <p className={`text-xs mt-0.5 ${textSub}`}>Cisco Networking Academy</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className={`font-display font-bold text-sm ${textMain}`}>
                            AI in Education: Responsible Exploration
                          </h4>
                          <span className={`text-xs shrink-0 ${textSoft}`}>Feb 2026</span>
                        </div>
                        <p className={`text-xs mt-0.5 ${textSub}`}>NCBA — Fairview</p>
                      </div>
                    </div>
                  </div>

                  {/* Well-spaced Volunteer Highlight Box */}
                  <div className={`p-4 rounded-2xl border ${pillBg}`}>
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-1 opacity-75">
                      <span>COMMUNITY LEADERSHIP</span>
                      <span>2025</span>
                    </div>
                    <h4 className={`font-display font-bold text-sm ${textMain}`}>
                      Student Tutor — DSWD Tara, Basa! Tutoring Program
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${textSub}`}>
                      Facilitated reading and literacy sessions for public elementary students, providing patient, structured educational support.
                    </p>
                  </div>
                </div>
              </AestheticCard>
            </div>
          )}
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 5: CAPABILITIES & DESIGN TOOLKIT                            */}
        {/* ==================================================================== */}
        <section id="capabilities" className="reveal space-y-8 scroll-mt-28">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-5 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                04 / Toolkit & Craft
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Capabilities &{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  disciplines
                </span>
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <AestheticCard isDark={isDark} className="p-6 sm:p-7">
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>01. Design & Visuals</div>
              <p className={`text-xs mb-5 ${textSoft}`}>
                Human-centered interface design and brand storytelling
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'UI/UX Design',
                  'Figma Prototyping',
                  'Wireframing',
                  'Design Systems',
                  'Graphic Design',
                  'Adobe Photoshop',
                  'Canva',
                  'Visual Art & Illustration',
                ].map((skill) => (
                  <span key={skill} className={`px-3 py-1.5 rounded-full text-xs border ${pillBg}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </AestheticCard>

            <AestheticCard isDark={isDark} className="p-6 sm:p-7">
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>02. Front-End & Code</div>
              <p className={`text-xs mb-5 ${textSoft}`}>
                Translating designs into responsive, modern applications
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'React.js',
                  'React Native',
                  'MERN Stack',
                  'Tailwind CSS',
                  'JavaScript (ES6+)',
                  'Node.js & Express',
                  'MongoDB',
                  'Responsive Web UI',
                ].map((skill) => (
                  <span key={skill} className={`px-3 py-1.5 rounded-full text-xs border ${pillBg}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </AestheticCard>

            <AestheticCard isDark={isDark} className="p-6 sm:p-7">
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>03. Technical & Ops</div>
              <p className={`text-xs mb-5 ${textSoft}`}>
                Enterprise systems, hardware consultation & operations
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Technical Sales & Quotations',
                  'Computer Systems Servicing',
                  'Active Directory (Win Server)',
                  'Sales Accounting & Auditing',
                  'Financial Reporting',
                  'Client Consultation',
                  'Microsoft Office',
                ].map((skill) => (
                  <span key={skill} className={`px-3 py-1.5 rounded-full text-xs border ${pillBg}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </AestheticCard>
          </div>
        </section>

        {/* ==================================================================== */}
        {/*  EDITORIAL CLOSING CALL TO ACTION                                    */}
        {/* ==================================================================== */}
        <section className="reveal pt-6">
          <AestheticCard isDark={isDark} className="p-8 sm:p-14 text-center space-y-6">
            <span className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs border ${sageBadge}`}>
              Open for Interviews & Collaborations
            </span>
            <h2 className={`font-display text-3xl sm:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight ${textMain}`}>
              Let’s craft something{' '}
              <span className="font-serif-editorial italic font-normal text-4xl sm:text-6xl">
                thoughtful
              </span>{' '}
              together.
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${textSub}`}>
              Whether you need a UI/UX designer who can ship clean React code or a technical professional who communicates effortlessly with clients, I’d love to connect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="mailto:girbaudforwork@gmail.com"
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-display font-semibold transition-all shadow-md ${
                  isDark
                    ? 'bg-[#F5F3EF] text-[#121110] hover:bg-white'
                    : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#35312E]'
                }`}
              >
                Email girbaudforwork@gmail.com ↗
              </a>
              <button
                onClick={() => copyToClipboard('+639206290342', 'phone number')}
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-display font-semibold border transition-all ${pillBg}`}
              >
                Call / Text +63 920 629 0342
              </button>
            </div>
          </AestheticCard>
        </section>

        {/* Footer */}
        <footer className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${borderLine} ${textSoft}`}>
          <div>
            © 2026 <strong className={textMain}>Girbaud Sky Villareal</strong>. Crafted with care in Quezon City.
          </div>
          <div>Character references available upon request.</div>
        </footer>
      </main>

      {/* ---------------------------------------------------------------------- */}
      {/*  FULLSCREEN LIGHTBOX FOR PHASED UI                                     */}
      {/* ---------------------------------------------------------------------- */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <div className="max-w-5xl w-full flex items-center justify-between mb-3 text-xs text-zinc-300">
            <span>Phased — Full UI Showcase (Uncropped Resolution)</span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="px-4 py-1.5 rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200"
            >
              Close (Esc)
            </button>
          </div>
          <div className="max-w-5xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#09090c] p-2 shadow-2xl">
            <img
              src={phasedImage}
              alt="Phased Full Resolution UI"
              className="w-full h-auto block rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}