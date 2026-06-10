'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ArrowRight, Layout, ShieldAlert, Briefcase, ChevronRight } from 'lucide-react';
import { TactileButton } from '../ui/TactileButton';

interface ProjectCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  borderColor: string;
  textColor: string;
  descColor: string;
  icon: React.ReactNode;
  imageUrl: string;
  shadowColor: string;
}

const projectCards: ProjectCard[] = [
  {
    id: 1,
    title: 'Adaptive LMS Core',
    subtitle: 'Step 1: Intelligent Upskilling',
    description: 'A customized, modern workspace where student courses adapt based on real-time coding metrics. Tracks keyboard keystrokes, compilation success rates, and logic depth to guide learning pathways.',
    color: '#F8FAFC', // Slate 50
    borderColor: '#E2E8F0', // Slate 200
    textColor: '#0F172A',
    descColor: '#475569',
    icon: <Layout className="w-6 h-6 text-[#58CC02]" />,
    imageUrl: '/assets/learning_path_clay.png',
    shadowColor: 'rgba(88,204,2,0.12)',
  },
  {
    id: 2,
    title: 'Proctoring & Exam Portal',
    subtitle: 'Step 2: Vetted Competency Checks',
    description: 'Ensure total academic integrity during assessments. Integrates local system monitoring, copy-paste block detectors, tab switches, and live audio-video AI analysis to flag anomalies.',
    color: '#F1F5F9', // Slate 100
    borderColor: '#E2E8F0',
    textColor: '#0F172A',
    descColor: '#475569',
    icon: <ShieldAlert className="w-6 h-6 text-[#58CC02]" />,
    imageUrl: '/assets/integrity_clay.png',
    shadowColor: 'rgba(88,204,2,0.12)',
  },
  {
    id: 3,
    title: 'Placement Drive Board',
    subtitle: 'Step 3: Direct Corporate Matching',
    description: 'Vetted student portfolios synced instantly with hiring metrics. Recruiters search by verified skill tags, sandbox scorecards, and AI interview feedback to schedule high-volume drives.',
    color: '#FFFFFF', // Pure White
    borderColor: '#CBD5E1', // Slate 300
    textColor: '#0F172A',
    descColor: '#475569',
    icon: <Briefcase className="w-6 h-6 text-[#46A302]" />,
    imageUrl: '/assets/career_clay.png',
    shadowColor: 'rgba(88,204,2,0.12)',
  },
];

// Creative staggered offsets & skew rotations for the stacking deck
const cardRotations = [-2.2, 1.8, -1.2];
const cardOffsets = [-16, 16, -8];

interface ProjectCardComponentProps {
  card: ProjectCard;
  index: number;
  isDesktop: boolean;
  scrollYProgress: MotionValue<number>;
}

const ProjectCardComponent: React.FC<ProjectCardComponentProps> = ({
  card,
  index,
  isDesktop,
  scrollYProgress,
}) => {
  // Scroll Parallax Calculations mapping the y coordinate for a 3D layered parallax depth effect
  const yParallax = useTransform(scrollYProgress, [0, 1], [index * 30 - 50, index * 30 + 50]);
  const smoothYParallax = useSpring(yParallax, { stiffness: 100, damping: 20 });

  // Calculations for sticky progress scale
  const cardProgress = 1 - (projectCards.length - 1 - index) * 0.03;

  return (
    <motion.div
      style={{
        scale: cardProgress,
        backgroundColor: card.color,
        borderColor: card.borderColor,
        rotate: isDesktop ? cardRotations[index] : 0,
        x: isDesktop ? cardOffsets[index] : 0,
      }}
      className="w-full min-h-[380px] sm:min-h-[420px] lg:min-h-[480px] border rounded-3xl p-6 sm:p-8 lg:p-12 shadow-diffused flex flex-col lg:flex-row gap-8 lg:gap-12 items-center overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      {/* Left Side: Card Text Info */}
      <div className="flex-1 flex flex-col items-start z-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#58CC02] mb-3">
          {card.subtitle}
        </span>
        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            {card.icon}
          </div>
          <h3 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {card.title}
          </h3>
        </div>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium mb-8">
          {card.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <TactileButton variant="primary" className="px-6 py-3 text-sm flex items-center gap-1.5">
            Interactive Demo <ArrowRight className="w-4 h-4" />
          </TactileButton>
          <TactileButton variant="secondary" className="px-6 py-3 text-sm bg-white border-slate-200 text-[#0F172A] hover:bg-slate-50 flex items-center gap-1">
            Read System Specs <ChevronRight className="w-4 h-4" />
          </TactileButton>
        </div>
      </div>

      {/* Right Side: Floating 3D Illustration Viewport (No Frame, transparent bg) */}
      <div className="w-full lg:w-[45%] h-[180px] sm:h-[240px] md:h-[300px] lg:h-[340px] flex items-center justify-center relative group select-none pointer-events-none overflow-hidden">
        <motion.img
          src={card.imageUrl}
          alt={card.title}
          style={{
            y: smoothYParallax,
            filter: "drop-shadow(0 15px 30px " + card.shadowColor + ")",
          }}
          className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Hook scroll for sticky tracking card scaling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-white py-24 md:py-32 px-6 md:px-12 z-30 border-t border-slate-100 overflow-visible"
      id="projects-stack"
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
          maskImage: 'radial-gradient(ellipse at center, black, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 85%)'
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#58CC02]" />
            Career Pipeline Stacking
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tighter leading-none mb-6">
            The Three-Step Funnel
          </h2>
          <p className="text-lg text-slate-500 max-w-xl font-medium leading-relaxed">
            See how UGSkill guides students from first-day learning all the way to finalized enterprise recruitment.
          </p>
        </div>

        {/* Stacking Sticky Cards */}
        <div className="relative">
          {projectCards.map((card, index) => (
            <div
              key={card.id}
              className="sticky w-full"
              style={{
                top: isDesktop ? '112px' : '80px',
                paddingTop: isDesktop ? `${index * 24}px` : `${index * 16}px`,
                paddingBottom: index < projectCards.length - 1 
                  ? (isDesktop ? '96px' : '64px') 
                  : '0px',
                marginBottom: '0px',
                zIndex: 10 + index
              }}
            >
              <ProjectCardComponent
                card={card}
                index={index}
                isDesktop={isDesktop}
                scrollYProgress={scrollYProgress}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
