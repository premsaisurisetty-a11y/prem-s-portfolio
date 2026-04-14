import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ExternalLink, Cpu } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HeroMode } from "./Index";
import SpideyBackground from "@/components/SpideyBackground";
import IronManBackground from "@/components/IronManBackground";
import DeadpoolBackground from "@/components/DeadpoolBackground";
import BatmanBackground from "@/components/BatmanBackground";
import SupermanBackground from "@/components/SupermanBackground";

const projects = [
  {
    title: "Learn 2 Code",
    tagline: "Mastering the Algorithmic Frontier",
    image: "/learn2code-bg.png",
    url: "https://learn2code-beige.vercel.app/",
    context: "Learn 2 Code is a state-of-the-art interactive platform designed for developers who strive for algorithmic excellence. It provides a gamified experience where users can master complex data structures through real-time feedback, interactive modules, and personalized skill progression roadmaps. Whether you're sharpening your 'Spider-Sense' or training like a 'Kryptonian', this platform bridges the gap between learning and mastery with world-class challenges. Built with a focus on immersive UX and technical precision, it stands as a testament to the power of educational technology in the modern developer ecosystem.",
    features: ["Interactive Algorithmic Visualizer", "Real-time Feedback Engine", "Themed Career Paths", "Advanced DS Mastery Modules"],
  },
  {
    title: "User Pulse",
    tagline: "Predictive Intelligence for Enterprise Retail",
    image: "/userpulse-bg.png",
    url: "https://user-pulse-kohl.vercel.app/",
    context: "User Pulse is an enterprise-grade AI intelligence system focused on predictive customer behavior. Utilizing advanced deep learning models, it analyzes high-volume store data to detect subtle patterns indicating customer churn. Once identified, it automatically triggers re-engagement protocols with tailored offers, effectively 'neutralizing' exit risks. It's the ultimate predictive tool for e-commerce, offering a data-driven 'sixth sense' for business growth. By bridging the gap between raw data and actionable insights, User Pulse empowers retailers to maintain a high-frequency pulse on their customer base and maximize long-term retention.",
    features: ["Neural Churn Prediction", "Automated Re-engagement API", "Real-time Analytics Dashboard", "Enterprise Data Integration"],
  },
  {
    title: "CertVerify GenAI",
    tagline: "Next-Gen AI Credential Authentication",
    image: "/certverify-bg.png",
    url: "https://sage-pixie-86613e.netlify.app/",
    context: "CertVerify GenAI is a high-precision authentication layer designed for the next generation of digital credentials. Leveraging advanced generative intelligence, it automates the creation and verification of secure certificates with cryptographic certainty. It's the 'Iron Man' of digital trust, ensuring every achievement is backed by AI-driven validation and seamless verification protocols.",
    features: ["AI-Driven Certificate Generation", "Cryptographic Verification", "Real-time Authenticity Check", "Neural PDF Processing"],
  },
  {
    title: "Virtual Sharing",
    tagline: "Collaborative Intelligence for Modern Learning",
    image: "/virtualsharing-bg.png",
    url: "https://virtualsharing.netlify.app/",
    context: "Virtual Sharing is a high-performance collaborative platform designed to bridge the gap between shared resources and intelligent learning. Powered by real-time synchronization and GenAI assistance, it enables users to seamlessly exchange knowledge in a secure, decentralized environment. It's the ultimate 'Bat-Computer' for shared intelligence.",
    features: ["Real-time Cloud Sync", "GenAI Content Analysis", "Decentralized Architecture", "Secure Resource Management"],
  },
  {
    title: "Student Grievance",
    tagline: "Voice for the Scholar Frontier",
    image: "/student-grievance-bg.png",
    url: "https://student-grivence-management.onrender.com/login",
    context: "Student Grievance Management is a high-transparency platform designed to empower students in navigating institutional challenges. It provides a secure, auditable trail for reporting and tracking grievances, ensuring that every voice is heard and every issue is addressed with Stark-level accountability. It's the ultimate 'Hall of Justice' for the academic ecosystem.",
    features: ["Secure Grievance Tracking", "Automated Workflow Engine", "Transparent Auditing", "Real-time Notifications"],
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const urlMode = searchParams.get("mode");
  const mode: HeroMode = (['spidey', 'deadpool', 'batman', 'superman', 'ironman'].includes(urlMode as any) 
    ? urlMode 
    : "spidey") as HeroMode;
  
  const getGradient = (mode: HeroMode) => {
    const gradients: Record<HeroMode, string> = {
      spidey: "from-white to-neutral-400",
      ironman: "from-yellow-400 to-red-600",
      deadpool: "from-red-600 to-neutral-900",
      batman: "from-yellow-400 to-yellow-700",
      superman: "from-blue-500 to-red-600"
    };
    return gradients[mode];
  };

  const getAccentColor = (mode: HeroMode) => {
    const colors: Record<HeroMode, { text: string, bg: string }> = {
      spidey:   { text: "text-red-500",    bg: "bg-red-500" },
      ironman:  { text: "text-yellow-400", bg: "bg-yellow-400" },
      deadpool: { text: "text-red-600",    bg: "bg-red-600" },
      batman:   { text: "text-yellow-500", bg: "bg-yellow-500" },
      superman: { text: "text-blue-400",   bg: "bg-blue-400" }
    };
    return colors[mode] || colors.spidey;
  };

  const navigate = useNavigate();

  const handleExit = () => {
    // Cinematic Portal Exit Animation
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)",
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        // LIFO return: try navigating back, else fallback to Hub
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/");
        }
      }
    });
  };

  useEffect(() => {
    document.title = "Project Showcase | Prem Sai Surisetti";
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out"
      });
      gsap.from(".hero-text", {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black overflow-x-hidden relative z-10">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {mode === 'spidey'   && <SpideyBackground />}
        {mode === 'ironman'  && <IronManBackground />}
        {mode === 'deadpool' && <DeadpoolBackground />}
        {mode === 'batman'   && <BatmanBackground />}
        {mode === 'superman' && <SupermanBackground />}
      </div>

      {/* Decorative Overlays (Subtle) */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-8 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={handleExit}
            className="flex items-center gap-3 group text-white/60 hover:text-white transition-all duration-300 relative px-4 py-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform relative z-10" />
            <div className="flex flex-col items-start relative z-10">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100">Dimensional Shift</span>
              <span className="font-mono text-sm tracking-widest uppercase italic font-bold">Exit Portal // LIFO</span>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse ring-4 ring-green-500/20" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">System Online // Case: SHOWCASE_ALPHA</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-40 pb-20 px-8">
        <div className="container mx-auto text-center hero-text">
          <p className="font-mono text-xs tracking-[0.5em] uppercase text-white/30 mb-6 italic">// CLASSIFIED PROJECT ARCHIVE</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none mb-4">
            Project Showcase
          </h1>
          <p className="max-w-2xl mx-auto text-white/40 text-lg md:text-xl font-light tracking-wide italic">
             A deep dive into high-frequency deployments, algorithmic mastery, and predictive intelligence systems.
          </p>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="container mx-auto px-8 pb-32 space-y-32">
        {projects.map((project, idx) => (
          <article key={idx} className="project-card relative group z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Visual Side */}
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 group-hover:border-white/20 transition-all duration-700">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              {/* Content Side */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                   <div className={`w-12 h-[1px] ${getAccentColor(mode).bg}`} />
                   <span className={`font-mono text-xs tracking-[0.4em] uppercase ${getAccentColor(mode).text}`}>Project {idx + 1}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight italic uppercase">{project.title}</h2>
                <h3 className="text-xl text-white/60 font-light mb-8 italic tracking-wide">{project.tagline}</h3>
                
                <div className="relative mb-10 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-500 backdrop-blur-sm">
                   <p className="text-lg leading-relaxed text-white/80 font-light">
                     {project.context}
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-12">
                   {project.features.map(f => (
                     <div key={f} className="flex items-center gap-2 text-white/40 group/feat">
                        <Cpu className={`w-4 h-4 text-white/20 group-hover/feat:${getAccentColor(mode).text} transition-colors`} />
                        <span className="text-sm font-mono tracking-tight group-hover/feat:text-white/60 transition-colors">{f}</span>
                     </div>
                   ))}
                </div>

                <div className="flex flex-wrap gap-6">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-black font-black tracking-widest rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 uppercase"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-8 text-center text-white/20 font-mono text-xs tracking-[0.4em] uppercase">
          Transmission Terminal // Established 2026 // Built for High-Performance
        </div>
      </footer>
    </div>
  );
}
