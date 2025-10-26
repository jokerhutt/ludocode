import type { ReactNode } from "react";

type CodeBoxWrapperProps = {
  children: ReactNode;
};

export function CodeBoxWrapper({
  children,
}: CodeBoxWrapperProps) {
  return (
    <div className="w-full min-h-40 lg:min-h-66 rounded-3xl bg-ludoGrayLight">
      <div className="w-full h-6 rounded-t-3xl bg-ludoDarkPurple"></div>
      <div className="w-full h-full p-6">
        {children}
      </div>
    </div>
  );
}
