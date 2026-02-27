import type { CurriculumDraftBlock } from "@ludocode/types";
import { InlineCode } from "@ludocode/design-system/primitives/inline-code.tsx";

export function BlockPreview({ block }: { block: CurriculumDraftBlock }) {
  switch (block.type) {
    case "header":
      return (
        <h2 className="text-white text-lg font-semibold">{block.content}</h2>
      );
    case "paragraph":
      return <p className="text-ludoAltText text-md">{block.content}</p>;
    case "code":
      return (
        <div className="w-full px-4 bg-ludo-code-surface rounded-lg py-3">
          <InlineCode lineHeight="26px" code={block.content} />
        </div>
      );
    case "media":
      return (
        <div className="w-full items-center py-4 flex justify-center">
          <img
            className="max-h-60 w-auto rounded"
            src={block.src}
            alt={block.alt ?? undefined}
          />
        </div>
      );
  }
}
