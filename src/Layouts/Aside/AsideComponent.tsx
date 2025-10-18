import type { ReactNode } from "react";

type AsideComponentProps = {
    children: ReactNode;
    orientation: "LEFT" | "RIGHT";
    paddingY?: string;
    paddingX?: string;
};

export function AsideComponent({children, orientation, paddingY = "py-6", paddingX = "px-6"}: AsideComponentProps) {
  
    const border = orientation == "RIGHT" ? "border-l" : "border-r"
    const span = orientation == "RIGHT" ? "col-start-9 col-end-12" : "col-start-1 col-end-5"
  
    return (
    <aside className={`hidden lg:block ${span} h-full ${border} border-ludoGrayLight`}>
      <div className={`sticky top-0 ${paddingY} ${paddingX}`}>
        {children}
      </div>
    </aside>
  );
}
