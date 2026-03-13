import type { ExecutableTest } from "@ludocode/types";

function normalize(s: string) {
  return (s ?? "").trim();
}

export function evaluateExecutableTests({
  tests,
  output,
  status,
  files,
}: {
  tests: ExecutableTest[];
  output: string;
  status: number;
  files: { name: string; content: string }[];
}) {
  if (status !== 0) return false;

  return tests.every((test) => {
    if (test.type === "OUTPUT_EQUALS") {
      return normalize(output) === normalize(test.expected);
    }
    if (test.type === "OUTPUT_CONTAINS") {
      return output.includes(test.expected);
    }
    if (test.type === "FILE_CONTAINS") {
      return files.some((file) => file.content.includes(test.expected));
    }
    return false;
  });
}