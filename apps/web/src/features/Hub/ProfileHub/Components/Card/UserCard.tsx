import { getUserAvatar } from "@/constants/avatars/avatars";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import type { LudoUser } from "@ludocode/types";
import dayjs from "dayjs";

type UserCardProps = {
  user: LudoUser;
  showAvatar?: boolean;
  showUsername?: boolean;
  showJoinDate?: boolean;
};

export function UserCard({
  user,
  showAvatar = true,
  showJoinDate = true,
  showUsername = true,
}: UserCardProps) {
  const { displayName, createdAt, avatarVersion, avatarIndex } = user;
  const joinTime = dayjs(createdAt * 1000).format("MMMM DD, YYYY");

  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

  return (
    <div className="flex flex-col items-center gap-4 lg:gap-6 lg:w-full p-4 rounded-md">
      {showAvatar && <Avatar className="h-24 w-24" src={userPfpSrc} />}
      <div className="flex flex-col gap-1 items-center">
        {showUsername && (
          <h2 className=" text-2xl lg:text-2xl">{displayName}</h2>
        )}
        {showJoinDate && (
          <h3 className="lg:text-lg text-md">Joined: {joinTime}</h3>
        )}
      </div>
    </div>
  );
}
