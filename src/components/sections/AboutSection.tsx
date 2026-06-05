'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hook scroll progress for character reveal and corner assets parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax offsets for corner assets
  const yMoon = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yLego = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yShape = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yGroup = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const bodyText = "We believe traditional recruitment is broken. Passing a multiple-choice quiz doesn't mean you can write production-grade code. UGSkill bridges this gap. By combining hands-on developer sandboxes with an automated grading engine and verified career portfolios, we provide a direct pipeline from student learning to enterprise placement. It is the ultimate unified ecosystem for universities, recruiters, and ambitious students.";

  const words = bodyText.split(' ');

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center py-32 md:py-48 px-6 overflow-hidden border-t border-slate-100"
      id="about-platform"
    >
      {/* Decorative Blueprint Background Details */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.75) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.75) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative ambient subtle circle outline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-slate-100 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-slate-100/50 border-dashed pointer-events-none z-0" />

      {/* Floating 3D corner assets with parallax */}
      
      {/* Top-Left: Moon Icon */}
      <motion.div
        style={{ y: yMoon }}
        className="absolute left-6 md:left-12 top-[8%] w-24 md:w-44 lg:w-48 z-10 pointer-events-none select-none drop-shadow-lg"
      >
        <img src="/assets/about/icon_3d_moon.png" alt="Decorative Moon" className="w-full h-auto" />
      </motion.div>

      {/* Top-Right: Lego Icon */}
      <motion.div
        style={{ y: yLego }}
        className="absolute right-6 md:right-12 top-[10%] w-24 md:w-44 lg:w-48 z-10 pointer-events-none select-none drop-shadow-lg"
      >
        <img src="/assets/about/icon_3d_lego.png" alt="Decorative Lego" className="w-full h-auto" />
      </motion.div>

      {/* Bottom-Left: 3D Shape (Torus) */}
      <motion.div
        style={{ y: yShape }}
        className="absolute left-[8%] md:left-[10%] bottom-[8%] w-20 md:w-36 lg:w-40 z-10 pointer-events-none select-none drop-shadow-lg"
      >
        <img src="/assets/about/icon_3d_shape.png" alt="Decorative Torus" className="w-full h-auto" />
      </motion.div>

      {/* Bottom-Right: 3D Group (Steps) */}
      <motion.div
        style={{ y: yGroup }}
        className="absolute right-[8%] md:right-[10%] bottom-[6%] w-24 md:w-40 lg:w-44 z-10 pointer-events-none select-none drop-shadow-lg"
      >
        <img src="/assets/about/icon_3d_group.png" alt="Decorative Steps" className="w-full h-auto" />
      </motion.div>

      {/* Central Content */}
      <div className="relative z-20 max-w-4xl text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold tracking-widest uppercase mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#58CC02]" />
          Our Mission
        </span>

        <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter uppercase mb-12 max-w-2xl leading-none">
          The Platform
        </h2>

        {/* Word-by-word reveal text */}
        <p className="text-xl md:text-3xl lg:text-[2.35rem] font-bold text-slate-800 tracking-tight leading-[1.3] text-center max-w-3xl flex flex-wrap justify-center gap-x-2 gap-y-1.5">
          {words.map((word, wordIndex) => {
            // Calculate progress boundaries for each word
            const start = 0.25 + (wordIndex / words.length) * 0.45;
            const end = start + 0.05;
            // Map scroll opacity dynamically
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            const y = useTransform(scrollYProgress, [start, end], [10, 0]);

            return (
              <motion.span
                key={wordIndex}
                style={{ opacity, y }}
                className="inline-block transition-colors duration-100"
              >
                {word}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
};
