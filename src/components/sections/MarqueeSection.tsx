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
          <div className="grid grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-8 items-start w-full">
            {/* Left Course Selection List */}
            <div className="flex flex-col gap-4">
              {courses.map((item) => {
                const isSelected = selectedCourse.id === item.id;
                
                const getCategoryStyle = (cat: string) => {
                  if (cat === 'Core LMS') return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
                  if (cat === 'Programming') return 'bg-sky-500/10 text-sky-600 border-sky-500/20';
                  if (cat === 'Assessments') return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
                  return 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20';
                };

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setSelectedCourse(item)}
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer relative overflow-hidden pl-8 ${
                      isSelected
                        ? 'border-[#58CC02]/40 bg-white shadow-[0_10px_30px_rgba(88,204,2,0.06)]'
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.015)]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeCourseIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#58CC02] rounded-r-md"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className="flex items-center gap-5">
                      <div className={`p-3 border rounded-xl transition-all duration-300 ${
                        isSelected 
                          ? 'bg-white border-[#58CC02]/25 shadow-sm' 
                          : 'bg-slate-50/50 border-slate-200/50'
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#0F172A] tracking-tight">{item.title}</h3>
                        <span className={`inline-block text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider mt-1.5 ${getCategoryStyle(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {isSelected && (
                        <span className="text-xs font-bold text-[#58CC02] flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-[#58CC02] rounded-full animate-ping" />
                          Active
                        </span>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'text-[#58CC02] translate-x-1.5' : 'text-slate-355'}`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Coding Sandbox Simulator */}
            <div className="sticky top-24">
              <InteractiveCodeSandbox key={selectedCourse.id} courseId={selectedCourse.id} courseTitle={selectedCourse.title} />
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
