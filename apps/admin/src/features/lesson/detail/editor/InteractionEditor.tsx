import { useEffect, useRef, useMemo, useCallback } from "react";
import type {
  CurriculumDraftInteraction,
  CurriculumDraftLessonForm,
  LanguageKey,
} from "@ludocode/types";
import { LudoInput } from "@ludocode/design-system/primitives/input.tsx";
import { Textarea } from "@ludocode/external/ui/textarea.tsx";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button.tsx";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ludocode/external/ui/select.tsx";
import {
  getLanguageDisplayName,
  resolveCourseLanguage,
} from "./language.ts";

type InteractionEditorProps = {
  form: any;
  exerciseIndex: number;
  lessonType: CurriculumDraftLessonForm["lessonType"];
  courseLanguage?: LanguageKey;
};

const DEFAULT_SELECT: CurriculumDraftInteraction = {
  type: "SELECT",
  items: ["", ""],
  correctValue: "",
};

const createDefaultCloze = (
  courseLanguage?: LanguageKey,
): CurriculumDraftInteraction => ({
  type: "CLOZE",
  file: { language: resolveCourseLanguage(courseLanguage), content: "" },
  blanks: [],
  options: [],
});

const createDefaultExecutable = (
  _courseLanguage?: LanguageKey,
): CurriculumDraftInteraction => {
  return {
    type: "EXECUTABLE",
    solution: "",
    tests: [
      {
        type: "OUTPUT_PATTERN_MATCHES",
        expected: "print\\(\\s*[\"']Hello World[\"']\\s*\\)",
        feedback: null,
      },
    ],
  };
};

/** Count occurrences of `___` (three underscores) in content. */
function countGaps(content: string): number {
  const matches = content.match(/___/g);
  return matches ? matches.length : 0;
}

/* ─── Main component ────────────────────────────────────────────────── */

export function InteractionEditor({
  form,
  exerciseIndex,
  lessonType,
  courseLanguage,
}: InteractionEditorProps) {
  const interactionPath = `exercises[${exerciseIndex}].interaction`;

  return (
    <form.Field name={interactionPath}>
      {(interactionField: any) => (
        <InteractionEditorInner
          form={form}
          exerciseIndex={exerciseIndex}
          interactionField={interactionField}
          lessonType={lessonType}
          courseLanguage={courseLanguage}
        />
      )}
    </form.Field>
  );
}

