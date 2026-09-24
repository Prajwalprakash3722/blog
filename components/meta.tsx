import Head from "next/head";

interface Props {
  description?: string;
  imageUrl?: string;
}

const SITE_URL = "https://blog.devcoffee.me";

const DEFAULT_IMAGE = `${SITE_URL}/assets/blog/nginx-in-production/nginx-production-architecture-hero.png`;

// Link-preview scrapers (WhatsApp, X, LinkedIn, Slack) ignore relative
// og:image paths, so local covers like "/assets/..." must be made absolute.
export const absoluteImageUrl = (url?: string) => {
  if (!url) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const Meta = ({ description, imageUrl }: Props) => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#1a1410" />
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      <meta
        name="description"
        content={
          description
            ? description
            : "Prajwal's blog for all the things I love to write about. I write about tech, design, life, and more."
        }
      />
      <meta property="og:image" content={absoluteImageUrl(imageUrl)} />
    </Head>
  );
};

export default Meta;
