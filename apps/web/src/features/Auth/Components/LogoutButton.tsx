import { Button } from "../../../../../../packages/external/ui/button.tsx";
import { useLogout } from "@/hooks/Queries/Mutations/useLogout.tsx";

type LogoutButtonProps = {};

export function LogoutButton({}: LogoutButtonProps) {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    if (logoutMutation.isPending) return;
    logoutMutation.mutate();
  };

  return (
    <Button onClick={() => handleLogout()} className="text-lg">
      Log Out
    </Button>
  );
}
