import { useState, useRef, useEffect } from "react";

/**
 * Cinematic Video Loading Screen
 * Plays a high-impact intro video (spiderman-video.mp4) before revealing the site.
 */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-complete logic if video fails or for development
  useEffect(() => {
    // If video hasn't started or finished after a reasonable timeout (e.g. 15s)
    // we should proceed to the site just in case.
    const fallbackTimeout = setTimeout(() => {
      handleComplete();
    }, 15000); 

    return () => clearTimeout(fallbackTimeout);
  }, []);

  const handleComplete = () => {
    setIsVideoEnded(true);
    setTimeout(onComplete, 800); // Small delay for fade-out
  };

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black transition-opacity duration-800 ${
        isVideoEnded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Cinematic Video Player */}
      <video
        ref={videoRef}
        src="/spiderman-video.mp4"
        className="w-full h-full object-cover"
        autoPlay
        muted={false} // User specifically asked for this video, likely wants audio
        playsInline
        onEnded={handleComplete}
        onLoadedData={(e) => {
          // Attempt to play with sound; if blocked, play muted.
          const video = e.currentTarget;
          video.play().catch(() => {
            video.muted = true;
            video.play();
          });
        }}
      />

      {/* Skip Button (Bottom Right) */}
      <button
        onClick={handleComplete}
        className="absolute bottom-10 right-10 z-[1001] px-6 py-2 border border-white/30 bg-black/40 backdrop-blur-md rounded-full text-white/70 font-mono text-xs tracking-widest hover:bg-white/10 hover:text-white transition-all duration-300"
      >
        SKIP INTRO →
      </button>

      {/* Subtle vignettes for cinema look */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/30" />
      
      {/* Cinematic Bar Overlay (Optional for style) */}
      <div className="absolute top-0 w-full h-[8vh] bg-black/40 backdrop-blur-sm z-[1001]" />
      <div className="absolute bottom-0 w-full h-[8vh] bg-black/40 backdrop-blur-sm z-[1001]" />
    </div>
  );
}
