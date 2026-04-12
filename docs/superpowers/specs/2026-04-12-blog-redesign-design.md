# Blog Redesign: The Zine × Terminal Hybrid

**Date**: 2026-04-12
**Status**: Approved
**Direction**: Zine's bold typography + terracotta palette with Terminal's monospace nav cues + copper vim cursor

## Design Decisions (Locked)

### Aesthetic Direction
- **The Zine × Terminal Hybrid**: Bold typographic hierarchy and terracotta warmth from The Zine direction, combined with monospace navigation cues (`~/devcoffee`, `[til]`, bracket syntax) and a copper-colored vim cursor from The Terminal direction.
- Dark mode as identity. Background at `oklch(10% 0.015 30)`.
- Personality lives in typography scale contrasts and terminal-inspired navigation — not in gradients or decorative effects.

### Color Palette (OKLCH)

**Surfaces** (all tinted toward hue 30°):
- `--surface-base: oklch(10% 0.015 30)` — body background
- `--surface-raised: oklch(14% 0.015 30)` — cards, post cards, sections
- `--surface-overlay: oklch(18% 0.015 30)` — hover states, active
- `--surface-muted: oklch(22% 0.012 30)` — borders, dividers
- `--surface-subtle: oklch(30% 0.01 30)` — tags, badges

**Text**:
- `--text-heading: oklch(93% 0.015 30)` — headings, hero text
- `--text-body: oklch(75% 0.015 30)` — body copy (weight 350 for dark bg optical balance)
- `--text-secondary: oklch(55% 0.015 30)` — dates, metadata, captions
- `--text-muted: oklch(42% 0.01 30)` — tertiary info, monospace dates in post list

**Accents**:
- `--accent-brand: oklch(55% 0.13 30)` — terracotta base (sparingly — 10% rule)
- `--accent-link: oklch(65% 0.12 30)` — terracotta links on dark
- `--accent-terminal: oklch(70% 0.15 45)` — copper for vim cursor, `~/devcoffee` nav, active terminal elements
- `--accent-terminal-muted: oklch(55% 0.08 45)` — `NORMAL` mode label, inactive terminal cues

**Semantic**:
- `--color-success: oklch(55% 0.12 145)` — muted green
- `--color-warning: oklch(55% 0.12 60)` — amber
- `--color-error: oklch(55% 0.15 15)` — warm red

**Selection**: `selection:bg-[terracotta-at-25%] selection:text-[heading-color]`

### Typography

**Font pairing** (to be finalized during implementation — search Google Fonts):
- **Display/headings**: A bold, tight-tracked sans-serif with personality. NOT Inter, NOT from the banned reflex list. Look for something with character at large sizes — condensed or with distinctive letterforms. Weight 700-900.
- **Body**: A readable serif for long-form. NOT from the banned list. Georgia as a fallback baseline, but find a proper Google Font with good italic and enough weight range. Weight 350-400 on dark.
- **Monospace**: For terminal nav cues, dates, code. JetBrains Mono or similar — must be readable at small sizes.

**Type scale** (fixed rem, 1.25 ratio):
- `--text-xs: 0.75rem` — captions, legal
- `--text-sm: 0.875rem` — metadata, monospace labels
- `--text-base: 1rem` (16px) — body
- `--text-lg: 1.25rem` — subheadings, lead text
- `--text-xl: 1.5rem` — section headings
- `--text-2xl: 1.875rem` — post titles, "Latest", "All Posts"
- `--text-3xl: 2.25rem` — post page title
- `--text-hero: clamp(4rem, 8vw, 7rem)` — binary post count (only element using fluid type)

**Line heights**: Body at 1.8 (extra for light-on-dark), headings at 1.15-1.3, monospace at 1.5.

### Layout & Spacing

**Container**: Max-width 720px for content, centered. No `container mx-auto px-5` — explicit max-width.
**Post body**: Max-width 65ch for readability.
**Spacing scale** (4pt base): 4, 8, 12, 16, 24, 32, 48, 64, 96px as `--space-xs` through `--space-3xl`.
**Grid**: Post cards use `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` with `gap: 16px`.

### Accessibility (WCAG 2.1 AA)
- All text meets 4.5:1 contrast against its background (verified with OKLCH lightness math)
- Focus indicators: 2px solid copper outline with 2px offset, visible on all interactive elements
- `prefers-reduced-motion`: disable vim cursor blink, disable glitch hover, disable staggered reveals
- Semantic HTML: proper heading hierarchy (h1 → h2 → h3, no skipping)
- Touch targets: 44×44px minimum on all interactive elements
- Skip-to-content link

## Component Map

Every component gets redesigned. Here's what changes:

### Page Shell
| Component | Current | Redesigned |
|-----------|---------|------------|
| `_document.tsx` | `bg-[#16181D]`, selection purple/blue | `bg-surface-base`, selection terracotta |
| `_app.tsx` | Imports CursorTrail | Same, but cursor color → copper |
| `layout.tsx` | Alert + main + Footer | Same structure, new styles |
| `container.tsx` | `container mx-auto px-5` | Max-width 720px, centered, responsive padding |
| `meta.tsx` | theme-color #000 | theme-color matches surface-base |

