import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PlatformNav } from '@/components/layout/PlatformNav';
import { DeviceMockup, MockupTab } from '@/components/ui/DeviceMockup';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Sparkles, Users } from 'lucide-react';

export default function PlatformHRPortalPage() {
  const hrTabs: MockupTab[] = [
    {
      id: 'hr-portal-dashboard',
      label: 'Recruiter HR Portal',
      imageSrc: '/assets/hr_portal.png',
      description: 'Dedicated recruiter dashboard. Enables corporate hiring partners to search candidate pools, configure placement drives, review verified proctor scores, and check cryptographic credential hash signatures.',
      features: [
        'Advanced talent search by verified readiness metrics',
        'Direct coordination of campus hiring drives',
        'Cryptographic credential hash validation check'
      ]
    }
  ];

  const hrFeatures = [
    {
      index: '01',
      title: 'Talent Sourcing Board',
      description: 'Recruiters browse proctored candidate lists, instantly sorting students by coding scores, streak consistency, and readiness averages.'
    },
    {
      index: '02',
      title: 'Drive Setup Console',
      description: 'Hiring managers create custom drives, specifying required skill tags and inviting top matching candidates with automated outreach.'
    },
    {
      index: '03',
      title: 'Assessment Audit Log Verification',
      description: 'Validate candidate integrity directly by verifying proctor decision timelines and matching signature hashes with our database logs.'
    }
  ];

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-white overflow-x-hidden">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative w-full pt-32 pb-20 flex flex-col items-center justify-center bg-white border-b border-zinc-100">
          <div className="absolute inset-0 pointer-events-none opacity-40" 
            style={{
              backgroundImage: 'radial-gradient(#D4D4D8 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }}
          />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] bg-[#58CC02]/5 blur-[90px] rounded-full pointer-events-none -z-10" />

          <div className="w-full max-w-5xl px-6 flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#58CC02]/10 border border-[#58CC02]/20 text-[#46A302] text-xs font-bold uppercase tracking-wider mb-6">
              <Users className="w-4 h-4" />
              HR Portal
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-zinc-950 tracking-tighter leading-[0.95] mb-6">
              Corporate HR Portal <br />
              <span className="text-[#58CC02]">To Source Vetted Talent</span>
            </h1>

            <p className="text-zinc-550 font-medium text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Enable corporate partners to source, assess, and verify candidate skills in a single unified dashboard. Audit logs, verified proctor results, and hash check tools build hiring trust.
            </p>
          </div>
        </section>

        {/* Platform Sub-Nav */}
        <PlatformNav />

        {/* Screenshot Showcase Section */}
        <section className="w-full py-20 bg-zinc-50/50 border-b border-zinc-150">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
            
            <div className="text-center max-w-2xl mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
                Corporate Partner Dashboard
              </h2>
              <p className="text-zinc-550 text-sm md:text-base font-medium mt-3">
                Review candidate pools, active placement drives, and verified assessment credentials.
              </p>
            </div>

            <DeviceMockup tabs={hrTabs} urlPath="ugskill.com/platform/hr-portal" glowColor="#58CC02" />

          </div>
        </section>

        {/* Detailed Features Section (ServicesStyle List Rows) */}
        <section className="w-full py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            
            <div className="mb-16 text-left">
              <span className="text-xs font-extrabold text-[#58CC02] uppercase tracking-widest bg-[#58CC02]/8 px-3 py-1.5 rounded-full">
                HR Features
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-950 mt-6 tracking-tight">
                Hiring Pipelines
              </h2>
            </div>

            <div className="flex flex-col border-t border-zinc-200">
              {hrFeatures.map((feat) => (
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
