import { Button } from "@/components/external/ui/button";
import { useLogout } from "@/hooks/Queries/Mutations/useLogout";

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
