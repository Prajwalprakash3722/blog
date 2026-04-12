# Blog Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign blog.devcoffee.me with The Zine × Terminal hybrid aesthetic — terracotta palette, bold typography, monospace terminal nav cues, copper vim cursor.

**Architecture:** Pure visual redesign of existing Next.js + Tailwind blog. No data layer changes. CSS custom properties for the design token system, Tailwind config extended with new fonts/colors, every component restyled. Fonts loaded from Google Fonts via `@font-face` with `font-display: swap`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 3, TypeScript. Fonts: Bricolage Grotesque (display), Source Serif 4 (body), JetBrains Mono (code/terminal).

**Spec:** `docs/superpowers/specs/2026-04-12-blog-redesign-design.md`

---

## File Map

### Modified Files
| File | Responsibility |
|------|---------------|
| `styles/index.css` | CSS custom properties, font imports, global styles, gist theme, animations |
| `tailwind.config.js` | Font families, color tokens, animation config |
| `pages/_document.tsx` | Body class (bg, selection colors) |
| `pages/_app.tsx` | No structural change (just imports) |
| `pages/index.tsx` | No structural change (composition) |
| `pages/posts/[slug].tsx` | Add reading progress bar, breadcrumb, restructure |
| `pages/til.tsx` | Restyle disclosure panels |
| `pages/404.tsx` | Restyle to match palette |
| `pages/roadmap.tsx` | Minimal — bg color only |
| `pages/posts/tag/[tag].tsx` | Inherits MorePosts changes |
| `components/container.tsx` | Max-width 720px |
| `components/layout.tsx` | No structural change |
| `components/meta.tsx` | Update theme-color |
| `components/alert.tsx` | Restyle: monospace, terracotta link |
| `components/header.tsx` | Monospace `← ~/devcoffee`, copper |
| `components/footer.tsx` | Monospace links, simplified layout |
| `components/CursorTrail.tsx` | Cursor color → copper |
| `components/intro.tsx` | Giant binary hero, serif body, terminal link pills |
| `components/latest-posts.tsx` | Restyle heading, keep grid |
| `components/post-preview.tsx` | Remove gradients, clean card style |
| `components/more-posts.tsx` | Clean list with monospace dates |
| `components/categories.tsx` | Compact tag grid, fix typo "Catagories" |
| `components/AskEmail.tsx` | Match palette |
| `components/section-separator.tsx` | Short terracotta line |
| `components/post-title.tsx` | Left-aligned, heading color |
| `components/post-header.tsx` | Category + date row, then title, then image |
| `components/post-body.tsx` | Serif body, 65ch, left-aligned |
| `components/markdown-styles.module.css` | Full restyle for dark theme |
| `components/cover-image.tsx` | Rounded, full-width in column |
| `components/date-formatter.tsx` | Monospace, secondary color |
| `components/code-renderer.tsx` | Warmed dark theme |
| `components/progress-bar.tsx` | Thin terracotta bar |
| `components/avatar.tsx` | Minor color update |
| `components/Books.tsx` | Color update |
| `components/BookWidget.tsx` | Color update |
| `components/BookWrapper.tsx` | Color update |
| `components/Seo.tsx` | No change needed |

---

## Task 1: Design Token Foundation

**Files:**
- Modify: `styles/index.css`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Add CSS custom properties and font imports to `styles/index.css`**

Replace the entire top section of `styles/index.css` (the font imports and tailwind directives) with:

```css
/* Fonts: Bricolage Grotesque (display), Source Serif 4 (body), JetBrains Mono (code) */
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Surfaces */
    --surface-base: oklch(10% 0.015 30);
    --surface-raised: oklch(14% 0.015 30);
    --surface-overlay: oklch(18% 0.015 30);
    --surface-muted: oklch(22% 0.012 30);
    --surface-subtle: oklch(30% 0.01 30);

    /* Text */
    --text-heading: oklch(93% 0.015 30);
    --text-body: oklch(75% 0.015 30);
    --text-secondary: oklch(55% 0.015 30);
    --text-muted: oklch(42% 0.01 30);

    /* Accents */
    --accent-brand: oklch(55% 0.13 30);
    --accent-link: oklch(65% 0.12 30);
    --accent-terminal: oklch(70% 0.15 45);
    --accent-terminal-muted: oklch(55% 0.08 45);

    /* Semantic */
    --color-success: oklch(55% 0.12 145);
    --color-warning: oklch(55% 0.12 60);
    --color-error: oklch(55% 0.15 15);

    /* Spacing */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;
    --space-3xl: 64px;
    --space-4xl: 96px;
  }
}

/* Focus indicators */
*:focus-visible {
  outline: 2px solid var(--accent-terminal);
  outline-offset: 2px;
}

/* Selection */
::selection {
  background: oklch(25% 0.04 30);
  color: var(--text-heading);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Skip to content */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 100;
  padding: 8px 16px;
  background: var(--surface-raised);
  color: var(--accent-terminal);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  border-radius: 0 0 4px 4px;
  text-decoration: none;
}

.skip-to-content:focus {
  top: 0;
}
```

