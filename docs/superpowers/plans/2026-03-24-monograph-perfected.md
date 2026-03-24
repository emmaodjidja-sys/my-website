# The Monograph — Perfected: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the existing Next.js portfolio from editorial foundation to award-caliber execution with refined animations, case study storytelling, archive pages, and world map.

**Architecture:** Modify the existing Next.js 14 App Router codebase in-place. Update the centralized content data model first (content.ts), then rebuild each section component, then add new routes (/publications, /writing). Shared utilities (Toast, Pagination, citation helpers) are extracted into focused components.

**Tech Stack:** Next.js 14, Tailwind CSS 3, Framer Motion 11, TypeScript 5

**Spec:** `docs/superpowers/specs/2026-03-24-monograph-perfected-design.md`

---

## File Structure

### Files to Create
- `src/lib/types.ts` — TypeScript interfaces for all content types
- `src/components/Toast.tsx` — Auto-dismiss toast notification component
- `src/components/Pagination.tsx` — Reusable pagination with Previous/Next and page numbers
- `src/components/WorldMap.tsx` — SVG world map component with highlighted countries
- `src/components/PraxisChart.tsx` — Horizontal bar chart for PRAXIS case study
- `src/components/Tooltip.tsx` — Lightweight hover tooltip for expertise tags (with keyboard accessibility)
- `src/app/publications/page.tsx` — Server component wrapper with metadata for publications archive
- `src/app/publications/PublicationsClient.tsx` — Client-side interactive publications archive
- `src/app/writing/page.tsx` — Server component wrapper with metadata for writing archive
- `src/app/writing/WritingClient.tsx` — Client-side interactive writing archive

### Files to Modify
- `src/lib/content.ts` — Updated data model, new content, bio rewrite, additional publications/writing
- `src/app/globals.css` — New styles (pull quote border, bio progress, tooltip, toast)
- `tailwind.config.ts` — Add monospace font family
- `src/app/page.tsx` — Updated JSON-LD (remove employer, email; add LinkedIn)
- `src/app/layout.tsx` — Remove GCERF from metadata keywords
- `src/app/sitemap.ts` — Add /publications and /writing routes
- `src/sections/Hero.tsx` — Word-by-word animation, stats cards, scroll cue, remove GCERF card
- `src/sections/About.tsx` — Pull quote with terra rule, portrait frame, bio progress, credentials grid with tooltips, world map
- `src/sections/Experience.tsx` — Scroll-driven timeline, duration bars, card styling
- `src/sections/Publications.tsx` — Curated highlights only, "View all" CTA
- `src/sections/Praxis.tsx` — 4-beat case study narrative, chart, remove terminal
- `src/sections/Writing.tsx` — Featured card + compact rows, "View all" CTA
- `src/sections/Contact.tsx` — Remove email, add social stack with descriptors, new closing statement
- `src/components/Header.tsx` — Active section indicator, scroll height reduction, mobile slide-in, logo pulse
- `src/components/Footer.tsx` — Two-row layout, remove affiliations, gradient top border, back to top

---

## Task 1: TypeScript Interfaces

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 1: Create type definitions file**

```typescript
// src/lib/types.ts

export interface ExpertiseTag {
  label: string
  tooltip?: string
}

// Note: uses `org` (not `organization`) to match existing codebase convention
export interface ExperienceEntry {
  period: string
  role: string
  org: string
  location: string
  description: string
  startYear: number
  endYear: number
}

export interface MapCountry {
  name: string
  ids: string[]
  opacity: number
  labelPosition: { x: number; y: number }
}

// Note: `capabilities` field is a plan extension beyond the spec — needed for
// the "Approach" beat's capability list. The spec describes this content but
// did not include it in the interface definition.
export interface PraxisBeat {
  id: 'problem' | 'approach' | 'practice' | 'result'
  heading: string
  content: string
  capabilities?: string[]
  stat?: { value: number; suffix: string; label: string }
  chart?: PraxisChartData
}

export interface PraxisChartData {
  dimensions: string[]
  before: number[]
  after: number[]
}

export interface Publication {
  year: number
  title: string
  journal: string
  authors: string
  theme: string
  url?: string
}

export interface WritingPiece {
  year: number
  publication: string
  title: string
  description: string
  url?: string | null
  featured?: boolean
}

export interface SocialLink {
  platform: string
  descriptor: string
  url: string
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd C:/Users/emmao/my-website && npx tsc --noEmit src/lib/types.ts`
Expected: No errors

