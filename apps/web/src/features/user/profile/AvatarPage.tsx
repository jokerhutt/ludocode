import { useState } from "react";
import { getUserAvatar } from "@/constants/avatars/avatars";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "@/queries/definitions/queries";
import { useChangeAvatar } from "@/queries/mutations/useChangeAvatar";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { cn } from "@ludocode/design-system/cn-utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

const AVATAR_VERSION = "v1";
const AVATAR_COUNT = 12;
const avatarIndices = Array.from({ length: AVATAR_COUNT }, (_, i) => i + 1);

export function AvatarPage() {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  const router = useRouter();
  const changeAvatar = useChangeAvatar(user.id);

  const [selectedIndex, setSelectedIndex] = useState<number>(user.avatarIndex);

  const previewSrc = getUserAvatar(AVATAR_VERSION, selectedIndex);
  const hasChanged = selectedIndex !== user.avatarIndex;

  return (
    <div className="col-span-full lg:px-4 relative pt-6 lg:col-span-6 flex flex-col gap-6 lg:items-center h-full min-h-0 justify-start min-w-0">
      <div className="flex flex-col items-center gap-3 px-4">
        <div className="relative">
          <div className="absolute -inset-1.5 rounded-full bg-ludo-surface-hover blur-md" />
          <Avatar className="h-24 w-24 relative" src={previewSrc} />
        </div>
        <p className="text-sm text-ludo-white/60">Select an avatar</p>
      </div>

      <div className="w-full px-4 flex flex-col gap-4">
        <div className="w-full border border-white/5 bg-white/1 rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-ludo-white/70 font-semibold mb-4">
            Choose Avatar
          </p>
          <div className="grid grid-cols-4 lg:grid-cols-6 2xl:grid-cols-12 gap-3">
            {avatarIndices.map((index) => {
              const isSelected = index === selectedIndex;
              const src = getUserAvatar(AVATAR_VERSION, index);
              return (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "rounded-full overflow-hidden transition-all duration-150 cursor-pointer border-2",
                    isSelected
                      ? "border-ludo-accent"
                      : "border-transparent hover:border-ludo-white/20",
                  )}
                >
                  <img
                    src={src}
                    alt={`Avatar ${index}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <LudoButton
            variant="default"
            onClick={() =>
              router.navigate(ludoNavigation.hub.profile.toProfile(user.id))
            }
            className="flex-1"
          >
            Cancel
          </LudoButton>
          <LudoButton
            variant="alt"
            onClick={() =>
              changeAvatar.mutate({
                version: AVATAR_VERSION,
                index: selectedIndex,
              })
            }
            disabled={!hasChanged || changeAvatar.isPending}
            isLoading={changeAvatar.isPending}
            className="flex-1"
          >
            Save
          </LudoButton>
        </div>
      </div>
    </div>
  );
}
