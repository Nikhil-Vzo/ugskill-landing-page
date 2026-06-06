'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, ClipboardList, Layers3, Sparkles, Brain } from 'lucide-react';
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
  const [selectedCourse, setSelectedCourse] = useState<CourseItem>(courses[0]);
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tighter leading-none mb-6">
              Interactive Course Library
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
              Explore course paths, build coding solutions in real-time, and trace verified progress credentials dynamically.
            </p>
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
          <div className="grid grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-8 items-start w-full">
            {/* Left Course Selection List */}
            <div className="flex flex-col gap-4">
              {courses.map((item) => {
                const isSelected = selectedCourse.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCourse(item)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#58CC02]/30 bg-slate-50/70 shadow-md'
                        : 'border-slate-200/80 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0F172A]">{item.title}</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {isSelected && (
                        <span className="text-xs font-bold text-[#58CC02] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#58CC02] rounded-full animate-ping" />
                          Sandbox Active
                        </span>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#58CC02] translate-x-1' : 'text-slate-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Coding Sandbox Simulator */}
            <div className="sticky top-24">
              <InteractiveCodeSandbox courseId={selectedCourse.id} courseTitle={selectedCourse.title} />
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
