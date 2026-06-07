# Design Spec: Homepage Entrance Transitions & Section Reveals

This document outlines the visual transitions and entrance animations for the UGSkill homepage sections. It details how the elements interact dynamically as the user scrolls, maintaining the playful, springy "Feather Green" claymorphic identity.

## Goal
Implement premium scroll-triggered and page-load entrance animations across all homepage sections using Framer Motion spring physics. This provides a tactile, premium, and highly engaging user experience.

---

## Proposed Changes & Animation Specifications

### 1. Global Navigation (Navbar)
*   **File**: `src/components/layout/Navbar.tsx` (wrapped by `PillNav.tsx`)
*   **Entrance**: Slide down from `y: -30px` to `0` with fade.
*   **Spring Physics**: `stiffness: 120`, `damping: 18`.
*   **Trigger**: Immediate load.

### 2. HeroSection Transitions
*   **File**: `src/components/sections/HeroSection.tsx`
*   **Hero Section 1 (Video Hero)**:
    *   **Background Video**: Fades in from `opacity: 0` to `opacity: 1` over `1.2s` on load.
    *   **Mascot Scroll Down (Left)**: Drops down from `y: -50px` with spring `stiffness: 90`, `damping: 10`, `delay: 0.8s`. Then transitions into an infinite float.
    *   **Tactile Buttons (Right)**: Slide up from `y: 40px` with spring, staggered (`delay: 0.9s` and `1.0s`).
*   **Hero Section 2 (Intro & Mockup)**:
    *   **UG Bot Video (Left)**: On scroll in-view, slides in from `x: -60px` with a damp rotation (`rotate: -3deg` to `0deg`), using spring `stiffness: 70`, `damping: 14`.
    *   **Dashboard Mockup (Right)**: On scroll in-view, slides in from `x: 60px` and folds open in 3D (`rotateY: 8deg` to `0deg`), then initializes its mouse-follow hover dynamics.
    *   **Student Mascot**: Drops onto the mockup card from `y: -100px` with spring `stiffness: 120`, `damping: 12`, `delay: 0.4s` relative to mockup entry.

### 3. AboutSection Transitions
*   **File**: `src/components/sections/AboutSection.tsx`
*   **Text reveals**: The main title ("One platform for learning, proof, and placement.") reveals word-by-word rising up from hidden wrappers (`overflow-hidden`).
*   **Mascots**:
    *   *Pointing Robot (Left)*: Enters with slide-in from `x: -80px` combined with a spring stretch, landing at its target offset.
    *   *Celebration Student (Right)*: Enters with slide-in from `x: 80px`, mirroring the robot's elastic transition.

### 4. MarqueeSection (Interactive Course Library) Transitions
*   **File**: `src/components/sections/MarqueeSection.tsx`
*   **Title/Header**: Slide up word-reveal.
*   **Desktop IDE Sandbox**:
    *   **Course Cards (Left)**: Staggered slide-in from `x: -40px` with fade (`stiffness: 150`, `damping: 15`, stagger delay `0.08s`).
    *   **IDE Sandbox (Right)**: Scales up from `0.95` with a soft spring. On completion, typing cursor simulation animations run on code lines.
*   **Mobile Roadmap**:
    *   **SVG Path**: Draws path Length `0` to `1` as user scrolls down.
    *   **Nodes**: Pop in via scale `0` to `1` with bounce spring as the path reaches them.
    *   **Indicator**: Mascot floats above active node, hopping to new coordinates with spring translation on course change.

### 5. ServicesSection Transitions
*   **File**: `src/components/sections/ServicesSection.tsx`
*   **List Rows**:
    *   **Line Separator**: Draws width from `0%` to `100%` on scroll.
    *   **Row Content**: Index number (`01`) spins from `rotate: -45deg` to `0deg`. Title, description, and details slide up from `y: 20px` with a stagger.
    *   **Hover Preview**: Magnetic hover image fades in and rotates from `rotate: -3deg` to `0deg` using responsive spring tracking.

### 6. ProjectsSection Transitions
*   **File**: `src/components/sections/ProjectsSection.tsx`
*   **Stacking Cards**:
    *   **3D Parallax Illustration**: Inside the stacking cards, the claymorphic illustrations (`learning_path_clay.png`, `integrity_clay.png`, `career_clay.png`) map their vertical translation `y` to the scroll progress, shifting at a slightly different rate than the card body to create depth.
    *   **Focused Highlight**: The top card scales slightly and shows a subtle text focus transition.

---

## Verification Plan

### Automated Checks
*   Verify no compiler issues: `npm run build`
*   Verify no lint issues: `npm run lint`

### Manual Verification
*   Scroll through page at normal speed and check for staggered reveals.
*   Confirm spring bounce values do not cause visual elements to jump off screen.
*   Confirm mobile winding roadmap paths draw correctly on simulated phone sizes.