---

## Task 2: Update Content Data Model

**Files:**
- Modify: `src/lib/content.ts`

This is the foundation. All other tasks depend on this.

- [ ] **Step 1: Rewrite content.ts with updated data model**

Replace the entire file. Key changes:
1. Import types from `./types`
2. Remove `email` from contact
3. Restructure contact as `socials: SocialLink[]`
4. Convert `expertise` from `string[]` to `ExpertiseTag[]` with tooltips
5. Add `startYear`/`endYear` to each experience entry
6. Add `mapCountries` to about
7. Rewrite bio paragraphs to remove all GCERF/Geneva/employer references
8. Replace `praxis` object with `praxisBeats: PraxisBeat[]` array
9. Add `featured` boolean to writing entries
10. Remove location-specific affiliations
11. Add all 29+ publications (expand from 10)
12. Write additional writing pieces in Emmanuel's voice (no dashes, authoritative, evidence-focused)
13. Add compelling closing statement for contact section

The bio should be rewritten to speak timelessly about expertise and impact without anchoring to any specific position. Example first paragraph: "Originally from Ghana, I have spent over a decade working at the frontlines of global health and international development, from pastoralist communities in South Sudan to health facilities in rural Burundi and research institutions in the United Kingdom."

The PRAXIS beats structure:
```typescript
praxisBeats: [
  {
    id: 'problem',
    heading: 'The Challenge',
    content: 'Evaluation in fragile and conflict-affected settings demands rigour...',
  },
  {
    id: 'approach',
    heading: 'The Approach',
    content: 'PRAXIS transforms Claude into an evaluation methodologist...',
    capabilities: [
      '20+ evaluation approaches spanning formative, summative, and developmental evaluation',
      'Validated measurement scales adapted for low-resource settings',
      'Fragile and conflict-affected context methods built on field experience',
      'Mixed-methods designs integrating quantitative rigour with qualitative depth',
    ],
  },
  {
    id: 'practice',
    heading: 'In Practice',
    content: 'When tasked with evaluating a countering violent extremism programme across three Sahelian countries...',
    chart: {
      dimensions: ['Relevance', 'Coherence', 'Effectiveness', 'Sustainability'],
      before: [2.1, 1.8, 1.5, 1.2],
      after: [4.3, 3.8, 4.1, 3.6],
    },
  },
  {
    id: 'result',
    heading: 'The Result',
    content: 'Structured evaluation frameworks reduce assessment time while improving methodological consistency.',
    stat: { value: 40, suffix: '%', label: 'reduction in evaluation design time' },
  },
]
```

Contact socials structure:
```typescript
contact: {
  closingStatement: {
    line1: 'The best evidence is built in partnership.',
    line2: 'If you are exploring a research collaboration, designing an evaluation framework, or rethinking how evidence shapes policy, I would welcome the conversation.',
  },
  socials: [
    { platform: 'LinkedIn', descriptor: 'Professional network', url: 'https://www.linkedin.com/in/emmanuel-odjidja/' },
    { platform: 'Google Scholar', descriptor: 'Research profile', url: 'https://scholar.google.co.uk/citations?user=jIiNtLYAAAAJ&hl=en' },
    { platform: 'GitHub', descriptor: 'Open source work', url: 'https://github.com/emmaodjidja-sys' },
    { platform: 'ResearchGate', descriptor: 'Academic community', url: 'https://www.researchgate.net/profile/Emmanuel_Odjidja' },
  ],
}
```