Keep everything below the old `@tailwind utilities;` line (wave animation, gist styles, glitch, vim-cursor) — we'll update those in a later step.

- [ ] **Step 2: Update vim-cursor and glitch styles in `styles/index.css`**

Find the `.vim-cursor` block at the bottom and replace it:

```css
.vim-cursor {
  width: 8px;
  height: 20px;
  background-color: var(--accent-terminal);
  animation: vim-blink 700ms step-end infinite;
  animation-delay: 700ms;
  transform: translate(-4px, -10px);
}
```

Find the gist highlight background and update it:

```css
body .gist .highlight {
  background: var(--surface-raised);
}
```

- [ ] **Step 3: Update `tailwind.config.js`**

Replace the entire file:

```js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ['"Source Serif 4"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "Menlo", "Monaco", "monospace"],
        sans: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          base: "var(--surface-base)",
          raised: "var(--surface-raised)",
          overlay: "var(--surface-overlay)",
          muted: "var(--surface-muted)",
          subtle: "var(--surface-subtle)",
        },
        text: {
          heading: "var(--text-heading)",
          body: "var(--text-body)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        accent: {
          brand: "var(--accent-brand)",
          link: "var(--accent-link)",
          terminal: "var(--accent-terminal)",
          "terminal-muted": "var(--accent-terminal-muted)",
        },
        semantic: {
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          error: "var(--color-error)",
        },
      },
      animation: {
        tilt: "tilt 10s infinite linear",
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.5deg)",
          },
          "75%": {
            transform: "rotate(-0.5deg)",
          },
        },
      },
    },
  },
  plugins: [
    {
      ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
  ],
};
```

- [ ] **Step 4: Verify the dev server starts**

Run: `npm run dev`
Expected: No build errors. The page will look broken (colors wrong, fonts loading) — that's expected. We just need no compilation errors.

- [ ] **Step 5: Commit**

```bash
git add styles/index.css tailwind.config.js
git commit -m "feat: add design token foundation — OKLCH palette, font imports, tailwind config"
```

---

## Task 2: Page Shell — Document, Layout, Container

**Files:**
- Modify: `pages/_document.tsx`
- Modify: `components/container.tsx`
- Modify: `components/layout.tsx`
- Modify: `components/meta.tsx`
- Modify: `pages/_app.tsx`

- [ ] **Step 1: Update `pages/_document.tsx`**

Replace the body tag className:

```tsx
<body className="bg-surface-base text-text-body font-body">
```

Remove the old `selection:bg-[#1D2433] selection:text-[#5686F5]` classes — selection is now handled globally in CSS.

Full updated render method:

```tsx
render() {
  return (
    <Html lang="en">
      <Head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "e51b7f6db46e4c0894b5b34befeeb154"}'></script>
      </Head>
      <body className="bg-surface-base text-text-body font-body">
        <Main />
        <NextScript />
        <Script id="smooth-scroll" strategy="lazyOnload">
          {`
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
function onLoad() {
      var elements = document.querySelectorAll(".gist > .gist-file > .gist-meta");
      elements.forEach(function (element) {
        element.parentElement.removeChild(element);
      });
  }
  onLoad();
          `}
        </Script>
      </body>
    </Html>
  );
}
```

- [ ] **Step 2: Update `components/container.tsx`**

Replace the entire component:

```tsx
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="max-w-[720px] mx-auto px-5 md:px-6">{children}</div>
  );
};

export default Container;
```

- [ ] **Step 3: Update `components/meta.tsx`**

Update the theme-color meta tag:

```tsx
<meta name="theme-color" content="#1a1410" />
```

(This is approximately `oklch(10% 0.015 30)` in hex.)

- [ ] **Step 4: Add skip-to-content link in `components/layout.tsx`**

```tsx
import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import PostType from "../types/post";

type Props = {
  children: React.ReactNode;
  newArticle?: PostType;
};

const Layout = ({ children, newArticle }: Props) => {
  return (
    <>
      <Meta />
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <div className="min-h-screen">
        <Alert newArticle={newArticle} />
        <main id="main-content">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
```

- [ ] **Step 5: Verify dev server**

Run: `npm run dev`
Expected: Page loads with new background color (warm dark), new body font (Source Serif 4 loading). No errors.

- [ ] **Step 6: Commit**

```bash
git add pages/_document.tsx components/container.tsx components/layout.tsx components/meta.tsx
git commit -m "feat: update page shell — document, container, layout, meta"
```

---

