import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroMode } from "@/pages/Index";

gsap.registerPlugin(ScrollTrigger);

type Props = { mode: HeroMode };

const skills = [
  { name: "Java Programming", level: 92 },
  { name: "HTML",             level: 98 },
  { name: "CSS",              level: 95 },
  { name: "JAVASCRIPT",       level: 96 },
  { name: "UI & UX",          level: 88 },
];

type SkillsTheme = {
  accentColor:  string;
  dimColor:     string;
  barBg:        string;
  barFill:      string;
  barGlow:      string;
  cardBg:       string;
  cardBorder:   string;
  glowShadow:   string;
};

const themes: Record<HeroMode, SkillsTheme> = {
  spidey: {
    accentColor:  "#ffffff", dimColor: "#ffffff",
    barBg:        "rgba(255,45,45,0.1)",
    barFill:      "linear-gradient(90deg,#ff2d2d,#cc0000)", barGlow: "0 0 10px rgba(255,45,45,0.35)",
    cardBg:       "rgba(0,0,0,0.65)", cardBorder: "rgba(255,45,45,0.2)",
    glowShadow:   "0 0 40px rgba(255,45,45,0.4)",
  },
  ironman: {
    accentColor:  "#ff2200", dimColor: "#ff8c8c",
    barBg:        "rgba(80,0,0,0.3)",
    barFill:      "linear-gradient(90deg,#880000,#ff2200)", barGlow: "0 0 8px rgba(255,34,0,0.6)",
    cardBg:       "rgba(20,0,0,0.55)", cardBorder: "rgba(200,0,0,0.35)",
    glowShadow:   "0 0 30px rgba(220,30,0,0.5)",
  },
  deadpool: {
    accentColor:  "#dc1414", dimColor: "#ff4444",
    barBg:        "rgba(80,0,0,0.3)",
    barFill:      "linear-gradient(90deg,#7a0000,#ee1010)", barGlow: "0 0 7px rgba(220,20,0,0.6)",
    cardBg:       "rgba(15,0,0,0.6)", cardBorder: "rgba(200,20,20,0.3)",
    glowShadow:   "0 0 30px rgba(200,20,0,0.45)",
  },
  batman: {
    accentColor:  "#fdc700", dimColor: "#ffe44d",
    barBg:        "rgba(50,40,0,0.4)",
    barFill:      "linear-gradient(90deg,#4a3800,#c89800)", barGlow: "0 0 7px rgba(220,160,0,0.5)",
    cardBg:       "rgba(5,5,12,0.75)", cardBorder: "rgba(180,140,0,0.25)",
    glowShadow:   "0 0 30px rgba(180,130,0,0.35)",
  },
  superman: {
    accentColor:  "#4488ff", dimColor: "#ffc000",
    barBg:        "rgba(10,30,100,0.35)",
    barFill:      "linear-gradient(90deg,#002299,#4488ff)", barGlow: "0 0 7px rgba(60,120,255,0.5)",
    cardBg:       "rgba(2,5,25,0.7)", cardBorder: "rgba(40,100,240,0.25)",
    glowShadow:   "0 0 30px rgba(50,100,255,0.35)",
  },
};

export default function SkillsSection({ mode }: Props) {
  const t = themes[mode];
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        x: -50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center md:text-left">
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" 
            style={{ color: t.dimColor, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
            04 // POWERS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight" 
            style={{ textShadow: `2px 2px 10px rgba(0,0,0,0.9), ${t.glowShadow}` }}>
            Skills
          </h2>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          <div className="p-8 rounded-2xl space-y-8 backdrop-blur-3xl"
            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.glowShadow }}>
            <div className="space-y-6">
              {skills.map((s, i) => (
                <div key={s.name} className="skill-card group">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-mono tracking-widest text-white uppercase" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                      {String(i + 1).padStart(2, "0")} // {s.name}
                    </span>
                    <span className="text-xs font-mono opacity-50 text-white italic">{s.level}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full overflow-hidden relative" style={{ background: t.barBg }}>
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${s.level}%`, 
                        background: t.barFill,
                        boxShadow: t.barGlow 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
