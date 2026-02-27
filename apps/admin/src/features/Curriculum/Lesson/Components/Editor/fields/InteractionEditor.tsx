import { useEffect, useRef } from "react";
import type { CurriculumDraftInteraction } from "@ludocode/types";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import { Textarea } from "@ludocode/external/ui/textarea";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ludocode/external/ui/select";

type InteractionEditorProps = {
  form: any;
  exerciseIndex: number;
};

const DEFAULT_SELECT: CurriculumDraftInteraction = {
  type: "SELECT",
  items: ["", ""],
  correctValue: "",
};

const DEFAULT_CLOZE: CurriculumDraftInteraction = {
  type: "CLOZE",
  file: { language: "python", content: "" },
  blanks: [],
  options: [""],
};

/* ─── Main component ────────────────────────────────────────────────── */

export function InteractionEditor({
  form,
  exerciseIndex,
}: InteractionEditorProps) {
  const interactionPath = `exercises[${exerciseIndex}].interaction`;

  return (
    <form.Field name={interactionPath}>
      {(interactionField: any) => (
        <InteractionEditorInner
          form={form}
          exerciseIndex={exerciseIndex}
          interactionField={interactionField}
        />
      )}
    </form.Field>
  );
}

function InteractionEditorInner({
  form,
  exerciseIndex,
  interactionField,
}: {
  form: any;
  exerciseIndex: number;
  interactionField: any;
}) {
  const interaction: CurriculumDraftInteraction | null =
    interactionField.state.value ?? null;

  if (!interaction) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Interaction</p>
        </div>
        <p className="text-xs text-ludoAltText/60">
          No interaction — this is an informational exercise.
        </p>
        <Select
          value=""
          onValueChange={(type) => {
            const template = type === "SELECT" ? DEFAULT_SELECT : DEFAULT_CLOZE;
            interactionField.handleChange(template);
          }}
        >
          <SelectTrigger className="w-auto h-auto gap-2 px-3 py-1 rounded-sm bg-ludo-surface border-transparent text-white! text-sm hover:bg-ludo-accent/20 transition-colors focus:ring-0 focus-visible:ring-0">
            <SelectValue placeholder="+ Add Interaction" />
          </SelectTrigger>
          <SelectContent className="bg-ludo-surface border-ludo-border">
            <SelectItem
              value="SELECT"
              className="text-white hover:bg-ludo-background cursor-pointer"
            >
              <span className="text-amber-400">Select</span> — Multiple choice
            </SelectItem>
            <SelectItem
              value="CLOZE"
              className="text-white hover:bg-ludo-background cursor-pointer"
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
        <p className="text-sm font-semibold text-white">
          Interaction —{" "}
          <span
            className={
              interaction.type === "SELECT"
                ? "text-amber-400"
                : "text-emerald-400"
            }
          >
            {interaction.type}
          </span>
        </p>
        <ShadowLessButton
          type="button"
          onClick={() => interactionField.handleChange(null)}
          className="text-red-400 text-xs"
        >
          Remove
        </ShadowLessButton>
      </div>

      {interaction.type === "SELECT" && (
        <SelectInteractionFields form={form} exerciseIndex={exerciseIndex} />
      )}

      {interaction.type === "CLOZE" && (
        <ClozeInteractionFields form={form} exerciseIndex={exerciseIndex} />
      )}
    </div>
  );
}

