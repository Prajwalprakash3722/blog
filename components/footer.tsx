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
