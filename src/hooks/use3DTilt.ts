import { useRef, useEffect } from "react";
import gsap from "gsap";

interface TiltConfig {
  maxRotation?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export function use3DTilt(config: TiltConfig = {}) {
  const {
    maxRotation = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 0.5,
  } = config;

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Set initial perspective on parent if possible, or on self
    gsap.set(el, { perspective });

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxRotation;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      gsap.to(el, {
        rotateX,
        rotateY,
        scale,
        duration: speed,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: speed * 2,
        ease: "elastic.out(1, 0.5)",
        overwrite: true,
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [maxRotation, perspective, scale, speed]);

  return elementRef;
}
