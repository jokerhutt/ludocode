import { mutations } from "@/queries/definitions/mutations.ts";
import type { OutputPacket } from "@ludocode/types/Project/Runner/OutputPacket.ts";
import type { ProjectFileSnapshot } from "@ludocode/types/Project/ProjectFileSnapshot.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import type { RunnerResult } from "@ludocode/types/Project/Runner/RunnerResult.ts";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState, useRef, useEffect } from "react";

type Args = {
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
  disabled?: boolean;
  entryFileId: string;
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

export function useRunner({
  project,
  files,
  disabled,
  entryFileId,
}: Args): useRunnerResponse {
  const [outputLog, setOutputLog] = useState<OutputPacket[]>([]);
  const filesRef = useRef<ProjectFileSnapshot[]>(files);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);
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
    if (disabled) {
      console.warn("Code execution is disabled");
      return;
    }
    if (!project.projectId) return;
    if (!filesRef.current || filesRef.current.length === 0) return;

    const normalizedFiles: ProjectFileSnapshot[] = filesRef.current.map(
      (file) => ({
        id: file.id ?? file.tempId,
        path: file.path,
        language: file.language,
        content: file.content,
      }),
    );

    const fresh: ProjectSnapshot = {
      projectId: project.projectId,
      projectLanguage: project.projectLanguage,
      projectName: project.projectName,
      files: normalizedFiles,
      entryFileId,
    };

    runMutation.mutate(fresh);
  }, [
    project.projectId,
    project.projectLanguage,
    project.projectName,
    entryFileId,
    runMutation,
  ]);

  const outputInfo: OutputInfo = {
    outputLog,
    clearOutput,
    isRunning: runMutation.isPending,
  };

  return {
    outputInfo,
    runCode,
  };
}
