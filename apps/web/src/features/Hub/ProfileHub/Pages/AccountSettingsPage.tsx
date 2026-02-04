import { qo } from "@/hooks/Queries/Definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FeatureToggleGroup } from "../Components/Card/FeatureToggleCard";
import { ProfileCardContainer } from "../Components/Card/ProfileCardContainer";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { AICreditBalanceCard } from "../Components/Card/AICreditBalanceCard";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import { getUserAvatar } from "@/constants/avatars/avatars";
import dayjs from "dayjs";
import { DeleteAccountButton } from "@/features/Auth/Components/DeleteAccountButton";
import { LogoutButton } from "@/features/Auth/Components/LogoutButton";
import { router } from "@/main";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { useState } from "react";
import { useEditPreferences } from "@/hooks/Queries/Mutations/useEditPreferences";
import type { TogglePreferencesRequest } from "@ludocode/types";

export function AccountSettingsPage() {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  const { data: preferences } = useSuspenseQuery(qo.preferences());
  const { avatarIndex, avatarVersion, createdAt, displayName } = user;
  const joinTime = dayjs(createdAt * 1000).format("MMMM DD, YYYY");
  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

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
    <div className="col-span-full px-4 relative lg:col-span-6 flex flex-col gap-2 lg:gap-0 lg:items-center h-full min-h-0 justify-start min-w-0">
      <div className="w-full flex gap-4 py-4">
        <Avatar className="h-20 w-20" src={userPfpSrc} />
        <div className="flex flex-col gap-1">
          <h2 className=" text-2xl lg:text-2xl">{user.displayName}</h2>
          <h3 className="lg:text-lg text-md">{joinTime}</h3>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-5">
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
          <AICreditBalanceCard remaining={0} allowance={0} renewalDate="" />
        </ProfileCardContainer>

        <ProfileCardContainer className="gap-5" header="DANGER ZONE">
          <LogoutButton />
          <DeleteAccountButton username={displayName!!} />
        </ProfileCardContainer>
      </div>
    </div>
  );
}
