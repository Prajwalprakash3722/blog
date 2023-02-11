import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostBySlug } from "../../../lib/api";
import { useEffect, useState } from "react";

import ErrorPage from "next/error";
import Head from "next/head";
import Meta from "../../../components/meta";
import PostTitle from "../../../components/post-title";
import PostType from "../../../types/post";
import { useRouter } from "next/router";

type Props = {
  post: PostType;
  morePosts: PostType[];
  draft?: boolean;
};

const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const post: PostType = props.post;
  const newArticle = props.posts[0];
  const [width, setWidth] = useState(0);
  // scroll function
  const scrollHeight = () => {
    var el = document.documentElement,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    var percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;
    // store percentage in state
    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  });

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
            className="bg-white min-h-screen select-none"
          >
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
  const posts = getAllPosts(["title"]);

  return {
    props: {
      post: {
        ...post,
      },
      posts,
    },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

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
