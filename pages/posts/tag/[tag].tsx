import { GetStaticProps, InferGetStaticPropsType } from "next";

import Container from "../../../components/container";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import MorePosts from "../../../components/more-posts";
import { getAllPosts } from "../../../lib/api";
import { useRouter } from "next/router";

const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const tag = router.query.tag as string;

  return (
    <>
      <Layout>
        <Container>
          <Header />
          <MorePosts
            posts={props.posts.filteredPosts}
            header={`${tag} related Posts`}
          />
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "content",
    "draft",
    "category",
  ]);

  const filteredPosts = posts.filter(
    (post) => post.category === context?.params?.tag
  );

  return {
    props: {
      posts: {
        filteredPosts,
      },
    },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts(["category"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          tag: post.category,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
