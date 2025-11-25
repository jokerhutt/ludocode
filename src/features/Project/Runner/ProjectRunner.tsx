import type { OutputPacket } from "@/Types/Playground/OutputPacket.ts";

type ProjectRunnerProps = { output: OutputPacket[] };

export function ProjectRunner({ output }: ProjectRunnerProps) {
  const isError = (status: number) => status != 0;

  return (
    <div className="flex flex-col p-4">
      {output.map((log, logIdx) => (
        <div
          key={logIdx}
          className={`w-full flex flex-col py-4 border-b-2 ${
            isError(log.status)
              ? "text-red-400 border-b-red-400"
              : "text-white border-b-white"
          } `}
        >
          {log.output.map((line, lineIdx) => (
            <p key={`${logIdx}-${lineIdx}-${line}`} className="text-sm">
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
