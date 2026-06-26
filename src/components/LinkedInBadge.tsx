import { useEffect } from "react";
import { HeroMode } from "@/pages/Index";

type Props = {
  mode: HeroMode;
};

export default function LinkedInBadge({ mode }: Props) {
  useEffect(() => {
    // 1. Clean up any existing script tags to force fresh execution
    const existingScripts = document.querySelectorAll('script[src*="platform.linkedin.com/badges/js/profile.js"]');
    existingScripts.forEach(script => script.remove());

    // 2. Clean up any globally defined rendering functions/callbacks
    if ((window as any).LIRenderAll) {
      delete (window as any).LIRenderAll;
    }
    if ((window as any).LIBadgeCallback) {
      delete (window as any).LIBadgeCallback;
    }

    // 3. Reset the rendered state on the badge div if any exists
    const badges = document.querySelectorAll('.LI-profile-badge');
    badges.forEach(badge => {
      badge.removeAttribute('data-rendered');
      badge.removeAttribute('data-uid');
      const iframe = badge.querySelector('iframe');
      if (iframe) iframe.remove();
    });

    // 4. Create and inject the script tag
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if ((window as any).LIRenderAll) {
        (window as any).LIRenderAll();
      }
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [mode]);

  // Determine theme for LinkedIn badge based on current hero mode
  const linkedinTheme = mode === "superman" ? "light" : "dark";

  return (
    <div className="flex justify-center items-center w-full min-h-[310px] py-4">
      <div 
        className="badge-base LI-profile-badge mx-auto" 
        data-locale="en_US" 
        data-size="medium" 
        data-theme={linkedinTheme} 
        data-type="VERTICAL" 
        data-vanity="prem-sai-surisetti-872003382" 
        data-version="v1"
        style={{ minWidth: '330px', minHeight: '300px' }}
      >
        <a 
          className="badge-base__link LI-simple-link hidden"
          href="https://in.linkedin.com/in/prem-sai-surisetti-872003382?trk=profile-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
          PREM SAI SURISETTI
        </a>
      </div>
    </div>
  );
}

