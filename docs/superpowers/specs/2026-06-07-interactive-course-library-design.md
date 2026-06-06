# Design Spec: Hybrid Interactive Course Library

This document specifies the design and implementation details for upgrading the landing page's **Interactive Course Library** section. 

## Goal & Target Experience
Create a highly interactive section that splits behaviors depending on screen size to deliver the best user experience:
1. **PC / Desktop (>= 1024px)**: Interactive split-pane layout with a course selection list on the left and a live coding IDE Sandbox simulator on the right.
2. **Mobile / Phone (< 1024px)**: A premium, gamified vertical roadmap path (Duolingo style) with winding SVG trails, animated pulsing nodes, and glassmorphic popover content sheets.

---

## Technical Details

### 1. Component Structure
The feature will reside within [MarqueeSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/MarqueeSection.tsx) to maintain clean imports, or import sub-components:
- `InteractiveCodeSandbox`: Mockup IDE with file tabs, editor body, clickable code lines, and interactive terminal output.
- `PremiumMobileRoadmap`: Custom responsive layout with winding SVG trails, nodes, active node glow, and popover content modals.

### 2. PC Sandbox States & Mechanics
Clicking a course card selects it as the active course. The right pane updates with a customized sandbox project:
- **Interactive Code Correction**: The code editor displays a mock JavaScript file with a missing or incorrect line. A glowing button lets the user select the correction.
- **Run Tests Simulator**: Tapping "Run Tests" executes a loading animation followed by a realistic compiler green checkmark logging test success.

### 3. Mobile Winding Path Mechanics
- Renders an SVG curved path connecting vertical nodes.
- Winding math offsets nodes left-and-right (`left: 50% + cos(index) * offset`).
- Displays a floating claymorphic robot mascot next to the active lesson node.
- Tapping nodes opens clean glassmorphic popup modal drawers.

---

## Verification Plan

### Automated Verification
- Run compilation: `npm run build`
- Verify responsiveness.

### Manual Verification
- Deploy local dev server.
- Test selection and test running console on desktop.
- Verify SVG alignment and tap popups on mobile layout.
