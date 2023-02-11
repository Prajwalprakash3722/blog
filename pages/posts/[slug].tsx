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
      <Meta description={post.excerpt} imageUrl={post.ogImage.url} />
      <Seo post={post} />
      <Layout>
        <Container>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className="mb-20">
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
                <div className="hidden text-white text-left font-semibold lg:flex justify-between px-80">
                  <div>
                    <Link href="/">
                      <a className="hover:text-slate-200">Home</a>
                    </Link>
                    {"/ "}
                    <Link href="/#posts">
                      <a className="hover:text-slate-200">Posts</a>
                    </Link>
                    {"/ "}
                    <Link href={post.slug}>
                      <a className="hover:text-slate-200">{post.title}</a>
                    </Link>
                  </div>
                  <div>
                    <Link href={`/posts/raw/` + post.slug}>
                      <a className="hover:text-slate-200">View Raw</a>
                    </Link>
                  </div>
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
