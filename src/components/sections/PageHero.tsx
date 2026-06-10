'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  titleAccent: string;
  description: string;
  gradientFrom: string; // e.g. 'from-emerald-950'
  gradientTo: string;   // e.g. 'to-slate-950'
  accentColor: string;  // e.g. '#58CC02'
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge, badgeIcon, title, titleAccent, description,
  gradientFrom, gradientTo, accentColor, children
}) => {
  return (
    <section className={`relative w-full pt-36 pb-24 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full pointer-events-none blur-[120px] opacity-30"
        style={{ background: accentColor }}
      />
      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="w-full max-w-5xl px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            {badgeIcon}
            {badge}
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-6">
            {title}<br />
            <span style={{ color: accentColor }}>{titleAccent}</span>
          </h1>

          <p className="text-white/65 font-medium text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            {description}
          </p>

          {children}
        </motion.div>
      </div>
    </section>
  );
};
