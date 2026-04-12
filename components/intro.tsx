import Link from "next/link";

interface Props {
  totalPostNumber: number;
}

const Intro = ({ totalPostNumber }: Props) => {
  return (
    <section className="py-20 md:py-28">
      {/* Hero: binary post count */}
      <div className="mb-10">
        <p className="font-display font-black text-text-heading leading-[0.85] tracking-[-0.04em]"
           style={{ fontSize: "clamp(5rem, 10vw, 8.75rem)" }}>
          {(totalPostNumber >> 0).toString(2)}
        </p>
        <p className="font-mono text-sm tracking-[0.15em] uppercase text-text-muted mt-3">
          articles written
        </p>
      </div>

      {/* Bio */}
      <div className="max-w-[600px] mt-12">
        <p className="font-body text-xl leading-[1.7] text-text-body">
          Hi <span className="wave inline-block">👋🏻</span>{" "}
          <strong className="text-text-heading font-bold">I&apos;m Prajwal</strong>.
          I currently work as an SRE 1 at PhonePe, India. I have a passion for
          writing about tech, philosophy, life, books, and my travel experiences.
        </p>
        <p className="font-body text-xl leading-[1.7] text-text-body mt-5">
          My work primarily involves building scalable and reliable systems. When
          I&apos;m not in the tech zone, I&apos;m probably pushing myself at the
          gym, on a trip, or experimenting in the kitchen.
        </p>
        <p className="font-body text-lg text-text-secondary mt-6">
          Thoughts on tech, philosophy, and books.
        </p>
      </div>

      {/* Terracotta section divider */}
      <div
        className="w-12 h-[2px] mt-8"
        style={{ backgroundColor: "var(--accent-brand)" }}
      />

      {/* Navigation pills */}
      <div className="flex flex-wrap gap-3 mt-8">
        <a
          href="https://www.devcoffee.me"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 bg-surface-raised border border-surface-muted rounded font-mono text-sm text-text-secondary hover:text-accent-terminal hover:border-accent-terminal-muted transition-colors"
        >
          about
        </a>
        <Link
          href="/til"
          className="px-5 py-2.5 bg-surface-raised border border-surface-muted rounded font-mono text-sm text-accent-terminal hover:border-accent-terminal-muted transition-colors"
        >
          til
        </Link>
        <Link
          href="/travel"
          className="px-5 py-2.5 bg-surface-raised border border-surface-muted rounded font-mono text-sm text-text-secondary hover:text-accent-terminal hover:border-accent-terminal-muted transition-colors"
        >
          travel
        </Link>
      </div>
    </section>
  );
};

export default Intro;
