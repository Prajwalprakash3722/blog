import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { NextSeo } from "next-seo";

import Container from "../components/container";
import DateFormatter from "../components/date-formatter";
import Header from "../components/header";
import Layout from "../components/layout";
import Meta from "../components/meta";
import Post from "../types/post";
import { getPublishedTravel } from "../lib/api";

type Props = {
  trips: Post[];
};

const SITE_URL = "https://blog.devcoffee.me";
const TRAVEL_TITLE = "Travel | Prajwal's Blog";
const TRAVEL_DESCRIPTION =
  "Travel stories, photos, and personal trip journals from Prajwal.";

const absoluteUrl = (path?: string) => {
  if (!path) {
    return `${SITE_URL}/favicon/android-chrome-512x512.png`;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path}`;
};

const Travel = ({ trips }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const featuredTrip = trips[0];
  const remainingTrips = trips.slice(1);
  const destinations = Array.from(
    new Set(trips.map((trip) => trip.destination || trip.category))
  );
  const coverImage = absoluteUrl(featuredTrip?.coverImage);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TRAVEL_TITLE,
    description: TRAVEL_DESCRIPTION,
    url: `${SITE_URL}/travel`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: trips.map((trip, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/travel/${trip.slug}`,
        name: trip.title,
      })),
    },
  };

  return (
    <Layout>
      <Meta description={TRAVEL_DESCRIPTION} imageUrl={coverImage} />
      <NextSeo
        title={TRAVEL_TITLE}
        description={TRAVEL_DESCRIPTION}
        canonical={`${SITE_URL}/travel`}
        openGraph={{
          type: "website",
          url: `${SITE_URL}/travel`,
          title: TRAVEL_TITLE,
          description: TRAVEL_DESCRIPTION,
          images: [
            {
              url: coverImage,
              width: 1200,
              height: 900,
              alt: "Travel stories on Prajwal's Blog",
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
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>

      <Container wide>
        <Header />

        <main className="pb-16 md:pb-24">
          <section className="mb-12 md:mb-16">
            <p className="font-mono text-sm tracking-[0.15em] uppercase text-text-muted">
              travel journal
            </p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
              <div>
                <h1
                  className="font-display font-extrabold text-5xl leading-[1.05] tracking-tight text-text-heading md:text-6xl lg:text-7xl"
                >
                  Out of office.
                </h1>
                <p className="mt-8 max-w-[680px] font-body text-xl leading-[1.8] text-text-body">
                  A home for travel stories, photos
                </p>
              </div>

              <aside className="border border-surface-muted bg-surface-raised p-5">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                  collection
                </p>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-display text-4xl font-extrabold text-text-heading">
                      {trips.length}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
                      trips
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-extrabold text-text-heading">
                      {destinations.length}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
                      places
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {featuredTrip ? (
            <>
              <section className="mb-14 md:mb-20" id="featured-trip">
                <Link
                  href={`/travel/${featuredTrip.slug}`}
                  className="group grid overflow-hidden border border-surface-muted bg-surface-raised transition-colors hover:border-accent-terminal-muted lg:grid-cols-[1.08fr_0.92fr]"
                >
                  <div className="relative min-h-[360px] border-b border-surface-muted bg-surface-overlay lg:border-b-0 lg:border-r">
                    {featuredTrip.coverImage ? (
                      <img
                        src={featuredTrip.coverImage}
                        alt={`Cover for ${featuredTrip.title}`}
                        className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity group-hover:opacity-100"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(184,92,56,0.16),rgba(31,122,112,0.18)),linear-gradient(180deg,var(--surface-overlay),var(--surface-raised))]" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-base/90 to-transparent p-5">
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-terminal">
                        featured trip
                      </p>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="flex flex-wrap gap-2">
                      <span className="border border-surface-muted bg-surface-overlay px-3 py-1.5 font-mono text-xs text-text-secondary">
                        {featuredTrip.destination || featuredTrip.category}
                      </span>
                      {featuredTrip.readingTime && (
                        <span className="border border-surface-muted bg-surface-overlay px-3 py-1.5 font-mono text-xs text-text-secondary">
                          {featuredTrip.readingTime}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-text-heading md:text-5xl">
                      {featuredTrip.title}
                    </h2>
                    <div className="mt-4 font-mono text-sm text-text-muted">
                      <DateFormatter dateString={featuredTrip.date} />
                    </div>
                    <p className="mt-6 font-body text-xl leading-[1.8] text-text-body">
                      {featuredTrip.excerpt}
                    </p>
                    <p className="mt-8 font-mono text-sm text-accent-terminal">
                      read trip
                    </p>
                  </div>
                </Link>
              </section>

              {remainingTrips.length > 0 && (
                <section id="all-trips">
                  <div className="mb-8 border-b border-surface-muted pb-4">
                    <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-heading md:text-4xl">
                      All Trips
                    </h2>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    {remainingTrips.map((trip) => (
                      <Link
                        key={trip.slug}
                        href={`/travel/${trip.slug}`}
                        className="group grid overflow-hidden border border-surface-muted bg-surface-raised transition-colors hover:border-accent-terminal-muted sm:grid-cols-[11rem_1fr]"
                      >
                        <div className="relative min-h-[180px] border-b border-surface-muted bg-surface-overlay sm:border-b-0 sm:border-r">
                          {trip.coverImage ? (
                            <img
                              src={trip.coverImage}
                              alt={`Cover for ${trip.title}`}
                              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(184,92,56,0.14),rgba(31,122,112,0.16)),linear-gradient(180deg,var(--surface-overlay),var(--surface-raised))]" />
                          )}
                        </div>
                        <div className="p-5">
                          <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
                            {trip.destination || trip.category}
                          </p>
                          <h3 className="mt-3 text-2xl font-semibold leading-tight text-text-heading transition-colors group-hover:text-accent-link">
                            {trip.title}
                          </h3>
                          <p className="mt-3 font-body text-base leading-[1.7] text-text-secondary">
                            {trip.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <section className="border border-surface-muted bg-surface-raised p-6 md:p-8">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-heading">
                No travel stories yet
              </h2>
              <p className="mt-4 font-body text-lg leading-[1.8] text-text-body">
                The travel journal is empty for now.
              </p>
            </section>
          )}
        </main>
      </Container>
    </Layout>
  );
};

export default Travel;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const trips = getPublishedTravel([
    "title",
    "date",
    "slug",
    "excerpt",
    "coverImage",
    "category",
    "destination",
    "readingTime",
  ]) as Post[];

  return {
    props: {
      trips,
    },
  };
};
