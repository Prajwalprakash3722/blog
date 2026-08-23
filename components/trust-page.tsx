import Head from "next/head";
import Link from "next/link";
import Container from "./container";
import Header from "./header";
import Layout from "./layout";
import Meta from "./meta";

type Props = {
  title: string;
  description: string;
  path: string;
  children: React.ReactNode;
};

export default function TrustPage({ title, description, path, children }: Props) {
  const canonical = `https://blog.devcoffee.me${path}`;
  return (
    <Layout>
      <Meta description={description} />
      <Head>
        <title>{title} | Prajwal&apos;s Blog — DevCoffee</title>
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`${title} | Prajwal's Blog — DevCoffee`} />
      </Head>
      <Container>
        <Header />
        <article className="mb-20 max-w-[720px]">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text-heading mb-8">
            {title}
          </h1>
          <div className="space-y-6 font-body text-lg leading-[1.8] text-text-body">
            {children}
          </div>
          <nav className="mt-12 border-t border-surface-muted pt-6 font-mono text-sm text-text-muted" aria-label="Machine-readable resources">
            <Link className="text-accent-terminal hover:text-accent-link" href="/llms.txt">agent instructions</Link>
            {" · "}
            <Link className="text-accent-terminal hover:text-accent-link" href="/sitemap.xml">sitemap</Link>
            {" · "}
            <Link className="text-accent-terminal hover:text-accent-link" href="/developers">developer resources</Link>
          </nav>
        </article>
      </Container>
    </Layout>
  );
}
