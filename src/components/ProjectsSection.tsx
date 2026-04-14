import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroMode } from "@/pages/Index";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

type Props = { mode: HeroMode };

type MenuItem = { title: string; subtitle: string; url: string };

type ProjectTheme = {
  accentColor:   string;
  dimColor:      string;
  sectionTitle:  string;
  sectionAccent: string;
  subheader:     string;
  portraitLabel: string;
  quote:         string;
  quoteAuthor:   string;
  cardBg:        string;
  cardBorder:    string;
  hoverBorder:   string;
  hoverShadow:   string;
  cornerBorder:  string;
  imgSrc:        string;
  imgFilter:     string;
  glowShadow:    string;
  bgSrc:         string;
  menuItems:     MenuItem[];
};

const themes: Record<HeroMode, ProjectTheme> = {
  spidey: {
    accentColor:   "#ffffff", dimColor: "#ffffff",
    sectionTitle:  "Daily", sectionAccent: "Bugle Files",
    subheader:     "// GALLERY — CLASSIFIED WORK",
    portraitLabel: "PREM SAI SURISETTI — WEB SLINGER OF CODE",
    quote:         "\"With great power comes great responsibility.\"",
    quoteAuthor:   "— Uncle Ben",
    cardBg:        "rgba(0,0,0,0.7)",
    cardBorder:    "rgba(255,45,45,0.22)",
    hoverBorder:   "rgba(255,45,45,0.7)",
    hoverShadow:   "0 0 25px rgba(255,45,45,0.25)",
    cornerBorder:  "#ff2d2d",
    imgSrc:        "/spiderman-image.png",
    imgFilter:     "brightness(1.1) contrast(1.1) grayscale(10%)",
    glowShadow:    "0 0 40px rgba(255,45,45,0.4)",
    bgSrc:         "/spiderman-bg.png",
    menuItems: [
      { title: "Projects",   subtitle: "WEB WORK",  url: "/projects" },
      { title: "Achievements", subtitle: "TROPHIES", url: "/achievements" },
      { title: "Skills",     subtitle: "POWERS",    url: "#skills" },
      { title: "Contact",    subtitle: "SIGNAL",    url: "#contact" },
    ],
  },
  ironman: {
    accentColor:   "#ff2200", dimColor: "#ff8c8c",
    sectionTitle:  "Stark", sectionAccent: "Industries",
    subheader:     "// Classified Projects — Level 5 Clearance Required",
    portraitLabel: "PREM SAI SURISETTI — ENGINEER OF INTELLIGENT SYSTEMS",
    quote:         "\"I am Iron Man.\"",
    quoteAuthor:   "— Tony Stark",
    cardBg:        "rgba(15,0,0,0.6)",
    cardBorder:    "rgba(180,0,0,0.4)",
    hoverBorder:   "rgba(255,30,0,0.8)",
    hoverShadow:   "0 0 25px rgba(220,0,0,0.4)",
    cornerBorder:  "#ff2200",
    imgSrc:        "/ironman-image.png",
    imgFilter:     "sepia(15%) saturate(1.2) brightness(0.9)",
    glowShadow:    "0 0 30px rgba(220,30,0,0.6)",
    bgSrc:         "/ironman-bg.png",
    menuItems: [
      { title: "Projects",   subtitle: "STARK TECH", url: "/projects" },
      { title: "Achievements", subtitle: "TROPHIES", url: "/achievements" },
      { title: "Skills",     subtitle: "UPGRADES",   url: "#skills" },
      { title: "Services",   subtitle: "SOLUTIONS", url: "#services" },
      { title: "Contact",    subtitle: "COMMS",      url: "#contact" },
    ],
  },
  deadpool: {
    accentColor:   "#dc1414", dimColor: "#ff4444",
    sectionTitle:  "Maximum", sectionAccent: "Effort Projects",
    subheader:     "// These projects hurt. Worth it.",
    portraitLabel: "PREM SAI SURISETTI — THE MERC WITH A MOUSE",
    quote:         "\"Maximum effort. Always.\"",
    quoteAuthor:   "— Deadpool",
    cardBg:        "rgba(12,0,0,0.7)",
    cardBorder:    "rgba(180,20,20,0.35)",
    hoverBorder:   "rgba(220,20,20,0.8)",
    hoverShadow:   "0 0 25px rgba(200,0,0,0.4)",
    cornerBorder:  "#dc1414",
    imgSrc:        "/deadpool-image.png",
    imgFilter:     "brightness(0.85) contrast(1.1)",
    glowShadow:    "0 0 30px rgba(200,20,0,0.5)",
    bgSrc:         "/deadpool-bg.jpg",
    menuItems: [
      { title: "Projects",   subtitle: "MAXIMUM EFFORT", url: "/projects" },
      { title: "Achievements", subtitle: "TROPHIES", url: "/achievements" },
      { title: "Skills",     subtitle: "DIRTY WORK",     url: "#skills" },
      { title: "Services",   subtitle: "SOLUTIONS",      url: "#services" },
      { title: "Contact",    subtitle: "CHIMICHANGA",    url: "#contact" },
    ],
  },
  batman: {
    accentColor:   "#fdc700", dimColor: "#ffe44d",
    sectionTitle:  "Gotham's", sectionAccent: "Finest Work",
    subheader:     "// I work alone. Usually.",
    portraitLabel: "PREM SAI SURISETTI — THE DARK DEVELOPER",
    quote:         "\"I am vengeance. I am the night.\"",
    quoteAuthor:   "— Batman",
    cardBg:        "rgba(5,5,12,0.8)",
    cardBorder:    "rgba(160,120,0,0.3)",
    hoverBorder:   "rgba(220,170,0,0.7)",
    hoverShadow:   "0 0 25px rgba(180,130,0,0.35)",
    cornerBorder:  "#fdc700",
    imgSrc:        "/batman-image.png",
    imgFilter:     "brightness(0.8) contrast(1.2) grayscale(10%)",
    glowShadow:    "0 0 30px rgba(180,130,0,0.4)",
    bgSrc:         "/batman-bg.jpg",
    menuItems: [
      { title: "Projects",   subtitle: "BAT-TECH",   url: "/projects" },
      { title: "Achievements", subtitle: "TROPHIES", url: "/achievements" },
      { title: "Skills",     subtitle: "TRAINING",   url: "#skills" },
      { title: "Services",   subtitle: "SOLUTIONS",  url: "#services" },
      { title: "Contact",    subtitle: "SIGNAL",     url: "#contact" },
    ],
  },
  superman: {
    accentColor:   "#4488ff", dimColor: "#ffc000",
    sectionTitle:  "Hall of", sectionAccent: "Justice",
    subheader:     "// Saving the world, one pixel at a time",
    portraitLabel: "PREM SAI SURISETTI — FULL STACK POWERHOUSE",
    quote:         "\"You will give the people an ideal to strive towards.\"",
    quoteAuthor:   "— Jor-El",
    cardBg:        "rgba(2,5,25,0.75)",
    cardBorder:    "rgba(40,100,240,0.3)",
    hoverBorder:   "rgba(80,150,255,0.7)",
    hoverShadow:   "0 0 25px rgba(40,100,220,0.35)",
    cornerBorder:  "#4488ff",
    imgSrc:        "/superman-image.png",
    imgFilter:     "brightness(0.85) saturate(1.15)",
    glowShadow:    "0 0 30px rgba(50,100,255,0.4)",
    bgSrc:         "/superman-bg.jpg",
    menuItems: [
      { title: "Projects",   subtitle: "JUSTICE",     url: "/projects" },
      { title: "Achievements", subtitle: "TROPHIES", url: "/achievements" },
      { title: "Skills",     subtitle: "SOLAR POWER", url: "#skills" },
      { title: "Services",   subtitle: "SOLUTIONS",   url: "#services" },
      { title: "Contact",    subtitle: "FORTRESS",    url: "#contact" },
    ],
  },
};

