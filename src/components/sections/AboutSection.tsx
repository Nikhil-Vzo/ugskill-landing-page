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

  // Parallax offsets for the two student-robot illustrations
  const yStudy = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const ySuccess = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const bodyText = "We believe traditional recruitment is broken. Passing a multiple-choice quiz doesn't mean you can write production-grade code. UGSkill bridges this gap. By combining hands-on developer sandboxes with an automated grading engine and verified career portfolios, we provide a direct pipeline from student learning to enterprise placement. It is the ultimate unified ecosystem for universities, recruiters, and ambitious students.";

  const words = bodyText.split(' ');

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] w-full bg-slate-50/50 flex flex-col items-center justify-center py-32 md:py-48 px-6 overflow-hidden border-t border-slate-200/80"
      id="about-platform"
    >
      {/* Decorative Blueprint Background Details */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.75) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.75) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }}
      />

      {/* Floating Student-Robot Illustrations with parallax */}
      
      {/* Left Side: Student and Robot Studying */}
      <motion.div
        style={{ y: yStudy }}
        className="absolute left-[-2%] md:left-[4%] top-[15%] w-[180px] md:w-[320px] lg:w-[380px] z-10 pointer-events-none select-none filter drop-shadow-[0_15px_30px_rgba(88,204,2,0.12)] opacity-80 lg:opacity-100"
      >
        <img 
          src="/assets/about/about_study_robo.png" 
          alt="Student and Robot companion studying together" 
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Right Side: Student and Robot High-Fiving */}
      <motion.div
        style={{ y: ySuccess }}
        className="absolute right-[-2%] md:right-[4%] bottom-[12%] w-[180px] md:w-[320px] lg:w-[380px] z-10 pointer-events-none select-none filter drop-shadow-[0_15px_30px_rgba(14,165,233,0.12)] opacity-80 lg:opacity-100"
      >
        <img 
          src="/assets/about/about_success_robo.png" 
          alt="Student and Robot companion celebrating success" 
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Central Content */}
      <div className="relative z-20 max-w-4xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#58CC02] animate-pulse" />
            Our Core Mission
          </span>
        </motion.div>

        {/* Elegant Serif-Style Heading */}
        <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter uppercase mb-12 max-w-2xl leading-none">
          The Platform
        </h2>

        {/* Unique Styling: Glassmorphic Container for Paragraph text with premium typography */}
        <div className="relative p-6 md:p-12 rounded-3xl bg-white/40 border border-slate-200/60 backdrop-blur-md shadow-diffused max-w-3xl">
          {/* Top-left design quotes */}
          <div className="absolute top-4 left-6 text-slate-300 text-6xl font-serif select-none pointer-events-none">“</div>
          
          <p className="text-lg md:text-2xl font-medium text-slate-800 tracking-tight leading-[1.6] text-center flex flex-wrap justify-center gap-x-2 gap-y-1">
            {words.map((word, wordIndex) => {
              // Calculate progress boundaries for each word
              const start = 0.2 + (wordIndex / words.length) * 0.4;
              const end = start + 0.05;
              
              // Map scroll opacity and translation dynamically
              const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
              const y = useTransform(scrollYProgress, [start, end], [8, 0]);

              // Check if word should be highlighted in elegant green/blue text
              const isHighlight = 
                word.includes("UGSkill") || 
                word.includes("sandboxes") || 
                word.includes("automated") || 
                word.includes("placement") || 
                word.includes("traditional");

              return (
                <motion.span
                  key={wordIndex}
                  style={{ opacity, y }}
                  className={`inline-block transition-colors duration-100 ${
                    isHighlight 
                      ? 'text-[#58CC02] font-bold font-serif italic' 
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
          
          {/* Bottom-right design quotes */}
          <div className="absolute bottom-[-10px] right-6 text-slate-300 text-6xl font-serif select-none pointer-events-none">”</div>
        </div>
      </div>
    </section>
  );
};
