import type { ReactNode } from "react";
import { ListHeader } from "./ListHeader";

type ListContainerProps = {
  children: ReactNode;
  title?: string;
  rounded?: "SM" | "MD" | "LG"| "XL";
};

export function ListContainer({
  children,
  title,
  rounded = "LG",
}: ListContainerProps) {
  const containerStyle = {
    SM: {
      headerRounding: "rounded-t-md",
      rounding: "rounded-md",
    },
    MD: {
      headerRounding: "rounded-t-xl",
      rounding: "rounded-xl",
    },
    LG: {
      headerRounding: "rounded-t-xl",
      rounding: "rounded-xl",
    },
    XL: {
      headerRounding: "rounded-t-2xl",
      rounding: "rounded-2xl",
    },
  };

  return (
    <div className="border w-full rounded-xl border-ludoGrayLight flex flex-col items-center">
      <ListHeader
        show={!!title}
        rounding={containerStyle[rounded].headerRounding}
        title={title}
      />
      {children}
    </div>
  );
}
