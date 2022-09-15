import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto ">
      <div
        className={
          markdownStyles["markdown"] + ` text-[#98A0B3] leading-[38.475px]`
        }
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
