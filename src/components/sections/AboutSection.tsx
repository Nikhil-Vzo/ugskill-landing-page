'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, ArrowRight, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yStudy = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const ySuccess = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden border-t border-slate-200/80 bg-slate-50/60 px-6 py-20 md:py-24"
      id="about-platform"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.75) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.75) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 82%)',
        }}
      />

      <motion.div
        style={{ y: yStudy }}
        className="absolute left-[-4%] top-[18%] hidden w-[220px] select-none pointer-events-none md:block lg:left-[2%] lg:w-[360px]"
      >
        <img
          src="/assets/about/about_study_robo.png"
          alt="Student and robot studying together"
          className="h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(88,204,2,0.12)]"
        />
      </motion.div>

      <motion.div
        style={{ y: ySuccess }}
        className="absolute bottom-[12%] right-[-4%] hidden w-[220px] select-none pointer-events-none md:block lg:right-[2%] lg:w-[360px]"
      >
        <img
          src="/assets/hero/student_placed_success-removebg-preview.png"
          alt="Student celebrating placement success"
          className="h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(14,165,233,0.12)]"
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
            <Sparkles className="h-3.5 w-3.5 text-[#58CC02]" />
            The Platform
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 text-5xl font-black leading-[0.92] tracking-tighter text-[#0F172A] md:text-7xl lg:text-[6.5rem]"
          >
            <span className="block">One platform for</span>
            <motion.span
              className="block bg-gradient-to-r from-[#0F172A] via-[#58CC02] to-[#0F172A] bg-[length:220%_100%] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            >
              learning, proof, and
            </motion.span>
            <span className="block text-[#58CC02]">placement.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl"
          >
            UGSkill turns the LMS into a connected system where course content, assessments, and career outcomes live in the same experience.
            Students move through structured learning, prove mastery with verified checks, and finish with a profile recruiters can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#58CC02]/20 bg-[#58CC02]/8 px-4 py-3 text-sm font-semibold text-[#0F172A]"
          >
            <Users className="h-4 w-4 text-[#58CC02]" />
            Built for universities, students, and hiring teams
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
