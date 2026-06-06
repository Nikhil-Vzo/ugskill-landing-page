'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Activity, 
  CheckCircle2, 
  Play, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export interface DashboardMockupProps {
  activeTabOverride?: 'courses' | 'leaderboard' | 'live' | 'interviews';
}

export const DashboardMockup: React.FC<DashboardMockupProps> = ({ activeTabOverride }) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'leaderboard' | 'live' | 'interviews'>('courses');
  const [isMounted, setIsMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTabOverride) {
      setActiveTab(activeTabOverride);
    }
  }, [activeTabOverride]);

  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.parentElement?.getBoundingClientRect().width || 0;
      const designWidth = 720;
      if (width < designWidth && width > 0) {
        setScale(width / designWidth);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const tabs = [
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'leaderboard', icon: Award, label: 'Leaderboard' },
    { id: 'live', icon: Activity, label: 'Live GD' },
    { id: 'interviews', icon: TrendingUp, label: 'AI Interviews' },
  ] as const;

  const badges = [
    { label: 'LMS Path Validated' },
    { label: 'Proctored Exam Passed' },
    { label: 'Live GD Rooms Rated A+' },
    { label: 'AI Mock Interview Room A' },
  ];

  const jobs = [
    { company: 'Stripe Inc.', role: 'Software Dev Intern', match: 94, color: 'from-sky-400 to-indigo-600', letter: 'S' },
    { company: 'Vercel', role: 'Frontend Engineer', match: 91, color: 'from-slate-700 to-slate-900', letter: 'V' },
    { company: 'Notion', role: 'Product Design Intern', match: 88, color: 'from-red-400 to-rose-600', letter: 'N' },
  ];

  return (
    <div ref={containerRef} className="relative w-full aspect-[16/10] overflow-visible">
      <div 
        className="border border-slate-200/80 bg-slate-100 rounded-2xl shadow-[0_25px_50px_-12px_rgba(15,23,42,0.08)] p-0.5 relative"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '720px',
          height: '450px'
        }}
      >
      {/* High-Performance GPU Accelerated Styles */}
      <style>{`
        /* Smooth scale-up fade entry */
        .mockup-fade-in {
          opacity: 0;
          transform: translateY(15px);
          animation: mockupFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes mockupFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* SVG Circle progress transition */
        .circle-progress {
          stroke-dasharray: 144;
          stroke-dashoffset: 144;
          transition: stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
        }
        
        .circle-progress-filled {
          stroke-dashoffset: ${144 - (144 * 87) / 100};
        }

        /* GPU-accelerated scale-based wave animation */
        .wave-bar {
          transform-origin: bottom;
          animation: waveBounce 1.2s ease-in-out infinite;
        }

        @keyframes waveBounce {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }

        /* Pure CSS hardware-accelerated 3D hover effects */
        .hover-lift-3d {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease;
          transform-style: preserve-3d;
        }

        .hover-lift-3d:hover {
          transform: translate3d(0, -6px, 15px) rotateX(1.5deg) rotateY(-1.5deg);
          box-shadow: 0 20px 30px -10px rgba(15, 23, 42, 0.12);
          border-color: rgba(226, 232, 240, 0.9);
        }

        /* Ambient pulse glow - optimized using transform */
        .glow-pulse {
          animation: glowPulseAnimation 4s ease-in-out infinite;
        }

        @keyframes glowPulseAnimation {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.08); }
        }
      `}</style>

      {/* --- Browser Window Chrome Bar --- */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200/60 select-none rounded-t-[14px]">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400/90 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/90 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-green-400/90 shadow-sm" />
        </div>
        
        {/* URL Address Bar */}
        <div className="flex-1 max-w-md mx-auto bg-slate-50 border border-slate-200/60 rounded-lg py-1 px-3 flex items-center justify-between text-slate-400 text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-[10px] text-emerald-500">🔒</span>
            <span className="text-[11px] text-slate-600 font-medium truncate">ugskill.com/sandbox/dashboard</span>
          </div>
          <span className="text-[10px] text-slate-400 select-none">↻</span>
        </div>
        
        {/* Extra spacer to balance layout */}
        <div className="w-12" />
      </div>

      {/* --- Main Viewport (preserves 3D context) --- */}
      <div 
        className="relative w-full aspect-[16/10] bg-slate-50 p-6 rounded-b-[14px] select-none overflow-hidden"
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
      >
        {/* Modern Grid Background inside Mockup Viewport */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-70" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(226, 232, 240, 0.75) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(226, 232, 240, 0.75) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Richer ambient background glows for contrast */}
        <div className="absolute -top-12 -left-12 h-72 w-72 bg-emerald-500/16 rounded-full blur-3xl pointer-events-none glow-pulse" />
        <div className="absolute -bottom-12 -right-12 h-72 w-72 bg-sky-500/16 rounded-full blur-3xl pointer-events-none glow-pulse" style={{ animationDelay: '2s' }} />

        {/* --- LAYER 1: Course LMS (Background panel, Z = 0) --- */}
        <div 
          className="absolute top-6 left-6 w-[72%] h-[82%] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_-10px_rgba(15,23,42,0.03)] z-0"
          style={{ 
            transform: 'translate3d(-15px, -10px, 0px)', 
            transformStyle: 'preserve-3d' 
          }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 select-none">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-extrabold text-xs">L</div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">LMS Dashboard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Unit 3 Active</span>
            </div>
          </div>

          {/* Inner Layout */}
          <div className="grid grid-cols-[135px_1fr] gap-4 mt-3 h-[calc(100%-30px)]">
            {/* Sidebar */}
            <div className="border-r border-slate-100 pr-3 flex flex-col justify-between py-1">
              <div className="flex flex-col gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[10px] font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'text-slate-900 bg-slate-100 shadow-xs'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Profile Card */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/50 p-2 flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-[9px] font-bold text-white flex items-center justify-center shadow-xs">JD</div>
                <div className="min-w-0">
                  <div className="text-[9px] font-bold text-deep-slate truncate">John Doe</div>
                  <div className="text-[8px] text-emerald-600 font-bold">🔥 12 Days</div>
                </div>
              </div>
            </div>

            {/* LMS Main Pane */}
            <div className="flex flex-col gap-2.5 py-1 overflow-hidden" style={{ transform: 'translateZ(10px)' }}>
              <div>
                <h4 className="text-xs font-bold text-deep-slate leading-none">Systems & Algorithms</h4>
                <p className="text-[9px] text-slate-400 mt-1">Section A: Graph Structures & Filters</p>
              </div>

              {/* Progress Container */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/50 p-2.5 flex flex-col justify-between h-[95px]">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">Weekly Target</span>
                  <span className="text-[8.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-full leading-none">65% Progress</span>
                </div>

                {/* Progress Nodes */}
                <div className="flex items-center justify-center gap-1.5 py-0.5">
                  <span className="h-4.5 w-4.5 rounded-full border border-emerald-500 bg-emerald-50 text-[8.5px] font-bold text-emerald-600 flex items-center justify-center shadow-xs">✓</span>
                  <div className="h-0.5 w-5 bg-emerald-400" />
                  <span className="h-4.5 w-4.5 rounded-full border border-emerald-500 bg-emerald-50 text-[8.5px] font-bold text-emerald-600 flex items-center justify-center shadow-xs">✓</span>
                  <div className="h-0.5 w-5 bg-emerald-400" />
                  <span className="h-5 w-5 rounded-full bg-emerald-500 text-[8.5px] font-bold text-white flex items-center justify-center shadow-xs animate-pulse">3</span>
                  <div className="h-0.5 w-5 bg-slate-200" />
                  <span className="h-4.5 w-4.5 rounded-full border border-slate-200 bg-white text-[8.5px] font-bold text-slate-400 flex items-center justify-center">4</span>
                </div>

                <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[65%] transition-all duration-1000" />
                </div>
              </div>

              {/* Next Syllabus Modules to fill space */}
              <div className="flex flex-col gap-1.5 mt-0.5">
                <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider">Up Next in syllabus</span>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between border border-slate-100/80 bg-slate-50/50 rounded-lg p-2 hover:bg-slate-50 transition-colors">
                    <span className="text-[8.5px] font-bold text-slate-700 truncate leading-none">08. DFS & BFS Graph Traversals</span>
                    <span className="text-[7.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full leading-none">Practice Active</span>
                  </div>
                  <div className="flex items-center justify-between border border-slate-100/80 bg-slate-50/50 rounded-lg p-2 opacity-75">
                    <span className="text-[8.5px] font-medium text-slate-500 truncate leading-none">09. Shortest Path Algorithms</span>
                    <span className="text-[7.5px] font-medium text-slate-400 px-1.5 py-0.5 rounded-full leading-none">Locked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- LAYER 2: Placement Readiness (Overlay panel, Z = 50px - Popping 3D) --- */}
        <div 
          className="absolute bottom-6 right-6 w-[56%] h-[82%] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_15px_35px_-8px_rgba(15,23,42,0.12)] z-10 border-t-2 border-t-[#58CC02]"
          style={{ 
            transform: 'translate3d(15px, 10px, 50px)', 
            transformStyle: 'preserve-3d' 
          }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 select-none">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-[#58CC02]/10 flex items-center justify-center text-[#58CC02]">
                <Sparkles className="h-3.5 w-3.5 fill-[#58CC02]/20" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Recruiter Insights</span>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200 animate-pulse" />
          </div>

          {/* Grid Panel Layout */}
          <div className="flex flex-col gap-3 mt-3 h-[calc(100%-30px)]">
            <div className="grid grid-cols-[100px_1fr] gap-3">
              {/* Circular Gauge Card */}
              <div className="flex flex-col items-center justify-center border border-slate-100 rounded-xl bg-slate-50/50 p-2 text-center shadow-inner">
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">Readiness</span>
                
                {/* SVG Progress Arc */}
                <div className="relative h-14 w-14 my-1 flex items-center justify-center">
                  <svg className="absolute inset-0 h-full w-full -rotate-90">
                    <circle cx="28" cy="28" r="23" fill="transparent" stroke="#E2E8F0" strokeWidth="4.5" />
                    <circle 
                      cx="28" 
                      cy="28" 
                      r="23" 
                      fill="transparent" 
                      stroke="#58CC02" 
                      strokeWidth="4.5" 
                      className={`circle-progress ${isMounted ? 'circle-progress-filled' : ''}`}
                    />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-extrabold text-slate-900 leading-none">87</span>
                    <span className="text-[7px] text-slate-400 font-bold mt-0.5">/100</span>
                  </div>
                </div>
                
                <span className="text-[8px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full leading-none">Top 4% Match</span>
              </div>

              {/* Dynamic Viewport swapping content based on activeTab */}
              <div className="flex flex-col justify-center min-h-[82px] relative overflow-hidden">
                
                {/* VIEW 1: Courses info */}
                {activeTab === 'courses' && (
                  <div className="flex flex-col gap-1.5 mockup-fade-in">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1"><Layers className="h-3 w-3" /> Credentials</span>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 fill-emerald-50" />
                      <span className="text-[9px] font-medium text-slate-700 truncate">LMS Progress Validated</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 fill-emerald-50" />
                      <span className="text-[9px] font-medium text-slate-700 truncate">Anti-Cheat Exams Cleared</span>
                    </div>
                  </div>
                )}

                {/* VIEW 2: Leaderboard Rank list */}
                {activeTab === 'leaderboard' && (
                  <div className="flex flex-col gap-1 mockup-fade-in">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Top Performers</span>
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg p-1.5 text-[9px] font-bold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span className="text-amber-500">#1</span>
                        <div className="h-4.5 w-4.5 rounded-full bg-slate-900 text-[7px] text-white flex items-center justify-center font-bold">PS</div>
                        <span className="truncate">Priya Sharma</span>
                      </div>
                      <span className="text-emerald-600">96/100</span>
                    </div>
                  </div>
                )}

                {/* VIEW 3: Live GD Debate slots */}
                {activeTab === 'live' && (
                  <div className="flex flex-col gap-1.5 mockup-fade-in">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">🎙️ Discussion Active</span>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg p-1.5 relative overflow-hidden">
                      <div className="h-5 w-5 rounded-full bg-sky-500 text-white text-[8px] font-bold flex items-center justify-center">SK</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] font-bold text-slate-800 truncate">Siddharth K.</div>
                        <div className="text-[7px] text-emerald-600 font-bold">Speaking</div>
                      </div>
                      {/* Audio visualizer */}
                      <div className="flex items-end gap-0.5 h-3 pr-1">
                        <span className="w-[1.5px] bg-emerald-500 wave-bar h-2" style={{ animationDelay: '0.1s' }} />
                        <span className="w-[1.5px] bg-emerald-500 wave-bar h-3.5" style={{ animationDelay: '0.3s' }} />
                        <span className="w-[1.5px] bg-emerald-500 wave-bar h-1.5" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 4: AI Interviews Audio wave */}
                {activeTab === 'interviews' && (
                  <div className="flex flex-col gap-1.5 mockup-fade-in">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">AI behavioral Simulator</span>
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-150 rounded-lg p-1.5 gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="text-[7px] text-slate-400 font-bold uppercase leading-none">Question</div>
                        <div className="text-[9px] font-bold text-slate-800 truncate">"Describe a project you built..."</div>
                      </div>
                      {/* Audio Waveform scale-based animations */}
                      <div className="flex items-end gap-[1.5px] h-4">
                        {[1, 2, 3.5, 2, 1.5, 3].map((h, idx) => (
                          <span 
                            key={idx} 
                            className="w-[1.5px] bg-emerald-500 wave-bar" 
                            style={{ 
                              height: `${h * 4}px`,
                              animationDuration: `${0.8 + idx * 0.1}s`
                            }} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recruiting Match Widgets (Full list to fill height and add depth) */}
            <div className="flex flex-col gap-1.5 border border-slate-100 rounded-xl bg-slate-50/50 p-2">
              <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider px-1">Top Active Pipelines</span>
              <div className="flex flex-col gap-1.5">
                {jobs.map((job) => (
                  <div 
                    key={job.company} 
                    className="border border-slate-100/80 rounded-lg bg-white p-2 flex items-center justify-between shadow-xs hover:bg-slate-50/80 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-md bg-gradient-to-tr ${job.color} flex items-center justify-center text-white font-extrabold text-[10px]`}>
                        {job.letter}
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-slate-900 flex items-center gap-1 leading-none">
                          {job.company} <ArrowUpRight className="h-2.5 w-2.5 text-slate-400" />
                        </div>
                        <div className="text-[7.5px] text-slate-500 font-medium mt-0.5">{job.role}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[8px] font-bold text-[#58CC02] bg-[#58CC02]/10 px-2 py-0.5 rounded-full inline-block leading-none">
                        {job.match}% Match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Gamification Widget 1 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, z: -20 }} 
          animate={{ opacity: 1, scale: 1, z: 50 }} 
          transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
          className="absolute -right-8 top-12 bg-white p-3 pr-5 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-[#58CC02]/10 flex items-center justify-center text-[#58CC02]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F172A]">Mock Interview</p>
            <p className="text-xs font-semibold text-slate-500">Passed • 85% Readiness</p>
          </div>
        </motion.div>

        {/* Floating Gamification Widget 2 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, z: -20 }} 
          animate={{ opacity: 1, scale: 1, z: 50 }} 
          transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 15 }}
          className="absolute -left-6 bottom-16 bg-white p-3 pr-5 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center text-[#0EA5E9] font-bold">
            7
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F172A]">Day Streak!</p>
            <p className="text-xs font-medium text-slate-500">Top 10% of batch</p>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};