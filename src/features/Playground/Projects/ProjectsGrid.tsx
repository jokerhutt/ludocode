import type { ReactNode } from "react";

type ProjectsGridProps = {children: ReactNode};

export function ProjectsGrid({children}: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
        {children}
    </div>
  );
}