## Task 3: Navigation Chrome — Header, Footer, Alert, CursorTrail

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/footer.tsx`
- Modify: `components/alert.tsx`
- Modify: `components/CursorTrail.tsx`

- [ ] **Step 1: Update `components/header.tsx`**

Replace entire component:

```tsx
import Link from "next/link";

const Header = () => {
  return (
    <h2 className="mt-8 mb-12 md:mb-16">
      <Link
        href="/"
        className="font-mono text-sm text-accent-terminal hover:text-accent-link transition-colors"
      >
        &larr; ~/devcoffee
      </Link>
    </h2>
  );
};

export default Header;
```

- [ ] **Step 2: Update `components/footer.tsx`**

Replace entire component:

```tsx
import React from "react";
import Container from "./container";

const Footer = () => {
  const navLinks = [
    { name: "github", path: "https://github.com/Prajwalprakash3722" },
    { name: "twitter", path: "https://twitter.com/prajwal_3722" },
    { name: "portfolio", path: "https://www.devcoffee.me" },
    { name: "rss", path: "https://blog.devcoffee.me/rss.xml" },
  ];

  return (
    <footer className="border-t border-surface-muted">
      <Container>
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Prajwal P
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    className="font-mono text-xs text-text-secondary hover:text-accent-terminal transition-colors"
                    href={link.path}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 3: Update `components/alert.tsx`**

Replace entire component:

```tsx
import Container from "./container";
import PostType from "../types/post";
import { useRouter } from "next/router";

type Props = {
  newArticle?: PostType;
};

const Alert = ({ newArticle }: Props) => {
  const router = useRouter();
  const slug = router.query.slug;

  return slug === undefined || slug === newArticle?.slug ? (
    <div className="py-2 border-b border-surface-muted bg-surface-raised">
      <Container>
        {newArticle && (
          <div className="py-1 text-center font-mono text-xs text-text-secondary">
            new:{" "}
            <a
              href={`posts/${newArticle.slug}`}
              className="text-accent-link underline underline-offset-2 hover:text-accent-brand transition-colors"
            >
              {newArticle.title}
            </a>
          </div>
        )}
      </Container>
    </div>
  ) : null;
};

export default Alert;
```

- [ ] **Step 4: Update `components/CursorTrail.tsx`**

Only change is the color — already handled via CSS variable. But let's clean up the component:

```tsx
import React, { useState, useEffect } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const CursorTrail: React.FC = () => {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 vim-cursor"
      style={{
        left: cursorPos.x,
        top: cursorPos.y,
      }}
      aria-hidden="true"
    />
  );
};

export default CursorTrail;
```

The `.vim-cursor` class now uses `var(--accent-terminal)` from Task 1.

- [ ] **Step 5: Verify**

Run: `npm run dev`
Expected: Copper vim cursor following mouse. Footer shows monospace links. Alert bar styled.

- [ ] **Step 6: Commit**

```bash
git add components/header.tsx components/footer.tsx components/alert.tsx components/CursorTrail.tsx
git commit -m "feat: restyle navigation chrome — header, footer, alert, cursor"
```

---

## Task 4: Homepage — Intro Section

**Files:**
- Modify: `components/intro.tsx`

- [ ] **Step 1: Replace `components/intro.tsx`**

```tsx
import Link from "next/link";

interface Props {
  totalPostNumber: number;
}

const Intro = ({ totalPostNumber }: Props) => {
  return (
    <section className="py-16 md:py-24">
      {/* Hero: binary post count */}
      <div className="mb-8">
        <p className="font-display font-black text-text-heading leading-[0.85] tracking-[-0.04em]"
           style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}>
          {(totalPostNumber >> 0).toString(2)}
        </p>
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-text-muted mt-2">
          articles written &middot; in binary, obviously
        </p>
      </div>

      {/* Bio */}
      <div className="max-w-[520px] mt-10">
        <p className="font-body text-lg leading-[1.7] text-text-body">
          Hi, I&apos;m{" "}
          <strong className="text-text-heading font-bold">Prajwal</strong>. I
          currently work as an SRE at PhonePe, India. I write about systems that
          break, books that don&apos;t, and the space between philosophy and
          production incidents.
        </p>
      </div>

      {/* Vim cursor + mode indicator */}
      <div className="flex items-center gap-2 mt-8">
        <div
          className="w-2 h-[18px] rounded-[1px]"
          style={{ backgroundColor: "var(--accent-terminal)" }}
          aria-hidden="true"
        />
        <span className="font-mono text-[10px] text-accent-terminal-muted tracking-wide">
          NORMAL
        </span>
      </div>

      {/* Terracotta section divider */}
      <div
        className="w-12 h-[2px] mt-6"
        style={{ backgroundColor: "var(--accent-brand)" }}
      />

      {/* Navigation pills */}
      <div className="flex flex-wrap gap-3 mt-8">
        <a
          href="https://www.devcoffee.me"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-surface-raised border border-surface-muted rounded font-mono text-xs text-text-secondary hover:text-accent-terminal hover:border-accent-terminal-muted transition-colors"
        >
          about
        </a>
        <Link
          href="/til"
          className="px-4 py-2 bg-surface-raised border border-surface-muted rounded font-mono text-xs text-accent-terminal hover:border-accent-terminal-muted transition-colors"
        >
          til
        </Link>
        <Link
          href="/travel"
          className="px-4 py-2 bg-surface-raised border border-surface-muted rounded font-mono text-xs text-text-secondary hover:text-accent-terminal hover:border-accent-terminal-muted transition-colors"
        >
          travel
        </Link>
      </div>
    </section>
  );
};

export default Intro;
```

- [ ] **Step 2: Verify**

Run: `npm run dev`
Expected: Giant binary number in Bricolage Grotesque, serif bio text, copper vim cursor indicator, terracotta divider, monospace nav pills.

- [ ] **Step 3: Commit**

```bash
git add components/intro.tsx
git commit -m "feat: redesign intro — giant binary hero, serif bio, terminal nav pills"
```

---

## Task 5: Homepage — Latest Posts & Post Preview Cards

**Files:**
- Modify: `components/latest-posts.tsx`
- Modify: `components/post-preview.tsx`
- Modify: `components/date-formatter.tsx`

- [ ] **Step 1: Update `components/date-formatter.tsx`**

```tsx
import { format, parseISO } from "date-fns";

type Props = {
  dateString: string;
  short?: boolean;
};

const DateFormatter = ({ dateString, short }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="font-mono text-text-muted">
      {short ? (
        <span>
          {format(date, "dd MMM")}
        </span>
      ) : (
        <span>
          {format(date, "EEEE, LLLL d, yyyy")}
        </span>
      )}
    </time>
  );
};

export default DateFormatter;
```

- [ ] **Step 2: Update `components/post-preview.tsx`**

Replace entire component:

```tsx
import DateFormatter from "./date-formatter";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  readingTime?: string;
  category: string;
};

const PostPreview = ({
  title,
  date,
  slug,
  excerpt,
  readingTime,
  category,
}: Props) => {
  return (
    <Link href={`/posts/${slug}`} className="group block h-full">
      <article className="h-full flex flex-col justify-between p-5 bg-surface-raised border border-surface-muted rounded-md hover:border-accent-terminal-muted transition-colors">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-accent-link font-semibold">
              {category}
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              <DateFormatter dateString={date} short />
            </span>
          </div>

          <h3 className="font-display text-lg md:text-xl font-bold text-text-heading leading-snug mb-2 group-hover:text-accent-link transition-colors">
            {title}
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>

        <div className="flex items-center mt-4 pt-3 border-t border-surface-muted">
          <span className="flex items-center font-mono text-[10px] text-text-muted">
            <svg
              className="w-3.5 h-3.5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {readingTime || "1 min read"}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default PostPreview;
```

- [ ] **Step 3: Update `components/latest-posts.tsx`**

```tsx
import Post from "../types/post";
import PostPreview from "./post-preview";

type Props = {
  posts: Post[];
};

const LatestPosts = ({ posts }: Props) => {
  return (
    <section className="my-12 md:my-16">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-8">
        Latest
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
            readingTime={post.readingTime}
            category={post.category}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
```

- [ ] **Step 4: Verify**

Run: `npm run dev`
Expected: "Latest" heading in Bricolage Grotesque bold. Cards with terracotta category labels, monospace dates, clean hover state.

- [ ] **Step 5: Commit**

```bash
git add components/date-formatter.tsx components/post-preview.tsx components/latest-posts.tsx
git commit -m "feat: redesign latest posts section and post cards"
```

---

## Task 6: Homepage — All Posts, Categories, Email, Separator

**Files:**
- Modify: `components/more-posts.tsx`
- Modify: `components/categories.tsx`
- Modify: `components/AskEmail.tsx`
- Modify: `components/section-separator.tsx`

- [ ] **Step 1: Update `components/more-posts.tsx`**

```tsx
import Post from "../types/post";
import { format } from "date-fns";

type Props = {
  posts: Post[];
  header: string;
};

const MorePosts = ({ posts, header }: Props) => {
  const allYears = posts.map((post) => post.date.split("-")[0]);

  return (
    <section className="my-12 md:my-16" id="posts">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-8">
        {header}
      </h2>
      <div className="flex flex-col max-w-2xl">
        {allYears
          .filter((x, i, a) => a.indexOf(x) === i)
          .map((year) => {
            const postsByYear = posts.filter(
              (post) => post.date.split("-")[0] === year
            );
            return (
              <div key={year} className="mb-8">
                <h3 className="font-display text-lg font-bold text-text-heading mb-3">
                  {year}
                </h3>
                <div className="flex flex-col">
                  {postsByYear.map((post) => (
                    <a
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="group flex items-center py-2.5 px-3 -mx-3 rounded hover:bg-surface-raised transition-colors"
                    >
                      <span className="font-mono text-xs text-text-muted min-w-[60px] shrink-0">
                        {format(new Date(post.date), "dd MMM")}
                      </span>
                      <span className="text-[15px] font-medium text-text-body group-hover:text-accent-link transition-colors">
                        {post.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default MorePosts;
```

- [ ] **Step 2: Update `components/categories.tsx`**

Fix the typo ("Catagories" → "Categories") and restyle:

```tsx
import Post from "../types/post";

type Props = {
  posts: Post[];
};

const Categories = ({ posts }: Props) => {
  return (
    <section className="my-12 md:my-16">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-8">
        Categories
      </h2>
      <div className="flex flex-wrap gap-3">
        {posts
          .map((item) => item.category)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort()
          .map((category) => (
            <a
              href={`posts/tag/${category}`}
              key={category}
              className="px-4 py-2 bg-surface-raised border border-surface-muted rounded font-mono text-sm text-text-body hover:text-accent-link hover:border-accent-terminal-muted transition-colors"
            >
              {category}
              <sup className="ml-1 text-text-muted">
                {posts.filter((post) => post.category === category).length}
              </sup>
            </a>
          ))}
      </div>
    </section>
  );
};

export default Categories;
```

- [ ] **Step 3: Update `components/AskEmail.tsx`**

```tsx
import { FormEvent, useState } from "react";

function AskEmail() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <div className="my-12 md:my-16">
      <h2 className="font-display text-lg font-bold text-text-secondary mb-4">
        In case you care for updates by email.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-4"
      >
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 h-11 px-4 bg-surface-raised border border-surface-muted rounded font-mono text-sm text-text-body placeholder:text-text-muted focus:outline-none focus:border-accent-terminal transition-colors"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="h-11 px-6 font-mono text-sm font-medium rounded transition-colors"
          style={{
            backgroundColor: "var(--accent-brand)",
            color: "var(--text-heading)",
          }}
        >
          notify me
        </button>
      </form>
      <p className="font-body text-sm text-text-secondary leading-relaxed">
        I mostly write notes to self — I can&apos;t imagine you&apos;d be
        interested, but if you are, you&apos;re welcome.
      </p>
      <p className="font-body text-sm text-text-muted mt-1">
        (Obviously, I won&apos;t share your email with anyone.)
      </p>
    </div>
  );
}

export default AskEmail;
```

- [ ] **Step 4: Update `components/section-separator.tsx`**

```tsx
const SectionSeparator = () => {
  return (
    <hr
      className="my-12 md:my-16 w-12 border-0"
      style={{
        height: "2px",
        backgroundColor: "var(--accent-brand)",
      }}
    />
  );
};

export default SectionSeparator;
```

- [ ] **Step 5: Update the import name in `pages/index.tsx`**

The categories component was imported as `Catagories` — update the import:

In `pages/index.tsx`, change:
```tsx
import Catagories from "../components/categories";
```
to:
```tsx
import Categories from "../components/categories";
```

And in the JSX, change:
```tsx
<Catagories posts={allPosts} />
```
to:
```tsx
<Categories posts={allPosts} />
```

- [ ] **Step 6: Verify**

Run: `npm run dev`
Expected: All Posts as a clean list with monospace dates. Categories as inline tag pills. Email section matches palette. Terracotta divider line.

- [ ] **Step 7: Commit**

```bash
git add components/more-posts.tsx components/categories.tsx components/AskEmail.tsx components/section-separator.tsx pages/index.tsx
git commit -m "feat: redesign all posts, categories, email, separator"
```

---

## Task 7: Post Page — Title, Header, Body, Markdown Styles

**Files:**
- Modify: `components/post-title.tsx`
- Modify: `components/post-header.tsx`
- Modify: `components/post-body.tsx`
- Modify: `components/markdown-styles.module.css`
- Modify: `components/cover-image.tsx`

- [ ] **Step 1: Update `components/post-title.tsx`**

```tsx
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] text-text-heading">
      {children}
    </h1>
  );
};

export default PostTitle;
```

- [ ] **Step 2: Update `components/post-header.tsx`**

```tsx
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  date: string;
};

const PostHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <div className="mb-4">
        <div className="font-mono text-xs text-text-secondary mb-4">
          <DateFormatter dateString={date} />
        </div>
        <PostTitle>{title}</PostTitle>
      </div>
      <div className="my-8">
        <CoverImage title={title} src={coverImage} />
      </div>
    </>
  );
};

export default PostHeader;
```

- [ ] **Step 3: Update `components/cover-image.tsx`**

```tsx
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className="w-full h-auto rounded-md object-cover"
    />
  );

  return (
    <div>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
```

- [ ] **Step 4: Update `components/post-body.tsx`**

```tsx
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
  post?: boolean;
};

const PostBody = ({ content, post = true }: Props) => {
  return (
    <div className="max-w-[65ch] mx-auto">
      <div
        className={
          markdownStyles["markdown"] +
          ` ${
            !post
              ? "px-4 pb-2 pt-4 text-sm text-text-secondary"
              : "text-text-body leading-[1.8] font-body"
          } `
        }
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
```

- [ ] **Step 5: Replace `components/markdown-styles.module.css`**

```css
.markdown {
  @apply text-base leading-[1.8];
}

.markdown p,
.markdown ul,
.markdown ol,
.markdown blockquote {
  @apply my-5;
  overflow-wrap: break-word;
}

.markdown h2 {
  @apply text-[22px] mt-10 mb-4 leading-snug font-bold tracking-tight;
  color: var(--text-heading);
  font-family: "Bricolage Grotesque", system-ui, sans-serif;
}

.markdown h3 {
  @apply text-lg mt-8 mb-3 leading-snug font-bold;
  color: var(--text-heading);
  font-family: "Bricolage Grotesque", system-ui, sans-serif;
}

.markdown ul {
  @apply list-disc list-outside pl-8;
}

.markdown ol {
  @apply list-decimal list-outside pl-8;
}

.markdown code {
  font-family: "JetBrains Mono", monospace;
  @apply text-sm break-words px-1.5 py-0.5 rounded;
  color: var(--accent-link);
  background: var(--surface-raised);
}

.markdown pre {
  font-family: "JetBrains Mono", monospace;
  @apply text-sm p-5 rounded-md overflow-x-auto my-6 leading-[1.7];
  background: var(--surface-raised);
  color: var(--text-body);
  border: 1px solid var(--surface-muted);
}

.markdown pre code {
  @apply p-0 bg-transparent text-inherit;
}

.markdown blockquote {
  @apply relative p-4 text-[15px] italic rounded-md;
  background: var(--surface-raised);
  color: var(--text-secondary);
  font-family: "Source Serif 4", Georgia, serif;
}

.markdown b,
.markdown strong {
  @apply font-bold;
  color: var(--text-heading);
}

.markdown a {
  color: var(--accent-link);
  @apply underline underline-offset-2;
  text-decoration-color: oklch(65% 0.06 30);
}

.markdown a:hover {
  color: var(--accent-brand);
}

.markdown img {
  @apply rounded-md my-6 w-full;
}

.markdown u {
  @apply underline;
}

.markdown table {
  @apply w-full text-sm text-left border-collapse my-6;
  color: var(--text-body);
}

.markdown thead {
  @apply text-xs uppercase;
  background: var(--surface-raised);
  color: var(--text-secondary);
}

.markdown th {
  @apply py-3 px-4;
}

.markdown td {
  @apply py-3 px-4;
  border-bottom: 1px solid var(--surface-muted);
}
```

- [ ] **Step 6: Verify**

Run: `npm run dev`, navigate to any post.
Expected: Post title in Bricolage Grotesque, body in Source Serif 4, code blocks in JetBrains Mono with warm dark background, terracotta links, blockquotes with warm tinted bg (no side stripe).

- [ ] **Step 7: Commit**

```bash
git add components/post-title.tsx components/post-header.tsx components/post-body.tsx components/markdown-styles.module.css components/cover-image.tsx
git commit -m "feat: redesign post page — title, header, body, markdown styles"
```

---

## Task 8: Post Page — Reading Progress, Breadcrumb, Slug Page

**Files:**
- Modify: `pages/posts/[slug].tsx`
- Modify: `components/progress-bar.tsx`

- [ ] **Step 1: Update `components/progress-bar.tsx`**

```tsx
interface Props {
  percent: number;
}

const ProgressBar = ({ percent }: Props) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 h-0.5"
      style={{ backgroundColor: "var(--surface-muted)" }}
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${percent}%`,
          backgroundColor: "var(--accent-brand)",
        }}
      />
    </div>
  );
};

