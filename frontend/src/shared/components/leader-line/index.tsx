import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { StyledSvg } from "./styles";

export function LeaderLine({
  from,
  to,
  middle,
  color = "#fff",
  duration = 1,
  dotSize = 8,
  onComplete,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  middle?: { x: number; y: number };
  color?: string;
  duration?: number;
  dotSize?: number;
  onComplete?: () => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const fromDotRef = useRef<SVGCircleElement>(null);
  const toDotRef = useRef<SVGCircleElement>(null);

  // Automatic calculation of the middle point
  const calculatedMiddle = middle || {
    x: from.x,
    y: to.y,
  };

  // Create path with two straight segments
  const path = `M${from.x},${from.y} L${calculatedMiddle.x},${calculatedMiddle.y} L${to.x},${to.y}`;

  useGSAP(() => {
    const pathEl = pathRef.current;
    const fromDot = fromDotRef.current;
    const toDot = toDotRef.current;

    if (!pathEl) return;

    const length = pathEl.getTotalLength();

    // Initial state of the line
    gsap.set(pathEl, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Initial state of the points
    gsap.set([fromDot, toDot], {
      scale: 0,
      transformOrigin: "center",
    });

    // Animation
    const tl = gsap.timeline();

    // Appearance of the first point
    tl.to(fromDot, {
      scale: 1,
      duration: duration * 0.15,
      ease: "back.out(1.7)",
    });

    // Drawing the line
    tl.to(
      pathEl,
      {
        strokeDashoffset: 0,
        duration: duration,
        ease: "power2.out",
      },
      "-=0.05",
    );

    // Appearance of the second point
    tl.to(
      toDot,
      {
        scale: 1,
        duration: duration * 0.15,
        ease: "back.out(1.7)",
        onComplete: onComplete, // Вызывается когда анимация полностью завершена
      },
      "-=0.1",
    );
  }, [from, to, calculatedMiddle.x, calculatedMiddle.y, duration, onComplete]);

  return (
    <StyledSvg>
      {/* Leader line */}
      <path
        ref={pathRef}
        d={path}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Start point */}
      <circle
        ref={fromDotRef}
        cx={from.x}
        cy={from.y}
        r={dotSize / 2}
        fill={color}
      />

      {/* End point */}
      <circle ref={toDotRef} cx={to.x} cy={to.y} r={dotSize / 2} fill={color} />
    </StyledSvg>
  );
}
