# Interactive Course Library Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the static course library marquee section into a highly interactive hybrid system that serves an IDE Coding Sandbox to desktop users and a premium gamified SVG roadmap to mobile users.

**Architecture:** Use client-side React screen-width detection to conditionally load the split-pane desktop workspace or the vertical adventure roadmap. The desktop sandbox executes a mini-test harness visual simulation, and the mobile roadmap uses dynamic SVG coordinate rendering and modal overlays.

**Tech Stack:** React, Next.js, Tailwind CSS, Lucide icons, Framer Motion

---

### Task 1: Create InteractiveCodeSandbox Component

**Files:**
- Create: [InteractiveCodeSandbox.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/ui/InteractiveCodeSandbox.tsx)

- [ ] **Step 1: Create the Code Sandbox component file**
  Create the file with full syntax highlighting mockups, bug selection state, test suite execution status, and console outputs.

  ```tsx
  'use client';

  import React, { useState, useEffect } from 'react';
  import { motion } from 'framer-motion';
  import { Terminal, Play, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

  interface SandboxProps {
    courseId: number;
    courseTitle: string;
  }

  interface CodeChallenge {
    fileName: string;
    instructions: string;
    starterCode: string;
    correctOption: string;
    options: string[];
    testOutput: string[];
  }

  const CHALLENGES: Record<number, CodeChallenge> = {
    1: {
      fileName: 'checkpoints.js',
      instructions: 'Insert the progress milestone validator to verify student weekly path requirements.',
      starterCode: `function validateWeeklyProgress(student) {
    const activeWeek = student.currentWeek;
    const requirements = activeWeek.getRequirements();
    
    // MISSING: Check if all progress milestones are checked
    return requirements.every(req => req.status === "completed");
  }`,
      correctOption: 'if (requirements.length === 0) return false;',
      options: [
        'if (requirements.length === 0) return false;',
        'if (requirements === null) return true;',
        'requirements.forEach(req => req.status = "completed");'
      ],
      testOutput: [
        'Running test suite for checkpoints.js...',
        '✓ Test 1: Empty weekly requirements should return false (1ms)',
        '✓ Test 2: Standard progress validation matches database state (3ms)',
        'All 2 checks PASSED.'
      ]
    },
    2: {
      fileName: 'bfs_traversal.js',
      instructions: 'Complete the neighboring node traversal loop inside the BFS function.',
      starterCode: `function bfsTraversal(startNode) {
    const queue = [startNode];
    const visited = new Set([startNode]);
    
    while (queue.length > 0) {
      const current = queue.shift();
      
      // MISSING: Traverse all neighboring nodes
      
    }
    return Array.from(visited);
  }`,
      correctOption: 'for (let neighbor of current.neighbors) { if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); } }',
      options: [
        'for (let neighbor of current.neighbors) { if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); } }',
        'current.neighbors.forEach(neighbor => visited.add(neighbor));',
        'queue.push(...current.neighbors);'
      ],
      testOutput: [
        'Running test suite for bfs_traversal.js...',
        '✓ Test 1: Traverses complete graph elements successfully (2ms)',
        '✓ Test 2: Cycles do not result in infinite loop (1ms)',
        'All 2 checks PASSED.'
      ]
    },
    3: {
      fileName: 'proctor_check.js',
      instructions: 'Implement window focus change detection logic for proctored anti-cheat assessments.',
      starterCode: `function monitorWindowFocus() {
    let focusViolations = 0;
    
    // MISSING: Add window blur listener to increment violations
    
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }`,
      correctOption: 'const handleBlur = () => { focusViolations++; triggerWarning(); }; window.addEventListener("blur", handleBlur);',
      options: [
        'const handleBlur = () => { focusViolations++; triggerWarning(); }; window.addEventListener("blur", handleBlur);',
        'window.blur = () => focusViolations += 1;',
        'document.addEventListener("visibilitychange", () => focusViolations++);'
      ],
      testOutput: [
        'Running test suite for proctor_check.js...',
        '✓ Test 1: Window loss of focus increments violation logs (3ms)',
        '✓ Test 2: Warning UI renders successfully (2ms)',
        'All 2 checks PASSED.'
      ]
    },
    4: {
      fileName: 'resume_parse.js',
      instructions: 'Validate technical skills against recruiter pipeline constraints.',
      starterCode: `function validateCandidateSkills(candidate, pipeline) {
    const requiredSkills = pipeline.getRequiredSkills();
    
    // MISSING: Verify candidate matches all required skills
    return requiredSkills.every(skill => candidate.skills.includes(skill));
  }`,
      correctOption: 'if (!candidate.skills || candidate.skills.length === 0) return false;',
      options: [
        'if (!candidate.skills || candidate.skills.length === 0) return false;',
        'return candidate.skills.some(skill => requiredSkills.includes(skill));',
        'candidate.skills = requiredSkills;'
      ],
      testOutput: [
        'Running test suite for resume_parse.js...',
        '✓ Test 1: Match score computed accurately against Vercel requirements (2ms)',
        '✓ Test 2: Insufficient match correctly flags candidates (1ms)',
        'All 2 checks PASSED.'
      ]
    },
    5: {
      fileName: 'ai_tutor.js',
      instructions: 'Complete response buffering for the real-time AI tutor hint pipeline.',
      starterCode: `function bufferResponse(chunks) {
    let fullText = "";
    
    // MISSING: Concatenate and yield streamed chat tokens
    for (let chunk of chunks) {
      fullText += chunk;
    }
    return fullText;
  }`,
      correctOption: 'if (!chunks || chunks.length === 0) return "";',
      options: [
        'if (!chunks || chunks.length === 0) return "";',
        'return chunks.join("");',
        'chunks.map(chunk => chunk.text);'
      ],
      testOutput: [
        'Running test suite for ai_tutor.js...',
        '✓ Test 1: Response buffering yields correct string output (3ms)',
        '✓ Test 2: Handle malformed tokens safely (2ms)',
        'All 2 checks PASSED.'
      ]
    },
    6: {
      fileName: 'capstone_badge.js',
      instructions: 'Verify student capstone completion and unlock direct recruiter placement badges.',
      starterCode: `function verifyCapstoneSubmission(project) {
    const evaluatorScore = project.getEvaluatorScore();
    
    // MISSING: Ensure score is above 85 to qualify for badge
    return evaluatorScore >= 85;
  }`,
      correctOption: 'if (project.status !== "submitted") return false;',
      options: [
        'if (project.status !== "submitted") return false;',
        'return evaluatorScore > 80;',
        'project.badgeUnlocked = true;'
      ],
      testOutput: [
        'Running test suite for capstone_badge.js...',
        '✓ Test 1: Grade below threshold returns false (2ms)',
        '✓ Test 2: Successful verification grants badge (2ms)',
        'All 2 checks PASSED.'
      ]
    }
  };

  export const InteractiveCodeSandbox: React.FC<SandboxProps> = ({ courseId, courseTitle }) => {
    const challenge = CHALLENGES[courseId] || CHALLENGES[1];
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [executionStatus, setExecutionStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

    useEffect(() => {
      setSelectedOption(null);
      setExecutionStatus('idle');
      setConsoleLogs([]);
    }, [courseId]);

    const handleRunTests = () => {
      if (!selectedOption) return;
      setExecutionStatus('running');
      setConsoleLogs(['Compiling workspace dependencies...', 'Spawning test harness thread...']);

      setTimeout(() => {
        if (selectedOption === challenge.correctOption) {
          setExecutionStatus('success');
          setConsoleLogs(prev => [...prev, ...challenge.testOutput]);
        } else {
          setExecutionStatus('error');
          setConsoleLogs(prev => [
            ...prev,
            'FAIL: Test 1: Validation checks encountered an error.',
            'Expected correct code block to compile.',
            'Compilation ERROR: Unexpected runtime behavior detected.'
          ]);
        }
      }, 1500);
    };

    return (
      <div className="w-full flex flex-col bg-[#0F172A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-200 font-mono text-sm">
        {/* IDE Header Tab Bar */}
        <div className="bg-[#1E293B] px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
            <span className="text-xs text-slate-400 font-semibold ml-3 bg-slate-900/60 px-3 py-1 rounded-md border border-slate-800/40">
              {challenge.fileName}
            </span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            {courseTitle} Sandbox
          </span>
        </div>

        {/* Instructions */}
        <div className="p-5 bg-slate-900/40 border-b border-slate-800/50">
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
            <span className="text-[#58CC02] font-bold">TASK INSTRUCTION: </span>
            {challenge.instructions}
          </p>
        </div>

        {/* Code Editor */}
        <div className="p-6 bg-[#0B0F19] min-h-[160px] overflow-x-auto select-none leading-relaxed text-xs">
          <pre className="text-slate-300">
            <code>{challenge.starterCode}</code>
          </pre>
        </div>

        {/* Bug Fixing Choices */}
        <div className="p-5 bg-slate-900/30 border-t border-slate-800/50">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            Select Line to Insert:
          </span>
          <div className="flex flex-col gap-2.5">
            {challenge.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => executionStatus === 'idle' && setSelectedOption(option)}
                className={`w-full text-left p-3.5 rounded-xl border font-mono text-xs transition-all duration-200 ${
                  selectedOption === option
                    ? 'border-[#58CC02] bg-[#58CC02]/8 text-[#58CC02]'
                    : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button & Interactive Terminal */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <span>Interactive Output Console</span>
            </div>
            <button
              onClick={handleRunTests}
              disabled={!selectedOption || executionStatus === 'running'}
              className={`px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
                !selectedOption
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-[#58CC02] hover:bg-[#4cb002] text-[#0F172A] shadow-[0_4px_14px_rgba(88,204,2,0.25)]'
              }`}
            >
              {executionStatus === 'running' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Compiling...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#0F172A]" /> Run Tests
                </>
              )}
            </button>
          </div>

          {consoleLogs.length > 0 && (
            <div className="p-4 bg-black border border-slate-900 rounded-xl font-mono text-xs flex flex-col gap-1.5 min-h-[90px] leading-relaxed">
              {consoleLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.startsWith('✓')
                      ? 'text-[#58CC02]'
                      : log.startsWith('FAIL') || log.startsWith('Compilation')
                      ? 'text-rose-500'
                      : 'text-slate-400'
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          )}

          {executionStatus === 'success' && (
            <div className="flex items-center gap-2 bg-[#58CC02]/8 border border-[#58CC02]/20 rounded-xl p-3.5 text-[#58CC02] text-xs font-semibold">
              <CheckCircle2 className="w-4.5 h-4.5" />
              <span>Check passed! Recruiter proof verification signature generated.</span>
            </div>
          )}

          {executionStatus === 'error' && (
            <div className="flex items-center gap-2 bg-rose-500/8 border border-rose-500/20 rounded-xl p-3.5 text-rose-500 text-xs font-semibold">
              <AlertTriangle className="w-4.5 h-4.5" />
              <span>Compilation error. Review selected options and run again.</span>
            </div>
          )}
        </div>
      </div>
    );
  };
  ```

---

### Task 2: Create PremiumMobileRoadmap Component

**Files:**
- Create: [PremiumMobileRoadmap.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/ui/PremiumMobileRoadmap.tsx)

- [ ] **Step 1: Create the Mobile Winding Roadmap component**
  Build the component to trace a curved line path via SVG, placing interactive glassmorphic check-ins and module popups containing skill metrics.

  ```tsx
  'use client';

  import React, { useState } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Sparkles, Trophy, Award, Lock, BookOpen, Layers3, ClipboardList, GraduationCap, Brain, X } from 'lucide-react';

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

    // Node configuration positions (winding offsets)
    const positions = [
      { x: 150, y: 30, status: 'completed' },
      { x: 230, y: 140, status: 'active' },
      { x: 70, y: 250, status: 'locked' },
      { x: 180, y: 360, status: 'locked' },
      { x: 100, y: 470, status: 'locked' },
      { x: 150, y: 580, status: 'locked' }
    ];

    const getIconColor = (status: string) => {
      if (status === 'completed') return 'bg-gradient-to-tr from-[#58CC02] to-[#22C55E] text-white';
      if (status === 'active') return 'bg-gradient-to-tr from-[#0EA5E9] to-[#2563EB] text-white';
      return 'bg-slate-100 text-slate-400 border-slate-200';
    };

    return (
      <div className="w-full flex flex-col items-center py-6">
        <div className="relative w-full max-w-[340px] aspect-[300/640] select-none">
          {/* Connecting SVG Path Winding Line */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 300 640" fill="none">
            <path
              d="M 150 30 C 230 85, 230 85, 230 140 C 230 195, 70 195, 70 250 C 70 305, 180 305, 180 360 C 180 415, 100 415, 100 470 C 100 525, 150 525, 150 580"
              stroke="#E2E8F0"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 150 30 C 230 85, 230 85, 230 140"
              stroke="#58CC02"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>

          {/* Mascot floating companion next to Node 2 */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute left-[240px] top-[95px] z-10 w-14 h-14 pointer-events-none"
          >
            <img
              src="/assets/projects/student_mascot_clay.png"
              alt="Floating Mascot Guide"
              className="w-full h-auto drop-shadow-[0_8px_16px_rgba(88,204,2,0.2)]"
            />
          </motion.div>

          {/* Iterating Nodes */}
          {courses.map((course, idx) => {
            const pos = positions[idx] || { x: 150, y: 30 + idx * 100, status: 'locked' };
            const isActive = pos.status === 'active';
            const isCompleted = pos.status === 'completed';

            return (
              <div
                key={course.id}
                style={{ left: pos.x, top: pos.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
              >
                {/* Pulsing ring around active node */}
                {isActive && (
                  <motion.div
                    animate={{ scale: [0.95, 1.3, 0.95], opacity: [0.8, 0, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -inset-2 rounded-full border-2 border-[#0EA5E9] bg-[#0EA5E9]/10 pointer-events-none"
                  />
                )}

                <button
                  onClick={() => setSelectedCourse(course)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all ${getIconColor(
                    pos.status
                  )}`}
                >
                  {isCompleted ? '✓' : isActive ? `0${course.id}` : <Lock className="w-4 h-4 text-slate-400" />}
                </button>

                {/* Micro popup card for active node */}
                {isActive && (
                  <div className="absolute top-14 bg-white/95 backdrop-blur-md border border-sky-100 rounded-xl px-3 py-1.5 shadow-md flex flex-col items-center min-w-[110px]">
                    <span className="text-[9px] font-extrabold text-sky-600 leading-none">ACTIVE</span>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-none mt-1 truncate max-w-[95px]">
                      {course.title}
                    </span>
                  </div>
                )}
              </div>
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
              <motion.div
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm bg-white rounded-t-[2.5rem] p-6 shadow-2xl flex flex-col border-t border-slate-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#58CC02] bg-[#58CC02]/8 px-3 py-1 rounded-full uppercase tracking-wider">
                      Module 0{selectedCourse.id}
                    </span>
                  </div>
                  <button onClick={() => setSelectedCourse(null)} className="p-1 rounded-full bg-slate-50 border border-slate-100 cursor-pointer">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">{selectedCourse.title}</h3>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {selectedCourse.category}
                </span>

                <p className="text-sm text-slate-500 font-medium leading-relaxed my-4">
                  {selectedCourse.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCourse.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-600 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="w-full py-4 rounded-2xl bg-[#58CC02] hover:bg-[#4cb002] text-[#0F172A] font-extrabold text-sm shadow-[0_4px_14px_rgba(88,204,2,0.25)] cursor-pointer"
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
  ```

---

### Task 3: Refactor MarqueeSection Component

**Files:**
- Modify: [MarqueeSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/MarqueeSection.tsx)

- [ ] **Step 1: Implement screen width detection and split-pane layout**
  Update the marquee components to render the code sandbox on desktop or roadmap on mobile dynamically based on window resize hooks.

  ```tsx
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
  ```

---

### Task 4: Verify Compilation & Responsiveness

- [ ] **Step 1: Check build compilation**
  Run: `npm run build`
  Expected: Successful Turbopack build outputs with zero type checking issues.
