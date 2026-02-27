import type { CurriculumDraftBlock } from "@ludocode/types";
import { LudoInput } from "@ludocode/design-system/primitives/input";
import { Textarea } from "@ludocode/external/ui/textarea";
import { X, ChevronUp, ChevronDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ludocode/external/ui/select";
import { createBlockTemplate } from "../templates";

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
  paragraph: "text-ludoAltText",
  code: "text-emerald-400",
  media: "text-purple-400",
};

type BlocksEditorProps = {
  form: any;
  exerciseIndex: number;
};

export function BlocksEditor({ form, exerciseIndex }: BlocksEditorProps) {
  const blocksPath = `exercises[${exerciseIndex}].blocks`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Blocks</p>
      </div>

      <form.Field name={blocksPath} mode="array">
        {(blocksField: any) => {
          const blocks: CurriculumDraftBlock[] = blocksField.state.value ?? [];

          return (
            <div className="flex flex-col gap-3">
              {blocks.map((block: CurriculumDraftBlock, blockIndex: number) => (
                <div
                  key={blockIndex}
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
                            blocksField.moveValue(blockIndex, blockIndex - 1)
                          }
                          className="p-0.5 rounded hover:bg-ludo-background text-ludoAltText hover:text-white transition-colors"
                        >
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {blockIndex < blocks.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            blocksField.moveValue(blockIndex, blockIndex + 1)
                          }
                          className="p-0.5 rounded hover:bg-ludo-background text-ludoAltText hover:text-white transition-colors"
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => blocksField.removeValue(blockIndex)}
                        className="p-0.5 rounded hover:bg-ludo-background text-ludoAltText hover:text-red-400 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <BlockFieldEditor
                    form={form}
                    exerciseIndex={exerciseIndex}
                    blockIndex={blockIndex}
                    block={block}
                  />
                </div>
              ))}

              <Select
                value=""
                onValueChange={(type) =>
                  blocksField.pushValue(createBlockTemplate(type as BlockType))
                }
              >
                <SelectTrigger className="w-auto h-auto gap-2 px-3 py-1 rounded-sm bg-ludo-surface border-transparent text-white! text-sm hover:bg-ludo-accent/20 transition-colors focus:ring-0 focus-visible:ring-0">
                  <SelectValue placeholder="+ Add Block" />
                </SelectTrigger>
                <SelectContent className="bg-ludo-surface border-ludo-border">
                  {BLOCK_TYPES.map((bt) => (
                    <SelectItem
                      key={bt.value}
                      value={bt.value}
                      className="text-white hover:bg-ludo-background cursor-pointer"
                    >
                      <span className={blockTypeColor[bt.value]}>
                        {bt.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }}
      </form.Field>
    </div>
  );
}

function BlockFieldEditor({
  form,
  exerciseIndex,
  blockIndex,
  block,
}: {
  form: any;
  exerciseIndex: number;
  blockIndex: number;
  block: CurriculumDraftBlock;
}) {
  const basePath = `exercises[${exerciseIndex}].blocks[${blockIndex}]`;

  switch (block.type) {
    case "header":
      return (
        <form.Field
          name={`${basePath}.content`}
          children={(field: {
            state: { value: unknown };
            handleChange: (v: string) => void;
          }) => (
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
          name={`${basePath}.content`}
          children={(field: {
            state: { value: unknown };
            handleChange: (v: string) => void;
          }) => (
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
            name={`${basePath}.language`}
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
            name={`${basePath}.content`}
            children={(field: {
              state: { value: unknown };
              handleChange: (v: string) => void;
            }) => (
              <Textarea
                value={String(field.state.value ?? "")}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Code content..."
                className="bg-ludo-background border-transparent text-white placeholder:text-ludoGray focus:ring-0 focus-visible:ring-0 min-h-24 resize-none font-mono text-sm"
              />
            )}
          />
        </div>
      );

    case "media":
      return (
        <div className="flex flex-col gap-2">
          <form.Field
            name={`${basePath}.src`}
            children={(field: {
              state: { value: unknown };
              handleChange: (v: string) => void;
            }) => (
              <LudoInput
                value={String(field.state.value ?? "")}
                setValue={(v: string) => field.handleChange(v)}
                placeholder="Media URL (https://...)"
              />
            )}
          />
          <form.Field
            name={`${basePath}.alt`}
            children={(field: {
              state: { value: unknown };
              handleChange: (v: string) => void;
            }) => (
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
}
