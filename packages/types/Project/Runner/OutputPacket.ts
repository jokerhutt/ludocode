import type {
  PistonMessage,
  PistonStageMessage,
} from "../../Piston/RunnerMessage.ts";

export type OutputPacket = {
  status: number;
  output: string[];
  outputText: string;
  messages: PistonMessage[];
  activeStage: PistonStageMessage["stage"] | null;
  isComplete: boolean;
};
