'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, Volume2, VolumeX, Play, Pause, ArrowUpRight, MousePointerClick } from "lucide-react";
import { DashboardMockup } from "../ui/DashboardMockup";
import { TactileButton } from "../ui/TactileButton";

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const [persona, setPersona] = useState<'student' | 'hr' | 'admin'>('student');

  const PERSONA_DATA = {
    student: {
      title: ["From Campus", "To Corporate"],
      subtitle: "Interactive upskilling, verified skill tests, mock interviews, and direct-to-corporate recruitment pipelines.",
      mascot: "/assets/projects/student_mascot_clay.png",
      dashboardTab: "courses" as const,
    },
    hr: {
      title: ["Vetted Skills", "Direct Pipeline"],
      subtitle: "Zero resume inflation. Hire pre-evaluated candidates matching your exact technical requirements with automated proctoring.",
      mascot: "/assets/projects/hr_mascot_clay.png",
      dashboardTab: "interviews" as const,
    },
    admin: {
      title: ["LMS Unified", "Verified Proof"],
      subtitle: "Integrate courses, anti-cheat assessments, and recruiter pipelines into one unified university platform.",
      mascot: "/assets/projects/admin_mascot_clay.png",
      dashboardTab: "leaderboard" as const,
    }
  };

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const isSection2InView = useInView(section2Ref, { amount: 0.3 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncVideoState = () => {
      setIsMuted(video.muted);
      setIsPlaying(!video.paused);
    };

    video.addEventListener("play", syncVideoState);
    video.addEventListener("pause", syncVideoState);
    video.addEventListener("volumechange", syncVideoState);

    return () => {
      video.removeEventListener("play", syncVideoState);
      video.removeEventListener("pause", syncVideoState);
      video.removeEventListener("volumechange", syncVideoState);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isSection2InView) {
      // Unmute and try to play
      video.muted = false;
      video.play().catch(err => {
        console.log("Autoplay unmuted blocked, falling back to muted", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(playErr => {
            console.error("Muted play failed as well", playErr);
          });
        }
      });
    } else {
      video.pause();
      video.muted = true;
    }
  }, [isSection2InView]);

  // Mouse-based 3D Parallax Physics (hover only)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const hoverRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["1.5deg", "-1.5deg"]);
  const hoverRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

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
      {/* Section 1: Video-backed hero */}
      <section className="relative min-h-screen w-full overflow-hidden bg-slate-50">
        <video
          src="/assets/hero/hero-section-video.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.22)_30%,rgba(255,255,255,0.18)_62%,rgba(255,255,255,0.54)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 pb-44 pt-28 text-center md:pb-36 md:pt-32">
          {/* Persona Switcher Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-xl shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)] mb-12 select-none z-30">
            {(['student', 'hr', 'admin'] as const).map((p) => {
              const label = p === 'student' ? 'Student' : p === 'hr' ? 'HR Recruiter' : 'Uni Admin';
              const isActive = persona === p;
              return (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHeroPersona"
                      className="absolute inset-0 bg-[#58CC02] rounded-full -z-10 shadow-[0_4px_12px_rgba(88,204,2,0.25)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-4xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={persona}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7.2rem] 2xl:text-[8rem] font-black leading-[0.92] tracking-tight text-[#0F172A]">
                  {PERSONA_DATA[persona].title[0]}
                  <span className="block text-[#58CC02]">{PERSONA_DATA[persona].title[1]}</span>
                </h1>
                <p className="mt-6 text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed">
                  {PERSONA_DATA[persona].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-9 flex lg:hidden flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/auth/login?sandbox=true" className="w-full sm:w-auto no-underline">
                <TactileButton variant="primary" className="w-full sm:w-auto px-8 py-4 text-base">
                  Try Interactive Demo
                </TactileButton>
              </Link>
              <Link href="/company/contact" className="w-full sm:w-auto no-underline">
                <TactileButton variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base group bg-white/80 backdrop-blur-md">
                  Book Enterprise Setup
                  <ArrowRight className="ml-2 h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                </TactileButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Left Box (LMS Preview) docked to the extreme left bottom corner */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-8 bottom-7 z-20 hidden lg:block w-[30%] max-w-[420px]"
        >
          <div className="group relative w-full overflow-hidden rounded-3xl border border-white/65 bg-white/28 p-3 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.5)] backdrop-blur-2xl">
            <div className="relative aspect-[16/6] overflow-hidden rounded-2xl bg-slate-950">
              <img
                src="/assets/projects/learning_path_clay.png"
                alt="UGSkill course flow preview"
                className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/20 to-transparent" />
              <div className="absolute left-4 top-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">LMS</div>
                <div className="mt-1 text-xl font-black text-white">Course paths</div>
              </div>
              <div className="absolute bottom-4 right-4 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                View flow
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Actions (Interactive Demo & Enterprise Setup) docked to the extreme right bottom corner */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-8 bottom-7 z-20 hidden lg:flex flex-col items-end gap-6"
        >
          <Link href="/auth/login?sandbox=true" className="no-underline">
            <TactileButton variant="primary" className="px-7 py-4 text-sm font-bold shadow-[0_20px_40px_-15px_rgba(88,204,2,0.3)] flex items-center justify-center gap-2 group">
              Try Interactive Demo
              <MousePointerClick className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110" />
            </TactileButton>
          </Link>
          <Link href="/company/contact" className="no-underline">
            <TactileButton variant="secondary" className="px-7 py-4 text-sm font-bold group bg-white/90 border border-slate-200/80 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1)] flex items-center justify-center gap-2">
              Book Enterprise Setup
              <ArrowUpRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </TactileButton>
          </Link>
        </motion.div>
      </section>

      {/* Section 2 + 3: Video intro and dashboard mockup merged */}
      <motion.section
        ref={section2Ref}
        className="relative w-full overflow-hidden bg-white py-20 lg:py-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-90"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 35%, rgba(88, 204, 2, 0.08), transparent 35%),
              radial-gradient(circle at 72% 60%, rgba(14, 165, 233, 0.08), transparent 32%),
              linear-gradient(to bottom, rgba(248, 250, 252, 0.95), rgba(255, 255, 255, 1))
            `,
          }}
        />

        <div className="relative mx-auto min-h-[760px] w-full max-w-7xl px-6 lg:px-8">
          <div className="relative flex flex-col gap-10 lg:block">
            {/* Video intro */}
            <div className="relative z-20 mx-auto w-full max-w-3xl lg:absolute lg:left-[6%] lg:top-1/2 lg:w-[46%] lg:-translate-y-1/2">
              <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-[0_35px_90px_-30px_rgba(15,23,42,0.45)]">
                <video
                  ref={videoRef}
                  src="/assets/hero/ug_bot_removed_bg.mp4"
                  className="w-full h-full object-cover z-0"
                  loop
                  playsInline
                />

                {/* Controls */}
                <div className="absolute bottom-5 right-5 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-2.5 text-white shadow-lg backdrop-blur-md transition-all hover:bg-black/80">
                  <button
                    onClick={toggleMute}
                    className="rounded-full p-2 text-white transition-all hover:bg-white/10 active:scale-95"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-white/80" /> : <Volume2 className="w-5 h-5 text-[#58CC02]" />}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="rounded-full p-2 text-white transition-all hover:bg-white/10 active:scale-95"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 text-white/80" /> : <Play className="w-5 h-5 text-[#58CC02]" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard mockup as a secondary layered panel */}
            <div className="relative min-h-[520px] lg:min-h-[760px]">
              <motion.div
                style={{
                  rotateX: hoverRotateX,
                  rotateY: hoverRotateY,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  maskImage: 'linear-gradient(90deg, transparent 0%, black 14%, black 86%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 14%, black 86%, transparent 100%)'
                }}
                className="relative z-10 mx-auto w-full max-w-2xl lg:absolute lg:right-[0%] lg:top-1/2 lg:w-[58%] lg:-translate-y-1/2 lg:translate-x-8 scale-[0.92] shadow-2xl rounded-2xl bg-white border border-slate-200 opacity-95"
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
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={persona}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      src={PERSONA_DATA[persona].mascot}
                      alt="Robot Mascot Companion"
                      className="w-full h-auto drop-shadow-[0_12px_24px_rgba(88,204,2,0.18)]"
                    />
                  </AnimatePresence>
                </motion.div>

                <DashboardMockup activeTabOverride={PERSONA_DATA[persona].dashboardTab} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
