import type { ReactNode } from "react";

type ClickableOptionRowProps = {
  children: ReactNode;
  type: "ROW" | "COLUMN";
};

export function ClickableOptionRow({children, type}: ClickableOptionRowProps) {

  const rowStyle = "flex justify-center items-center gap-8";
  const colStyle = "flex flex-col items-center gap-6";

  const style = type == "ROW" ? rowStyle : colStyle

  return (
      <div className={`w-full ${style}`}>
        {children}
      </div>  
  );
}