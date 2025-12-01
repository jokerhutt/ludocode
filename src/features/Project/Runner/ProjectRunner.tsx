import { useCodeRunnerContext } from "../../../Hooks/Context/Runner/CodeRunnerContext";

export function ProjectRunner() {
  const isError = (status: number) => status != 0;
  const { outputInfo } = useCodeRunnerContext();
  const { outputLog } = outputInfo;
  return (
    <div className="flex overflow-y-auto h-full flex-col p-4">
      {outputLog.map((log, logIdx) => (
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
