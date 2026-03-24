# The Monograph — Perfected: Design Specification

## Overview

Elevate the existing Next.js portfolio for Emmanuel Nene Odjidja from a strong editorial foundation to award-caliber execution. The site communicates the credibility and depth of a senior M&E Specialist, Researcher, and Epidemiologist through refined typography, scroll-driven animation choreography, and content-first design.

**Stack:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, TypeScript
**Design language:** Refined editorial — Monocle/Foreign Affairs aesthetic
**Palette:** ink, terra, cream, gold (existing, unchanged)
**Typography:** Playfair Display (serif), Source Sans 3 (sans)

---

## Principles

1. **Content over chrome** — Every visual choice serves the content. No decoration for its own sake.
2. **Editorial restraint** — Animations enhance, never distract. One focal point per viewport.
3. **Timeless positioning** — No references to current employer, location, or time-bound details anywhere on the site (hero, portrait captions, bio, footer affiliations). The work speaks. This means: remove the "Currently at GCERF" hero card, rewrite bio paragraphs in `content.ts` to remove employer/location specifics, and remove Geneva references from footer affiliations.
4. **Accessibility first** — All animations respect `prefers-reduced-motion`. WCAG AA contrast. Semantic HTML throughout.
5. **No exposed personal contact info** — Contact routes through professional social profiles, primarily LinkedIn. Remove `email` from the `siteContent.contact` data model entirely. Update JSON-LD structured data to use LinkedIn profile URL instead of email. Remove all mailto links from components.

---

## Site Architecture

```
/                  Homepage (single-page scroll, all sections)
/publications      Full research archive (29+ papers, search + filter)
/writing           Full writing archive (all pieces, filterable)
```

### Navigation
- Header links (About, Experience, Research, PRAXIS, Writing, Contact) scroll to homepage sections
- "View all" CTAs within Research and Writing sections navigate to archive pages
- Archive pages have a minimal header with back arrow to homepage and theme toggle
- No breadcrumbs

---

## Section Specifications

### 1. Hero

**Layout:** Two-column split. Left: name, titles, tagline, stats, CTAs. Right: portrait with duotone/grain treatment.

**Animations:**
- Name ("Emmanuel Nene Odjidja") animates word-by-word (3 words) with blur-to-sharp effect, like ink appearing on paper. Stagger: 0.15s per word, 0.6s individual animation duration, total sequence ~1.1s after 0.6s initial delay. This avoids the timing problems of per-character animation on large display text.
- Subtitle roles fade in beneath sequentially
- Portrait frame draws itself on load via SVG stroke animation (thin terra border)
- Stats displayed as three vertical cards with large serif numbers, small labels, and a bottom border that fills left-to-right as numbers count up
- Background: slow-moving radial gradient (ink to terra at ~5% opacity) that breathes subtly, paired with grain overlay
- Scroll cue: thin vertical line drawing downward with "Scroll" in overline caps. Fades out after 100px of scroll (opacity tied to scrollY 0-100px range). Appears after 2.5s delay.

**Responsive (mobile):**
- Single column layout. Portrait hidden (matches current behavior).
- Name, titles, stats, and CTAs stack vertically.
- Stats cards become a horizontal row of three compact items.

**No:** "Currently at GCERF" card. No location references.

### 2. About

**Layout:** Pull quote at top, two-column below (sticky portrait left, bio right), credentials grid, world map at bottom.

**Pull quote:**
- Large serif, dramatic typography
- Thin terra vertical rule on the left
- Line-by-line fade-in (0.15s stagger between lines)
- Subtle scale 0.97 to 1.0

**Portrait:**
- Inside a frame with hand-drawn-style SVG border (slightly irregular path, editorial feel)
- Name and title in small caps as caption beneath (like a journal contributor photo)
- No location, no employer references

**Bio flow:**
- Paragraphs reveal on scroll
- Left-aligned thin terra accent line tracks reading progress through the bio section (local progress indicator, not the global bar)

**Credentials grid:**
- 3-column (stacks on mobile): Education, Languages, Expertise
- Each card: overline label, content, subtle bottom border
- Expertise tags get hover tooltips with context (e.g., "DiD" shows "Difference-in-Differences")

