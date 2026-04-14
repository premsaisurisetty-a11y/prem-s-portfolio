/**
 * DeadpoolBackground — High-Fidelity Merc With a Mouth background
 * Uses the exact "deadpool-bg.jpg" provided by the user.
 */
export default function DeadpoolBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Exact Image Background */}
      <img 
        src="/deadpool-bg.jpg" 
        alt="Deadpool Background" 
        className="w-full h-full object-cover object-center"
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0" 
        style={{ background: "radial-gradient(circle at center, transparent, rgba(0,0,0,0.4))" }} />
      
      {/* Subtle halftone noise texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]" 
        style={{ backgroundImage: "url('/noise.svg')" }} 
      />
    </div>
  );
}
