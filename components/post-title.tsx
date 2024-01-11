import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-[#E8E8FD] text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:leading-none mb-auto text-center md:text-left">
      {children}
    </h1>
  );
};

export default PostTitle;
