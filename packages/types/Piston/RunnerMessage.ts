export type RunnerRunMessage = {
  type: "run";
  files: RunnerFile[];
};

export type RunnerFile = {
  codeLanguage: string;
  name: string;
  content: string;
};

export type RunnerStdinMessage = {
  type: "stdin";
  text: string;
};

export type RunnerClientMessage =
  | RunnerRunMessage
  | RunnerStdinMessage;



/* ---------------- SERVER → CLIENT (Piston passthrough) ---------------- */

export type PistonMessage =
  | PistonRuntimeMessage
  | PistonStageMessage
  | PistonDataMessage
  | PistonExitMessage
  | PistonErrorMessage;

export type PistonRuntimeMessage = {
  type: "runtime";
  language: string;
  version: string;
};

export type PistonStageMessage = {
  type: "stage";
  stage: "compile" | "run";
};

export type PistonDataMessage = {
  type: "data";
  stream: "stdout" | "stderr";
  data: string;
};

export type PistonExitMessage = {
  type: "exit";
  stage: "compile" | "run";
  code: number | null;
  signal: string | null;
};

export type PistonErrorMessage = {
  type: "error";
  message: string;
};