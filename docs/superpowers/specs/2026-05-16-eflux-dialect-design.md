# E-flux Dialect Design Spec

**Date:** 2026-05-16
**Status:** Draft. Awaiting owner approval before implementation.
**Owner:** Emmanuel Nene Odjidja
**Reference sample:** `public/samples/d-eflux.html`
**Reference site:** https://www.e-flux.com

---

## 1. Background

The current site (`https://www.emmanuelneneodjidja.org`) was diagnosed in this iteration cycle as reading "AI generated" despite three rounds of fixes. The root cause was not surface polish but underlying posture: the page committed to the generic "designed personal portfolio" genre (Playfair serif headline, dark navy plus terracotta plus cream palette, hero stat tiles, eyebrow + headline + grid section rhythm). That genre is the 2025-2026 AI design canon. No amount of polishing made it unmistakably human.

This spec replaces the current visual language with a different posture entirely. The reference is the chrome of `e-flux.com`: monochrome, dense, swipeable image-led carousels, no warm accent color, no hero, no metric tiles, no serif anywhere. Soul is added through real first-person voice (the editor's note) and real visual content (10 research figures from owner's own published and working analyses, plus generated editorial journal covers for the 8 publications shown on the homepage).

This is not a re-skin. It is a rebuild of the IA, the component system, the asset pipeline, and the copy. Old components retire; new components replace them. Content data (`src/lib/content.ts`) gets restructured.

---

## 2. Design context

| | |
|---|---|
| **Audience** | Program officers at GCERF, USAID, DFID, EU and UN agencies, major foundations, European development ministries. Fellow academic researchers in M and E. Editors of evaluation journals. Conference organisers. |
| **Use cases (priority order)** | 1. Verify owner is institutional grade in 5 seconds. 2. See the research output (real charts, real maps). 3. Find publications. 4. Read a piece of writing. 5. Contact. |
| **Posture** | Working index. Not portfolio, not blog, not landing page. The page is itself a document. Reads like a journal issue contents page or working-paper cover plus reading room. |
| **Voice** | First person, dry, anti-buzzword. Anchor lines: "If a programme works, it should be proven using sound evidence, not anecdotes." "The full marathon remains theoretically appealing." No em dashes, no en dashes. |
| **Anti-references** | AI-portfolio canon: warm cream plus terracotta, serif headline at 8rem, parallax portrait, stat tiles, entrance blur, section eyebrows + drop caps. |

---

## 3. Visual system

### 3.1 Palette (CSS tokens)

```
--bg:           #fafaf6   /* barely warm off-white, not cream */
--ink:          #0c0c14   /* near-black with subtle indigo undertone */
--ink-2:        #262630
--ink-3:        #6a6a78
--ink-4:        #9c9caa
--rule:         #e2e2dc   /* hairline divider */
--hover-tint:   #ededec   /* near-white hover ground */

--signature:    #6E1818   /* Adinkra kuntunkuni ink, Ntonso, Asante.
                             Used in exactly ONE place: the marquee
                             triangle marker. Never sprayed. */

--image-ground: #f0ece0   /* matte plate behind generated covers */

/* Categorical chips for publication themes (small, never decorative) */
--tag-h: #3c4fe0  /* Health    */
--tag-n: #4f7a5e  /* Nutrition */
--tag-c: #9c3a3a  /* Conflict  */
--tag-f: #8a6420  /* Financing */
--tag-m: #5d4078  /* Maternal  */
```

Rules:
- The page is 90 percent monochrome by surface area. Color appears only in (a) the kuntunkuni signature triangle, (b) the real research figures and journal cover thumbnails (which carry their own color), and (c) the small categorical tag chips.
- No gradient anywhere.
- No glow, no shadow, no blur.
- No light-mode toggle. Single theme.

### 3.2 Typography

