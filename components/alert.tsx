import Container from "./container";
import PostType from "../types/post";
import { useRouter } from "next/router";

type Props = {
  newArticle?: PostType;
};

const Alert = ({ newArticle }: Props) => {
  const router = useRouter();
  const slug = router.query.slug;

  return slug === undefined || slug === newArticle?.slug ? (
    <div className="py-2 border-b border-surface-muted bg-surface-raised">
      <Container>
        {newArticle && (
          <div className="py-1 text-center font-mono text-xs text-text-secondary">
            new:{" "}
            <a
              href={`/posts/${newArticle.slug}`}
              className="text-accent-link underline underline-offset-2 hover:text-accent-brand transition-colors"
            >
              {newArticle.title}
            </a>
          </div>
        )}
      </Container>
    </div>
  ) : null;
};

export default Alert;
