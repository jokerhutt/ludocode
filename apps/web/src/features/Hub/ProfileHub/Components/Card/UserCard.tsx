import { getUserAvatar } from "@/constants/avatars/avatars";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import type { LudoUser } from "@ludocode/types";
import dayjs from "dayjs";

type UserCardProps = { user: LudoUser };

export function UserCard({ user }: UserCardProps) {
  const { displayName, createdAt, avatarVersion, avatarIndex } = user;
  const joinTime = dayjs(createdAt).format("MMMM DD, YYYY");

  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

  return (
    <div className="flex gap-4 lg:gap-6 lg:w-full p-4 bg-ludoGrayLight rounded-md">
      <Avatar src={userPfpSrc} />
      <div className="flex flex-col">
        <h2 className=" text-lg lg:text-2xl">{displayName}</h2>
        <h3 className="lg:text-lg text-sm">Joined: {joinTime}</h3>
      </div>
    </div>
  );
}
