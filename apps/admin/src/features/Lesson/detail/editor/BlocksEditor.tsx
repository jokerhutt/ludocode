import type {
  CurriculumDraftBlock,
  CurriculumDraftLessonForm,
} from "@ludocode/types";
import { LudoInput } from "@ludocode/design-system/primitives/input.tsx";
import { Textarea } from "@ludocode/external/ui/textarea.tsx";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { withForm } from "@/features/Curriculum/types.ts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ludocode/external/ui/select.tsx";
import { createBlockTemplate } from "./templates.ts";

type BlockType = CurriculumDraftBlock["type"];
const BLOCK_TYPES: { value: BlockType; label: string }[] = [
  { value: "header", label: "Header" },
  { value: "paragraph", label: "Paragraph" },
  { value: "code", label: "Code" },
  { value: "media", label: "Media" },
];

const blockTypeLabel: Record<BlockType, string> = {
  header: "Header",
  paragraph: "Paragraph",
  code: "Code",
  media: "Media",
};

const blockTypeColor: Record<BlockType, string> = {
  header: "text-blue-400",
  paragraph: "text-ludo-white",
  code: "text-emerald-400",
  media: "text-purple-400",
};

export const BlocksEditor = withForm({
  defaultValues: {
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    exerciseIndex: 0,
  },
  render: function Render({ form, exerciseIndex }) {
    const blocksPath = `exercises[${exerciseIndex}].blocks` as const;

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Blocks</p>
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
                              {blockIndex > 0 && (
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

                              {blockIndex < blocks.length - 1 && (
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

                              <button
                                type="button"
                                onClick={() =>
                                  blocksField.removeValue(blockIndex)
                                }
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <EditorBlock
                            form={form}
                            exerciseIndex={exerciseIndex}
                            blockIndex={blockIndex}
                          />
                        </div>
                      ),
                    )}
                  </div>
                )}
              </form.Subscribe>
              <Select
                value=""
                onValueChange={(type: BlockType) =>
                  blocksField.pushValue(createBlockTemplate(type))
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
            </>
          )}
        </form.Field>
      </div>
    );
  },
});

const EditorBlock = withForm({
  defaultValues: {
    exercises: [] as CurriculumDraftLessonForm["exercises"],
  },
  props: {
    exerciseIndex: 0,
    blockIndex: 0,
  },
  render: function Render({ form, exerciseIndex, blockIndex }) {
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
                className="bg-ludo-background border-transparent text-white placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-16 resize-none"
              />
            )}
          />
        );

      case "code":
        return (
          <div className="flex flex-col gap-2">
            <form.Field
              name={`exercises[${exerciseIndex}].blocks[${blockIndex}].language`}
              children={(field: any) => (
                <LudoInput
                  value={String(field.state.value ?? "")}
                  setValue={(v: string) => field.handleChange(v)}
                  placeholder="Language (e.g. python)"
                />
              )}
            />
            <form.Field
              name={`exercises[${exerciseIndex}].blocks[${blockIndex}].content`}
              children={(field: any) => (
                <Textarea
                  value={String(field.state.value ?? "")}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Code content..."
                  className="bg-ludo-background border-transparent text-white placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-24 resize-none font-mono text-sm"
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
    }
  },
});
