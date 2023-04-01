import Catagories from "../components/categories";
import Container from "../components/container";
import Head from "next/head";
import Intro from "../components/intro";
import LatestPosts from "../components/latest-posts";
import Layout from "../components/layout";
import Meta from "../components/meta";
import MorePosts from "../components/more-posts";
import Post from "../types/post";
import generateRssFeed from "../lib/generateRssFeed";
import { getAllPosts } from "../lib/api";
import AskEmail from "../components/AskEmail";
import StravaEmbed from "../components/StravaEmbed";
import { getActivities } from "../lib/strava";

type Props = {
  allPosts: Post[];
  activities: any;
};

const dummyActivities = [
  {
    id: 1,
    activityType: "Run",
    name: "Morning Run",
    distance: 10000,
    movingTime: 3600,
    startDate: "2022-03-25T12:30:00Z",
    averageSpeed: 2.78,
  },
  {
    id: 2,
    activityType: "Ride",
    name: "Morning Ride",
    distance: 72000,
    movingTime: 14400,
    startDate: "2022-03-24T14:00:00Z",
    averageSpeed: 2.78,
  },
  {
    id: 3,
    activityType: "Swim",
    name: "Morning Swim",
    distance: 1500,
    movingTime: 1800,
    startDate: "2022-03-23T08:00:00Z",
    averageSpeed: 0.83,
  },
  {
    id: 1,
    activityType: "Run",
    name: "Morning Run",
    distance: 10000,
    movingTime: 3600,
    startDate: "2022-03-25T12:30:00Z",
    averageSpeed: 2.78,
  },
];

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  //first 10 posts
  allPosts = allPosts.filter((post) => post.draft !== true);
  const latestPosts = allPosts.slice(0, 4);
  return (
    <>
      <Layout newArticle={heroPost}>
        <Head>
          <title>{`Prajwal's`} Blog</title>
          <Meta />
        </Head>
        <Container>
          <Intro totalPostNumber={allPosts.length} />
          {latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}
          {allPosts.length > 0 && (
            <MorePosts posts={allPosts} header="All Posts" />
          )}
          <StravaEmbed activities={dummyActivities} />
          <AskEmail />
          <Catagories posts={allPosts} />
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "content",
    "draft",
    "category",
  ]);
  await generateRssFeed(); // calling to generate the feed

  const activities = await getActivities();
  return {
    props: {
      allPosts,
      activities,
    },
    revalidate: 3600,
  };
};
