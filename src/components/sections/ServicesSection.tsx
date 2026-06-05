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
    description: 'A shared whiteboard and dashboard dashboard connecting vetted student profiles directly to corporate recruiters.',
    details: ['One-click hiring drives', 'Verified skill tags', 'Direct analytics sharing'],
  },
];

const serviceImages: Record<string, string> = {
  '01': '/assets/projects/sandbox_fullstack.png',
  '02': '/assets/projects/sandbox_terminal.png',
  '03': '/assets/sandboxes/sandbox_webgl.png',
  '04': '/assets/sandboxes/sandbox_api.png',
  '05': '/assets/projects/sandbox_jupyter.png',
};

export const ServicesSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates relative to the Services section container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for magnetic mouse follow
  const springConfig = { stiffness: 220, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-white rounded-t-[40px] md:rounded-t-[60px] py-24 md:py-32 px-6 md:px-12 z-20 shadow-[0_-20px_40px_-15px_rgba(15,23,42,0.05)] border-t border-slate-200"
      id="solutions"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
              Modular Core Engine
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tighter leading-none">
              Unified Platform Features
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-500 max-w-sm mt-4 md:mt-0 font-medium leading-relaxed">
            Five core systems integrated into one interface to deliver seamless training and recruitment outcomes.
          </p>
        </div>

        {/* Services List Rows */}
        <div className="relative flex flex-col border-t border-slate-200/80">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex flex-col md:flex-row md:items-start justify-between py-10 border-b border-slate-200/80 hover:bg-slate-50/50 transition-colors px-4 rounded-xl -mx-4 cursor-pointer"
            >
              {/* Left Side: Number Index */}
              <div className="text-3xl md:text-4xl font-extrabold text-slate-300 group-hover:text-[#58CC02] transition-colors duration-300 md:w-24">
                {service.id}
              </div>

              {/* Center: Title & Description */}
              <div className="flex-1 md:px-6 mt-4 md:mt-0 max-w-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] tracking-tight mb-3 group-hover:text-[#58CC02] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right Side: Key points and Arrow */}
              <div className="flex flex-wrap md:flex-col items-start gap-2 mt-6 md:mt-0 md:text-right min-w-[200px]">
                {service.details.map((detail) => (
                  <span
                    key={detail}
                    className="inline-flex items-center text-xs font-bold bg-slate-100/80 text-slate-600 px-3 py-1 rounded-full border border-slate-200/60"
                  >
                    {detail}
                  </span>
                ))}
              </div>

              {/* Floating Action Arrow */}
              <div className="self-end md:self-start mt-6 md:mt-0 pl-4 text-slate-400 group-hover:text-[#0f172a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
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
                  x: 20,
                  y: -90,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute pointer-events-none z-50 w-[280px] md:w-[420px] aspect-video flex items-center justify-center filter drop-shadow-[0_15px_30px_rgba(15,23,42,0.15)]"
              >
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
