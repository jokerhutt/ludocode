import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { cn } from "@ludocode/design-system/cn-utils";
import { Pencil } from "lucide-react";

type EditAvatarButtonProps = { userId: string; className?: string };

export function EditAvatarButton({ userId, className }: EditAvatarButtonProps) {
  return (
    <button
      type="button"
      aria-label="Edit avatar"
      onClick={() =>
        router.navigate(ludoNavigation.hub.profile.toAvatar(userId))
      }
      className={cn(
        "hover:bg-ludo-white-bright hover:text-black hover:cursor-pointer z-10 rounded-md flex justify-center items-center h-8 w-8 bg-ludo-accent",
        className,
      )}
    >
      <Pencil className="h-4 w-4" />
    </button>
  );
}
