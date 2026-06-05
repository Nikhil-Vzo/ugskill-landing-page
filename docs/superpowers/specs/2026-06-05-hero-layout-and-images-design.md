# Design Spec: Hero Layout & Unique Assets Redesign

## Goal
Improve the visual spacing of the Hero Section by drifting the first box (LMS preview) to the extreme bottom-left and the other two boxes (Integrity & Placement) to the extreme bottom-right. Additionally, generate 4 unique claymorphic 3D assets to replace all duplicate/repeated images across the site sections (Hero, Marquee/Course Library, and Projects).

## Proposed Changes

### 1. Hero Layout Refactoring
- **File:** `src/components/sections/HeroSection.tsx`
- **Changes:**
  - Remove the centered, shared flex container for the three bottom boxes.
  - Split into two separate `motion.div` containers anchored to the outer edges.
  - **Left Box:** positioned at `absolute left-8 bottom-7 z-20 w-[30%] max-w-[420px]`.
  - **Right Box (2-column grid):** positioned at `absolute right-8 bottom-7 z-20 w-[35%] max-w-[500px]`.

### 2. Assets Sourcing (3D Claymorphism style)
We will generate 4 new unique images to replace the duplicated/placeholder images in the project. They will follow a consistent **Matte Claymorphism** theme with our **Feather Green (#58CC02)** accent:
- `/assets/projects/learning_path_clay.png`: Student learning path with interconnected glowing nodes, graduation cap, and growth chart.
- `/assets/projects/sandbox_clay.png`: Coding terminal/workspace with brackets and green play button.
- `/assets/projects/integrity_clay.png`: Security shield, checkmarks, and a test exam sheet.
- `/assets/projects/career_clay.png`: Briefcase and rocket representing career transition.

### 3. Image Replacements in Code
- **HeroSection.tsx:** Replace `/assets/projects/funnel_lms.png` with `/assets/projects/learning_path_clay.png`.
- **MarqueeSection.tsx:**
  - Update `courses` list:
    - Item 1 (LMS Foundations) -> `/assets/projects/learning_path_clay.png`
    - Item 2 (Programming Track) -> `/assets/projects/sandbox_clay.png`
    - Item 3 (Assessment Builder) -> `/assets/projects/integrity_clay.png`
    - Item 4 (Career Readiness) -> `/assets/projects/career_clay.png`
  - Update top-right decorative header image -> `/assets/projects/learning_path_clay.png`
- **ProjectsSection.tsx:**
  - Card 1 (LMS) -> `/assets/projects/learning_path_clay.png`
  - Card 2 (Proctoring/Exam) -> `/assets/projects/integrity_clay.png`
  - Card 3 (Placement/Hiring) -> `/assets/projects/career_clay.png`

## Verification Plan
- Build and run the site locally to ensure no layout breakages.
- Check the Hero section alignment and verify the new images load correctly in all referenced components.
