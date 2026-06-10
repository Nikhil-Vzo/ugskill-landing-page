'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Lock, X } from 'lucide-react';

interface CourseItem {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  icon: React.ReactNode;
}

interface RoadmapProps {
  courses: CourseItem[];
}

export const PremiumMobileRoadmap: React.FC<RoadmapProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<number>(2); // defaults to 2 (active)
  const [mascotTime, setMascotTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMascotTime(Date.now() / 1000);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const rawPathLength = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const pathLength = useSpring(rawPathLength, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Node configuration positions (winding offsets) matching the 6 modules
  const positions = [
    { x: 150, y: 30, status: 'completed' },
    { x: 230, y: 140, status: 'active' },
    { x: 70, y: 250, status: 'locked' },
    { x: 180, y: 360, status: 'locked' },
    { x: 100, y: 470, status: 'locked' },
    { x: 150, y: 580, status: 'locked' }
  ];

  // Map coordinates to dynamic status based on activeCourseId selection
  const dynamicPositions = positions.map((pos, idx) => {
    const course = courses[idx];
    let status = 'locked';
    if (course.id === activeCourseId) {
      status = 'active';
    } else if (course.id < activeCourseId) {
      status = 'completed';
    }
    return { ...pos, status };
  });

  const activeIndex = courses.findIndex(c => c.id === activeCourseId);
  const activeNode = dynamicPositions[activeIndex] || dynamicPositions[1];
  const mascotX = activeNode.x + 10;
  const mascotY = activeNode.y - 60;

    const getIconColor = (status: string) => {
    if (status === 'completed') return 'bg-slate-900 text-white border-slate-900 shadow-sm';
    if (status === 'active') return 'bg-gradient-to-tr from-[#0052ff] to-[#1a66ff] text-white shadow-[0_4px_12px_rgba(0, 82, 255,0.25)]';
    return 'bg-slate-100 text-slate-400 border-slate-200';
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-6">
      <div className="relative w-full max-w-[340px] aspect-[300/640] select-none">
        {/* Connecting SVG Path Winding Line */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 300 640" fill="none">
          {/* Background Path (gray) */}
          <path
            d="M 150 30 C 230 85, 230 85, 230 140 C 230 195, 70 195, 70 250 C 70 305, 180 305, 180 360 C 180 415, 100 415, 100 470 C 100 525, 150 525, 150 580"
            stroke="#E2E8F0"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Animated Completed Path (green) */}
          <motion.path
            d="M 150 30 C 230 85, 230 85, 230 140 C 230 195, 70 195, 70 250 C 70 305, 180 305, 180 360 C 180 415, 100 415, 100 470 C 100 525, 150 525, 150 580"
            stroke="#0052ff"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {/* Mascot floating companion guide */}
        <motion.div
          animate={{ x: mascotX, y: mascotY + Math.sin(mascotTime) * 4 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="absolute left-0 top-0 z-10 w-14 h-14 pointer-events-none"
        >
          <img
            src="/assets/student_mascot_clay.png"
            alt="Floating Mascot Guide"
            className="w-full h-auto drop-shadow-[0_8px_16px_rgba(0, 82, 255,0.25)]"
          />
        </motion.div>

        {/* Iterating Nodes */}
        {courses.map((course, idx) => {
          const pos = dynamicPositions[idx] || { x: 150, y: 30 + idx * 100, status: 'locked' };
          const isActive = pos.status === 'active';
          const isCompleted = pos.status === 'completed';

          return (
            <motion.div
              key={course.id}
              style={{ left: pos.x, top: pos.y, x: '-50%', y: '-50%' }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: idx * 0.08 }}
              className="absolute z-10 flex flex-col items-center"
            >
              {/* Pulsing ring around active node */}
              {isActive && (
                <motion.div
                  animate={{ scale: [0.95, 1.35, 0.95], opacity: [0.8, 0, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute -inset-2 rounded-full border-2 border-[#0052ff] bg-[#0052ff]/10 pointer-events-none"
                />
              )}

              {/* Bouncy motion button for node */}
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedCourse(course);
                  setActiveCourseId(course.id);
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-lg cursor-pointer transition-colors duration-200 ${getIconColor(
                  pos.status
                )}`}
              >
                {isCompleted ? '✓' : isActive ? `0${course.id}` : <Lock className="w-4 h-4 text-slate-400" />}
              </motion.button>

              {/* Glassmorphic micro popup card for active node */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
                  className="absolute top-14 bg-white/90 backdrop-blur-md border border-[#0052ff]/25 rounded-xl px-3 py-1.5 shadow-md flex flex-col items-center min-w-[110px] z-20"
                >
                  <span className="text-[9px] font-extrabold text-[#0041cc] leading-none tracking-wider">ACTIVE</span>
                  <span className="text-[9.5px] font-bold text-slate-700 leading-none mt-1 truncate max-w-[95px]">
                    {course.title}
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Modal Slide Drawer details */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-end justify-center p-4"
          >
            {/* Glassmorphic details drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-t-[2.5rem] p-6 shadow-2xl flex flex-col border-t border-white/50"
            >
              {/* Drawer handle */}
              <div className="w-12 h-1.5 bg-slate-300/60 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#0052ff] bg-[#0052ff]/8 px-3 py-1 rounded-full uppercase tracking-wider">
                    Module 0{selectedCourse.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/50 cursor-pointer transition-colors duration-150"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 leading-tight">{selectedCourse.title}</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                {selectedCourse.category}
              </span>

              <p className="text-sm text-slate-600 font-medium leading-relaxed my-4">
                {selectedCourse.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCourse.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-600 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedCourse(null)}
                className="w-full py-4 rounded-2xl bg-[#0052ff] hover:bg-[#0048e0] active:scale-[0.98] text-[#0F172A] font-extrabold text-sm shadow-[0_4px_14px_rgba(0, 82, 255,0.25)] transition-all duration-150 cursor-pointer"
              >
                Start Lesson
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
