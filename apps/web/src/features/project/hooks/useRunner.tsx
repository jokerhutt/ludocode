import { api } from "@/constants/api/api.ts";
import type { OutputPacket } from "@ludocode/types/Project/Runner/OutputPacket.ts";
import type {
  PistonDataMessage,
  PistonErrorMessage,
  PistonMessage,
  RunnerClientMessage,
  RunnerFile,
  RunnerRunMessage,
  RunnerStdinMessage,
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

function resolveRunnerSocketUrl() {
  const runnerUrl = new URL(api.runner.ws, window.location.origin);

  if (runnerUrl.protocol === "http:") runnerUrl.protocol = "ws:";
  if (runnerUrl.protocol === "https:") runnerUrl.protocol = "wss:";

  return runnerUrl.toString();
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
  const socketRef = useRef<WebSocket | null>(null);
  const stoppedByUserRef = useRef(false);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    return () => {
      socketRef.current?.close();
      socketRef.current = null;
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
    if (!socketRef.current) return;

    stoppedByUserRef.current = true;
    setIsSocketOpen(false);
    socketRef.current.close();
    socketRef.current = null;
  }, []);

  const runCode = useCallback(() => {
    if (socketRef.current || isRunning) return;
    if (disabled) {
      console.warn("Code execution is disabled");
      return;
    }
    if (!project.projectId) return;
    if (!filesRef.current || filesRef.current.length === 0) return;

    const runnerFiles = buildRunnerFiles(filesRef.current, entryFileId);
    const socket = new WebSocket(resolveRunnerSocketUrl());
    socketRef.current = socket;
    stoppedByUserRef.current = false;
    setIsRunning(true);
    setOutputLog((prev) => [...prev, createOutputPacket()]);

    socket.onopen = () => {
      setIsSocketOpen(true);

      const runMessage: RunnerRunMessage = {
        type: "run",
        files: runnerFiles,
      };

      const message: RunnerClientMessage = runMessage;
      socket.send(JSON.stringify(message));
    };

    socket.onmessage = (event) => {
      if (typeof event.data !== "string") {
        finalizeRunWithError("Runner returned an unreadable response.");
        socket.close();
        return;
      }

      try {
        const message = JSON.parse(event.data) as PistonMessage;
        handleIncomingMessage(message);

        if (message.type === "exit" || message.type === "error") {
          socket.close();
        }
      } catch {
        finalizeRunWithError("Runner returned an invalid response.");
        socket.close();
      }
    };

    socket.onerror = () => {
      finalizeRunWithError("Runner connection error.");
    };

    socket.onclose = () => {
      socketRef.current = null;
      setIsSocketOpen(false);

      if (stoppedByUserRef.current) {
        stoppedByUserRef.current = false;
        finalizeRunStopped();
        return;
      }

      finalizeRunWithError("Runner connection closed.");
    };
  }, [
    isRunning,
    project.projectId,
    entryFileId,
    disabled,
    finalizeRunStopped,
    finalizeRunWithError,
    handleIncomingMessage,
  ]);

  const sendStdin = useCallback((text: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return false;
    }

    const echoedInput: PistonDataMessage = {
      type: "data",
      stream: "stdout",
      data: `> ${text}`,
    };
    const stdinMessage: RunnerStdinMessage = {
      type: "stdin",
      text,
    };
    const message: RunnerClientMessage = stdinMessage;

    updateActivePacket((packet) => ({
      ...packet,
      messages: [...packet.messages, echoedInput],
    }));
    socketRef.current.send(JSON.stringify(message));
    return true;
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
