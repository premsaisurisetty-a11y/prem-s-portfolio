import { useState, lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import IronManBackground from "@/components/IronManBackground";
import SpideyBackground from "@/components/SpideyBackground";
import DeadpoolBackground from "@/components/DeadpoolBackground";
import BatmanBackground from "@/components/BatmanBackground";
import SupermanBackground from "@/components/SupermanBackground";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";

const ThreeCanvas = lazy(() => import("@/components/ThreeCanvas"));

export type HeroMode = 'spidey' | 'deadpool' | 'batman' | 'superman' | 'ironman';

// All modes use dedicated background components
export const modeGradients: Record<HeroMode, string> = {
  spidey:   'none',
  deadpool: 'none',
  batman:   'none',
  superman: 'none',
  ironman:  'none',
};

export default function Index() {
  const [mode, setMode] = useState<HeroMode>('spidey');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const gradient = modeGradients[mode];

  return (
    <>
      <Suspense fallback={null}>
        <ThreeCanvas />
      </Suspense>

      {/* Mode-specific full-page backgrounds */}
      {mode === 'spidey'   && <SpideyBackground />}
      {mode === 'ironman'  && <IronManBackground />}
      {mode === 'deadpool' && <DeadpoolBackground />}
      {mode === 'batman'   && <BatmanBackground />}
      {mode === 'superman' && <SupermanBackground />}

      <Navbar mode={mode} />
      <main className="relative z-10">
        <HeroSection mode={mode} onModeChange={setMode} />
        <AboutSection mode={mode} />
        <ProjectsSection mode={mode} />
        <SkillsSection mode={mode} />
        <ServicesSection mode={mode} />
        <ContactSection mode={mode} />
      </main>

    </>
  );
}
