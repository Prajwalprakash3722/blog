import Container from "./container";
import PostType from "../types/post";
import cn from "classnames";
import { useRouter } from "next/router";
type Props = {
  newArticle?: PostType;
};

const Alert = ({ newArticle }: Props) => {
  const router = useRouter();

  var slug = router.query.slug;

  return (

    slug === undefined || slug === newArticle?.slug ? (
      <div
        className={cn(
          "p-2 border-b bg-[#1C2333] border-neutral-800 text-[#4F79DE]"
        )}
      >
        <Container>
          {newArticle && (
            <div className="py-2 text-center text-sm">
              Read my new Post on{" "}
              <a
                href={`posts/${newArticle.slug}`}
                className="underline hover:text-blue-600 duration-200 transition-colors"
              >
                {newArticle.title}
              </a>
              .
            </div>
          )}
        </Container>
      </div>) : (null)
  );
};

export default Alert;
