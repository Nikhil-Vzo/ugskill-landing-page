'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
}

const services: ServiceItem[] = [
  {
    id: '01',
    title: 'Adaptive Learning LMS',
    description: 'A modular learning system that tailors course contents based on student performance, coding speed, and real-time concept understanding.',
    details: ['Personalized pathways', 'Interactive workspace sync', 'Syllabus auto-generation'],
  },
  {
    id: '02',
    title: 'Secure AI Proctoring',
    description: 'Flag academic dishonesty with state-of-the-art proctoring checks. Monitors tab focus, copy-paste events, and video feeds.',
    details: ['Browser lockdowns', 'Multi-device detection', 'Comprehensive activity logs'],
  },
  {
    id: '03',
    title: 'Live Group Discussions',
    description: 'Automated video and audio group discussion platforms that evaluate speech cadence, collaborative patterns, and technical vocabulary.',
    details: ['Sentiment analysis', 'Keyword monitoring', 'Dynamic score matching'],
  },
  {
    id: '04',
    title: 'AI-Powered Interviews',
    description: 'Mock and final technical interviews conducted by realistic, conversational AI avatars. Assesses programming logic and communication.',
    details: ['Live coding review', 'Soft-skills feedback', 'Immediate grading reports'],
  },
  {
    id: '05',
    title: 'Recruiter Direct Pipeline',
    description: 'A shared whiteboard and dashboard connecting vetted student profiles directly to corporate recruiters.',
    details: ['One-click hiring drives', 'Verified skill tags', 'Direct analytics sharing'],
  },
];

const serviceImages: Record<string, string> = {
  '01': '/assets/sandbox_fullstack.png',
  '02': '/assets/sandbox_terminal.png',
  '03': '/assets/sandbox_webgl.png',
  '04': '/assets/sandbox_api.png',
  '05': '/assets/sandbox_jupyter.png',
};

export const ServicesSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates relative to the Services section container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for magnetic mouse follow
  const springConfig = { stiffness: 520, damping: 36 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="section-overlap-up relative w-full py-24 md:py-32 px-4 sm:px-6 md:px-12"
      id="solutions"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 80% 20%, rgba(14,165,233,0.09) 0%, transparent 55%),
          radial-gradient(ellipse 50% 45% at 10% 80%, rgba(88,204,2,0.08) 0%, transparent 50%),
          linear-gradient(145deg, #0f172a 0%, #0d1b2a 50%, #111827 100%)
        `
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/8 border border-white/12 text-white/70 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#58CC02]" />
              Modular Core Engine
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-none">
              Unified Platform Features
            </h2>
            <p className="text-base md:text-lg text-white/55 mt-6 font-medium leading-relaxed">
              Five core systems integrated into one interface to deliver seamless training and recruitment outcomes.
            </p>
          </div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 select-none pointer-events-none self-center md:self-end">
            <img
              src="/assets/student_mascot_clay.png"
              alt="Coding Student Mascot"
              className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(88,204,2,0.15)]"
            />
          </div>
        </div>

        {/* Services List Rows */}
        <div ref={listRef} className="relative flex flex-col">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex flex-col md:flex-row md:items-start justify-between py-8 md:py-10 hover:bg-white/5 transition-colors px-3 md:px-4 rounded-xl -mx-3 md:-mx-4 cursor-pointer border-b border-white/8 last:border-b-0"
            >
              {/* Divider Line — only on dark bg variant, handled via border-b above */}

              <div className="text-2xl md:text-4xl font-extrabold text-white/30 group-hover:text-[#58CC02] transition-colors duration-300 md:w-24">
                {service.id}
              </div>

              {/* Center: Title & Description */}
              <div className="flex-1 md:px-6 mt-4 md:mt-0 max-w-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-[#58CC02] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-white/55 font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right Side: Key points and Arrow */}
              <div className="flex flex-wrap md:flex-col items-start gap-2 mt-6 md:mt-0 md:text-right min-w-[200px]">
                {service.details.map((detail) => (
                  <span
                    key={detail}
                    className="inline-flex items-center text-xs font-bold bg-white/8 text-white/70 px-3 py-1 rounded-full border border-white/10"
                  >
                    {detail}
                  </span>
                ))}
              </div>

              <div className="self-end md:self-start mt-6 md:mt-0 pl-4 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </motion.div>
          ))}

          {/* Floating Hover Image Reveal Container (Magnetic) */}
          <AnimatePresence>
            {hoveredId && (
              <motion.div
                style={{
                  left: smoothX,
                  top: smoothY,
                  x: 12,
                  y: -48,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute pointer-events-none z-50 w-[200px] md:w-[320px] aspect-video hidden md:flex items-center justify-center filter drop-shadow-[0_15px_30px_rgba(15,23,42,0.25)] overflow-hidden rounded-xl"              >
                <img
                  src={serviceImages[hoveredId]}
                  alt="Platform preview"
                  className="w-full h-full object-contain rounded-xl"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
