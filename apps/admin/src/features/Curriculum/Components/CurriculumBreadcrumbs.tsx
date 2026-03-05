import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { adminNavigation } from "@/constants/adminNavigation";

type Crumb = {
  label: string;
  to?: ReturnType<
    | typeof adminNavigation.hub.courses.toCoursesHub
    | typeof adminNavigation.curriculum.toCourse
  >;
};

type CurriculumBreadcrumbsProps = {
  courseName: string;
  courseId: string;
  lessonName?: string;
};

export function CurriculumBreadcrumbs({
  courseName,
  courseId,
  lessonName,
}: CurriculumBreadcrumbsProps) {
  const crumbs: Crumb[] = [
    { label: "Courses", to: adminNavigation.hub.courses.toCoursesHub() },
    ...(lessonName
      ? [
          {
            label: courseName,
            to: adminNavigation.curriculum.toCourse(courseId),
          },
          { label: lessonName },
        ]
      : [{ label: courseName }]),
  ];

  return (
    <nav className="flex items-center gap-2 text-ludo-white text-sm">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="h-4 w-4 shrink-0" />}
            {crumb.to && !isLast ? (
              <Link
                {...crumb.to}
                className="hover:text-white transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-white font-semibold">{crumb.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
