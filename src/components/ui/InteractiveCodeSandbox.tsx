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

    // Staggered output loading for premium terminal simulation
    const logTimeline = [
      { delay: 300, content: `Running test suite for ${challenge.fileName}...` },
      { delay: 700, isResult: true }
    ];

    logTimeline.forEach(({ delay, content, isResult }) => {
      setTimeout(() => {
        if (isResult) {
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
        } else if (content) {
          setConsoleLogs(prev => [...prev, content]);
        }
      }, delay);
    });
  };

  // Split and render starter code, replacing the missing comment line if an option is selected
  const renderEditorCode = () => {
    const lines = challenge.starterCode.split('\n');
    return lines.map((line, idx) => {
      const motionProps = {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.3, delay: idx * 0.04 }
      };

      if (line.includes('// MISSING:')) {
        const indentation = line.match(/^\s*/)?.[0] || '';
        if (selectedOption) {
          return (
            <motion.div
              key={idx}
              {...motionProps}
              className="bg-[#58CC02]/10 border-l-2 border-[#58CC02] px-2 py-0.5 my-1 text-[#58CC02] font-semibold font-mono"
            >
              {indentation}{selectedOption}
            </motion.div>
          );
        } else {
          return (
            <motion.div
              key={idx}
              {...motionProps}
              className="text-slate-500 italic bg-slate-900/40 px-2 py-0.5 my-1 border-l-2 border-slate-700 font-mono"
            >
              {line}
            </motion.div>
          );
        }
      }
      return (
        <motion.div key={idx} {...motionProps} className="px-2 text-slate-300 font-mono">
          {line}
        </motion.div>
      );
    });
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
        <span className="text-xs font-bold uppercase tracking-wider text-[#58CC02] bg-[#58CC02]/10 px-2.5 py-1 rounded-full border border-[#58CC02]/20">
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
      <div className="p-4 bg-[#0B0F19] min-h-[160px] select-none leading-relaxed text-xs overflow-x-auto">
        <pre className="font-mono">
          <code key={courseId}>{renderEditorCode()}</code>
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
              disabled={executionStatus === 'running' || executionStatus === 'success'}
              className={`w-full text-left p-3.5 rounded-xl border font-mono text-xs transition-all duration-200 cursor-pointer ${
                selectedOption === option
                  ? 'border-[#58CC02] bg-[#58CC02]/10 text-[#58CC02]'
                  : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
              } ${(executionStatus === 'running' || executionStatus === 'success') ? 'opacity-60 cursor-not-allowed' : ''}`}
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
            <Terminal className="w-4 h-4 text-[#58CC02]" />
            <span>Interactive Output Console</span>
          </div>
          <div className="flex gap-2">
            {(executionStatus === 'success' || executionStatus === 'error') && (
              <button
                onClick={() => {
                  setSelectedOption(null);
                  setExecutionStatus('idle');
                  setConsoleLogs([]);
                }}
                className="px-3 py-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all active:scale-95 cursor-pointer"
                title="Reset Challenge"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleRunTests}
              disabled={!selectedOption || executionStatus === 'running' || executionStatus === 'success'}
              className={`px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
                !selectedOption || executionStatus === 'success'
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                  : 'bg-[#58CC02] hover:bg-[#4cb002] text-[#0F172A] shadow-[0_4px_14px_rgba(88,204,2,0.25)]'
              }`}
            >
              {executionStatus === 'running' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Running...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#0F172A]" /> Run Tests
                </>
              )}
            </button>
          </div>
        </div>

        {consoleLogs.length > 0 && (
          <div className="p-4 bg-black border border-slate-900 rounded-xl font-mono text-xs flex flex-col gap-1.5 min-h-[90px] leading-relaxed">
            {consoleLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.startsWith('✓') || log.includes('PASSED')
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
            <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0" />
            <span>Check passed! Recruiter proof verification signature generated.</span>
          </div>
        )}

        {executionStatus === 'error' && (
          <div className="flex items-center gap-2 bg-rose-500/8 border border-rose-500/20 rounded-xl p-3.5 text-rose-500 text-xs font-semibold">
            <AlertTriangle className="w-4.5 h-4.5 flex-shrink-0" />
            <span>Compilation error. Review selected options and run again.</span>
          </div>
        )}
      </div>
    </div>
  );
};
