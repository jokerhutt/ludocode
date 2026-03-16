import { api } from "@/constants/api/api.ts";
import type {
  PistonMessage,
  RunnerClientMessage,
  RunnerFile,
  RunnerRunMessage,
  RunnerStdinMessage,
} from "@ludocode/types/Piston/RunnerMessage.ts";

export type RunnerClientCloseInfo = {
  stoppedByUser: boolean;
};

type CreateRunnerClientArgs = {
  onOpen: () => void;
  onMessage: (message: PistonMessage) => void;
  onClose: (info: RunnerClientCloseInfo) => void;
  onConnectionError: (message: string) => void;
};

export type RunnerClient = {
  run: (files: RunnerFile[]) => void;
  sendStdin: (text: string) => boolean;
  stop: () => void;
  dispose: () => void;
  hasSocket: () => boolean;
};

function resolveRunnerSocketUrl() {
  const runnerUrl = new URL(api.runner.ws, window.location.origin);

  if (runnerUrl.protocol === "http:") runnerUrl.protocol = "ws:";
  if (runnerUrl.protocol === "https:") runnerUrl.protocol = "wss:";

  return runnerUrl.toString();
}

export function createRunnerClient({
  onOpen,
  onMessage,
  onClose,
  onConnectionError,
}: CreateRunnerClientArgs): RunnerClient {
  let socket: WebSocket | null = null;
  let stoppedByUser = false;

  const clearSocket = () => {
    socket = null;
  };

  return {
    run(files) {
      if (socket) return;

      socket = new WebSocket(resolveRunnerSocketUrl());
      stoppedByUser = false;

      socket.onopen = () => {
        onOpen();

        const runMessage: RunnerRunMessage = {
          type: "run",
          files,
        };
        const message: RunnerClientMessage = runMessage;

        socket?.send(JSON.stringify(message));
      };

      socket.onmessage = (event) => {
        if (typeof event.data !== "string") {
          onConnectionError("Runner returned an unreadable response.");
          socket?.close();
          return;
        }

        try {
          const message = JSON.parse(event.data) as PistonMessage;
          onMessage(message);

          if (message.type === "exit" || message.type === "error") {
            socket?.close();
          }
        } catch {
          onConnectionError("Runner returned an invalid response.");
          socket?.close();
        }
      };

      socket.onerror = () => {
        onConnectionError("Runner connection error.");
      };

      socket.onclose = () => {
        const closeInfo: RunnerClientCloseInfo = {
          stoppedByUser,
        };

        stoppedByUser = false;
        clearSocket();
        onClose(closeInfo);
      };
    },

    sendStdin(text) {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return false;
      }

      const stdinMessage: RunnerStdinMessage = {
        type: "stdin",
        text,
      };
      const message: RunnerClientMessage = stdinMessage;

      socket.send(JSON.stringify(message));
      return true;
    },

    stop() {
      if (!socket) return;

      stoppedByUser = true;
      socket.close();
    },

    dispose() {
      if (!socket) return;

      socket.onopen = null;
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;

      socket.close();
      clearSocket();
    },

    hasSocket() {
      return socket !== null;
    },
  };
}
