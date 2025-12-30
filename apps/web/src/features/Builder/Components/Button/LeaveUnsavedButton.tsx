import { LeaveUnsavedDialog } from "../../../../../../../packages/design-system/templates/dialog/leave-unsaved-dialog.tsx";
import { Button } from "../../../../../../../packages/external/ui/button.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useRouter } from "@tanstack/react-router";

type LeaveUnsavedButtonProps = { variant: any; enabled: boolean };

export function LeaveUnsavedButton({
  variant,
  enabled,
}: LeaveUnsavedButtonProps) {
  const router = useRouter();
  const leaveUnsavedText = `Are you sure you want to exit the builder?`;
  const leaveUnsavedSubtitle = `ALL unsubmitted changes will be lost. If you want to submit, click Submit Snapshot in the header`;

  if (!enabled) {
    return <Button variant={variant}>Quit</Button>;
  }

  return (
    <LeaveUnsavedDialog
      title={leaveUnsavedText}
      subtitle={leaveUnsavedSubtitle}
      onClick={() => router.navigate(ludoNavigation.hub.builder.toBuilderHub())}
    >
      <Button variant={variant}> Quit </Button>
    </LeaveUnsavedDialog>
  );
}