function InteractionEditorInner({
  form,
  exerciseIndex,
  interactionField,
  lessonType,
  courseLanguage,
}: {
  form: any;
  exerciseIndex: number;
  interactionField: any;
  lessonType: CurriculumDraftLessonForm["lessonType"];
  courseLanguage?: LanguageKey;
}) {
  const interaction: CurriculumDraftInteraction | null =
    interactionField.state.value ?? null;
  const languageSlug = resolveCourseLanguage(courseLanguage);
  const basePath = `exercises[${exerciseIndex}].interaction`;

  useEffect(() => {
    if (!interaction) return;

    if (
      interaction.type === "CLOZE" &&
      interaction.file.language !== languageSlug
    ) {
      form.setFieldValue(`${basePath}.file.language`, languageSlug);
    }
  }, [interaction, basePath, form, languageSlug]);

  // For GUIDED lessons, auto-set EXECUTABLE if missing
  const isGuided = lessonType === "GUIDED";

  if (!interaction) {
    if (isGuided) {
      return (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-ludo-white-bright">
            Interaction
          </p>
          <p className="text-xs text-orange-400 bg-orange-400/10 rounded px-2 py-1">
            Guided lessons require an EXECUTABLE interaction.
          </p>
          <ShadowLessButton
            type="button"
            onClick={() =>
              interactionField.handleChange(
                createDefaultExecutable(courseLanguage),
              )
            }
          >
            + Add Executable Interaction
          </ShadowLessButton>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-ludo-white-bright">
          Interaction
        </p>
        <Select
          value=""
          onValueChange={(type) => {
            const template =
              type === "SELECT"
                ? DEFAULT_SELECT
                : createDefaultCloze(courseLanguage);
            interactionField.handleChange(template);
          }}
        >
          <SelectTrigger className="w-auto h-auto gap-2 px-3 py-1 rounded-sm bg-ludo-surface border-transparent text-ludo-white-bright! text-sm hover:bg-ludo-surface-hover transition-colors focus:ring-0 focus-visible:ring-0">
            <SelectValue placeholder="+ Add Interaction" />
          </SelectTrigger>
          <SelectContent className="bg-ludo-surface border-ludo-border">
            <SelectItem
              value="SELECT"
              className="text-ludo-white-bright hover:bg-ludo-background cursor-pointer"
            >
              <span className="text-amber-400">Select</span> — Multiple choice
            </SelectItem>
            <SelectItem
              value="CLOZE"
              className="text-ludo-white-bright hover:bg-ludo-background cursor-pointer"
            >
              <span className="text-emerald-400">Cloze</span> — Fill in blanks
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ludo-white-bright">
          Interaction —{" "}
          <span
            className={
              interaction.type === "SELECT"
                ? "text-amber-400"
                : interaction.type === "EXECUTABLE"
                  ? "text-orange-400"
                  : "text-emerald-400"
            }
          >
            {interaction.type}
          </span>
        </p>
        {!isGuided && (
          <ShadowLessButton
            type="button"
            onClick={() => interactionField.handleChange(null)}
            className=" w-auto px-4 h-7 text-xs"
            variant="danger"
          >
            Remove
          </ShadowLessButton>
        )}
      </div>

      {interaction.type === "SELECT" && (
        <SelectInteractionFields form={form} exerciseIndex={exerciseIndex} />
      )}

      {interaction.type === "CLOZE" && (
        <ClozeInteractionFields
          form={form}
          exerciseIndex={exerciseIndex}
          courseLanguage={courseLanguage}
        />
      )}

      {interaction.type === "EXECUTABLE" && (
        <ExecutableInteractionFields
          form={form}
          exerciseIndex={exerciseIndex}
        />
      )}
    </div>
  );
}

/* ─── SELECT ────────────────────────────────────────────────────────── */

function SelectInteractionFields({
  form,
  exerciseIndex,
}: {
  form: any;
  exerciseIndex: number;
}) {
  const basePath = `exercises[${exerciseIndex}].interaction`;

  return (
    <form.Field name={`${basePath}.items`} mode="array">
      {(itemsField: any) => (
        <SelectInteractionFieldsInner
          form={form}
          exerciseIndex={exerciseIndex}
          itemsField={itemsField}
        />
      )}
    </form.Field>
  );
}

function SelectInteractionFieldsInner({
  form,
  exerciseIndex,
  itemsField,
}: {
  form: any;
  exerciseIndex: number;
  itemsField: any;
}) {
  const basePath = `exercises[${exerciseIndex}].interaction`;
  const items: string[] = itemsField.state.value ?? [];
  const correctValue: string =
    form.state.values.exercises[exerciseIndex]?.interaction?.correctValue ?? "";

  const nonEmptyItems = useMemo(
    () => items.filter((v: string) => v.trim() !== ""),
    [items],
  );
  const correctIsValid =
    correctValue !== "" && nonEmptyItems.includes(correctValue);

  // Auto-select first non-empty item when correctValue becomes invalid
  useEffect(() => {
    if (!correctIsValid && nonEmptyItems.length > 0) {
      form.setFieldValue(`${basePath}.correctValue`, nonEmptyItems[0]);
    }
    // eslint-disable-next-line react-queries/exhaustive-deps
  }, [correctIsValid, nonEmptyItems.join("\0")]);

  const handleRemoveItem = useCallback(
    (itemIndex: number) => {
      const removed = items[itemIndex];
      itemsField.removeValue(itemIndex);
      if (removed === correctValue) {
        const remaining = items.filter(
          (_: string, i: number) => i !== itemIndex,
        );
        const nextBest = remaining.find((v: string) => v.trim() !== "");
        form.setFieldValue(`${basePath}.correctValue`, nextBest ?? "");
      }
    },
    // eslint-disable-next-line react-queries/exhaustive-deps
    [items, correctValue],
  );

  return (
    <div className="flex flex-col gap-3 bg-ludo-surface rounded-lg p-3">
      {items.length < 2 && (
        <p className="text-xs text-red-400 bg-red-400/10 rounded px-2 py-1">
          Needs at least 2 options.
        </p>
      )}

      {/* Correct value selector */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-emerald-400">Correct answer</p>
        <Select
          value={correctIsValid ? correctValue : ""}
          onValueChange={(v) =>
            form.setFieldValue(`${basePath}.correctValue`, v)
          }
        >
          <SelectTrigger className="w-full h-auto gap-2 px-3 py-2 rounded-sm bg-ludo-background border-transparent text-ludo-white-bright! text-sm focus:ring-0 focus-visible:ring-0">
            <SelectValue placeholder="Select correct answer" />
          </SelectTrigger>
          <SelectContent className="bg-ludo-surface border-ludo-border">
            {nonEmptyItems.map((item: string, idx: number) => (
              <SelectItem
                key={`${idx}-${item}`}
                value={item}
                className="text-ludo-white-bright hover:bg-ludo-background cursor-pointer"
              >
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Items list */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ludo-white">Options ({items.length})</p>
          <ShadowLessButton
            type="button"
            onClick={() => itemsField.pushValue("")}
          >
            + Add
          </ShadowLessButton>
        </div>
        {items.map((_: string, itemIndex: number) => (
          <div key={itemIndex} className="flex items-center gap-2">
            <div
              className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${
                items[itemIndex] === correctValue && correctIsValid
                  ? "bg-emerald-500/20"
                  : "bg-amber-500/20"
              }`}
            >
              <span
                className={`text-[10px] ${
                  items[itemIndex] === correctValue && correctIsValid
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {itemIndex + 1}
              </span>
            </div>
            <form.Field
              name={`${basePath}.items[${itemIndex}]`}
              children={(field: {
                state: { value: unknown };
                handleChange: (v: string) => void;
              }) => (
                <LudoInput
                  value={String(field.state.value ?? "")}
                  setValue={(v: string) => field.handleChange(v)}
                  placeholder={`Option ${itemIndex + 1}`}
                />
              )}
            />
            {!(items[itemIndex] === correctValue && correctIsValid) && (
              <button
                type="button"
                onClick={() => handleRemoveItem(itemIndex)}
                className="shrink-0 p-1 rounded hover:bg-ludo-background text-ludo-white hover:text-red-400 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CLOZE ─────────────────────────────────────────────────────────── */

function ClozeInteractionFields({
  form,
  exerciseIndex,
  courseLanguage,
}: {
  form: any;
  exerciseIndex: number;
  courseLanguage?: LanguageKey;
}) {
  const basePath = `exercises[${exerciseIndex}].interaction`;

  return (
    <form.Field name={`${basePath}.options`} mode="array">
      {(optionsField: any) => (
        <form.Field name={`${basePath}.blanks`} mode="array">
          {(blanksField: any) => (
            <ClozeInteractionFieldsInner
              form={form}
              exerciseIndex={exerciseIndex}
              optionsField={optionsField}
              blanksField={blanksField}
              courseLanguage={courseLanguage}
            />
          )}
        </form.Field>
      )}
    </form.Field>
  );
}

function ClozeInteractionFieldsInner({
  form,
  exerciseIndex,
  optionsField,
  blanksField,
  courseLanguage,
}: {
  form: any;
  exerciseIndex: number;
  optionsField: any;
  blanksField: any;
  courseLanguage?: LanguageKey;
}) {
  const basePath = `exercises[${exerciseIndex}].interaction`;
  const languageLabel = getLanguageDisplayName(courseLanguage);
  const interaction = form.state.values.exercises[exerciseIndex]?.interaction;
  if (!interaction || interaction.type !== "CLOZE") return null;

  const fileContent: string = interaction.file?.content ?? "";
  const gapCount = countGaps(fileContent);

  const blanks: { index: number; correctOptions: string[] }[] =
    blanksField.state.value ?? [];
  const options: string[] = optionsField.state.value ?? [];

  // Auto-sync blank count when ___ markers change
  const prevGapCount = useRef(gapCount);
  useEffect(() => {
    if (gapCount === prevGapCount.current) return;
    prevGapCount.current = gapCount;

    // Resize blanks array to match gap count, preserving existing answers
    const nextBlanks = Array.from({ length: gapCount }, (_, i) => ({
      index: i,
      correctOptions: blanks[i]?.correctOptions ?? [""],
    }));
    blanksField.handleChange(nextBlanks);

    // Rebuild options: correct answers from blanks + existing distractors
    const correctAnswers = nextBlanks.map((b) => b.correctOptions[0]);
    const existingDistractors = options.slice(prevGapCount.current);
    optionsField.handleChange([...correctAnswers, ...existingDistractors]);
    // eslint-disable-next-line react-queries/exhaustive-deps
  }, [gapCount]);

  // Sync options whenever a blank's correct answer changes
  const blanksKey = blanks.map((b) => b.correctOptions[0] ?? "").join("\0");
  const prevBlanksKey = useRef(blanksKey);
  useEffect(() => {
    if (blanksKey === prevBlanksKey.current) return;
    prevBlanksKey.current = blanksKey;

    const correctAnswers = blanks.map((b) => b.correctOptions[0] ?? "");
    const existingDistractors = options.slice(blanks.length);
    optionsField.handleChange([...correctAnswers, ...existingDistractors]);
    // eslint-disable-next-line react-queries/exhaustive-deps
  }, [blanksKey]);

  // Distractors are everything after the first `gapCount` entries in options
  const distractors = useMemo(
    () => options.slice(gapCount),
    [options, gapCount],
  );

  const handleAddDistractor = useCallback(() => {
    optionsField.handleChange([...options, ""]);
    // eslint-disable-next-line react-queries/exhaustive-deps
  }, [options]);

  const handleRemoveDistractor = useCallback(
    (dIdx: number) => {
      const optIdx = gapCount + dIdx;
      optionsField.handleChange(
        options.filter((_: string, i: number) => i !== optIdx),
      );
    },
    // eslint-disable-next-line react-queries/exhaustive-deps
    [options, gapCount],
  );

  const handleDistractorChange = useCallback(
    (dIdx: number, value: string) => {
      const optIdx = gapCount + dIdx;
      form.setFieldValue(`${basePath}.options[${optIdx}]`, value);
    },
    // eslint-disable-next-line react-queries/exhaustive-deps
    [gapCount],
  );

  return (
    <div className="flex flex-col gap-3 bg-ludo-surface rounded-lg p-3">
      {/* File */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-emerald-400">File</p>
        <p className="text-xs text-ludo-white/60">Language: {languageLabel}</p>
        <form.Field
          name={`${basePath}.file.content`}
          children={(field: {
            state: { value: unknown };
            handleChange: (v: string) => void;
          }) => (
            <Textarea
              value={String(field.state.value ?? "")}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder={`Use ___ for gaps\ne.g. print(___)`}
              className="bg-ludo-background border-transparent text-ludo-white-bright placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-24 resize-none font-mono text-sm"
            />
          )}
        />
        <p className="text-xs text-ludo-white/60">
          <span className="text-emerald-400 font-medium">{gapCount}</span> gap
          {gapCount !== 1 ? "s" : ""} detected
        </p>
        <form.Field
          name={`${basePath}.output`}
          children={(field: {
            state: { value: unknown };
            handleChange: (v: string | undefined) => void;
          }) => (
            <LudoInput
              value={String(field.state.value ?? "")}
              setValue={(v: string) => field.handleChange(v || undefined)}
              placeholder="Expected output (optional)"
            />
          )}
        />
      </div>

      {/* Blanks — one per gap, user types the correct answer */}
      {gapCount > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-xs text-emerald-400">
            Correct answers ({gapCount})
          </p>
          {blanks.map((_blank, blankIndex: number) => (
            <div key={blankIndex} className="flex items-center gap-2">
              <div className="w-5 h-5 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-[10px] text-emerald-400">
                  {blankIndex + 1}
                </span>
              </div>
              <form.Field
                name={`${basePath}.blanks[${blankIndex}].correctOptions[0]`}
                children={(field: {
                  state: { value: unknown };
                  handleChange: (v: string) => void;
                }) => (
                  <LudoInput
                    value={String(field.state.value ?? "")}
                    setValue={(v: string) => field.handleChange(v)}
                    placeholder={`Answer for gap ${blankIndex + 1}`}
                  />
                )}
              />
            </div>
          ))}
        </div>
      )}

      {/* Distractors */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ludo-white">
            Distractors ({distractors.length})
          </p>
          <ShadowLessButton type="button" onClick={handleAddDistractor}>
            + Add
          </ShadowLessButton>
        </div>
        {distractors.map((distractor: string, dIdx: number) => (
          <div key={dIdx} className="flex items-center gap-2">
            <div className="w-5 h-5 shrink-0 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-[10px] text-red-400">{dIdx + 1}</span>
            </div>
            <LudoInput
              value={distractor}
              setValue={(v: string) => handleDistractorChange(dIdx, v)}
              placeholder={`Distractor ${dIdx + 1}`}
            />
            <button
              type="button"
              onClick={() => handleRemoveDistractor(dIdx)}
              className="shrink-0 p-1 rounded hover:bg-ludo-background text-ludo-white hover:text-red-400 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── EXECUTABLE ────────────────────────────────────────────────────── */

function ExecutableInteractionFields({
  form,
  exerciseIndex,
}: {
  form: any;
  exerciseIndex: number;
}) {
  const basePath = `exercises[${exerciseIndex}].interaction`;

  return (
    <form.Field name={`${basePath}.tests`} mode="array">
      {(testsField: any) => (
        <ExecutableInteractionFieldsInner
          form={form}
          exerciseIndex={exerciseIndex}
          testsField={testsField}
        />
      )}
    </form.Field>
  );
}

function ExecutableInteractionFieldsInner({
  form,
  exerciseIndex,
  testsField,
}: {
  form: any;
  exerciseIndex: number;
  testsField: any;
}) {
  const basePath = `exercises[${exerciseIndex}].interaction`;
  const interaction = form.state.values.exercises[exerciseIndex]?.interaction;
  if (!interaction || interaction.type !== "EXECUTABLE") return null;

  const tests: { type: string; expected: string; feedback?: string | null }[] =
    testsField.state.value ?? [];

  return (
    <div className="flex flex-col gap-4 bg-ludo-surface rounded-lg p-3">
      <p className="text-xs text-ludo-white/60">
        Starter files are configured in the lesson project snapshot.
      </p>

      {/* Solution */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-orange-400 font-medium">Solution</p>
        <form.Field
          name={`${basePath}.solution`}
          children={(field: any) => (
            <Textarea
              value={String(field.state.value ?? "")}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Reference solution code used for this exercise"
              className="bg-ludo-background border-transparent text-ludo-white-bright placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-24 resize-y font-mono text-sm"
            />
          )}
        />
      </div>

      {/* Tests */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-orange-400 font-medium">
            Tests ({tests.length})
          </p>
          <ShadowLessButton
            type="button"
            onClick={() =>
              testsField.pushValue({
                type: "FILE_PATTERN_MATCHES",
                expected: "print\\(\\s*[\"']Hello World[\"']\\s*\\)",
                feedback: null,
              })
            }
          >
            + Add Test
          </ShadowLessButton>
        </div>

        {tests.map((_test: any, testIndex: number) => (
          <div
            key={testIndex}
            className="flex flex-col gap-2 bg-ludo-background rounded-lg p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-orange-400">
                Test {testIndex + 1}
              </span>
              {tests.length > 1 && (
                <button
                  type="button"
                  onClick={() => testsField.removeValue(testIndex)}
                  className="shrink-0 p-1 rounded hover:bg-ludo-surface text-ludo-white hover:text-red-400 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <form.Field
              name={`${basePath}.tests[${testIndex}].type`}
              children={(field: any) => (
                <Select
                  value={String(field.state.value ?? "OUTPUT_EQUALS")}
                  onValueChange={(v) => field.handleChange(v)}
                >
                  <SelectTrigger className="w-full h-auto gap-2 px-3 py-2 rounded-sm bg-ludo-surface border-transparent text-ludo-white-bright! text-sm focus:ring-0 focus-visible:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-ludo-surface border-ludo-border">
                    <SelectItem
                      value="OUTPUT_PATTERN_MATCHES"
                      className="text-ludo-white-bright hover:bg-ludo-background cursor-pointer"
                    >
                      Output Matches
                    </SelectItem>
                    <SelectItem
                      value="OUTPUT_CONTAINS"
                      className="text-ludo-white-bright hover:bg-ludo-background cursor-pointer"
                    >
                      Output Contains
                    </SelectItem>
                    <SelectItem
                      value="FILE_CONTAINS"
                      className="text-ludo-white-bright hover:bg-ludo-background cursor-pointer"
                    >
                      File Contains
                    </SelectItem>
                    <SelectItem
                      value="FILE_PATTERN_MATCHES"
                      className="text-ludo-white-bright hover:bg-ludo-background cursor-pointer"
                    >
                      File Matches
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <form.Field
              name={`${basePath}.tests[${testIndex}].expected`}
              children={(field: any) => (
                <Textarea
                  value={String(field.state.value ?? "")}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Expected value..."
                  className="bg-ludo-surface border-transparent text-ludo-white-bright placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-16 resize-none font-mono text-sm"
                />
              )}
            />

            <form.Field
              name={`${basePath}.tests[${testIndex}].feedback`}
              children={(field: any) => (
                <Textarea
                  value={String(field.state.value ?? "")}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value.trim().length > 0 ? e.target.value : null,
                    )
                  }
                  placeholder="Feedback shown when this test fails (optional)"
                  className="bg-ludo-surface border-transparent text-ludo-white-bright placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-16 resize-none text-sm"
                />
              )}
            />
          </div>
        ))}
      </div>

      {/* Show Output toggle */}
      <div className="flex items-center gap-2">
        <form.Field
          name={`${basePath}.showOutput`}
          children={(field: any) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="rounded border-ludo-border bg-ludo-background"
              />
              <span className="text-xs text-ludo-white">
                Show output to user
              </span>
            </label>
          )}
        />
      </div>
    </div>
  );
}
