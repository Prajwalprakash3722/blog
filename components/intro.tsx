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
