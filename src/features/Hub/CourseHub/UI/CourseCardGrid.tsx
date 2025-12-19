import type { ReactNode } from "react";

type CourseCardGridProps = {
  children: ReactNode;
};

export function CourseCardGrid({ children }: CourseCardGridProps) {
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">{children}</div>;
}
