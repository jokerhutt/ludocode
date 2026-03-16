import {
  createRunnerClient,
  type RunnerClient,
} from "@/features/project/runner/runnerClient.ts";
import type { OutputPacket } from "@ludocode/types/Project/Runner/OutputPacket.ts";
import type {
  PistonDataMessage,
  PistonErrorMessage,
  PistonMessage,
  RunnerFile,
} from "@ludocode/types/Piston/RunnerMessage.ts";
import type { ProjectFileSnapshot } from "@ludocode/types/Project/ProjectFileSnapshot.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
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
  canSendStdin: boolean;
};

export type useRunnerResponse = {
  outputInfo: OutputInfo;
  runCode: () => void;
  stopCode: () => void;
  sendStdin: (text: string) => boolean;
};

function createOutputPacket(): OutputPacket {
  return {
    status: -1,
    output: [],
    outputText: "",
    messages: [],
    activeStage: null,
    isComplete: false,
  };
}

function toOutputLines(outputText: string) {
  return outputText.split("\n");
}

function buildRunnerFiles(
  files: ProjectFileSnapshot[],
  entryFileId: string,
): RunnerFile[] {
  const orderedFiles = [...files].sort((left, right) => {
    const leftId = left.id ?? left.tempId;
    const rightId = right.id ?? right.tempId;

    if (leftId === entryFileId) return -1;
    if (rightId === entryFileId) return 1;
    return 0;
  });

  return orderedFiles.map((file) => ({
    codeLanguage: file.language.pistonId,
    name: file.path,
    content: file.content,
  }));
}

export function useRunner({
  project,
  files,
  disabled,
  entryFileId,
}: Args): useRunnerResponse {
  const [outputLog, setOutputLog] = useState<OutputPacket[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const filesRef = useRef<ProjectFileSnapshot[]>(files);
  const clientRef = useRef<RunnerClient | null>(null);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    return () => {
      clientRef.current?.dispose();
      clientRef.current = null;
    };
  }, []);

  const clearOutput = useCallback(() => setOutputLog([]), []);

  const updateActivePacket = useCallback(
    (update: (packet: OutputPacket) => OutputPacket) => {
      setOutputLog((prev) => {
        if (prev.length === 0) return prev;

        const next = [...prev];
        const lastIdx = next.length - 1;
        const activePacket = next[lastIdx];

        if (activePacket.isComplete) return prev;

        next[lastIdx] = update(activePacket);
        return next;
      });
    },
    [],
  );

  const finalizeRunWithError = useCallback(
    (message: string) => {
      const errorMessage: PistonErrorMessage = {
        type: "error",
        message,
      };

      setIsRunning(false);
      setIsSocketOpen(false);
      updateActivePacket((packet) => ({
        ...packet,
        status: -1,
        isComplete: true,
        messages: [...packet.messages, errorMessage],
      }));
    },
    [updateActivePacket],
  );

  const finalizeRunStopped = useCallback(() => {
    const stoppedMessage: PistonDataMessage = {
      type: "data",
      stream: "stdout",
      data: "Execution stopped.\n",
    };

    setIsRunning(false);
    setIsSocketOpen(false);
    updateActivePacket((packet) => {
      const outputText = packet.outputText + stoppedMessage.data;

      return {
        ...packet,
        status: 0,
        isComplete: true,
        outputText,
        output: toOutputLines(outputText),
        messages: [...packet.messages, stoppedMessage],
      };
    });
  }, [updateActivePacket]);

  const handleIncomingMessage = useCallback(
    (message: PistonMessage) => {
      const isTerminalMessage =
        message.type === "exit" || message.type === "error";

      updateActivePacket((packet) => {
        const nextPacket: OutputPacket = {
          ...packet,
          messages: [...packet.messages, message],
        };

        if (message.type === "stage") {
          nextPacket.activeStage = message.stage;
        }

        if (message.type === "data") {
          const nextOutputText = packet.outputText + message.data;
          nextPacket.outputText = nextOutputText;
          nextPacket.output = toOutputLines(nextOutputText);
        }

        if (message.type === "exit") {
          nextPacket.status = message.code ?? -1;
          nextPacket.activeStage = message.stage;
          nextPacket.isComplete = true;
        }

        if (message.type === "error") {
          nextPacket.status = -1;
          nextPacket.isComplete = true;
        }

        return nextPacket;
      });

      if (isTerminalMessage) {
        setIsRunning(false);
      }
    },
    [updateActivePacket],
  );

  const stopCode = useCallback(() => {
    if (!clientRef.current) return;

    setIsSocketOpen(false);
    clientRef.current.stop();
  }, []);

  const createClient = useCallback(() => {
    return createRunnerClient({
      onOpen: () => {
        setIsSocketOpen(true);
      },

      onMessage: (message) => {
        handleIncomingMessage(message);
      },

      onClose: ({ stoppedByUser }) => {
        clientRef.current = null;
        setIsSocketOpen(false);

        if (stoppedByUser) {
          finalizeRunStopped();
          return;
        }

        finalizeRunWithError("Runner connection closed.");
      },

      onConnectionError: (message) => {
        finalizeRunWithError(message);
      },
    });
  }, [finalizeRunStopped, finalizeRunWithError, handleIncomingMessage]);

  const runCode = useCallback(() => {
    if (clientRef.current?.hasSocket() || isRunning) return;
    if (disabled) {
      console.warn("Code execution is disabled");
      return;
    }
    if (!project.projectId) return;
    if (!filesRef.current || filesRef.current.length === 0) return;

    const runnerFiles = buildRunnerFiles(filesRef.current, entryFileId);
    const client = createClient();

    clientRef.current = client;
    setIsRunning(true);
    setOutputLog((prev) => [...prev, createOutputPacket()]);
    client.run(runnerFiles);
  }, [
    createClient,
    isRunning,
    project.projectId,
    entryFileId,
    disabled,
  ]);

  const sendStdin = useCallback((text: string) => {
    if (!clientRef.current) {
      return false;
    }

    const echoedInput: PistonDataMessage = {
      type: "data",
      stream: "stdout",
      data: `> ${text}`,
    };

    updateActivePacket((packet) => ({
      ...packet,
      messages: [...packet.messages, echoedInput],
    }));

    return clientRef.current.sendStdin(text);
  }, [updateActivePacket]);

  const activePacket = outputLog[outputLog.length - 1];
  const canSendStdin =
    isRunning === true &&
    isSocketOpen === true &&
    activePacket !== undefined &&
    activePacket.isComplete === false;

  const outputInfo: OutputInfo = {
    outputLog,
    clearOutput,
    isRunning,
    canSendStdin,
  };

  return {
    outputInfo,
    runCode,
    stopCode,
    sendStdin,
  };
}