/* ─── SELECT interaction fields ─────────────────────────────────────── */

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

  const nonEmptyItems = items.filter((v: string) => v.trim() !== "");
  const correctIsValid =
    correctValue !== "" && nonEmptyItems.includes(correctValue);

  // Enforce: auto-select first non-empty item when correctValue becomes invalid
  const prevCorrectValid = useRef(correctIsValid);
  useEffect(() => {
    // Only auto-select when validity transitions from true→false (item was removed)
    // or when items first become available
    if (!correctIsValid && nonEmptyItems.length > 0) {
      form.setFieldValue(`${basePath}.correctValue`, nonEmptyItems[0]);
    }
    prevCorrectValid.current = correctIsValid;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correctIsValid, nonEmptyItems.length]);

  return (
    <div className="flex flex-col gap-4 bg-ludo-surface rounded-lg p-3">
      {/* Correct Value — pick from items */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-emerald-400">
          Correct Value{" "}
          {!correctIsValid && nonEmptyItems.length > 0 && (
            <span className="text-red-400 ml-1">
              — must have exactly 1 correct answer
            </span>
          )}
        </p>
        <Select
          value={correctIsValid ? correctValue : ""}
          onValueChange={(v) =>
            form.setFieldValue(`${basePath}.correctValue`, v)
          }
        >
          <SelectTrigger className="w-full h-auto gap-2 px-3 py-2 rounded-sm bg-ludo-background border-transparent text-white! text-sm focus:ring-0 focus-visible:ring-0">
            <SelectValue placeholder="Pick the correct answer" />
          </SelectTrigger>
          <SelectContent className="bg-ludo-surface border-ludo-border">
            {nonEmptyItems.map((item: string, idx: number) => (
              <SelectItem
                key={`${idx}-${item}`}
                value={item}
                className="text-white hover:bg-ludo-background cursor-pointer"
              >
                {item}
              </SelectItem>
            ))}
            {nonEmptyItems.length === 0 && (
              <div className="px-3 py-2 text-xs text-ludoAltText/60">
                Fill in the items first
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ludoAltText">Items ({items.length})</p>
          <ShadowLessButton
            type="button"
            onClick={() => itemsField.pushValue("")}
          >
            + Add
          </ShadowLessButton>
        </div>
        {items.map((_: string, itemIndex: number) => (
          <div key={itemIndex} className="flex items-center gap-2">
            <div className="w-6 h-6 shrink-0 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span className="text-xs text-amber-400">{itemIndex + 1}</span>
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
            {items.length > 2 && (
              <button
                type="button"
                onClick={() => {
                  const removed = items[itemIndex];
                  itemsField.removeValue(itemIndex);
                  // Auto-select next best option if the removed item was correct
                  if (removed === correctValue) {
                    const remaining = items.filter(
                      (_: string, i: number) => i !== itemIndex,
                    );
                    const nextBest = remaining.find(
                      (v: string) => v.trim() !== "",
                    );
                    form.setFieldValue(
                      `${basePath}.correctValue`,
                      nextBest ?? "",
                    );
                  }
                }}
                className="shrink-0 p-1.5 rounded-md hover:bg-ludo-background text-ludoAltText hover:text-red-400 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CLOZE interaction fields ──────────────────────────────────────── */

/** Extract the text content of each `___gap___` marker. */
function extractGaps(content: string): string[] {
  const results: string[] = [];
  const re = /___(.+?)___/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    results.push(match[1]);
  }
  return results;
}

function ClozeInteractionFields({
  form,
  exerciseIndex,
}: {
  form: any;
  exerciseIndex: number;
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
}: {
  form: any;
  exerciseIndex: number;
  optionsField: any;
  blanksField: any;
}) {
  const basePath = `exercises[${exerciseIndex}].interaction`;
  const interaction = form.state.values.exercises[exerciseIndex]?.interaction;
  if (!interaction || interaction.type !== "CLOZE") return null;

  const fileContent: string = interaction.file?.content ?? "";
  const gaps = extractGaps(fileContent);
  const gapCount = gaps.length;
  const gapsKey = gaps.join("\0");

  const blanks: { index: number; correctOptions: string[] }[] =
    blanksField.state.value ?? [];
  const options: string[] = optionsField.state.value ?? [];

  // Auto-sync blanks & options when gap content changes
  const prevGapsKeyRef = useRef(gapsKey);
  useEffect(() => {
    if (gapsKey === prevGapsKeyRef.current) return;
    prevGapsKeyRef.current = gapsKey;

    if (gaps.length === 0) {
      blanksField.handleChange([]);
      return;
    }

    // Build blanks from gap texts, preserving extra correct options the user may have added
    const nextBlanks = gaps.map((text: string, i: number) => {
      const existing = blanks[i];
      const extraOptions = existing?.correctOptions?.slice(1) ?? [];
      return {
        index: i,
        correctOptions: [text || "", ...extraOptions],
      };
    });
    blanksField.handleChange(nextBlanks);

    // Auto-populate options with the correct answers (preserve manual distractors)
    const correctTexts = gaps.filter((t: string) => t.trim() !== "");
    const existingDistractors = options.filter(
      (o: string) => o.trim() !== "" && !correctTexts.includes(o),
    );
    const merged = [...correctTexts, ...existingDistractors];
    optionsField.handleChange(merged.length > 0 ? merged : [""]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapsKey]);

  return (
    <div className="flex flex-col gap-4 bg-ludo-surface rounded-lg p-3">
      {/* File */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-emerald-400">File</p>
        <form.Field
          name={`${basePath}.file.language`}
          children={(field: {
            state: { value: unknown };
            handleChange: (v: string) => void;
          }) => (
            <LudoInput
              value={String(field.state.value ?? "")}
              setValue={(v: string) => field.handleChange(v)}
              placeholder="Language (e.g. python)"
            />
          )}
        />
        <form.Field
          name={`${basePath}.file.content`}
          children={(field: {
            state: { value: unknown };
            handleChange: (v: string) => void;
          }) => (
            <Textarea
              value={String(field.state.value ?? "")}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Code with ___blanks___ for gaps..."
              className="bg-ludo-background border-transparent text-white placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-24 resize-none font-mono text-sm"
            />
          )}
        />
        <p className="text-xs text-ludoAltText/60">
          Detected{" "}
          <span className="text-emerald-400 font-medium">{gapCount}</span> gap
          {gapCount !== 1 ? "s" : ""} (wrap blanks in triple underscores:{" "}
          <code className="text-emerald-400/80">___answer___</code>)
        </p>
      </div>

      {/* Options (distractors + correct answers pool) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-ludoAltText">Options ({options.length})</p>
          <ShadowLessButton
            type="button"
            onClick={() => optionsField.pushValue("")}
          >
            + Add
          </ShadowLessButton>
        </div>
        {options.map((_: string, optIndex: number) => (
          <div key={optIndex} className="flex items-center gap-2">
            <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-xs text-emerald-400">{optIndex + 1}</span>
            </div>
            <form.Field
              name={`${basePath}.options[${optIndex}]`}
              children={(field: {
                state: { value: unknown };
                handleChange: (v: string) => void;
              }) => (
                <LudoInput
                  value={String(field.state.value ?? "")}
                  setValue={(v: string) => field.handleChange(v)}
                  placeholder={`Option ${optIndex + 1}`}
                />
              )}
            />
            {options.length > 1 && (
              <button
                type="button"
                onClick={() => optionsField.removeValue(optIndex)}
                className="shrink-0 p-1.5 rounded-md hover:bg-ludo-background text-ludoAltText hover:text-red-400 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Blanks (auto-generated from gap content) */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-ludoAltText">
          Blanks ({blanks.length}){" "}
          <span className="text-ludoAltText/40">
            — auto-synced to gap content
          </span>
        </p>
        {blanks.length === 0 && (
          <p className="text-xs text-ludoAltText/40">
            Add <code className="text-emerald-400/60">___gaps___</code> in the
            file content above to generate blanks.
          </p>
        )}
        {blanks.map(
          (
            blank: { index: number; correctOptions: string[] },
            blankIndex: number,
          ) => (
            <div
              key={blankIndex}
              className="flex flex-col gap-1 bg-ludo-background rounded-md p-2"
            >
              <span className="text-xs text-emerald-400">
                Blank {blankIndex + 1}
              </span>
              {blank.correctOptions.map((_: string, coIdx: number) => (
                <div key={coIdx} className="flex items-center gap-2">
                  <form.Field
                    name={`${basePath}.blanks[${blankIndex}].correctOptions[${coIdx}]`}
                    children={(field: {
                      state: { value: unknown };
                      handleChange: (v: string) => void;
                    }) => (
                      <LudoInput
                        value={String(field.state.value ?? "")}
                        setValue={(v: string) => field.handleChange(v)}
                        placeholder={`Correct option ${coIdx + 1}`}
                      />
                    )}
                  />
                  {blank.correctOptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const nextOptions = blank.correctOptions.filter(
                          (_: string, i: number) => i !== coIdx,
                        );
                        blanksField.replaceValue(blankIndex, {
                          ...blank,
                          correctOptions: nextOptions,
                        });
                      }}
                      className="shrink-0 p-1 rounded hover:bg-ludo-surface text-ludoAltText hover:text-red-400 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <ShadowLessButton
                type="button"
                onClick={() =>
                  blanksField.replaceValue(blankIndex, {
                    ...blank,
                    correctOptions: [...blank.correctOptions, ""],
                  })
                }
                className="text-xs"
              >
                + Add correct option
              </ShadowLessButton>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
