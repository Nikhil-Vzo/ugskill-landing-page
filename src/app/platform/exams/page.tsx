import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PlatformNav } from '@/components/layout/PlatformNav';
import { DeviceMockup, MockupTab } from '@/components/ui/DeviceMockup';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Award, Lock, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';

export default function PlatformExamsPage() {
  const examTabs: MockupTab[] = [
    {
      id: 'exams-panel',
      label: 'Proctor Control Panel',
      imageSrc: '/assets/exam_proctor.png',
      description: 'Delivers full audit-trail records of a student exam. Tracks browser tab switching, active proctor decisions, assessment integrity thresholds, and timing logs.',
      features: [
        'Real-time window activity warnings and focus logs',
        'Comprehensive activity audit log feed',
        'Cryptographic hash generation for verified credentials'
      ]
    }
  ];

  const examFeatures = [
    {
      index: '01',
      title: 'Active Proctor Log Feed',
      description: 'The proctor engine records all candidate actions (such as leaving full screen, copy-pasting, or switching tabs) into a detailed, timestamped timeline.'
    },
    {
      index: '02',
      title: 'Integrity Scoring Matrix',
      description: 'Calculates a real-time integrity percentage score based on flagged actions. Scores below threshold are automatically flagged for coordinator review.'
    },
    {
      index: '03',
      title: 'Cryptographic Hash Matches',
      description: 'Assessment credentials generate unique cryptographic hashes, verifying student identification matches and score authenticity.'
    }
  ];

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-white overflow-x-hidden">
        <Navbar />
        
        {/* Hero Section */}
        <PageHero
          badge="Proctored Exams"
          badgeIcon={<Lock className="w-4 h-4" />}
          title="Vetted Assessments"
          titleAccent="With Full Integrity"
          description="Deliver secure, cheat-proof coding evaluations. Active focus tracking, proctor logs, and cryptographic credential signatures guarantee reliable skill matching."
          gradientFrom="from-slate-950"
          gradientTo="to-blue-950"
          accentColor="#3B82F6"
        />

        {/* Platform Sub-Nav */}
        <PlatformNav />

        {/* Screenshot Showcase Section */}
        <section className="w-full py-20 bg-zinc-50/50 border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
            
            <div className="text-center max-w-2xl mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
                Cheat-Proof Proctor Console
              </h2>
              <p className="text-zinc-500 text-sm md:text-base font-medium mt-3">
                Inspect candidate audit records, proctored timeline charts, and score integrity thresholds.
              </p>
            </div>

            <DeviceMockup tabs={examTabs} urlPath="ugskill.com/platform/exams" glowColor="#0052ff" />

          </div>
        </section>

        {/* Detailed Features Section (ServicesStyle List Rows) */}
        <section className="w-full py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            
            <div className="mb-16 text-left">
              <span className="text-xs font-extrabold text-[#0052ff] uppercase tracking-widest bg-[#0052ff]/8 px-3 py-1.5 rounded-full">
                Exam Controls
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-950 mt-6 tracking-tight">
                Integrity Safeguards
              </h2>
            </div>

            <div className="flex flex-col border-t border-zinc-200">
              {examFeatures.map((feat) => (
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
