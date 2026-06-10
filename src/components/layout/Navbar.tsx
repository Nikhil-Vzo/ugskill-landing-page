'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import PillNav from '../ui/PillNav';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { 
      label: 'Solutions', 
      href: '/platform/lms',
      subItems: [
        { label: 'LMS Platform', href: '/platform/lms' },
        { label: 'Exams & Proctoring', href: '/platform/exams' },
        { label: 'Placements Engine', href: '/platform/placements' },
        { label: 'HR Talent Portal', href: '/platform/hr-portal' }
      ]
    },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'Login', href: '/auth/login' },
    { label: 'Try Demo', href: '/auth/login?sandbox=true' }
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none"
    >
      <div className="pointer-events-auto">
        <PillNav
          items={navItems}
          activeHref={pathname || undefined}
          ease="power3.easeOut"
          baseColor="#0f172a"
          pillColor="#f8fafc"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#0f172a"
          initialLoadAnimation={true}
        />
      </div>
    </motion.div>
  );
};

