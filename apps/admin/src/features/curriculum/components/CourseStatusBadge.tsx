import type { CourseStatus } from "@ludocode/types";

const statusConfig: Record<CourseStatus, { label: string; className: string }> =
  {
    DRAFT: {
      label: "Draft",
      className: "bg-slate-500/20 text-slate-300 border-slate-500/40",
    },
    PUBLISHED: {
      label: "Published",
      className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    },
    ARCHIVED: {
      label: "Archived",
      className: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    },
  };

type CourseStatusBadgeProps = {
  status: CourseStatus;
};

export function CourseStatusBadge({ status }: CourseStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
