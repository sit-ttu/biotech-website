# Biotech TTU — Style Reference

> Academic paper, not a brochure. A near-white editorial plane ruled by hairlines, oversized tight-tracked headlines above whisper-small body copy, and one single green that only appears on contact.

**Theme:** light (dark surfaces are accents, not a mode)
**Source of truth:** `src/components/HomePageContent.tsx` — the home page is the reference implementation of this system.

Biotech TTU reads like a printed academic broadsheet. The page is white, structure comes from 1px hairlines in `#d8dad7` rather than shadows or cards, and content sits on an asymmetric 12-column grid that deliberately refuses to be symmetrical. The defining tension is **scale contrast**: section headlines run 34–64px at `-0.055em` tracking and `leading-none`, while body copy drops to 11–13px — a ratio near 4:1 that makes the page feel confident and quiet at once. Colour is almost absent. A single institutional green `#139C48` covers maybe 2% of any screen, and it earns its place through interaction: outlined pills sit grey and neutral until hover, when they flood solid green. Every image is a rounded rectangle on a grey placeholder, cropped with `object-cover`, and lifts 2.5% on hover. Motion is uniform and slow — one easing curve, `cubic-bezier(0.16, 1, 0.3, 1)`, governs the entire site.

---

## Tokens — Colors

### Brand

| Name | Value | Token | Role |
|------|-------|-------|------|
| Biotech Green | `#139C48` | `--color-brand` | The only brand colour. Hover fills, active pills, eyebrow labels, focus rings, icon accents, header CTA. Never a large surface — accent only |
| Green Press | `#0F7E3A` | `--color-brand-press` | Hover/pressed state of a filled green button. The single darker step |
| Mint | `#75D2BC` | `--color-mint` | Accent on dark green surfaces only (text/CTA inside `#12312B` panels). Invisible on white — never use it on light |
| Forest Ink | `#12312B` | `--color-forest` | Deep green-black. Dark panel surfaces and the shadcn `--foreground` token |
| Abyss | `#071E1A` | `--color-abyss` | Near-black green. Image scrims, deepest dark surface |

### Ink ladder — the greys carry the whole page

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ink | `#111311` | `--color-ink` | All headings, all card titles. The default foreground of the editorial system |
| Ink Statement | `#4f544f` | `--color-ink-statement` | Pull-quote / mission statement text at weight 500 |
| Ink Body | `#666b66` | `--color-ink-body` | Standard paragraph copy |
| Ink Muted | `#747974` | `--color-ink-muted` | Section intros, secondary descriptions |
| Ink Soft | `#868a86` | `--color-ink-soft` | Small captions, list summaries |
| Ink Faint | `#929692` | `--color-ink-faint` | Dates, timestamps, metadata |
| Ink Control | `#5f635f` | `--color-ink-control` | Label text inside outlined pill buttons |

> The ladder is deliberately tight — all seven greys sit between `#4f544f` and `#929692`. Never introduce a grey outside this range; contrast is created by **size**, not by darkness.

### Lines — the structural system

| Name | Value | Token | Role |
|------|-------|-------|------|
| Rule | `#d8dad7` | `--color-rule` | **The signature.** Every section divider, row separator, `divide-y`, `border-t`, `border-b`. This one line does the work that cards and shadows do elsewhere |
| Rule Control | `#cfd2ce` | `--color-rule-control` | Border of every outlined pill button and circular icon chip |
| Rule Panel | `#dde1dc` | `--color-rule-panel` | Border of the large CTA panel |
| Rule Strong | `#bfc3bf` | `--color-rule-strong` | Left rule beside a pull-quote statement |
| Rule Underline | `#aeb2ae` | `--color-rule-underline` | Underline of inline text links |
| Rule Chrome | `#ececec` | `--color-rule-chrome` | Footer and header chrome dividers |

### Surfaces

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas | `#ffffff` | `--color-canvas` | Page background. Non-negotiable — sections do not get tinted backgrounds |
| Panel | `#f5f5f2` | `--color-panel` | The warm off-white of the closing CTA panel. The only tinted block on the page |
| Wash | `#F8FAF7` | `--color-wash` | Faint green-white for sidebars and secondary rails |
| Placeholder | `#e7e9e6` | `--color-placeholder` | Sits behind every image while it loads. Also `#e7e7e4`, `#e8e8e5`, `#eef0ec` — pick one and stay with it |
| Skeleton | `#e4e7e3` | `--color-skeleton` | Loading bars for headings |
| Skeleton Light | `#eceeeb` | `--color-skeleton-light` | Loading bars for metadata |

