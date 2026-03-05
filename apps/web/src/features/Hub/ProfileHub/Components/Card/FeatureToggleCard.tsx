import { BotIcon, Volume2Icon } from "lucide-react";
import { StatsCard } from "./StatsCard";

type FeatureToggleGroupProps = {
  audioEnabled: boolean;
  setAudioEnabled: (value: boolean) => void;
  aiEnabled: boolean;
  setAiEnabled: (value: boolean) => void;
};

export function FeatureToggleGroup({
  audioEnabled,
  setAudioEnabled,
  aiEnabled,
  setAiEnabled,
}: FeatureToggleGroupProps) {
  return (
    <div className="w-full flex justify-between gap-4">
      <StatsCard
        onClick={() => setAudioEnabled(!audioEnabled)}
        text={`Audio: ${audioEnabled ? "ON" : "OFF"}`}
      >
        <Volume2Icon className="h-6 text-ludo-white-bright" />
      </StatsCard>
      <StatsCard
        onClick={() => setAiEnabled(!aiEnabled)}
        text={`AI: ${aiEnabled ? "ON" : "OFF"}`}
      >
        <BotIcon className="h-6 text-ludo-white-bright" />
      </StatsCard>
    </div>
  );
}
