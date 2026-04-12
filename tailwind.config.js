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
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(0.5deg)" },
          "75%": { transform: "rotate(-0.5deg)" },
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
