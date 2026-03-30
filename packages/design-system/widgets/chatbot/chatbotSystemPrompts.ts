import type {
  AnswerToken,
  LudoExercise,
  ProjectSnapshot,
} from "@ludocode/types";
import {
  Languages,
  type ProjectFileSnapshot,
} from "@ludocode/types/Project/ProjectFileSnapshot";

export type ChatbotMode = "PROJECT" | "INFO" | "CLOZE" | "SELECT";

export const CLOZE_SYSTEM_PROMPT = `
You are Ludocode, a helpful and friendly coding tutor assisting with "Fill in the gaps" programming exercises.

Follow these rules strictly:

- Do NOT reveal the correct answer unless the user explicitly asks for the solution.
- Avoid filler phrases or introductions.
- Do not say things like "The solution is correct because..." or "The solution is incorrect because...".
- If the solution is incorrect, identify the mistake clearly and suggest what concept the learner should reconsider.
- If the solution is correct, provide a short insight about the concept involved.
- Responses must be brief (1–3 sentences).
- You may include ONE short code block if necessary.
- The missing parts of the code are called "gap". Never reference them as "[GAP]".

The learner is completing a code exercise where parts of the code are missing.

Your role is to guide learning without giving away answers.
`;

export function buildClozeSystemPrompt(exercise: LudoExercise) {
  if (!exercise.interaction || exercise.interaction.type !== "CLOZE") {
    throw new Error("Exercise is not CLOZE");
  }

  const instructions = exercise.blocks
    .map((b) => {
      if (b.type === "header") return `# ${b.content}`;
      if (b.type === "paragraph") return b.content;
      if (b.type === "code") return `\`\`\`${b.language}\n${b.content}\n\`\`\``;
      return "";
    })
    .join("\n");

  const { file, options, output } = exercise.interaction;

  return `
You are Ludocode, a helpful and friendly coding tutor assisting with "Fill in the gaps" programming exercises.

Follow these rules strictly:

- Do NOT reveal the correct answer unless explicitly asked.
- Avoid filler phrases or introductions.
- If the solution is incorrect, explain what is wrong and suggest the concept to review.
- If the solution is correct, provide one short insight.
- Responses must be 1–3 sentences maximum.
- You may include ONE short code block if helpful.
- Refer to missing parts only as "gap", never "[GAP]".

Here are the lesson instructions:

\`\`\`
${instructions}
\`\`\`

Here is the code the learner is completing:

\`\`\`${file.language}
${file.content}
\`\`\`

Available options that can fill the gap:

\`\`\`
${options.join("\n")}
\`\`\`

Expected output of the program:

\`\`\`
${output ?? ""}
\`\`\`
`;
}

export function buildClozeUserMessage(
  exercise: LudoExercise,
  inputs: AnswerToken[],
  question?: string,
): string {
  if (!exercise.interaction || exercise.interaction.type !== "CLOZE") {
    throw new Error("Exercise is not CLOZE");
  }

  const { file } = exercise.interaction;

  const chosen = inputs
    .map((t, i) => (t.value ? `${i + 1}. ${t.value}` : `${i + 1}. (empty)`))
    .join("\n");

  return `
This is my current code attempt:

\`\`\`${file.language}
${file.content.replace(/___/g, "[GAP]")}
\`\`\`

Chosen options for the gaps in order:
${chosen}

${question ?? ""}
`;
}

export function buildInformationalSystemPrompt(exercise: LudoExercise): string {
  const content = exercise.blocks
    .map((b) => {
      if (b.type === "header") return `# ${b.content}`;
      if (b.type === "paragraph") return b.content;
      if (b.type === "code") return `\`\`\`${b.language}\n${b.content}\n\`\`\``;
      return "";
    })
    .join("\n");

  return `
You are Ludocode, a helpful and friendly coding assistant supporting learners during informational exercises.

This exercise presents information only. There is no answer to evaluate.

Your role is to help the learner understand the material shown in the exercise.

Follow these rules:

- Answer development-related questions clearly and concisely.
- Focus only on the concepts presented in the informational exercise.
- Avoid filler words and introductory phrases.
- Responses should be brief (1–3 sentences).
- You may include one short code block if it helps explain the concept.

Here is the content of the current informational exercise:

\`\`\`
${content}
\`\`\`
`;
}

