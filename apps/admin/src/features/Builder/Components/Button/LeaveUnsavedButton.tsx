import { adminNavigation } from "@/constants/adminNavigation";
import { router } from "@/main";
import { LeaveUnsavedDialog } from "@ludocode/design-system/templates/dialog/leave-unsaved-dialog";
import { Button } from "@ludocode/external/ui/button";

type LeaveUnsavedButtonProps = { variant: any; enabled: boolean };

export function LeaveUnsavedButton({
  variant,
  enabled,
}: LeaveUnsavedButtonProps) {
  const leaveUnsavedText = `Are you sure you want to exit the builder?`;
  const leaveUnsavedSubtitle = `ALL unsubmitted changes will be lost. If you want to submit, click Submit Snapshot in the header`;

  if (!enabled) {
    return <Button variant={variant}>Quit</Button>;
  }

  return (
    <LeaveUnsavedDialog
      title={leaveUnsavedText}
      subtitle={leaveUnsavedSubtitle}
      onClick={() => router.navigate(adminNavigation.builder.toBuilderHub())}
    >
      <Button variant={variant}> Quit </Button>
    </LeaveUnsavedDialog>
  );
}
