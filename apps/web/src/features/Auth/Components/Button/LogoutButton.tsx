import { useLogout } from "@/hooks/Queries/Mutations/useLogout.tsx";

type LogoutButtonProps = {};

export function LogoutButton({}: LogoutButtonProps) {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    if (logoutMutation.isPending) return;
    logoutMutation.mutate();
  };

  return (
    <button
      type="button"
      onClick={() => handleLogout()}
      className="text-sm text-ludo-white/70 text-start hover:text-white transition-colors hover:cursor-pointer"
    >
      Log out
    </button>
  );
}
