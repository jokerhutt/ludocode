import type { ReactNode } from "react";

type FallbackLayoutProps = { children: ReactNode };

export function FallbackLayout({ children }: FallbackLayoutProps) {
  return (
    <div className="w-dvw h-dvh flex flex-col gap-4 items-center justify-center bg-ludoGrayDark">
      {children}
    </div>
  );
}
