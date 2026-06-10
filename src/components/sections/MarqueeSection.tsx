'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, ClipboardList, Layers3, Sparkles, Brain } from 'lucide-react';
import { InteractiveCodeSandbox } from '../ui/InteractiveCodeSandbox';
import { PremiumMobileRoadmap } from '../ui/PremiumMobileRoadmap';

interface CourseItem {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  icon: React.ReactNode;
}

const courses: CourseItem[] = [
  {
    id: 1,
    title: 'LMS Foundations',
    category: 'Core LMS',
    description: 'Start with the core learning path: course modules, progress checkpoints, and structured weekly outcomes.',
    tech: ['Modules', 'Progress', 'Weekly Plan', 'Assignments'],
    icon: <BookOpen className="w-5 h-5 text-[#58CC02]" />,
  },
  {
    id: 2,
    title: 'Programming Track',
    category: 'Programming',
    description: 'Hands-on coding lessons that move from concepts to practice with guided examples and project-based learning.',
    tech: ['JavaScript', 'DSA', 'Projects', 'Mentor Notes'],
    icon: <Layers3 className="w-5 h-5 text-[#58CC02]" />,
  },
  {
    id: 3,
    title: 'Assessment Builder',
    category: 'Assessments',
    description: 'Quizzes, proctored tests, and auto-evaluated checkpoints designed to verify understanding.',
    tech: ['Quizzes', 'Proctoring', 'Auto Grading', 'Milestones'],
    icon: <ClipboardList className="w-5 h-5 text-[#46A302]" />,
  },
  {
    id: 4,
    title: 'Career Readiness',
    category: 'Career Readiness',
    description: 'Placement prep modules that connect coursework to interviews, recruiter expectations, and job-ready portfolios.',
    tech: ['Resume', 'Interview Prep', 'Portfolio', 'Placement'],
    icon: <GraduationCap className="w-5 h-5 text-[#58CC02]" />,
  },
  {
    id: 5,
    title: 'AI Learning Assistant',
    category: 'Core LMS',
    description: 'Adaptive explanations, concept nudges, and smart recommendations that support students.',
    tech: ['AI Tutor', 'Adaptive Path', 'Hints', 'Feedback'],
    icon: <Sparkles className="w-5 h-5 text-[#46A302]" />,
  },
  {
    id: 6,
    title: 'Project Completion Path',
    category: 'Programming',
    description: 'End-to-end course completion flow that ends in a verified capstone, skill badge, and portfolio-ready output.',
    tech: ['Capstone', 'Badge', 'Portfolio', 'Submission'],
    icon: <Brain className="w-5 h-5 text-[#58CC02]" />,
  },
];

export const MarqueeSection: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="section-overlap-up relative w-full bg-white py-24 lg:py-32 overflow-hidden flex flex-col items-center">
      {/* Decorative Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.75) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.75) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 90%)'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tighter leading-none"
            >
              Interactive Course Library
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-slate-500 font-medium leading-relaxed"
            >
              Explore course paths, build coding solutions in real-time, and trace verified progress credentials dynamically.
            </motion.p>
          </div>
        </div>

        {/* Desktop split workspace view */}
        {isDesktop ? (
          <div className="grid grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-8 items-center w-full">
            {/* Left Thematic Visual Area */}
            <div className="flex flex-col gap-6 pr-8 justify-center py-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58CC02]/8 border border-[#58CC02]/15 text-[#46A302] text-[10px] font-extrabold tracking-wider uppercase w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                Interactive Sandbox
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.1] font-sans">
                The Holy <span className="bg-gradient-to-r from-[#58CC02] to-emerald-500 bg-clip-text text-transparent">Knowledge Checkpoint</span>
              </h3>
              
              {/* Mascot Conversational Bubble */}
              <div className="flex items-start gap-5 mt-4">
                {/* Robot Mascot */}
                <div className="relative w-28 h-28 flex-shrink-0 select-none">
                  <div className="absolute inset-1 bg-[#58CC02]/10 rounded-full blur-xl pointer-events-none" />
                  <img
                    src="/assets/student_mascot_clay.png"
                    alt="Student Mascot Guide"
                    className="mascot-float w-full h-auto drop-shadow-[0_8px_16px_rgba(88,204,2,0.12)] relative z-10"
                  />
                </div>
                
                {/* Speech Bubble */}
                <div className="relative bg-[#FAFAFA] border border-slate-200/80 rounded-2xl p-4.5 shadow-sm flex-1">
                  {/* Left pointing arrow tail */}
                  <div className="absolute left-[-6px] top-9 w-3 h-3 bg-[#FAFAFA] border-l border-b border-slate-200/80 rotate-45" />
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed relative z-10 font-sans">
                    <span className="text-[#46A302] font-extrabold uppercase tracking-wider text-[9px] block mb-1 font-sans">UG Bot</span>
                    &quot;Tackle real-world upskilling challenges, test code implementations in real time, and verify candidate readiness against recruiter pipelines!&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Right Coding Sandbox Simulator */}
            <div className="sticky top-24">
              <InteractiveCodeSandbox />
            </div>
          </div>
        ) : (
          /* Mobile premium winding roadmap */
          <PremiumMobileRoadmap courses={courses} />
        )}
      </div>
    </section>
  );
};
