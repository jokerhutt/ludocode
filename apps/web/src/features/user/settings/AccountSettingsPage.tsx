import { qo } from "@/queries/definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FeatureToggleGroup } from "./components/FeatureToggleCard.tsx";
import { ProfileCardContainer } from "@/features/user/components/ProfileCardContainer.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { AICreditBalanceCard } from "../../ai/components/AICreditBalanceCard.tsx";
import { Avatar } from "@ludocode/design-system/primitives/avatar.tsx";
import { getUserAvatar } from "@/constants/avatars/avatars.ts";
import { router } from "@/main.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useState } from "react";
import { useEditPreferences } from "@/queries/mutations/useEditPreferences.tsx";
import type { TogglePreferencesRequest } from "@ludocode/types";
import { parseToDate } from "@ludocode/util";
import { SubscriptionStatusCard } from "../../subscription/shared/components/SubscriptionStatusCard.tsx";

export function AccountSettingsPage() {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  const { data: preferences } = useSuspenseQuery(qo.preferences());
  const { avatarIndex, avatarVersion, createdAt } = user;
  const joinTime = parseToDate(createdAt);
  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

  const { data: subscription } = useSuspenseQuery(qo.subscription());
  const {
    monthlyCreditAllowance,
    currentPeriodEnd,
    planCode,
    cancelAtPeriodEnd,
  } = subscription;
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
    <div className="col-span-full lg:px-4 relative lg:col-span-6 flex flex-col gap-2 lg:gap-0 lg:items-center h-full min-h-0 justify-start min-w-0">
      <div className="w-full flex gap-4 py-6 items-center">
        <div className="relative">
          <div className="absolute -inset-1.5 rounded-full bg-ludo-surface-hover blur-md" />
          <Avatar className="h-20 w-20 relative" src={userPfpSrc} />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
            {user.displayName}
          </h2>
          <p className="text-sm text-ludo-white/60">{joinTime}</p>
        </div>
      </div>

      <div className="w-full flex pb-6 flex-col gap-4">
        <ProfileCardContainer header="PREFERENCES">
          <FeatureToggleGroup
            audioEnabled={audioEnabled}
            setAudioEnabled={setAudioEnabled}
            aiEnabled={aiEnabled}
            setAiEnabled={setAiEnabled}
          />
        </ProfileCardContainer>

        <div className="grid gap-4 md:grid-cols-2 items-stretch">
          <ProfileCardContainer
            className="flex flex-col h-full"
            header="SUBSCRIPTION"
          >
            <SubscriptionStatusCard
              planCode={planCode}
              currentPeriodEnd={currentPeriodEnd}
              cancelAtPeriodEnd={cancelAtPeriodEnd}
            />
          </ProfileCardContainer>

          <ProfileCardContainer className="flex flex-col h-full" header="AI">
            <AICreditBalanceCard
              isDev={planCode === "DEV"}
              remaining={aiCredits}
              allowance={monthlyCreditAllowance}
              currentPeriodEnd={currentPeriodEnd}
            />
          </ProfileCardContainer>
        </div>

        <div className="w-full items-center border-t-2 pt-4 border-t-ludo-border">
          <LudoButton
            isLoading={editPreferencesMutation.isPending}
            onClick={() => handleSubmission()}
            variant="alt"
            className="rounded-lg"
          >
            Save & Exit
          </LudoButton>
        </div>
      </div>
    </div>
  );
}