---

## Tokens — Typography

### Be Vietnam Pro · `--font-be-vietnam-pro`
Loaded in `src/app/layout.tsx` via `next/font/google`, subsets `latin` + `vietnamese`. Applied on `<body>` — the whole site is one typeface.
- **Weights available:** 400, 500, 600, 700, 800
- **Weights used:** 600 (`font-semibold`) for every headline and card title; 500 (`font-medium`) for control labels and pull-quotes; 400 for body copy
- **Never used:** 700 / 800. Nothing on the page is bolder than 600 — emphasis comes from size, never from weight

### Roboto Mono · `--font-roboto-mono`
Applied through the `.font-roboto-mono` utility in `globals.css`. Used **only** for uppercase eyebrow labels above news items (`Latest` / `Mới nhất`) at `0.58rem` with `0.13em` tracking in green. It is a punctuation mark, not a text face.

### Type Scale

The scale is authored in `rem` in the components. Values below are the literal ones in use.

| Role | Size | Line Height | Tracking | Weight | Token |
|------|------|-------------|----------|--------|-------|
| hero | `clamp(2.65rem, 4vw, 4rem)` (42→64px) | 1.08 | -0.055em | 600 | `--text-hero` |
| cta-display | `2.25rem` → `3rem` @sm | 1.02 | -0.055em | 600 | `--text-cta-display` |
| section | `2.15rem` → `2.6rem` @sm | 1 (`leading-none`) | -0.055em | 600 | `--text-section` |
| row-title | `1.7rem` → `2rem` @sm | 1.06 | -0.045em | 600 | `--text-row-title` |
| card-title | `1rem` → `1.05rem` @md | 1.08 | -0.035em | 600 | `--text-card-title` |
| news-title | `1rem` → `1.08rem` @sm | 1.18 | -0.025em | 600 | `--text-news-title` |
| person-name | `0.94rem` → `1rem` @sm | 1.25 | -0.025em | 600 | `--text-person-name` |
| list-title | `0.9rem` | 1.16 | -0.02em | 600 | `--text-list-title` |
| statement | `0.88rem` | 1.5 | -0.025em | 500 | `--text-statement` |
| body-lead | `0.78rem` | 1.55 – 1.65 | — | 400 | `--text-body-lead` |
| body | `0.76rem` | 1.6 | — | 400 | `--text-body` |
| body-sm | `0.72rem` | 1.35 | — | 400 | `--text-body-sm` |
| body-xs | `0.68rem` | 1.48 | — | 400 | `--text-body-xs` |
| control | `0.67rem` | — | — | 500 | `--text-control` |
| control-sm | `0.61rem` | — | — | 500 | `--text-control-sm` |
| caption | `0.59rem` | 1.45 | — | 400 | `--text-caption` |
| meta | `0.58rem` | — | — | 400 | `--text-meta` |
| eyebrow | `0.58rem` | — | 0.12em, uppercase | 500 | `--text-eyebrow` |

**Tracking rule:** negative tracking scales with size. `-0.055em` at 34px+, `-0.045em` at ~28px, `-0.025em` at ~16px, `0` below 14px, and **positive** `+0.12em` on uppercase eyebrows. Getting this wrong is the fastest way to break brand fidelity.

**Readability guard:** `globals.css` contains a `@media (min-width: 64rem)` block that clamps `.text-xs` / `.text-sm` and small arbitrary sizes inside `<main>` back up to readable values on desktop. Small type is intentional — but that guard exists so it never becomes unreadable. Don't remove it, and don't fight it with `!important`.

---

## Tokens — Spacing & Shapes

**Base unit:** 4px (Tailwind default scale)
**Density:** editorial — generous vertical rhythm, tight horizontal gutters

### Spacing Scale

| Token | Value | Typical use |
|-------|-------|-------------|
| `1.5` | 6px | Pill vertical padding |
| `3` | 12px | Gap between adjacent controls |
| `4` | 16px | Card title → meta gap |
| `5` | 20px | Page gutter (mobile), grid gap |
| `6` | 24px | Row padding, section header gap |
| `7` | 28px | Eyebrow → headline gap |
| `8` | 32px | Page gutter (`sm:`), figure column gap |
| `9` / `11` | 36 / 44px | Discover row vertical padding |
| `12` | 48px | Faculty grid row gap |
| `14` | 56px | Major intra-section gap |
| `20` / `24` | 80 / 96px | Section bottom padding (mobile) |
| `28` / `32` | 112 / 128px | Section bottom padding (`md:`) |

