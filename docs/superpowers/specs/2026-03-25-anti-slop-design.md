# Anti-Slop Overhaul — Design Spec

## Goal

Reduce AI-generated aesthetic from the portfolio site. Target the two biggest tells: generic copy and uniform polish. Keep the existing design system (colors, fonts, components) intact.

## Changes

### 1. Remove ReadingProgress bar

**File:** `src/app/page.tsx`
Remove the `<ReadingProgress />` component and its import. No human designer adds a scroll progress bar to a single-page portfolio.

### 2. Rewrite tagline

**File:** `src/lib/content.ts`
- **Current:** `"Better Evidence for Bettering Lives."`
- **New:** `"I build evaluation systems in places where they're hardest to build."`

Why: The current tagline is alliterative AI-safe copy. The new one is specific, has tension, and reflects Emmanuel's actual career — designing evaluations in South Sudan, Burundi, the Sahel.

### 3. Rewrite CTAs

**File:** `src/sections/Hero.tsx`
- "View Research" → "Read the Research"
- "Get in Touch" → "Write to Me"

**File:** `src/sections/Contact.tsx`
- Heading: "The best evidence is built in partnership." → "If you're working on something that matters, let's talk."
- Button: "Send Message" → "Send"

**File:** `src/sections/Publications.tsx`
- "View all 29+ publications" → "All publications"

**File:** `src/sections/Writing.tsx`
- "View all writing" → "All writing"

Why: "View X" and "Get in Touch" are the two CTAs every AI portfolio generates. The replacements are more direct and human.

### 4. Publications — editorial rhythm break

**File:** `src/sections/Publications.tsx`
- Remove the description paragraph ("Peer-reviewed research spanning infectious disease...")
- Remove the overline "Research"
- Keep only the heading "Publications" — it speaks for itself
- This breaks the overline → heading → description pattern that every other section follows

### 5. Writing pull quote — full strength editorial aside

**File:** `src/sections/Writing.tsx`
- Change the pull quote from muted `text-cream-200/60` to full `text-cream-200 light:text-ink-600`
- Add `pull-quote-rule` class (the existing left terra border utility) to give it editorial weight
- This makes it feel like an intentional editorial element, not decoration

### 6. Vary animation timing on Publications rows

**File:** `src/sections/Publications.tsx`
- Change publication row animation duration from `0.5s` to `0.35s`
- Change easing from `[0.16, 1, 0.3, 1]` to `[0.25, 1, 0.5, 1]` (out-quart — snappier)
- Remove the stagger delay (`delay: i * 0.03` → remove)
- Publications are a list, not a ceremony. They should appear crisply, not float in one by one.

## Files Modified

1. `src/app/page.tsx` — remove ReadingProgress
2. `src/lib/content.ts` — tagline rewrite
3. `src/sections/Hero.tsx` — CTA rewrites
4. `src/sections/Contact.tsx` — heading and button rewrites
5. `src/sections/Publications.tsx` — remove description/overline, snap animations
6. `src/sections/Writing.tsx` — pull quote styling

## Out of Scope

- Color palette changes
- Typography changes
- Layout restructuring beyond Publications
- Component architecture changes
- New components
