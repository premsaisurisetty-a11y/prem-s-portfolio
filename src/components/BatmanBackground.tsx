/**
 * BatmanBackground — High-Fidelity Dark Knight background
 * Uses the exact "batman-bg.jpg" provided by the user.
 */
export default function BatmanBackground() {
  // Rain effect
  const rain = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 37 + 13) % 100, // percentage x
    len: 15 + (i * 11) % 35, // px length
    op: 0.03 + (i % 6) * 0.015, // opacity
    delay: (i * 0.1) % 2, // animation delay
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden bg-black">
      {/* Exact Image Background */}
      <img 
        src="/batman-bg.jpg" 
        alt="Batman Background" 
        className="w-full h-full object-cover object-center opacity-80"
      />

      {/* Cinematic rain overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {rain.map((r, i) => (
          <div 
            key={i}
            className="absolute bg-white/20 animate-rain"
            style={{ 
              left: `${r.x}%`, 
              top: '-20px',
              width: '1px', 
              height: `${r.len}px`, 
              opacity: r.op,
              animationDelay: `${r.delay}s`,
              animationDuration: '0.8s'
            }} 
          />
        ))}
      </div>

      {/* Gotham Vignette */}
      <div className="absolute inset-0" 
        style={{ background: "radial-gradient(circle at center, transparent, rgba(0,0,0,0.6))" }} />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: "url('/noise.svg')" }} 
      />

      <style>{`
        @keyframes rain {
          from { transform: translateY(0) rotate(5deg); }
          to { transform: translateY(110vh) rotate(5deg); }
        }
        .animate-rain {
          animation: rain linear infinite;
        }
      `}</style>
    </div>
  );
}
