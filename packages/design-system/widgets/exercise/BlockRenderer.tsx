import type { Block } from "@ludocode/types/Exercise/LudoExercise.ts";
import { LudoCodePreview } from "@ludocode/design-system/widgets/LudoCodePreview";

const noop = () => {};

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "header":
      return (
        <h2 className="text-white text-center text-lg sm:text-xl font-semibold leading-snug">
          {block.content}
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-ludoAltText text-center text-sm sm:text-base leading-relaxed">
          {block.content}
        </p>
      );
    case "code":
      return (
        <div className="w-full flex flex-col gap-2">
          <LudoCodePreview
            prompt={block.content}
            options={[]}
            userResponses={[]}
            onChange={noop}
            clear={noop}
            shadow
            popLast={noop}
          >
            <LudoCodePreview.Header />
            <LudoCodePreview.Code withGaps={false} />
          </LudoCodePreview>
          {block.output && (
            <div className="flex items-center gap-2 rounded-lg bg-ludo-surface/60 border border-ludo-border/40 px-4 py-2">
              <span className="text-xs font-medium text-ludoAltText/60 shrink-0">
                Output
              </span>
              <span className="text-sm text-white font-mono">
                {block.output}
              </span>
            </div>
          )}
        </div>
      );
    case "media":
      return <ExerciseMedia media={block.src} />;
    default:
      return null;
  }
}

type ExerciseMediaProps = { media: string };

function ExerciseMedia({ media }: ExerciseMediaProps) {
  return (
    <div className="w-full items-center flex justify-center">
      <img className="max-h-60 w-auto" src={media} />
    </div>
  );
}
