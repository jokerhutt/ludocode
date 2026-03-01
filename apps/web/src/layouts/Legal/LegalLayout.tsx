import { Outlet } from "@tanstack/react-router";

type LegalLayoutProps = {};

export function LegalLayout({}: LegalLayoutProps) {
  return (
    <>
      <div className="col-span-3" />
      <div className="flex col-span-6 overflow-y-auto [scrollbar-gutter:stable] flex-col items-center justify-start h-full">
        <Outlet />
      </div>
      <div className="col-span-3" />
    </>
  );
}
