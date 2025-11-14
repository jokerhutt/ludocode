import type { OutputPacket } from "@/Types/Playground/OutputPacket";

type ProjectRunnerProps = { output: OutputPacket[] };

export function ProjectRunner({ output }: ProjectRunnerProps) {
  const isError = (status: number) => status != 0;

  return (
    <div className="flex flex-col p-4">
      {output.map((log) => (
        <div
          className={`w-full flex flex-col py-4 border-b-2 ${
            isError(log.status)
              ? "text-red-400 border-b-red-400"
              : "text-white border-b-white"
          } `}
        >
          {log.output.map((line) => (
            <p className="text-sm">{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