**World map:**
- Placed at bottom of About section, bridging to Experience
- SVG source: simplified Natural Earth projection (world-110m topojson), rendered as a React component. Cropped to show Africa, Middle East, and South Asia (the relevant regions). Approximately 600px wide on desktop, full-width on mobile.
- Countries highlighted with terra fill at varying opacities:
  - Ghana: terra-500 at 100% (longest tenure, home country)
  - South Sudan: terra-500 at 80%
  - Burundi: terra-500 at 70%
  - Sahel region: highlight Burkina Faso, Mali, and Niger individually at terra-500 at 60%
  - Tunisia: terra-500 at 50%
  - Sri Lanka: terra-500 at 40%
- Remaining countries: ink-800 fill (dark mode), cream-200 fill (light mode)
- Country name labels in overline caps (0.6875rem) positioned near each highlighted country
- Subtle pulse animation on the highlighted countries when they enter viewport (once)
- No hover interactivity, no click targets

**Responsive (mobile, About section):**
- Portrait becomes non-sticky, displays above bio at natural flow position
- Credentials grid stacks to single column
- World map scales to full container width

### 3. Experience (Career Timeline)

**Layout:** Vertical timeline, role cards.

**Timeline line:**
- Draws itself downward as you scroll (SVG stroke-dashoffset tied to scroll progress)
- Dots illuminate from muted to terra-500 as each role enters viewport

**Role cards:**
- Faint background card (ink-900/50 dark, cream-100 light)
- 2px left terra border
- Hover: translateY -2px with soft shadow
- No organization logos

**Duration indicator:**
- Thin horizontal bar beneath each role's period
- Proportional to tenure length (longest role = full width, others scaled relative)

**Duration indicator data:**
- Each experience entry needs `startYear` and `endYear` (number) fields in content.ts. "Present" maps to current year (2026). Duration calculated as `endYear - startYear`. Longest duration gets 100% width bar, others proportional.

**Responsive (mobile):**
- Timeline vertical line hidden. Entries stack with top terra border as separator.
- Duration bars remain, scaled to mobile container width.

**Section transition:**
- Timeline line continues past last entry and morphs into decorative element leading into Publications

### 4. Publications (Homepage Section)

**Homepage:** 6-8 curated highlights only.

**Entry design:**
- Monospace year on left
- Title in serif medium weight
- Journal name italic beneath
- Authors in small text
- Theme as subtle pill
- Hover: faint terra tint, arrow slides right
- Cascade stagger at 0.03s

**CTA:** "View all 29+ publications" links to `/publications`

### 5. Publications Archive Page (`/publications`)

**Features:**
- Search bar (debounced, searches title/authors/journal)
- Theme filter pills (All, Infectious Disease, Nutrition, Maternal & Child Health, Health Financing, Health Systems)
- Year filter (dropdown or horizontal year tabs)
- Results count ("Showing 12 of 29 publications")
- Full entries with title, authors, journal, year, theme tag, external link
- Citation copy button: generates APA 7th edition format from available fields (Author(s), Year, Title, Journal). Since DOI/volume/issue may not be in the data, the citation is approximate with a note. Toast notification: "Citation copied to clipboard" (2s auto-dismiss).
- Pagination: 15 items per page with "Previous" / "Next" text links and page numbers. No infinite scroll (pagination is more predictable and URL-addressable via `?page=2`).

**Empty state:** When filters/search produce zero results, show: "No publications match your search." in muted body text, centered, with a "Clear filters" text link beneath.

**Loading state:** Archive pages are statically rendered (SSG), so no loading spinner needed. Filter/search operations are client-side and instant.

**Visual language:** Matches homepage section design exactly.

### 6. PRAXIS (Case Study)

**Structure:** Vertical narrative in 4 beats, each roughly viewport height:

1. **The Problem** — Opening statement about evaluation challenges. Large serif, editorial weight. 1-2 sentences.
2. **The Approach** — How PRAXIS works in plain language. Short paragraph + 3-4 capabilities as indented text with terra-colored em dashes (no icons, no checkmarks).
3. **In Practice** — Representative scenario describing how PRAXIS was applied to evaluate a CVE program. Data visualization: a horizontal stacked bar chart comparing "Before PRAXIS" vs "After PRAXIS" across 4 dimensions (Relevance, Coherence, Effectiveness, Sustainability) rated 1-5. The bars use terra shades (lighter = before, darker = after). Labels on left, values on right. All data is placeholder/representative and clearly labeled as illustrative.
4. **The Result** — One compelling outcome stat in large display type with counter animation. Brief contextual sentence beneath.

**Visual environment:**
- Slightly warmer background (faint terra radial gradient)
- Top and bottom borders with terra gradient
- Scroll-linked reveals for each beat

