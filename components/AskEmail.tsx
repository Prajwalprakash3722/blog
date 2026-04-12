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
