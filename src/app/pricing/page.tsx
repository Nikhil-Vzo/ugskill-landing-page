import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { TactileButton } from '@/components/ui/TactileButton';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free (Students)',
      price: '$0',
      period: 'free forever',
      description: 'Perfect for students looking to upskill, track streaks, and earn visual badges.',
      features: [
        'Access to Adaptive LMS trails',
        'Daily coding streak tracker',
        'Global batch standings leaderboard',
        'Unlimited sandbox editor practice'
      ],
      ctaText: 'Get a Quote',
      ctaHref: '/auth/login',
      variant: 'secondary' as const,
      popular: false
    },
    {
      name: 'Campus Growth (Universities)',
      price: '$199',
      period: 'per month, billed annually',
      description: 'Ideal for colleges looking to run proctored exams and direct placement outcomes.',
      features: [
        'AI proctoring examination console',
        'Proctor warning logs & timeline audits',
        'Vetted batch placement diagnostics',
        'Cryptographic credential signatures',
        'Dedicated onboarding support'
      ],
      ctaText: 'Get a Quote',
      ctaHref: '/auth/login',
      variant: 'primary' as const,
      popular: true
    },
    {
      name: 'Talent Pipeline (Recruiters)',
      price: '$499',
      period: 'per month',
      description: 'Built for corporate recruiters looking to source verified, proctor-tested tech talent.',
      features: [
        'Advanced talent search by coding metrics',
        'Direct campus drive setup board',
        'Proctor report logs audit tool',
        'Direct student matchmaking matches',
        'Cryptographic certificate verification'
      ],
      ctaText: 'Get a Quote',
      ctaHref: '/auth/login',
      variant: 'secondary' as const,
      popular: false
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
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] bg-[#58CC02]/5 blur-[90px] rounded-full pointer-events-none -z-10" />

          <div className="w-full max-w-5xl px-6 flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#58CC02]/10 border border-[#58CC02]/20 text-[#46A302] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" />
              Pricing Plans
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-zinc-950 tracking-tighter leading-[0.95] mb-6">
              Flexible Plans For <br />
              <span className="text-[#58CC02]">Campus Ecosystems</span>
            </h1>

            <p className="text-zinc-550 font-medium text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Choose the level of proctor integrity and pipeline automation that matches your student batch size or hiring needs.
            </p>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="w-full py-20 bg-zinc-50/50 border-t border-zinc-150">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {plans.map((plan, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-[2.2rem] border p-8 bg-white flex flex-col justify-between relative transition-all duration-300 ${
                    plan.popular 
                      ? 'border-[#58CC02] shadow-[0_20px_40px_-15px_rgba(88,204,2,0.12)] lg:scale-105 z-10' 
                      : 'border-zinc-200 hover:shadow-md'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#58CC02] text-white text-[10px] font-black uppercase tracking-wider shadow-sm select-none">
                      Most Popular
                    </span>
                  )}

                  <div className="text-left">
                    <h3 className="text-lg font-black text-zinc-900 uppercase tracking-wide mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 my-6">
                      <span className="text-5xl font-black text-zinc-950 tracking-tight">{plan.price}</span>
                      <span className="text-zinc-400 font-bold text-xs uppercase tracking-wider">/ {plan.period}</span>
                    </div>
                    <p className="text-zinc-500 font-semibold text-sm leading-relaxed mb-8">
                      {plan.description}
                    </p>

                    <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-left">
                          <Check className="w-4 h-4 text-[#58CC02] shrink-0 mt-1" />
                          <span className="text-sm font-semibold text-zinc-700 leading-normal">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link href={plan.ctaHref} className="no-underline w-full block">
                      {plan.variant === 'primary' ? (
                        <TactileButton variant="primary" className="w-full py-4 text-base">
                          {plan.ctaText}
                        </TactileButton>
                      ) : (
                        <button className="w-full group relative inline-flex items-center justify-center rounded-xl font-bold transition-all duration-75 outline-none focus:outline-none cursor-pointer select-none px-8 py-4 text-base bg-white text-zinc-700 shadow-[0_4px_0_#E2E8F0] border border-zinc-200 hover:bg-zinc-50 active:shadow-none active:translate-y-[4px]">
                          {plan.ctaText}
                        </button>
                      )}
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
