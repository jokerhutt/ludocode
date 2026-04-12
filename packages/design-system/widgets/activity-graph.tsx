import { forwardRef, useState } from "react";
import { cn } from "../cn-utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ludocode/external/ui/popover";

type ActivityGraphCell = {
  active: boolean;
  date?: number[];
  count?: number;
};

type ActivityGraphProps = {
  cells: ActivityGraphCell[];
  title?: string;
  className?: string;
  color?: CellColor;
};

type CellColor = "orange" | "royal-blue";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatDate(date: number[]): string {
  const [year, month, day] = date;
  return `${day}/${month}/${year}`;
}

export function ActivityGraph({
  cells,
  title,
  className,
  color = "royal-blue",
}: ActivityGraphProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div
      className={cn("w-full flex text-ludo-white flex-col gap-2", className)}
    >
      {title && (
        <h3 className="text-ludo-white-dim text-xs font-semibold uppercase tracking-widest">
          {title}
        </h3>
      )}
      <div className="w-full bg-ludo-background rounded-lg p-3">
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {DAY_LABELS.map((label) => (
            <div key={label} className="flex items-center justify-center">
              <span className="text-[9px] text-ludo-white-bright/40 leading-none">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {cells.map((cell, idx) => (
            <Popover
              key={idx}
              open={openIdx === idx}
              onOpenChange={(open) => {
                if (!open && openIdx === idx) setOpenIdx(null);
              }}
            >
              <PopoverTrigger asChild>
                <GraphCell
                  color={color}
                  active={cell.active}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setOpenIdx(idx);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") setOpenIdx(null);
                  }}
                  onClick={() =>
                    setOpenIdx((prev) => (prev === idx ? null : idx))
                  }
                />
              </PopoverTrigger>
              {cell.date && (
                <PopoverContent
                  className="w-auto px-2.5 py-1.5 text-[11px] font-medium bg-ludo-surface text-ludo-white-bright border-0 shadow-lg"
                  side="top"
                  align="center"
                  sideOffset={6}
                  avoidCollisions
                  onMouseEnter={() => setOpenIdx(idx)}
                  onMouseLeave={() => setOpenIdx(null)}
                >
                  {formatDate(cell.date)}
                </PopoverContent>
              )}
            </Popover>
          ))}
        </div>
      </div>
    </div>
  );
}

const GraphCell = forwardRef<
  HTMLDivElement,
  {
    onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerLeave: (e: React.PointerEvent<HTMLDivElement>) => void;
    onClick: () => void;
    active?: boolean;
    color: CellColor;
  }
>(function GraphCell(
  { onPointerEnter, onPointerLeave, onClick, active, color },
  ref,
) {
  const colorToken =
    color == "orange"
      ? "bg-orange-400/80 hover:bg-orange-400"
      : "bg-ludo-accent/80 hover:bg-ludo-accent";

  return (
    <div
      ref={ref}
      className={cn(
        "aspect-square w-full rounded-sm transition-colors cursor-default",
        active ? colorToken : "bg-white/6 hover:bg-white/10",
      )}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    />
  );
});

type MiniActivityGraphProps = {
  cells: ActivityGraphCell[];
  color?: CellColor;
  className?: string;
};

export function MiniActivityGraph({
  cells,
  color = "royal-blue",
  className,
}: MiniActivityGraphProps) {
  const colorToken =
    color === "orange" ? "bg-orange-400/80" : "bg-ludo-accent/80";

  return (
    <div className={cn("grid grid-cols-7 gap-0.5", className)}>
      {cells.map((cell, idx) => (
        <div
          key={idx}
          className={cn(
            "aspect-square w-full rounded-sm",
            cell.active ? colorToken : "bg-white/6",
          )}
        />
      ))}
    </div>
  );
}