Additional writing pieces to create (in Emmanuel's voice, no dashes):
- "The Evaluation Gap: Why Development Programmes Fail to Prove Their Worth" (2025, Commentary)
- "Evidence in Fragile Settings: Lessons from a Decade of Field Evaluation" (2025, Reflection)
- "When Data Meets Context: The Case for Mixed Methods in Global Health" (2024, Analysis)
- "Rethinking Nutrition Surveillance in Conflict Zones" (2023, Field Note)

Each piece needs a 2-3 sentence description written in Emmanuel's voice: authoritative, grounded in specifics, no dashes, varied sentence structure.

For the full 29+ publications: source the remaining ~19 from the live site at emmanuelneneodjidja.org. Use WebFetch to pull the complete list and add them to the data.

- [ ] **Step 2: Verify the content compiles**

Run: `cd C:/Users/emmao/my-website && npx tsc --noEmit`
Expected: Type errors for components that haven't been updated yet (expected at this stage, but content.ts itself should have no errors)

---

## Task 3: Update Global Styles

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add new component styles to globals.css**

Add after existing `@layer components` entries:

```css
/* ── Pull quote terra rule ── */
.pull-quote-rule {
  position: relative;
  padding-left: 1.5rem;
}
.pull-quote-rule::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.25em;
  bottom: 0.25em;
  width: 3px;
  background: #c4653a;
}

/* ── Bio reading progress (local) ── */
.bio-progress {
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  background: linear-gradient(180deg, #c4653a, #c4653a);
  transform-origin: top;
  will-change: transform;
}

/* ── Toast notification ── */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9998;
  padding: 0.75rem 1.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* ── Tooltip ── */
.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  pointer-events: none;
  z-index: 50;
}

/* ── Hand-drawn portrait border ── */
.portrait-editorial {
  position: relative;
}
.portrait-editorial::before {
  content: '';
  position: absolute;
  inset: -6px;
  border: 1.5px solid #c4653a;
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
  /* Slightly irregular path via clip-path */
  clip-path: polygon(
    0% 1%, 2% 0%, 98% 0.5%, 100% 2%,
    99.5% 98%, 100% 100%, 1% 99.5%, 0% 97%
  );
}

/* ── Grain overlay fix: use .grain-overlay instead of .grain ── */
.grain-overlay::after {
  content: '';
  position: fixed;
  inset: -100%;
  width: 300%;
  height: 300%;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain 8s steps(10) infinite;
}
.light .grain-overlay::after { opacity: 0.012; }
```

- [ ] **Step 2: Verify styles don't break existing layout**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds (may have warnings about unused styles, that's fine)

---

## Task 4: Update Tailwind Config

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add monospace font family**

Add to `theme.extend.fontFamily`:
```typescript
mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
```

**Note on `light:` variant:** The existing codebase uses `light:` as a CSS class prefix (e.g., `light:bg-cream-50`). This is NOT a Tailwind variant — it works via CSS descendant selectors defined in `globals.css` (`.light body { ... }` and `.light .component { ... }`). The existing code already applies these via plain CSS class selectors, not Tailwind plugins. Continue using the same pattern.

- [ ] **Step 2: Verify build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

---

## Task 5: Shared Components — Toast, Tooltip, Pagination

**Files:**
- Create: `src/components/Toast.tsx`
- Create: `src/components/Tooltip.tsx`
- Create: `src/components/Pagination.tsx`

- [ ] **Step 1: Create Toast component**

```typescript
// src/components/Toast.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string
  visible: boolean
  onDismiss: () => void
  duration?: number
}

export function Toast({ message, visible, onDismiss, duration = 2000 }: ToastProps) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [visible, onDismiss, duration])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="toast bg-ink-800 text-cream-200 border border-ink-700/60 light:bg-cream-100 light:text-ink-800 light:border-cream-300"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Create Tooltip component**

```typescript
// src/components/Tooltip.tsx
'use client'

import { useState, useId, ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false)
  const id = useId()

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
      aria-describedby={show ? id : undefined}
    >
      {children}
      {show && (
        <span
          id={id}
          role="tooltip"
          className="tooltip bg-ink-800 text-cream-200 border border-ink-700/60 light:bg-cream-100 light:text-ink-800 light:border-cream-300"
        >
          {content}
        </span>
      )}
    </span>
  )
}
```

- [ ] **Step 3: Create Pagination component**

```typescript
// src/components/Pagination.tsx
'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-caption font-medium text-ink-400 hover:text-terra-500 disabled:opacity-30 disabled:hover:text-ink-400 transition-colors duration-300 px-3 py-2 light:text-ink-500"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`text-caption font-medium px-3 py-2 transition-colors duration-300 ${
            page === currentPage
              ? 'text-terra-500'
              : 'text-ink-500 hover:text-cream-200 light:hover:text-ink-800'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-caption font-medium text-ink-400 hover:text-terra-500 disabled:opacity-30 disabled:hover:text-ink-400 transition-colors duration-300 px-3 py-2 light:text-ink-500"
      >
        Next
      </button>
    </nav>
  )
}
```

- [ ] **Step 4: Verify all components compile**

Run: `cd C:/Users/emmao/my-website && npx tsc --noEmit`
Expected: No errors in the new component files

---

## Task 6: World Map Component

**Files:**
- Create: `src/components/WorldMap.tsx`

- [ ] **Step 1: Create SVG world map component**

This component renders a simplified SVG map focused on Africa, Middle East, and South Asia.

**SVG data sourcing:** Use simplified country boundary SVG paths. The implementer should:
1. Download a simplified world SVG from Natural Earth (naturalearthdata.com) at 110m resolution
2. Extract only the paths for countries visible in the Africa-to-South-Asia crop
3. Or use an inline approach: define simplified `<path>` elements for the ~50 visible countries with `d` attributes sourced from a public-domain SVG

**Component skeleton:**
```typescript
// src/components/WorldMap.tsx
'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import type { MapCountry } from '@/lib/types'

