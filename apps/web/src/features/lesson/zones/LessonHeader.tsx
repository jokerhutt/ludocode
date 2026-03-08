import { Progress } from "@ludocode/external/ui/progress.tsx";
import { LeaveUnsavedDialog } from "@ludocode/design-system/templates/dialog/leave-unsaved-dialog.tsx";
import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header.tsx";
import { SpeakerIcon, VolumeIcon } from "lucide-react";
import { AudioToggleIcon } from "../components/AudioToggleIcon";

type LessonHeaderProps = {
  total: number;
  position: number;
  onExit?: () => void;
};

export function LessonHeader({ total, onExit, position }: LessonHeaderProps) {
  const completed = position + 1;

  return (
    <LudoHeader.Shell className="px-6" device="Both">
      <div className=" col-span-2 lg:col-span-3 flex items-center h-full">
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
      <div className="flex items-center justify-center col-span-8 lg:col-span-6">
        <Progress
          className="border-ludo-accent-muted h-3"
          value={(completed / total) * 100}
        />
      </div>
      <div className="col-span-2 lg:col-span-3 flex items-center justify-end">
        <AudioToggleIcon/>
      </div>
    </LudoHeader.Shell>
  );
}
