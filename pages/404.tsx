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
