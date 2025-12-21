import { useEffect, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function CircularProgressBar({
  progress,
  autoAnimate = false,
  onComplete,
}: {
  progress: number;
  autoAnimate?: boolean;
  onComplete?: () => void;
}) {
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  // function to animate the circle and text
  const animate = () => {
    if (circleRef.current && textRef.current) {
      const offset = circumference - (progress / 100) * circumference;

      // Анимация круга
      gsap.to(circleRef.current, {
        strokeDashoffset: offset,
        duration: 0.8,
        ease: "power2.out",
      });

      // Анимация текста
      gsap.to(textRef.current, {
        innerHTML: progress,
        duration: 0.8,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        onComplete: onComplete,
      });
    }
  };

  // automatic animation when progress changes
  useGSAP(
    () => {
      debugger;
      if (autoAnimate) {
        animate();
      }
    },
    { dependencies: [progress, autoAnimate], scope: containerRef },
  );

  // Expose animate function through ref or can be called directly
  useEffect(() => {
    if (!autoAnimate) {
      // if autoAnimate is disabled, set the value immediately without animation
      if (circleRef.current && textRef.current) {
        const offset = circumference - (progress / 100) * circumference;
        gsap.set(circleRef.current, { strokeDashoffset: offset });
        gsap.set(textRef.current, { innerHTML: progress });
      }
    }
  }, [progress, autoAnimate, circumference]);

  return (
    <div ref={containerRef} className="flex justify-center">
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="12"
          />
          {/* progress circle */}
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        {/* text in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">
            <span ref={textRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
