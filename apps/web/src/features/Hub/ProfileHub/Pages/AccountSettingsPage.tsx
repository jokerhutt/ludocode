import { qo } from "@/hooks/Queries/Definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FeatureToggleGroup } from "../Components/Card/FeatureToggleCard";
import { ProfileCardContainer } from "../Components/Card/ProfileCardContainer";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { AICreditBalanceCard } from "../Components/Card/AICreditBalanceCard";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import { getUserAvatar } from "@/constants/avatars/avatars";
import { DeleteAccountButton } from "@/features/Auth/Components/DeleteAccountButton";
import { LogoutButton } from "@/features/Auth/Components/LogoutButton";
import { router } from "@/main";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { useState } from "react";
import { useEditPreferences } from "@/hooks/Queries/Mutations/useEditPreferences";
import type { TogglePreferencesRequest } from "@ludocode/types";
import { parseToDate } from "@ludocode/util";
import { parseToDigitDate } from "@ludocode/util/date/dateUtils";

export function AccountSettingsPage() {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  const { data: preferences } = useSuspenseQuery(qo.preferences());
  const { avatarIndex, avatarVersion, createdAt, displayName } = user;
  const joinTime = parseToDate(createdAt);
  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

  const { data: subscription } = useSuspenseQuery(qo.subscription());
  const { monthlyCreditAllowance, currentPeriodEnd, planCode } = subscription;
  const renewalDate = parseToDigitDate(Number(currentPeriodEnd));
  const { data: aiCredits } = useSuspenseQuery(qo.credits());

  const [audioEnabled, setAudioEnabled] = useState(preferences.audioEnabled);
  const [aiEnabled, setAiEnabled] = useState(preferences.aiEnabled);

  const editPreferencesMutation = useEditPreferences();

  const handleSubmission = () => {
    if (editPreferencesMutation.isPending) return;
    if (
      audioEnabled == preferences.audioEnabled &&
      aiEnabled == preferences.aiEnabled
    ) {
      router.navigate(ludoNavigation.hub.profile.toProfile(user.id));
    } else {
      const submission: TogglePreferencesRequest = {
        aiEnabled: aiEnabled,
        audioEnabled: audioEnabled,
      };
      editPreferencesMutation.mutate(submission);
    }
  };

  return (
    <div className="col-span-full px-4  relative lg:col-span-6 flex flex-col gap-2 lg:gap-0 lg:items-center h-full min-h-0 justify-start min-w-0">
      <div className="w-full flex gap-4 py-4">
        <Avatar className="h-20 w-22" src={userPfpSrc} />
        <div className="flex flex-col gap-1">
          <h2 className=" text-xl lg:text-2xl">{user.displayName}</h2>
          <h3 className="lg:text-lg text-base">{joinTime}</h3>
        </div>
      </div>
      <div className="w-full flex pb-6 flex-col gap-5">
        <LudoButton
          isLoading={editPreferencesMutation.isPending}
          onClick={() => handleSubmission()}
          variant="alt"
        >
          Save & Exit
        </LudoButton>
        <ProfileCardContainer header="PREFERENCES">
          <FeatureToggleGroup
            audioEnabled={audioEnabled}
            setAudioEnabled={setAudioEnabled}
            aiEnabled={aiEnabled}
            setAiEnabled={setAiEnabled}
          />
        </ProfileCardContainer>

        <ProfileCardContainer header="AI">
          <AICreditBalanceCard
            planCode={planCode}
            remaining={aiCredits}
            allowance={monthlyCreditAllowance}
            renewalDate={renewalDate}
          />
        </ProfileCardContainer>

        <ProfileCardContainer className="gap-5" header="DANGER ZONE">
          <LogoutButton />
          <DeleteAccountButton username={displayName!!} />
        </ProfileCardContainer>
      </div>
    </div>
  );
}
