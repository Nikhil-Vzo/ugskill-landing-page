'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export const PlatformNav: React.FC = () => {
  const pathname = usePathname();

  const sublinks = [
    { label: 'Adaptive LMS', href: '/platform/lms' },
    { label: 'Proctored Exams', href: '/platform/exams' },
    { label: 'Placement Portal', href: '/platform/placements' },
    { label: 'HR Recruiter Portal', href: '/platform/hr-portal' },
  ];

  return (
    <div className="w-full flex justify-center py-4 border-b border-zinc-100 bg-zinc-50/50 backdrop-blur-md sticky top-[80px] z-50">
      <div className="inline-flex gap-1.5 md:gap-4 px-2.5 py-1.5 rounded-2xl bg-white/85 border border-zinc-200 shadow-sm relative select-none max-w-full overflow-x-auto">
        {sublinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 no-underline whitespace-nowrap ${
                isActive ? 'text-[#46A302]' : 'text-zinc-550 hover:text-zinc-800'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activePlatformSubNav"
                  className="absolute inset-0 rounded-xl bg-[#58CC02]/8 border border-[#58CC02]/25 z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