export default ProgressBar;
```

- [ ] **Step 2: Update `pages/posts/[slug].tsx`**

```tsx
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { useEffect, useState } from "react";

import Container from "../../components/container";
import ErrorPage from "next/error";
import Head from "next/head";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Link from "next/link";
import Meta from "../../components/meta";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PostTitle from "../../components/post-title";
import PostType from "../../types/post";
import ProgressBar from "../../components/progress-bar";
import Seo from "../../components/Seo";
import markdownToHtml from "../../lib/markdownToHtml";
import { useRouter } from "next/router";

type Props = {
  post: PostType;
  morePosts: PostType[];
  draft?: boolean;
};

const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const post: PostType = props.post;
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight || document.body.scrollHeight;
    const percent = (scrollTop / (scrollHeight - el.clientHeight)) * 100;
    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  });

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Meta description={post.excerpt} imageUrl={post.ogImage.url} />
      <Seo post={post} />
      <ProgressBar percent={width} />
      <Layout>
        <Container>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading&hellip;</PostTitle>
          ) : (
            <>
              <article className="mb-16">
                <Head>
                  <title>{post.title}</title>
                  <meta property="og:image" content={post.ogImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                />
                <PostBody content={post.content} />

                {/* Breadcrumb */}
                <div className="mt-12 pt-6 border-t border-surface-muted flex justify-between items-center">
                  <nav className="font-mono text-xs text-text-muted" aria-label="Breadcrumb">
                    <Link href="/" className="text-accent-terminal hover:text-accent-link transition-colors">
                      home
                    </Link>
                    {" / "}
                    <Link href="/#posts" className="text-accent-terminal hover:text-accent-link transition-colors">
                      posts
                    </Link>
                    {" / "}
                    <span>{post.slug}</span>
                  </nav>
                  <Link
                    href={`/posts/raw/${post.slug}`}
                    className="font-mono text-xs text-text-muted hover:text-accent-terminal transition-colors"
                  >
                    view raw
                  </Link>
                </div>
              </article>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
  const post = getPostBySlug(context.params?.slug as string, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
    "excerpt",
  ]);
  const posts = getAllPosts(["title"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
      posts,
    },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, navigate to a post, scroll.
Expected: Thin terracotta progress bar at top. Monospace breadcrumb at bottom with `home / posts / slug` and `view raw` link.

- [ ] **Step 4: Commit**

```bash
git add components/progress-bar.tsx pages/posts/[slug].tsx
git commit -m "feat: add reading progress bar and breadcrumb to post page"
```

---

## Task 9: Other Pages — TIL, 404, Roadmap, Tag

**Files:**
- Modify: `pages/til.tsx`
- Modify: `pages/404.tsx`
- Modify: `pages/roadmap.tsx`
- Modify: `pages/posts/tag/[tag].tsx`

- [ ] **Step 1: Update `pages/til.tsx`**

```tsx
/* eslint-disable @next/next/no-img-element */
import { InferGetStaticPropsType } from "next";
import Header from "../components/header";
import Layout from "../components/layout";
import { getAllTil } from "../lib/api";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import DateFormatter from "../components/date-formatter";
import Container from "../components/container";
import markdownStyles from "../components/markdown-styles.module.css";

export const getStaticProps = async () => {
  const allPosts = getAllTil(["title", "date", "content"]);
  return {
    props: { allPosts },
    revalidate: 3600,
  };
};

function TILPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Container>
        <Header />
        <div className="mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-text-heading mb-3">
            Today I Learned
          </h1>
          <p className="font-body text-lg text-text-secondary max-w-xl">
            A collection of bite-sized notes on things I&apos;ve learned over
            time.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {props.allPosts.map((post) => (
            <div key={post.slug} className="bg-surface-raised rounded-md">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between items-center px-5 py-3 text-left font-display text-sm font-semibold text-text-heading hover:bg-surface-overlay rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-terminal">
                      <span>{post.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-text-muted">
                          <DateFormatter dateString={post.date} short />
                        </span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-4 w-4 text-text-secondary transition-transform`}
                        />
                      </div>
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel as="div" className="px-5 pb-4">
                        <div
                          className={
                            markdownStyles["markdown"] +
                            " text-sm text-text-secondary font-body"
                          }
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export default TILPage;
```

- [ ] **Step 2: Update `pages/404.tsx`**

```tsx
import Link from "next/link";

function ErrorPage() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-surface-base">
      <h1 className="font-display font-black text-text-heading tracking-tighter"
          style={{ fontSize: "clamp(5rem, 15vw, 10rem)" }}>
        404
      </h1>
      <p className="font-body text-text-secondary mt-2">
        You seem to be alone here. Even the server couldn&apos;t find you.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 font-mono text-sm rounded transition-colors"
        style={{
          backgroundColor: "var(--accent-brand)",
          color: "var(--text-heading)",
        }}
      >
        go home
      </Link>
    </main>
  );
}

