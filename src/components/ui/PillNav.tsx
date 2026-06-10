import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  subItems?: Array<{ label: string; href: string }>;
};

export interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo = '',
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#0f172a', // Deep Slate / Primary dark color
  pillColor = '#f8fafc', // Slate 50 offset white
  hoveredPillTextColor = '#ffffff', // Hover text color
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? '#0f172a';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | HTMLSpanElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { opacity: 0, y: -8 });
        gsap.to(navItems, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.5,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '46px',
    ['--logo']: '38px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '4px'
  } as React.CSSProperties;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] w-[92%] lg:w-[80vw] xl:w-[70vw] max-w-[1000px] flex justify-center">
      <nav
        className={`w-full flex items-center justify-between box-border px-4 lg:px-6 py-1.5 lg:py-1 rounded-full border border-[#58CC02]/40 lg:border-white/60 bg-[#0a2f00]/80 lg:bg-white/55 backdrop-blur-xl shadow-[0_12px_32px_-12px_rgba(88,204,2,0.25)] lg:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.12)] ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            href={items[0].href}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
            ref={logoRef}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base, #0f172a)'
            }}
          >
            {logo ? (
              <img src={logo} alt={logoAlt} ref={logoImgRef as React.RefObject<HTMLImageElement>} className="w-full h-full object-cover block" />
            ) : (
              <span ref={logoImgRef as React.RefObject<HTMLSpanElement>} className="text-white font-extrabold text-xs tracking-tighter select-none">
                UG
              </span>
            )}
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || '#'}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={el => {
              logoRef.current = el as unknown as HTMLAnchorElement;
            }}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base, #0f172a)'
            }}
          >
            {logo ? (
              <img src={logo} alt={logoAlt} ref={logoImgRef as React.RefObject<HTMLImageElement>} className="w-full h-full object-cover block" />
            ) : (
              <span ref={logoImgRef as React.RefObject<HTMLSpanElement>} className="text-white font-extrabold text-xs tracking-tighter select-none">
                UG
              </span>
            )}
          </a>
        )}

        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden lg:flex"
          style={{
            height: 'var(--nav-h)'
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.filter(item => item.label !== 'Try Demo').map((item, i) => {
              const isActive = activeHref === item.href;
              const isCTA = false;

              const pillStyle: React.CSSProperties = {
                background: 'var(--pill-bg, #f8fafc)',
                color: 'var(--pill-text, var(--base, #0f172a))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: isCTA ? '#46A302' : 'var(--base, #0f172a)',
                      willChange: 'transform'
                    }}
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: isCTA ? '#ffffff' : 'var(--hover-text, #ffffff)',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && !isCTA && (
                    <span
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-1.5 h-1.5 rounded-full z-[4]"
                      style={{ background: 'var(--base, #0f172a)' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[13px] uppercase tracking-[0.5px] whitespace-nowrap cursor-pointer select-none px-4';

              return (
                <li
                  key={item.href}
                  role="none"
                  className="flex h-full relative group"
                >
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </a>
                  )}

                  {/* Desktop Hover Dropdown */}
                  {item.subItems && (
                    <div className="absolute top-[105%] left-1/2 -translate-x-1/2 mt-1 py-1.5 px-1.5 bg-white/95 border border-slate-200/80 rounded-2xl shadow-xl min-w-[210px] flex flex-col gap-0.5 z-[1000] text-left pointer-events-none opacity-0 scale-95 origin-top -translate-y-2 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-700 hover:text-white rounded-xl hover:bg-[#58CC02] transition-colors flex items-center justify-between group/item"
                        >
                          <span>{sub.label}</span>
                          <span className="opacity-0 translate-x-[-4px] group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-white">→</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Try Demo CTA Button on desktop */}
        {items.filter(item => item.label === 'Try Demo').map((item) => {
          const basePillClasses =
            'relative overflow-hidden inline-flex items-center justify-center h-[38px] no-underline rounded-full box-border font-semibold text-[13px] uppercase tracking-[0.5px] whitespace-nowrap cursor-pointer select-none px-6 bg-[#58CC02] text-white hover:bg-[#46A302] active:scale-95 transition-all duration-200 shadow-sm';

          return (
            <div key={item.href} className="hidden lg:flex items-center">
              {isRouterLink(item.href) ? (
                <Link
                  role="menuitem"
                  href={item.href}
                  className={basePillClasses}
                  aria-label={item.ariaLabel || item.label}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  role="menuitem"
                  href={item.href}
                  className={basePillClasses}
                  aria-label={item.ariaLabel || item.label}
                >
                  {item.label}
                </a>
              )}
            </div>
          );
        })}

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="lg:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #0f172a)'
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms]"
            style={{ background: 'var(--pill-bg, #f8fafc)' }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms]"
            style={{ background: 'var(--pill-bg, #f8fafc)' }}
          />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        className="lg:hidden absolute top-[4em] left-0 right-0 rounded-[27px] shadow-[0_16px_48px_rgba(88,204,2,0.25)] border border-[#58CC02]/30 z-[998] origin-top bg-[#071a00]/95 backdrop-blur-2xl p-2"
        style={{
          ...cssVars
        }}
      >
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
          {items.map(item => {
            const isCTA = item.label === 'Try Demo';
            
            const defaultStyle: React.CSSProperties = {
              background: isCTA ? '#58CC02' : 'rgba(88,204,2,0.08)',
              color: isCTA ? '#ffffff' : 'rgba(255,255,255,0.9)'
            };

            const linkClasses =
              'block py-3 px-5 text-[14px] uppercase tracking-[0.5px] font-semibold rounded-[50px] transition-all duration-200 hover:bg-[#58CC02]/20 hover:text-[#58CC02]';

            return (
              <li key={item.href} className="flex flex-col gap-0.5">
                {isRouterLink(item.href) ? (
                  <Link
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={linkClasses}
                    style={defaultStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
                {item.subItems && (
                  <ul className="list-none pl-4 pr-2 flex flex-col gap-1 border-l-2 border-[#58CC02]/30 ml-5 py-1 text-left">
                    {item.subItems.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block py-2 px-3 text-[12px] uppercase tracking-[0.5px] font-bold text-[#58CC02]/70 hover:text-[#58CC02] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