### Border Radius

| Element | Value |
|---------|-------|
| buttons, pills, tags, icon chips | `9999px` (`rounded-full`) — **all of them, without exception** |
| large panel (CTA, dark hero panel) | `1.75rem` (28px) |
| hero image | `1rem` (16px) |
| editorial card image | `0.9rem` (14.4px) |
| portrait / avatar | `0.8rem` (12.8px) |
| news thumbnail | `0.75rem` (12px) |
| supporting figure | `0.65rem` (10.4px) |

> Radius shrinks as the image shrinks. A 12px radius on a full-bleed hero looks cheap; a 28px radius on a thumbnail looks like a toy.

### Shadows

**There are none.** The editorial system uses zero elevation — separation comes from hairlines and whitespace. Two exceptions live outside the content area:
- Header mega-menu: `0 18px 45px -28px rgba(25, 45, 31, 0.32)` — a barely-there drop under the overlay
- `globals.css` ships `.shadow-elegant` / `.shadow-glow` utilities. **Legacy. Do not use on new pages.**

### Layout

- **Container:** `max-w-7xl` (80rem / 1280px), `mx-auto`
- **Ultra-wide:** above `96rem`, `globals.css` expands `.max-w-7xl` to `min(86vw, 135rem)`
- **Gutter:** `px-5` mobile → `sm:px-8`
- **Section rhythm:** `pb-20 sm:pb-24 md:pb-28 md:pb-32` — bottom padding only; sections never have symmetric vertical padding
- **Grid:** `md:grid-cols-12` / `lg:grid-cols-12`, used **asymmetrically** — 8+4, 7+5, 6+3+3, 4+3+3+3. A 6+6 split is off-pattern
- **Header height:** `4.5rem` → `sm:5.25rem`, sticky, `bg-white/95 backdrop-blur-xl`

---

## Motion

One easing curve owns the site: **`cubic-bezier(0.16, 1, 0.3, 1)`** (an aggressive ease-out). Learn it, use it everywhere.

| Interaction | Spec |
|-------------|------|
| Section reveal | `opacity: 0 → 1`, `y: 20–30px → 0`, duration `0.7–0.9s` |
| Stagger | `delay: index * 0.07–0.08s` |
| List item reveal | `whileInView` + `viewport={{ once: true, amount: 0.2–0.5 }}` |
| Image hover | `scale(1.025)`, duration `700ms` |
| Portrait hover | `scale(1.025)` + `saturate(0.92) → 1`, `700ms` |
| Button hover | `-translate-y-0.5` (filled) or colour flood (outlined), `300–500ms` |
| Button active | `scale(0.98)` |
| Arrow chip hover | `translate-x-0.5` |
| Transition property | Always explicit — `transition-[background-color,border-color,color,transform]`, never `transition-all` |

**Reduced motion is mandatory.** Every animated component calls `useReducedMotion()` from `framer-motion` and passes `initial={reduceMotion ? false : {...}}`. A new page that animates without this check is broken, not stylish.

---

## Components

### Outlined Pill (the default control)
**Role:** every secondary action on the site

`rounded-full`, `border border-[#cfd2ce]`, `px-4 py-2` (or `px-3 py-1.5` when small), label at `0.67rem` weight 500 in `#5f635f`, followed by a right-arrow icon at 11–12px. On hover the entire pill floods: `border-[#139C48] bg-[#139C48] text-white`. Active `scale-[0.98]`. This grey-until-touched behaviour is the interaction signature of the brand.

### Primary Green Pill
**Role:** the one main action per page

`rounded-full bg-[#139C48]`, `min-h-11`, `py-1.5 pl-5 pr-1.5` — asymmetric padding, because the right side holds a **white circular chip** (`h-8 w-8 rounded-full bg-white text-[#139C48]`) containing the arrow. Label `0.72rem` weight 600 white. Hover: `-translate-y-0.5` + `bg-[#0F7E3A]`, and the chip's arrow slides `translate-x-0.5`. The white chip inside the green pill is the most recognisable element in the system.

### Circular Arrow Chip
**Role:** affordance at the end of a card or row

