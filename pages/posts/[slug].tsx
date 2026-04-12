import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { useEffect, useState } from "react";

import Container from "../../components/container";
import ErrorPage from "next/error";
import Head from "next/head";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Link from "next/link";
import Meta from "../../components/meta";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import PostTitle from "../../components/post-title";
import PostType from "../../types/post";
import ProgressBar from "../../components/progress-bar";
import Seo from "../../components/Seo";
import markdownToHtml from "../../lib/markdownToHtml";
import { useRouter } from "next/router";

type Props = {
  post: PostType;
  morePosts: PostType[];
  draft?: boolean;
};

const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const post: PostType = props.post;
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight || document.body.scrollHeight;
    const percent = (scrollTop / (scrollHeight - el.clientHeight)) * 100;
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
      <Meta description={post.excerpt} imageUrl={post.ogImage.url} />
      <Seo post={post} />
      <ProgressBar percent={width} />
      <Layout>
        <Container>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading&hellip;</PostTitle>
          ) : (
            <>
              <article className="mb-16">
                <Head>
                  <title>{post.title}</title>
                  <meta property="og:image" content={post.ogImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                />
                <PostBody content={post.content} />

                {/* Breadcrumb */}
                <div className="mt-12 pt-6 border-t border-surface-muted flex justify-between items-center">
                  <nav className="font-mono text-xs text-text-muted" aria-label="Breadcrumb">
                    <Link href="/" className="text-accent-terminal hover:text-accent-link transition-colors">
                      home
                    </Link>
                    {" / "}
                    <Link href="/#posts" className="text-accent-terminal hover:text-accent-link transition-colors">
                      posts
                    </Link>
                    {" / "}
                    <span>{post.slug}</span>
                  </nav>
                  <Link
                    href={`/posts/raw/${post.slug}`}
                    className="font-mono text-xs text-text-muted hover:text-accent-terminal transition-colors"
                  >
                    view raw
                  </Link>
                </div>
              </article>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
  const post = getPostBySlug(context.params?.slug as string, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
    "excerpt",
  ]);
  const posts = getAllPosts(["title"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
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
