import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 w-full">
          <HeroSection />
        </main>
      </div>
    </SmoothScroll>
  );
}
