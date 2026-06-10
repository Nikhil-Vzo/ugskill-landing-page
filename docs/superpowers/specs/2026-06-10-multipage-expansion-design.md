# Multi-Page Showcase Expansion Design Spec

This spec defines the structure, design, and implementation plan for the four new platform showcase pages: LMS Page, Exam Page, Placement Page, and HR Portal Page. These pages will serve as high-fidelity interactive showcases utilizing screenshots of each system.

---

## 1. Goals & User Experience
* **Consistency:** Strictly match the home page's tactile design system (Feather Green `#58CC02`, Deep Slate headings, Slate body text, and clean zinc surfaces).
* **Screenshots Showcase:** Each page will highlight three high-fidelity screenshots. Instead of displaying them statically, we will embed them in a premium interactive showcase:
  * **Device Mockup Frame:** A light-mode browser/dashboard mockup wrapper with window controls and a soft drop shadow (`box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.05)`).
  * **Interactive Tab/Slideshow Selection:** Users can click through tabs (e.g., "Overview", "Key Features", "Detailed View") to switch between the three screenshots.
  * **Interactive Floating Tooltips/Hotspots:** Clicking on specific parts of the mockup reveals highlighted feature descriptions.
* **Call to Action (CTA):** Each page ends with a tailored tactile CTA button leading back to the Auth Login/Contact page.

---

## 2. Page Structure & Routes

### A. `/platform/lms` (LMS Page)
* **Heading:** "LMS: Adaptive & Gamified Learning Paths"
* **Copy:** Focuses on student coding trails, Daily Coding Streaks, study companion badges, and syllabus alignment.
* **Showcase Tabs:**
  1. *Dashboard View:* Overall path progress, streaks, and global leaderboard.
  2. *Interactive Sandbox Editor:* Simulated compiler interface with tests.
  3. *Mascot Companion & Gamification:* Badge collections and rank progression.

### B. `/platform/exams` (Exam Page)
* **Heading:** "Exams: Cheat-Proof Proctoring & Assessments"
* **Copy:** Highlights active window tracking, proctor logs, verified identity matching, and assessment integrity.
* **Showcase Tabs:**
  1. *Student Proctoring Interface:* Camera feeds, tab tracking warning logs.
  2. *Exam Panel Editor:* Multi-question editor with anti-copy constraints.
  3. *Audit & Verification Report:* Detailed logs displaying proctor decisions.

### C. `/platform/placements` (Placement Page)
* **Heading:** "Placements: Direct Recruiter Pipelines"
* **Copy:** Features Campus Momentum statistics, hiring partner matches, and vetted student talent lists.
* **Showcase Tabs:**
  1. *Placement Drive Board:* Active recruitment phases and coordinator boards.
  2. *Student Success Board:* Hired stats, matching opportunities, and salary packages.
  3. *Student Profile:* Publicly sharable vetted resume with verified hash signatures.

### D. `/platform/hr-portal` (HR Portal Page)
* **Heading:** "HR Portal: Vetted Talent Acquisition"
* **Copy:** Dedicated portal showcase for recruiters to search candidates, verify certificates, and track hiring stages.
* **Showcase Tabs:**
  1. *Candidate Search & Filters:* Filter by skills, score thresholds, and proctor scores.
  2. *Candidate Interview Board:* Schedule AI interviews and view candidate response scores.
  3. *Cryptographic Verification:* Input signature hashes to verify candidate assessments.

---

## 3. Implementation Steps

1. **Staging Assets:** Once the user provides the screenshots:
   * Copy them to `public/assets/showcase/lms-*.png`, `public/assets/showcase/exams-*.png`, `public/assets/showcase/placements-*.png`, and `public/assets/showcase/hr-*.png`.
2. **Scaffold Pages:**
   * Create pages at:
     * `src/app/platform/lms/page.tsx`
     * `src/app/platform/exams/page.tsx`
     * `src/app/platform/placements/page.tsx`
     * `src/app/platform/hr-portal/page.tsx`
3. **Reusable Showcase Component:**
   * Create `src/components/ui/InteractiveShowcase.tsx` containing the mockup frame, tab-switching controls, active state animations via `framer-motion`, and text descriptions.
4. **Verification & Styling:**
   * Ensure mobile responsiveness and zero layout shifts.
   * Run production build checks to ensure compile success.

---

## 4. Spec Verification
* **Palette Check:** Zero non-brand colors used.
* **Responsive Check:** All device mockups scale down cleanly on small viewports.
* **Link Integration:** Add appropriate links in Navbar and Footer.
