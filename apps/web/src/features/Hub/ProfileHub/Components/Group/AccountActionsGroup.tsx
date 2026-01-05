import { DeleteAccountButton } from "@/features/Auth/Components/DeleteAccountButton";
import { LogoutButton } from "@/features/Auth/Components/LogoutButton";

type AccountActionsGroupProps = {};

export function AccountActionsGroup({}: AccountActionsGroupProps) {
  return (
    <div className="absolute bottom-8 w-full flex gap-2 lg:gap-4 justify-between lg:justify-end">
      <DeleteAccountButton />
      <LogoutButton />
    </div>
  );
}