| | |
|---|---|
| **Font family** | `'Neue Haas Unica', 'Helvetica Neue', Helvetica, Arial, sans-serif` |
| **Weights** | 400 (regular), 500 (medium), 600 (semibold), 700 (bold) |
| **No serif anywhere** | Retire Playfair Display. Retire Source Sans 3. Retire all webfonts. Use the OS-installed Helvetica family. Loading no webfonts is itself an anti-AI signal: AI portfolios always load Google Fonts. |

Scale (display sizes, all in Helvetica):

| Use | Size | Weight | Tracking |
|---|---|---|---|
| Leader H1 | `clamp(1.75rem, 3.5vw, 2.625rem)` | 700 | -0.015em |
| Standfirst | 16 / 1.45 | 400 | 0 |
| Editor note body | 17 / 1.55 (first paragraph 19) | 400 | 0 |
| Section H2 (strip label) | 11 / 1 | 700 | 0.16em uppercase |
| Card title | 14.5 / 1.25 | 600 | -0.005em |
| Card meta | 9.5 / 1.4 | 600 | 0.14em uppercase |
| Card foot (year, tag) | 10 / 1.2 | 500 | 0.10em uppercase |
| Nav | 11 / 1 | 500 | 0.10em uppercase |
| Marquee | 13 / 1.2 | 400 (700 for tag prefixes) | 0.02em |
| Colophon | 11 / 1.2 | 500 | 0.08em uppercase |

### 3.3 Rules and spacing

- Hairline divider `1px solid var(--rule)` between sections.
- Single black hairline `1px solid var(--ink)` under each strip heading and under the nameplate.
- Section vertical padding: 22 to 30 px top, 32 to 36 px bottom.
- Horizontal page padding: 24px constant (no `max-w-[90rem]` container). Page is full-width edge-to-edge.

### 3.4 Motion budget

| Allowed | Disallowed |
|---|---|
| Marquee horizontal scroll, 38s linear infinite, with `@media (prefers-reduced-motion: reduce) { animation: none }` | Entrance blur on any element |
| Card hover background fade, 120ms | Stagger reveals on scroll |
| Carousel scroll-snap (CSS only) | Parallax |
| Underline color transitions on nav links, 120ms | Bouncy or elastic easing |
| | Any framer-motion `initial={{ opacity: 0 }}` |
| | Any animation of layout properties (width, height, padding) |
| | Any animation of `filter` or `backdrop-filter` |

No framer-motion is required for the new page. Plain CSS handles everything. We may keep framer-motion installed for legacy article pages but the home page does not import it.

---

## 4. Information architecture

Page sections, in vertical order:

1. **Marquee** (fixed, 38px). Black ▶ in kuntunkuni red. Scrolling news ticker with NOW / NEW / EDITING / IN PROGRESS items.
2. **Nameplate** (sticky? no, just under the marquee). Left column empty, center brand "Emmanuel Nene Odjidja", right "№ 04 · May 2026" style issue marker.
3. **Primary nav**. Index / Research / Publications / Writing / PRAXIS / Experience / Contact.
4. **Leader**. 3-column grid: bio left, portrait middle (grayscale headshot 160px square), metadata right.
5. **Editor's note**. 3-column grid: label left, body middle (first-person voice paragraphs, signed "ENO"), "Currently" sidebar right.
6. **Selected Research** carousel (the visual feature). 10 image cards of real research figures.
7. **Publications** carousel. 8 image cards using generated editorial journal covers.
8. **Writing** carousel. Text cards, wider format.
9. **PRAXIS** carousel. Text cards for tool, EWS, source.
10. **Experience** list. Dense three-column grid.
11. **Contact** section. Email is `praxisai.labs@gmail.com`. Social links inline.
12. **Colophon**. Single-line credit, set-in-Helvetica note, top link.

---

## 5. Component inventory

### 5.1 Marquee
- Fixed top, 38px tall.
- Single ▶ triangle in `var(--signature)` (kuntunkuni red). This is the only chromatic mark on the page chrome.
- Scrolling text duplicated in markup for seamless looping (e-flux pattern).
- Honours `prefers-reduced-motion`.

### 5.2 Nameplate
- Three-column grid: empty / brand / issue marker.
- Black hairline below.

