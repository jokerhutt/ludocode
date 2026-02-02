import { qo } from "@/hooks/Queries/Definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserCard } from "../Components/Card/UserCard";
import { FeatureToggleGroup } from "../Components/Card/FeatureToggleCard";
import { ProfileCardContainer } from "../Components/Card/ProfileCardContainer";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { AICreditBalanceCard } from "../Components/Card/AICreditBalanceCard";

export function AccountSettingsPage() {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  return (
    <div className="col-span-full px-4 relative lg:col-span-6 flex flex-col gap-2 lg:gap-0 lg:items-center h-full min-h-0 justify-start min-w-0">
      <UserCard user={user} showJoinDate={false} />
      <div className="w-full h-full flex flex-col gap-5">
        <ProfileCardContainer header="PREFERENCES">
          <FeatureToggleGroup />
        </ProfileCardContainer>

        <ProfileCardContainer header="AI">
          <AICreditBalanceCard remaining={0} allowance={0} renewalDate="" />
        </ProfileCardContainer>

        <ProfileCardContainer className="gap-5" header="DANGER ZONE">
          <LudoButton variant="white">Sign out</LudoButton>
          <LudoButton variant="danger">Delete Account</LudoButton>
        </ProfileCardContainer>
      </div>
    </div>
  );
}
