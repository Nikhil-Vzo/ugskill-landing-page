# Homepage Entrance Transitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement premium scroll-triggered and page-load entrance animations across all homepage sections using Framer Motion spring physics.

**Architecture:** Use Framer Motion `motion` components and custom scroll hooks to drive transitions. Apply inline CSS masking and SVG dash offsets for line draws, spring-driven 3D transforms for cards/mockups, and staggered delay sequences.

**Tech Stack:** Next.js, React, Tailwind CSS, Framer Motion, Lucide React

---

### Task 1: Navbar & Video Hero Section 1 Transitions

**Files:**
- Modify: [HeroSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/HeroSection.tsx)
- Modify: [Navbar.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/layout/Navbar.tsx)
- Test: Manual browser scroll check

- [ ] **Step 1: Update Navbar wrapper with slide down and fade**

Modify [Navbar.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/layout/Navbar.tsx) around line 19-30:
Wrap the `PillNav` in a `motion.div` to animate its entrance on load.

```typescript
import { motion } from 'framer-motion';

// ... inside Navbar ...
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
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
```

- [ ] **Step 2: Update background video fade-in and mascot/buttons spring entrance**

Modify [HeroSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/HeroSection.tsx) lines 101-175:
Add a `motion.video` that fades in from opacity 0 to 1 over 1.2s.
Update the mascot container (left box) with a spring bounce.
Update the right actions container with a staggered spring bounce.

```typescript
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src="/assets/hero/hero-section-video.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
```

Update mascot indicator spring settings:
```typescript
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
```

Update right action buttons staggering spring settings:
```typescript
        {/* Right Actions (Interactive Demo & Enterprise Setup) docked to the extreme right bottom corner */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 15,
            delay: 0.9,
            staggerChildren: 0.1
          }}
          className="absolute right-8 bottom-7 z-20 hidden lg:flex flex-col items-end gap-6"
        >
```

- [ ] **Step 3: Commit Task 1**

```bash
git add src/components/sections/HeroSection.tsx src/components/layout/Navbar.tsx
git commit -m "feat: animate navbar slide-down and hero section 1 load transitions"
```

---

### Task 2: Video Intro & Dashboard Mockup Section 2 Entrance

**Files:**
- Modify: [HeroSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/HeroSection.tsx)
- Test: Verify mockup 3D rotate entrance and mascot drop

- [ ] **Step 1: Implement shifting scale/radial glow animation in Section 2 background**

Modify [HeroSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/HeroSection.tsx) lines 186-196. Update the grid overlay container to slow animate:

```typescript
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-90"
          animate={{
            backgroundPosition: ["0px 0px", "20px 20px"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
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
```

- [ ] **Step 2: Update UG Bot Video Intro (Left) scroll reveal**

Wrap the UG Bot Video block (lines 201-232) in a `motion.div` that triggers when in view:
```typescript
            <motion.div 
              initial={{ opacity: 0, x: -60, rotate: -3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.1 }}
              className="relative z-20 mx-auto w-full max-w-3xl lg:absolute lg:left-[6%] lg:top-1/2 lg:w-[46%] lg:-translate-y-1/2"
            >
```

- [ ] **Step 3: Update Dashboard Mockup (Right) 3D fold scroll reveal**

Update the dashboard wrapper (lines 235-275):
```typescript
            <div className="relative min-h-[520px] lg:min-h-[760px]">
              <motion.div
                initial={{ opacity: 0, x: 60, rotateY: 8 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.25 }}
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
```

Update the mascot companion image (inside the mockup div) to slide/drop down:
```typescript
                {/* Floating mascot */}
                <motion.div
                  initial={{ opacity: 0, y: -100, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.7 }}
                  className="absolute -left-8 -top-16 md:-left-16 md:-top-24 w-24 md:w-36 z-30 select-none pointer-events-none"
                  style={{ transform: "translateZ(80px)" }}
                >
                  <motion.img
                    animate={{ y: [0, -10, 0] }}
                    transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                    src="/assets/projects/student_mascot_clay.png"
                    alt="Robot Mascot Companion"
                    className="w-full h-auto drop-shadow-[0_12px_24px_rgba(88,204,2,0.18)]"
                  />
                </motion.div>
```

