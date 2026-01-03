import { useLogout } from "@/hooks/Queries/Mutations/useLogout.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

type LogoutButtonProps = {};

export function LogoutButton({}: LogoutButtonProps) {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    if (logoutMutation.isPending) return;
    logoutMutation.mutate();
  };

  return (
    <LudoButton variant="alt" onClick={() => handleLogout()} className="text-lg px-4">
      Log Out
    </LudoButton>
  );
}
