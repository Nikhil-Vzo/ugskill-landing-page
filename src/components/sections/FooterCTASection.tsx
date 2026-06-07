'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Flame, 
  Award,
  Globe
} from 'lucide-react';
import { TactileButton } from '../ui/TactileButton';

// Magnet Button Helper Component for premium interactive feel
const MagnetWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 14 });
  const springY = useSpring(y, { stiffness: 120, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left - width / 2;
    const clientY = e.clientY - rect.top - height / 2;
    // Shift slightly in direction of cursor
    x.set(clientX * 0.35);
    y.set(clientY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export const FooterCTASection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { name: 'Interactive LMS', href: '#' },
      { name: 'Proctored Exams', href: '#' },
      { name: 'Interview Simulator', href: '#' },
      { name: 'Placement Engine', href: '#' },
    ],
    Solutions: [
      { name: 'For Universities', href: '#' },
      { name: 'For Recruiters', href: '#' },
      { name: 'API Integrations', href: '#' },
      { name: 'Enterprise Setup', href: '#' },
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Press & Media', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact Sales', href: '#' },
    ],
    Resources: [
      { name: 'Case Studies', href: '#' },
      { name: 'Technical Docs', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <section className="relative w-full bg-slate-50/50 py-24 lg:py-32 flex flex-col items-center overflow-hidden border-t border-slate-200/85">
      {/* Subtle Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.35] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#E2E8F0 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col items-center">
        
        {/* ================= PINTEREST STYLE CTA BOARD ================= */}
        <div className="w-full relative min-h-[560px] lg:min-h-[480px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-28">
          
          {/* Left Wing: Asymmetrical Widgets (Interactive Code Sandbox Mock) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-center items-start">
            
            {/* Widget 1: Mini Code Terminal (Pinterest floating style) */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="w-full max-w-[320px] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] flex flex-col gap-3"
            >
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Terminal className="w-4 h-4 text-[#58CC02]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verification Engine</span>
              </div>
              <div className="font-mono text-[11px] leading-relaxed text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/40">
                <p className="text-slate-400">{"// verifying student..."}</p>
                <p><span className="text-indigo-500">const</span> proof = <span className="text-[#58CC02]">checkSkills</span>();</p>
                <p className="text-slate-400 mt-1">{"&gt;"} Status: <span className="text-[#58CC02] font-bold">100% Legit ✅</span></p>
              </div>
            </motion.div>

            {/* Widget 2: Recruiter Signals */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.25 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="w-full max-w-[320px] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] flex flex-col gap-2.5"
            >
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Active Recruitment</span>
              <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs font-bold text-slate-700">
                <span className="truncate">Stripe matches</span>
                <span className="text-[#58CC02] bg-[#58CC02]/8 px-2 py-0.5 rounded-full text-[10px]">9 Qualified</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="truncate">Supabase hires</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full text-[10px]">4 Verified</span>
              </div>
            </motion.div>

          </div>

          {/* Center Column: Text CTA and Buttons */}
          <div className="lg:col-span-4 flex flex-col items-center text-center justify-center py-8 z-20">
            {/* Ambient behind-text glow */}
            <div className="absolute w-72 h-72 bg-[#58CC02]/[0.03] blur-3xl rounded-full -z-10" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#58CC02]/8 border border-[#58CC02]/15 text-[#46A302] text-xs font-bold tracking-wider uppercase mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Get Started
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tighter leading-none mb-6">
              Level up your campus talent.
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mb-9">
              Bridge the gap between syllabus-aligned learning pathways and proctor-verified recruiter pipelines.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <MagnetWrapper>
                <Link href="/auth/login?sandbox=true" className="no-underline">
                  <TactileButton variant="primary" className="px-8 py-4 text-base shadow-[0_20px_40px_-15px_rgba(88,204,2,0.25)]">
                    Try Interactive Demo
                  </TactileButton>
                </Link>
              </MagnetWrapper>
              
              <Link href="/company/contact" className="no-underline">
                <TactileButton variant="secondary" className="px-8 py-4 text-base group bg-white border border-slate-200/80">
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                </TactileButton>
              </Link>
            </div>
          </div>

          {/* Right Wing: Staggered Gamification Badges */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-center items-end">
            
            {/* Widget 3: Student Badge Box */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="w-full max-w-[320px] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] flex flex-col gap-3"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Global Ranks</span>
              <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-200/30 rounded-xl p-2.5">
                <div className="w-9 h-9 rounded-full bg-[#58CC02]/10 flex items-center justify-center text-[#58CC02]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-900 leading-none">Aarav Sharma</h5>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Rank 1st • 92,400 XP</p>
                </div>
              </div>
            </motion.div>

            {/* Widget 4: Active Streak Tracker */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.35 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="w-full max-w-[320px] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] flex items-center gap-3.5"
            >
              {/* Spinning active fire streak */}
              <motion.div 
                className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-sm"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Flame className="w-5 h-5 fill-orange-500/10" />
              </motion.div>
              <div>
                <h5 className="text-xs font-black text-slate-900 leading-none">Daily Coding Streaks</h5>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">🔥 124 students active today</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ================= PREMIUM FOOTER ================= */}
        <footer className="w-full border-t border-slate-200/80 pt-16 flex flex-col gap-16">
          
          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
            
            {/* Column 0: Branding */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
              <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
                <div className="w-9 h-9 rounded-xl bg-[#0f172a] flex items-center justify-center text-white font-black text-base shadow-sm">
                  UG
                </div>
                <span className="text-base font-black text-[#0F172A] tracking-tight">UGSkill</span>
              </Link>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px]">
                Connecting student learning directly to enterprise recruitment pathways.
              </p>
            </div>

            {/* Columns 1-4: Map footerLinks */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex flex-col gap-4">
                <span className="text-[11px] font-black text-[#0F172A] uppercase tracking-widest">
                  {title}
                </span>
                <ul className="flex flex-col gap-3 p-0 m-0 list-none">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-xs font-semibold text-slate-500 hover:text-[#58CC02] hover:translate-x-1 transition-all duration-200 inline-block no-underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* Bottom copyright & socials bar */}
          <div className="border-t border-slate-200/40 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <span className="text-xs text-slate-400 font-medium">
              &copy; {currentYear} UGSkill. All rights reserved. Built with trust.
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Globe className="w-4 h-4" />, href: '#' },
                { 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  ), 
                  href: '#' 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ), 
                  href: '#' 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  ), 
                  href: '#' 
                }
              ].map((social, idx) => (
                <Link 
                  key={idx}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-[#58CC02] hover:border-[#58CC02]/30 hover:shadow-sm transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

          </div>

        </footer>

      </div>
    </section>
  );
};
