'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      className="section-overlap-up relative flex min-h-screen w-full items-center overflow-hidden px-4 sm:px-6 py-20 md:py-24"
      id="about-platform"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 10% 40%, rgba(88,204,2,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 90% 70%, rgba(14,165,233,0.08) 0%, transparent 55%),
          linear-gradient(160deg, #0f172a 0%, #111827 45%, #0c1a0d 100%)
        `,
      }}
    >
      {/* Fine grain noise overlay for premium texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 82%)',
        }}
      />

      {/* Left mascot */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        className="absolute left-[2%] top-[22%] hidden w-[130px] select-none pointer-events-none md:block lg:left-[5%] lg:w-[200px]"
      >
        <img
          src="/assets/pointing_robo_green.png"
          alt="Pointing Green Robot Mascot"
          className="mascot-float h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(88,204,2,0.18)]"
        />
      </motion.div>

      {/* Right mascot */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.35 }}
        className="absolute bottom-[12%] right-[-4%] hidden w-[220px] select-none pointer-events-none md:block lg:right-[2%] lg:w-[360px]"
      >
        <img
          src="/assets/student_placed_success-removebg-preview.png"
          alt="Student celebrating placement success"
          className="mascot-float-slow h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(14,165,233,0.15)]"
        />
      </motion.div>

      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70 shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#58CC02]" />
            The Platform
          </motion.div>

          <motion.h2
            className="mt-6 text-5xl font-black leading-[0.92] tracking-tighter text-white md:text-7xl lg:text-[6.5rem]"
          >
            <div className="overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                One platform for
              </motion.span>
            </div>
            <div className="overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="shimmer-text block bg-gradient-to-r from-white via-[#58CC02] to-white bg-[length:220%_100%] bg-clip-text text-transparent"
              >
                learning, proof, and
              </motion.span>
            </div>
            <div className="overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#58CC02]"
              >
                placement.
              </motion.span>
            </div>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mx-auto mt-7 max-w-3xl text-base sm:text-lg leading-relaxed text-white/60 md:text-xl"
          >
            UGSkill turns the LMS into a connected system where course content, assessments, and career outcomes live in the same experience.
            Students move through structured learning, prove mastery with verified checks, and finish with a profile recruiters can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#58CC02]/25 bg-[#58CC02]/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm"
          >
            <Users className="h-4 w-4 text-[#58CC02]" />
            Built for universities, students, and hiring teams
            <ArrowRight className="h-4 w-4 text-white/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
