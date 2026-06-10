import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PlatformNav } from '@/components/layout/PlatformNav';
import { DeviceMockup, MockupTab } from '@/components/ui/DeviceMockup';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Sparkles, Trophy, Code2, Heart } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';

export default function PlatformLMSPage() {
  const lmsTabs: MockupTab[] = [
    {
      id: 'dashboard',
      label: 'Student Dashboard',
      imageSrc: '/assets/lms_dashboard.png',
      description: 'Track student XP, weekly coding streaks, and global batch standings in a premium gamified dashboard interface designed to drive daily coding habits.',
      features: [
        'Real-time leaderboard rankings and cohort standings',
        'Daily streak tracker (Duolingo-style gamification)',
        'Custom earned badges and skill level checkpoints'
      ]
    },
    {
      id: 'lms-learn',
      label: 'Interactive Course Learning',
      imageSrc: '/assets/lms_learn.png',
      description: 'Deliver structured lessons containing embedded code playgrounds, interactive reading notes, video instructions, and instant evaluation criteria.',
      features: [
        'Integrated sandbox code editor for practice',
        'Progressive syllabus unlock structure',
        'Direct connection to assessed exam modules'
      ]
    }
  ];

  const lmsFeatures = [
    {
      index: '01',
      title: 'Gamified Coding Habits',
      description: 'Daily streak multipliers, XP systems, and batch levels incentivise students to write code every single day without manual pushes.'
    },
    {
      index: '02',
      title: 'Syllabus Alignment',
      description: 'Directly maps academic curriculums into coding milestones. Complete university assignments in a premium sandbox environment.'
    },
    {
      index: '03',
      title: 'Vetted Project Portfolios',
      description: 'Students complete proctored full-stack projects that build a verified public-facing developer portfolio for recruiters.'
    }
  ];

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-white overflow-x-hidden">
        <Navbar />
        
        {/* Hero Section */}
        <PageHero
          badge="Gamified LMS"
          badgeIcon={<Sparkles className="w-4 h-4" />}
          title="Adaptive Learning"
          titleAccent="Powered by Play"
          description="Turn syllabus-aligned courses into a rewarding daily challenge. Students build streaks, level up their XP, and prove their skills in real-time sandboxes."
          gradientFrom="from-emerald-950"
          gradientTo="to-slate-900"
          accentColor="#58CC02"
        />

        {/* Platform Sub-Nav */}
        <PlatformNav />

        {/* Screenshot Showcase Section */}
        <section className="w-full py-20 bg-zinc-50/50 border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
            
            <div className="text-center max-w-2xl mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
                High-Fidelity Student Workspace
              </h2>
              <p className="text-zinc-500 text-sm md:text-base font-medium mt-3">
                See how students navigate curriculum challenges, compile code in real-time, and stack badges.
              </p>
            </div>

            <DeviceMockup tabs={lmsTabs} urlPath="ugskill.com/platform/lms" glowColor="#58CC02" />

          </div>
        </section>

        {/* Detailed Features Section (ServicesStyle List Rows) */}
        <section className="w-full py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            
            <div className="mb-16 text-left">
              <span className="text-xs font-extrabold text-[#58CC02] uppercase tracking-widest bg-[#58CC02]/8 px-3 py-1.5 rounded-full">
                Features Overview
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-950 mt-6 tracking-tight">
                LMS Highlights
              </h2>
            </div>

            <div className="flex flex-col border-t border-zinc-200">
              {lmsFeatures.map((feat) => (
                <div 
                  key={feat.index} 
                  className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 md:gap-10 py-10 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors duration-300 px-4"
                >
                  <span className="text-4xl md:text-5xl font-black text-zinc-350 leading-none">
                    {feat.index}
                  </span>
                  <div className="flex flex-col text-left">
                    <h3 className="text-xl font-bold text-zinc-950 mb-2.5">
                      {feat.title}
                    </h3>
                    <p className="text-zinc-500 font-semibold text-sm leading-relaxed max-w-3xl">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        <FooterCTASection />
      </div>
    </SmoothScroll>
  );
}
