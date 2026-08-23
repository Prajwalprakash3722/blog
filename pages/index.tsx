import Categories from "../components/categories";
import Container from "../components/container";
import Head from "next/head";
import Intro from "../components/intro";
import Layout from "../components/layout";
import Meta from "../components/meta";
import MorePosts from "../components/more-posts";
import Post from "../types/post";
import generateRssFeed from "../lib/generateRssFeed";
import { getPublishedPosts } from "../lib/api";
import AskEmail from "../components/AskEmail";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  const siteUrl = "https://blog.devcoffee.me";
  const description =
    "Prajwal Prakash writes DevCoffee articles about reliable systems, Linux, distributed systems, accessibility, philosophy, books, life, and travel.";
  const image = `${siteUrl}/assets/blog/nginx-in-production/nginx-production-architecture-hero.png`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#prajwal-prakash`,
        name: "Prajwal Prakash",
        url: "https://www.devcoffee.me",
        jobTitle: "Site Reliability Engineer",
        sameAs: [
          "https://github.com/Prajwalprakash3722",
          "https://twitter.com/prajwal_3722",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "DevCoffee",
        url: siteUrl,
        description:
          "The independent publishing identity for Prajwal Prakash's technical articles, essays, and open-source resources.",
        founder: { "@id": `${siteUrl}/#prajwal-prakash` },
        email: "mailto:prajwalprakash3722@gmail.com",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "editorial and accessibility enquiries",
          email: "prajwalprakash3722@gmail.com",
          url: `${siteUrl}/contact`,
          availableLanguage: "English",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressCountry: "IN",
        },
        sameAs: [
          "https://www.devcoffee.me",
          "https://github.com/Prajwalprakash3722",
          "https://www.npmjs.com/package/@devcoffee/mcp-tools",
        ],
      },
      {
        "@type": "Blog",
        "@id": `${siteUrl}/#blog`,
        name: "Prajwal's Blog — DevCoffee",
        description,
        url: siteUrl,
        inLanguage: "en",
        author: { "@id": `${siteUrl}/#prajwal-prakash` },
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <>
      <Layout newArticle={allPosts.length > 0 ? allPosts[0] : undefined}>
        <Head>
          <title>{`Prajwal's Blog — DevCoffee`}</title>
          <Meta description={description} imageUrl={image} />
          <link rel="canonical" href={`${siteUrl}/`} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${siteUrl}/`} />
          <meta property="og:title" content="Prajwal's Blog — DevCoffee" />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta property="og:site_name" content="DevCoffee" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
          />
        </Head>
        <Container wide>
          <Intro totalPostNumber={allPosts.length} />
          {allPosts.length > 0 && (
            <MorePosts posts={allPosts} header="All Posts" />
          )}
          <AskEmail />
          <Categories posts={allPosts} />
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getPublishedPosts([
    "title",
    "date",
    "slug",
    "excerpt",
    "readingTime",
    "draft",
    "category",
  ]);
  await generateRssFeed(); // calling to generate the feed

  return {
    props: {
      allPosts,
    },
    revalidate: 3600,
  };
};
