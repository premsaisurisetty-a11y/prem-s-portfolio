/**
 * SpideyBackground — High-Fidelity Split Red/Black Logo background
 * Uses the exact "spiderman-bg.png" uploaded by the user.
 */
export default function SpideyBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Exact Image Background */}
      <img 
        src="/spiderman-bg.png" 
        alt="Spider-Man Background" 
        className="w-full h-full object-cover object-center"
      />

      {/* Subtle vignettes for extra cinematic depth */}
      <div className="absolute inset-0" 
        style={{ background: "radial-gradient(circle at center, transparent, rgba(0,0,0,0.3))" }} />
      
      {/* Noise overlay for premium texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: "url('/noise.svg')" }} 
      />
    </div>
  );
}
