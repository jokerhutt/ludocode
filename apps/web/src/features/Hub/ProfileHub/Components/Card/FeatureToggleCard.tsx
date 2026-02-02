import { BotIcon, Volume2Icon } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { useState } from "react";

export function FeatureToggleGroup() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(true);

  return (
    <div className="w-full flex justify-between gap-4">
      <StatsCard
        onClick={() => setAudioEnabled(!audioEnabled)}
        text={`Audio: ${audioEnabled ? "ON" : "OFF"}`}
      >
        <Volume2Icon className="h-6 text-white" />
      </StatsCard>
      <StatsCard
        onClick={() => setAiEnabled(!aiEnabled)}
        text={`AI: ${aiEnabled ? "ON" : "OFF"}`}
      >
        <BotIcon className="h-6 text-white" />
      </StatsCard>
    </div>
  );
}