export default ErrorPage;
```

- [ ] **Step 3: Update `pages/roadmap.tsx` — minimal**

Only update the background color. In the JSX, change:

```tsx
<div className="flex flex-col items-center justify-center min-h-screen">
```
to:
```tsx
<div className="flex flex-col items-center justify-center min-h-screen bg-surface-base">
```

And update all `text-slate-50` to `text-text-heading`.

- [ ] **Step 4: Verify**

Run: `npm run dev`
- Check `/til` — disclosure panels with warm styling
- Check `/404` (any invalid URL) — big 404, terracotta button
- Check `/roadmap` — bg matches

- [ ] **Step 5: Commit**

```bash
git add pages/til.tsx pages/404.tsx pages/roadmap.tsx
git commit -m "feat: restyle TIL, 404, and roadmap pages"
```

---

## Task 10: Book Components & Minor Cleanup

**Files:**
- Modify: `components/Books.tsx`
- Modify: `components/BookWidget.tsx`
- Modify: `components/BookWrapper.tsx`
- Modify: `components/avatar.tsx`

- [ ] **Step 1: Update `components/Books.tsx`**

```tsx
import React from "react";
import BookWidget from "./BookWidget";

const Books = () => {
  return (
    <section className="my-12 md:my-16" id="posts">
      <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading mb-8">
        Books I&apos;m Reading
      </h2>
      <div className="max-w-2xl">
        <BookWidget />
      </div>
    </section>
  );
};

