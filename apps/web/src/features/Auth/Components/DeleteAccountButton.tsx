import { useDeleteAccount } from "@/hooks/Queries/Mutations/useDeleteAccount";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

export function DeleteAccountButton() {
  const deleteUserMutation = useDeleteAccount();

  const handleDeleteAccount = () => {
    if (deleteUserMutation.isPending) return;
    deleteUserMutation.mutate();
  };

  return (
    <LudoButton
      variant="alt"
      onClick={() => handleDeleteAccount()}
      className="text-lg w-50 px-4"
    >
      Delete
    </LudoButton>
  );
}
