import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Sparkles, ArrowRight, Shield, Award, Users } from 'lucide-react';
import Link from 'next/link';
import { TactileButton } from '@/components/ui/TactileButton';

export default function SolutionsUniversitiesPage() {
  const bentoCards = [
    {
      title: 'Vetted Portfolios',
      description: 'Students complete assessments and projects in sandboxes, generating verified portfolios that recruiters trust.',
      icon: Award
    },
    {
      title: 'Cohort Diagnostics',
      description: 'Placement officers track batch readiness averages, identifying top performers and areas needing upskilling support.',
      icon: Users
    },
    {
      title: 'Proctored Oversight',
      description: 'Ensure absolute examination integrity for all campus tests using our proctor control panel warnings and logs.',
      icon: Shield
    }
  ];

  const universityFeatures = [
    {
      index: '01',
      title: 'Curriculum-Aligned Trails',
      description: 'Transform traditional syllabus plans into active coding milestones with daily streak targets and automated compilers.'
    },
    {
      index: '02',
      title: 'Cryptographic Credentialing',
      description: 'Issue proctor-verified course credentials signed with cryptographic hashes, preventing fake resumes.'
    },
    {
      index: '03',
      title: 'Direct Hiring Pipeline',
      description: ' Hires are matched directly using verified dashboard readiness scores, reducing time-to-offer for students.'
    }
  ];

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-white overflow-x-hidden">
        <Navbar />

        {/* Hero Section */}
        <section className="relative w-full pt-36 pb-20 flex flex-col items-center justify-center bg-white">
          <div className="absolute inset-0 pointer-events-none opacity-40" 
            style={{
              backgroundImage: 'radial-gradient(#D4D4D8 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }}
          />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] bg-[#0052ff]/5 blur-[90px] rounded-full pointer-events-none -z-10" />

          <div className="w-full max-w-5xl px-6 flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0052ff]/10 border border-[#0052ff]/20 text-[#0041cc] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" />
              University Solutions
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-zinc-950 tracking-tighter leading-[0.95] mb-6">
              Empower Your Campus <br />
              <span className="text-[#0052ff]">Placement Lifecycle</span>
            </h1>

            <p className="text-zinc-550 font-medium text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Connect campus learning directly to corporate hiring pipelines. Scale up skill readiness, verify assessment records, and drive higher placement ratios.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <Link href="/auth/login?sandbox=true" className="no-underline">
                <TactileButton variant="primary" className="px-8 py-4 text-base">
                  Request Campus Demo
                </TactileButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="w-full py-20 bg-zinc-50/50 border-t border-b border-zinc-150">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
                Vetted Campus Operations
              </h2>
              <p className="text-zinc-500 font-semibold text-sm md:text-base mt-3">
                Everything you need to deliver learning, proctor assessments, and direct candidate pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bentoCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div 
                    key={idx} 
                    className="rounded-3xl border border-zinc-200 bg-white p-8 hover:shadow-md transition-shadow duration-300 flex flex-col text-left justify-start"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-[#0052ff]/10 text-[#0052ff] flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-950 mb-3">{card.title}</h3>
                    <p className="text-zinc-500 font-semibold text-sm leading-relaxed">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Features Section (ServicesStyle List Rows) */}
        <section className="w-full py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            
            <div className="mb-16 text-left">
              <span className="text-xs font-extrabold text-[#0052ff] uppercase tracking-widest bg-[#0052ff]/8 px-3 py-1.5 rounded-full">
                Features overview
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-950 mt-6 tracking-tight">
                Institutional Control
              </h2>
            </div>

            <div className="flex flex-col border-t border-zinc-200">
              {universityFeatures.map((feat) => (
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