// Simplified SVG paths for highlighted countries
// These are placeholder d-attributes — the implementer must source actual
// simplified paths from Natural Earth 110m or equivalent public-domain source
const COUNTRY_PATHS: Record<string, string> = {
  GHA: 'M...', // Ghana
  SSD: 'M...', // South Sudan
  BDI: 'M...', // Burundi
  BFA: 'M...', // Burkina Faso
  MLI: 'M...', // Mali
  NER: 'M...', // Niger
  TUN: 'M...', // Tunisia
  LKA: 'M...', // Sri Lanka
}

// Background country paths (remaining visible countries)
const BG_PATHS: string[] = [
  // Array of d-attributes for ~40 non-highlighted countries in the crop region
]

interface WorldMapProps {
  countries: MapCountry[]
}

export function WorldMap({ countries }: WorldMapProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <svg
      ref={ref}
      viewBox="-20 -15 110 60" // Crop: Africa through South Asia
      className="w-full max-w-[600px] mx-auto lg:mx-0"
      aria-label="Map showing countries where Emmanuel has worked"
      role="img"
    >
      {/* Background countries */}
      {BG_PATHS.map((d, i) => (
        <path key={i} d={d} className="fill-ink-800 light:fill-cream-200 stroke-ink-700/20 light:stroke-cream-300/30" strokeWidth={0.1} />
      ))}

      {/* Highlighted countries */}
      {countries.map((country) =>
        country.ids.map((id) => (
          <motion.path
            key={id}
            d={COUNTRY_PATHS[id] || ''}
            fill="#c4653a"
            fillOpacity={country.opacity}
            strokeWidth={0.15}
            className="stroke-terra-700/30"
            initial={reduced ? {} : { fillOpacity: 0 }}
            animate={inView ? { fillOpacity: country.opacity } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))
      )}

      {/* Country labels */}
      {countries.map((country) => (
        <text
          key={country.name}
          x={country.labelPosition.x}
          y={country.labelPosition.y}
          className="fill-cream-200 light:fill-ink-600"
          fontSize={1.8}
          fontWeight={600}
          letterSpacing={0.3}
          textAnchor="middle"
          style={{ fontFamily: 'var(--font-source)', textTransform: 'uppercase' }}
        >
          {country.name}
        </text>
      ))}
    </svg>
  )
}
```

Note: The actual SVG `d` attributes must be sourced during implementation. The implementer should search for "simplified world map svg paths" or extract from a Natural Earth SVG export. The `viewBox` coordinates will need adjustment based on the actual path coordinate system used.

Responsive: `className="w-full max-w-[600px] mx-auto lg:mx-0"`

- [ ] **Step 2: Verify component compiles**

Run: `cd C:/Users/emmao/my-website && npx tsc --noEmit src/components/WorldMap.tsx`
Expected: No errors

---

## Task 7: PRAXIS Chart Component

**Files:**
- Create: `src/components/PraxisChart.tsx`

- [ ] **Step 1: Create horizontal bar chart component**

```typescript
// src/components/PraxisChart.tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { PraxisChartData } from '@/lib/types'

interface PraxisChartProps {
  data: PraxisChartData
  inView: boolean
}

