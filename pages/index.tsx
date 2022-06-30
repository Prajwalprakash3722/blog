import Container from '../components/container'
import Head from 'next/head'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import LatestPosts from '../components/latest-posts'
import Layout from '../components/layout'
import Post from '../types/post'
import generateRssFeed from '../lib/generateRssFeed'
import { getAllPosts } from '../lib/api'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0]
  //first 10 posts 
  const morePosts = allPosts.slice(0, 10)
  return (
    <>
      <Layout newArticle={heroPost}>
        <Head>
          <title>Blog</title>
        </Head>
        <Container>
          <Intro />
          {morePosts.length > 0 && <LatestPosts posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'content',
    'coverImage',
    'excerpt',
  ])
  await generateRssFeed(); // calling to generate the feed

  return {
    props: { allPosts },
  }
}