`size-8` / `size-9`, `rounded-full`, `border border-[#cfd2ce]`, arrow icon at 11–12px in `#686d68`. On parent `group-hover`: fills green, text white, `translate-x-0.5`. Used standalone where a full pill would be too loud.

### Eyebrow Tag
**Role:** category label above a headline

`inline-flex rounded-full border border-[#cfd2ce] px-3 py-1.5`, `0.58rem` weight 500 uppercase, `tracking-[0.12em]`, colour `#656a65`. On `group-hover`: border and text go green — but the background stays transparent (unlike the pill button). A tag is a label, not a control.

### Editorial Card
**Role:** the study/programs grid tile

`border-l border-[#d8dad7]` on `md:` and up (a column rule, not a box), `px-3 py-3`. Image in a `rounded-[0.9rem] bg-[#e7e7e4]` box with `object-cover`, aspect `16/9` (single-width) or `16/8.7` (double-width). Beneath: a `min-h-14` flex row with the title at `1rem` weight 600 tracking `-0.035em`, capped at `max-w-[14rem]`, and an outlined "Read more" pill pushed to the far right. Cards have **no border box and no background** — only the left rule and the image separate them.

### Discover Row
**Role:** the tall, mixed-span link rows

Lives inside `border-y border-[#d8dad7]` with rows split 7+5 then full-width 12. Tall variant is `min-h-[19rem] content-between` (eyebrow + title at top, arrow at bottom); wide variant is `min-h-[12rem]` with a three-column `[0.72fr_1.28fr_auto]` centre-aligned track. Whole row is one `<Link>` with `group` hover.

### News Item
**Role:** the two-column article row

`grid sm:grid-cols-[0.82fr_1.18fr]` inside a `divide-y divide-[#d8dad7]` stack — image on the **right**, text left. Text column: mono green eyebrow + grey date on one justified row, title at `1rem`/1.18, three-line clamped summary at `0.68rem`, then a "Read more" pill pinned with `sm:mt-auto`. Image `rounded-[0.75rem]`, `min-h-44`, hover `scale-[1.025]`.

### Event Item (sidebar)
**Role:** compact list in a narrow rail

`divide-y divide-[#d8dad7] border-b`, `py-5`. Title `0.9rem`/1.16, then a **`mt-6`** row — that oversized gap is deliberate — holding the date at `0.58rem` and a small outlined pill.

### Faculty Card
**Role:** person grid, 4-up

`aspect-square rounded-[0.8rem] bg-[#eef0ec]` portrait, `object-cover object-top`, desaturated to `0.92` and restored to full colour on hover. Below: `border-t border-[#d8dad7] pt-3`, name at `0.94rem` (goes green on hover), role at `0.63rem`, and a `size-8` up-right arrow chip on the right. Grid gaps are asymmetric: `gap-x-5 gap-y-12`.

### Pull-Quote Statement
**Role:** the single-sentence mission line

`border-l border-[#bfc3bf] pl-4`, `max-w-[15rem]`, `0.88rem` weight **500** (not 600), tracking `-0.025em`, colour `#4f544f`. Offset into the grid at `md:col-start-4` so it does not align with the headline above it — the misalignment is the point.

### Staggered Figure Trio
**Role:** the about-section image composition

Three figures on a 12-col grid as 6+3+3. The **second** figure gets `md:pt-40`, dropping it well below the others. Each has a `figcaption` at `0.59rem` in `#757a75`; the first caption is pushed with `md:ml-auto md:w-1/2` so it sits under the right half of its own image. Deliberate, controlled imbalance.

### Closing CTA Panel
**Role:** the last block of every page

`max-w-7xl rounded-[1.75rem] border border-[#dde1dc] bg-[#f5f5f2]`, `px-6 py-14 sm:px-10 md:py-20`, centred. Headline `2.25rem → 3rem` capped at `max-w-[18ch]`, description at `0.8rem` capped at `max-w-[42rem]`, then a green primary pill + an outlined white pill side by side. Implemented as `EditorialCta` — **reuse the component, don't rebuild it.**

### Header
**Role:** sticky site chrome

`sticky top-0 z-50`, `bg-white/95 backdrop-blur-xl`, `border-b border-[#139C48]/15`, height `4.5rem → sm:5.25rem`. Nav links `text-sm` weight 600 with a `h-0.5 rounded-full bg-[#139C48]` underline on the active item. Mega-menu drops as a full-width white overlay with a `#fafbfa` left rail. Right cluster: circular icon buttons + one green uppercase CTA pill (`0.72rem`, `tracking-[0.1em]`). A green scroll-progress bar sits on the bottom edge.