import { use3DTilt } from "@/hooks/use3DTilt";

// ... (existing themes and types)

function ProjectMenuItem({ item, index, theme, mode }: { item: MenuItem, index: number, theme: ProjectTheme, mode: HeroMode }) {
  const tiltRef = use3DTilt({ maxRotation: 5, scale: 1.02 });
  const navigate = useNavigate();

  return (
    <div 
      ref={tiltRef}
      className="relative p-5 rounded-xl cursor-pointer transition-all duration-250 group overflow-hidden"
      onClick={() => { 
        if (item.url.startsWith('/projects') || item.url.startsWith('/achievements')) {
          navigate(`${item.url}?mode=${mode}`);
        } else if (item.url.startsWith('http')) {
          window.open(item.url, '_blank');
        } else {
          if (window.lenis && item.url.startsWith('#')) {
            window.lenis.scrollTo(item.url, { offset: -80 });
          } else {
            window.location.hash = item.url; 
          }
        }
      }}
      style={{ 
        background: theme.cardBg, 
        border: `1px solid ${theme.cardBorder}`, 
        backdropFilter: "blur(22px)",
        transformStyle: "preserve-3d"
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = theme.hoverBorder; (e.currentTarget as HTMLElement).style.boxShadow = theme.hoverShadow; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = theme.cardBorder; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
      
      <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: `1px solid ${theme.cornerBorder}`, borderLeft: `1px solid ${theme.cornerBorder}` }} />
      <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: `1px solid ${theme.cornerBorder}`, borderRight: `1px solid ${theme.cornerBorder}` }} />
      
      <div className="flex items-center justify-between pr-2" style={{ transform: "translateZ(20px)" }}>
        <div>
          <p className="text-xs font-mono tracking-[0.35em] uppercase mb-1" style={{ color: theme.accentColor }}>
            {item.subtitle}
          </p>
          <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.accentColor} strokeWidth="2" opacity="0.7" className="transition-transform group-hover:translate-x-1">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  );
}

