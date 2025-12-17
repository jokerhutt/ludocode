import { Progress } from "@/components/external/ui/progress.tsx";
import { ExitButton } from "../../atoms/button/exit-button.tsx";
import { HeaderWithBar } from "./header-with-bar.tsx";
import { LeaveUnsavedDialog } from "@/components/design/popover/leave-unsaved-dialog.tsx";

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
            buttonText="Quit"
            onClick={() => onExit()}
          >
            <ExitButton />
          </LeaveUnsavedDialog>
        )}
      </div>
      <div className="flex items-center justify-center col-start-3 col-end-11 lg:col-start-4 lg:col-end-10">
        <Progress
          className="border-ludoLightPurple h-3"
          value={(completed / total) * 100}
        />
      </div>
    </HeaderWithBar>
  );
}
