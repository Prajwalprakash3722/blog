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
      <p className="mt-4 max-w-lg px-6 text-center font-body text-text-muted">
        Try the homepage, browse the XML sitemap, or read the agent instructions
        to find a published article.
      </p>
      <nav className="mt-8 flex flex-wrap justify-center gap-4 font-mono text-sm" aria-label="404 recovery links">
        <Link href="/" className="px-5 py-3 rounded bg-accent-brand text-text-heading">home</Link>
        <Link href="/sitemap.xml" className="px-5 py-3 border border-surface-muted rounded text-accent-terminal">sitemap</Link>
        <Link href="/llms.txt" className="px-5 py-3 border border-surface-muted rounded text-accent-terminal">llms.txt</Link>
      </nav>
    </main>
  );
}

export default ErrorPage;
