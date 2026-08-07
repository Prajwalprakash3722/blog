import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getPostBySlug, getPublishedPosts } from "../../../lib/api";

import ErrorPage from "next/error";
import Meta from "../../../components/meta";
import PostTitle from "../../../components/post-title";
import PostType from "../../../types/post";
import { useRouter } from "next/router";

const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const post: PostType = props.post;

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Meta
        description={post.excerpt}
        // title={post.title}
        imageUrl={post.ogImage.url}
      />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <pre
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
            className="bg-white min-h-screen select-none">
            {post.content}
          </pre>
        </>
      )}
    </>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const post = getPostBySlug(context.params?.slug as string, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
  ]);
  return {
    props: {
      post: {
        ...post,
      },
    },
  };
};

export async function getStaticPaths() {
  const posts = getPublishedPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
