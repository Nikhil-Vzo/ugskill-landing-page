'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export interface MockupTab {
  id: string;
  label: string;
  imageSrc: string;
  description: string;
  features?: string[];
}

interface DeviceMockupProps {
  tabs: MockupTab[];
  urlPath?: string;
  glowColor?: string; // e.g. '#58CC02' or '#2b99cc'
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({ 
  tabs, 
  urlPath = 'ugskill.com/platform',
  glowColor = '#58CC02'
}) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || '');

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  if (!activeTab) return null;

  return (
    <div className="w-full flex flex-col items-center gap-10">
      
      {/* Tab Selectors (Premium Pill design matching PillNav look) */}
      <div className="inline-flex p-1 rounded-full bg-zinc-100 border border-zinc-200/80 shadow-xs relative select-none">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-350 cursor-pointer select-none border-0 outline-none ${
                isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeMockupTab"
                  className="absolute inset-0 rounded-full bg-black z-0 shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Container: Browser Frame & Details Block */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Premium Browser Shell (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col justify-start relative">
          
          {/* Subtle Backing Glow */}
          <div 
            className="absolute -inset-4 rounded-3xl opacity-15 blur-3xl pointer-events-none z-0 transition-colors duration-500"
            style={{
              backgroundImage: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`
            }}
          />

          {/* Browser Container */}
          <div className="relative w-full rounded-2xl border border-zinc-200 bg-zinc-50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col z-10">
            
            {/* Browser Header Chrome */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-200 select-none">
              {/* macOS Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              
              {/* URL Address Bar */}
              <div className="flex-1 max-w-md mx-auto bg-zinc-50 border border-zinc-200/80 rounded-lg py-1 px-4 flex items-center justify-between text-zinc-400 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] text-emerald-500">🔒</span>
                  <span className="text-[11px] text-zinc-650 font-medium truncate">{urlPath}/{activeTab.id}</span>
                </div>
                <span className="text-[10px] text-zinc-400 select-none">↻</span>
              </div>
              
              <div className="w-12 shrink-0" />
            </div>

            {/* Browser Content Area (Loaded Screenshots with cross-fade) */}
            <div className="relative w-full aspect-[16/10] bg-zinc-100 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-2.5"
                >
                  <img
                    src={activeTab.imageSrc}
                    alt={activeTab.label}
                    className="w-full h-full object-contain rounded-lg shadow-sm border border-zinc-200 bg-white"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Details Panel (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-6 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col gap-6 text-left"
            >
              {/* Highlight Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-250 text-zinc-800 text-xs font-bold uppercase tracking-wider w-fit">
                <Activity className="w-3.5 h-3.5 text-[#58CC02]" />
                Interactive Tour
              </div>

              {/* Title & Detailed Description */}
              <div>
                <h3 className="text-2xl font-black text-zinc-950 tracking-tight leading-none mb-3">
                  {activeTab.label}
                </h3>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">
                  {activeTab.description}
                </p>
              </div>

              {/* Bullet Features with Checkmarks */}
              {activeTab.features && activeTab.features.length > 0 && (
                <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100">
                  {activeTab.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#58CC02] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-zinc-700 leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
