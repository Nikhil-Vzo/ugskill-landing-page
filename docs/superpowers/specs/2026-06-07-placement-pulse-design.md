# Design Spec: Placement Pulse (Pinterest-Inspired Placements Wall)

This document specifies the design, layout hierarchy, card components, and visual enhancements for the **Placement Pulse** section on the UGSkill homepage.

---

## 1. Goal & Product Positioning
Shift the section from a corporate placement dashboard to a premium "proof-of-employability" social proof wall. The tagline is:
**"Verified skills. Verified assessments. Verified outcomes."**

---

## 2. Grid & Layout Architecture (Masonry)
To prevent keyboard navigation issues, layout jumps, and broken animation ordering associated with native CSS `columns-3`, we will implement the masonry layout using **three parallel Flexbox columns** (`flex flex-row gap-6` wrapping three `flex flex-col gap-6 flex-1` columns). This allows:
- Explicit control over which column each card enters.
- Staggered entrance animations running column-by-column or row-by-row.
- Perfectly clean responsive collapsing to 2 columns on tablet and 1 column on mobile.

---

## 3. Visual Hierarchy & Card Tiers

### Tier 1: Hero Cards (Double Height / Maximum Weight)
These cards establish core credibility and trust.

#### Card 1: Placement Proof Card
- **Content**: Company logo (Supabase), title *"Student #109 hired as Fullstack Developer"*, checklist of verified code files (`✓ checkpoints.js`, `✓ bfs_traversal.js`, `✓ api_design.js`), and relative timestamp *"Verified 2 mins ago"*.
- **Visuals**: Ambient hover shadow glow, organic gradient borders.

#### Card 2: Verification Signature Card
- **Content**:
  - Title: `UGSkill Placement Proof`
  - Cryptographic Hash: `0xA93B21F...`
  - Assessment Integrity: `100%`
  - Identity Match: `Verified`
  - Placement Status: `Authenticated`
- **Visuals**: Neon glowing border, large pulsing checkmark, animated background grid line overlay, and tiny floating CSS particle highlights. Clicking expands proof details.

---

### Tier 2: Context Cards (Medium Weight)
These cards provide competitive and placement context.

#### Card 3: Student Rank Card (Collectible Gaming Card)
- **Content**: Rank badge (e.g., `#1`), name `Aarav Sharma`, score `92,400 XP`, visual progress bar, and earned badges (`LMS Certified`, `DSA Master`, `Proctor Verified`).
- **Visuals**: Deep slate background, neon green borders.

#### Card 4: Journey Card (Timeline Story)
- **Content**: Chronological upskilling timeline of a successful candidate (e.g. Student #109):
  - **Day 1**: Started Java Fundamentals
  - **Day 12**: Completed DSA Track
  - **Day 26**: Passed Proctored Assessment
  - **Day 31**: Verified Placement → *Fullstack Developer @ Supabase*
- **Visuals**: A vertical dotted line connecting progress nodes with glowing completed markers.

#### Card 5: Campus Momentum Card
- **Content**: Statistical proof of campus growth (e.g., `"Placements This Month: 124 (↑ 38%)"` or `"Campus Rank Growth: +43 positions this week"`).

---

### Tier 3: Supporting Cards (Small Weight)
These cards provide evidence clusters and recruiter activity.

#### Card 6: Badge Collections Card
- **Content**: Visual grid of Duolingo-style circular badges (🏆 `LMS Certified`, 🔥 `DSA Master`, ⚡ `Backend Elite`, 🎯 `Interview Ready`, 🛡 `Proctor Verified`).
- **Visuals**: Bouncy hover pop scaling.

#### Card 7: Recruiter Signal Feed
- **Content**: Opportunity-focused signals:
  - *"Frontend Engineer"* - Viewed by Stripe (3 matching candidates)
  - *"Backend Assessment"* - 12 students qualified (Viewed by Supabase)
  - *"DSA Challenge"* - Shortlist updated by Linear (2 candidates)

---

## 4. Environmental Motion & Ambient Aesthetics
To create a premium product feel (Arc Browser / Linear design style), we will add:
- **Floating Gradient Orbs**: Two absolute-positioned, low-opacity, glowing color mesh orbs drifting slowly in the section background using infinite animations.
- **Ambient Glows**: Soft green glowing backing shadows sitting behind the Verification card.

---

## 5. Verification Plan

### Automated Checks
- Verify JSX layout compilation.
- Ensure `npm run build` completes successfully.
- Ensure `npm run lint` yields 0 warnings/errors.
