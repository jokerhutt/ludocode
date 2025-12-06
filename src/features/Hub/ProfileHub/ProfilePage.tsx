import { qo } from "@/hooks/Queries/Definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LogoutButton } from "./LogoutButton";
import dayjs from "dayjs";

type ProfilePageProps = {};

export function ProfilePage({}: ProfilePageProps) {
  const { data: user } = useSuspenseQuery(qo.currentUser());

  const { pfpSrc, createdAt } = user;

  const userPfpSrc = pfpSrc ?? "./mocks/img/mockpfp.png";

  const joinTime = dayjs(createdAt).format("MMMM DD, YYYY");

  return (
    <div className="grid col-span-full text-ludoAltText min-h-0 overflow-y-auto relative p-8 h-full grid-cols-12">
      <div className="hidden lg:block lg:col-span-2" />
      <div className="col-span-full relative lg:col-span-8 flex flex-col gap-4 lg:items-center h-full min-h-0 justify-start min-w-0">
        <div className="flex gap-6 lg:w-full p-4 bg-ludoGrayLight rounded-md">
          <img
            className="w-auto h-16 lg:h-32 object-fit rounded-xl"
            src={userPfpSrc}
          />
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
      </div>
      <div className="hidden lg:block lg:col-span-2" />
      <div className="absolute bottom-8 right-8">
        <LogoutButton />
      </div>
    </div>
  );
}
