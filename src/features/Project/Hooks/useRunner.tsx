import { mutations } from "@/hooks/Queries/Definitions/mutations.ts";
import type { OutputPacket } from "@/types/Project/Runner/OutputPacket.ts";
import type { ProjectFileSnapshot } from "@/types/Project/ProjectFileSnapshot.ts";
import type { ProjectSnapshot } from "@/types/Project/ProjectSnapshot.ts";
import type { RunnerResult } from "@/types/Project/Runner/RunnerResult.ts";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

type Args = {
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
};

export type OutputInfo = {
  outputLog: OutputPacket[];
  clearOutput: () => void;
  isRunning: boolean;
};

export type useRunnerResponse = {
  outputInfo: OutputInfo;
  runCode: () => void;
};

export function useRunner({ project, files }: Args) : useRunnerResponse {
  const [outputLog, setOutputLog] = useState<OutputPacket[]>([]);
  const clearOutput = useCallback(() => setOutputLog([]), []);

  const runMutation = useMutation<RunnerResult, Error, ProjectSnapshot>({
    ...mutations.runCode(),

    onSuccess: (result) => {
      const lines: string[] = [];

      if (result.stdout) {
        lines.push(...result.stdout.split("\n").filter(Boolean));
      }

      if (result.stderr) {
        lines.push(...result.stderr.split("\n").filter(Boolean));
      }

      const packet: OutputPacket = {
        status: result.exitCode,
        output: lines,
      };

      setOutputLog((prev) => [...prev, packet]);
    },

    onError: (err) => {
      const packet: OutputPacket = {
        status: -1,
        output: [`Error: ${err.message}`],
      };

      setOutputLog((prev) => [...prev, packet]);
    },
  });

  const runCode = useCallback(() => {
    if (!project.projectId) return;
    if (!files || files.length === 0) return;

    const fresh: ProjectSnapshot = {
      projectId: project.projectId,
      projectLanguage: project.projectLanguage,
      projectName: project.projectName,
      files,
    };

    runMutation.mutate(fresh);
  }, [
    project.projectId,
    project.projectLanguage,
    project.projectName,
    files,
    runMutation,
  ]);

  const outputInfo: OutputInfo = {outputLog, clearOutput, isRunning: runMutation.isPending}

  return {
    outputInfo,
    runCode
  };
}