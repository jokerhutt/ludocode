import { Progress } from "../../../../../../../packages/external/ui/progress.tsx";
import { HeaderWithBar } from "../../../../../../../packages/design-system/zones/header-with-bar.tsx";
import { LeaveUnsavedDialog } from "../../../../../../../packages/design-system/templates/dialog/leave-unsaved-dialog.tsx";
import { IconButton } from "../../../../../../../packages/design-system/primitives/icon-button.tsx";

type LessonHeaderProps = {
  total: number;
  position: number;
  onExit?: () => void;
};

export function LessonHeader({ total, onExit, position }: LessonHeaderProps) {
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
            <IconButton variant="large" iconName="XMarkIcon" />
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