export function PraxisChart({ data, inView }: PraxisChartProps) {
  const reduced = useReducedMotion()
  const maxValue = 5

  return (
    <div className="space-y-6">
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-500 light:text-ink-400">
        Illustrative data
      </p>
      <div className="space-y-5">
        {data.dimensions.map((dim, i) => (
          <div key={dim} className="space-y-2">
            <div className="flex justify-between text-caption text-ink-400 light:text-ink-500">
              <span>{dim}</span>
              <span>{data.before[i].toFixed(1)} → {data.after[i].toFixed(1)}</span>
            </div>
            <div className="relative h-3 bg-ink-800/50 light:bg-cream-200">
              {/* After bar (behind, wider, darker) */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-terra-500"
                initial={{ width: 0 }}
                animate={inView ? { width: `${(data.after[i] / maxValue) * 100}%` } : {}}
                transition={reduced ? { duration: 0 } : { duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Before bar (on top, shorter, lighter — shows as lighter segment on the left) */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-terra-500/30"
                initial={{ width: 0 }}
                animate={inView ? { width: `${(data.before[i] / maxValue) * 100}%` } : {}}
                transition={reduced ? { duration: 0 } : { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-6 text-[0.7rem] text-ink-500 light:text-ink-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-2 bg-terra-500/30" /> Before PRAXIS
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-2 bg-terra-500" /> After PRAXIS
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify component compiles**

Run: `cd C:/Users/emmao/my-website && npx tsc --noEmit src/components/PraxisChart.tsx`
Expected: No errors

---

## Task 8: Rebuild Hero Section

**Files:**
- Modify: `src/sections/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

Key changes:
1. Replace batch `rise()` on name with word-by-word animation (3 motion.span elements for Emmanuel, Nene, Odjidja, each with 0.15s stagger, 0.6s duration, blur-to-sharp)
2. Replace AnimatedStat inline component with vertical cards layout: each stat gets a card with faint background, large serif number, small label, and a bottom border that fills via motion width animation
3. Remove the floating "Currently: M&E Specialist at GCERF / Geneva, Switzerland" card entirely (lines 181-191)
4. Add SVG stroke animation on portrait frame: a `<motion.rect>` that draws via `pathLength` from 0 to 1
5. Replace bouncing arrow scroll cue with thin vertical line + "Scroll" overline. Fade out tied to scrollY 0-100px. Appears after 2.5s delay.
6. Background: animate radial gradient subtly (use motion.div with slow scale oscillation)
7. Stats cards: three items in a row, each with `bg-ink-850/50 light:bg-cream-100 border border-ink-800/30 light:border-cream-300 p-4` and a bottom `<motion.div>` bar that fills left-to-right as the counter runs

Mobile: single column, portrait hidden (preserved from current), stats as horizontal compact row.

- [ ] **Step 2: Verify hero renders**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Visual check**

Run: `cd C:/Users/emmao/my-website && npm run dev`
Open http://localhost:3000 in browser. Verify:
- Name animates word-by-word with blur
- No GCERF card visible
- Stats appear as cards with filling bottom border
- Scroll cue shows "Scroll" text with vertical line
- Portrait has SVG stroke frame

---

## Task 9: Rebuild About Section

**Files:**
- Modify: `src/sections/About.tsx`

- [ ] **Step 1: Rewrite About.tsx**

Key changes:
1. Pull quote: add `pull-quote-rule` class for terra left border. Animate line-by-line (split quote text by line breaks or words, wrap each line in motion.span with 0.15s stagger). Add scale 0.97 to 1.0.
2. Portrait: wrap in `portrait-editorial` class for hand-drawn SVG border. Add small-caps caption beneath: name and "M&E Specialist | Researcher | Epidemiologist". No location.
3. Bio: add relative container with `bio-progress` div. Track scroll position within the bio section using `useScroll` and `useTransform` to set scaleY of the progress line from 0 to 1.
4. Credentials grid: change from 2-column to 3-column (Education, Languages, Expertise). Each with overline label, content, bottom border. Import `Tooltip` component for expertise tags.
5. Expertise tags: map over `ExpertiseTag[]`, wrap each in `<Tooltip content={tag.tooltip}>` when tooltip exists.
6. World map: import and render `<WorldMap />` at the bottom of the section.
7. Mobile: portrait non-sticky (remove `lg:sticky lg:top-28`, replace with conditional), credentials stack to 1 column.

- [ ] **Step 2: Verify build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

---

## Task 10: Rebuild Experience Section

**Files:**
- Modify: `src/sections/Experience.tsx`

- [ ] **Step 1: Rewrite Experience.tsx**

Key changes:
1. Timeline line: replace static `<div>` with `<motion.div>` whose `scaleY` is driven by `useScroll`/`useTransform` on the section. The line grows from 0 to 1 as you scroll through the section.
2. Timeline dots: each dot starts as `bg-ink-600` and transitions to `bg-terra-500` when its entry enters viewport. Use individual `whileInView` triggers.
3. Role cards: add card background `bg-ink-850/30 light:bg-cream-100/60`, 2px left terra border `border-l-2 border-terra-500`, hover `hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink-950/20` transition.
4. Duration bar: beneath each period text, add a thin `<div>` whose width is proportional to `(endYear - startYear)` relative to the longest tenure. Calculate `maxDuration` from the data. Bar color: `bg-terra-500/40`.
5. Remove the description subtext about "from pastoralist communities... to evaluation design in Geneva" (contains Geneva reference).
6. Mobile: hide timeline line, show entries with top terra border `border-t-2 border-terra-500/30`.

- [ ] **Step 2: Verify build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

---

## Task 11: Rebuild Publications Homepage Section

**Files:**
- Modify: `src/sections/Publications.tsx`

- [ ] **Step 1: Rewrite Publications.tsx as curated highlights**

Key changes:
1. Remove search and filter controls from homepage section
2. Show only the first 8 publications from `siteContent.publications` (assumes they are ordered by importance/recency)
3. Keep the existing entry design (year, title, journal, authors, theme pill, hover arrow)
4. Remove the "View all on Google Scholar" link
5. Add a "View all 29+ publications" CTA at the bottom that links to `/publications`:
```tsx
<Link href="/publications" className="arrow-link mt-12 inline-flex">
  View all 29+ publications
  <svg ...arrow icon... />
</Link>
```
6. Import `Link` from `next/link`

- [ ] **Step 2: Verify build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

---

## Task 12: Rebuild PRAXIS Case Study Section

**Files:**
- Modify: `src/sections/Praxis.tsx`

- [ ] **Step 1: Rewrite Praxis.tsx as 4-beat narrative**

Remove the entire terminal mockup. Replace with vertical narrative:

1. **Beat 1 (The Problem):** Large serif text, 1-2 sentences about evaluation challenges. Full viewport feel (generous padding).
2. **Beat 2 (The Approach):** Paragraph + capabilities list. Each capability prefixed with a terra-colored em dash `<span className="text-terra-500 mr-2">&mdash;</span>` and indented.
3. **Beat 3 (In Practice):** Scenario text + `<PraxisChart>` component. Track viewport entry with `useInView` to trigger chart animation.
4. **Beat 4 (The Result):** Large display stat with counter animation (reuse AnimatedStat pattern from Hero). Contextual sentence beneath.

CTAs at the end:
- "Explore PRAXIS" primary button linking to PRAXIS website
- "View Source on GitHub" secondary text link

Keep: warm background gradient, top/bottom terra gradient borders, scroll-linked reveals.

Each beat uses `<Reveal>` with increasing delays.

- [ ] **Step 2: Verify build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

---

## Task 13: Rebuild Writing Homepage Section

**Files:**
- Modify: `src/sections/Writing.tsx`

- [ ] **Step 1: Rewrite Writing.tsx with featured card + rows**

Key changes:
1. Filter writing entries: show only those with `featured: true` or the first 4 entries
2. First entry gets featured card treatment:
   - Overline: publication name in small caps (`overline` class)
   - Title in `text-h2` serif
   - 2-line excerpt in body text
   - "Read" arrow link
   - Thin terra top border: `border-t-2 border-terra-500`
3. Remaining entries as compact rows (existing grid layout)
4. Add pull quote between featured and rows (one striking line, hardcoded or from content)
5. Add "View all writing" CTA linking to `/writing`:
```tsx
<Link href="/writing" className="arrow-link mt-12 inline-flex">
  View all writing
  <svg ...arrow icon... />
</Link>
```

- [ ] **Step 2: Verify build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

---

## Task 14: Rebuild Contact Section

**Files:**
- Modify: `src/sections/Contact.tsx`

- [ ] **Step 1: Rewrite Contact.tsx**

Key changes:
1. Remove the large email mailto link entirely
2. Replace headline with `siteContent.contact.closingStatement.line1` in display serif with terra italic accent word, and `line2` beneath in body text
3. Social links as vertical stack (desktop) / full-width stack (mobile):
   ```tsx
   {contact.socials.map((social) => (
     <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer"
        className="group flex items-center justify-between py-4 border-b border-ink-800/30 light:border-cream-300/30">
       <div>
         <span className="text-body font-medium text-cream-100 group-hover:text-terra-500 transition-colors light:text-ink-800">
           {social.platform}
         </span>
         <span className="block text-caption text-ink-500 mt-0.5 light:text-ink-400">
           {social.descriptor}
         </span>
       </div>
       <svg ...arrow... className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
     </a>
   ))}
   ```
4. LinkedIn gets extra prominence: first in the list, slightly larger text

- [ ] **Step 2: Verify build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

---

## Task 15: Update Header with Active Section Indicator

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Rewrite Header.tsx**

Key changes:
1. **Logo pulse:** Add a one-time animation to the terra dot:
   ```tsx
   <motion.span
     className="text-terra-500"
     animate={{ scale: [1, 1.3, 1] }}
     transition={{ delay: 0.8, duration: 0.6, times: [0, 0.5, 1] }}
   >.</motion.span>
   ```
2. **Active section indicator:** Add `useEffect` with `IntersectionObserver` that tracks all section IDs. Store active section in state. Render a shared `<motion.span>` positioned absolutely beneath the nav links:
   ```tsx
   <motion.span
     className="absolute bottom-0 h-[2px] bg-terra-500"
     animate={{ left: activeLeft, width: activeWidth }}
     transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
   />
   ```
   Use refs on each nav link to calculate left/width positions.
3. **Scroll height reduction:** Change `h-16` to `h-16` when not scrolled and `h-14` when scrolled. Add transition.
4. **Mobile menu:** Change slide direction from left (`x: -16`) to right (`x: 20`). Move ThemeToggle inside the mobile menu (remove from the header bar on mobile).

- [ ] **Step 2: Verify build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

---

## Task 16: Update Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Rewrite Footer.tsx**

Key changes:
1. Replace 3-column layout with 2-row layout
2. Top row: flex with navigation links (About, Experience, Research, PRAXIS, Writing, Contact as `<a href="#section">`) on the left + social profile links on the right
3. Remove affiliations section entirely (contains GCERF/Geneva references)
4. Bottom row: copyright on left, no quote (the quote in the current footer uses a dash)
5. Top border: replace solid `border-t` with gradient:
   ```tsx
   <div className="h-px bg-gradient-to-r from-terra-500/40 via-gold-400/20 to-transparent" />
   ```
6. Add "Back to top" text link aligned right:
   ```tsx
   <a href="#" className="text-caption text-ink-500 hover:text-terra-500 transition-colors">
     Back to top
   </a>
   ```

- [ ] **Step 2: Verify build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds

---

## Task 17: Publications Archive Page

**Files:**
- Create: `src/app/publications/page.tsx` (Server Component — metadata only)
- Create: `src/app/publications/PublicationsClient.tsx` (Client Component — interactive UI)

- [ ] **Step 1: Create the server component wrapper with metadata**

```typescript
// src/app/publications/page.tsx
import type { Metadata } from 'next'
import { PublicationsClient } from './PublicationsClient'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Peer-reviewed research spanning infectious disease, nutrition, maternal health, health systems, and the climate-conflict nexus.',
}

export default function PublicationsPage() {
  return <PublicationsClient />
}
```

- [ ] **Step 2: Create the client-side interactive component**

`src/app/publications/PublicationsClient.tsx` is a `'use client'` component with:
1. Minimal header: back arrow (`<Link href="/">`) + "Publications" title + `<ThemeToggle />`
2. Search bar (debounced 300ms with useEffect/setTimeout)
3. Theme filter pills (All + unique themes from publications data)
4. Year filter as horizontal tabs
5. Results count: "Showing X of Y publications"
6. Publication entries matching homepage design (year, title, journal, authors, theme, arrow)
7. Citation copy button on each entry: constructs APA 7 citation from data, copies to clipboard, shows Toast
8. Pagination component: 15 per page
9. Empty state: "No publications match your search." with "Clear filters" button
10. Import `Pagination`, `Toast` components

Citation generation helper:
```typescript
function formatAPA(pub: Publication): string {
  return `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}.`
}
```

- [ ] **Step 3: Verify the page renders**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds, /publications route exists

---

## Task 18: Writing Archive Page

**Files:**
- Create: `src/app/writing/page.tsx` (Server Component — metadata only)
- Create: `src/app/writing/WritingClient.tsx` (Client Component — interactive UI)

- [ ] **Step 1: Create the server component wrapper with metadata**

```typescript
// src/app/writing/page.tsx
import type { Metadata } from 'next'
import { WritingClient } from './WritingClient'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Commentary, analysis, and thought leadership on global health, evaluation, and international development.',
}

export default function WritingPage() {
  return <WritingClient />
}
```

- [ ] **Step 2: Create the client-side interactive component**

`src/app/writing/WritingClient.tsx` is a `'use client'` component with:
1. Minimal header with back arrow
2. Search bar (debounced, searches title/description/publication)
3. Filter pills by publication/outlet
4. Results count
5. Featured piece at top (first entry with `featured: true`)
6. Remaining entries as compact rows
7. Pagination: 10 per page
8. Empty state with "Clear filters"

- [ ] **Step 3: Verify the page renders**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds, /writing route exists

---

## Task 19: Update Page Infrastructure

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update JSON-LD in page.tsx**

Remove `worksFor` object (GCERF reference). Remove email. Add LinkedIn as primary `sameAs` link. Keep alumniOf, knowsAbout, and other sameAs links.

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Emmanuel Nene Odjidja',
  url: 'https://www.emmanuelneneodjidja.org',
  jobTitle: 'M&E Specialist, Researcher, Epidemiologist',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Queen Margaret University, Edinburgh',
  },
  knowsAbout: [
    'Impact Evaluation', 'Epidemiology', 'Global Health',
    'Programme Evaluation', 'Mixed Methods Research',
  ],
  sameAs: [
    'https://www.linkedin.com/in/emmanuel-odjidja/',
    'https://scholar.google.co.uk/citations?user=jIiNtLYAAAAJ&hl=en',
    'https://github.com/emmaodjidja-sys',
    'https://www.researchgate.net/profile/Emmanuel_Odjidja',
  ],
}
```

- [ ] **Step 2: Update metadata in layout.tsx**

Remove 'GCERF' from the keywords array.

- [ ] **Step 3: Update sitemap.ts**

Add /publications and /writing routes:
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.emmanuelneneodjidja.org',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.emmanuelneneodjidja.org/publications',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.emmanuelneneodjidja.org/writing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
```

- [ ] **Step 4: Verify full build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds with all routes

---

## Task 20: Final Integration & Visual QA

**Files:**
- All modified files

- [ ] **Step 1: Run full build**

Run: `cd C:/Users/emmao/my-website && npm run build`
Expected: Build succeeds with zero errors

- [ ] **Step 2: Start dev server and visually verify each section**

Run: `cd C:/Users/emmao/my-website && npm run dev`

Check each section in order:
1. Hero: word animation, stats cards, no GCERF, portrait frame, scroll cue
2. About: pull quote with terra rule, portrait frame, bio progress, credentials grid, tooltips, world map
3. Experience: scroll-driven timeline, illuminating dots, card styling, duration bars
4. Publications: 8 curated entries, "View all" link works
5. PRAXIS: 4-beat narrative, chart animates, CTAs link correctly
6. Writing: featured card, compact rows, "View all" link works
7. Contact: no email, compelling statement, social stack
8. Header: logo pulse, active indicator slides, height reduces on scroll
9. Footer: gradient top border, back to top, no affiliations
10. /publications: search, filters, pagination, citation copy, toast
11. /writing: search, filters, featured, pagination

- [ ] **Step 3: Check dark/light theme toggle on all sections**

Toggle theme and verify every section renders correctly in both modes.

- [ ] **Step 4: Check mobile responsiveness**

Use browser DevTools to test at 375px, 768px widths. Verify:
- Hero: single column, no portrait
- About: non-sticky portrait, stacked credentials
- Experience: no timeline line, terra border separators
- Header: hamburger menu with slide-from-right
- Footer: stacked layout
- Archive pages: full-width search, stacked entries

---

## Dependency Order

```
Task 1 (Types)
  → Task 2 (Content)
    → Task 3 (Styles) + Task 4 (Tailwind) + Task 5 (Shared Components)
      → Parallel group A (no WorldMap/PraxisChart dependency):
          Task 8 (Hero), Task 10 (Experience), Task 11 (Publications),
          Task 13 (Writing), Task 14 (Contact), Task 15 (Header), Task 16 (Footer)
      → Parallel group B (needs WorldMap/PraxisChart):
          Task 6 (WorldMap) → Task 9 (About)
          Task 7 (PraxisChart) → Task 12 (Praxis)
      → Task 17 (Publications Archive) + Task 18 (Writing Archive)
        → Task 19 (Page Infrastructure)
          → Task 20 (Final QA)
```

Group A and Group B can run fully in parallel. Tasks within each group can also run in parallel.

**Note on existing components:** `ReadingProgress.tsx` and `AnimatedCounter.tsx` remain unchanged. The Hero section implements its own inline counter animation (as it already does). ReadingProgress continues to be rendered in page.tsx.
