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
      { name: 'About Platform', href: '#about-platform' },
      { name: 'Unified Features', href: '#solutions' },
      { name: 'Vetted Projects', href: '#projects-stack' },
    ],
    Verification: [
      { name: 'Placement Engine', href: '#placement-funnel' },
      { name: 'Interactive Sandbox', href: '/auth/login?sandbox=true' },
      { name: 'Real-time Standings', href: '#placement-funnel' },
    ],
    Access: [
      { name: 'Try Demo', href: '/auth/login?sandbox=true' },
      { name: 'Client Login', href: '/auth/login' },
      { name: 'Contact Sales', href: '/company/contact' },
    ],
  };

  return (
    <section className="relative w-full bg-white py-24 lg:py-32 flex flex-col items-center overflow-hidden border-t border-zinc-200/85">
      {/* Background Volumetric Glowing Orbs (Soft green) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#58CC02]/5 to-transparent blur-3xl rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-bl from-[#58CC02]/3 to-transparent blur-3xl rounded-full pointer-events-none z-0" />

      {/* Grid Overlay with Radial Fade Mask */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#D4D4D8 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 flex flex-col items-center">
        
        {/* ================= PREMIUM BENTO LIGHT CARD ================= */}
        <div className="w-full rounded-[2.5rem] bg-zinc-50 border border-zinc-200/80 p-8 md:p-12 lg:p-16 overflow-hidden relative shadow-[0_20px_50px_-12px_rgba(0,0,0,0.03)] mb-28">
          {/* Subtle Green Overlay inside card */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[2.5rem]">
            <motion.div 
              className="absolute -top-40 -left-40 w-96 h-96 bg-[#58CC02]/8 blur-[100px] rounded-full"
              animate={{ 
                scale: [1, 1.15, 1],
                x: [0, 20, 0],
                y: [0, -20, 0]
              }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            />
            {/* Subtle Grid Overlay inside card */}
            <div 
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Wing: Asymmetrical Widgets */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-center items-start z-10">
              
              {/* Widget 1: Mini Code Terminal */}
              <motion.div
                initial={{ opacity: 0, x: -40, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
                whileHover={{ rotate: 0, scale: 1.03, borderColor: "rgba(88,204,2,0.4)" }}
                className="w-full max-w-[300px] rounded-3xl border border-zinc-200 bg-white p-4.5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col gap-3 transition-all duration-300"
              >
                <div className="flex items-center gap-1.5 border-b border-zinc-100 pb-2">
                  <Terminal className="w-4 h-4 text-[#58CC02]" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Verification Engine</span>
                </div>
                <div className="font-mono text-[11px] leading-relaxed text-zinc-800 bg-zinc-50 p-2.5 rounded-lg border border-zinc-150">
                  <p className="text-zinc-400">{"// verifying student..."}</p>
                  <p><span className="text-zinc-500">const</span> proof = <span className="text-[#58CC02] font-semibold">checkSkills</span>();</p>
                  <p className="text-zinc-400 mt-1">{"&gt;"} Status: <span className="text-[#58CC02] font-bold">100% Legit ✅</span></p>
                </div>
              </motion.div>

              {/* Widget 2: Recruiter Signals */}
              <motion.div
                initial={{ opacity: 0, x: -40, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.25 }}
                whileHover={{ rotate: 0, scale: 1.03, borderColor: "rgba(88,204,2,0.4)" }}
                className="w-full max-w-[300px] rounded-3xl border border-zinc-200 bg-white p-4.5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col gap-2.5 transition-all duration-300"
              >
                <span className="text-[9px] font-bold text-zinc-450 uppercase tracking-widest leading-none">Active Recruitment</span>
                <div className="flex items-center justify-between border-t border-zinc-100 pt-2.5 text-xs font-bold text-zinc-800">
                  <span className="truncate">Stripe matches</span>
                  <span className="text-[#58CC02] bg-[#58CC02]/10 px-2 py-0.5 rounded-full text-[10px]">9 Qualified</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-zinc-800">
                  <span className="truncate">Supabase hires</span>
                  <span className="text-[#58CC02] bg-[#58CC02]/10 px-2 py-0.5 rounded-full text-[10px]">4 Verified</span>
                </div>
              </motion.div>

            </div>

            {/* Center Column: Text CTA and Buttons */}
            <div className="lg:col-span-4 flex flex-col items-center text-center justify-center py-4 z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#58CC02]/10 border border-[#58CC02]/20 text-[#46A302] text-xs font-bold tracking-wider uppercase mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Get Started
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter leading-none mb-6">
                Level up your campus talent.
              </h2>
              <p className="text-zinc-550 font-medium leading-relaxed max-w-sm mb-9">
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
                  <button className="group relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-75 outline-none focus:outline-none cursor-pointer select-none px-8 py-4 text-base bg-white text-zinc-700 shadow-[0_4px_0_#E2E8F0] border border-zinc-200 hover:bg-zinc-50 active:shadow-none active:translate-y-[4px]">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Wing: Staggered Gamification Badges */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-center items-end z-10">
              
              {/* Widget 3: Student Badge Box */}
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                whileHover={{ rotate: 0, scale: 1.03, borderColor: "rgba(88,204,2,0.4)" }}
                className="w-full max-w-[300px] rounded-3xl border border-zinc-200 bg-white p-4.5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col gap-3 transition-all duration-300"
              >
                <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest leading-none">Global Ranks</span>
                <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-150 rounded-xl p-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#58CC02]/10 flex items-center justify-center text-[#58CC02]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-black text-zinc-950 leading-none">Aarav Sharma</h5>
                    <p className="text-[10px] text-zinc-500 font-bold mt-1.5">Rank 1st • 92,400 XP</p>
                  </div>
                </div>
              </motion.div>

              {/* Widget 4: Active Streak Tracker */}
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.35 }}
                whileHover={{ rotate: 0, scale: 1.03, borderColor: "rgba(88,204,2,0.4)" }}
                className="w-full max-w-[300px] rounded-3xl border border-zinc-200 bg-white p-4.5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center gap-3.5 transition-all duration-300"
              >
                <motion.div 
                  className="w-9 h-9 rounded-xl bg-[#58CC02]/10 flex items-center justify-center text-[#58CC02] shadow-sm shrink-0"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Flame className="w-5 h-5 fill-[#58CC02]/10" />
                </motion.div>
                <div className="text-left">
                  <h5 className="text-xs font-black text-zinc-950 leading-none">Daily Coding Streaks</h5>
                  <p className="text-[10px] text-[#58CC02] font-bold mt-1.5">🔥 124 students active today</p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>

        {/* ================= PREMIUM FOOTER ================= */}
        <footer className="w-full border-t border-zinc-200/80 pt-16 flex flex-col gap-16">
          
          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            
            {/* Column 0: Branding & Newsletter */}
            <div className="col-span-2 flex flex-col gap-6 text-left">
              <Link href="/" className="inline-flex items-center gap-2.5 no-underline group/logo">
                <motion.div 
                  className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white font-black text-base shadow-sm"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  UG
                </motion.div>
                <span className="text-base font-black text-black tracking-tight hover:text-[#58CC02] transition-colors duration-300">UGSkill</span>
              </Link>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-[260px]">
                Connecting student learning directly to enterprise recruitment pathways.
              </p>
              
              {/* Newsletter block */}
              <div className="flex flex-col gap-2.5 mt-2">
                <span className="text-[10px] font-black text-black uppercase tracking-wider">Stay Updated</span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-[280px]">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-zinc-200 focus:border-[#58CC02] focus:ring-1 focus:ring-[#58CC02]/20 focus:outline-none bg-white text-zinc-800 transition-all"
                  />
                  <button 
                    type="submit" 
                    className="px-3.5 py-2 text-xs font-bold text-white bg-[#58CC02] hover:bg-[#46A302] rounded-lg transition-colors shadow-sm select-none cursor-pointer active:scale-95 duration-150"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Columns 1-4: Map footerLinks */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex flex-col gap-4 text-left">
                <span className="text-[11px] font-black text-black uppercase tracking-widest">
                  {title}
                </span>
                <ul className="flex flex-col gap-3 p-0 m-0 list-none">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="group text-xs font-semibold text-zinc-500 hover:text-[#46A302] transition-colors duration-200 inline-flex items-center gap-1.5 no-underline"
                      >
                        {/* Sliding green dot indicator */}
                        <span className="w-1.5 h-1.5 rounded-full bg-[#58CC02] scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 origin-left shrink-0" />
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* Bottom copyright & socials bar */}
          <div className="border-t border-zinc-200/40 py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            
            {/* Copyright & Live Status */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-xs text-zinc-400 font-medium">
                &copy; {currentYear} UGSkill. All rights reserved.
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#58CC02]/5 border border-[#58CC02]/10 text-[#46A302] text-[10px] font-bold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58CC02]/50 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#58CC02]"></span>
                </span>
                All Systems Operational
              </div>
            </div>

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
                <motion.a 
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-[#58CC02] hover:border-[#58CC02] hover:shadow-md transition-all duration-300 cursor-pointer select-none"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
 
          </div>

        </footer>

      </div>
    </section>
  );
};
