import { HeroMode } from "@/pages/Index";
import { use3DTilt } from "@/hooks/use3DTilt";
import { 
  Code2, 
  Layout, 
  Zap, 
  Search, 
  Globe 
} from "lucide-react";

type Props = { mode: HeroMode };

const serviceThemes: Record<HeroMode, { accent: string; bg: string; border: string }> = {
  spidey:   { accent: "#ffffff", bg: "rgba(10,0,0,0.6)", border: "rgba(255,51,51,0.3)" },
  ironman:  { accent: "#ff2200", bg: "rgba(15,0,0,0.7)", border: "rgba(255,34,0,0.4)" },
  deadpool: { accent: "#ff003c", bg: "rgba(12,0,0,0.7)", border: "rgba(255,0,60,0.4)" },
  batman:   { accent: "#ffea00", bg: "rgba(5,5,5,0.8)",   border: "rgba(255,234,0,0.3)" },
  superman: { accent: "#00a2ff", bg: "rgba(0,10,50,0.6)", border: "rgba(0,162,255,0.4)" },
};

const servicesList = [
  {
    icon: Globe,
    title: "High-Conversion Web Pages",
    desc: "I specialize in selling digital experiences. From landing pages to full storefronts, I build high-performance web pages that turn visitors into customers.",
  },
  {
    icon: Code2,
    title: "Scalable Full-Stack Apps",
    desc: "Architecting robust backend systems and seamless front-end interfaces that handle thousands of users without breaking a sweat.",
  },
  {
    icon: Zap,
    title: "Cinematic UI/UX Design",
    desc: "Bringing your brand to life with high-fidelity animations, 3D interactions, and a user experience that feels like magic.",
  },
  {
    icon: Search,
    title: "SEO & Digital Strategy",
    desc: "Optimizing your site for peak visibility. I ensure your web pages don't just look good—they actually sell and reach the global market.",
  },
];

function ServiceCard({ service, theme }: { service: typeof servicesList[0], theme: typeof serviceThemes[HeroMode] }) {
  const tiltRef = use3DTilt({ maxRotation: 10, scale: 1.02 });

  return (
    <div 
      ref={tiltRef}
      className="p-8 rounded-3xl border border-white/10 backdrop-blur-3xl transition-all duration-500 group relative overflow-hidden transition-shadow select-none cursor-default"
      style={{ 
        background: theme.bg,
        borderColor: theme.border,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Animated Accent Line */}
      <div className="absolute top-0 left-0 w-1 h-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" 
        style={{ background: theme.accent }} />

      <div className="flex flex-col gap-6" style={{ transform: "translateZ(40px)" }}>
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg"
          style={{ 
            background: `${theme.accent}15`, 
            border: `1px solid ${theme.border}`,
            transform: "translateZ(20px)"
          }}
        >
          <service.icon size={28} style={{ color: theme.accent }} />
        </div>
        
        <div style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-500">
            {service.title}
          </h3>
          <p className="text-white/80 font-sans leading-relaxed text-sm">
            {service.desc}
          </p>
        </div>
      </div>

      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${theme.accent}, transparent 70%)` }} />
    </div>
  );
}

export default function ServicesSection({ mode }: Props) {
  const theme = serviceThemes[mode];

  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden perspective-1000">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: theme.accent }}>
            SOLUTIONS
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none"
            style={{ textShadow: "2px 2px 12px rgba(0,0,0,0.95)" }}>
            Services <span style={{ 
              color: "white", 
              WebkitTextStroke: `1px ${theme.accent}`,
              textShadow: `2px 2px 8px rgba(0,0,0,0.85), 0 0 10px ${theme.accent}, 0 0 30px ${theme.accent}aa, 0 0 60px ${theme.accent}66` 
            }}>Rendered</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, idx) => (
            <ServiceCard key={idx} service={service} theme={theme} />
          ))}
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 pointer-events-none"
        style={{ background: theme.accent }} />
    </section>
  );
}
