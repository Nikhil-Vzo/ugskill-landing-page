'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from 'next/link';
import { ArrowRight } from "lucide-react";

import { DashboardMockup } from "../ui/DashboardMockup";
import { TactileButton } from "../ui/TactileButton";
import { Magnet } from '../ui/Magnet';

export const HeroSection: React.FC = () => {
  // 3D Parallax Physics Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs smooth out the mouse movement so it feels heavy and premium
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Transform mouse position into subtle rotation angles (Max 1.5 degrees to keep text razor sharp)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["1.5deg", "-1.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

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
    // Reset to flat when mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-white flex flex-col items-center justify-start pt-16 md:pt-20 pb-20 px-6 lg:px-8">


      {/* Dynamic background accents (subtle, clean, neutral overlays) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] bg-radial from-slate-50 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="mx-auto max-w-6xl text-center flex flex-col items-center relative z-10 w-full">

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

        {/* 3D Parallax Dashboard Wrapper */}
        <motion.div
          className="relative w-full max-w-5xl mx-auto mt-24 perspective-[2000px]"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "subpixel-antialiased"
            }}
            className="w-full relative shadow-2xl rounded-2xl bg-white border border-slate-200"
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
                src="/195-removebg-preview.png"
                alt="Robot Mascot Companion"
                className="w-full h-auto drop-shadow-[0_12px_24px_rgba(88,204,2,0.18)]"
              />
            </motion.div>

            <DashboardMockup />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
