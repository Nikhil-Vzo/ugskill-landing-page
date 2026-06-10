import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PlatformNav } from '@/components/layout/PlatformNav';
import { DeviceMockup, MockupTab } from '@/components/ui/DeviceMockup';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Sparkles, TrendingUp, Trophy } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';

export default function PlatformPlacementsPage() {
  const placementTabs: MockupTab[] = [
    {
      id: 'placements-dashboard',
      label: 'Student Placement Portal',
      imageSrc: '/assets/placement_student.png',
      description: 'Provides students with direct pathways to corporate drives. Displays matching scores, proctor assessment review status, active job cards, recruiter messages, and cohort rankings.',
      features: [
        'Curated jobs listing matching assessed readiness scores',
        'Coordinator verified assessment checklists',
        'Direct recruiter inquiry matching alerts'
      ]
    }
  ];

  const placementFeatures = [
    {
      index: '01',
      title: 'Hiring Drives Management',
      description: 'Campus placement officers launch and manage active drives. Direct filters invite students with specific skill hashes to interview instantly.'
    },
    {
      index: '02',
      title: 'Automated Matchmaking Score',
      description: 'Matches students to roles using verified coding metrics, behavioral proctor scores, and sandbox project stats instead of unverified resume text.'
    },
    {
      index: '03',
      title: 'Verified Outcomes',
      description: 'Hired students generate signature tokens, logging successful placement statistics directly into the campus dashboard metrics.'
    }
  ];

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-white overflow-x-hidden">
        <Navbar />
        
        {/* Hero Section */}
        <PageHero
          badge="Placements Engine"
          badgeIcon={<Trophy className="w-4 h-4" />}
          title="Campus-to-Corporate"
          titleAccent="Placement Pipeline"
          description="Connect verified, proctor-tested graduates with top recruiters. Cryptographic credentials and skill diagnostics make every placement match trustworthy."
          gradientFrom="from-violet-950"
          gradientTo="to-slate-950"
          accentColor="#8B5CF6"
        />

        {/* Platform Sub-Nav */}
        <PlatformNav />

        {/* Screenshot Showcase Section */}
        <section className="w-full py-20 bg-zinc-50/50 border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
            
            <div className="text-center max-w-2xl mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
                Vetted Student Dashboard
              </h2>
              <p className="text-zinc-550 text-sm md:text-base font-medium mt-3">
                Inspect application status timelines, placement match scoring, and proctor assessment verifications.
              </p>
            </div>

            <DeviceMockup tabs={placementTabs} urlPath="ugskill.com/platform/placements" glowColor="#58CC02" />

          </div>
        </section>

        {/* Detailed Features Section (ServicesStyle List Rows) */}
        <section className="w-full py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            
            <div className="mb-16 text-left">
              <span className="text-xs font-extrabold text-[#58CC02] uppercase tracking-widest bg-[#58CC02]/8 px-3 py-1.5 rounded-full">
                Placements Engine
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-950 mt-6 tracking-tight">
                Outcome Workflows
              </h2>
            </div>

            <div className="flex flex-col border-t border-zinc-200">
              {placementFeatures.map((feat) => (
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
