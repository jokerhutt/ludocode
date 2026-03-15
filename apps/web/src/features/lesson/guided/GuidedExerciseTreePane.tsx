import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import type { LudoExercise } from "@ludocode/types";
import { cn } from "@ludocode/design-system/cn-utils";
import { ChatBotProvider } from "@/features/ai/context/ChatBotContext";
import { ChatBotAccordion } from "@ludocode/design-system/widgets/chatbot/ChatbotAccordion";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow";
import { mdxComponents } from "@ludocode/ludo-mdx/webdocs/MdxComponents.tsx";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck";
import { useUserPreferencesContext } from "@/features/user/context/useUserPreferenceContext";
import { useIsMobile } from "@ludocode/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries";
import ReactMarkdown, { type Components } from "react-markdown";

const placeholderGuidedMarkdown = `### Printing Strings

Printing is how your program shows text to the user.

### What you are doing

- Write a string inside quotes
- Pass it to the print function
- Run the program and inspect the output

### Example

\`\`\`python
print("Hello, world!")
\`\`\`

### Tip

If your text is missing quotes, the program will treat it as something else and fail.
`;

const guidedMarkdownComponents = mdxComponents as unknown as Components;

type GuidedExerciseTreePaneProps = {
  showBlockOutput?: boolean;
  currentExercise: LudoExercise;
  systemPrompt: string;
  className?: string;
};

export function GuidedExerciseTreePane({
  showBlockOutput = true,
  currentExercise,
  systemPrompt,
  className,
}: GuidedExerciseTreePaneProps) {
  const isMobile = useIsMobile({});
  const instructionBlocks = currentExercise.blocks.filter(
    (block) => block.type === "instructions",
  );
  const { aiEnabled } = useUserPreferencesContext();
  const aiFeature = useFeatureEnabledCheck({ feature: "isAIEnabled" });
  const { data: chatbotCredits } = useSuspenseQuery(qo.credits());
  return (
    <Workbench.Pane
      dataTestId="guided-project-aside-left"
      className={cn("lg:border-r-2 border-r-ludo-surface", className)}
    >
      <Workbench.Pane.Winbar className="hidden lg:block">
        <p className="text-sm font-medium tracking-wide">Instructions</p>
      </Workbench.Pane.Winbar>
      <Workbench.Pane.Content>
        <div className="w-full px-4 py-4 lg:px-6 lg:py-5 overflow-y-auto scrollbar-ludo-accent">
          <div className="max-w-none text-left">
            <ReactMarkdown components={guidedMarkdownComponents}>
              {placeholderGuidedMarkdown}
            </ReactMarkdown>
          </div>

          {instructionBlocks.length > 0 && (
            <div className="mt-6 flex flex-col gap-4 items-start">
              <div className="w-full border-t border-ludo-border/60 pt-4">
                <p className="text-xs font-semibold tracking-wide uppercase text-ludo-accent-muted">
                  Instructions
                </p>
              </div>

              {instructionBlocks.map((block, index) => (
                <BlockRenderer
                  key={`instruction-${index}`}
                  lessonType="GUIDED"
                  block={block}
                  showOutput={showBlockOutput}
                  mobile={isMobile}
                />
              ))}
            </div>
          )}
        </div>
      </Workbench.Pane.Content>
      {!isMobile && aiEnabled && aiFeature.enabled && (
        <div className="min-h-0 min-w-0 w-full h-full flex flex-col justify-end">
          <ChatBotProvider
            sessionId={currentExercise.id}
            credits={chatbotCredits}
            type="LESSON"
          >
            <ChatBotAccordion>
              <ChatBotWindow systemPrompt={systemPrompt} />
            </ChatBotAccordion>
          </ChatBotProvider>
        </div>
      )}
    </Workbench.Pane>
  );
}