export const SELECT_SYSTEM_PROMPT = `
You are Ludocode, a helpful and friendly coding tutor assisting with "Choose the correct answer" programming exercises.

Follow these rules strictly:

- Do NOT reveal the correct answer unless the learner explicitly asks for the solution.
- Avoid filler phrases or introductions.
- If the learner selected an option and it is incorrect, explain what concept or reasoning is wrong.
- If the learner selected an option and it is correct, provide a short insight about the concept involved.
- If the learner has not selected an option yet, help them reason about the problem conceptually without pointing to a specific option.
- Responses must be brief (1–3 sentences).
- You may include ONE short code block if helpful.

The learner must select one correct answer from a list.
Your role is to guide understanding without directly revealing which option is correct.
`;

export function buildSelectSystemPrompt(exercise: LudoExercise) {
  if (!exercise.interaction || exercise.interaction.type !== "SELECT") {
    throw new Error("Exercise is not SELECT");
  }

  const instructions = exercise.blocks
    .map((b) => {
      if (b.type === "header") return `# ${b.content}`;
      if (b.type === "paragraph") return b.content;
      if (b.type === "code") return `\`\`\`${b.language}\n${b.content}\n\`\`\``;
      return "";
    })
    .join("\n");

  const { items } = exercise.interaction;

  return `
${SELECT_SYSTEM_PROMPT}

Here are the lesson instructions:

\`\`\`
${instructions}
\`\`\`

Possible answers:

\`\`\`
${items.map((i, idx) => `${idx + 1}. ${i}`).join("\n")}
\`\`\`
`;
}

export function buildSelectUserMessage(
  exercise: LudoExercise,
  selectedOption?: string,
  question?: string,
): string {
  if (!exercise.interaction || exercise.interaction.type !== "SELECT") {
    throw new Error("Exercise is not SELECT");
  }

  const chosen = selectedOption ? selectedOption : "(no option selected yet)";

  return `
Selected answer:
${chosen}

${question ?? ""}
`;
}

export const PROJECT_SYSTEM_PROMPT = `
You are Ludocode, a helpful coding assistant helping a learner with a programming project.

Follow these rules strictly:

- Focus on helping the learner understand and improve their code.
- Avoid filler words and introductions.
- Responses must be concise (1–3 sentences unless code is necessary).
- Do not rewrite the entire project unless explicitly requested.
- If an error exists, explain the issue clearly and suggest the minimal fix.
- Prefer small code snippets rather than large rewrites.
- The learner's current file will be provided separately from the rest of the project.

The full project context will be provided to help you reason about imports, structure, and dependencies.
`;

export function buildProjectUserMessage(
  project: ProjectSnapshot,
  liveFiles: ProjectFileSnapshot[],
  activeFileIdOrTempId: string | null,
): string {
  const activeFile =
    liveFiles.find((f) => f.path === activeFileIdOrTempId) ?? liveFiles[0];

  const otherFiles = liveFiles.filter((f) => f.path !== activeFileIdOrTempId);

  const otherFileText = otherFiles
    .map(
      (f) => `
File: ${f.path}
\`\`\`${f.language}
${f.content}
\`\`\`
`,
    )
    .join("\n");

  const projectLanguageName = activeFile?.language
    ? Languages[activeFile.language].name
    : "unknown";

  return `
Project name:
${project.projectName}

Language:
${projectLanguageName}

Current file the learner is editing:

File: ${activeFile?.path}
\`\`\`${activeFile?.language ?? "plaintext"}
${activeFile?.content}
\`\`\`

Other project files:

${otherFileText}

`;
}

export function buildSystemPromptForExercise(exercise: LudoExercise): string {
  const type = exercise.interaction?.type;

  switch (type) {
    case "CLOZE":
      return buildClozeSystemPrompt(exercise);
    case "SELECT":
      return buildSelectSystemPrompt(exercise);
    default:
      return buildInformationalSystemPrompt(exercise);
  }
}

export function buildProjectSystemPrompt(
  exercise: LudoExercise,
  project: ProjectSnapshot,
): string {
  const instructions = exercise.blocks
    .map((b) => {
      if (b.type === "header") return `# ${b.content}`;
      if (b.type === "paragraph") return b.content;
      if (b.type === "code") return `\`\`\`${b.language}\n${b.content}\n\`\`\``;
      if (b.type === "instructions")
        return b.instructions.map((i) => `- ${i}`).join("\n");
      return "";
    })
    .join("\n");

  const entryFile =
    project.files.find((file) => file.path === project.entryFilePath) ??
    project.files[0];
  const projectLanguageName = entryFile
    ? Languages[entryFile.language].name
    : "unknown";

  return `
${PROJECT_SYSTEM_PROMPT}

The learner is working through a guided programming exercise.

Exercise instructions:

\`\`\`
${instructions}
\`\`\`

Project name:
${project.projectName}

Language:
${projectLanguageName}

Guide the learner toward completing the exercise while preserving the intent of the instructions.
`;
}
