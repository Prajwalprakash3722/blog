import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
  post?: boolean;
};

const PostBody = ({ content, post = true }: Props) => {
  return (
    <div className="max-w-[72ch] mx-auto">
      <div
        className={
          markdownStyles["markdown"] +
          ` ${
            !post
              ? "px-4 pb-2 pt-4 text-base text-text-secondary"
              : "text-lg text-text-body leading-[1.8] font-body"
          } `
        }
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
