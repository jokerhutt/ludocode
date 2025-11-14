import { mutations } from "@/Hooks/Queries/Definitions/mutations";
import type { OutputPacket } from "@/Types/Playground/OutputPacket";
import type { ProjectFileSnapshot } from "@/Types/Playground/ProjectFileSnapshot";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import type { RunnerResult } from "@/Types/Playground/RunnerResult";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

type Args = {
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
};

export function useRunner({ project, files }: Args) {
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

  return {
    outputLog, // OutputPacket[]
    clearOutput,
    runCode,
    isRunning: runMutation.isPending,
  };
}
