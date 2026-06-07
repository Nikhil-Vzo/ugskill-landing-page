# Design Spec: Placement Pulse (Pinterest-Inspired Placements Wall)

This document outlines the visual structure, layout, and interaction specifications for replacing the marquee course library with the premium **Placement Pulse** social proof wall.

---

## 1. Goal & Visual Theme
The goal is to move away from a standard placement dashboard to a dynamic, visual wall of social proof. The theme blends:
* **Pinterest Masonry Grid**: Vertical staggered card heights.
* **Linear Glassmorphic Surfaces**: Soft borders, semitransparent cards, back-drop filters, and drop shadows.
* **Arc Browser Gradients**: Rich pastel-hued organic gradient accents.
* **Duolingo Gamified Tokens**: Bouncy, circular skill badges with drop-shadow layers.
* **Stripe Micro-Animations**: Smooth, responsive scaling and hover glows.

---

## 2. Grid & Layout Architecture
- **Columns**: 3 columns on desktop (`lg:grid-cols-3` or Tailwind column utility `columns-1 md:columns-2 lg:columns-3 gap-6`), collapsing to 2 on tablet, and 1 on mobile.
- **Staggering**: Cards have varying heights based on their content, creating a classic Pinterest-style masonry appearance.
- **Spacing**: `gap-6` (24px) grid spacing.

---

## 3. Card Definitions

### Card 1: Placement Proof Card (Masonry Item 1 & 4)
A large, premium card showcasing a specific hiring achievement.
- **Header**: Company Logo (SVG or img) and name (e.g., Supabase, Vercel, Stripe).
- **Body**: 
  - Sub-heading: `"Student #109 hired"`
  - Title: `Fullstack Developer`
  - Checklist: Completed course checkpoints with custom checked badges (e.g., `✓ checkpoints.js`, `✓ bfs_traversal.js`).
- **Footer**: Relative timestamp `"Verified 2 mins ago"`.
- **Aesthetic**: White background with a faint linear-gradient border and drop shadow.

### Card 2: Recruiter Activity Feed (Masonry Item 2)
A stacked timeline displaying live hiring triggers from recruiters.
- **Content**: 
  - *"Airbnb viewed 4 profiles"* (2 mins ago)
  - *"Stripe opened hiring round"* (7 mins ago)
  - *"Vercel shortlisted Student #208"* (15 mins ago)
- **Aesthetic**: Minimal glassmorphic list items stacked vertically.

### Card 3: Student Rank Card (Masonry Item 3)
A collectible card designed like a gaming profile.
- **Content**:
  - Gold/Silver rank badge (e.g., `#1`)
  - Student Name: `Aarav Sharma`
  - XP counter: `92,400 XP` with a custom filled XP progress bar.
  - Active credentials pill tags: `LMS Certified`, `DSA Master`, `Proctor Verified`.
- **Aesthetic**: Rich slate background with soft green neon outlines and a shiny border.

### Card 4: Verification Signature Card (Masonry Item 5)
The key high-fidelity "wow factor" element that proves authenticity.
- **Content**:
  - Title: `Placement Signature`
  - Cryptographic Hash: `0xA93B21F8E...`
  - Timestamp: `Jun 5, 2026`
  - Status: Green glowing pulse dot next to `Verified` status.
  - Visual Centerpiece: A large, neon-glowing, glassmorphic checkmark icon.
- **Interaction**: Clicking this card expands a detail panel showing proof of assessment hashes.

### Card 5: Badge Collections Card (Masonry Item 6)
A cluster of circular, bouncy Duolingo-style tokens.
- **Badges**:
  - 🏆 `LMS Certified`
  - 🔥 `DSA Master`
  - ⚡ `Backend Elite`
  - 🎯 `Interview Ready`
  - 🛡 `Proctor Verified`
- **Aesthetic**: Circular tokens nested in a flex grid. Hovering triggers a bouncy pop-up scale change.

### Card 6: Campus Momentum Card (Masonry Item 7)
A card presenting statistical proof of growth and momentum.
- **Metric options**:
  - *Campus Rank Growth*: `+43 positions this week` with a visual bar.
  - *Placements This Month*: `124` with a green arrow `↑ 38%`.

---

## 4. Micro-Interactions & Animations

### Staggered Entrance
When entering the viewport, card columns slide up and scale slightly:
- `initial={{ opacity: 0, y: 30, scale: 0.98 }}`
- `whileInView={{ opacity: 1, y: 0, scale: 1 }}`
- `viewport={{ once: true, margin: "-50px" }}`
- Transition: Spring wrapper (`stiffness: 100`, `damping: 18`, `delay` staggered by index).

### Hover Behaviors
- **Placement Cards**: Company logos glow and the card shifts up slightly (`y: -4px`).
- **Verification Check**: The large checkmark has a continuous pulse animation.
- **Badges**: Bouncy hover pop scale shifts.

---

## 5. Verification Plan

### Automated Checks
- Verify compilation of all JSX components.
- Run `npm run build` and ensure Turbopack completes without error.
- Run `npm run lint` to ensure zero React 19 or TypeScript warnings.
