import type { ReactNode } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type MilestoneStatus = "complete" | "in-progress" | "planned";

type RoadmapMilestone = {
  date: string;
  title: string;
  status: MilestoneStatus;
  summary: string;
  items: string[];
  pr?: string;
};

type DocsRoadmapProps = {
  milestones: RoadmapMilestone[];
  children?: ReactNode;
};

// ─── Status config ──────────────────────────────────────────────────────────

const statusConfig: Record<
  MilestoneStatus,
  { label: string; dot: string; badge: string; line: string }
> = {
  complete: {
    label: "Complete",
    dot: "bg-ludo-success",
    badge:
      "bg-ludo-success-alt/15 text-ludo-success border-ludo-success-alt/30",
    line: "bg-ludo-success-alt/25",
  },
  "in-progress": {
    label: "In Progress",
    dot: "bg-ludo-accent animate-pulse",
    badge: "bg-ludo-accent/15 text-ludo-accent-muted border-ludo-accent/30",
    line: "bg-ludo-accent/20",
  },
  planned: {
    label: "Planned",
    dot: "bg-ludo-white-dim/40",
    badge: "bg-white/5 text-ludo-white-dim border-white/10",
    line: "bg-white/8",
  },
};

// ─── Milestone ──────────────────────────────────────────────────────────────

function MilestoneNode({
  milestone,
  isLast,
}: {
  milestone: RoadmapMilestone;
  isLast: boolean;
}) {
  const cfg = statusConfig[milestone.status];

  return (
    <div className="relative flex gap-4">
      {/* Spine */}
      <div className="relative flex flex-col items-center shrink-0 w-5">
        <div className={`z-10 w-2.5 h-2.5 rounded-full mt-1.5 ${cfg.dot}`} />
        {!isLast && (
          <div
            className={`w-px flex-1 mt-1 ${cfg.line}`}
            style={{ minHeight: "1.5rem" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-ludo-white-dim/70">
            {milestone.date}
          </span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cfg.badge}`}
          >
            {cfg.label}
          </span>
          {milestone.pr && (
            <a
              href={milestone.pr}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-ludo-accent-muted hover:text-ludo-white transition-colors"
              title="View pull request"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="11"
                height="11"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
              </svg>
              PR
            </a>
          )}
        </div>

        <h3 className="text-sm font-bold text-ludo-white-bright mb-1 leading-snug">
          {milestone.title}
        </h3>
        <p className="text-[13px] text-ludo-white leading-relaxed mb-2.5">
          {milestone.summary}
        </p>

        {milestone.items.length > 0 && (
          <ul className="space-y-1">
            {milestone.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] text-ludo-white-dim leading-relaxed"
              >
                <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-ludo-white-dim/40" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function DocsRoadmap({ milestones, children }: DocsRoadmapProps) {
  return (
    <section className="mt-2 mb-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-5 text-[11px]">
        {(["complete", "in-progress", "planned"] as const).map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span
              className={`inline-block w-2 h-2 rounded-full ${statusConfig[s].dot}`}
            />
            <span className="text-ludo-white-dim font-medium uppercase tracking-wider">
              {statusConfig[s].label}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-ludo-accent/30 to-transparent mb-6" />

      {/* Timeline */}
      <div className="relative">
        {milestones.map((m, i) => (
          <MilestoneNode
            key={m.date + m.title}
            milestone={m}
            isLast={i === milestones.length - 1}
          />
        ))}
      </div>

      {children && (
        <div className="mt-2 pl-9 text-sm text-ludo-white-dim">{children}</div>
      )}
    </section>
  );
}
