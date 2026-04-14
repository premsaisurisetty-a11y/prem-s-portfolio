import { useState, useEffect, useRef } from "react";
import { Github, Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroMode } from "@/pages/Index";

gsap.registerPlugin(ScrollTrigger);

type Props = { mode: HeroMode };

type ContactTheme = {
  accentColor:    string;
  dimColor:       string;
  heading:        string;
  headingAccent:  string;
  subheader:      string;
  statusText:     string;
  statusColor:    string;
  formBg:         string;
  formBorder:     string;
  formShadow:     string;
  cornerBorder:   string;
  fieldBg:        string;
  fieldBorder:    string;
  fieldFocusBorder: string;
  fieldFocusShadow: string;
  btnBg:          string;
  btnBorder:      string;
  btnShadow:      string;
  btnHoverBg:     string;
  btnHoverShadow: string;
  btnText:        string;
  submitLabel:    string;
  namePlaceholder:string;
  emailPlaceholder:string;
  msgPlaceholder: string;
  glowShadow:     string;
};

const themes: Record<HeroMode, ContactTheme> = {
  spidey: {
    accentColor:    "#ffffff", dimColor: "#ffffff",
    heading:        "Get In", headingAccent: "Touch",
    subheader:      "SIGNAL",
    statusText:     "J. JONAH JAMESON COMM CHANNEL — OPEN",
    statusColor:    "#ffffff",
    formBg:         "rgba(0,0,0,0.8)",
    formBorder:     "rgba(255,255,255,0.35)",
    formShadow:     "0 0 30px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.08)",
    cornerBorder:   "#ffffff",
    fieldBg:        "rgba(255,255,255,0.05)",
    fieldBorder:    "rgba(255,255,255,0.25)",
    fieldFocusBorder:"#ffffff",
    fieldFocusShadow:"0 0 15px rgba(255,255,255,0.35)",
    btnBg:          "rgba(255,255,255,0.9)",
    btnBorder:      "rgba(255,255,255,1)",
    btnShadow:      "0 0 20px rgba(255,255,255,0.25)",
    btnHoverBg:     "#ffffff",
    btnHoverShadow: "0 0 40px rgba(255,255,255,0.55)",
    btnText:        "#000000",
    submitLabel:    "Send Message",
    namePlaceholder: "Prem Sai Surisetti",
    emailPlaceholder:"yourname@example.com",
    msgPlaceholder:  "Your message...",
    glowShadow:     "0 0 40px rgba(255,255,255,0.3)",
  },
  ironman: {
    accentColor:    "#ff2200", dimColor: "#ff4444",
    heading:        "Contact", headingAccent: "Stark Tech",
    subheader:      "SIGNAL",
    statusText:     "STARK INDUSTRIES COMM SYSTEM — ONLINE",
    statusColor:    "#ff4444",
    formBg:         "rgba(10,0,0,0.7)",
    formBorder:     "#cc0000",
    formShadow:     "0 0 30px rgba(200,0,0,0.5), 0 0 80px rgba(180,0,0,0.2)",
    cornerBorder:   "#ff2200",
    fieldBg:        "rgba(20,0,0,0.6)",
    fieldBorder:    "rgba(180,0,0,0.5)",
    fieldFocusBorder:"#ff2200",
    fieldFocusShadow:"0 0 12px rgba(255,34,0,0.4)",
    btnBg:          "#cc0000",
    btnBorder:      "#ff2200",
    btnShadow:      "0 0 20px rgba(200,0,0,0.5)",
    btnHoverBg:     "#ff0000",
    btnHoverShadow: "0 0 40px rgba(255,34,0,0.8)",
    btnText:        "#ffffff",
    submitLabel:    "Transmit Message",
    namePlaceholder: "Enter Your Name",
    emailPlaceholder:"Your Email",
    msgPlaceholder:  "Share Your Message",
    glowShadow:     "0 0 30px rgba(220,30,0,0.6)",
  },
  deadpool: {
    accentColor:    "#dc1414", dimColor: "#ff4444",
    heading:        "Hire the", headingAccent: "Merc",
    subheader:      "SIGNAL",
    statusText:     "DEADPOOL COMMS — SURPRISINGLY SECURE",
    statusColor:    "#ff4444",
    formBg:         "rgba(12,0,0,0.75)",
    formBorder:     "#aa0000",
    formShadow:     "0 0 30px rgba(180,0,0,0.4), 0 0 80px rgba(150,0,0,0.15)",
    cornerBorder:   "#dc1414",
    fieldBg:        "rgba(18,0,0,0.65)",
    fieldBorder:    "rgba(160,20,20,0.45)",
    fieldFocusBorder:"#dc1414",
    fieldFocusShadow:"0 0 12px rgba(200,20,0,0.4)",
    btnBg:          "#aa0000",
    btnBorder:      "#dc1414",
    btnShadow:      "0 0 20px rgba(180,0,0,0.4)",
    btnHoverBg:     "#dd0000",
    btnHoverShadow: "0 0 35px rgba(220,20,0,0.7)",
    btnText:        "#ffffff",
    submitLabel:    "Maximum Effort — Send It",
    namePlaceholder: "Wade Wilson (or your actual name)",
    emailPlaceholder:"your@email.com",
    msgPlaceholder:  "Say it loud, say it proud...",
    glowShadow:     "0 0 30px rgba(200,20,0,0.5)",
  },
  batman: {
    accentColor:    "#fdc700", dimColor: "#ffe44d",
    heading:        "Activate the", headingAccent: "Bat-Signal",
    subheader:      "SIGNAL",
    statusText:     "BAT-SIGNAL ACTIVE — AWAITING RESPONSE",
    statusColor:    "#fdc700",
    formBg:         "rgba(5,5,12,0.85)",
    formBorder:     "#9a7a00",
    formShadow:     "0 0 30px rgba(150,120,0,0.35), 0 0 80px rgba(100,80,0,0.15)",
    cornerBorder:   "#fdc700",
    fieldBg:        "rgba(8,8,18,0.7)",
    fieldBorder:    "rgba(140,110,0,0.4)",
    fieldFocusBorder:"#fdc700",
    fieldFocusShadow:"0 0 12px rgba(200,160,0,0.35)",
    btnBg:          "#7a5c00",
    btnBorder:      "#fdc700",
    btnShadow:      "0 0 20px rgba(160,120,0,0.35)",
    btnHoverBg:     "#aa8200",
    btnHoverShadow: "0 0 35px rgba(220,170,0,0.5)",
    btnText:        "#ffffff",
    submitLabel:    "Send the Signal",
    namePlaceholder: "Bruce Wayne",
    emailPlaceholder:"batman@waynecorp.com",
    msgPlaceholder:  "I need your help with...",
    glowShadow:     "0 0 30px rgba(180,130,0,0.4)",
  },
  superman: {
    accentColor:    "#4488ff", dimColor: "#ffc000",
    heading:        "Fortress of", headingAccent: "Solitude",
    subheader:      "SIGNAL",
    statusText:     "FORTRESS OF SOLITUDE — COMMS ACTIVE",
    statusColor:    "#ffc000",
    formBg:         "rgba(2,5,25,0.8)",
    formBorder:     "rgba(40,100,240,0.5)",
    formShadow:     "0 0 30px rgba(30,80,200,0.3), 0 0 80px rgba(20,60,160,0.12)",
    cornerBorder:   "#4488ff",
    fieldBg:        "rgba(3,8,30,0.7)",
    fieldBorder:    "rgba(40,100,240,0.4)",
    fieldFocusBorder:"#4488ff",
    fieldFocusShadow:"0 0 12px rgba(60,120,255,0.35)",
    btnBg:          "rgba(0,30,160,0.85)",
    btnBorder:      "#4488ff",
    btnShadow:      "0 0 20px rgba(30,80,200,0.35)",
    btnHoverBg:     "rgba(0,50,200,0.95)",
    btnHoverShadow: "0 0 35px rgba(50,120,255,0.5)",
    btnText:        "#ffffff",
    submitLabel:    "Send to the Fortress",
    namePlaceholder: "Clark Kent",
    emailPlaceholder:"superman@dailyplanet.com",
    msgPlaceholder:  "Truth, justice, and your message...",
    glowShadow:     "0 0 30px rgba(50,100,255,0.4)",
  },
};

