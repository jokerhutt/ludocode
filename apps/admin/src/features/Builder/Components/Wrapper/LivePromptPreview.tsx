import { InlineCode } from "@ludocode/design-system/primitives/inline-code";
import { CodeBoxWrapper } from "@/features/Builder/Components/Wrapper/code-box-wrapper.tsx";
import type { OptionSnap } from "@ludocode/types/Builder/BuilderSnapshotTypes";
import { Fragment } from "react/jsx-runtime";

type LivePromptPreviewProps = {
  prompt: string;
  correctOptions: OptionSnap[];
};

export function LivePromptPreview({
  prompt,
  correctOptions,
}: LivePromptPreviewProps) {
  const parts = prompt.split("___");

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-ludoAltText uppercase tracking-wide">
        Live preview
      </span>

      <CodeBoxWrapper
        header={false}
        className="min-h-0 rounded-lg lg:min-h-0 bg-ludo-surface border border-ludo-accent-muted"
        innerClassName="p-4"
      >
        {prompt ? (
          <p className="text-white text-left text-xl leading-loose font-light whitespace-pre-wrap">
            {parts.map((part, i) => (
              <Fragment key={i}>
                <InlineCode code={part} fontSize="20px" lineHeight="28px" />
                {i < parts.length - 1 && (
                  <span
                    className="
                                    inline-flex items-center 
                                    px-2 py-0.5 mx-1 
                                    rounded 
                                    bg-ludo-background 
                                    text-ludoAltText 
                                    text-sm
                                  "
                  >
                    {correctOptions[i]?.content || "Missing"}
                  </span>
                )}
              </Fragment>
            ))}
          </p>
        ) : (
          <span className="text-xs text-ludoAltText">
            No prompt defined yet.
          </span>
        )}
      </CodeBoxWrapper>
    </div>
  );
}