### Footer
**Role:** site close

White, `border-t border-[#ececec]`, `max-w-7xl px-5 pt-14 sm:px-8`. 12-col link grid at 4+2+3+3. Column headings `11px` uppercase `tracking-[0.15em]`; links `13px` grey turning green on hover with an arrow that expands from `w-0`. Bottom bar `border-t` + `py-6`.

---

## Do's and Don'ts

### Do
- Build structure from `border-[#d8dad7]` hairlines and `divide-y` — the rule replaces the card
- Apply `-0.055em` tracking with `leading-none` to every section headline at 34px+
- Keep body copy small (`0.68–0.78rem`) — the size contrast against headlines *is* the design
- Use `rounded-full` for every button, tag, and icon chip, with no exceptions
- Keep outlined pills grey at rest and let them flood `#139C48` only on hover
- Use the asymmetric 12-column grid — 8+4, 7+5, 6+3+3 — and offset at least one element off its expected column
- Wrap every image in a rounded box with a grey placeholder background and `object-cover`
- Pass `useReducedMotion()` into every `framer-motion` component and gate `initial` on it
- Enumerate transition properties explicitly (`transition-[background-color,border-color,color,transform]`)
- Close every page with the `EditorialCta` component
- Reuse `ArrowIcon` from `@/components/icons/ArrowIcon` for all directional affordances

### Don't
- Don't add box-shadows to content. No `.shadow-elegant`, no `.shadow-glow`, no `shadow-lg` — those utilities are legacy
- Don't use `#139C48` as a large background fill. Green is for hover states, small chips, and one CTA per page
- Don't use font weights above 600. If something needs emphasis, make it bigger, not heavier
- Don't tint section backgrounds. The canvas is white; `#f5f5f2` belongs to the CTA panel alone
- Don't use `#75D2BC` mint on a light background — it only exists on dark green surfaces
- Don't build symmetric 6+6 grids, and don't centre-align body text (only the CTA panel centres)
- Don't use the gradient utilities (`.bg-gradient-hero`, `.text-primary-glow`, `.bg-gradient-orange`) — legacy from an earlier direction
- Don't follow `src/components/Hero.tsx` as a pattern. It is a different, older visual language (dark rounded panels, stat tiles) and is **not** used by the home page
- Don't introduce a grey outside the `#4f544f → #929692` ladder
- Don't animate with `transition-all` or with an easing curve other than `cubic-bezier(0.16, 1, 0.3, 1)`
- Don't set `border-radius` above `1.75rem` on a panel or above `1rem` on an image

---

## Imagery

Photography is documentary and institutional — laboratories, campus, students at work. Never stock-abstract, never illustrated, never iconographic. Rules:

- Always inside a rounded container with `overflow-hidden` and a grey placeholder (`#e7e9e6`) behind it
- Always `object-cover`; use `object-[center_56%]` or `object-top` to control the crop rather than changing the aspect ratio
- Aspect ratios in use: `16/7.6` (hero desktop), `4/3` (hero mobile), `16/8.7` and `16/9` (cards), `1.5/1` and `1.35/1` (figures), `1/1` (portraits)
- Portraits are desaturated to `0.92` at rest and return to full colour on hover
- The only scrim is `bg-gradient-to-t from-[#071E1A]/85` on dark overlay panels
- `next/image` with `fill` + explicit `sizes`; `priority` on the hero only

---

## Known inconsistency — read before extending

The codebase currently holds **two palettes**:

1. **shadcn tokens** in `src/app/globals.css` — `--primary: #139C48`, `--foreground: #12312B`, `--border: #D6E5E0`, plus a `.dark` block. Used by `src/components/ui/*`.
2. **Editorial hex literals** hardcoded across `HomePageContent`, `FacultyHighlight`, `EditorialCta`, `Header`, `Footer` — ink `#111311`, rule `#d8dad7`, the grey ladder. None of these exist as tokens.

They disagree: `#12312B` vs `#111311` for ink, `#D6E5E0` vs `#d8dad7` for borders. **The editorial literals are what actually ships on the public pages** — this document treats them as canonical. The dark mode block is unused on public pages.