### 5.3 Nav
- Horizontal scroll on narrow screens.
- Active state: thin near-black underline.
- Hover: color shift to near-black, no background tint.

### 5.4 Leader
- Grid: `1fr 160px 200px` on desktop. Stacks on mobile.
- Portrait: `<img>` 160x160 with `filter: grayscale(100%) contrast(1.04)`, hairline border.
- Right column: `<dl>` with Position / Editorial / Indexed at.

### 5.5 Editor's note
- Grid: `180px 1fr 220px`.
- Body: 4 paragraphs. First is 19px / 1.5. Last (italic) is the half-marathon line.
- Sidebar: "Currently · May 2026" with 3 dated items.
- Signature: `ENO` in uppercase tracked. No leading dash.

### 5.6 Strip (carousel container)
- `strip-head`: label / desc / "All X →" link, with black hairline below.
- `carousel`: `display: flex; overflow-x: auto; scroll-snap-type: x mandatory`.

### 5.7 Image card (`.icard`)
- 360px wide. Image area 220px tall (260px for `.tall` variant).
- Image: `object-fit: cover; object-position: center top`.
- Body: meta (small caps), title (max 3 lines, line-clamp), foot (year + tag).
- Hover: inverts to `var(--ink)` background, white text.

### 5.8 Text card (`.card`)
- Used only for Writing and PRAXIS strips (publications now use `.icard`).
- 240 or 320 wide. 160 or 180px cover area (text inside).

### 5.9 Experience list
- Three-column grid: year / role / org.
- Hairline between rows.

### 5.10 Contact
- Two-column: label left, content right.
- Email in 15px semibold, links beneath.

### 5.11 Colophon
- Two-column: credit left, links right.

---

## 6. Asset pipeline

### 6.1 Research figures (`public/samples/research/` to `public/research/`)

Ten figures, sourced from owner's project directories:

| Slug | Source path | Project | Method |
|---|---|---|---|
| `01-liptako-gourma.jpg` | `Projects/maps/Map1_Liptako_Gourma.png` | GCERF field brief | Cartography |
| `03-chad-sudan-corridor.jpg` | `Projects/maps/Map2_Chad.png` | GCERF field brief | Cartography |
| `04-typology-map.jpg` | `Projects/Economic precarity .../figures/F4_typology_map.png` | Economic Precarity working paper | Spatial typology |
| `05-hazard-archetypes.png` | `Projects/Economic precarity .../figures/F3_hazard_archetypes_forest.png` | Economic Precarity | Survival |
| `06-hazard-by-country.png` | `Projects/Economic precarity .../figures/F2_hazard_by_country.png` | Economic Precarity | Time series |
| `07-feature-importance.png` | `Projects/Economic precarity .../figures/F5_feature_importance.png` | Economic Precarity | ML |
| `08-pverm-arss-coef.png` | `Projects/livelihood and VE/.../figures/02_coefficient_plot.png` | PVE-RM Working Paper | Mixed model |
| `11-pverm-heterogeneity.png` | `Projects/livelihood and VE/.../figures/04_heterogeneity_map.png` | PVE-RM Working Paper | Causal heterogeneity (S-learner) |
| `09-phq9-intervention.png` | `Projects/mental health .../analysis/output/figures/Fig3_revised.png` | KAOURAL Mopti | RCT |
| `10-posterior-irr.png` | `Projects/mental health .../analysis/output/figures/04_posterior_intervention.png` | KAOURAL Bayesian | Bayesian |

All figures resized to max-width 1400px. Maps stored as JPEG (quality 88), charts as optimized PNG. Total weight ~1.7 MB.

Strip order (groups by project for storytelling): GCERF maps (2) → Economic Precarity (4) → PVE-RM (2) → KAOURAL (2).

