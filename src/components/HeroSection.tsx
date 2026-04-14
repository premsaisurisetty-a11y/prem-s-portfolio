import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import { HeroMode } from "@/pages/Index";

type HeroProps = {
  mode: HeroMode;
  onModeChange: (mode: HeroMode) => void;
};

function InteractiveGeometry({ mode }: { mode: 'spidey' | 'deadpool' | 'batman' | 'superman' | 'ironman' }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      // Subtle float effect tied to mouse
      gsap.to(meshRef.current.position, {
        x: (state.mouse.x * state.viewport.width) / 8,
        y: (state.mouse.y * state.viewport.height) / 8,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  });

  let meshColor = "#00ffff";
  let meshEmissive = "#ff0044";
  let Geometry: any = "icosahedronGeometry";
  let geoArgs: any = [2.5, 4];

  switch (mode) {
    case 'spidey': 
      meshColor = "#ffffff"; meshEmissive = "#ff0000"; 
      Geometry = "octahedronGeometry"; geoArgs = [2.8, 0];
      break;
    case 'deadpool': 
      meshColor = "#440000"; meshEmissive = "#ff0000"; 
      Geometry = "torusKnotGeometry"; geoArgs = [1.8, 0.4, 128, 16];
      break;
    case 'batman': 
      meshColor = "#111111"; meshEmissive = "#ffcc00"; 
      Geometry = "boxGeometry"; geoArgs = [3, 3, 3];
      break;
    case 'superman': 
      meshColor = "#0000ff"; meshEmissive = "#ff0000"; 
      Geometry = "sphereGeometry"; geoArgs = [2.5, 32, 32];
      break;
    case 'ironman': 
      meshColor = "#ff0000"; meshEmissive = "#ffaa00"; 
      Geometry = "tetrahedronGeometry"; geoArgs = [3, 0];
      break;
  }

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef}>
        <Geometry args={geoArgs} />
        <MeshDistortMaterial
          color={meshColor}
          emissive={meshEmissive}
          emissiveIntensity={0.5}
          wireframe={true}
          transparent
          opacity={0.3}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroSection({ mode, onModeChange }: HeroProps) {

  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const morphWrapperRef = useRef<HTMLDivElement>(null);
  const spidermanRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sectionRef.current && textRef.current && spidermanRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / centerX;
      const moveY = (y - centerY) / centerY;

      // Text Parallax
      gsap.to(textRef.current, {
        x: moveX * 20,
        y: moveY * 20,
        duration: 0.5,
        ease: "power2.out"
      });

      // Spiderman Cursor Morph Mask
      const imgRect = spidermanRef.current.getBoundingClientRect();
      const maskX = e.clientX - imgRect.left;
      const maskY = e.clientY - imgRect.top;
      
      const softMask = `radial-gradient(circle 250px at ${maskX}px ${maskY}px, black 60%, transparent 100%)`;
      spidermanRef.current.style.webkitMaskImage = softMask;
      spidermanRef.current.style.maskImage = softMask;
      spidermanRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }
    if (spidermanRef.current) {
      spidermanRef.current.style.opacity = "0";
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    const setColors = (bg: string, card: string, primary: string, secondary: string, accent: string) => {
      root.style.setProperty('--background', bg);
      root.style.setProperty('--card', card);
      root.style.setProperty('--primary', primary);
      root.style.setProperty('--secondary', secondary);
      root.style.setProperty('--accent', accent);
      root.style.setProperty('--ring', accent); 
      root.style.setProperty('--hero-glow', accent); 
    };

    switch (mode) {
      case 'spidey':
        setColors('0 0% 2%', '0 0% 0% / 0.5', '0 0% 100%', '0 100% 50%', '0 0% 100%'); 
        break;
      case 'deadpool':
        setColors('0 0% 2%', '0 80% 4%', '0 90% 40%', '0 80% 20%', '0 85% 55%'); 
        break;
      case 'batman':
        setColors('0 0% 2%', '240 5% 8%', '45 100% 50%', '240 10% 20%', '45 100% 50%'); 
        break;
      case 'superman':
        setColors('0 0% 2%', '220 80% 8%', '220 100% 50%', '0 100% 50%', '45 100% 50%'); 
        break;
      case 'ironman':
        setColors('0 0% 2%', '10 80% 6%', '0 100% 50%', '45 100% 50%', '0 100% 50%'); 
        break;
    }
  }, [mode]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance
      gsap.fromTo(textRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent transition-colors duration-700 perspective-1000"
    >
      {/* React Three Fiber 3D Canvas */}
      <div className="absolute inset-0 z-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      {/* Text Layer (In Front of Images) */}
      <div 
        ref={textRef} 
        className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
      >
        <h1 
          className="font-sans font-black tracking-tighter text-white drop-shadow-xl transition-all duration-500 text-center px-12"
          style={{
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            lineHeight: 0.9,
            textShadow: `3px 3px 15px rgba(0,0,0,0.85), 0 0 40px hsl(var(--primary) / 0.6)`,
          }}
        >
          PREM SAI SURISETTI
        </h1>
        <p 
          className="mt-6 font-mono text-sm md:text-base lg:text-lg tracking-[0.3em] text-white uppercase text-center backdrop-blur-sm px-4 py-1 rounded-full border border-primary bg-primary/20 transition-all duration-500"
          style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.4)" }}
        >
          Full Stack Developer
        </p>
      </div>

      {/* Morph Layer (Background) */}
      <div 
        ref={morphWrapperRef} 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none origin-center"
      >
        {/* Base Prem Image */}
        <img
          src="/prem-image.png"
          alt="Prem"
          className="absolute inset-0 w-full h-full object-cover object-center filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />

        {/* Morph Reveal Image */}
        <img
          ref={spidermanRef}
          src={
            mode === 'deadpool' ? '/deadpool-image.png' :
            mode === 'batman' ? '/batman-image.png' :
            mode === 'superman' ? '/superman-image.png' :
            mode === 'ironman' ? '/ironman-image.png' :
            '/spiderman-image.png'
          }
          alt={`${mode} Reveal`}
          className="absolute inset-0 w-full h-full object-cover object-center filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-opacity duration-300 ease-out opacity-0"
          style={{
            WebkitMaskImage: 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
            maskImage: 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
          }}
        />
      </div>


      {/* Mode Selector */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center justify-center space-y-4 bg-black/60 backdrop-blur-md px-3 py-6 rounded-full border border-primary/30 transition-colors duration-500">
        {[
          { id: 'spidey', src: '/spiderman-logo.png', alt: 'Spidey' },
          { id: 'deadpool', src: '/deadpool-logo.png', alt: 'Deadpool' },
          { id: 'batman', src: '/batman-logo.png', alt: 'Batman' },
          { id: 'superman', src: '/superman-logo.png', alt: 'Superman' },
          { id: 'ironman', src: '/ironman-logo.png', alt: 'Ironman' },
        ].map((btn) => {
          const isActive = mode === btn.id;
          return (
            <button 
              key={btn.id}
              onClick={() => {
                onModeChange(btn.id as HeroMode);
                // Track Theme Switching in GA4
                // @ts-ignore
                if (typeof gtag !== 'undefined') {
                  // @ts-ignore
                  gtag('event', 'select_content', {
                    'content_type': 'theme',
                    'item_id': btn.id,
                    'event_category': 'Engagement',
                    'event_label': `Switch to ${btn.id}`
                  });
                }
              }} 
              className={`flex items-center justify-center w-12 h-12 rounded-full overflow-hidden transition-all duration-300 ${isActive ? 'scale-110 border-2 border-primary' : 'border border-white/20 hover:border-white/50 opacity-50 hover:opacity-100'}`}
              style={{ boxShadow: isActive ? "0 0 20px hsl(var(--primary) / 0.8)" : "none" }}
              title={`${btn.id} Mode`}
            >
              <img src={btn.src} alt={btn.alt} className="w-full h-full object-cover" />
            </button>
          )
        })}
      </div>

    </section>
  );
}
