'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, ExternalLink, Code2, Cpu, Terminal, Database, Sparkles } from 'lucide-react';
import { TactileButton } from '../ui/TactileButton';

interface SandboxItem {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  imageUrl: string;
  icon: React.ReactNode;
}

const CATEGORIES = ['All', 'Full-Stack Dev', 'AI & Data Science', 'Cloud & DevOps', 'Interactive Labs'];

const sandboxes: SandboxItem[] = [
  {
    id: 1,
    title: 'Full-Stack React & Node',
    category: 'Full-Stack Dev',
    description: 'A complete Node.js & React workspace with hot-reloading, live browser previews, and fully integrated Postgres databases.',
    tech: ['React', 'Next.js', 'PostgreSQL', 'Tailwind'],
    imageUrl: '/assets/sandboxes/sandbox_fullstack.png',
    icon: <Code2 className="w-5 h-5 text-[#58CC02]" />,
  },
  {
    id: 2,
    title: 'Jupyter & PyTorch Engine',
    category: 'AI & Data Science',
    description: 'Interactive Jupyter notebooks with live GPU acceleration, visual epoch tracking, and pre-installed AI/ML packages.',
    tech: ['Python', 'PyTorch', 'Jupyter', 'Pandas'],
    imageUrl: '/assets/sandboxes/sandbox_jupyter.png',
    icon: <Cpu className="w-5 h-5 text-[#0EA5E9]" />,
  },
  {
    id: 3,
    title: 'Linux Terminal & DevOps',
    category: 'Cloud & DevOps',
    description: 'Isolated bash terminals with real-time feedback for learning Docker container orchestration, Nginx configs, and system tasks.',
    tech: ['Bash', 'Docker', 'Nginx', 'Kubernetes'],
    imageUrl: '/assets/sandboxes/sandbox_terminal.png',
    icon: <Terminal className="w-5 h-5 text-amber-500" />,
  },
  {
    id: 4,
    title: 'SQL Visualizer & Analytics',
    category: 'Interactive Labs',
    description: 'Interactive database query workbench. Write queries, view relational schema diagrams, and analyze execution plans.',
    tech: ['SQL', 'PostgreSQL', 'DB Schema', 'Charts'],
    imageUrl: '/assets/sandboxes/sandbox_sql.png',
    icon: <Database className="w-5 h-5 text-indigo-500" />,
  },
  {
    id: 5,
    title: '3D Simulation & WebGL Lab',
    category: 'Interactive Labs',
    description: 'Create interactive 3D structures and physical simulations using React Three Fiber, WebGL, and custom vector physics.',
    tech: ['Three.js', 'WebGL', 'Framer Motion', 'GSAP'],
    imageUrl: '/assets/sandboxes/sandbox_webgl.png',
    icon: <Sparkles className="w-5 h-5 text-pink-500" />,
  },
  {
    id: 6,
    title: 'API Sandbox & Testing',
    category: 'Full-Stack Dev',
    description: 'Interactive API sandbox client with mocking capabilities, request history tracking, and automated unit test runners.',
    tech: ['Node.js', 'API', 'Jest', 'Postman'],
    imageUrl: '/assets/sandboxes/sandbox_api.png',
    icon: <Code2 className="w-5 h-5 text-[#58CC02]" />,
  },
];


export const MarqueeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter sandboxes based on active category
  const filteredSandboxes = sandboxes.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure index remains in bounds when filters change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const maxIndex = Math.max(0, filteredSandboxes.length - cardsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden flex flex-col items-center">
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
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tighter leading-none mb-6">
              Interactive Dev Sandboxes
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              UGSkill bridges learning and placement by letting students build projects directly in fully-featured coding sandboxes. No configuration required, fully integrated into their curriculum.
            </p>
          </div>
          <div className="relative w-40 md:w-56 h-40 md:h-56 flex-shrink-0 select-none pointer-events-none">
            <img
              src="/assets/sandboxes/student_learning.png"
              alt="Student learning"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-100 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 text-sm md:text-base font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'text-[#0F172A]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-slate-100 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex gap-6 pb-6"
            animate={{ x: `calc(-${currentIndex * (100 / cardsPerPage)}% - ${currentIndex * 16}px)` }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            {filteredSandboxes.map((item) => (
              <div
                key={item.id}
                style={{ width: `calc(${100 / cardsPerPage}% - ${(16 * (cardsPerPage - 1)) / cardsPerPage}px)` }}
                className="flex-shrink-0 flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-diffused overflow-hidden transition-all duration-300 hover:border-[#58CC02]/30 hover:shadow-xl"
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Visual Preview Window */}
                <div className="relative w-full aspect-video bg-slate-50 border-b border-slate-100 p-3.5 flex items-center justify-center overflow-hidden group">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-lg shadow-sm transition-transform duration-700 ease-out group-hover:scale-103"
                  />

                  {/* Tech Badges */}
                  <div className="absolute bottom-5 left-5 flex flex-wrap gap-1.5 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white rounded border border-white/10 backdrop-blur-sm shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-[#58CC02] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#58CC02] rounded-full animate-ping" />
                      Free Sandbox Demo
                    </span>

                    <TactileButton
                      variant="primary"
                      className="px-4 py-2.5 text-xs font-bold flex items-center gap-1.5"
                    >
                      Open Lab <ExternalLink className="w-3.5 h-3.5" />
                    </TactileButton>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mt-8 border-t border-slate-100 pt-6">
          <div className="text-sm font-semibold text-slate-400">
            Showing <span className="text-[#0F172A] font-bold">{currentIndex + 1}</span> to{' '}
            <span className="text-[#0F172A] font-bold">
              {Math.min(currentIndex + cardsPerPage, filteredSandboxes.length)}
            </span>{' '}
            of <span className="text-[#0F172A] font-bold">{filteredSandboxes.length}</span> templates
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full border border-slate-200/80 transition-all active:scale-90 cursor-pointer ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-300 bg-slate-50/50'
                  : 'text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-full border border-slate-200/80 transition-all active:scale-90 cursor-pointer ${
                currentIndex >= maxIndex
                  ? 'opacity-40 cursor-not-allowed text-slate-300 bg-slate-50/50'
                  : 'text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
