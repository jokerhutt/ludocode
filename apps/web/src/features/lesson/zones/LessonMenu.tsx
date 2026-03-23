import { useState, type ReactNode } from "react";
import { FeedbackDialog } from "@/features/feedback/FeedbackDialog.tsx";
import { useLessonExercise } from "@/features/lesson/context/useLessonContext.tsx";
import { qo } from "@/queries/definitions/queries";
import { useEditPreferences } from "@/queries/mutations/useEditPreferences";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LudoMenu } from "@ludocode/design-system/widgets/ludo-menu.tsx";
import { AudioToggleIcon } from "../components/AudioToggleIcon";
import { ExerciseFeedbackIcon } from "../components/ExerciseFeedbackIcon";
import { MessageCircle, Sparkles } from "lucide-react";

type LessonMenuProps = {
  trigger: ReactNode;
  onDiscussSelect?: () => void;
  onAiSelect?: () => void;
  hideChat?: boolean;
};

export function LessonMenu({
  trigger,
  onDiscussSelect,
  onAiSelect,
  hideChat = false,
}: LessonMenuProps) {
  const { data: preferences } = useSuspenseQuery(qo.preferences());
  const editPreferences = useEditPreferences();
  const { currentExercise } = useLessonExercise();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleAudioToggle = () => {
    if (editPreferences.isPending) return;
    editPreferences.mutate({ key: "AUDIO", value: !preferences.audioEnabled });
  };

  return (
    <LudoMenu modal={false}>
      <LudoMenu.Trigger>{trigger}</LudoMenu.Trigger>

      <LudoMenu.Content
        align="end"
        className={feedbackOpen ? "w-48 pointer-events-none" : "w-48"}
      >
        <p className="text-[10px] uppercase tracking-wider text-ludo-white-bright/30 px-2 pb-1.5">
          Lesson Actions
        </p>

        <LudoMenu.Item
          dataTestId={`lesson-audio-toggle-button`}
          disabled={editPreferences.isPending}
          onSelect={handleAudioToggle}
          closeOnSelect={false}
          className={"hover:bg-ludo-accent-muted/50"}
        >
          <LudoMenu.Row className={"cursor-pointer"}>
            <LudoMenu.Icon>
              <AudioToggleIcon audioEnabled={preferences.audioEnabled} />
            </LudoMenu.Icon>
            <LudoMenu.Label>{"AUDIO"}</LudoMenu.Label>
          </LudoMenu.Row>
        </LudoMenu.Item>

        {!hideChat && (
          <>
            <LudoMenu.Divider />

            <LudoMenu.Item
              dataTestId={`lesson-ai-button`}
              closeOnSelect={true}
              onSelect={onAiSelect}
              className={"hover:bg-ludo-accent-muted/50"}
            >
              <LudoMenu.Row className={"cursor-pointer"}>
                <LudoMenu.Icon>
                  <Sparkles className="h-4 w-4 text-ludo-white" />
                </LudoMenu.Icon>
                <LudoMenu.Label>{"AI"}</LudoMenu.Label>
              </LudoMenu.Row>
            </LudoMenu.Item>

            <LudoMenu.Divider />
          </>
        )}

        <LudoMenu.Item
          dataTestId={`exercise-feedback-button`}
          closeOnSelect={false}
          onSelect={() => setFeedbackOpen(true)}
          className={"hover:bg-ludo-accent-muted/50"}
        >
          <LudoMenu.Row className={"cursor-pointer"}>
            <LudoMenu.Icon>
              <ExerciseFeedbackIcon />
            </LudoMenu.Icon>
            <LudoMenu.Label>{"FEEDBACK"}</LudoMenu.Label>
          </LudoMenu.Row>
        </LudoMenu.Item>

        <FeedbackDialog
          feedbackType={"EXERCISE"}
          entityId={currentExercise.id}
          open={feedbackOpen}
          onOpenChange={setFeedbackOpen}
        />

        {!hideChat && (
          <>
            <LudoMenu.Divider />

            <LudoMenu.Item
              dataTestId={`exercise-discussion-button`}
              closeOnSelect={true}
              onSelect={onDiscussSelect}
              className={"hover:bg-ludo-accent-muted/50"}
            >
              <LudoMenu.Row className={"cursor-pointer"}>
                <LudoMenu.Icon>
                  <MessageCircle className="h-4 w-4 text-ludo-white" />
                </LudoMenu.Icon>
                <LudoMenu.Label>{"DISCUSS"}</LudoMenu.Label>
              </LudoMenu.Row>
            </LudoMenu.Item>
          </>
        )}
      </LudoMenu.Content>
    </LudoMenu>
  );
}
