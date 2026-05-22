import { ReactNode } from "react";
import cn from "classnames";

type Props = {
  children?: ReactNode;
  wide?: boolean;
};

const Container = ({ children, wide = false }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto px-5 md:px-6",
        wide ? "max-w-[1080px]" : "max-w-[720px]"
      )}>
      {children}
    </div>
  );
};

export default Container;
