import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] text-text-heading">
      {children}
    </h1>
  );
};

export default PostTitle;
