'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Sparkles, Terminal, ShieldAlert, Award, CheckCircle2, User, Mail, Phone, Building } from 'lucide-react';
import { TactileButton } from '@/components/ui/TactileButton';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function LoginContent() {
  const searchParams = useSearchParams();
  const isSandbox = searchParams.get('sandbox') === 'true';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        institution: formData.institution || 'Demo User',
        type: "interactive_demo",
        submittedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting lead to Firestore: ", err);
      // Fallback: still show success state so UX is smooth
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md bg-white border border-zinc-200 shadow-xl rounded-[2.2rem] p-8 md:p-10 relative z-10 text-center">
        <div className="w-16 h-16 rounded-full bg-[#58CC02]/10 flex items-center justify-center text-[#58CC02] mx-auto mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        {isSandbox ? (
          <>
            <h3 className="text-3xl font-black text-zinc-950 tracking-tight mb-4">
              Demo Access Registered!
            </h3>
            <p className="text-zinc-500 font-semibold text-sm max-w-md leading-relaxed mb-6">
              Thank you, <strong className="text-zinc-800">{formData.name}</strong>. Your sandbox access has been recorded. An onboarding coordinator will call you at <strong className="text-zinc-800">{formData.phone}</strong> shortly to provision your interactive live-coding terminal.
            </p>
            <div className="w-full rounded-2xl bg-zinc-50 border border-zinc-150 p-4 text-left text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-3">
              <Terminal className="w-5 h-5 text-[#58CC02] shrink-0" />
              Recruiter sandbox dashboard instance queued.
            </div>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-black text-zinc-950 tracking-tight mb-4">
              Authenticated!
            </h3>
            <p className="text-zinc-500 font-semibold text-sm max-w-md leading-relaxed mb-6">
              Welcome back to UG Skill. Redirecting you to your active learning modules and proctored dashboards...
            </p>
            <div className="w-full rounded-2xl bg-zinc-50 border border-zinc-150 p-4 text-left text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-3">
              <Award className="w-5 h-5 text-[#58CC02] shrink-0" />
              Loading verified credentials...
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white border border-zinc-200 shadow-xl rounded-[2.2rem] p-8 md:p-10 relative z-10">
      
      {/* Sandbox Badge */}
      {isSandbox && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#58CC02] text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 select-none">
          <Terminal className="w-3.5 h-3.5" />
          Interactive Demo Request
        </div>
      )}

      {/* Heading */}
      <div className="text-center mb-8 mt-2">
        <h2 className="text-3xl font-black text-zinc-950 tracking-tight leading-none mb-3">
          {isSandbox ? 'Try Interactive Demo' : 'Welcome Back'}
        </h2>
        <p className="text-zinc-555 font-semibold text-sm">
          {isSandbox 
            ? 'Access our interactive LMS & Recruiter console sandbox' 
            : 'Access your learning, exam, or placement dashboard'}
        </p>
      </div>

      {isSandbox ? (
        /* Sandbox Interactive Demo Lead Form */
        <form onSubmit={handleDemoSubmit} className="flex flex-col gap-5 text-left">
          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Alex Johnson" 
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-250 focus:border-[#58CC02] focus:ring-2 focus:ring-[#58CC02]/10 focus:outline-none bg-white text-zinc-800 transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@institution.edu" 
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-250 focus:border-[#58CC02] focus:ring-2 focus:ring-[#58CC02]/10 focus:outline-none bg-white text-zinc-800 transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000" 
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-250 focus:border-[#58CC02] focus:ring-2 focus:ring-[#58CC02]/10 focus:outline-none bg-white text-zinc-800 transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Institution / College Name
            </label>
            <input 
              type="text" 
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="Stanford University" 
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-250 focus:border-[#58CC02] focus:ring-2 focus:ring-[#58CC02]/10 focus:outline-none bg-white text-zinc-800 transition-all font-semibold"
            />
          </div>

          <TactileButton 
            variant="primary" 
            disabled={loading}
            className="py-4 text-base mt-4 shadow-[0_12px_24px_rgba(88,204,2,0.2)]"
          >
            {loading ? 'Initializing Sandbox...' : 'Launch Recruiter Demo'}
          </TactileButton>
        </form>
      ) : (
        /* Regular Login Form (Standard/Fake Login) */
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5 text-left">
          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              placeholder="name@university.edu" 
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-250 focus:border-[#58CC02] focus:ring-2 focus:ring-[#58CC02]/10 focus:outline-none bg-white text-zinc-800 transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Password
            </label>
            <input 
              type="password" 
              required
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-zinc-250 focus:border-[#58CC02] focus:ring-2 focus:ring-[#58CC02]/10 focus:outline-none bg-white text-zinc-800 transition-all font-semibold"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" className="rounded accent-[#58CC02] w-3.5 h-3.5" />
              Remember me
            </label>
            <a href="#" className="text-[#58CC02] hover:underline">Forgot?</a>
          </div>

          <TactileButton 
            variant="primary" 
            disabled={loading}
            className="py-4 text-base mt-4 shadow-[0_12px_24px_rgba(88,204,2,0.2)]"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </TactileButton>
        </form>
      )}

      {/* Recruiter Sandbox info panels */}
      {isSandbox && (
        <div className="mt-8 pt-6 border-t border-zinc-150 flex flex-col gap-3.5 text-left">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider leading-none mb-1">Simulated Proctoring</h4>
              <p className="text-[11px] font-semibold text-zinc-400 leading-normal">Behavioral focus alerts, window shifts, and warning flags are simulated inside.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Award className="w-4 h-4 text-[#58CC02] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider leading-none mb-1">Vetted Skill Hashes</h4>
              <p className="text-[11px] font-semibold text-zinc-400 leading-normal">Try matching candidates using proctor averages and verifiable cryptographic hashes.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-zinc-50 overflow-x-hidden">
        <Navbar />

        {/* Center Auth wrapper */}
        <section className="relative flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6">
          <div className="absolute inset-0 pointer-events-none opacity-[0.25]" 
            style={{
              backgroundImage: 'radial-gradient(#D4D4D8 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }}
          />
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#58CC02]/4 blur-[100px] rounded-full pointer-events-none z-0" />
          
          <Suspense fallback={
            <div className="w-full max-w-md bg-white border border-zinc-200 shadow-xl rounded-[2.2rem] p-8 text-center select-none font-bold text-zinc-400">
              Loading Showcase...
            </div>
          }>
            <LoginContent />
          </Suspense>
        </section>

        <FooterCTASection />
      </div>
    </SmoothScroll>
  );
}