**CTAs at the end:**
- "Explore PRAXIS" — links to full PRAXIS website (primary, terra bg)
- "View Source on GitHub" — secondary, outline style

**No terminal mockup.**

### 7. Writing (Homepage Section)

**Homepage:** 3-4 pieces. Featured card + compact rows.

**Featured card:**
- Overline: publication name in small caps
- Title in large serif
- 2-line excerpt in body text
- "Read" link with arrow
- Thin terra top border

**Row entries:**
- Year (monospace), title (serif medium), publication (italic, muted), arrow link
- Hover: faint terra tint, arrow slides
- Non-linked pieces (e.g., COP28) display without arrow, no dead-end feel

**Pull quote:** One striking line surfaced between entries (maximum one per section).

**CTA:** "View all writing" links to `/writing`

**Content:** I will write additional pieces in Emmanuel's voice: authoritative, evidence-focused, grounded in field experience. No dashes. Written to minimize AI content detection.

### 8. Writing Archive Page (`/writing`)

**Features:**
- All commentary and thought pieces displayed in a list
- Search bar (debounced, searches title/description/publication)
- Filter pills by publication/outlet (All + unique publication names from data)
- Results count ("Showing 8 of 12 pieces")
- Featured piece at top: large title, excerpt, publication name, date, read link
- Remaining entries as compact rows matching publications archive visual language
- Pagination: 10 items per page with Previous/Next and page numbers

**Empty state:** "No writing pieces match your search." centered, muted, with "Clear filters" link.

**Loading state:** Statically rendered (SSG), client-side filtering is instant.

**Responsive:** Same mobile behavior as publications archive (stacked layout, full-width search).

### 9. Contact

**Closing statement:**
- Two-line statement in display serif. First line sets up the invitation, second grounds it. Compelling, not generic. Written in Emmanuel's voice.

**Contact method:**
- No exposed email address
- LinkedIn as primary contact channel, prominently placed
- Social links in a vertical stack (desktop) with platform name and brief descriptor:
  - LinkedIn — Professional network
  - Google Scholar — Research profile
  - GitHub — Open source work
  - ResearchGate — Academic community
- Arrow hover treatment consistent with rest of site

**No contact form. No location. No timezone.**

**Responsive (mobile, Contact):**
- Social links stack vertically, full width, with descriptors beneath each.
- Closing statement scales down but remains serif display.

### 10. Header

- "ENO." logo with terra dot that pulses once on load
- Active section indicator: a single shared `<span>` element positioned absolutely beneath the nav links, translates its `left` and `width` to match the currently active link. Driven by Intersection Observer tracking which section is in viewport. Transition: 0.3s out-expo.
- Scroll behavior: backdrop blur + subtle height reduction (py-6 to py-4) past hero
- Mobile: full-screen overlay with items sliding in from right, staggered. Theme toggle inside menu on mobile.

### 11. Footer

- Two rows. Top: navigation links + social profile links. Bottom: copyright + colophon.
- No "Designed & built in Geneva" or location references
- Thin terra-to-gold gradient line at top (visual full stop)
- "Back to top" text link, aligned right, smooth scroll

---

## Animation System

### Timing Functions
- Primary: cubic-bezier(0.16, 1, 0.3, 1) — out-expo
- Secondary: cubic-bezier(0.25, 1, 0.5, 1) — out-quart
- Grain: 8s infinite, 10 steps

### Duration Ranges
- Micro-interactions (hovers, arrows): 0.2-0.3s
- Content reveals: 0.6-0.9s
- Hero entrance sequence: 0.6s delay, then 0.1s stagger
- Counters: 2.0-2.2s with easeOutQuart

### Motion Respect
- All animations check `useReducedMotion()` hook
- Reduced motion: instant reveals, no parallax, no letter animations
- Grain overlay: always active (non-motion, decorative)

### Key Techniques
1. Word-by-word blur-in (Hero name)
2. SVG stroke draw (portrait frame, timeline line)
3. Scroll-linked parallax (portrait, backgrounds)
4. Scroll-linked progress (timeline, bio accent line)
5. Intersection Observer reveals (all sections)
6. Counter animation with easeOutQuart (stats, PRAXIS result)
7. Magnetic/sliding underlines (nav, links)
8. Stagger cascades (publications, experience cards)

---

## Content Requirements

