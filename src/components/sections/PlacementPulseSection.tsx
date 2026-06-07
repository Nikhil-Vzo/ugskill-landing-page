'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepCardProps {
  step: string;
  title: string;
  imageSrc: string;
  icon: React.ReactNode;
  delay: number;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  imageSrc,
  icon,
  delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay }}
      className={cn(
        "relative flex flex-col items-center text-center group transition-all duration-300 z-10 w-full py-4"
      )}
    >
      <div className="flex flex-col items-center w-full">
        {/* Step Badge & Icon */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-[#58CC02] shadow-sm group-hover:scale-105 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-[10px] font-bold text-[#46A302] bg-[#58CC02]/8 border border-[#58CC02]/15 px-3 py-1 rounded-full uppercase tracking-wider">
            {step}
          </span>
        </div>

        {/* Mascot Image centered and floating */}
        <div className="w-56 h-56 md:w-64 md:h-64 relative flex items-center justify-center overflow-hidden pointer-events-none mb-6">
          <motion.img 
            src={imageSrc}
            alt={title}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: delay * 2 }}
            className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] tracking-tight group-hover:text-[#58CC02] transition-colors duration-300">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

const ArrowConnector: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-w-[2.5rem] text-[#58CC02] z-20">
      {/* Desktop Arrow */}
      <motion.div 
        className="hidden lg:block"
        animate={{ x: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[#58CC02]">
          <path d="M2 12H46M46 12L36 2M46 12L36 22" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      {/* Mobile Arrow */}
      <motion.div 
        className="block lg:hidden py-4"
        animate={{ y: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[#58CC02]">
          <path d="M12 2V46M12 46L2 36M12 46L22 36" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  );
};

export const PlacementPulseSection: React.FC = () => {
  return (
    <section 
      className="relative w-full bg-slate-50/50 py-24 lg:py-32 overflow-hidden flex flex-col items-center border-t border-slate-200/80"
      id="placement-funnel"
    >
      {/* Decorative subtle dot pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#E2E8F0 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 flex flex-col">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#58CC02]/8 border border-[#58CC02]/15 text-[#46A302] text-xs font-bold tracking-wider uppercase mb-5"
          >
            <Sparkles className="w-4 h-4" />
            Placement Pulse
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tighter leading-none"
            >
              Verified outcomes, built on trust.
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl"
            >
              Verified skills. Verified assessments. Verified outcomes. We combine cryptographic assessment proof with active recruitment signals.
            </motion.p>
          </div>
        </div>

        {/* 3-Section Horizontal path cards layout */}
        <div className="relative flex flex-col lg:flex-row gap-4 items-center w-full mx-auto">
          
          {/* Card 1: Study */}
          <StepCard 
            step="Stage 01"
            title="Continuous Learning"
            imageSrc="/assets/projects/robot_studying.png"
            icon={<BookOpen className="w-5 h-5" />}
            delay={0}
          />

          <ArrowConnector />

          {/* Card 2: Test */}
          <StepCard 
            step="Stage 02"
            title="Verified Assessments"
            imageSrc="/assets/projects/robot_testing.png"
            icon={<ShieldCheck className="w-5 h-5" />}
            delay={0.15}
          />

          <ArrowConnector />

          {/* Card 3: Placement */}
          <StepCard 
            step="Stage 03"
            title="Direct Placement"
            imageSrc="/assets/projects/robot_placed.png"
            icon={<Award className="w-5 h-5" />}
            delay={0.3}
          />

        </div>
      </div>
    </section>
  );
};
