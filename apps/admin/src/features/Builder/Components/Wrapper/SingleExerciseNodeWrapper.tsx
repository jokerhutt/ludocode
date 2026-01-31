import type { ReactNode } from "react";

type SingleExerciseNodeWrapperProps = { children: ReactNode };

export function SingleExerciseNodeWrapper({
  children,
}: SingleExerciseNodeWrapperProps) {
  return <div className="bg-ludo-surface p-4 rounded-md">{children}</div>;
}
