'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Layout, ShieldAlert, Briefcase, ChevronRight } from 'lucide-react';
import { TactileButton } from '../ui/TactileButton';

interface ProjectCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  borderColor: string;
  icon: React.ReactNode;
  imageUrl: string;
}

const projectCards: ProjectCard[] = [
  {
    id: 1,
    title: 'Adaptive LMS Core',
    subtitle: 'Step 1: Intelligent Upskilling',
    description: 'A customized, modern workspace where student courses adapt based on real-time coding metrics. Tracks keyboard keystrokes, compilation success rates, and logic depth to guide learning pathways.',
    color: '#1E293B',
    borderColor: '#334155',
    icon: <Layout className="w-6 h-6 text-[#58CC02]" />,
    imageUrl: '/assets/projects/sandbox_fullstack.png',
  },
  {
    id: 2,
    title: 'Proctoring & Exam Portal',
    subtitle: 'Step 2: Vetted Competency Checks',
    description: 'Ensure total academic integrity during assessments. Integrates local system monitoring, copy-paste block detectors, tab switches, and live audio-video AI analysis to flag anomalies.',
    color: '#0F172A',
    borderColor: '#1E293B',
    icon: <ShieldAlert className="w-6 h-6 text-amber-500" />,
    imageUrl: '/assets/projects/sandbox_terminal.png',
  },
  {
    id: 3,
    title: 'Placement Drive Board',
    subtitle: 'Step 3: Direct Corporate Matching',
    description: 'Vetted student portfolios synced instantly with hiring metrics. Recruiters search by verified skill tags, sandbox scorecards, and AI interview feedback to schedule high-volume drives.',
    color: '#0C0C0C',
    borderColor: '#0EA5E9',
    icon: <Briefcase className="w-6 h-6 text-[#0EA5E9]" />,
    imageUrl: '/assets/projects/sandbox_jupyter.png',
  },
];

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll for sticky tracking card scaling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] py-24 md:py-32 px-6 md:px-12 z-30 -mt-10 overflow-visible"
      id="projects-stack"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#58CC02]" />
            Career Pipeline Stacking
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-none mb-6">
            The Three-Step Funnel
          </h2>
          <p className="text-lg text-slate-400 max-w-xl">
            See how UGSkill guides students from first-day learning all the way to finalized enterprise recruitment.
          </p>
        </div>

        {/* Stacking Sticky Cards */}
        <div className="relative flex flex-col gap-12 md:gap-20">
          {projectCards.map((card, index) => {
            // Calculations for sticky progress scale and opacity shifts
            const cardProgress = 1 - (projectCards.length - 1 - index) * 0.03;

            return (
              <div
                key={card.id}
                className="sticky top-24 w-full"
                style={{
                  paddingTop: `${index * 24}px`,
                }}
              >
                <motion.div
                  style={{
                    scale: cardProgress,
                    backgroundColor: card.color,
                    borderColor: card.borderColor,
                  }}
                  className="w-full min-h-[420px] md:min-h-[500px] border rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-center overflow-hidden"
                >
                  {/* Left Side: Card Text Info */}
                  <div className="flex-1 flex flex-col items-start z-10">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#58CC02] mb-3">
                      {card.subtitle}
                    </span>
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        {card.icon}
                      </div>
                      <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed font-medium mb-8">
                      {card.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                      <TactileButton variant="primary" className="px-6 py-3 text-sm flex items-center gap-1.5">
                        Interactive Demo <ArrowRight className="w-4 h-4" />
                      </TactileButton>
                      <TactileButton variant="secondary" className="px-6 py-3 text-sm bg-white/5 border-white/10 text-white hover:bg-white/10 flex items-center gap-1">
                        Read System Specs <ChevronRight className="w-4 h-4" />
                      </TactileButton>
                    </div>
                  </div>

                  {/* Right Side: Mockup Image Viewport */}
                  <div className="w-full lg:w-[45%] aspect-video rounded-2xl border border-white/10 p-5 flex items-center justify-center bg-white/5 overflow-hidden shadow-lg relative group">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="w-full h-full object-contain rounded-xl shadow-md transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