export default Books;
```

- [ ] **Step 2: Update `components/BookWrapper.tsx`**

```tsx
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

interface BookWrapperProps {
  imgSrc: string;
  bookName: string;
  articleLink?: string;
}

const BookWrapper = ({ imgSrc, bookName, articleLink }: BookWrapperProps) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => {
        articleLink ? router.push(articleLink) : null;
      }}
    >
      <img
        src={imgSrc}
        className="h-48 w-auto object-contain rounded"
        alt={bookName}
      />
      <h3 className="font-body text-sm text-text-body mt-3">{bookName}</h3>
    </div>
  );
};

export default BookWrapper;
```

- [ ] **Step 3: Update `components/BookWidget.tsx`**

```tsx
import React from "react";
import BookWrapper from "./BookWrapper";

const BookWidget = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      <BookWrapper
        bookName="PP The Op"
        imgSrc="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1433161048l/1137215._SX98_.jpg"
      />
      <BookWrapper
        bookName="Ikigai"
        imgSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1456092979i/28787203.jpg"
        articleLink="https://blog.devcoffee.me/posts/ikigai"
      />
    </div>
  );
};

export default BookWidget;
```

- [ ] **Step 4: Update `components/avatar.tsx`**

```tsx
/* eslint-disable @next/next/no-img-element */
type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div className="font-display text-xl font-bold text-text-heading">{name}</div>
    </div>
  );
};

