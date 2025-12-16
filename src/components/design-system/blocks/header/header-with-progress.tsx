import { Progress } from "@/components/external/ui/progress.tsx";
import { ExitButton } from "../../atoms/button/exit-button.tsx";
import { LeaveUnsavedDialog } from "../../composites/dialog/leave-unsaved-dialog.tsx";
import { HeaderWithBar } from "./header-with-bar.tsx";
import { SegmentedProgress } from "@/components/design-system/blocks/progress/segmented-progress.tsx";

type HeaderWithProgressProps = {
  total: number;
  position: number;
  onExit?: () => void;
};

export function HeaderWithProgress({
  total,
  onExit,
  position,
}: HeaderWithProgressProps) {
  const completed = position + 1;

  return (
    <HeaderWithBar className="px-4" device="Both">
      <div className="col-start-1 col-end-2 flex items-center h-full">
        {onExit && (
          <LeaveUnsavedDialog
            title="Are you sure you want to exit?"
            subtitle="All unsaved progress will be lost"
            onClick={() => onExit()}
          >
            <ExitButton />
          </LeaveUnsavedDialog>
        )}
      </div>
      <div className="flex items-center justify-center col-start-3 col-end-11 lg:col-start-4 lg:col-end-10">
        <Progress
          className="border-ludoLightPurple"
          value={(completed / total) * 100}
        />
      </div>
    </HeaderWithBar>
  );
}
