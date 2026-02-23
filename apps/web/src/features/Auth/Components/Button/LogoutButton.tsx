import { useLogout } from "@/hooks/Queries/Mutations/useLogout.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";

type LogoutButtonProps = {};

export function LogoutButton({}: LogoutButtonProps) {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    if (logoutMutation.isPending) return;
    logoutMutation.mutate();
  };

  return (
    <LudoButton variant="white" onClick={() => handleLogout()}>
      Log Out
    </LudoButton>
  );
}
