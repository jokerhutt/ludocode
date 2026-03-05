import { useDeleteAccount } from "@/hooks/Queries/Mutations/useDeleteAccount.tsx";
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
      triggerClassName=""
      targetName="your account"
      destructiveConfirmation={confirmation}
      onClick={() => handleDeleteAccount()}
      
    >
      <button
        type="button"
        className="text-sm text-end w-full text-ludo-danger  hover:text-ludo-danger-hover transition-colors hover:cursor-pointer"
      >
        Delete account
      </button>
    </DeleteDialog>
  );
}