// ─── Generic mode Contact layout ──────────────────────────────────────────────
function ModeContact({ mode }: { mode: HeroMode }) {
  const t = themes[mode];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    // Add your Web3Forms access key here or in an .env file
    formData.append("access_key", "0a293bcd-adeb-4368-b2b9-8b6f7d917474");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        
        // Track Form Submission in GA4
        // @ts-ignore
        if (typeof gtag !== 'undefined') {
          // @ts-ignore
          gtag('event', 'generate_lead', {
            'event_category': 'Contact',
            'event_label': 'Contact Form Success',
            'hero_mode': mode
          });
        }
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = t.fieldFocusBorder;
    e.currentTarget.style.boxShadow   = t.fieldFocusShadow;
  };
  const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = t.fieldBorder;
    e.currentTarget.style.boxShadow   = "none";
  };

  const fieldBase = "w-full px-4 py-3 rounded-lg font-mono text-sm text-white placeholder:text-white/20 focus:outline-none transition-all duration-300";
  const fieldStyle = { background: t.fieldBg, border: `1px solid ${t.fieldBorder}` };

  return (
    <section id="contact" className="relative py-20 px-6">
      <div className="container mx-auto max-w-2xl">
        <p className="text-center font-mono text-xs tracking-[0.35em] uppercase mb-4"
          style={{ color: t.dimColor }}>{t.subheader}</p>
        <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight"
          style={{ textShadow: `2px 2px 10px rgba(0,0,0,0.9), ${t.glowShadow}` }}>
          {t.heading} <span style={{ color: t.accentColor }}>{t.headingAccent}</span>
        </h2>

        <div className="relative rounded-2xl p-8"
          style={{ background: t.formBg, border: `2px solid ${t.formBorder}`, boxShadow: t.formShadow, backdropFilter: "blur(28px)" }}>
          {/* HUD corners */}
          {["top-2 left-2","top-2 right-2","bottom-2 left-2","bottom-2 right-2"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-5 h-5`} style={{
              borderTop:    i < 2  ? `2px solid ${t.cornerBorder}` : undefined,
              borderBottom: i >= 2 ? `2px solid ${t.cornerBorder}` : undefined,
              borderLeft:   i%2===0? `2px solid ${t.cornerBorder}` : undefined,
              borderRight:  i%2===1? `2px solid ${t.cornerBorder}` : undefined,
            }} />
          ))}

          {/* Status strip */}
          <div className="flex items-center gap-2 mb-6 pb-4"
            style={{ borderBottom: `1px solid ${t.formBorder}40` }}>
            <div className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: t.accentColor, boxShadow: `0 0 6px ${t.accentColor}` }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: t.statusColor }}>
              {t.statusText}
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs mb-1" style={{ color: t.accentColor, letterSpacing: "0.14em" }}>YOUR NAME</label>
                <input type="text" name="name" required placeholder={t.namePlaceholder} className={fieldBase} style={fieldStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <label className="block font-mono text-xs mb-1" style={{ color: t.accentColor, letterSpacing: "0.14em" }}>YOUR EMAIL</label>
                <input type="email" name="email" required placeholder={t.emailPlaceholder} className={fieldBase} style={fieldStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs mb-1" style={{ color: t.accentColor, letterSpacing: "0.14em" }}>MESSAGE</label>
              <textarea rows={5} name="message" required placeholder={t.msgPlaceholder}
                className="w-full px-4 py-3 rounded-lg font-mono text-sm text-white placeholder:text-white/50 focus:outline-none resize-none transition-all duration-300"
                style={fieldStyle} onFocus={onFocus as never} onBlur={onBlur as never} />
            </div>
            <div className="pt-2">
              <button type="submit"
                disabled={status === "sending"}
                className={`w-full py-4 font-bold tracking-[0.2em] uppercase rounded-lg transition-all duration-300 ${status === "sending" ? "opacity-50 cursor-not-allowed" : ""}`}
                style={{ background: t.btnBg, border: `1px solid ${t.btnBorder}`, boxShadow: t.btnShadow, color: t.btnText, letterSpacing: "0.22em" }}
                onMouseEnter={e => { if (status !== "sending") { (e.currentTarget as HTMLElement).style.background = t.btnHoverBg; (e.currentTarget as HTMLElement).style.boxShadow = t.btnHoverShadow; } }}
                onMouseLeave={e => { if (status !== "sending") { (e.currentTarget as HTMLElement).style.background = t.btnBg; (e.currentTarget as HTMLElement).style.boxShadow = t.btnShadow; } }}
              >
                {status === "sending" ? "TRANSMITTING..." : status === "success" ? "SENT SUCCESSFULLY! — MISSION ACCOMPLISHED" : t.submitLabel}
              </button>
              {status === "error" && (
                <p className="mt-4 text-center font-mono text-xs p-3 rounded-lg border border-red-500/50 bg-red-500/10 text-red-400">
                  ERROR: CHANNEL BLOCKED BY STARK SECURITY — PLEASE TRY AGAIN LATER.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Social links */}
        <div className="mt-10 flex flex-col items-center gap-6 text-center">
          <div className="flex justify-center gap-8 items-center mb-6">
            {[
              { label: "GitHub",   href: "https://github.com/premsaisurisetty-a11y", icon: Github },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/surisetti-prem-sai-872003382/", icon: Linkedin }
            ].map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/10 bg-white/5 transition-all duration-500 group"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = t.accentColor; (e.currentTarget as HTMLElement).style.background = `${t.accentColor}10`; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${t.accentColor}33`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <social.icon size={24} className="text-white transition-all duration-500 group-hover:scale-110" 
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}
                  onMouseEnter={e => { (e.currentTarget as any).style.color = t.accentColor; }}
                  onMouseLeave={e => { (e.currentTarget as any).style.color = "white"; }} />
              </a>
            ))}
          </div>
          <a href="mailto:premsaisurisetty@gmail.com" 
            className="font-mono text-xl md:text-2xl tracking-[0.15em] transition-all duration-500 text-white hover:text-white pb-2 border-b-2 border-transparent hover:border-white/40"
            style={{ textShadow: "3px 3px 15px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.5)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = t.accentColor; (e.currentTarget as HTMLElement).style.textShadow = `0 0 25px ${t.accentColor}`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ""; (e.currentTarget as HTMLElement).style.textShadow = "0 2px 10px rgba(0,0,0,0.8)"; }}>
            premsaisurisetty@gmail.com
          </a>

          {/* Download Portfolio Button */}
          <a
            href={`/portfolio.html?mode=${mode}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              localStorage.setItem('hero-mode', mode);
              // Track Resume view in GA4
              // @ts-ignore
              if (typeof gtag !== 'undefined') {
                // @ts-ignore
                gtag('event', 'view_resume', {
                  'event_category': 'Engagement',
                  'event_label': 'Contact Page Resume Button',
                  'hero_mode': mode
                });
              }
            }}
            className="mt-4 inline-flex items-center gap-3 px-8 py-3 rounded-xl font-mono text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 border"
            style={{
              color: "white",
              borderColor: `${t.accentColor}60`,
              background: `${t.accentColor}10`,
              boxShadow: `0 0 20px ${t.accentColor}20`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${t.accentColor}25`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${t.accentColor}50`;
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = `${t.accentColor}10`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${t.accentColor}20`;
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            View Resume
          </a>
        </div>
      </div>

      {/* Footer Credit */}
      <div className="container mx-auto max-w-6xl px-6 pt-10 pb-6 border-t mt-10" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p className="text-center font-mono text-xs tracking-[0.25em] uppercase" style={{ color: "white", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
          Designed &amp; Built By{" "}
          <span className="font-bold">PREM SAI SURISETTI</span>
          {" "}—{" "}
          <span>© 2026</span>
        </p>
      </div>

    </section>
  );
}

// ─── Default exported section ─────────────────────────────────────────────────
export default function ContactSection({ mode }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Component mounted
  }, []);

  return (
    <div ref={sectionRef}>
      <ModeContact mode={mode} />
    </div>
  );
}
