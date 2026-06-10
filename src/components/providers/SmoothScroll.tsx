'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      // Tighter duration = feels responsive, not sluggish
      duration: 0.75,
      easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out — snappy start, smooth stop
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,   // slightly more momentum per wheel tick
      touchMultiplier: 1.8,   // responsive on touch
    });

    let animationFrameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <>{children}</>;
};
