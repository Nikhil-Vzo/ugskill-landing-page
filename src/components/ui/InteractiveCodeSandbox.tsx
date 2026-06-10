'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface SandboxProps {
  initialChallengeId?: number;
}

interface CodeChallenge {
  fileName: string;
  courseTitle: string;
  instructions: string;
  starterCode: string;
  correctOption: string;
  options: string[];
  testOutput: string[];
}

const CHALLENGES: Record<number, CodeChallenge> = {
  1: {
    fileName: 'checkpoints.js',
    courseTitle: 'LMS Foundations',
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
    courseTitle: 'Programming Track',
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
    courseTitle: 'Assessment Builder',
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
    courseTitle: 'Career Readiness',
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
    courseTitle: 'AI Learning Assistant',
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
    courseTitle: 'Project Completion Path',
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

const highlightJS = (codeLine: string) => {
  if (codeLine.trim().startsWith('//')) {
    return <span className="text-slate-400 italic font-mono">{codeLine}</span>;
  }
  
  // A simple tokenizer to replace key words with styled spans matching brand guidelines
  const parts = codeLine.split(/(\/\/.*|"[^"]*"|'[^']*'|\b(?:const|let|var|function|return|while|for|of|in|if|else|new|import|export|default|class|from|try|catch)\b|\b(?:Set|Map|Array|window|document|console)\b|\b(?:every|some|includes|forEach|map|filter|reduce|shift|push|add|has|getRequirements|getRequiredSkills|getEvaluatorScore|addEventListener|removeEventListener|triggerWarning|length|status|skills|currentWeek|neighbors|activeWeek|focusViolations|handleBlur)\b|\b\d+\b|=>|===|==|!==|!=|=|\+|-|\*|\/|&&|\|\||!|>=|<=|>|<)/g);
  
  return parts.map((part, index) => {
    if (!part) return null;
    
    // Check comments first
    if (part.startsWith('//')) {
      return <span key={index} className="text-slate-400 italic font-mono">{part}</span>;
    }
    // Check strings
    if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
      return <span key={index} className="text-emerald-600 font-semibold font-mono">{part}</span>;
    }
    // Check keywords
    if (/^\b(?:const|let|var|function|return|while|for|of|in|if|else|new|import|export|default|class|from|try|catch)\b$/.test(part)) {
      return <span key={index} className="text-violet-600 font-bold font-mono">{part}</span>;
    }
    // Check built-ins
    if (/^\b(?:Set|Map|Array|window|document|console)\b$/.test(part)) {
      return <span key={index} className="text-sky-500 font-bold font-mono">{part}</span>;
    }
    // Check methods/properties
    if (/^\b(?:every|some|includes|forEach|map|filter|reduce|shift|push|add|has|getRequirements|getRequiredSkills|getEvaluatorScore|addEventListener|removeEventListener|triggerWarning|length|status|skills|currentWeek|neighbors|activeWeek|focusViolations|handleBlur)\b$/.test(part)) {
      return <span key={index} className="text-[#0052ff] font-semibold font-mono">{part}</span>;
    }
    // Check numbers
    if (/^\d+$/.test(part)) {
      return <span key={index} className="text-amber-500 font-bold font-mono">{part}</span>;
    }
    // Check operators
    if (/^(?:=>|===|==|!==|!=|=|\+|-|\*|\/|&&|\|\||!|>=|<=|>|<)$/.test(part)) {
      return <span key={index} className="text-rose-500 font-bold font-mono">{part}</span>;
    }
    
    // Default fallback
    return <span key={index} className="text-slate-700 font-mono">{part}</span>;
  });
};

export const InteractiveCodeSandbox: React.FC<SandboxProps> = ({ initialChallengeId = 1 }) => {
  const [activeChallengeId, setActiveChallengeId] = useState<number>(initialChallengeId);
  const challenge = CHALLENGES[activeChallengeId] || CHALLENGES[1];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

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
              className="flex items-start my-1.5 py-1 px-4 bg-[#0052ff]/5 border-l-[3px] border-[#0052ff] text-[#0041cc] font-semibold font-mono"
            >
              <span className="w-6 text-right select-none text-[#0052ff]/45 text-[10px] mr-4 font-mono pt-0.5">
                {idx + 1}
              </span>
              <span className="flex-1 font-mono text-xs leading-relaxed whitespace-pre font-bold">
                {indentation}{selectedOption}
              </span>
            </motion.div>
          );
        } else {
          return (
            <motion.div
              key={idx}
              {...motionProps}
              className="flex items-start my-1.5 py-1 px-4 bg-amber-500/5 border-l-[3px] border-amber-500 text-amber-600 font-medium font-mono"
            >
              <span className="w-6 text-right select-none text-amber-500/45 text-[10px] mr-4 font-mono pt-0.5">
                {idx + 1}
              </span>
              <span className="flex-1 font-mono text-xs leading-relaxed whitespace-pre italic">
                {line}
              </span>
            </motion.div>
          );
        }
      }
      return (
        <motion.div key={idx} {...motionProps} className="flex items-start py-0.5 px-4 hover:bg-slate-100/50 transition-colors duration-150 group">
          <span className="w-6 text-right select-none text-slate-300 text-[10px] mr-4 font-mono pt-0.5 group-hover:text-slate-400">
            {idx + 1}
          </span>
          <span className="flex-1 font-mono text-xs leading-relaxed whitespace-pre text-slate-700">
            {highlightJS(line)}
          </span>
        </motion.div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-diffused text-slate-700 font-sans text-sm relative group/sandbox">
      {/* Background glowing gradient overlay when hovered */}
      <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/5 to-sky-500/5 rounded-3xl opacity-0 group-hover/sandbox:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      
      <div className="relative z-10 bg-white rounded-[23px] overflow-hidden flex flex-col w-full h-full">
        {/* IDE Header Tab Bar */}
        <div className="bg-slate-50/80 backdrop-blur-md px-5 py-2.5 flex items-center justify-between border-b border-slate-200/80 overflow-hidden">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm block"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm block"></span>
            </div>
            
            {/* Scrollable File Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 flex-1">
              {Object.entries(CHALLENGES).map(([idStr, ch]) => {
                const id = Number(idStr);
                const isActive = id === activeChallengeId;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveChallengeId(id);
                      setSelectedOption(null);
                      setExecutionStatus('idle');
                      setConsoleLogs([]);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-mono tracking-tight border transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? 'bg-white border-slate-200 text-[#0052ff] font-bold shadow-sm'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {ch.fileName}
                  </button>
                );
              })}
            </div>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#0052ff] bg-[#0052ff]/8 px-2.5 py-1 rounded-full border border-[#0052ff]/20 shadow-sm flex items-center gap-1 flex-shrink-0 ml-3">
            <span className="w-1 h-1 bg-[#0052ff] rounded-full animate-pulse" />
            {challenge.courseTitle}
          </span>
        </div>

        {/* Instructions */}
        <div className="p-5 bg-slate-50/30 border-b border-slate-200/60 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-[#0052ff]/10 border border-[#0052ff]/20 rounded-lg text-[#0052ff] mt-0.5">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed pt-0.5">
              <span className="text-slate-805 font-extrabold tracking-tight block mb-0.5">CHALLENGE INSTRUCTION:</span>
              {challenge.instructions}
            </p>
          </div>
        </div>

        {/* Code Editor */}
        <div className="py-4 bg-[#F8FAFC] min-h-[185px] select-none leading-relaxed text-xs overflow-x-auto border-b border-slate-200/60 flex flex-col">
          {renderEditorCode()}
        </div>

        {/* Bug Fixing Choices */}
        <div className="p-5 bg-white border-b border-slate-200/60">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-3">
            Select Line to Insert:
          </span>
          <div className="flex flex-col gap-2.5">
            {challenge.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={idx}
                  onClick={() => executionStatus === 'idle' && setSelectedOption(option)}
                  disabled={executionStatus === 'running' || executionStatus === 'success'}
                  className={`w-full text-left p-4 rounded-xl border font-mono text-xs transition-all duration-200 cursor-pointer flex items-center gap-3 relative group/option ${
                    isSelected
                      ? 'border-[#0052ff] bg-[#0052ff]/5 text-[#0041cc] font-semibold shadow-[0_2px_12px_rgba(0, 82, 255,0.06)]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/40 shadow-sm'
                  } ${(executionStatus === 'running' || executionStatus === 'success') ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isSelected 
                      ? 'border-[#0052ff] bg-[#0052ff]' 
                      : 'border-slate-300 bg-white group-hover/option:border-slate-400'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="flex-1 font-mono text-xs leading-relaxed whitespace-pre overflow-x-auto">
                    {highlightJS(option)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button & Interactive Terminal */}
        <div className="p-5 bg-slate-50 border-t border-slate-200/80 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
              <Terminal className="w-4 h-4 text-[#0052ff]" />
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
                  className="px-3 py-3 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 shadow-sm transition-all active:scale-95 cursor-pointer"
                  title="Reset Challenge"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={handleRunTests}
                disabled={!selectedOption || executionStatus === 'running' || executionStatus === 'success'}
                className={`px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                  !selectedOption || executionStatus === 'success'
                    ? 'bg-slate-105 text-slate-400 border border-slate-200/50 cursor-not-allowed shadow-none active:translate-y-0'
                    : 'bg-[#0052ff] hover:bg-[#1a66ff] text-white shadow-[0_4px_0_#0041cc] border-b-[4px] border-[#0041cc] active:translate-y-[4px] active:shadow-none'
                }`}
              >
                {executionStatus === 'running' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Running...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white text-white" /> Run Tests
                  </>
                )}
              </button>
            </div>
          </div>

          {consoleLogs.length > 0 && (
            <div className="p-4 bg-[#18181B] border border-slate-900 rounded-xl font-mono text-xs flex flex-col gap-1.5 min-h-[90px] leading-relaxed shadow-inner">
              {consoleLogs.map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    log.startsWith('✓') || log.includes('PASSED')
                      ? 'text-[#0052ff] font-semibold flex items-center gap-1.5'
                      : log.startsWith('FAIL') || log.startsWith('Compilation')
                      ? 'text-rose-400 font-semibold flex items-center gap-1.5'
                      : 'text-slate-300 font-medium'
                  }
                >
                  {log}
                </motion.div>
              ))}
            </div>
          )}

          {executionStatus === 'success' && (
            <div className="flex items-center gap-2 bg-[#0052ff]/8 border border-[#0052ff]/20 rounded-xl p-3.5 text-[#0041cc] text-xs font-semibold">
              <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0" />
              <span>Check passed! Recruiter proof verification signature generated.</span>
            </div>
          )}

          {executionStatus === 'error' && (
            <div className="flex items-center gap-2 bg-rose-500/8 border border-rose-500/20 rounded-xl p-3.5 text-rose-600 text-xs font-semibold">
              <AlertTriangle className="w-4.5 h-4.5 flex-shrink-0" />
              <span>Compilation error. Review selected options and run again.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
