import type { ReactNode } from "react";

type AsideComponentProps = {
    children: ReactNode;
    orientation: "LEFT" | "RIGHT" | "RIGHT_WIDE";
    paddingY?: string;
    paddingX?: string;
    customSpan?: string;
};

export function AsideComponent({children, orientation, paddingY = "py-6", paddingX = "px-6", customSpan}: AsideComponentProps) {
  
    const border = orientation == "RIGHT" || "RIGHT_WIDE" ? "border-l" : "border-r"
    const span = customSpan ? customSpan : orientation == "RIGHT" ? "col-start-9 col-end-12" : orientation == "RIGHT_WIDE" ? "col-start-9 col-end-13" : "col-start-1 col-end-5"
  
    return (
    <aside className={`hidden lg:block ${span} h-full ${border} border-ludoGrayLight`}>
      <div className={`sticky top-0 ${paddingY} ${paddingX}`}>
        {children}
      </div>
    </aside>
  );
}
