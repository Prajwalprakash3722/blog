import Container from "../components/container";
import Header from "../components/header";
import Layout from "../components/layout";

export default function Roadmap() {
  return (
    <Layout>
      <Container>
        <Header />
        <h1 className="font-display text-4xl font-bold text-text-heading">
          Roadmap
        </h1>
        <p className="my-6 text-lg">This page is a work in progress.</p>
        <a href="/#posts" className="text-accent-link underline">
          Read the latest articles
        </a>
      </Container>
    </Layout>
  );
}
