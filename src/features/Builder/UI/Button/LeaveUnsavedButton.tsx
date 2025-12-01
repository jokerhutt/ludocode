import { LeaveUnsavedDialog } from "@/components/LudoComponents/Blocks/Dialog/Warning/LeaveUnsavedDialog";
import { Button } from "@/components/ui/button";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";

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
      onClick={() => router.navigate(ludoNavigation.hub.builder.toBuilderHub())}
    >
      <Button variant={variant}> Quit </Button>
    </LeaveUnsavedDialog>
  );
}
