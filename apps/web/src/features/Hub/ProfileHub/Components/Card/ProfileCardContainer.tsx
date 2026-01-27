import type { ReactNode } from "react";

type ProfileCardContainerProps = { header?: string; children: ReactNode };

export function ProfileCardContainer({
  header,
  children,
}: ProfileCardContainerProps) {
  return (
    <div className="w-full flex gap-2 flex-col">
      {header && <p className="text-lg text-ludoAltText font-bold">{header}</p>}
      {children}
    </div>
  );
}