- [ ] **Step 4: Commit Task 2**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: implement 3D fold and spring reveals in Hero Section 2"
```

---

### Task 3: About Section Split-Text & Mascot reveals

**Files:**
- Modify: [AboutSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/AboutSection.tsx)
- Test: Verify word-by-word mask reveal on header

- [ ] **Step 1: Implement word mask animation for headings**

Modify [AboutSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/AboutSection.tsx):
Replace the static `h2` elements with animated text where each word slides up out of an overflow-hidden span.

```typescript
          <motion.h2
            className="mt-6 text-5xl font-black leading-[0.92] tracking-tighter text-[#0F172A] md:text-7xl lg:text-[6.5rem]"
          >
            <div className="overflow-hidden block py-1">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                One platform for
              </motion.span>
            </div>
            
            <div className="overflow-hidden block py-1">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block bg-gradient-to-r from-[#0F172A] via-[#58CC02] to-[#0F172A] bg-[length:220%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ backgroundPosition: { duration: 9, repeat: Infinity, ease: 'linear' } }}
              >
                learning, proof, and
              </motion.span>
            </div>

            <div className="overflow-hidden block py-1">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#58CC02]"
              >
                placement.
              </motion.span>
            </div>
          </motion.h2>
```

- [ ] **Step 2: Update decorative mascots slide-in entrance**

Update left and right floating containers with initial `x` offsets and `whileInView` spring triggers.
```typescript
      <motion.div
        style={{ y: yStudy }}
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        className="absolute left-[2%] top-[22%] hidden w-[130px] select-none pointer-events-none md:block lg:left-[5%] lg:w-[200px]"
      >
        <img
          src="/assets/projects/pointing_robo_green.png"
          alt="Pointing Green Robot Mascot"
          className="h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(88,204,2,0.12)]"
        />
      </motion.div>

      <motion.div
        style={{ y: ySuccess }}
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.35 }}
        className="absolute bottom-[12%] right-[-4%] hidden w-[220px] select-none pointer-events-none md:block lg:right-[2%] lg:w-[360px]"
      >
        <img
          src="/assets/hero/student_placed_success-removebg-preview.png"
          alt="Student celebrating placement success"
          className="h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(14,165,233,0.12)]"
        />
      </motion.div>
```

- [ ] **Step 3: Commit Task 3**

```bash
git add src/components/sections/AboutSection.tsx
git commit -m "feat: add split-text reveals and spring mascot entrances in AboutSection"
```

---

### Task 4: MarqueeSection & Mobile Roadmap Path Drawing

**Files:**
- Modify: [MarqueeSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/MarqueeSection.tsx)
- Modify: [PremiumMobileRoadmap.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/ui/PremiumMobileRoadmap.tsx)
- Test: Verify scroll-drawn line on mobile simulation

- [ ] **Step 1: Update MarqueeSection header with reveal masks**

Update [MarqueeSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/MarqueeSection.tsx) layout header:
Wrap the text blocks in overflow mask containers.

- [ ] **Step 2: Add dynamic code typing and editor line reveal on active sandbox change**

In [InteractiveCodeSandbox.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/ui/InteractiveCodeSandbox.tsx), when course selection changes, we want lines to fade-in sequentially or display a typing prompt. Let's add a clean stagger on the lines returned by `renderEditorCode()`.

Modify [InteractiveCodeSandbox.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/ui/InteractiveCodeSandbox.tsx) around line 217:
```typescript
    return lines.map((line, idx) => {
      let content;
      if (line.includes('// MISSING:')) {
        const indentation = line.match(/^\s*/)?.[0] || '';
        if (selectedOption) {
          content = (
            <div className="bg-[#58CC02]/10 border-l-2 border-[#58CC02] px-2 py-0.5 my-1 text-[#58CC02] font-semibold">
              {indentation}{selectedOption}
            </div>
          );
        } else {
          content = (
            <div className="text-slate-500 italic bg-slate-900/40 px-2 py-0.5 my-1 border-l-2 border-slate-700">
              {line}
            </div>
          );
        }
      } else {
        content = (
          <div className="px-2 text-slate-300">
            {line}
          </div>
        );
      }

      return (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.04 }}
        >
          {content}
        </motion.div>
      );
    });
```

- [ ] **Step 3: Update Mobile Winding Roadmap SVG scroll-path drawings**

Modify [PremiumMobileRoadmap.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/ui/PremiumMobileRoadmap.tsx):
Hook scroll position to drive SVG path draw. Use `useScroll` targetting a ref.

```typescript
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

// Inside PremiumMobileRoadmap:
  const roadmapRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ['start end', 'end start']
  });

  // Map the scroll progress to the SVG path drawing completion
  const pathDraw = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
```

Update the green path in [PremiumMobileRoadmap.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/ui/PremiumMobileRoadmap.tsx):
Replace the static path with the full winding path, drawing based on scroll:
```typescript
          {/* Animated Completed Path (green) drawing on scroll */}
          <motion.path
            d="M 150 30 C 230 85, 230 85, 230 140 C 230 195, 70 195, 70 250 C 70 305, 180 305, 180 360 C 180 415, 100 415, 100 470 C 100 525, 150 525, 150 580"
            stroke="#58CC02"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength: pathDraw }}
          />
