import {z} from "zod"


const OptionSnap = z.object({
  content: z.string().min(1),
  answerOrder: z.number().int().positive().nullable().optional(), // present => correct, null/undefined => distractor
});

const Base = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  media: z.string().optional().nullable(),
  prompt: z.string().optional().nullable(),
  correctOptions: z.array(OptionSnap),
  distractors: z.array(OptionSnap),
});

function countGaps(s?: string | null) {
  if (!s) return 0;
  return (s.match(/___/g) ?? []).length;
}

const Cloze = Base.extend({
  exerciseType: z.literal("CLOZE"),
}).superRefine((v, ctx) => {
  const gaps = countGaps(v.prompt);
  if (!v.title) ctx.addIssue({ code: "custom", path: ["title"], message: "Title required" });
  if (!v.prompt) ctx.addIssue({ code: "custom", path: ["prompt"], message: "Prompt required" });
  if (v.correctOptions.length !== gaps) {
    ctx.addIssue({
      code: "custom",
      path: ["correctOptions"],
      message: `Must have exactly ${gaps} correct options to match the ${gaps} gap(s)`,
    });
  }
});


//PER EXERCISE OPTION
const Analyze = Base.extend({
  exerciseType: z.literal("ANALYZE"),
}).superRefine((v, ctx) => {
  if (!v.title) ctx.addIssue({ code: "custom", path: ["title"], message: "Title required" });
  if (!v.prompt) ctx.addIssue({ code: "custom", path: ["prompt"], message: "Prompt required" });
  if (v.correctOptions.length !== 1) ctx.addIssue({ code: "custom", path: ["correctOptions"], message: "Exactly one correct answer" });
  if (v.distractors.length < 1) ctx.addIssue({ code: "custom", path: ["distractors"], message: "At least one distractor" });
});

const Trivia = Base.extend({
  exerciseType: z.literal("TRIVIA"),
}).superRefine((v, ctx) => {
  if (!v.prompt) ctx.addIssue({ code: "custom", path: ["prompt"], message: "Prompt required" });
  if (v.correctOptions.length !== 1) ctx.addIssue({ code: "custom", path: ["correctOptions"], message: "Exactly one correct answer" });
  if (v.distractors.length < 1) ctx.addIssue({ code: "custom", path: ["distractors"], message: "At least one distractor" });
});

const Info = Base.extend({
  exerciseType: z.literal("INFO"),
}).superRefine((v, ctx) => {
  if (!v.title) ctx.addIssue({ code: "custom", path: ["title"], message: "Title required" });
  if (v.correctOptions.length !== 0) ctx.addIssue({ code: "custom", path: ["correctOptions"], message: "INFO must not have Correct Options" });
  if (v.distractors.length !== 0) ctx.addIssue({ code: "custom", path: ["distractors"], message: "INFO must not have distractors" });
});

export const ExerciseSnapSchema = z.discriminatedUnion("exerciseType", [
  Cloze, Analyze, Trivia, Info,
]);