### Data to Source/Create
- Complete list of all 29+ publications (currently 10 in content.ts)
- Additional writing pieces (to be written in Emmanuel's voice)
- PRAXIS case study narrative (representative scenario)
- Compelling closing statement for Contact section
- SVG world map data for 6 countries
- Placeholder image slots (portrait, about portrait)

### Writing Style Guide (for AI-authored pieces)
- Authoritative, evidence-focused
- Grounded in field experience
- No dashes (em dashes, en dashes)
- Academic but accessible
- First person where appropriate
- Cite specific methodologies, countries, contexts
- Minimize AI detection: varied sentence length, specific details, occasional imperfection

---

## Technical Notes

### Performance
- Next.js Image optimization for all photos
- Lazy load below-fold sections
- Debounced search on archive pages
- will-change hints on animated elements, removed after animation completes
- SVG map inlined or loaded as component (not external fetch)

### SEO
- Metadata API for all routes
- OpenGraph and Twitter Cards
- JSON-LD structured data (Person, ScholarlyArticle for publications)
- Sitemap generation for all routes
- Semantic heading hierarchy per page

### Theme
- Dark mode default, class-based toggle
- localStorage persistence
- All colors defined via CSS custom properties in Tailwind config
- Smooth color transitions on toggle (0.3s)

### Browser Support
- Modern evergreen browsers
- Graceful degradation for older browsers (no animations, static layouts)
- backdrop-filter fallback for Safari

---

## Data Model Updates (content.ts)

The following TypeScript interfaces must be updated or added to support the spec:

```typescript
// Expertise with tooltip support
interface ExpertiseTag {
  label: string;
  tooltip?: string; // e.g., "Difference-in-Differences"
}

// Experience with parseable dates for duration bars
interface ExperienceEntry {
  role: string;
  organization: string;
  location: string; // kept for data, not displayed prominently
  period: string; // display string e.g., "2021 – Present"
  startYear: number; // e.g., 2021
  endYear: number; // e.g., 2026 (current year for "Present")
  description: string;
}

// World map country data
interface MapCountry {
  name: string;
  ids: string[]; // ISO 3166-1 numeric codes for topojson lookup
  opacity: number; // 0.4 to 1.0
  labelPosition: { x: number; y: number }; // SVG coordinates for label
}

// PRAXIS case study narrative
interface PraxisBeat {
  id: 'problem' | 'approach' | 'practice' | 'result';
  heading: string;
  content: string; // paragraph text
  stat?: { value: number; suffix: string; label: string }; // for "The Result" beat
  chart?: PraxisChartData; // for "In Practice" beat
}

interface PraxisChartData {
  dimensions: string[]; // ["Relevance", "Coherence", "Effectiveness", "Sustainability"]
  before: number[]; // [2, 1.5, 2, 1]
  after: number[]; // [4, 3.5, 4.5, 4]
}

// Publication (updated)
interface Publication {
  year: number;
  title: string;
  journal: string;
  authors: string;
  theme: string; // must match filter pill labels exactly
  url?: string;
}

// Writing piece
interface WritingPiece {
  year: number;
  publication: string;
  title: string;
  description: string;
  url?: string;
  featured?: boolean;
}

// Contact (updated — no email)
interface Contact {
  socials: {
    platform: string;
    descriptor: string;
    url: string;
  }[];
}
```

### Content changes required:
1. Remove `email` field from `siteContent.contact`
2. Convert `expertise: string[]` to `expertise: ExpertiseTag[]`
3. Add `startYear` and `endYear` to each experience entry
4. Add `mapCountries: MapCountry[]` to `siteContent.about`
5. Replace `siteContent.praxis` with `PraxisBeat[]` structure
6. Add `featured: boolean` to writing entries
7. Rewrite bio paragraphs to remove employer/location references
8. Remove location references from affiliations
9. Update sitemap.ts to include `/publications` and `/writing` routes

---

## Explicit Removals from Current Codebase

To avoid ambiguity, these specific elements must be removed or replaced:

1. **Hero:** "Currently: M&E Specialist at GCERF / Geneva, Switzerland" floating card (Hero.tsx lines ~182-191)
2. **Content:** `email` field from `siteContent.contact` (content.ts line ~102)
3. **Content:** "Currently serving as an M&E Specialist... at GCERF... in Geneva" from bio text (content.ts line ~21)
4. **Content:** Any Geneva/GCERF references in `affiliations` array
5. **Contact:** Large mailto email link (Contact.tsx lines ~56-64)
6. **PRAXIS:** Terminal mockup component (Praxis.tsx lines ~78-125)
7. **Footer:** Any location-specific text in affiliations display
