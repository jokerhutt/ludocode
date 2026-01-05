import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { UserCard } from "../Components/Card/UserCard";
import { AccountActionsGroup } from "../Components/Group/AccountActionsGroup";

type ProfilePageProps = {};

export function ProfilePage({}: ProfilePageProps) {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  return (
    <div className="layout-grid scrollable col-span-full text-ludoAltText relative px-8 lg:px-0 py-6">
      <div className="hidden lg:block lg:col-span-2" />
      <div className="col-span-full relative lg:col-span-8 flex flex-col gap-4 lg:items-center h-full min-h-0 justify-start min-w-0">
        <UserCard user={user} />
        <div className="w-full">
          <LudoButton variant="alt">Edit Profile</LudoButton>
        </div>
        <AccountActionsGroup />
      </div>
      <div className="hidden lg:block lg:col-span-2" />
    </div>
  );
}
