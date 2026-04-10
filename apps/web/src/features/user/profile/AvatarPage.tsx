import { getUserAvatar } from "@/constants/avatars/avatars";
import { qo } from "@/queries/definitions/queries";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import { useSuspenseQuery } from "@tanstack/react-query";

type AvatarPageProps = {};

export function AvatarPage({}: AvatarPageProps) {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  const {avatarVersion, avatarIndex} = user;
  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

  return (
    <div className="col-span-full lg:px-4 relative pt-6 lg:col-span-6 flex flex-col gap-2 lg:gap-0 lg:items-center h-full min-h-0 justify-start min-w-0">
      <div className="flex flex-col items-center gap-3 lg:gap-4 lg:w-full pb-6 px-4 rounded-xl">
        <Avatar className="h-24 w-24 relative" src={userPfpSrc} />
      </div>
    </div>
  );
}
