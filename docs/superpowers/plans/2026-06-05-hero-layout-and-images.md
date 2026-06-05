# Hero Layout & Unique Assets Redesign Implementation Plan

This implementation plan refactors the bottom row of cards in the Hero section to dock them to the extreme bottom-left and bottom-right edges of the viewport (Approach 1 - Absolute Docking). It also generates 4 new unique claymorphic 3D assets to replace the duplicate LMS images currently used across the codebase.

## User Review Required

> [!NOTE]
> The layout changes for the Hero Section bottom cards are styled for screens `lg` (large desktop) and up. The layout behaves responsively on mobile.

> [!IMPORTANT]
> This plan uses the `generate_image` tool to create four high-quality custom images, saves them to the workspace, and updates code references.

## Open Questions

None (all layout approaches and image themes have been pre-approved by the user).

## Proposed Changes

---

### Image Generation & Asset Prep

#### [NEW] [learning_path_clay.png](file:///c:/Users/nikhi/Downloads/new%20landing%20page/public/assets/projects/learning_path_clay.png)
#### [NEW] [sandbox_clay.png](file:///c:/Users/nikhi/Downloads/new%20landing%20page/public/assets/projects/sandbox_clay.png)
#### [NEW] [integrity_clay.png](file:///c:/Users/nikhi/Downloads/new%20landing%20page/public/assets/projects/integrity_clay.png)
#### [NEW] [career_clay.png](file:///c:/Users/nikhi/Downloads/new%20landing%20page/public/assets/projects/career_clay.png)

* Generate each image via the `generate_image` tool.
* Save the images to `public/assets/projects/` directory.

---

### Hero Section Layout Update

#### [MODIFY] [HeroSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/HeroSection.tsx)
* Separate the bottom section (`motion.div` at lines 142-199) into two individual absolute-positioned `motion.div` elements.
* **Left Box (1st Box):**
  * Position: `absolute left-8 bottom-7 z-20 hidden lg:block w-[30%] max-w-[420px]`
  * Animation: `initial={{ opacity: 0, x: -30, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }}`
  * Image source: `/assets/projects/learning_path_clay.png`
* **Right Box (2nd & 3rd Boxes):**
  * Position: `absolute right-8 bottom-7 z-20 hidden lg:block w-[35%] max-w-[500px]`
  * Animation: `initial={{ opacity: 0, x: 30, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }}`
  * Keep the existing 2-column grid layout inside this container.

---

### Library & Projects Reference Updates

#### [MODIFY] [MarqueeSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/MarqueeSection.tsx)
* Replace `/assets/projects/funnel_lms.png` references in the library data:
  * Course item 1 (LMS Foundations) `imageUrl` -> `/assets/projects/learning_path_clay.png`
  * Course item 2 (Programming Track) `imageUrl` -> `/assets/projects/sandbox_clay.png`
  * Course item 3 (Assessment Builder) `imageUrl` -> `/assets/projects/integrity_clay.png`
  * Course item 4 (Career Readiness) `imageUrl` -> `/assets/projects/career_clay.png`
* Replace top-right decorative header preview image (line 146) -> `/assets/projects/learning_path_clay.png`

#### [MODIFY] [ProjectsSection.tsx](file:///c:/Users/nikhi/Downloads/new%20landing%20page/src/components/sections/ProjectsSection.tsx)
* Update project items:
  * LMS card `imageUrl` -> `/assets/projects/learning_path_clay.png`
  * Proctoring card `imageUrl` -> `/assets/projects/integrity_clay.png`
  * Hiring card `imageUrl` -> `/assets/projects/career_clay.png`

---

## Detailed Task Breakdown

### Task 1: Generate & Save Image Assets
- [ ] **Step 1:** Generate `learning_path_clay` image with prompt.
- [ ] **Step 2:** Generate `sandbox_clay` image with prompt.
- [ ] **Step 3:** Generate `integrity_clay` image with prompt.
- [ ] **Step 4:** Generate `career_clay` image with prompt.
- [ ] **Step 5:** Move generated image files from the artifact directory to `public/assets/projects/` directory under their respective filenames.
- [ ] **Step 6:** Commit the new assets.

### Task 2: Implement Hero Section Edge Layout
- [ ] **Step 1:** Edit `src/components/sections/HeroSection.tsx` to refactor the bottom container.
- [ ] **Step 2:** Update the left box to point to `/assets/projects/learning_path_clay.png`.
- [ ] **Step 3:** Verify that layout compiles successfully.
- [ ] **Step 4:** Commit layout changes.

### Task 3: Update Marquee & Projects Section Image References
- [ ] **Step 1:** Edit `src/components/sections/MarqueeSection.tsx` to update course item image paths and header image path.
- [ ] **Step 2:** Edit `src/components/sections/ProjectsSection.tsx` to update project card image paths.
- [ ] **Step 3:** Verify that compilation and page build succeeds.
- [ ] **Step 4:** Commit reference updates.

---

## Verification Plan

### Automated Verification
- Run local Next.js build command to verify zero compilation or typescript errors:
  `npm run build`

### Manual Verification
- Run local development server:
  `npm run dev`
- Inspect the landing page in a browser to confirm:
  1. The Hero bottom left box drifts to the bottom-left corner of the screen.
  2. The Hero bottom right boxes drift to the bottom-right corner of the screen.
  3. No visual overlaps with the center text.
  4. All new unique images load correctly in the Hero, Course Library Carousel, and Projects sections.
