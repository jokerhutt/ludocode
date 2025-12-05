import { qo } from "@/hooks/Queries/Definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LogoutButton } from "./LogoutButton";

type ProfilePageProps = {};

export function ProfilePage({}: ProfilePageProps) {
  const { data: user } = useSuspenseQuery(qo.currentUser());

  return (
    <div className="grid col-span-full min-h-0 overflow-y-auto relative p-8 h-full grid-cols-12">
      <div className="col-span-full relative lg:col-span-8 flex flex-col gap-4 items-center justify-start min-w-0">
        <div className="w-full h-40 rounded-2xl bg-ludoGrayLight">
            <img className="w-auto h-full object-fit rounded-l-2xl" src="/mocks/img/mockpfp.png"/>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-ludoAltText text-2xl">
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </div>

      <div className="absolute bottom-8 right-8">
        <LogoutButton/>
      </div>

    </div>
  );
}
