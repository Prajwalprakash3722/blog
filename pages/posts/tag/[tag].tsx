import { GetStaticProps, InferGetStaticPropsType } from "next";

import Container from "../../../components/container";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import MorePosts from "../../../components/more-posts";
import { getPublishedPosts } from "../../../lib/api";
import { slugify } from "../../../lib/slugify";

const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Layout>
        <Container>
          <Header />
          <MorePosts
            posts={props.posts.filteredPosts}
            header={`${props.posts.category} related Posts`}
          />
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = getPublishedPosts([
    "title",
    "date",
    "slug",
    "content",
    "draft",
    "category",
  ]);
  const tag = context?.params?.tag as string;

  const filteredPosts = posts.filter(
    (post) => slugify(post.category) === tag
  );

  return {
    props: {
      posts: {
        filteredPosts,
        category: filteredPosts[0]?.category || tag,
      },
    },
  };
};

export async function getStaticPaths() {
  const posts = getPublishedPosts(["category"]);
  const tagSlugs = posts
    .map((post) => slugify(post.category))
    .filter((tagSlug, index, allTagSlugs) => {
      return tagSlug && allTagSlugs.indexOf(tagSlug) === index;
    });

  return {
    paths: tagSlugs.map((tagSlug) => {
      return {
        params: {
          tag: tagSlug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
