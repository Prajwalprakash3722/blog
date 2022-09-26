import { NextSeo } from "next-seo";

export default function Seo({ post }: any) {
  const { title, excerpt, slug, coverImage } = post;
  return (
    <>
      <NextSeo
        title={title}
        description={excerpt}
        canonical={`https://blog.devcoffee.me/posts/${slug}`}
        openGraph={{
          type: "website",
          url: "https://blog.devcoffee.me",
          title: `${title} | originally posted on blog.devcoffee.me.`,
          description: excerpt,
          locale: "en_EN",
          images: [
            {
              url: coverImage,
              width: 800,
              height: 600,
              alt: `hero image for ${title}`,
            },
          ],
          site_name: "blog.devcoffee.me",
        }}
        twitter={{
          handle: "@prajwal_3722",
          site: "blog.devcoffee.me",
          cardType: "summary",
        }}
      />
    </>
  );
}
