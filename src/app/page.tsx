import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { PlacementPulseSection } from '@/components/sections/PlacementPulseSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { FooterCTASection } from '@/components/sections/FooterCTASection';
import { SmoothScroll } from '@/components/providers/SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 w-full">
          <HeroSection />
          <AboutSection />
          <PlacementPulseSection />
          <ServicesSection />
          <ProjectsSection />
          <FooterCTASection />
        </main>
      </div>
    </SmoothScroll>
  );
}


