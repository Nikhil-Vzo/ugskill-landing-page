'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, BookOpen, Award, TrendingUp } from "lucide-react";
import { DashboardMockup } from "../ui/DashboardMockup";
import { TactileButton } from "../ui/TactileButton";


export const HeroSection: React.FC = () => {
  // Container Ref for the entire sticky scroll experience
  const mockupContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container relative to viewport
  const { scrollYProgress } = useScroll({
    target: mockupContainerRef,
    offset: ["start start", "end end"]
  });

  // Mouse-based 3D Parallax Physics Setup (for mockup hover)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Transform mouse position into subtle rotation angles (Max 1.5 degrees)
  const hoverRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["1.5deg", "-1.5deg"]);
  const hoverRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

  // --- Scroll-bound animations for Hero & Mockup ---
  // Hero fades out and moves up as user scrolls
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.93]);
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);
  const heroPointerEvents = useTransform(scrollYProgress, [0, 0.35, 0.36, 1], ["auto", "auto", "none", "none"]);

  // Mockup slides in from the right, fades in, scales up, and rotates into place
  const mockupX = useTransform(scrollYProgress, [0.25, 0.75], ["100vw", "0vw"]);
  const mockupOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const mockupScale = useTransform(scrollYProgress, [0.25, 0.75], [0.85, 1]);
  const mockupRotateY = useTransform(scrollYProgress, [0.25, 0.75], [15, 0]);
  const mockupPointerEvents = useTransform(scrollYProgress, [0, 0.25, 0.26, 1], ["none", "none", "auto", "auto"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full bg-white flex flex-col">
      {/* 1. DUAL-FOLD HERO + MOCKUP CONTAINER (Height 230vh) */}
      <div ref={mockupContainerRef} className="relative h-[230vh] w-full">
        {/* Sticky viewport container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">


          {/* Dynamic background accents (subtle, clean, neutral overlays) */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] bg-radial from-slate-50 to-transparent blur-3xl pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] bg-radial from-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* FOLD 1: HERO CONTENT (Fades out on scroll) */}
          <motion.div
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY,
              pointerEvents: heroPointerEvents
            }}
            className="mx-auto max-w-6xl text-center flex flex-col items-center absolute z-10 w-full px-6"
          >
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >

            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-8xl lg:text-[7.5rem] font-bold text-[#0F172A] tracking-tighter leading-[0.95]"
              >
                From Campus <br /> To Corporate
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-lg md:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed"
            >
              The all-in-one LMS, Exam, and Placement engine that connects student learning directly to corporate readiness.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
            >
              <Link href="/auth/login?sandbox=true" className="w-full sm:w-auto no-underline">
                <TactileButton variant="primary" className="w-full sm:w-auto px-8 py-4 text-base">
                  Try Interactive Demo
                </TactileButton>
              </Link>
              <Link href="/company/contact" className="w-full sm:w-auto no-underline">
                <TactileButton variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base group">
                  Book Enterprise Setup
                  <ArrowRight className="ml-2 w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </TactileButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* FOLD 2: MOCKUP CONTENT (Slides in from the Right) */}
          <motion.div
            style={{
              x: mockupX,
              opacity: mockupOpacity,
              scale: mockupScale,
              rotateY: mockupRotateY,
              transformStyle: "preserve-3d",
              perspective: "2000px",
              pointerEvents: mockupPointerEvents
            }}
            className="w-full max-w-xl md:max-w-3xl lg:max-w-5xl px-6 flex items-center justify-center absolute z-20"
          >
            {/* Inner Mouse-interactive card wrapper */}
            <motion.div
              style={{
                rotateX: hoverRotateX,
                rotateY: hoverRotateY,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "subpixel-antialiased"
              }}
              className="w-full relative shadow-2xl rounded-2xl bg-white border border-slate-200"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Soft specular highlight based on mouse position */}
              <motion.div
                className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
                style={{
                  background: useTransform(
                    () => `radial-gradient(800px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(255,255,255,0.4), transparent 40%)`
                  )
                }}
              />

              {/* 3D Floating Mascot Companion (Pushed forward on the Z-axis for parallax depth) */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  }
                }}
                className="absolute -left-8 -top-16 md:-left-16 md:-top-24 w-24 md:w-36 z-30 select-none pointer-events-none"
                style={{
                  transform: "translateZ(80px)",
                }}
              >
                <img
                  src="/assets/195-removebg-preview.png"
                  alt="Robot Mascot Companion"
                  className="w-full h-auto drop-shadow-[0_12px_24px_rgba(88,204,2,0.18)]"
                />
              </motion.div>

              <DashboardMockup />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* 2. ADDITIONAL FEATURES SECTION (Normal scroll) */}
      <section className="relative min-h-screen w-full bg-slate-900 text-white flex flex-col justify-center py-24 px-6 lg:px-8 border-t border-slate-800 z-30">
        <div className="mx-auto max-w-6xl w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#58CC02] uppercase bg-[#58CC02]/10 px-3 py-1.5 rounded-full">
              Full Feature Suite
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-6 text-white tracking-tight">
              Built for Modern Campus Lifecycles
            </h2>
            <p className="text-slate-400 mt-4 text-lg">
              Everything you need to deliver learning, manage anti-cheat exams, and automate placement pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 hover:border-slate-700 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-[#58CC02] flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Adaptive LMS Engine</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Deliver highly interactive, personalized learning paths with robust tracking, module verification, and study streaks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 hover:border-slate-700 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Proctored Exams</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Deliver cheat-proof examinations with active window tracking, behavioral analysis, and verified credential badging.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 hover:border-slate-700 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Recruiter Matching Engine</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect students directly to top tech companies based on real-time readiness scoring, mock debates, and project profiles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
