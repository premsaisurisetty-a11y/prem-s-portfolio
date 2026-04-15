import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroMode } from "@/pages/Index";

gsap.registerPlugin(ScrollTrigger);

type Props = { mode: HeroMode };

// ─── Per-mode theme config ────────────────────────────────────────────────────
type AboutTheme = {
  tagline:        string;
  heading:        string;       // "About"
  headingAccent:  string;       // "Me" / "Tony Stark?" etc.
  accentColor:    string;       // CSS color string
  dimColor:       string;       // muted version
  cardBg:         string;
  cardBorder:     string;
  cardShadow:     string;
  cornerBorder:   string;
  barBg:          string;
  barFill:        string;
  barGlow:        string;
  tagBg:          string;
  tagBorder:      string;
  tagColor:       string;
  imgSrc:         string;
  imgFilter:      string;
  imgLabel:       string;
  bio1:           string;
  bio1Accent?:    string;
  bio2:           string;
  quote:          string;
  quoteAuthor:    string;
  glowShadow:     string;
};

const themes: Record<HeroMode, AboutTheme> = {
  spidey: {
    tagline:      "— THE GREATEST BATTLE LIES WITHIN —",
    heading:      "About", headingAccent: "Me",
    accentColor:  "#ffffff", dimColor: "#ffffff",
    cardBg:       "rgba(0,0,0,0.72)", cardBorder: "rgba(255,45,45,0.22)",
    cardShadow:   "0 0 30px rgba(0,0,0,0.45)",
    cornerBorder: "#ff2d2d",
    barBg:        "rgba(255,45,45,0.1)",
    barFill:      "linear-gradient(90deg,#ff2d2d,#cc0000)", barGlow: "0 0 10px rgba(255,45,45,0.35)",
    tagBg:        "rgba(255,45,45,0.08)", tagBorder: "rgba(255,45,45,0.25)", tagColor: "#ff2d2d",
    imgSrc:       "/personal-image.png",
    imgFilter:    "brightness(1.1) contrast(1.1)",
    imgLabel:     "PREM SAI SURISETTI — WEB SLINGER OF CODE",
    bio1:         "I am a Full Stack Developer weaving together", bio1Accent: "logic and scale",
    bio2:         "In a world where digital experiences are the new frontier, I specialize in architecting high-performance web applications that serve as the connective tissue for modern enterprises. From the initial thread of a frontend concept to the robust web of a backend infrastructure, my mission is to deliver seamless, scalable solutions. Like a web-slinger protecting the neighborhood, I guard the integrity of every pixel and line of code, ensuring that every project I touch is built with the precision and reliability required for the weight of today's digital demands.",
    quote:        "\"With great power comes great responsibility.\"", quoteAuthor: "— Uncle Ben",
    glowShadow:   "0 0 40px rgba(255,45,45,0.4)",
  },
  ironman: {
    tagline:      "// STARK INDUSTRIES — AUTHORIZED PERSONNEL ONLY",
    heading:      "Who Is", headingAccent: "Iron Man?",
    accentColor:  "#ff2200", dimColor: "#ff8c8c",
    cardBg:       "rgba(20,0,0,0.6)", cardBorder: "rgba(200,0,0,0.4)",
    cardShadow:   "0 0 20px rgba(180,0,0,0.2)",
    cornerBorder: "#ff2200",
    barBg:        "rgba(80,0,0,0.4)",
    barFill:      "linear-gradient(90deg,#880000,#ff2200)", barGlow: "0 0 8px rgba(255,34,0,0.6)",
    tagBg:        "rgba(180,0,0,0.2)", tagBorder: "rgba(200,0,0,0.5)", tagColor: "#ff6666",
    imgSrc:       "/personal-image.png",
    imgFilter:    "brightness(0.9) saturate(1.1)",
    imgLabel:     "PREM SAI SURISETTI — ENGINEER OF INTELLIGENT SYSTEMS",
    bio1:         "I am a Full Stack Developer architecting", bio1Accent: "high-performance systems",
    bio2:         "Leveraging Stark-level precision and nanotech-inspired efficiency, I engineer digital infrastructures that are as robust as a vibranium-titanium alloy. My approach to full-stack development is rooted in the belief that every line of code should be a piece of a larger, intelligent ecosystem. Whether I'm optimizing a React-driven heads-up display or architecting a massive Node.js server array, I focus on creating systems that are not just functional, but revolutionary. I don't just build websites; I build the future of the web, one module at a time.",
    quote:        "\"My armor was never a distraction. I am Iron Man.\"", quoteAuthor: "— Tony Stark",
    glowShadow:   "0 0 30px rgba(220,30,0,0.6)",
  },
  deadpool: {
    tagline:      "— MAXIMUM EFFORT — ALWAYS —",
    heading:      "The Merc With a", headingAccent: "Portfolio",
    accentColor:  "#dc1414", dimColor: "#ff4444",
    cardBg:       "rgba(15,0,0,0.7)", cardBorder: "rgba(200,20,20,0.35)",
    cardShadow:   "0 0 20px rgba(180,0,0,0.15)",
    cornerBorder: "#dc1414",
    barBg:        "rgba(80,0,0,0.4)",
    barFill:      "linear-gradient(90deg,#7a0000,#ee1010)", barGlow: "0 0 7px rgba(220,20,0,0.6)",
    tagBg:        "rgba(150,0,0,0.45)", tagBorder: "rgba(255,250,250,1)", tagColor: "#ffffff",
    imgSrc:       "/personal-image.png",
    imgFilter:    "brightness(0.85) contrast(1.1)",
    imgLabel:     "PREM SAI SURISETTI — THE MERC WITH A MOUSE",
    bio1:         "I am a Full Stack Developer with", bio1Accent: "Maximum Efficiency,",
    bio2:         "Listen, I don't just 'code'—I go in with Maximum Effort and carve out digital masterpieces that make other developers cry in their chimichangas. Breaking the fourth wall of boring UI is my specialty, delivering full-stack apps that are leaner, faster, and cooler than anything else on the market. When I'm not optimizing a server's healing factor or cleaning up messy legacy code like a mercenary on a mission, I'm finding high-octane ways to sell web pages that actually convert. It's about being the best at what I do, and what I do is build scalable applications that kick butt.",
    quote:        "\"With great power comes great irresponsibility. Just kidding. Maximum effort.\"",
    quoteAuthor:  "— Deadpool",
    glowShadow:   "0 0 30px rgba(200,20,0,0.5)",
  },
  batman: {
    tagline:      "— GOTHAM'S FINEST —",
    heading:      "The Dark", headingAccent: "Knight",
    accentColor:  "#fdc700", dimColor: "#ffe44d",
    cardBg:       "rgba(5,5,12,0.8)", cardBorder: "rgba(180,140,0,0.3)",
    cardShadow:   "0 0 20px rgba(120,90,0,0.15)",
    cornerBorder: "#fdc700",
    barBg:        "rgba(50,40,0,0.5)",
    barFill:      "linear-gradient(90deg,#4a3800,#c89800)", barGlow: "0 0 7px rgba(220,160,0,0.5)",
    tagBg:        "rgba(80,60,0,0.3)", tagBorder: "rgba(180,140,0,0.4)", tagColor: "#fdc700",
    imgSrc:       "/personal-image.png",
    imgFilter:    "brightness(0.8) contrast(1.2) grayscale(20%)",
    imgLabel:     "PREM SAI SURISETTI — THE DARK DEVELOPER",
    bio1:         "I am a Full Stack Developer bringing", bio1Accent: "order to chaos,",
    bio2:         "Operating from the shadows of complex logic, I architect secure and highly scalable digital environments that stand as fortresses of engineering excellence. My methodology is defined by an unwavering dedication to performance and security, ensuring that every application I build can withstand the toughest digital storms. Much like the guardian of Gotham, I am a silent protector of data integrity and user experience, building symbols of reliability that users can trust. From optimized database schemas to high-fidelity frontend interfaces, I bring a methodical, disciplined approach to the relentless pursuit of perfection.",
    quote:        "\"I am vengeance. I am the night. I am Batman.\"", quoteAuthor: "— Bruce Wayne",
    glowShadow:   "0 0 30px rgba(180,130,0,0.4)",
  },
  superman: {
    tagline:      "— UP, UP AND AWAY —",
    heading:      "The Man of", headingAccent: "Steel",
    accentColor:  "#4488ff", dimColor: "#ffc000",
    cardBg:       "rgba(2,5,25,0.75)", cardBorder: "rgba(40,100,240,0.3)",
    cardShadow:   "0 0 20px rgba(20,60,200,0.15)",
    cornerBorder: "#4488ff",
    barBg:        "rgba(10,30,100,0.4)",
    barFill:      "linear-gradient(90deg,#002299,#4488ff)", barGlow: "0 0 7px rgba(60,120,255,0.5)",
    tagBg:        "rgba(10,30,110,0.35)", tagBorder: "rgba(40,100,240,0.4)", tagColor: "#ffc000",
    imgSrc:       "/personal-image.png",
    imgFilter:    "brightness(1.0) saturate(1.2)",
    imgLabel:     "PREM SAI SURISETTI — FULL STACK POWERHOUSE",
    bio1:         "I am a Full Stack Developer building", bio1Accent: "a better web,",
    bio2:         "Driven by a commitment to truth in data and an unwavering belief in the power of modern engineering, I build applications that serve as a beacon for what is possible in the digital age. I possess the strength to lift entire server architectures and the vision to see through the most complex frontend challenges. My goal is to create a web that is as fast as a speeding bullet and as powerful as a locomotive, empowering people with tools that are both resilient and inspiring. I am a full-stack powerhouse dedicated to the relentless pursuit of excellence, fighting for a more efficient and impactful digital world.",
    quote:        "\"You will give the people of Earth an ideal to strive towards.\"", quoteAuthor: "— Jor-El",
    glowShadow:   "0 0 30px rgba(50,100,255,0.4)",
  },
};