Card title for each is a one-sentence declarative finding from the underlying figure (not the figure's own title verbatim).

### 6.2 Journal covers (`public/samples/publications/` to `public/publications/`)

Eight editorially-generated covers, one per publication, using `scripts/generate-journal-covers.py`:

- 720x440 PNG, cream `#f0ece0` ground, journal name in Georgia bold serif in the journal's brand-accent color.
- Top-left eyebrow: `PUBLISHED YEAR`.
- Top-right mark: `BMC` / `MDPI` / `OXFORD` / `WILEY` / `SPRINGER`.
- Hairline rule near bottom; volume in italic Georgia; small accent dot in bottom-right.
- No copyrighted logo or cover image is reproduced. This is an editorial re-typesetting.

Generation script lives at `scripts/generate-journal-covers.py`. Re-runnable; add new entries to the `JOURNALS` list as new publications appear.

### 6.3 Portrait

Single image at `public/profile.JPG`, rendered grayscale via CSS `filter`. Do not duplicate; do not crop differently in two places.

### 6.4 OG image

Existing `public/og-image.png` from prior iteration. May need to be regenerated to match the new monochrome dialect (Helvetica only, no Playfair). Out of scope for this spec; tracked separately.

---

## 7. Accessibility

- `prefers-reduced-motion`: marquee animation stops.
- `<main id="main">` exists. Skip link is the first focusable element.
- Image card `<img>` has alt text describing the chart or map content.
- Decorative images (portrait in the leader) have `alt=""` and surrounding caption.
- Card hover and focus states share the same visual treatment (invert to near-black). `:focus-visible` ring needs to be added.
- All text/background contrast ratios meet WCAG AA. `--ink-3` on `--bg` is the tightest pair at ~4.6:1.
- No `outline: none` without a replacement focus ring.

---

## 8. Content data model changes (`src/lib/content.ts`)

Add:

```ts
research: [
  {
    slug: '01-liptako-gourma',
    image: '/research/01-liptako-gourma.jpg',
    source: 'GCERF Field Brief',
    region: 'Sahel',
    title: 'Direction of VE attacks: Liptako-Gourma. JNIM shifts southwest as the Boucle du Mouhoun records a 79 percent increase, 2022 to 2024.',
    year: 2025,
    tag: 'Cartography',
    alt: 'Map of VE attacks in Liptako-Gourma, color-coded by year, 2022 to 2025',
  },
  // ... 9 more
] satisfies ResearchItem[],
```

Type:

```ts
interface ResearchItem {
  slug: string
  image: string
  source: string
  region: string
  title: string
  year: number
  tag: string
  alt: string
  href?: string  // optional outbound link to the underlying paper
}
```

Replace existing `publications` shape by augmenting each entry with a `cover` field pointing to the generated cover PNG:

```ts
{ year: 2025, title: '...', journal: 'BMC Infectious Diseases', authors: '...',
  url: '...', theme: 'Infectious Disease',
  cover: '/publications/pub-01-bmc-infdis-2025.png' }
```

Add to `siteContent`:

```ts
editorsNote: {
  date: 'May 2026',                        // no Geneva
  body: [
    'Twelve years in, the one question I keep returning to is this...',
    'I grew up in Ghana...',
    'I run half-marathons...',           // italic
  ],
  currently: [
    { html: 'Finalising <a href="/praxis">PRAXIS v1.0</a> for launch...' },
    { html: 'Co-authoring a paper on...' },
    { html: 'Editing the next issue of JMDE\'s case-based section...' },
  ],
  signature: 'ENO',
},
marquee: [
  { label: 'NOW',         text: 'PRAXIS v1.0 launches at Glocal Evaluation Week, 3 June 2026' },
  { label: 'NEW',         text: 'Tuberculosis mortality and drug resistance in Burundi, BMC Infectious Diseases (2025)' },
  { label: 'EDITING',     text: 'JMDE case-based evaluations, next issue. Open to submissions.' },
  { label: 'IN PROGRESS', text: 'Climate, conflict, food insecurity nexus across Burkina Faso, Mali, Niger' },
],
contact: {
  email: 'praxisai.labs@gmail.com',
  socials: [
    { platform: 'LinkedIn',         url: '...' },
    { platform: 'Google Scholar',   url: '...' },
    { platform: 'ORCID',            url: '...' },
    { platform: 'ResearchGate',     url: '...' },
    { platform: 'GitHub',           url: '...' },
  ],
},
```

Retire:

- `hero.titles`, `hero.tagline`, `hero.stats` (no hero, no stats tiles)
- `about.bio` paragraphs (replaced by `editorsNote.body`)
- `about.pullQuote` / `about.pullQuoteCite` (replaced by the editor's note voice)
- `about.expertise`, `about.education`, `about.languages`, `about.mapCountries` (move what survives into the leader `<dl>`)

---

## 9. Implementation map (file by file)

### 9.1 New components

| Path | Component | Purpose |
|---|---|---|
| `src/components/Marquee.tsx` | `<Marquee>` | Fixed top ticker with kuntunkuni triangle |
| `src/components/Nameplate.tsx` | `<Nameplate>` | Header bar (left empty, center brand, right issue) |
| `src/components/Nav.tsx` | `<Nav>` | Primary nav row |
| `src/components/Strip.tsx` | `<Strip>` and `<StripHead>` | Carousel container |
| `src/components/IcardImage.tsx` | `<IcardImage>` | Image card |
| `src/components/IcardText.tsx` | `<IcardText>` | Text card (writing, PRAXIS) |
| `src/components/Colophon.tsx` | `<Colophon>` | Footer |

### 9.2 New sections

| Path | Section |
|---|---|
| `src/sections/Leader.tsx` | Bio plus portrait plus metadata grid |
| `src/sections/EditorsNote.tsx` | First-person voice block plus Currently sidebar |
| `src/sections/Research.tsx` | Selected Research carousel |
| `src/sections/Publications.tsx` | Rewritten as image-card carousel |
| `src/sections/Writing.tsx` | Text-card carousel, simplified |
| `src/sections/Praxis.tsx` | Text-card carousel |
| `src/sections/Experience.tsx` | Dense list, simplified |
| `src/sections/Contact.tsx` | Stripped form replaced by single mailto plus social links |

### 9.3 Sections to retire

| Current path | Status |
|---|---|
| `src/sections/Hero.tsx` | DELETE. Replaced by Leader plus Editor's note. |
| `src/sections/About.tsx` | DELETE. Content moves into Leader (metadata) and Editor's note (voice). |
| `src/components/AnimatedCounter.tsx` | DELETE. No stat tiles. |
| `src/components/Reveal.tsx` | DELETE. No scroll reveals. |
| `src/components/PraxisChart.tsx` | DELETE unless reused inside a research card. |
| `src/components/WorldMap.tsx` | DELETE. Replaced by real maps in the Research strip. |
| `src/components/Tooltip.tsx` | DELETE unless reused. |
| `src/components/Toast.tsx` | KEEP (used by publications page filter). |
| `src/components/Pagination.tsx` | KEEP (used by writing and publications pages). |
| `src/components/ReadingProgress.tsx` | Already retired. |
| `src/components/Header.tsx` | DELETE. Replaced by Marquee plus Nameplate plus Nav. |
| `src/components/Footer.tsx` | DELETE. Replaced by Colophon. |
| `src/components/ThemeToggle.tsx` | DELETE. Single theme. |

### 9.4 Config and dependency changes

- `tailwind.config.ts`: replace token palette wholesale. Add `ink`, `signature`, `image-ground`. Remove `terra`, `cream`, `gold`.
- `src/app/layout.tsx`: remove `Playfair_Display` and `Source_Sans_3` imports. Remove the `dark`/`light` class injection script (no theme toggle). Update `<html>` to no class.
- `src/app/globals.css`: rewrite. Body font becomes Helvetica system stack. Remove grain overlay. Remove pull-quote-rule, editorial-quote, portrait-frame, duotone utilities.
- `package.json`: framer-motion stays installed but the home page does not import it.

### 9.5 Routes that stay

- `/publications` (filterable index): rewrite chrome to match dialect, list items use journal cover thumbnails.
- `/writing` (filterable index): rewrite chrome to match dialect, list items use text cards.
- `/writing/[slug]` article pages: rewrite chrome to match dialect, body remains long-form Helvetica.

---

## 10. Acceptance checklist

Before merge to main:

- [ ] SSR HTML for `/` contains the H1 visible (no `opacity:0`, no `filter:blur`).
- [ ] Zero em dashes and zero en dashes anywhere in the rendered HTML.
- [ ] Zero `Geneva` anywhere in the rendered HTML.
- [ ] Email is `praxisai.labs@gmail.com` everywhere.
- [ ] Helvetica is the only font family declared. No Google Fonts loaded.
- [ ] The kuntunkuni signature `#6E1818` appears in exactly one CSS rule (the marquee triangle).
- [ ] All 10 research figures load, 8 journal covers load, portrait loads.
- [ ] Lighthouse Performance >= 90, Accessibility >= 95, Best Practices >= 90, SEO >= 95.
- [ ] `prefers-reduced-motion` stops the marquee.
- [ ] Build is under 200 KB First Load JS.
- [ ] No console errors.
- [ ] OG image regenerated to match the new dialect (Helvetica, cream ground, signature dot).
- [ ] Robots, sitemap, JSON-LD Person schema updated.

---

## 11. Out of scope

- New publications (the list is locked at the 8 shown until owner adds new ones).
- New writing pieces.
- Article-detail page redesign beyond chrome match.
- Light-mode toggle (deleted; if needed later, design separately).
- Multi-language (English-only at launch).
- PRAXIS Workbench redesign (separate project; embargoed until Glocal Evaluation Week 2026-06-03).

---

## 12. Decisions to confirm before implementation

1. **Email**. `praxisai.labs@gmail.com` is the sole contact email on the page. Confirm.
2. **Geneva**. Zero Geneva references on the homepage. Confirm.
3. **Journal covers**. Editorially generated thumbnails, no copyrighted logos. Confirm.
4. **Theme toggle**. Removed; site is single-theme. Confirm.
5. **Article-page chrome**. Match the new dialect (Helvetica, off-white ground). Confirm.
6. **Writing strip**. Stays text cards rather than illustrated. Confirm.
7. **Selected Research ordering**. Grouped by project (GCERF maps, Economic Precarity, PVE-RM, KAOURAL). Confirm.
8. **Strip placement**. Selected Research immediately after the Editor's note (the lead piece). Confirm.

---

## 13. Implementation plan

Once the spec is approved, work is divided into the following commits (each independently reviewable):

1. `chore(tokens)`: rewrite Tailwind palette, retire terra/cream/gold tokens, add ink/signature/image-ground.
2. `chore(fonts)`: retire Playfair Display and Source Sans 3 imports; switch body stack to Helvetica.
3. `chore(globals)`: rewrite `globals.css` for the new dialect.
4. `feat(content)`: restructure `src/lib/content.ts` per Section 8.
5. `feat(components)`: build new shared components (Marquee, Nameplate, Nav, Strip, IcardImage, IcardText, Colophon).
6. `feat(leader)`: build Leader section.
7. `feat(editorsnote)`: build EditorsNote section.
8. `feat(research)`: build Research section, wire to content data.
9. `refactor(publications)`: rewrite Publications section as image-card carousel.
10. `refactor(writing)`: simplify Writing section.
11. `refactor(praxis)`: simplify PRAXIS section.
12. `refactor(experience)`: simplify Experience list.
13. `refactor(contact)`: strip form, single mailto + social links.
14. `chore(retire)`: delete Hero, About, AnimatedCounter, Reveal, PraxisChart, WorldMap, Tooltip, Header, Footer, ThemeToggle.
15. `feat(routes)`: rewrite `/publications` and `/writing` filterable pages and `/writing/[slug]` article chrome to match.
16. `chore(og)`: regenerate `og-image.png` in new dialect.
17. `chore(seo)`: update JSON-LD, robots, sitemap.
18. `test(acceptance)`: run acceptance checklist.

Estimated total: 18 small commits, ~2 days of focused work.
