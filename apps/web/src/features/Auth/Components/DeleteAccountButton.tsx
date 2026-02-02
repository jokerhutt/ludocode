import { useDeleteAccount } from "@/hooks/Queries/Mutations/useDeleteAccount";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog";

export function DeleteAccountButton() {
  const deleteUserMutation = useDeleteAccount();

  const handleDeleteAccount = () => {
    if (deleteUserMutation.isPending) return;
    deleteUserMutation.mutate();
  };

  return (
    <DeleteDialog
      targetName="your account"
      canDelete
      onClick={() => handleDeleteAccount()}
    >
      <LudoButton variant="danger">Delete Account</LudoButton>
    </DeleteDialog>
  );
}
