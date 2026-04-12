import { FormEvent, useState } from "react";

function AskEmail() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <div className="my-16 md:my-20">
      <h2 className="font-display text-xl font-bold text-text-secondary mb-5">
        In case you care for updates by email.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-5"
      >
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 h-12 px-4 bg-surface-raised border border-surface-muted rounded font-mono text-base text-text-body placeholder:text-text-muted focus:outline-none focus:border-accent-terminal transition-colors"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="h-12 px-8 font-mono text-base font-medium rounded transition-colors"
          style={{
            backgroundColor: "var(--accent-brand)",
            color: "var(--text-heading)",
          }}
        >
          notify me
        </button>
      </form>
      <p className="font-body text-base text-text-secondary leading-relaxed">
        I mostly write notes to self — I can&apos;t imagine you&apos;d be
        interested, but if you are, you&apos;re welcome.
      </p>
      <p className="font-body text-base text-text-muted mt-1">
        (Obviously, I won&apos;t share your email with anyone.)
      </p>
    </div>
  );
}

export default AskEmail;
