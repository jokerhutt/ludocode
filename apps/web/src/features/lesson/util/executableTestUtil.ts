import type { ExecutableTest } from "@ludocode/types";

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
    if (test.type === "OUTPUT_PATTERN_MATCHES") {
      const regex = new RegExp(test.expected);
      return regex.test(output);
    }

    if (test.type === "FILE_PATTERN_MATCHES") {
      const regex = new RegExp(test.expected);
      return files.some((file) => regex.test(file.content));
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
