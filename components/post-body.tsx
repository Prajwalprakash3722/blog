import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
  post?: boolean;
};

const PostBody = ({ content, post = true }: Props) => {
  return (
    <div className="max-w-screen-xl mx-auto text-justify">
      <div
        className={
          markdownStyles["markdown"] +
          ` ${
            !post
              ? "px-4 pb-2 pt-4 text-sm text-gray-300"
              : "text-[#98A0B3] leading-[38.475px]"
          } `
        }
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