// ─── Generic mode About layout ────────────────────────────────────────────────
function ModeAbout({ mode }: { mode: HeroMode }) {
  const t = themes[mode];
  const cornerStyles = [
    { top: 0, left: 0,  borderTop: `1px solid ${t.cornerBorder}`, borderLeft:  `1px solid ${t.cornerBorder}` },
    { top: 0, right: 0, borderTop: `1px solid ${t.cornerBorder}`, borderRight: `1px solid ${t.cornerBorder}` },
  ];

  return (
    <section id="about" className="relative py-20 px-6">
      <p className="text-center font-mono text-xs tracking-[0.35em] uppercase mb-12"
        style={{ color: t.dimColor, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>{t.tagline}</p>

      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 relative">
          {/* Image frame & HUD */}
          <div className="order-1 relative z-20 opacity-100 w-full mt-2">
            <div className="sticky top-28 flex flex-col items-center gap-8">
              
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl w-72 h-96 md:w-80 md:h-[440px]"
                  style={{ border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, background: t.cardBg }}>
                  <img src={t.imgSrc} alt={mode} className="w-full h-full object-cover object-top"
                    style={{ filter: t.imgFilter }} />
                  <div className="absolute inset-0"
                    style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3 font-mono text-xs z-10"
                    style={{ background: "rgba(0,0,10,0.85)", borderTop: "1px solid rgba(255,255,255,0.1)", color: t.dimColor, letterSpacing: "0.13em", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                    {t.imgLabel}
                  </div>
                </div>
                {cornerStyles.map((s, i) => (
                  <div key={i} className="absolute w-6 h-6 z-20" style={s} />
                ))}
              </div>

            </div>
          </div>

          {/* Text content */}
          <div className="space-y-5 order-2 relative z-20 w-full">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white" style={{ textShadow: `2px 2px 10px rgba(0,0,0,0.9), ${t.glowShadow}` }}>
              {t.heading} <span style={{ color: t.accentColor }}>{t.headingAccent}</span>
            </h2>

            <div className="p-6 rounded-xl space-y-3"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, backdropFilter: "blur(25px)" }}>
              <p className="text-white leading-relaxed text-base">
                {t.bio1}{" "}
                {t.bio1Accent && <span style={{ color: t.accentColor }}>{t.bio1Accent}</span>}{" "}
                {t.bio2}
              </p>
              <blockquote className="border-l-4 pl-4 italic text-sm text-white"
                style={{ borderColor: t.accentColor }}>
                {t.quote}<br />
                <span className="not-italic font-bold text-xs" style={{ color: t.accentColor }}>{t.quoteAuthor}</span>
              </blockquote>
            </div>

            <div className="p-6 rounded-xl space-y-4"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, backdropFilter: "blur(25px)" }}>
               <h3 className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: t.accentColor }}>Education & Experience</h3>
               
               <div className="flex flex-col gap-1 relative pl-4 border-l-2" style={{ borderColor: `${t.accentColor}40` }}>
                 <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1.5" style={{ background: t.accentColor, boxShadow: `0 0 10px ${t.accentColor}` }} />
                 <h4 className="text-white font-bold text-lg tracking-wide uppercase italic">KL UNIVERSITY, HYDERABAD</h4>
                 <p className="text-white/80 text-sm font-mono tracking-widest">B.TECH IN COMPUTER SCIENCE</p>
                 <p className="text-sm font-mono tracking-widest mt-1" style={{ color: t.accentColor }}>CGPA: 9.58</p>
               </div>

               <div className="pt-4 mt-4" style={{ borderTop: `1px solid ${t.cardBorder}` }}>
                 <p className="text-white/70 text-xs leading-relaxed font-mono tracking-wide">
                   <strong style={{ color: t.accentColor }}>Relevant Coursework:</strong><br />
                   <span className="mt-1 block">Data Structures • Web Dev • OOP (Java)</span>
                 </p>
               </div>
            </div>

            <div className="p-6 rounded-xl space-y-4"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, backdropFilter: "blur(25px)" }}>
               <h3 className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: t.accentColor }}>Technical Journey</h3>
               
               <ul className="space-y-3">
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Started learning programming with Java</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Developed strong foundation in Data Structures & Algorithms</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Built multiple full-stack applications using React & Node.js</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Continuously improving problem-solving and system design skills</p>
                 </li>
               </ul>
            </div>

            <div className="p-6 rounded-xl space-y-4"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, backdropFilter: "blur(25px)" }}>
               <h3 className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: t.accentColor }}>Skill Development</h3>
               
               <ul className="space-y-3">
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Focused on writing clean and efficient code</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Practicing DSA regularly on coding platforms</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Exploring backend development and API design</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Learning modern frontend frameworks and UI/UX principles</p>
                 </li>
               </ul>
            </div>

            <div className="p-6 rounded-xl space-y-4"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, backdropFilter: "blur(25px)" }}>
               <h3 className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: t.accentColor }}>Current Focus</h3>
               
               <ul className="space-y-3">
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Full Stack Development</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Problem Solving (DSA)</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Building real-world projects</p>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accentColor, boxShadow: `0 0 8px ${t.accentColor}` }} />
                   <p className="text-white/80 text-sm leading-relaxed font-mono tracking-wide">Preparing for internships and placements</p>
                 </li>
               </ul>
            </div>

            </div>
          </div>
        </div>
      </section>
  );
}

// ─── Default exported section ─────────────────────────────────────────────────
export default function AboutSection({ mode }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Component mounted
  }, []);

  // All hero modes use the generic ModeAbout with per-mode theme
  return (
    <div ref={sectionRef}>
      <ModeAbout mode={mode} />
    </div>
  );
}
