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
    icon: <Layers3 className="w-5 h-5 text-[#0EA5E9]" />,
  },
  {
    id: 3,
    title: 'Assessment Builder',
    category: 'Assessments',
    description: 'Quizzes, proctored tests, and auto-evaluated checkpoints designed to verify understanding.',
    tech: ['Quizzes', 'Proctoring', 'Auto Grading', 'Milestones'],
    icon: <ClipboardList className="w-5 h-5 text-amber-500" />,
  },
  {
    id: 4,
    title: 'Career Readiness',
    category: 'Career Readiness',
    description: 'Placement prep modules that connect coursework to interviews, recruiter expectations, and job-ready portfolios.',
    tech: ['Resume', 'Interview Prep', 'Portfolio', 'Placement'],
    icon: <GraduationCap className="w-5 h-5 text-indigo-500" />,
  },
  {
    id: 5,
    title: 'AI Learning Assistant',
    category: 'Core LMS',
    description: 'Adaptive explanations, concept nudges, and smart recommendations that support students.',
    tech: ['AI Tutor', 'Adaptive Path', 'Hints', 'Feedback'],
    icon: <Sparkles className="w-5 h-5 text-pink-500" />,
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
    <section className="relative w-full bg-white py-24 lg:py-32 overflow-hidden flex flex-col items-center">
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl text-center md:text-left">
            <div className="overflow-hidden mb-6">
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
          <div className="relative w-32 md:w-44 h-32 md:h-44 flex-shrink-0 select-none pointer-events-none">
            <img
              src="/assets/projects/admin_mascot_clay.png"
              alt="University Administrator Mascot"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Desktop split workspace view */}
        {isDesktop ? (
          <div className="grid grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-8 items-center w-full">
            {/* Left Thematic Visual Area */}
            <div className="flex flex-col gap-6 pr-8 justify-center py-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58CC02]/8 border border-[#58CC02]/15 text-[#46A302] text-[10px] font-extrabold tracking-wider uppercase w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                Interactive Sandbox
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.1] font-sans">
                Test your knowledge at <span className="bg-gradient-to-r from-[#58CC02] to-emerald-500 bg-clip-text text-transparent">the holy knowledge checkpoint.</span>
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Tackle real-world upskilling challenges, test code implementations in real time, and verify candidate readiness against recruiter pipelines.
              </p>
              
              <div className="relative w-72 h-72 select-none mt-4 flex items-center justify-center">
                <div className="absolute inset-4 bg-[#58CC02]/5 rounded-full blur-3xl pointer-events-none" />
                <motion.img
                  src="/assets/projects/student_mascot_clay.png"
                  alt="Student Mascot Guide"
                  className="w-52 h-auto drop-shadow-[0_15px_30px_rgba(88,204,2,0.15)] relative z-10"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
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
