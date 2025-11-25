import type { ReactNode } from "react";
import { ListHeader, type ListHeaderProps } from "./ListHeader";

type ListContainerProps = {
  children: ReactNode;
  header?: ListHeaderProps;
};

export function ListContainer({ children, header }: ListContainerProps) {
  return (
    <div className="border w-full rounded-xl border-ludoGrayLight flex flex-col items-center">
      {!!header && <ListHeader {...header} />}
      {children}
    </div>
  );
}
