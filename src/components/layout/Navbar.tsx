'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import PillNav from '../ui/PillNav';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Platform', href: '/platform/lms' },
    { label: 'Solutions', href: '/solutions/universities' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'Login', href: '/auth/login' },
    { label: 'Try Demo', href: '/auth/login?sandbox=true' }
  ];

  return (
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
  );
};
