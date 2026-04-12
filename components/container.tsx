import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="max-w-[720px] mx-auto px-5 md:px-6">{children}</div>
  );
};

export default Container;
