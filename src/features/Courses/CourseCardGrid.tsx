import type { ReactNode } from "react";

type CourseCardGridProps = {
  children: ReactNode;
};

export function CourseCardGrid({ children }: CourseCardGridProps) {
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>;
}