export default Avatar;
```

- [ ] **Step 5: Verify**

Run: `npm run dev`
Expected: Book section matches palette. No visual orphans using old colors.

- [ ] **Step 6: Commit**

```bash
git add components/Books.tsx components/BookWidget.tsx components/BookWrapper.tsx components/avatar.tsx
git commit -m "feat: update book components and avatar to match palette"
```

---

## Task 11: Final Polish — Typecheck, Contrast Audit, Cleanup

**Files:**
- All modified files (review pass)

- [ ] **Step 1: Run typecheck**

Run: `npm run typecheck`
Expected: No TypeScript errors. If there are errors, fix them.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Visual audit**

Run: `npm run dev` and check every page:
- Homepage: `/` — binary hero, latest posts, all posts, categories, email
- Post: `/posts/[any-slug]` — progress bar, header, body, code blocks, breadcrumb
- TIL: `/til` — disclosure panels
- 404: `/nonexistent-page`
- Tag: `/posts/tag/[any-tag]`

Verify:
- No old colors visible (no `#16181D`, `#1A1D23`, `#1C2333`, `#5686F5`, `#4F79DE`, purple/pink gradients)
- All text readable against backgrounds
- Vim cursor is copper, not green
- Fonts loading: Bricolage Grotesque for headings, Source Serif 4 for body, JetBrains Mono for code
- No layout breaks on mobile viewport (resize browser to ~375px)

- [ ] **Step 4: Fix any remaining issues found in audit**

Address any visual issues discovered in step 3.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final polish — typecheck, visual audit, cleanup"
```

---

## Summary

| Task | Description | Files | Est. |
|------|-------------|-------|------|
| 1 | Design token foundation | 2 | 5 min |
| 2 | Page shell | 4 | 3 min |
| 3 | Navigation chrome | 4 | 4 min |
| 4 | Homepage intro | 1 | 3 min |
| 5 | Latest posts & cards | 3 | 4 min |
| 6 | All posts, categories, email, separator | 5 | 5 min |
| 7 | Post page content | 5 | 5 min |
| 8 | Reading progress & breadcrumb | 2 | 3 min |
| 9 | Other pages | 3 | 4 min |
| 10 | Book components & cleanup | 4 | 3 min |
| 11 | Final polish | all | 5 min |