### Navigation & Chrome
| Component | Current | Redesigned |
|-----------|---------|------------|
| `alert.tsx` | Blue bg, blue text | `surface-raised` bg, monospace `new:` prefix, terracotta link |
| `header.tsx` | "← back" large bold | Monospace `← ~/devcoffee` with copper color, smaller |
| `footer.tsx` | Border-top, nav list, "Made using" | Monospace links, simpler, `© 2026 Prajwal P` left, social links right |
| `CursorTrail.tsx` | Green (#10b981) vim cursor | Copper `oklch(70% 0.15 45)`, same blink behavior |
| `progress-bar.tsx` | Gray bg, blue fill | Thin 2px bar at top, terracotta fill |

### Homepage
| Component | Current | Redesigned |
|-----------|---------|------------|
| `intro.tsx` | Gradient glow, gradient name text, centered, wave emoji | Giant binary number (hero), serif body intro, terminal-style link pills, vim cursor + NORMAL label, left-aligned |
| `latest-posts.tsx` | "Latest Posts" h2, 2-col grid of cards | "Latest" h2 (bold, tight-tracked), 2-col grid with redesigned cards |
| `post-preview.tsx` | Gradient hover glow, gradient text on hover, purple category badge | Clean card: terracotta category label, monospace date, bold title, no gradients, subtle border hover |
| `more-posts.tsx` | `bg-[#1A1D23]` section, year headers underlined, blue hover | Clean list: year headers (bold, no underline), monospace dates left, title right, terracotta hover |
| `categories.tsx` | `bg-[#1A1D23]` grid, centered text, blue hover | Inline tag list or compact grid, uppercase monospace labels, count in superscript |
| `AskEmail.tsx` | Generic form, blue button, self-deprecating copy | Styled to match palette: `surface-raised` input, terracotta button, keep the candid copy |
| `section-separator.tsx` | `hr` with neutral border | Short terracotta line (48px wide, 2px) or remove |

### Post Page
| Component | Current | Redesigned |
|-----------|---------|------------|
| `post-title.tsx` | `text-[#E8E8FD]` 3xl/5xl, center on mobile | `text-heading` color, 2.25rem, left-aligned always |
| `post-header.tsx` | Title + cover image + date | Category + date (monospace) + reading time row, then title, then cover image |
| `post-body.tsx` | `text-[#98A0B3]`, `text-justify`, `max-w-screen-xl` | Serif body at `--text-body` color, `max-width: 65ch`, left-aligned (no justify) |
| `markdown-styles.module.css` | Pink code, gray bg pre, light bg blockquote, blue links | Terracotta inline code, warmed dark code blocks, warm-tinted blockquote (no side stripe), terracotta links |
| `cover-image.tsx` | Basic img with shadow | Rounded corners, full-width within content column |
| `date-formatter.tsx` | White bold text | Monospace, `--text-secondary` color |
| `code-renderer.tsx` | GitHub light theme | Warmed One Dark theme matching palette |
| Breadcrumb (new) | Doesn't exist | Monospace `home / posts / slug` at bottom, `view raw` link |
| Reading progress (new) | Exists but unused | 2px terracotta bar fixed at top of viewport |

### Other Pages
| Page | Current | Redesigned |
|------|---------|------------|
| `til.tsx` | Blue disclosure buttons, gray-800 bg | `surface-raised` panels, terracotta disclosure trigger, clean transition |
| `404.tsx` | `bg-[#1A2238]`, orange accent, offset shadow button | Match palette: surface-base bg, big `404` in heading style, terracotta "Go Home" |
| `roadmap.tsx` | Meme API page | Keep as-is (WIP page, low priority) — just update bg color to match |
| `posts/tag/[tag].tsx` | Uses MorePosts | Will inherit MorePosts redesign |
| `posts/raw/[slug].tsx` | White bg pre | Keep functional, minimal styling update |

### Global Styles
| File | Changes |
|------|---------|
| `styles/index.css` | Replace Inter/Open Sans imports with chosen fonts. Update wave animation. Replace gist theme colors to match palette. Update vim-cursor color to copper. Update glitch keyframes. Add CSS custom properties for full token system. Add `prefers-reduced-motion` media query. |
| `tailwind.config.js` | Extend with new font families, colors as CSS variables, animation updates |

## Out of Scope
- No new features or pages
- No changes to data layer (`lib/api.ts`, `lib/markdownToHtml.ts`, `lib/generateRssFeed.ts`)
- No changes to post content or frontmatter
- No changes to `types/post.ts`
- `roadmap.tsx` gets minimal treatment (bg color only)
- `posts/raw/[slug].tsx` keeps basic functionality
- `BookWidget.tsx`, `BookWrapper.tsx`, `Books.tsx` — currently WIP/placeholder, update colors to match but don't redesign

## Implementation Order
1. **Foundation**: CSS custom properties, font imports, tailwind config, `_document.tsx`, `styles/index.css`
2. **Shell**: `container.tsx`, `layout.tsx`, `meta.tsx`
3. **Navigation**: `header.tsx`, `footer.tsx`, `alert.tsx`, `CursorTrail.tsx`
4. **Homepage**: `intro.tsx`, `latest-posts.tsx`, `post-preview.tsx`, `more-posts.tsx`, `categories.tsx`, `AskEmail.tsx`, `section-separator.tsx`
5. **Post page**: `post-title.tsx`, `post-header.tsx`, `post-body.tsx`, `markdown-styles.module.css`, `cover-image.tsx`, `date-formatter.tsx`, `code-renderer.tsx`, `[slug].tsx` (reading progress + breadcrumb)
6. **Other pages**: `til.tsx`, `404.tsx`, `roadmap.tsx` (minimal), `tag/[tag].tsx`
7. **Polish**: `prefers-reduced-motion`, focus indicators, skip-to-content, final contrast audit
