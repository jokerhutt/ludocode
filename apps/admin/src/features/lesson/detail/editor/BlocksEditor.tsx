import { useEffect } from "react";
import type {
  CurriculumDraftBlock,
  CurriculumDraftLessonForm,
  LanguageKey,
} from "@ludocode/types";
import { LudoInput } from "@ludocode/design-system/primitives/input.tsx";
import { Textarea } from "@ludocode/external/ui/textarea.tsx";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { withForm } from "@/features/curriculum/types.ts";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button.tsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ludocode/external/ui/select.tsx";
import { createBlockTemplate } from "./templates.ts";
import { getCourseLanguageSlug } from "./language.ts";

type BlockType = CurriculumDraftBlock["type"];
const BLOCK_TYPES: { value: BlockType; label: string }[] = [
  { value: "header", label: "Header" },
  { value: "paragraph", label: "Paragraph" },
  { value: "code", label: "Code" },
  { value: "media", label: "Media" },
  { value: "instructions", label: "Instructions" },
];

const blockTypeLabel: Record<BlockType, string> = {
  header: "Header",
  paragraph: "Paragraph",
  code: "Code",
  media: "Media",
  instructions: "Instructions",
};

const blockTypeColor: Record<BlockType, string> = {
  header: "text-blue-400",
  paragraph: "text-ludo-white",
  code: "text-ludo-success",
  media: "text-purple-400",
  instructions: "text-orange-400",
};

