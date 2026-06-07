'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, Volume2, VolumeX, Play, Pause, ArrowUpRight, MousePointerClick } from "lucide-react";
import { DashboardMockup } from "../ui/DashboardMockup";
import { TactileButton } from "../ui/TactileButton";

const rightActionsContainerVariants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
      delay: 0.9,
      staggerChildren: 0.1,
    }
  }
};

const rightActionsChildVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
    }
  }
};

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
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
      <section className="relative min-h-screen w-full overflow-hidden bg-slate-50">
        <motion.video
          src="/assets/hero/hero-section-video.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 pb-44 pt-28 text-center md:pb-36 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-4xl"
          >
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

        {/* Left Box (Scroll Down Indicator) docked to the extreme left bottom corner */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 10,
            delay: 0.8
          }}
          className="absolute left-8 bottom-7 z-20 hidden xl:block w-[18%] max-w-[220px]"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            className="w-full p-4 rounded-3xl border border-white/20 bg-gradient-to-b from-white/15 to-transparent backdrop-blur-[5px] shadow-[0_12px_32px_-12px_rgba(15,23,42,0.12)] select-none pointer-events-none"
          >
            <img
              src="/assets/projects/scroll_down_robo.png"
              alt="Scroll Down Indicator Mascot"
              className="w-full h-auto drop-shadow-[0_12px_24px_rgba(88,204,2,0.15)]"
            />
          </motion.div>
        </motion.div>

        {/* Right Actions (Interactive Demo & Enterprise Setup) docked to the extreme right bottom corner */}
        <motion.div
          variants={rightActionsContainerVariants}
          initial="hidden"
          animate="visible"
          className="absolute right-8 bottom-7 z-20 hidden lg:flex flex-col items-end gap-6"
        >
          <motion.div variants={rightActionsChildVariants}>
            <Link href="/auth/login?sandbox=true" className="no-underline">
              <TactileButton variant="primary" className="px-7 py-4 text-sm font-bold shadow-[0_20px_40px_-15px_rgba(88,204,2,0.3)] flex items-center justify-center gap-2 group">
                Try Interactive Demo
                <MousePointerClick className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110" />
              </TactileButton>
            </Link>
          </motion.div>
          <motion.div variants={rightActionsChildVariants}>
            <Link href="/company/contact" className="no-underline">
              <TactileButton variant="secondary" className="px-7 py-4 text-sm font-bold group bg-white/90 border border-slate-200/80 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1)] flex items-center justify-center gap-2">
                Book Enterprise Setup
                <ArrowUpRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </TactileButton>
            </Link>
          </motion.div>
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
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-90"
          animate={{
            backgroundPosition: ["0px 0px", "20px 20px"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(88, 204, 2, 0.22), transparent 55%),
              radial-gradient(circle at 80% 50%, rgba(88, 204, 2, 0.16), transparent 45%),
              radial-gradient(circle at 50% 80%, rgba(14, 165, 233, 0.08), transparent 35%),
              linear-gradient(to bottom, rgba(248, 250, 252, 0.95), rgba(255, 255, 255, 1))
            `,
          }}
        />

        <div className="relative mx-auto min-h-[760px] w-full max-w-7xl px-6 lg:px-8">
          <div className="relative flex flex-col gap-10 lg:block">
            {/* Video intro */}
            <div className="relative z-20 mx-auto w-full max-w-3xl lg:absolute lg:left-[6%] lg:top-1/2 lg:w-[46%] lg:-translate-y-1/2">
              {/* Balanced green-blue glowing blurred background blob */}
              <div className="absolute -inset-8 z-0 rounded-[2.5rem] bg-gradient-to-tr from-[#58CC02]/32 to-[#0EA5E9]/18 blur-2xl opacity-85 pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, x: -60, rotate: -3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 14,
                  delay: 0.1
                }}
                className="relative z-10 aspect-video overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-[0_35px_90px_-30px_rgba(15,23,42,0.45)]"
              >
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
              </motion.div>
            </div>

            {/* Dashboard mockup as a secondary layered panel */}
            <div className="relative min-h-0 h-auto lg:min-h-[760px] w-full">
              <motion.div
                initial={{ opacity: 0, x: 60, rotateY: 8 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  delay: 0.25
                }}
                style={{
                  transformStyle: "preserve-3d"
                }}
                className="relative z-10 mx-auto w-full max-w-2xl lg:absolute lg:right-[0%] lg:top-1/2 lg:w-[58%] lg:-translate-y-1/2 lg:translate-x-8 scale-[0.92]"
              >
                <motion.div
                  style={{
                    rotateX: hoverRotateX,
                    rotateY: hoverRotateY,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                  }}
                  className="w-full h-auto lg:h-full shadow-2xl rounded-2xl bg-white border border-slate-200 opacity-95 desktop-mask"
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
                    initial={{ opacity: 0, y: -100, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                      delay: 0.7
                    }}
                    className="absolute -left-8 -top-16 md:-left-16 md:-top-24 w-24 md:w-36 z-30 select-none pointer-events-none"
                    style={{ transform: "translateZ(80px)" }}
                  >
                    <motion.img
                      src="/assets/projects/student_mascot_clay.png"
                      alt="Robot Mascot Companion"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                      className="w-full h-auto drop-shadow-[0_12px_24px_rgba(88,204,2,0.18)]"
                    />
                  </motion.div>

                  <DashboardMockup />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
