import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesPage() {
  const articles = [
    {
      title: 'From Daily Streak to Supabase Hire: Aarav Sharma',
      description: 'How Aarav Sharma used his daily coding streaks and verified readiness scores to build a vetted portfolio that got him hired as a fullstack developer.',
      date: 'June 8, 2026',
      category: 'Case Study',
      image: '/assets/student_placed_success-removebg-preview.png',
      readTime: '4 min read'
    },
    {
      title: 'Implementing Proctor Oversight in Campus Examinations',
      description: 'A comprehensive setup guide for placement officers configuring active defocus warnings, integrity scoring metrics, and audit feeds for cohort semesters.',
      date: 'June 5, 2026',
      category: 'Guide',
      image: '/assets/student_testing.png',
      readTime: '6 min read'
    },
    {
      title: 'Cryptographic Skill Hashes: Preventing Resume Fraud',
      description: 'How hiring teams utilize proctor-signed signature hashes to instantly verify candidate assessment scores and identity matches.',
      date: 'June 2, 2026',
      category: 'Insights',
      image: '/assets/pointing_robo_green.png',
      readTime: '3 min read'
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
              Resources & Blog
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-zinc-950 tracking-tighter leading-[0.95] mb-6">
              Campus Sourcing & <br />
              <span className="text-[#0052ff]">Upskilling Insights</span>
            </h1>

            <p className="text-zinc-550 font-medium text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Read customer success stories, college partnership announcements, and verified talent acquisition trends.
            </p>
          </div>
        </section>

        {/* Articles Cards Grid */}
        <section className="w-full py-20 bg-zinc-50/50 border-t border-zinc-150">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((art, idx) => (
                <div 
                  key={idx} 
                  className="rounded-[2.2rem] border border-zinc-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div className="p-8 text-left flex flex-col gap-4">
                    {/* Meta info */}
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                      <span className="text-[#0041cc] bg-[#0052ff]/10 px-2.5 py-0.5 rounded-full">{art.category}</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-zinc-950 mt-2 hover:text-[#0052ff] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    
                    <p className="text-zinc-550 font-semibold text-sm leading-relaxed mt-2">
                      {art.description}
                    </p>
                  </div>

                  {/* Date and read more */}
                  <div className="px-8 pb-8 pt-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/20">
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-bold uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-zinc-300" />
                      {art.date}
                    </span>
                    <Link href="#" className="no-underline text-[#0052ff] hover:text-[#0041cc] inline-flex items-center gap-1 text-sm font-extrabold transition-colors">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
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
