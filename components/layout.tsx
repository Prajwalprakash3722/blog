import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import PostType from "../types/post";

type Props = {
  children: React.ReactNode;
  newArticle?: PostType;
};

const Layout = ({ children, newArticle }: Props) => {
  return (
    <>
      <Meta />
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <div className="min-h-screen">
        <Alert newArticle={newArticle} />
        <main id="main-content">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
