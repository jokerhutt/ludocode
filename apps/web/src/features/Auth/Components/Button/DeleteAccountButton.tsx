import { useDeleteAccount } from "@/hooks/Queries/Mutations/useDeleteAccount.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog.tsx";
import type { DestructiveActionConfirmation } from "@ludocode/design-system/templates/dialog/WarningDialog.tsx";

type DeleteAccountButtonProps = {
  username: string;
};

export function DeleteAccountButton({ username }: DeleteAccountButtonProps) {
  const deleteUserMutation = useDeleteAccount();

  const handleDeleteAccount = () => {
    if (deleteUserMutation.isPending) return;
    deleteUserMutation.mutate();
  };

  const confirmation: DestructiveActionConfirmation = {
    confirmationValue: username,
    confirmationText: `type ${username} to confirm`,
  };

  return (
    <DeleteDialog
      targetName="your account"
      destructiveConfirmation={confirmation}
      onClick={() => handleDeleteAccount()}
    >
      <LudoButton variant="danger">Delete Account</LudoButton>
    </DeleteDialog>
  );
}
