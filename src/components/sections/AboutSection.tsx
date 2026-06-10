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
          radial-gradient(ellipse 80% 60% at 15% 40%, rgba(0, 82, 255,0.09) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 85% 70%, rgba(14,165,233,0.06) 0%, transparent 55%),
          linear-gradient(160deg, #eff6ff 0%, #ffffff 45%, #f8faff 100%)
        `,
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
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
          className="mascot-float h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(0, 82, 255,0.14)]"
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
          className="mascot-float-slow h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(14,165,233,0.10)]"
        />
      </motion.div>

      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#0052ff]" />
            The Platform
          </motion.div>

          <motion.h2
            className="mt-6 text-5xl font-black leading-[0.92] tracking-tighter text-[#0F172A] md:text-7xl lg:text-[6.5rem]"
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
                className="shimmer-text block bg-gradient-to-r from-[#0F172A] via-[#0052ff] to-[#0F172A] bg-[length:220%_100%] bg-clip-text text-transparent"
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
                className="block text-[#0052ff]"
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
            className="mx-auto mt-7 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600 md:text-xl"
          >
            UGSkill turns the LMS into a connected system where course content, assessments, and career outcomes live in the same experience.
            Students move through structured learning, prove mastery with verified checks, and finish with a profile recruiters can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#0052ff]/20 bg-[#0052ff]/8 px-4 py-3 text-sm font-semibold text-[#0F172A]"
          >
            <Users className="h-4 w-4 text-[#0052ff]" />
            Built for universities, students, and hiring teams
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
