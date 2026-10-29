import { useState, useEffect, useRef } from 'react';
import phasedImage from './assets/phased.png';

/* -------------------------------------------------------------------------- */
/*  NOSTALGIC LOWKEY BACKGROUND STARS (SUBTLE, NON-INTRUSIVE)                 */
/* -------------------------------------------------------------------------- */
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
/*  SOFT AESTHETIC SURFACE CARD                                               */
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
      className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
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
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MAIN PORTFOLIO APPLICATION                                                */
/* -------------------------------------------------------------------------- */
export default function App() {
  /* Theme State (Defaults to Calm Warm Alabaster Light Mode) */
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('gsv-aesthetic-theme');
      return saved ? saved === 'dark' : false;
    } catch {
      return false;
    }
  });

  /* Permanent Assets in public/ folder */
  const portraitUrl = `${import.meta.env.BASE_URL}profile.jpg`;
  const resumePdfUrl = `${import.meta.env.BASE_URL}resume.pdf`;
  const [photoError, setPhotoError] = useState(false);

  /* Animated Hero Cycling Text */
  const rotatingTitles = [
    "I'm Girbaud Sky",
    "I'm a Front-End Developer",
    "I'm a UI/UX Designer",
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTitleFading, setIsTitleFading] = useState(false);

  /* Navigation & UI State */
  const [timeString, setTimeString] = useState('');
  const [activeNav, setActiveNav] = useState('about');
  const [copiedLabel, setCopiedLabel] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* Smooth Accordion States */
  const [openProcessIdx, setOpenProcessIdx] = useState(0);
  const [openExpIds, setOpenExpIds] = useState(['villman', 'undecide']);

  /* PHASED Interactive Showcase State ('live' | 'image' | 'ux') */
  const [phasedView, setPhasedView] = useState('live');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  /* CV Filter & Skill Highlight */
  const [cvFilter, setCvFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);

  /* Permanent Performance Reviews (Guaranteed to include Ralph's 5/5 review) */
  const defaultReviews = [
    {
      id: 'ralph-verified',
      name: 'Ralph',
      role: 'Client / Peer Reviewer',
      rating: 5,
      comment:
        'He exhibits good communication skills and is very responsive. Thank you sir.',
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
      if (saved) {
        return JSON.parse(saved);
      }
      return defaultReviews;
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

  /* Sync Theme to localStorage */
  useEffect(() => {
    try {
      localStorage.setItem('gsv-aesthetic-theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
    document.documentElement.style.backgroundColor = isDark ? '#121110' : '#FAF8F5';
  }, [isDark]);

  /* Cycle Hero Headline Every 3.2 Seconds */
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
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  /* Scroll Reveal Observer */
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

  /* Active Section Spy */
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'process', 'work', 'experience', 'capabilities', 'ratings'];
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

  /* Toggle Experience Accordion Item */
  const toggleExpAccordion = (id) => {
    setOpenExpIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /* Copy Helper */
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(''), 2500);
  };

  /* Add Suggested Phrase to Review Box */
  const handleAddSuggestedPhrase = (phrase) => {
    setReviewComment((prev) => {
      if (!prev.trim()) return phrase;
      if (prev.includes(phrase)) return prev;
      return `${prev.trim()} ${phrase}`;
    });
  };

  /* Submit Rating & Comment */
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

  /* Design Process Accordion Data */
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

  /* Theme Palette Tokens */
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

  /* Plain Circle + Ring Border Contrast */
  const plainCircleBorder = isDark
    ? 'border-white/[0.11]'
    : 'border-stone-900/[0.11]';
  const plainRingBorder = isDark
    ? 'border-white/[0.15]'
    : 'border-stone-900/[0.15]';

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
      {/* ---------------------------------------------------------------------- */}
      {/*  BACKGROUND: LOWKEY NOSTALGIC STARS + PLAIN CIRCLES WITH A RING        */}
      {/* ---------------------------------------------------------------------- */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {/* Soft Ambient Pastel Glows */}
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

        {/* Nostalgic Lowkey Twinkling Stars in Deep Background */}
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

        {/* PLAIN CIRCLE PLANET 1 (Upper-Left): Exact Plain Circle + Simple 3D Ring */}
        <div
          className="absolute top-[14%] left-[4%] sm:left-[8%] w-64 h-64 sm:w-96 sm:h-96 flex items-center justify-center animate-calm-orbit-1"
          style={{ perspective: '900px' }}
        >
          {/* The Original Plain Hollow Circle */}
          <div
            className={`w-36 h-36 sm:w-56 sm:h-56 rounded-full border ${plainCircleBorder}`}
          />
          {/* Simple Plain 3D Spinning Ring Around It */}
          <div
            className={`absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border ${plainRingBorder} animate-plain-ring-1`}
          >
            {/* Tiny Plain Orbiting Dot on the Ring */}
            <span
              className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
                isDark ? 'bg-white/25' : 'bg-stone-800/25'
              }`}
            />
          </div>
        </div>

        {/* PLAIN CIRCLE PLANET 2 (Lower-Right): Exact Plain Circle + Simple 3D Ring */}
        <div
          className="absolute bottom-[10%] right-[2%] sm:right-[7%] w-72 h-72 sm:w-[430px] sm:h-[430px] flex items-center justify-center animate-calm-orbit-2"
          style={{ perspective: '900px' }}
        >
          {/* The Original Plain Hollow Circle */}
          <div
            className={`w-44 h-44 sm:w-64 sm:h-64 rounded-full border ${plainCircleBorder}`}
          />
          {/* Simple Plain 3D Spinning Ring Around It */}
          <div
            className={`absolute w-72 h-72 sm:w-[430px] sm:h-[430px] rounded-full border ${plainRingBorder} animate-plain-ring-2`}
          >
            {/* Tiny Plain Orbiting Dot on the Ring */}
            <span
              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
                isDark ? 'bg-white/25' : 'bg-stone-800/25'
              }`}
            />
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

      {/* ---------------------------------------------------------------------- */}
      {/*  RESPONSIVE FLOATING NAVIGATION BAR                                    */}
      {/* ---------------------------------------------------------------------- */}
      <header className="sticky top-3 sm:top-4 z-40 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-1">
        <div
          className={`backdrop-blur-2xl rounded-full px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between border transition-all duration-500 ${
            isDark
              ? 'bg-[#1A1917]/85 border-[#2E2C29] shadow-2xl shadow-black/50'
              : 'bg-white/85 border-[#E7E5E0] shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          }`}
        >
          {/* Brand Monogram */}
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

          {/* Desktop Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'process', label: 'Process' },
              { id: 'work', label: 'Work' },
              { id: 'experience', label: 'Resume/CV' },
              { id: 'capabilities', label: 'Skills' },
              { id: 'ratings', label: 'Ratings' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
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

          {/* Right Actions: Resume/CV Download, Theme Toggle & Mobile Menu */}
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
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
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
              className={`hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all duration-300 ${
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

        {/* Smooth Mobile/Tablet Navigation Drawer */}
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
                { id: 'work', label: 'Selected Work (PHASED)' },
                { id: 'experience', label: 'Experience & Resume/CV' },
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

      {/* ---------------------------------------------------------------------- */}
      {/*  MAIN RESPONSIVE CONTENT CONTAINER                                     */}
      {/* ---------------------------------------------------------------------- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-24 space-y-20 sm:space-y-28 relative z-10">
        
        {/* ==================================================================== */}
        {/*  SECTION 1: HERO, ANIMATED IDENTITY & COMPACT PERMANENT PORTRAIT     */}
        {/* ==================================================================== */}
        <section id="about" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Dynamic Transitioning Title & Connected Bio (8 Columns) */}
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

              {/* Animated Transitioning Headline + Connected Bio */}
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

                {/* Connected, Aligned Bio Paragraph */}
                <p className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl ${textSub}`}>
                  With a foundation in Information Technology, commercial illustration, and technical executive operations, I bridge{' '}
                  <strong className={`font-semibold ${textMain}`}>
                    thoughtful user interface design
                  </strong>
                  ,{' '}
                  <strong className={`font-semibold ${textMain}`}>
                    clean React & MERN engineering
                  </strong>
                  , and{' '}
                  <strong className={`font-semibold ${textMain}`}>
                    clear client communication
                  </strong>{' '}
                  — turning complex systems into calm, intuitive digital experiences.
                </p>
              </div>

              {/* Responsive Linktree & Resume/CV Action Grid */}
              <div className="reveal pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {/* Email Copy Button */}
                  <button
                    onClick={() => copyToClipboard('girbaudforwork@gmail.com', 'email address')}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border ${pillBg}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="truncate">
                        <div className={`text-xs font-semibold truncate ${textMain}`}>
                          girbaudforwork@gmail.com
                        </div>
                        <div className={`text-[11px] ${textSoft}`}>
                          {copiedLabel === 'email address' ? '✓ Copied' : 'Click to copy email'}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 ${pillBg}`}>
                      {copiedLabel === 'email address' ? 'Copied' : 'Copy'}
                    </span>
                  </button>

                  {/* Phone Copy Button */}
                  <button
                    onClick={() => copyToClipboard('+639206290342', 'phone number')}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border ${pillBg}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="truncate">
                        <div className={`text-xs font-semibold ${textMain}`}>+63 920 629 0342</div>
                        <div className={`text-[11px] ${textSoft}`}>Bagong Pag-Asa, QC</div>
                      </div>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 ${pillBg}`}>
                      {copiedLabel === 'phone number' ? 'Copied' : 'Copy'}
                    </span>
                  </button>

                  {/* GitHub Link */}
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
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border ${pillBg}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </div>
                      <div className="truncate">
                        <div className={`text-xs font-semibold ${textMain}`}>GitHub Portfolio</div>
                        <div className={`text-[11px] ${textSoft}`}>@SoraNyx942002</div>
                      </div>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 ${pillBg}`}>
                      Visit ↗
                    </span>
                  </a>

                  {/* Attached PDF Resume/CV Download Pill */}
                  <a
                    href={resumePdfUrl}
                    download="Girbaud_Sky_Villareal_Resume_CV.pdf"
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 group ${
                      isDark
                        ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2E2C29]'
                        : 'bg-white hover:bg-[#F3F1EC]/70 border-[#E7E5E0] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border ${pillBg}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="truncate">
                        <div className={`text-xs font-semibold ${textMain}`}>Resume/CV</div>
                        <div className={`text-[11px] ${textSoft}`}>Download Official PDF</div>
                      </div>
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border shrink-0 ${sageBadge}`}>
                      PDF ↓
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Compact, Permanent Portrait Card (4 Columns, Centered & Proportional) */}
            <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end reveal">
              <AestheticCard
                isDark={isDark}
                className="w-full max-w-[240px] sm:max-w-[270px] lg:max-w-[295px] p-3"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/4.6] bg-gradient-to-b from-[#E5E0D8] to-[#D6CFC5] dark:from-[#262421] dark:to-[#1C1A17]">
                  {!photoError ? (
                    <img
                      src={portraitUrl}
                      alt="Girbaud Sky Villareal"
                      onError={() => setPhotoError(true)}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    />
                  ) : (
                    /* Clean Permanent Monogram Portrait (Zero edit/upload buttons) */
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

                  {/* Permanent Bottom Name Badge */}
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

                {/* Compact Metrics Row */}
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

        {/* ==================================================================== */}
        {/*  SECTION 2: ENHANCED SMOOTH ACCORDION — DESIGN PROCESS               */}
        {/* ==================================================================== */}
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

          {/* Smooth Animated Accordion List */}
          <div className="space-y-3">
            {designProcess.map((item, idx) => {
              const isOpen = openProcessIdx === idx;
              return (
                <AestheticCard key={item.step} isDark={isDark} className="transition-all duration-500">
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

                  {/* Smooth CSS Grid Accordion Content */}
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

        {/* ==================================================================== */}
        {/*  SECTION 3: SELECTED WORKS — PHASED LIVE PREVIEW & BORDERLESS UI     */}
        {/* ==================================================================== */}
        <section id="work" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                02 / Selected Works
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Featured{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  case studies
                </span>
              </h2>
            </div>
            <span className={`text-xs ${textSoft}`}>
              Interact with the live embedded preview or open directly
            </span>
          </div>

          {/* FEATURED CASE STUDY: PHASED */}
          <AestheticCard isDark={isDark} className="overflow-hidden">
            {/* Top Header Bar */}
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
                {/* Mode Switcher: Live Website Preview vs Borderless UI Image */}
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

                {/* Direct External Link Button to phased.undecide.dev */}
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

            {/* BORDERLESS SHOWCASE AREA (No Black Border!) */}
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
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full cursor-zoom-in group"
              >
                {/* 100% Borderless Image — No Black Frame */}
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
                  <div className={`p-5 rounded-2xl border ${ isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]' }`}>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>
                      Why “PHASED”?
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                      <strong>PHASED</strong> stands for{' '}
                      <strong>PH</strong>ishing <strong>A</strong>nd <strong>S</strong>ocial{' '}
                      <strong>E</strong>ngineering <strong>D</strong>etection — built to analyze deceptive links and messages in real time before users are compromised.
                    </p>
                  </div>
                  <div className={`p-5 rounded-2xl border ${ isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]' }`}>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>
                      UI/UX Craft
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                      Designed a calm, high-clarity interface across web and mobile so non-technical users immediately understand threat levels without security jargon.
                    </p>
                  </div>
                  <div className={`p-5 rounded-2xl border ${ isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]' }`}>
                    <div className={`font-serif-editorial italic text-2xl ${textMain}`}>
                      Tech Stack
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                      Engineered using MongoDB, Express.js, React.js, Node.js (MERN Stack), React Native for cross-platform mobile protection, and AI threat classification.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Case Study Details Footer */}
            <div className={`p-5 sm:p-7 border-t flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${borderLine}`}>
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${textMain}`}>
                    PHASED
                  </h3>
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

          {/* Secondary Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AestheticCard isDark={isDark} className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div
                  className={`w-full rounded-2xl p-4 sm:p-5 mb-5 border ${
                    isDark ? 'bg-[#141311] border-[#2E2C29]' : 'bg-[#F5F2EC] border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-display font-semibold ${textMain}`}>
                      Caiantrix Inventory & POS
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${sageBadge}`}>
                      System UI
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                      <div className={`text-[10px] ${textSoft}`}>Checkout</div>
                      <div className={`font-display font-bold text-xs sm:text-sm mt-0.5 ${textMain}`}>Faster Flow</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                      <div className={`text-[10px] ${textSoft}`}>Inventory</div>
                      <div className={`font-display font-bold text-xs sm:text-sm mt-0.5 ${textMain}`}>Live Sync</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                      <div className={`text-[10px] ${textSoft}`}>Clarity</div>
                      <div className={`font-display font-bold text-xs sm:text-sm mt-0.5 ${textMain}`}>Accessible</div>
                    </div>
                  </div>
                </div>

                <h3 className={`font-display text-xl font-bold ${textMain}`}>
                  Caiantrix Grocery System
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                  Redesigned the user interface for a retail grocery management system to streamline daily checkout operations and inventory tracking.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-inherit">
                <span className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>System UI</span>
                <span className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>Workflow UX</span>
              </div>
            </AestheticCard>

            <AestheticCard isDark={isDark} className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div
                  className={`w-full rounded-2xl p-4 sm:p-5 mb-5 border ${
                    isDark ? 'bg-[#141311] border-[#2E2C29]' : 'bg-[#F5F2EC] border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-serif-editorial italic text-base sm:text-lg ${textMain}`}>
                      Casa Amelinda Resort
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${pillBg}`}>
                      Figma Prototype
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border space-y-2 ${isDark ? 'bg-[#1A1917] border-[#2E2C29]' : 'bg-white border-[#E7E5E0]'}`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className={textSoft}>Check-In → Check-Out</span>
                      <span className={`font-semibold ${textMain}`}>Responsive Flow</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className={`h-2 flex-1 rounded-full ${isDark ? 'bg-[#35322F]' : 'bg-[#E7E5E0]'}`} />
                      <div className={`h-2 flex-1 rounded-full ${isDark ? 'bg-[#9CC5B0]' : 'bg-[#355245]'}`} />
                      <div className={`h-2 flex-1 rounded-full ${isDark ? 'bg-[#242220]' : 'bg-[#F3F1EC]'}`} />
                    </div>
                  </div>
                </div>

                <h3 className={`font-display text-xl font-bold ${textMain}`}>
                  Casa Amelinda Resort
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed mt-2 ${textSub}`}>
                  Designed calm, responsive screen layouts in Figma for a clear and welcoming guest booking interface across mobile, tablet, and desktop.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-inherit">
                <span className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>Figma Design</span>
                <span className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>Hospitality UI</span>
              </div>
            </AestheticCard>
          </div>
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 4: INTERACTIVE RESUME/CV WITH SMOOTH ACCORDIONS             */}
        {/* ==================================================================== */}
        <section id="experience" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                03 / Resume/CV
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Experience &{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  credentials
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className={`inline-flex p-1 rounded-full border ${pillBg}`}>
                {[
                  { id: 'all', label: 'Full Resume/CV' },
                  { id: 'work', label: 'Work History' },
                  { id: 'education', label: 'Education & Certs' },
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

          {/* Smooth Accordion Experience Cards */}
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

                    {/* Smooth Accordion Body */}
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

          {/* Education & Certifications Grid */}
          {(cvFilter === 'all' || cvFilter === 'education') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <p className={`text-xs mt-1 ${textSub}`}>
                      Cielito Zamora Junior High School
                    </p>
                  </div>
                </div>
              </AestheticCard>

              <AestheticCard isDark={isDark} className="p-6 sm:p-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                      Certifications
                    </span>
                    <span className={`font-serif-editorial italic text-xl ${textSoft}`}>Verified</span>
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
                      <p className={`text-xs mt-1.5 leading-relaxed ${textSub}`}>
                        Enterprise network setup, Windows Server 2019 Active Directory Domain Services, user provisioning, and Group Policy configuration.
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

                <div className={`p-4 rounded-2xl border ${pillBg}`}>
                  <div className="flex items-center justify-between text-[11px] font-semibold mb-1 opacity-75">
                    <span>VOLUNTEER EXPERIENCE</span>
                    <span>2025</span>
                  </div>
                  <h4 className={`font-display font-bold text-sm ${textMain}`}>
                    Student Tutor — DSWD Tara, Basa! Tutoring Program
                  </h4>
                  <p className={`text-xs mt-1 leading-relaxed ${textSub}`}>
                    Facilitated reading and literacy modules for public elementary students.
                  </p>
                </div>
              </AestheticCard>
            </div>
          )}
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 5: CAPABILITIES & TOOLKIT                                   */}
        {/* ==================================================================== */}
        <section id="capabilities" className="reveal space-y-6 scroll-mt-24">
          <div className={`border-b pb-4 ${borderLine}`}>
            <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
              04 / Capabilities
            </span>
            <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
              Design & technical{' '}
              <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                toolkit
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
              <div className={`font-serif-editorial italic text-2xl mb-1 ${textMain}`}>03. Systems & Ops</div>
              <p className={`text-xs mb-4 ${textSoft}`}>Hardware, networks & accounting</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Technical Sales',
                  'Computer Systems Servicing',
                  'Active Directory (Win Server)',
                  'Sales Accounting',
                  'Financial Reporting',
                  'Client Consultation',
                ].map((skill) => (
                  <span key={skill} className={`px-3 py-1 rounded-full text-xs border ${pillBg}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </AestheticCard>
          </div>
        </section>

        {/* ==================================================================== */}
        {/*  SECTION 6: INTERACTIVE PERFORMANCE RATINGS & QUICK ENDORSEMENTS     */}
        {/* ==================================================================== */}
        <section id="ratings" className="reveal space-y-8 scroll-mt-24">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 ${borderLine}`}>
            <div>
              <span className={`text-xs uppercase tracking-widest font-semibold ${textSoft}`}>
                05 / Performance & Feedback
              </span>
              <h2 className={`font-display text-2xl sm:text-4xl font-bold tracking-tight mt-1 ${textMain}`}>
                Rate my{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-5xl">
                  performance
                </span>
              </h2>
            </div>

            {/* Aggregate Score Badge */}
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border self-start ${sageBadge}`}>
              <div className="flex items-center text-amber-500 text-sm">
                {'★★★★★'}
              </div>
              <span className="text-xs font-display font-bold">
                {averageRating} / 5.0 ({reviews.length} Ratings)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Interactive 5-Star Form + Suggested Quick Phrases (7 Cols) */}
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

                  {/* Interactive 1-5 Star Selector */}
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

                {/* Suggested Words / Quick Endorsement Chips */}
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

                {/* Name & Role Inputs */}
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

                {/* Comment Textarea */}
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

            {/* Right Column: Recent Ratings Feed (5 Cols) */}
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

      {/* Fullscreen Lightbox for PHASED UI Artwork */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <div className="max-w-5xl w-full flex items-center justify-between mb-3 text-xs text-zinc-300">
            <span>PHASED — PHishing And Social Engineering Detection</span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="px-4 py-1.5 rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200"
            >
              Close (Esc)
            </button>
          </div>
          <div className="max-w-5xl w-full max-h-[85vh] overflow-y-auto rounded-2xl">
            <img
              src={phasedImage}
              alt="PHASED Full Resolution UI"
              className="w-full h-auto block"
            />
          </div>
        </div>
      )}
    </div>
  );
}