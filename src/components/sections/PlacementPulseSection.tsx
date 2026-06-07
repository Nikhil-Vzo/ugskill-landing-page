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
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
  delay: number;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  description,
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
        "relative rounded-[2.5rem] overflow-hidden border border-slate-200/80 bg-white p-8 md:p-10 flex flex-col justify-between items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:border-[#58CC02]/30 hover:shadow-[0_15px_30px_rgba(88,204,2,0.04)] hover:translate-y-[-4px] group transition-all duration-300 z-10 w-full"
      )}
    >
      {/* Decorative subtle card inner glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#58CC02]/[0.01] to-transparent pointer-events-none" />
      
      <div className="flex flex-col items-center w-full">
        {/* Step Badge & Icon */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#58CC02] shadow-sm group-hover:scale-105 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-[10px] font-bold text-[#46A302] bg-[#58CC02]/8 border border-[#58CC02]/15 px-3 py-1 rounded-full uppercase tracking-wider">
            {step}
          </span>
        </div>

        {/* Mascot Image centered and floating */}
        <div className="w-48 h-48 relative flex items-center justify-center overflow-hidden pointer-events-none mb-6">
          <motion.img 
            src={imageSrc}
            alt={title}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: delay * 2 }}
            className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </motion.div>
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

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
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
        <div className="relative flex flex-col lg:flex-row gap-8 items-stretch w-full">
          
          {/* Animated Connecting SVG path line running behind the cards (visible on desktop) */}
          <div className="hidden lg:block absolute top-[30%] left-[15%] right-[15%] h-[2px] pointer-events-none z-0">
            <svg className="w-full h-full" fill="none">
              <motion.line 
                x1="0" y1="0" x2="100%" y2="0" 
                stroke="#58CC02" strokeWidth="2.5" 
                strokeDasharray="6 6" 
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Card 1: Study */}
          <StepCard 
            step="Stage 01"
            title="Continuous Learning"
            description="Students progress through modular, syllabus-aligned learning pathways, solving coding challenges inside interactive sandboxes."
            imageSrc="/assets/projects/student_studying.png"
            icon={<BookOpen className="w-5 h-5" />}
            delay={0}
          />

          {/* Card 2: Test */}
          <StepCard 
            step="Stage 02"
            title="Verified Assessments"
            description="Verify code competency with browser lockdowns, audio-video analysis, and cryptographic proctor signatures."
            imageSrc="/assets/projects/student_testing.png"
            icon={<ShieldCheck className="w-5 h-5" />}
            delay={0.15}
          />

          {/* Card 3: Placement */}
          <StepCard 
            step="Stage 03"
            title="Direct Placement"
            description="Connect directly to corporate recruiter pipelines with verified credentials, matching student skill tags with active hiring needs."
            imageSrc="/assets/projects/student_placed.png"
            icon={<Award className="w-5 h-5" />}
            delay={0.3}
          />

        </div>
      </div>
    </section>
  );
};
