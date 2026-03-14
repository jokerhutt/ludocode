import type { ExecutableTest } from "@ludocode/types";

function didExecutableTestPass({
  test,
  output,
  files,
}: {
  test: ExecutableTest;
  output: string;
  files: { name: string; content: string }[];
}) {
if (test.type === "OUTPUT_PATTERN_MATCHES") {
  const regex = new RegExp(test.expected, "s");
  const result = regex.test(output);

  console.log("OUTPUT_PATTERN_MATCHES", {
    expectedRaw: test.expected,
    regex: regex.toString(),
    output,
    outputJSON: JSON.stringify(output),
    result,
  });

  return result;
}

  if (test.type === "FILE_PATTERN_MATCHES") {
    const regex = new RegExp(test.expected, "s");

    return files.some((file) => {
      const result = regex.test(file.content);
      console.log(file.content);
      console.log("FILE_PATTERN_MATCHES", {
        expectedRaw: test.expected,
        regex: regex.toString(),
        fileName: file.name,
        fileContent: JSON.stringify(file.content),
        result,
      });

      return result;
    });
  }

  if (test.type === "OUTPUT_CONTAINS") {
    return output.includes(test.expected);
  }

  if (test.type === "FILE_CONTAINS") {
    return files.some((file) => file.content.includes(test.expected));
  }

  return false;
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

  return tests.every((test) =>
    didExecutableTestPass({
      test,
      output,
      files,
    }),
  );
}

export function getFirstFailedExecutableTestFeedback({
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
  if (status !== 0) {
    return tests.find((test) => test.feedback?.trim())?.feedback ?? null;
  }

  for (const test of tests) {
    if (
      !didExecutableTestPass({
        test,
        output,
        files,
      })
    ) {
      return test.feedback?.trim() || null;
    }
  }

  return null;
}
