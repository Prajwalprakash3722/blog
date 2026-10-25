import Link from "next/link";

const Header = () => {
  return (
    <nav aria-label="Primary navigation" className="mt-8 mb-12 md:mb-16">
      <Link
        href="/"
        className="font-mono text-base text-accent-terminal hover:text-accent-link transition-colors">
        &larr; ~/devcoffee
      </Link>
    </nav>
  );
};

export default Header;
