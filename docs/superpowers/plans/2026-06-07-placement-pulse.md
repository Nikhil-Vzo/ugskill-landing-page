# Placement Pulse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the course library section with the Pinterest-inspired **Placement Pulse** social proof wall featuring a 3-column masonry grid, 6 interactive card types (including a Student Journey Card, opportunity-focused Recruiter Signal Feed, and glowing Verification card), and Arc Browser-style floating gradient background ambient motion.

**Architecture:** Render a 3-column parallel grid on desktop (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`), where cards of varying sizes are distributed into columns to create a clean, responsive Pinterest-like masonry structure. All cards use Framer Motion for scroll-triggered entrance reveals.

**Tech Stack:** React 19, Next.js 16, Tailwind CSS v4, Lucide icons, Framer Motion.

---

### Task 1: Create PlacementPulseSection Component

**Files:**
- Create: [PlacementPulseSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/PlacementPulseSection.tsx)

- [ ] **Step 1: Create component with mock data and card grid structure**
  Implement the full Placement Pulse section. The layout renders three columns on desktop.
  - Column 1 contains: *Placement Proof Card* (Tier 1) and *Badge Collections Card* (Tier 3).
  - Column 2 contains: *Student Rank Card* (Tier 2) and *Journey Card* (Tier 2).
  - Column 3 contains: *Verification Signature Card* (Tier 1), *Recruiter Signal Feed Card* (Tier 3), and *Campus Momentum Card* (Tier 2).
  
  Write the file content:

  ```tsx
  'use client';

  import React, { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Sparkles, CheckCircle2, Lock, ArrowUpRight, Zap, Target, Award, Shield, Trophy } from 'lucide-react';

  // Types
  interface Placement {
    studentId: string;
    company: string;
    role: string;
    logo: string;
    checkpoints: string[];
    time: string;
  }

  interface RecruiterSignal {
    id: number;
    title: string;
    company: string;
    detail: string;
    time: string;
  }

  interface JourneyStep {
    day: number;
    title: string;
    desc: string;
  }

  // Data
  const PLACEMENTS: Placement[] = [
    {
      studentId: '#109',
      company: 'Supabase',
      role: 'Fullstack Developer',
      logo: '⚡',
      checkpoints: ['checkpoints.js', 'bfs_traversal.js', 'api_design.js'],
      time: 'Verified 2 mins ago'
    },
    {
      studentId: '#218',
      company: 'Vercel',
      role: 'Frontend Engineer',
      logo: '▲',
      checkpoints: ['next_routing.js', 'image_opt.js', 'lighthouse_audit.js'],
      time: 'Verified 12 mins ago'
    }
  ];

  const RECRUITER_SIGNALS: RecruiterSignal[] = [
    {
      id: 1,
      title: 'Frontend Engineer',
      company: 'Stripe',
      detail: '3 matching candidates short-listed',
      time: '3 mins ago'
    },
    {
      id: 2,
      title: 'Backend Assessment',
      company: 'Supabase',
      detail: '12 students qualified in Node/Postgres',
      time: '7 mins ago'
    },
    {
      id: 3,
      title: 'DSA Challenge',
      company: 'Linear',
      detail: '2 candidates matched in Graph Traversals',
      time: '15 mins ago'
    }
  ];

  const JOURNEY_STEPS: JourneyStep[] = [
    { day: 1, title: 'Started Java Fundamentals', desc: 'Completed basic control flow loops' },
    { day: 12, title: 'Completed DSA Track', desc: 'Mastered BFS, DFS, and Tree traversals' },
    { day: 26, title: 'Passed Proctored Assessment', desc: 'Secure anti-cheat audit complete' },
    { day: 31, title: 'Verified Placement', desc: 'Hired as Fullstack Developer @ Supabase' }
  ];

  export const PlacementPulse: React.FC = () => {
    const [selectedStudent, setSelectedStudent] = useState<string>('#109');
    const [sigVerified, setSigVerified] = useState<boolean>(true);
    const [xpCount, setXpCount] = useState<number>(92400);

    // Continuous signature verification check indicator animation loop
    const [pulseCheck, setPulseCheck] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setPulseCheck(prev => (prev + 1) % 2);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    // Staggered motion transitions
    const cardTransition = (delay: number) => ({
      initial: { opacity: 0, y: 30, scale: 0.98 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      viewport: { once: true, margin: '-50px' },
      transition: { type: 'spring', stiffness: 100, damping: 18, delay }
    });

    return (
      <section className="relative w-full bg-white py-24 lg:py-32 overflow-hidden flex flex-col items-center">
        {/* Environment Motion Layer - Floating Mesh Gradient Orbs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Subtle noise grid texture */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(15, 23, 42, 0.5) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15, 23, 42, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />
          <motion.div
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.15, 0.9, 1]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#58CC02]/8 to-emerald-400/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -30, 40, 0],
              y: [0, 50, -30, 0],
              scale: [1, 0.85, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-sky-400/5 to-indigo-500/8 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tighter leading-none"
              >
                Placement Pulse
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-base md:text-lg text-slate-500 font-medium leading-relaxed"
              >
                Verified skills. Verified assessments. Verified outcomes.
              </motion.p>
            </div>
          </div>

          {/* Pinterest Masonry Grid (3 Columns on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start w-full">
            
            {/* COLUMN 1 */}
            <div className="flex flex-col gap-6 w-full">
              {/* Card 1: Placement Proof (Tier 1 - Large) */}
              {PLACEMENTS.map((item, idx) => (
                <motion.div
                  key={item.studentId}
                  {...cardTransition(idx * 0.15)}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedStudent(item.studentId)}
                  className={`p-6 rounded-3xl border text-left cursor-pointer transition-all duration-350 bg-white relative overflow-hidden group/proof ${
                    selectedStudent === item.studentId
                      ? 'border-[#58CC02] shadow-[0_15px_35px_rgba(88,204,2,0.06)]'
                      : 'border-slate-200/80 shadow-sm hover:border-slate-350'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#58CC02]/5 to-transparent rounded-bl-3xl opacity-0 group-hover/proof:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center font-bold text-slate-800 text-lg group-hover/proof:scale-105 transition-transform duration-300">
                        {item.logo}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{item.company}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PLACED</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-350 group-hover/proof:text-[#58CC02] transition-colors" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug mb-3">
                    Student {item.studentId} hired as {item.role}
                  </h3>
                  <div className="flex flex-col gap-1.5 py-3 border-t border-b border-slate-100 mb-4">
                    {item.checkpoints.map(cp => (
                      <div key={cp} className="flex items-center gap-2 text-xs font-semibold text-slate-600 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#58CC02]" />
                        {cp}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                </motion.div>
              ))}

              {/* Card 6: Badge Collections Card (Tier 3 - Small) */}
              <motion.div
                {...cardTransition(0.3)}
                className="p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm flex flex-col gap-4 text-left"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4.5 h-4.5 text-[#58CC02]" />
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Verified Credentials</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { icon: <Trophy className="w-3.5 h-3.5" />, label: 'LMS Certified', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
                    { icon: <Zap className="w-3.5 h-3.5" />, label: 'DSA Master', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
                    { icon: <Target className="w-3.5 h-3.5" />, label: 'Backend Elite', color: 'bg-sky-500/10 text-sky-600 border-sky-500/20' },
                    { icon: <Award className="w-3.5 h-3.5" />, label: 'Interview Ready', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' },
                    { icon: <Shield className="w-3.5 h-3.5" />, label: 'Proctor Verified', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' }
                  ].map(b => (
                    <motion.div
                      key={b.label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider cursor-default transition-all shadow-sm ${b.color}`}
                    >
                      {b.icon}
                      {b.label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* COLUMN 2 */}
            <div className="flex flex-col gap-6 w-full">
              {/* Card 3: Student Rank Card (Tier 2 - Medium) */}
              <motion.div
                {...cardTransition(0.1)}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl border border-slate-800 bg-[#0F172A] text-white shadow-lg flex flex-col gap-5 text-left relative overflow-hidden group/rank"
              >
                <div className="absolute -inset-px bg-gradient-to-tr from-[#58CC02]/20 to-transparent opacity-0 group-hover/rank:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#58CC02]/10 border border-[#58CC02]/25 flex items-center justify-center text-sm font-extrabold text-[#58CC02]">
                      #1
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-100 leading-tight">Aarav Sharma</h4>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">RANK 1ST</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#58CC02]">{xpCount.toLocaleString()} XP</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#58CC02] to-emerald-400 rounded-full"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['LMS Certified', 'DSA Master', 'Proctor Verified'].map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700/60 uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Card 4: Journey Card (Tier 2 - Medium) */}
              <motion.div
                {...cardTransition(0.25)}
                className="p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm flex flex-col gap-6 text-left relative overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-[#58CC02]" />
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Candidate Journey</h4>
                </div>
                <div className="flex flex-col gap-5 relative pl-5">
                  {/* Timeline connecting line */}
                  <div className="absolute left-1.5 top-2.5 bottom-2.5 w-[2px] bg-slate-100" />
                  
                  {JOURNEY_STEPS.map((step, idx) => (
                    <div key={step.day} className="relative flex flex-col">
                      {/* Timeline dot */}
                      <div className="absolute -left-[18.5px] top-1 w-3 h-3 rounded-full border bg-white flex items-center justify-center border-[#58CC02]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#58CC02]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold text-[#46A302] bg-[#58CC02]/8 px-2 py-0.5 rounded-md font-mono">
                          Day {step.day}
                        </span>
                        <h5 className="text-xs font-extrabold text-slate-900">{step.title}</h5>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* COLUMN 3 */}
            <div className="flex flex-col gap-6 w-full">
              {/* Card 2: Verification Signature (Tier 1 - Large & Highly Premium) */}
              <motion.div
                {...cardTransition(0.2)}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl border border-slate-200/80 bg-[#FAFAFA]/95 backdrop-blur-md shadow-diffused flex flex-col gap-5 text-left relative overflow-hidden group/verify"
              >
                {/* Neon glow effect backing */}
                <div className="absolute -inset-px bg-gradient-to-tr from-[#58CC02]/15 to-transparent opacity-0 group-hover/verify:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                  {/* Subtle animated grid background inside the verification card */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,1) 1px, transparent 1px)
                      `,
                      backgroundSize: '16px 16px'
                    }}
                  />
                </div>

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest leading-none">UGSkill Placement Proof</h4>
                      <h3 className="text-lg font-black text-slate-950 mt-1 tracking-tight leading-none">Verification Status</h3>
                    </div>
                    {/* Big pulsing checkmark visual centerpiece */}
                    <div className="w-12 h-12 rounded-full bg-[#58CC02]/10 border border-[#58CC02]/25 flex items-center justify-center text-[#58CC02] shadow-sm relative">
                      <motion.div
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="absolute inset-0 rounded-full border border-[#58CC02]/25 pointer-events-none"
                      />
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 py-4 border-t border-b border-slate-200/60 font-mono text-[11px] text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-bold">Hash:</span>
                      <span className="font-bold text-slate-800">0xA93B21F8E...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-bold">Assessment Integrity:</span>
                      <span className="font-bold text-[#46A302]">100% SECURE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-bold">Identity Match:</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#58CC02]" />
                        VERIFIED
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans font-bold">Placement Status:</span>
                      <span className="font-bold text-[#46A302] tracking-wide bg-[#58CC02]/8 px-2 py-0.5 rounded border border-[#58CC02]/15">
                        AUTHENTICATED
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-2xl bg-[#58CC02] hover:bg-[#4cb002] text-[#0F172A] font-extrabold text-xs shadow-[0_4px_14px_rgba(88,204,2,0.2)] active:scale-[0.98] transition-all duration-150 cursor-pointer">
                    Verify Signature Details
                  </button>
                </div>
              </motion.div>

              {/* Card 7: Recruiter Opportunity Signal (Tier 3 - Small) */}
              <motion.div
                {...cardTransition(0.35)}
                className="p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm flex flex-col gap-4 text-left"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4.5 h-4.5 text-[#58CC02]" />
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Recruiter Signals</h4>
                </div>
                <div className="flex flex-col gap-3">
                  {RECRUITER_SIGNALS.map(sig => (
                    <div key={sig.id} className="p-3 bg-slate-50/50 border border-slate-200/40 rounded-2xl flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-900 font-sans">{sig.title}</span>
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">{sig.time}</span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 font-medium leading-tight">
                        {sig.detail} (Viewed by <span className="font-extrabold text-[#46A302]">{sig.company}</span>)
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Card 5: Campus Momentum Card (Tier 2 - Medium) */}
              <motion.div
                {...cardTransition(0.4)}
                className="p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm flex flex-col gap-2 text-left relative overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Placements This Month</h4>
                    <span className="text-3xl font-black text-slate-950 leading-none block mt-2">124</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-emerald-600 text-xs font-extrabold flex items-center gap-1">
                    ↑ 38%
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    );
  };
  ```

---

### Task 2: Swap Component in Main Page

**Files:**
- Modify: [page.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/app/page.tsx:1-27)

- [ ] **Step 1: Swap MarqueeSection import for PlacementPulse**
  Edit `src/app/page.tsx` to import and render `PlacementPulse` inside the homepage.

  ```tsx
  import React from 'react';
  import { Navbar } from '@/components/layout/Navbar';
  import { HeroSection } from '@/components/sections/HeroSection';
  import { AboutSection } from '@/components/sections/AboutSection';
  import { PlacementPulse } from '@/components/sections/PlacementPulseSection';
  import { ServicesSection } from '@/components/sections/ServicesSection';
  import { ProjectsSection } from '@/components/sections/ProjectsSection';
  import { SmoothScroll } from '@/components/providers/SmoothScroll';

  export default function Home() {
    return (
      <SmoothScroll>
        <div className="relative min-h-screen w-full flex flex-col bg-white">
          <Navbar />
          <main className="flex-1 w-full">
            <HeroSection />
            <AboutSection />
            <PlacementPulse />
            <ServicesSection />
            <ProjectsSection />
          </main>
        </div>
      </SmoothScroll>
    );
  }
  ```

---

### Task 3: Verification & Compilation Checks

- [ ] **Step 1: Check build compilation**
  Run: `npm run build`
  Expected: Successful compile build.

- [ ] **Step 2: Check code lint checks**
  Run: `npm run lint`
  Expected: Zero syntax/linting errors.