If you extend the system, the lazy correct move is to add the editorial values to the `@theme` block in `globals.css` (see Quick Start below) and migrate literals to token classes opportunistically, one component at a time. Do not attempt a global rename.

---

## Agent Prompt Guide

### Quick Color Reference
- Heading text: `#111311`
- Body text: `#666b66` · muted `#747974` · metadata `#929692`
- Control label: `#5f635f`
- Background: `#ffffff` (always) · `#f5f5f2` (CTA panel only)
- Rule / divider: `#d8dad7`
- Control border: `#cfd2ce`
- Accent / hover fill: `#139C48` · pressed `#0F7E3A`
- Image placeholder: `#e7e9e6`

### Example Component Prompts

1. **Page hero** — White background, `px-5 sm:px-8 pb-20 pt-12 md:pb-28 md:pt-16`. A `md:grid-cols-12` grid: `h1` at `md:col-span-8`, size `clamp(2.65rem, 4vw, 4rem)`, weight 600, `leading-[1.08]`, `tracking-[-0.055em]`, colour `#101210`, broken across two `block text-balance` spans. At `md:col-span-4`: a `0.78rem`/1.55 paragraph in `#737873` capped at `max-w-[29rem]`, then a green primary pill with a white circular arrow chip. Below the grid, `mt-10`, a full-width image `aspect-[4/3] sm:aspect-[16/7.6] rounded-[1rem] bg-[#e8e8e5]`, `object-cover`, `priority`.

2. **Section header with rule** — `h2` at `2.15rem sm:2.6rem`, weight 600, `leading-none`, `tracking-[-0.055em]`, `#111311`. Then `border-t border-[#d8dad7]` (or `border-b … pb-4` if the header sits above a list). Optional intro paragraph at `0.76rem`/1.6 in `#747974`, `max-w-[31rem]`, and an outlined pill pushed right with `justify-self-end`.

3. **Content grid tile** — `<Link className="group">`, `md:border-l md:border-[#d8dad7] md:px-3 md:py-3`. Image box `rounded-[0.9rem] bg-[#e7e7e4] aspect-[16/9] overflow-hidden`, image `object-cover` with `group-hover:scale-[1.025] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`. Below, `pt-4`, a `min-h-14` flex row: title `1rem` weight 600 `tracking-[-0.035em]` `max-w-[14rem]`, and an outlined "Read more" pill at `0.62rem` that floods green on `group-hover`.

4. **Outlined pill button** — `inline-flex items-center gap-2 rounded-full border border-[#cfd2ce] px-4 py-2 text-[0.67rem] font-medium text-[#5f635f] transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#139C48] hover:bg-[#139C48] hover:text-white active:scale-[0.98]` + `<ArrowIcon direction="right" size={11} />`.

5. **Primary green pill** — `group inline-flex min-h-11 items-center gap-4 rounded-full bg-[#139C48] py-1.5 pl-5 pr-1.5 text-[0.72rem] font-semibold text-white transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#0F7E3A] active:scale-[0.98]`, ending in `<span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#139C48] group-hover:translate-x-0.5">`.

6. **Article list row** — Inside `divide-y divide-[#d8dad7]`. `grid gap-6 py-6 sm:grid-cols-[0.82fr_1.18fr]`. Left: mono eyebrow `0.58rem uppercase tracking-[0.13em] text-[#139C48]` opposite a `0.58rem text-[#929692]` date; title `mt-4` at `1rem`/1.18 `tracking-[-0.025em]`; `line-clamp-3` summary at `0.68rem` in `#858985`; outlined pill at `sm:mt-auto`. Right: `rounded-[0.75rem] bg-[#e7e9e6] min-h-44`, image hover `scale-[1.025]`.

7. **Reveal wrapper** — `<motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}>`.

---

## Applying this to other pages

Every public page is the same six moves in sequence. Keep the order; vary the middle.

1. `<main className="text-[#111311]">` → `<div className="mx-auto max-w-7xl">`
2. **Opening block** — oversized `h1` on an asymmetric 12-col grid, short muted paragraph in the narrow column, one green primary pill, then a wide rounded hero image
3. **Section headers** — `2.15rem sm:2.6rem` headline, `leading-none`, `tracking-[-0.055em]`, followed immediately by a `#d8dad7` rule
4. **Content** — pick a pattern that already exists rather than inventing one: editorial card grid, discover rows, article list, person grid, staggered figure trio
5. **Section spacing** — bottom padding only, `pb-20 sm:pb-24 md:pb-32`; gutters `px-5 sm:px-8`
6. **Close** — `<EditorialCta />` with page-appropriate copy

