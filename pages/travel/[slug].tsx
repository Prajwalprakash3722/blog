import { GetStaticProps, InferGetStaticPropsType } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import { ArticleJsonLd, BreadcrumbJsonLd, NextSeo } from "next-seo";
import { useRouter } from "next/router";

import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PostTitle from "../../components/post-title";
import PostType from "../../types/post";
import markdownToHtml from "../../lib/markdownToHtml";
import { getPublishedTravel, getTravelBySlug } from "../../lib/api";

type Props = {
  trip: PostType;
};

const SITE_URL = "https://blog.devcoffee.me";

const absoluteUrl = (path?: string) => {
  if (!path) {
    return `${SITE_URL}/favicon/android-chrome-512x512.png`;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path}`;
};

const TravelPost = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const trip: PostType = props.trip;
  const router = useRouter();
  const tripUrl = `${SITE_URL}/travel/${trip.slug}`;
  const imageUrl = absoluteUrl(trip.ogImage?.url || trip.coverImage);
  const destination = trip.destination || trip.category || "Travel";

  if (!router.isFallback && !trip?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Meta description={trip.excerpt} imageUrl={imageUrl} />
      <NextSeo
        title={`${trip.title} | Travel`}
        description={trip.excerpt}
        canonical={tripUrl}
        openGraph={{
          type: "article",
          url: tripUrl,
          title: trip.title,
          description: trip.excerpt,
          article: {
            publishedTime: trip.date,
            modifiedTime: trip.date,
            authors: [`${SITE_URL}`],
            section: "Travel",
            tags: [destination, "travel", "solo travel"],
          },
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 900,
              alt: `Cover image for ${trip.title}`,
            },
          ],
          site_name: "blog.devcoffee.me",
        }}
        twitter={{
          handle: "@prajwal_3722",
          site: "@prajwal_3722",
          cardType: "summary_large_image",
        }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={tripUrl}
        title={trip.title}
        images={[imageUrl]}
        datePublished={trip.date}
        dateModified={trip.date}
        authorName="Prajwal P"
        publisherName="blog.devcoffee.me"
        publisherLogo={`${SITE_URL}/favicon/android-chrome-512x512.png`}
        description={trip.excerpt}
        isAccessibleForFree
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            position: 2,
            name: "Travel",
            item: `${SITE_URL}/travel`,
          },
          {
            position: 3,
            name: trip.title,
            item: tripUrl,
          },
        ]}
      />
      <Layout>
        <Container wide>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading&hellip;</PostTitle>
          ) : (
            <article className="mb-16">
              <Head>
                <title>{trip.title}</title>
                <meta property="og:image" content={imageUrl} />
              </Head>

              <div className="mb-6 flex flex-wrap gap-2">
                <Link
                  href="/travel"
                  className="px-3 py-1.5 bg-surface-raised border border-surface-muted rounded font-mono text-xs text-accent-terminal hover:border-accent-terminal-muted transition-colors"
                >
                  travel
                </Link>
                <span className="px-3 py-1.5 bg-surface-raised border border-surface-muted rounded font-mono text-xs text-text-secondary">
                  {destination}
                </span>
                {trip.readingTime && (
                  <span className="px-3 py-1.5 bg-surface-raised border border-surface-muted rounded font-mono text-xs text-text-secondary">
                    {trip.readingTime}
                  </span>
                )}
              </div>

              <PostHeader
                title={trip.title}
                coverImage={trip.coverImage}
                date={trip.date}
              />
              <PostBody content={trip.content} />

              <div className="mt-12 flex items-center justify-between border-t border-surface-muted pt-6">
                <nav
                  className="font-mono text-xs text-text-muted"
                  aria-label="Breadcrumb"
                >
                  <Link
                    href="/"
                    className="text-accent-terminal hover:text-accent-link transition-colors"
                  >
                    home
                  </Link>
                  {" / "}
                  <Link
                    href="/travel"
                    className="text-accent-terminal hover:text-accent-link transition-colors"
                  >
                    travel
                  </Link>
                  {" / "}
                  <span>{trip.slug}</span>
                </nav>
              </div>
            </article>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default TravelPost;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const trip = getTravelBySlug(context.params?.slug as string, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
    "excerpt",
    "category",
    "destination",
    "readingTime",
  ]) as PostType;
  const content = await markdownToHtml(trip.content || "");

  return {
    props: {
      trip: {
        ...trip,
        content,
      },
    },
  };
};

export async function getStaticPaths() {
  const trips = getPublishedTravel(["slug"]);

  return {
    paths: trips.map((trip) => ({
      params: {
        slug: trip.slug,
      },
    })),
    fallback: false,
  };
}
