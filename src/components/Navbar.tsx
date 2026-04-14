import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

import { HeroMode } from "@/pages/Index";

export default function Navbar({ mode }: { mode: HeroMode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/40 backdrop-blur-md border-b border-white/5 py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex-1"></div>
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                const target = e.currentTarget.getAttribute('href');
                if (target?.startsWith('#') && window.lenis) {
                  e.preventDefault();
                  window.lenis.scrollTo(target, { offset: -80 });
                }
              }}
              className="text-white/70 hover:text-white font-sans text-sm tracking-wide transition-colors"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex-1 flex justify-end z-[110]">
          <a
            href={`/portfolio.html?mode=${mode}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              localStorage.setItem('hero-mode', mode);
              // @ts-ignore
              if (typeof gtag !== 'undefined') {
                // @ts-ignore
                gtag('event', 'view_resume', {
                  'event_category': 'Engagement',
                  'event_label': 'Navbar Resume Button',
                  'hero_mode': mode
                });
              }
            }}
            className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.4)] text-xs md:text-sm font-black uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            View Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