```

Update nodes to pop-in with bounce spring on view:
```typescript
            <motion.div
              key={course.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: idx * 0.08 }}
              style={{ left: pos.x, top: pos.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
            >
```

Update mascot guide position to float/glide to active node coordinates:
```typescript
  // Find active node coordinates to position the guide
  const activeNodeIdx = positions.findIndex(p => p.status === 'active');
  const activeNode = positions[activeNodeIdx] || positions[0];

  // Mascot guide slides smoothly to the active node coordinates
  // absolute position offsets:
  const mascotX = activeNode.x + 10;
  const mascotY = activeNode.y - 60;
```

Modify the mascot guide element:
```typescript
        {/* Mascot floating companion hopping to active node */}
        <motion.div
          animate={{ 
            x: mascotX,
            y: mascotY + Math.sin(Date.now() / 1000) * 4 // subtle hover offset
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="absolute left-0 top-0 z-20 w-14 h-14 pointer-events-none"
        >
          <img
            src="/assets/projects/student_mascot_clay.png"
            alt="Floating Mascot Guide"
            className="w-full h-auto drop-shadow-[0_8px_16px_rgba(88,204,2,0.25)]"
          />
        </motion.div>
```

- [ ] **Step 4: Commit Task 4**

```bash
git add src/components/sections/MarqueeSection.tsx src/components/ui/InteractiveCodeSandbox.tsx src/components/ui/PremiumMobileRoadmap.tsx
git commit -m "feat: implement scroll-drawn roadmap and sandbox code reveal animations"
```

---

### Task 5: ServicesSection Separator Drawing & Row Reveals

**Files:**
- Modify: [ServicesSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/ServicesSection.tsx)
- Test: Verify row line draw on scroll in browser

- [ ] **Step 1: Add row reveal mask & border-line drawing**

Modify [ServicesSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/ServicesSection.tsx):
For each row item, wrap the border separator in an SVG/CSS animation that draws from 0% to 100% when entering view.

```typescript
            <motion.div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex flex-col md:flex-row md:items-start justify-between py-10 border-b border-slate-200/80 hover:bg-slate-50/50 transition-colors px-4 rounded-xl -mx-4 cursor-pointer relative"
            >
              {/* Dynamic top divider line draw on scroll */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 right-0 h-[1px] bg-slate-200/80 origin-left"
              />
```

- [ ] **Step 2: Add spring index spin-in & contents slide-up**

Update the index number, title details block with stagger properties:
```typescript
              {/* Left Side: Number Index */}
              <motion.div 
                initial={{ opacity: 0, rotate: -35 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="text-3xl md:text-4xl font-extrabold text-slate-300 group-hover:text-[#58CC02] transition-colors duration-300 md:w-24"
              >
                {service.id}
              </motion.div>

              {/* Center: Title & Description */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="flex-1 md:px-6 mt-4 md:mt-0 max-w-2xl"
              >
                <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] tracking-tight mb-3 group-hover:text-[#58CC02] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
```

- [ ] **Step 3: Commit Task 5**

```bash
git add src/components/sections/ServicesSection.tsx
git commit -m "feat: animate services section list item reveals and separator lines"
```

---

### Task 6: ProjectsSection Illustration Parallax Depth

**Files:**
- Modify: [ProjectsSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/ProjectsSection.tsx)
- Test: Verify illustration depth movement on scroll

- [ ] **Step 1: Set up illustration scroll-parallax transforms**

Modify [ProjectsSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/ProjectsSection.tsx):
Calculate parallax translation values inside `projectCards.map`.
Create custom motion values linking to `scrollYProgress` of the section.

```typescript
// Inside ProjectsSection mapping loop (around line 125-188):
// We can use the global scrollYProgress of the container:
```

Import and construct motion calculations:
```typescript
import { useScroll, useTransform, useSpring } from 'framer-motion';

// inside loop:
// Map the scroll progression to Y offset for the 3D illustration
const yParallax = useTransform(
  scrollYProgress,
  [0, 1],
  [index * 24 - 40, index * 24 + 40]
);
const smoothYParallax = useSpring(yParallax, { stiffness: 100, damping: 20 });
```

Update the right side card image viewport:
```typescript
                  {/* Right Side: Floating 3D Illustration Viewport (No Frame, transparent bg) */}
                  <div className="w-full lg:w-[45%] h-[180px] sm:h-[240px] md:h-[300px] lg:h-[340px] flex items-center justify-center relative group select-none pointer-events-none overflow-hidden">
                    <motion.img
                      style={{
                        y: smoothYParallax,
                        filter: `drop-shadow(0 15px 30px ${card.shadowColor})`,
                      }}
                      src={card.imageUrl}
                      alt={card.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
```

- [ ] **Step 2: Commit Task 6**

```bash
git add src/components/sections/ProjectsSection.tsx
git commit -m "feat: implement 3D scroll parallax illustration depth in ProjectsSection"
```

---

### Task 7: Verification and Build Checks

- [ ] **Step 1: Run compilation build to verify TS compatibility**

Run: `npm run build`
Expected: Successful static bundle generation without errors.

- [ ] **Step 2: Run linter verification**

Run: `npm run lint`
Expected: Clean exit without syntax errors.
