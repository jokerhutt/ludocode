import type { ReactNode } from "react";

export function OnboardingStageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <h1 className="text-2xl text-center font-bold text-white">{title}</h1>
      <div className="grid lg:grid-cols-2 py-6 gap-6">{children}</div>
    </>
  );
}
