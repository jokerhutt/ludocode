import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LogoutButton } from "@/features/Auth/Components/LogoutButton.tsx";
import dayjs from "dayjs";
import { DeleteAccountButton } from "@/features/Auth/Components/DeleteAccountButton";
import { getUserAvatar } from "@/constants/avatars/avatars";
import { Avatar } from "@ludocode/design-system/primitives/avatar";

type ProfilePageProps = {};

export function ProfilePage({}: ProfilePageProps) {
  const { data: user } = useSuspenseQuery(qo.currentUser());

  const { avatarVersion, avatarIndex, createdAt } = user;

  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

  const joinTime = dayjs(createdAt).format("MMMM DD, YYYY");

  return (
    <div className="layout-grid scrollable col-span-full text-ludoAltText relative px-8 lg:px-0 py-6">
      <div className="hidden lg:block lg:col-span-2" />
      <div className="col-span-full relative lg:col-span-8 flex flex-col gap-4 lg:items-center h-full min-h-0 justify-start min-w-0">
        <div className="flex gap-6 lg:w-full p-4 bg-ludoGrayLight rounded-md">
          <Avatar src={userPfpSrc} />
          <div className="flex flex-col gap-1">
            <h2 className=" text-xl lg:text-2xl">
              {user.firstName} {user.lastName}
            </h2>
            <h3 className="lg:text-lg">Joined: {joinTime}</h3>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2>Badges:</h2>
          <div className="w-full min-h-10 rounded-md p-4 bg-ludoGrayLight"></div>
        </div>
        <div className="absolute bottom-8 flex gap-2 right-8 lg:right-0">
          <DeleteAccountButton />
          <LogoutButton />
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-2" />
    </div>
  );
}
