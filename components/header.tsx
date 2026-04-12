import Link from "next/link";

const Header = () => {
  return (
    <h2 className="mt-8 mb-12 md:mb-16">
      <Link
        href="/"
        className="font-mono text-sm text-accent-terminal hover:text-accent-link transition-colors"
      >
        &larr; ~/devcoffee
      </Link>
    </h2>
  );
};

export default Header;