Localisation: every page carries a `const copy = { vi: {...}, en: {...} }` object with `as const`, read via `useLocale()`. Route slugs differ per locale (`/vi/chuong-trinh-dao-tao` ↔ `/en/programs`) — build hrefs from a `links` map, never by string-concatenating a path.

**Ghi chú (VI):** File này mô tả *pattern* của trang home — dùng nó làm chuẩn khi thiết kế các trang khác. Ba điều dễ làm sai nhất: (1) dùng shadow thay vì đường kẻ `#d8dad7`; (2) tăng font-weight lên 700 để nhấn mạnh — hãy tăng size thay vì tăng weight; (3) dùng màu xanh `#139C48` làm nền lớn — xanh chỉ dùng cho hover và một nút chính duy nhất mỗi trang.

---

## Similar Brands

- **Financial Times / MIT Technology Review** — same hairline-ruled editorial grid and small-body/large-headline contrast
- **Stripe Press** — same restraint, same reliance on rules and whitespace instead of elevation
- **Harvard GSD / RCA** — same academic asymmetric grid, staggered figure compositions and offset captions
- **Vercel** — same single-accent discipline and grey-until-hover control language

---

## Quick Start

### Tailwind v4 — add to the `@theme` block in `src/app/globals.css`

```css
@theme {
  /* Brand */
  --color-brand: #139C48;
  --color-brand-press: #0F7E3A;
  --color-mint: #75D2BC;
  --color-forest: #12312B;
  --color-abyss: #071E1A;

  /* Ink ladder */
  --color-ink: #111311;
  --color-ink-statement: #4f544f;
  --color-ink-control: #5f635f;
  --color-ink-body: #666b66;
  --color-ink-muted: #747974;
  --color-ink-soft: #868a86;
  --color-ink-faint: #929692;

  /* Lines */
  --color-rule: #d8dad7;
  --color-rule-control: #cfd2ce;
  --color-rule-panel: #dde1dc;
  --color-rule-strong: #bfc3bf;
  --color-rule-underline: #aeb2ae;
  --color-rule-chrome: #ececec;

  /* Surfaces */
  --color-canvas: #ffffff;
  --color-panel: #f5f5f2;
  --color-wash: #F8FAF7;
  --color-placeholder: #e7e9e6;
  --color-skeleton: #e4e7e3;
  --color-skeleton-light: #eceeeb;

  /* Type scale */
  --text-hero: clamp(2.65rem, 4vw, 4rem);
  --text-cta-display: 3rem;
  --text-section: 2.6rem;
  --text-row-title: 2rem;
  --text-card-title: 1.05rem;
  --text-news-title: 1.08rem;
  --text-person-name: 1rem;
  --text-list-title: 0.9rem;
  --text-statement: 0.88rem;
  --text-body-lead: 0.78rem;
  --text-body: 0.76rem;
  --text-body-sm: 0.72rem;
  --text-body-xs: 0.68rem;
  --text-control: 0.67rem;
  --text-control-sm: 0.61rem;
  --text-caption: 0.59rem;
  --text-meta: 0.58rem;

  /* Radius */
  --radius-figure: 0.65rem;
  --radius-thumb: 0.75rem;
  --radius-portrait: 0.8rem;
  --radius-card: 0.9rem;
  --radius-hero: 1rem;
  --radius-panel: 1.75rem;

  /* Motion */
  --ease-editorial: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Utility snippets

```css
/* The signature control — grey at rest, floods green on contact */
.pill-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid var(--color-rule-control);
  padding: 0.5rem 1rem;
  font-size: var(--text-control);
  font-weight: 500;
  color: var(--color-ink-control);
  transition:
    background-color 500ms var(--ease-editorial),
    border-color 500ms var(--ease-editorial),
    color 500ms var(--ease-editorial),
    transform 500ms var(--ease-editorial);
}
.pill-outline:hover {
  border-color: var(--color-brand);
  background-color: var(--color-brand);
  color: #fff;
}
.pill-outline:active { transform: scale(0.98); }

/* The headline setting — used at every section head */
.headline-section {
  font-size: var(--text-section);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.055em;
  color: var(--color-ink);
}
```
