'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { DashboardMockup } from "../ui/DashboardMockup";
import { TactileButton } from "../ui/TactileButton";

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const isSection2InView = useInView(section2Ref, { amount: 0.3 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isSection2InView) {
      // Unmute and try to play
      video.muted = false;
      setIsMuted(false);
      video.play().catch(err => {
        console.log("Autoplay unmuted blocked, falling back to muted", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(playErr => {
            console.error("Muted play failed as well", playErr);
          });
        }
      });
      setIsPlaying(true);
    } else {
      video.pause();
      video.muted = true;
      setIsMuted(true);
      setIsPlaying(false);
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
      {/* Section 1: Hero content (Headline & CTAs) */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-24 md:py-32 bg-white">
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

        <div className="relative z-10 text-center px-6 w-full">
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
        </div>
      </section>

      {/* Section 2: Video companion (Faded Portal) */}
      <motion.section
        ref={section2Ref}
        className="relative min-h-screen w-full flex items-center justify-center py-20 lg:py-24 bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Slightly lower width container with aspect-video */}
        <div className="relative w-[92%] md:w-[85%] max-w-5xl aspect-video overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src="/ug_skill_bot_intro.mp4"
            className="w-full h-full object-cover z-0"
            style={{
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 92%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 92%)'
            }}
            loop
            playsInline
          />

          {/* Cinematic dark overlay to make controls look premium */}
          <div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.2) 90%)',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 92%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 92%)'
            }}
          />

          {/* Custom Playback Controls Overlay */}
          <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3 bg-black/60 hover:bg-black/80 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md transition-all shadow-lg">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-all transform active:scale-95"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-white/80" /> : <Volume2 className="w-5 h-5 text-[#58CC02]" />}
            </button>
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-all transform active:scale-95"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5 text-white/80" /> : <Play className="w-5 h-5 text-[#58CC02]" />}
            </button>
          </div>
        </div>
      </motion.section>


      {/* Section 3: Dashboard mockup */}
      <motion.section
        className="relative min-h-screen w-full flex items-center justify-center py-20 lg:py-24 bg-white overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex items-center justify-center w-full z-20 px-6">
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
        </div>
      </motion.section>
    </div>
  );
};
