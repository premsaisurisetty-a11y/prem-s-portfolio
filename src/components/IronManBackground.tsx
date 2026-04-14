/**
 * IronManBackground — High-Fidelity Stark Tech background
 * Uses the exact "ironman-bg.jpg" provided by the user.
 */
export default function IronManBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Exact Image Background */}
      <img 
        src="/ironman-bg.png" 
        alt="Iron Man Background" 
        className="w-full h-full object-cover object-center scale-[1.02]"
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0" 
        style={{ background: "radial-gradient(circle at center, transparent, rgba(0,0,0,0.3))" }} />
      
      {/* Subtle nanotech blue pulse glow in the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,195,255,0.05)_0%,transparent_50%)] animate-pulse-glow" />

      {/* Noise overlay for premium texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: "url('/noise.svg')" }} 
      />
    </div>
  );
}
