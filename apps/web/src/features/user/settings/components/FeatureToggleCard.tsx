import { BotIcon, Volume2Icon } from "lucide-react";
import { StatsCard } from "../../../stats/components/StatsCard.tsx";
import { useEditPreferences } from "@/queries/mutations/useEditPreferences.tsx";

type FeatureToggleGroupProps = {
  audioEnabled: boolean;
  aiEnabled: boolean;
};

export function FeatureToggleGroup({
  audioEnabled,
  aiEnabled,
}: FeatureToggleGroupProps) {
  const mutation = useEditPreferences();

  const handleToggle = (key: "AUDIO" | "AI", currentValue: boolean) => {
    if (mutation.isPending) return;
    mutation.mutate({ key, value: !currentValue });
  };

  return (
    <div className="w-full flex justify-between gap-4">
      <StatsCard
        onClick={() => handleToggle("AUDIO", audioEnabled)}
        text={`Audio: ${audioEnabled ? "ON" : "OFF"}`}
      >
        <Volume2Icon className="h-6 text-ludo-white-bright" />
      </StatsCard>
      <StatsCard
        onClick={() => handleToggle("AI", aiEnabled)}
        text={`AI: ${aiEnabled ? "ON" : "OFF"}`}
      >
        <BotIcon className="h-6 text-ludo-white-bright" />
      </StatsCard>
    </div>
  );
}
