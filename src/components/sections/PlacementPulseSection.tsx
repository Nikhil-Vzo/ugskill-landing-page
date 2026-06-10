'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';

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
      className="relative flex flex-col items-center text-center group z-10 w-full py-6 px-4"
    >
      {/* Soft floating background ambient glow behind each step */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-[#58CC02]/[0.04] to-[#46A302]/[0.01] blur-3xl rounded-full -z-10 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

      <div className="flex flex-col items-center w-full">
        {/* Step Badge with Glassmorphism */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 flex items-center justify-center text-[#58CC02] shadow-[0_4px_12px_rgba(0,0,0,0.02)] group-hover:rotate-[10deg] group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
          <span className="text-[10px] font-black text-[#46A302] bg-[#58CC02]/8 border border-[#58CC02]/15 px-3 py-1 rounded-full uppercase tracking-widest">
            {step}
          </span>
        </div>

        {/* Mascot Image Container with interactive shadow and bounce */}
        <div className="w-56 h-56 md:w-64 md:h-64 relative flex items-center justify-center pointer-events-none mb-6">
          {/* Subtle reflection/shadow below illustration */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-3.5 bg-slate-900/[0.04] blur-md rounded-full group-hover:w-40 group-hover:bg-slate-900/[0.06] transition-all duration-300" />
          
          <motion.img 
            src={imageSrc}
            alt={title}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: delay * 1.5 }}
            className="max-h-full object-contain group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300"
          />
        </div>

        {/* Title using premium typography and hover color transitions */}
        <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight group-hover:text-[#58CC02] transition-colors duration-300">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

const ArrowConnector: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-w-[3.5rem] lg:min-w-[5rem] text-[#58CC02] z-20">
      {/* Desktop Arrow with Flying Dot */}
      <div className="hidden lg:block relative w-16 h-8">
        <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Base Arrow Line */}
          <path d="M2 12H62M62 12L52 2M62 12L52 22" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Animated Active Line */}
          <motion.path 
            d="M2 12H62" 
            stroke="url(#green-gradient)" 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeDasharray="12 40"
            animate={{ strokeDashoffset: [0, -52] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
          <defs>
            <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#58CC02" stopOpacity="0"/>
              <stop offset="50%" stopColor="#58CC02" stopOpacity="1"/>
              <stop offset="100%" stopColor="#46A302" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Mobile Arrow with Flying Dot */}
      <div className="block lg:hidden py-4 w-8 h-16">
        <svg width="24" height="64" viewBox="0 0 24 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Base Arrow Line */}
          <path d="M12 2V62M12 62L2 52M12 62L22 52" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Animated Active Line */}
          <motion.path 
            d="M12 2V62" 
            stroke="url(#green-gradient-v)" 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeDasharray="12 40"
            animate={{ strokeDashoffset: [0, -52] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
          <defs>
            <linearGradient id="green-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#58CC02" stopOpacity="0"/>
              <stop offset="50%" stopColor="#58CC02" stopOpacity="1"/>
              <stop offset="100%" stopColor="#46A302" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
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
            imageSrc="/assets/student_studying.png"
            icon={<BookOpen className="w-5 h-5" />}
            delay={0}
          />

          <ArrowConnector />

          {/* Card 2: Test */}
          <StepCard 
            step="Stage 02"
            title="Verified Assessments"
            imageSrc="/assets/student_testing.png"
            icon={<ShieldCheck className="w-5 h-5" />}
            delay={0.15}
          />

          <ArrowConnector />

          {/* Card 3: Placement */}
          <StepCard 
            step="Stage 03"
            title="Direct Placement"
            imageSrc="/assets/student_placed.png"
            icon={<Award className="w-5 h-5" />}
            delay={0.3}
          />

        </div>
      </div>
    </section>
  );
};
