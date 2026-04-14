import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Award, Medal, Star, Target } from "lucide-react";
import { HeroMode } from "@/pages/Index";

gsap.registerPlugin(ScrollTrigger);

type Props = { mode: HeroMode };

type Achievement = {
  icon: any;
  title: string;
  desc: string;
  sub: string;
};

const achievements: Record<HeroMode, Achievement[]> = {
  spidey: [
    { icon: Trophy, title: "Spider-Sense Certified", desc: "High-speed UI precision and flawless state management.", sub: "WEB SLINGER OF CODE" },
    { icon: Star, title: "2-Star Slinger", desc: "Achieved a 1405 Codechef rating with 796+ algorithms solved with spider-like agility.", sub: "CODECHEF ELITE" },
    { icon: Medal, title: "Web-Slinger Award", desc: "Navigating complex infrastructures with agile precision.", sub: "AGILE MASTERY" },
  ],
  ironman: [
    { icon: Trophy, title: "Stark Industries Fellow", desc: "Awarded for breakthrough architectural efficiency and scale.", sub: "STARK-TECH LEVEL 5" },
    { icon: Star, title: "Grade 2 Algorithm Tech", desc: "Secured a 1405 Codechef rating and Gold Solver badge for 796+ optimized solutions.", sub: "STARK CERTIFIED" },
    { icon: Medal, title: "Nanotech Innovation", desc: "Pioneering modular UI components that adapt in real-time.", sub: "FUTURE PROOF" },
  ],
  deadpool: [
    { icon: Trophy, title: "Maximum Effort Award", desc: "Hardcore deployment under extreme fire. Zero bugs (surprising).", sub: "CHIMICHANGA PROOF" },
    { icon: Star, title: "2-Star Chimichanga", desc: "Smashed through 796+ Codechef problems with a 1405 rating. Maximum effort, minimal crying.", sub: "MAXIMUM CODING" },
    { icon: Medal, title: "Survivor of Legacy Projects", desc: "Successfully refactored a decade-old repo without dying.", sub: "HEALING FACTOR" },
  ],
  batman: [
    { icon: Trophy, title: "Gotham's Protector", desc: "Securing data fortresses against sophisticated digital threats.", sub: "SILENT GUARDIAN" },
    { icon: Star, title: "2-Star Detective", desc: "Investigated and solved 796+ complex Codechef puzzles. 1405 rating achieved from the shadows.", sub: "GOTHAM'S FINEST" },
    { icon: Medal, title: "League of Shadows Alumni", desc: "Mastered the arts of invisible background processing.", sub: "THE DARK DEV" },
  ],
  superman: [
    { icon: Trophy, title: "Man of Tomorrow", desc: "Building future-ready apps that stand the test of time.", sub: "KRYPTONIAN SCALE" },
    { icon: Star, title: "Steel-Strength Solver", desc: "A 1405 Codechef rating and Gold badge for solving 796+ planetary-scale challenges.", sub: "HALL OF JUSTICE" },
    { icon: Medal, title: "Hall of Justice Member", desc: "Leading enterprise teams to global architectural victory.", sub: "JUSTICE IN CODE" },
  ],
};

const themes: Record<HeroMode, { accent: string; dim: string; cardBg: string; border: string; glow: string }> = {
  spidey:   { accent: "#ffffff", dim: "#ffffff", cardBg: "rgba(5,5,10,0.9)",  border: "rgba(255,255,255,0.2)",  glow: "0 20px 40px rgba(0,0,0,0.5)" },
  ironman:  { accent: "#ff2200", dim: "#ff8c8c", cardBg: "rgba(20,0,0,0.9)", border: "rgba(255,0,0,0.25)",  glow: "0 20px 40px rgba(0,0,0,0.5)" },
  deadpool: { accent: "#dc1414", dim: "#ff4444", cardBg: "rgba(15,0,0,0.9)",  border: "rgba(255,255,255,0.1)", glow: "0 20px 40px rgba(0,0,0,0.5)" },
  batman:   { accent: "#fdc700", dim: "#ffe44d", cardBg: "rgba(5,5,15,0.95)", border: "rgba(255,220,0,0.2)", glow: "0 20px 40px rgba(0,0,0,0.6)" },
  superman: { accent: "#4488ff", dim: "#ffc000", cardBg: "rgba(2,10,35,0.9)", border: "rgba(50,150,255,0.25)", glow: "0 20px 40px rgba(0,0,0,0.5)" },
};

export default function AchievementsSection({ mode }: Props) {
  const t = themes[mode];
  const list = achievements[mode];
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ach-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        scale: 0.9, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [mode]);

  return (
    <section id="achievements" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16 text-center md:text-left">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: t.dim }}>
            03 // TROPHIES
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none"
            style={{ textShadow: "2px 2px 15px rgba(0,0,0,0.9)" }}>
            Achievements <span style={{ color: t.accent, textShadow: `0 0 20px ${t.accent}aa` }}>& Trophies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, idx) => (
            <div 
              key={idx}
              className="ach-card p-10 rounded-3xl border transition-all duration-500 group relative flex flex-col items-center text-center space-y-6 z-10"
              style={{ 
                backgroundColor: t.cardBg,
                borderColor: t.border,
                boxShadow: t.glow 
              }}
            >
              <div className="p-4 rounded-full border border-white/10 group-hover:scale-110 transition-transform duration-500"
                style={{ background: `${t.accent}15`, borderColor: t.border }}>
                <item.icon size={44} style={{ color: t.accent }} />
              </div>
              
              <div className="relative z-20">
                <p className="font-mono text-[10px] tracking-widest mb-2 opacity-40 uppercase">{item.sub}</p>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight uppercase italic"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}>{item.title}</h3>
                <p className="text-white/80 font-sans text-sm leading-relaxed max-w-[240px] mx-auto">
                  {item.desc}
                </p>
              </div>

              <div className="absolute top-4 right-4 font-mono text-[10px] opacity-20 group-hover:opacity-60 transition-opacity">
                #{String(idx + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.05] pointer-events-none"
        style={{ background: t.accent }} />
    </section>
  );
}