export const BlocksEditor = withForm({
  defaultValues: {
    lessonType: "NORMAL" as CurriculumDraftLessonForm["lessonType"],
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    exerciseIndex: 0,
    courseLanguage: undefined as LanguageKey | undefined,
  },
  render: function Render({ form, exerciseIndex, courseLanguage }) {
    const blocksPath = `exercises[${exerciseIndex}].blocks` as const;
    const lessonType = form.state.values.lessonType;
    const isGuided = lessonType === "GUIDED";
    const exerciseBlocks =
      form.state.values.exercises[exerciseIndex]?.blocks ?? [];

    useEffect(() => {
      if (!isGuided) return;

      const firstInstructionsBlock = exerciseBlocks.find(
        (block: CurriculumDraftBlock) => block.type === "instructions",
      );

      const normalizedInstructions = {
        clientId: firstInstructionsBlock?.clientId ?? crypto.randomUUID(),
        type: "instructions" as const,
        instructions:
          firstInstructionsBlock &&
          firstInstructionsBlock.instructions.length > 0
            ? firstInstructionsBlock.instructions
            : [""],
      };

      const shouldNormalize =
        exerciseBlocks.length !== 1 ||
        exerciseBlocks[0]?.type !== "instructions" ||
        exerciseBlocks[0].instructions.length < 1;

      if (shouldNormalize) {
        form.setFieldValue(blocksPath, [normalizedInstructions]);
      }
    }, [blocksPath, exerciseBlocks, form, isGuided]);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ludo-white-bright">Blocks</p>
        </div>

        <form.Field name={blocksPath} mode="array">
          {(blocksField: any) => (
            <>
              <form.Subscribe
                selector={(state: any) =>
                  state.values.exercises[exerciseIndex]?.blocks ?? []
                }
              >
                {(blocks: any) => (
                  <div className="flex flex-col gap-3">
                    {blocks.map(
                      (block: CurriculumDraftBlock, blockIndex: number) => (
                        <div
                          key={block.clientId}
                          className="flex flex-col gap-2 bg-ludo-surface rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-medium ${blockTypeColor[block.type]}`}
                            >
                              {blockTypeLabel[block.type]}
                            </span>

                            <div className="flex items-center gap-1">
                              {!isGuided && blockIndex > 0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    blocksField.swapValues(
                                      blockIndex,
                                      blockIndex - 1,
                                    )
                                  }
                                >
                                  <ChevronUp className="h-3.5 w-3.5" />
                                </button>
                              )}

                              {!isGuided && blockIndex < blocks.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    blocksField.swapValues(
                                      blockIndex,
                                      blockIndex + 1,
                                    )
                                  }
                                >
                                  <ChevronDown className="h-3.5 w-3.5" />
                                </button>
                              )}

                              {!isGuided && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    blocksField.removeValue(blockIndex)
                                  }
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          <EditorBlock
                            form={form}
                            exerciseIndex={exerciseIndex}
                            blockIndex={blockIndex}
                            courseLanguage={courseLanguage}
                          />
                        </div>
                      ),
                    )}
                  </div>
                )}
              </form.Subscribe>
              {!isGuided && (
                <Select
                  value=""
                  onValueChange={(type: BlockType) =>
                    blocksField.pushValue(
                      createBlockTemplate(type, courseLanguage),
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="+ Add Block" />
                  </SelectTrigger>
                  <SelectContent className="bg-ludo-surface">
                    {BLOCK_TYPES.map((bt) => (
                      <SelectItem
                        className={`${blockTypeColor[bt.value]}`}
                        key={bt.value}
                        value={bt.value}
                      >
                        {bt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </>
          )}
        </form.Field>
      </div>
    );
  },
});

const EditorBlock = withForm({
  defaultValues: {
    lessonType: "NORMAL" as CurriculumDraftLessonForm["lessonType"],
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    exerciseIndex: 0,
    blockIndex: 0,
    courseLanguage: undefined as LanguageKey | undefined,
  },
  render: function Render({ form, exerciseIndex, blockIndex, courseLanguage }) {
    const blockType =
      form.state.values.exercises[exerciseIndex].blocks[blockIndex]?.type;

    if (!blockType) return null;

    switch (blockType) {
      case "header":
        return (
          <form.Field
            name={`exercises[${exerciseIndex}].blocks[${blockIndex}].content`}
            children={(field: any) => (
              <LudoInput
                value={String(field.state.value ?? "")}
                setValue={(v: string) => field.handleChange(v)}
                placeholder="Header text"
              />
            )}
          />
        );

      case "paragraph":
        return (
          <form.Field
            name={`exercises[${exerciseIndex}].blocks[${blockIndex}].content`}
            children={(field: any) => (
              <Textarea
                value={String(field.state.value ?? "")}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Paragraph text..."
                className="bg-ludo-background border-transparent text-ludo-white-bright placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-16 resize-none"
              />
            )}
          />
        );

      case "code":
        return (
          <CodeBlockEditor
            form={form}
            exerciseIndex={exerciseIndex}
            blockIndex={blockIndex}
            courseLanguage={courseLanguage}
          />
        );

      case "media":
        return (
          <div className="flex flex-col gap-2">
            <form.Field
              name={`exercises[${exerciseIndex}].blocks[${blockIndex}].src`}
              children={(field: any) => (
                <LudoInput
                  value={String(field.state.value ?? "")}
                  setValue={(v: string) => field.handleChange(v)}
                  placeholder="Media URL (https://...)"
                />
              )}
            />
            <form.Field
              name={`exercises[${exerciseIndex}].blocks[${blockIndex}].alt`}
              children={(field: any) => (
                <LudoInput
                  value={String(field.state.value ?? "")}
                  setValue={(v: string) => field.handleChange(v)}
                  placeholder="Alt text (optional)"
                />
              )}
            />
          </div>
        );

      case "instructions":
        return (
          <InstructionsBlockEditor
            form={form}
            exerciseIndex={exerciseIndex}
            blockIndex={blockIndex}
          />
        );
    }
  },
});

/* ─── Instructions block editor ─────────────────────────────────────── */

function InstructionsBlockEditor({
  form,
  exerciseIndex,
  blockIndex,
}: {
  form: any;
  exerciseIndex: number;
  blockIndex: number;
}) {
  const basePath = `exercises[${exerciseIndex}].blocks[${blockIndex}].instructions`;

  return (
    <form.Field name={basePath} mode="array">
      {(instructionsField: any) => {
        const items: string[] = instructionsField.state.value ?? [];

        return (
          <div className="flex flex-col gap-2">
            {items.map((_: string, stepIndex: number) => (
              <div key={stepIndex} className="flex items-center gap-2">
                <div className="w-5 h-5 shrink-0 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <span className="text-[10px] text-orange-400">
                    {stepIndex + 1}
                  </span>
                </div>
                <form.Field
                  name={`${basePath}[${stepIndex}]`}
                  children={(field: {
                    state: { value: unknown };
                    handleChange: (v: string) => void;
                  }) => (
                    <LudoInput
                      value={String(field.state.value ?? "")}
                      setValue={(v: string) => field.handleChange(v)}
                      placeholder={`Step ${stepIndex + 1}`}
                    />
                  )}
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => instructionsField.removeValue(stepIndex)}
                    className="shrink-0 p-1 rounded hover:bg-ludo-background text-ludo-white hover:text-red-400 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
            <ShadowLessButton
              type="button"
              onClick={() => instructionsField.pushValue("")}
            >
              + Add Step
            </ShadowLessButton>
          </div>
        );
      }}
    </form.Field>
  );
}

function CodeBlockEditor({
  form,
  exerciseIndex,
  blockIndex,
  courseLanguage,
}: {
  form: any;
  exerciseIndex: number;
  blockIndex: number;
  courseLanguage?: LanguageKey;
}) {
  const languageSlug = getCourseLanguageSlug(courseLanguage);
  const languagePath = `exercises[${exerciseIndex}].blocks[${blockIndex}].language`;

  useEffect(() => {
    const currentLanguage =
      form.state.values.exercises[exerciseIndex]?.blocks[blockIndex]?.language;
    if (currentLanguage !== languageSlug) {
      form.setFieldValue(languagePath, languageSlug);
    }
  }, [form, exerciseIndex, blockIndex, languagePath, languageSlug]);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-ludo-success">Language: {languageSlug}</p>
      <form.Field
        name={`exercises[${exerciseIndex}].blocks[${blockIndex}].content`}
        children={(field: any) => (
          <Textarea
            value={String(field.state.value ?? "")}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Code content..."
            className="bg-ludo-background border-transparent text-ludo-white-bright placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-24 resize-none font-mono text-sm"
          />
        )}
      />
      <form.Field
        name={`exercises[${exerciseIndex}].blocks[${blockIndex}].output`}
        children={(field: any) => (
          <LudoInput
            value={String(field.state.value ?? "")}
            setValue={(v: string) => field.handleChange(v || undefined)}
            placeholder="Output (optional)"
          />
        )}
      />
    </div>
  );
}
