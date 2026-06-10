import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { TactileButton } from '@/components/ui/TactileButton';
import { PageHero } from '@/components/sections/PageHero';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free (Students)',
      price: 'Get a Quote',
      period: 'custom pricing',
      description: 'Perfect for students looking to upskill, track streaks, and earn visual badges.',
      features: [
        'Access to Adaptive LMS trails',
        'Daily coding streak tracker',
        'Global batch standings leaderboard',
        'Unlimited sandbox editor practice'
      ],
      ctaText: 'Try Demo Free',
      ctaHref: '/auth/login',
      variant: 'secondary' as const,
      popular: false
    },
    {
      name: 'Campus Growth (Universities)',
      price: 'Get a Quote',
      period: 'custom pricing',
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
      price: 'Get a Quote',
      period: 'custom pricing',
      description: 'Built for corporate recruiters looking to source verified, proctor-tested tech talent.',
      features: [
        'Advanced talent search by coding metrics',
        'Direct campus drive setup board',
        'Proctor report logs audit tool',
        'Direct student matchmaking matches',
        'Cryptographic certificate verification'
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/company/contact',
      variant: 'secondary' as const,
      popular: false
    }
  ];

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-white overflow-x-hidden">
        <Navbar />

        {/* Hero Section */}
        <PageHero
          badge="Pricing Plans"
          badgeIcon={<Sparkles className="w-4 h-4" />}
          title="Transparent Pricing"
          titleAccent="Built for Campus Scale"
          description="All plans require a custom quote tailored to your batch size. Try the interactive demo to explore the platform before getting in touch."
          gradientFrom="from-slate-950"
          gradientTo="to-emerald-950"
          accentColor="#0052ff"
        >
          {/* CTA buttons inside hero */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/login" className="no-underline">
              <button className="px-8 py-3.5 rounded-full bg-[#0052ff] text-white font-bold text-sm uppercase tracking-wide hover:bg-[#0041cc] transition-colors shadow-lg shadow-[#0052ff]/30">
                Try Interactive Demo
              </button>
            </Link>
            <Link href="/company/contact" className="no-underline">
              <button className="px-8 py-3.5 rounded-full border border-white/20 text-white/80 font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-colors backdrop-blur-sm">
                Contact Sales
              </button>
            </Link>
          </div>
        </PageHero>

        {/* Pricing Cards Section */}
        <section className="w-full py-20 bg-zinc-50/50 border-t border-zinc-150">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {plans.map((plan, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-[2.2rem] border p-8 bg-white flex flex-col justify-between relative transition-all duration-300 ${
                    plan.popular 
                      ? 'border-[#0052ff] shadow-[0_20px_40px_-15px_rgba(0, 82, 255,0.12)] lg:scale-105 z-10' 
                      : 'border-zinc-200 hover:shadow-md'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0052ff] text-white text-[10px] font-black uppercase tracking-wider shadow-sm select-none">
                      Most Popular
                    </span>
                  )}

                  <div className="text-left">
                    <h3 className="text-lg font-black text-zinc-900 uppercase tracking-wide mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 my-6">
                      <span className="text-3xl font-black text-zinc-950 tracking-tight">{plan.price}</span>
                      <span className="text-zinc-400 font-bold text-xs uppercase tracking-wider">/ {plan.period}</span>
                    </div>
                    <p className="text-zinc-500 font-semibold text-sm leading-relaxed mb-8">
                      {plan.description}
                    </p>

                    <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-left">
                          <Check className="w-4 h-4 text-[#0052ff] shrink-0 mt-1" />
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

        {/* How Pricing Works Section */}
        <section className="w-full py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-10">
              <h2 className="text-2xl font-black text-zinc-900 mb-3">How Pricing Works</h2>
              <p className="text-zinc-500 font-medium leading-relaxed mb-6">
                UGSkill pricing is tailored to your institution&apos;s batch size, modules needed, and contract length. 
                <strong className="text-zinc-800"> There is no one-size-fits-all plan</strong> — we work with you to build the right package.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#0052ff]/10 flex items-center justify-center">
                    <span className="text-[#0052ff] text-xl">1</span>
                  </div>
                  <h3 className="font-black text-zinc-900 text-sm">Try the Demo</h3>
                  <p className="text-xs text-zinc-500 font-medium">Explore the full platform interactively. No credit card needed.</p>
                  <Link href="/auth/login" className="text-[#0052ff] text-xs font-bold hover:underline">Login to Demo →</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#0052ff]/10 flex items-center justify-center">
                    <span className="text-[#0052ff] text-xl">2</span>
                  </div>
                  <h3 className="font-black text-zinc-900 text-sm">Get a Custom Quote</h3>
                  <p className="text-xs text-zinc-500 font-medium">Tell us your batch size and modules. We&apos;ll build a package for you.</p>
                  <Link href="/company/contact" className="text-[#0052ff] text-xs font-bold hover:underline">Contact Sales →</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#0052ff]/10 flex items-center justify-center">
                    <span className="text-[#0052ff] text-xl">3</span>
                  </div>
                  <h3 className="font-black text-zinc-900 text-sm">Go Live</h3>
                  <p className="text-xs text-zinc-500 font-medium">Onboarding takes under a week. We handle the setup.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FooterCTASection />
      </div>
    </SmoothScroll>
  );
}
