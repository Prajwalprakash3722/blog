import Catagories from '../components/categories'
import Container from '../components/container'
import Head from 'next/head'
import Intro from '../components/intro'
import LatestPosts from '../components/latest-posts'
import Layout from '../components/layout'
import Meta from '../components/meta'
import MorePosts from '../components/more-posts'
import Post from '../types/post'
import generateRssFeed from '../lib/generateRssFeed'
import { getAllPosts } from '../lib/api'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0]
  //first 10 posts 
  allPosts = allPosts.filter(post => post.preview !== true)
  const latestPosts = allPosts.slice(0, 4)
  return (
    <>
      <Layout newArticle={heroPost}>
        <Head>
          <title>{`Prajwal's`} Blog</title>
          <Meta />
        </Head>
        <Container>
          <Intro />
          {latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}
          {allPosts.length > 0 && <MorePosts posts={allPosts} header="All Posts" />}
          <Catagories posts={allPosts} />
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
    'preview',
    'category'
  ])
  await generateRssFeed(); // calling to generate the feed

  return {
    props: { allPosts },
  }
}