// ─── Generic mode Projects layout ─────────────────────────────────────────────
function ModeProjects({ mode }: { mode: HeroMode }) {
  const t = themes[mode];
  const imageRef = useRef<HTMLDivElement>(null);
  const tiltPortraitRef = use3DTilt({ maxRotation: 8, scale: 1.05 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!imageRef.current || e.touches.length === 0) return;
    const rect = imageRef.current.getBoundingClientRect();
    setMousePos({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    });
  };

  return (
    <section id="projects" className="relative py-20 px-6 overflow-hidden">
      {/* Integrated Section Background - High Fidelity Visibility */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${t.bgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7, // High visibility for themed backgrounds
          filter: 'brightness(0.9) contrast(1.1) saturate(1.1)' 
        }}
      />
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <div className="perspective-2000 relative z-10">
        <div className="container mx-auto max-w-6xl mb-14">
        <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color: t.dimColor, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
          {t.subheader}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight" style={{ textShadow: `2px 2px 10px rgba(0,0,0,0.9), ${t.glowShadow}` }}>
          {t.sectionTitle} <span style={{ color: t.accentColor }}>{t.sectionAccent}</span>
        </h2>
      </div>

      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-start">
        {/* Portrait */}
        <div className="flex flex-col items-center gap-6">
          <div 
            ref={tiltPortraitRef}
            className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden cursor-crosshair group touch-none"
            style={{ 
              border: "1px solid rgba(255,255,255,0.1)", 
              boxShadow: `0 0 40px ${t.cardBorder}`, 
              background: t.cardBg,
              transformStyle: "preserve-3d"
            }}>
            
            <div 
              ref={imageRef}
              className="absolute inset-0 z-0"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={(e) => { setIsHovered(true); handleTouchMove(e); }}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setIsHovered(false)}
            >
              {/* Default Superhero Image */}
              <img src={t.imgSrc} alt={mode} className="w-full h-full object-cover object-top"
                style={{ filter: t.imgFilter, transform: "translateZ(0px)" }} />

              {/* Anamorphic Cursor-Revealed Image */}
              <img src="/prem-image.png" alt="Prem Sai Surisetti" 
                className="absolute top-0 left-0 w-full h-full object-cover object-top pointer-events-none transition-all duration-100 ease-out"
                style={{ 
                  opacity: isHovered ? 1 : 0,
                  WebkitMaskImage: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                  maskImage: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                  filter: "brightness(1.05) contrast(1.1) saturate(1.1)",
                  transform: "translateZ(30px)"
                }} />
            </div>

            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center top,transparent 40%,rgba(0,0,10,0.6) 100%)" }} />
            <div className="absolute inset-0"
              style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.05) 3px,rgba(0,0,0,0.05) 4px)" }} />
            
            <div className="absolute bottom-0 left-0 right-0 p-3 font-mono text-[10px] leading-tight z-10"
              style={{ 
                background: "rgba(0,0,10,0.85)", 
                color: t.dimColor, 
                letterSpacing: "0.08em", 
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                transform: "translateZ(50px)"
              }}>
              {t.portraitLabel}
            </div>
            
            {[{top:8,left:8},{top:8,right:8}].map((pos, i) => (
              <div key={i} className="absolute w-4 h-4 z-20" style={{
                ...pos,
                borderTop:    i < 2  ? `1px solid ${t.cornerBorder}` : undefined,
                borderBottom: i >= 2 ? `1px solid ${t.cornerBorder}` : undefined,
                borderLeft:   i%2===0? `1px solid ${t.cornerBorder}` : undefined,
                borderRight:  i%2===1? `1px solid ${t.cornerBorder}` : undefined,
                transform: "translateZ(60px)"
              }} />
            ))}
          </div>

          <blockquote className="text-left italic text-sm text-white px-4 border-l-2"
            style={{ borderColor: t.accentColor }}>
            {t.quote}<br />
            <span className="not-italic font-bold text-xs" style={{ color: t.accentColor }}>{t.quoteAuthor}</span>
          </blockquote>
        </div>

        {/* Project panels */}
        <div className="space-y-3">
          {t.menuItems.map((p, i) => (
            <ProjectMenuItem key={i} item={p} index={i} theme={t} mode={mode} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

// ─── Default exported section ─────────────────────────────────────────────────
export default function ProjectsSection({ mode }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Component mounted
  }, []);

  return (
    <div ref={sectionRef}>
      <ModeProjects mode={mode} />
    </div>
  );
}
