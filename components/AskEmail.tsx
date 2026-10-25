function AskEmail() {
  return (
    <section className="my-16 md:my-20">
      <h2 className="font-display text-xl font-bold text-text-secondary mb-5">
        Follow new articles.
      </h2>
      <a
        href="/rss.xml"
        className="inline-block px-5 py-3 rounded border border-surface-subtle font-mono text-base text-accent-link underline underline-offset-4">
        Subscribe with RSS
      </a>
    </section>
  );
}

export default AskEmail;
