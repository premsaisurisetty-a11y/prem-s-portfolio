/**
 * SupermanBackground — High-Fidelity Man of Steel background
 * Uses the exact "superman-bg.jpg" provided by the user.
 */
export default function SupermanBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Exact Image Background */}
      <img 
        src="/superman-bg.jpg" 
        alt="Superman Background" 
        className="w-full h-full object-cover object-center"
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0" 
        style={{ background: "radial-gradient(circle at center, transparent, rgba(0,0,0,0.35))" }} />
      
      {/* Noble solar/gold glow over text area */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,200,0,0.06)_0%,transparent_60%)]" />

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: "url('/noise.svg')" }} 
      />
    </div>
  );
}
