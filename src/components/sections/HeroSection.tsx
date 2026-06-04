'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { DashboardMockup } from "../ui/DashboardMockup";
import { TactileButton } from "../ui/TactileButton";

export const HeroSection: React.FC = () => {
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeFold, setActiveFold] = useState<1 | 2 | 3>(1);

  const { scrollYProgress } = useScroll();

  // Mouse-based 3D Parallax Physics (hover only)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const hoverRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["1.5deg", "-1.5deg"]);
  const hoverRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

  // --- Scroll-bound animations (vertical only) ---
  // FOLD 1: Hero fades + shrinks out
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0], { clamp: true });
  const heroScale   = useTransform(scrollYProgress, [0, 0.22], [1, 0.93], { clamp: true });
  const heroPointerEvents = useTransform(scrollYProgress, [0, 0.22, 0.23, 1], ["auto", "auto", "none", "none"]);

  // FOLD 2 [NEW]: Intro Video Section fades + rises in and out
  const videoOpacity = useTransform(scrollYProgress, [0.18, 0.28, 0.58, 0.68], [0, 1, 1, 0], { clamp: true });
  const videoY       = useTransform(scrollYProgress, [0.18, 0.28, 0.58, 0.68], [80, 0, 0, -80], { clamp: true });
  const videoScale   = useTransform(scrollYProgress, [0.18, 0.28, 0.58, 0.68], [0.92, 1, 1, 0.95], { clamp: true });
  const videoPointerEvents = useTransform(scrollYProgress, [0, 0.18, 0.19, 0.67, 0.68, 1], ["none", "none", "auto", "auto", "none", "none"]);

  // FOLD 3: Mockup fades + rises up from below
  const mockupOpacity = useTransform(scrollYProgress, [0.64, 0.74], [0, 1], { clamp: true });
  const mockupY       = useTransform(scrollYProgress, [0.64, 0.78], [60, 0], { clamp: true });
  const mockupScale   = useTransform(scrollYProgress, [0.64, 0.78], [0.92, 1], { clamp: true });
  const mockupPointerEvents = useTransform(scrollYProgress, [0, 0.64, 0.65, 1], ["none", "none", "auto", "auto"]);

  // Background color transitions from white → slate-50 → slate-100
  const stickyBgColor = useTransform(scrollYProgress, [0.18, 0.28, 0.58, 0.68], ["#ffffff", "#f8fafc", "#f8fafc", "#f1f5f9"], { clamp: true });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      (window as any).scrollYProgressVal = latest;
      if (latest < 0.22) {
        setActiveFold(1);
      } else if (latest >= 0.22 && latest < 0.64) {
        setActiveFold(2);
      } else {
        setActiveFold(3);
      }
    });
  }, [scrollYProgress]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full bg-white flex flex-col">
      {/* TRIPLE-FOLD CONTAINER — 320vh gives scroll room for all folds */}
      <div ref={mockupContainerRef} className="relative h-[320vh] w-full bg-white">

        {/* Sticky viewport */}
        <motion.div
          style={{ backgroundColor: stickyBgColor }}
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        >

          {/* Blueprint Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-90"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(226, 232, 240, 0.75) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(226, 232, 240, 0.75) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at center, black, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 85%)'
            }}
          />

          {/* Ambient glow accents */}
          <div
            className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[100px] pointer-events-none z-0"
            style={{ background: 'radial-gradient(circle, rgba(88,204,2,0.12) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[120px] pointer-events-none z-0"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full blur-[140px] pointer-events-none -z-10"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
          />

          {/* FOLD 1 — Hero content */}
          <motion.div
            style={{
              opacity: activeFold === 1 ? heroOpacity : 0,
              scale: heroScale,
              pointerEvents: activeFold === 1 ? "auto" : "none"
            }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6"
          >
            <div className="mx-auto max-w-6xl flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-50 border border-slate-200/85 text-slate-600 text-xs font-semibold tracking-widest uppercase mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#58CC02] animate-pulse" />
                  The Unified Campus Ecosystem
                </span>
              </motion.div>

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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 text-lg md:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed"
              >
                The all-in-one LMS, Exam, and Placement engine that connects student learning directly to corporate readiness.
              </motion.p>

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
            </div>
          </motion.div>

          {/* FOLD 2 [NEW] — Intro Video via Mascot Bot & Happy Blob */}
          <motion.div
            style={{
              opacity: activeFold === 2 ? videoOpacity : 0,
              y: videoY,
              scale: videoScale,
              pointerEvents: activeFold === 2 ? "auto" : "none"
            }}
            className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6 max-w-7xl mx-auto z-20"
          >
            {/* Left Column: Mascot Bot + Speech Bubble */}
            <div className="flex flex-col items-center gap-4 max-w-[240px] order-1 lg:order-none">
              {/* Speech Bubble */}
              <div className="relative bg-white/95 border border-slate-200 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.08)] rounded-2xl p-4 text-xs text-slate-600 font-medium leading-relaxed max-w-[220px]">
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r border-b border-slate-200 rotate-45" />
                <span className="text-[#58CC02] font-semibold block mb-1">UGSkill Companion:</span>
                "Welcome! 🚀 I'm your learning guide. We connect your campus journey directly to career readiness. Watch this quick video to see how it works!"
              </div>

              {/* Bot Mascot */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-24 md:w-28 drop-shadow-[0_8px_16px_rgba(88,204,2,0.12)] select-none"
              >
                <img
                  src="/195-removebg-preview.png"
                  alt="UGSkill Robot Mascot"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>

            {/* Middle Column: Video inside Browser Frame */}
            <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-[700px] rounded-xl bg-slate-900 border border-slate-200 shadow-2xl overflow-hidden flex flex-col order-2 lg:order-none">
              {/* Browser Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" /> {/* Red */}
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" /> {/* Yellow */}
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" /> {/* Green */}
                </div>
                <div className="flex-1 max-w-[260px] mx-auto bg-slate-100 border border-slate-200 rounded-md py-1 px-3 text-center text-[10px] text-slate-500 font-mono tracking-wide truncate">
                  ugskill.com/intro
                </div>
                <div className="w-12" />
              </div>

              {/* Video Content */}
              <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/ug_skill_bot_intro.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                />
                
                {/* Custom Playback Controls Overlay */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 z-30">
                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-slate-900/85 hover:bg-slate-900 border border-slate-700/50 text-white transition-all transform active:scale-95"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#58CC02]" />}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-slate-900/85 hover:bg-slate-900 border border-slate-700/50 text-white transition-all transform active:scale-95"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#58CC02]" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Happy Blob Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="hidden lg:flex flex-col gap-3 w-[220px] bg-white/95 border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.08)] rounded-2xl p-3 order-3 lg:order-none transition-all duration-300"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50 flex items-center justify-center">
                <div className="w-[85%] h-[85%] rounded-full overflow-hidden border border-slate-200/60 shadow-md">
                  <img
                    src="/happy_blob.jpg"
                    alt="Happy Blob Companion"
                    className="w-full h-full object-cover scale-[1.48]"
                  />
                </div>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 text-[9px] text-white font-bold backdrop-blur-sm tracking-wider uppercase border border-slate-800">
                  MASCOT
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  Happy Blob
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </h4>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">
                  Your AI study companion! Stays by your side to help you learn, track stats, and stay happy 24/7.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* FOLD 3 — Dashboard mockup rises up */}
          <motion.div
            style={{
              opacity: activeFold === 3 ? mockupOpacity : 0,
              y: mockupY,
              scale: mockupScale,
              pointerEvents: activeFold === 3 ? "auto" : "none"
            }}
            className="absolute inset-0 flex items-center justify-center z-20 px-6 pt-20 pb-8"
          >
            {/* Mouse-interactive 3D card */}
            <motion.div
              style={{
                rotateX: hoverRotateX,
                rotateY: hoverRotateY,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-[860px] relative shadow-2xl rounded-2xl bg-white border border-slate-200"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Specular light reflection */}
              <motion.div
                className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
                style={{
                  background: useTransform(
                    () => `radial-gradient(800px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(255,255,255,0.4), transparent 40%)`
                  )
                }}
              />

              {/* Floating mascot */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                className="absolute -left-8 -top-16 md:-left-16 md:-top-24 w-24 md:w-36 z-30 select-none pointer-events-none"
                style={{ transform: "translateZ(80px)" }}
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

        </motion.div>
      </div>
    </div>
  );
};
