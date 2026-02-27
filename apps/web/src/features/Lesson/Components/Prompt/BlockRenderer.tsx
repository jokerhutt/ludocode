import type {
  LudoExercise,
  Block,
} from "@ludocode/types/Exercise/LudoExercise.ts";
import { ExerciseMedia } from "@/features/Lesson/Components/Media/ExerciseMedia.tsx";
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
        <div className="w-full">
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
        </div>
      );
    case "media":
      return <ExerciseMedia media={block.src} />;
    default:
      return null;
  }
}
