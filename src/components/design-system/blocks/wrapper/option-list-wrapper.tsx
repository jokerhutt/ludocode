import type { ReactNode } from "react";

type OptionListWrapperProps = {
  children: ReactNode;
  type: "ROW" | "COLUMN";
};

export function OptionListWrapper({children, type}: OptionListWrapperProps) {

  const rowStyle = "flex justify-center flex-wrap items-center gap-4";
  const colStyle = "flex flex-col items-center gap-6";

  const style = type == "ROW" ? rowStyle : colStyle

  return (
      <div className={`w-full hover:cursor-pointer ${style}`}>
        {children}
      </div>  
  );
}