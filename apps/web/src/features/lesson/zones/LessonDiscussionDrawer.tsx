import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Textarea } from "@ludocode/external/ui/textarea.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { MessageCircle } from "lucide-react";
import { useLessonExercise } from "@/features/lesson/context/useLessonContext.tsx";
import { qo } from "@/queries/definitions/queries.ts";
import { useCreateDiscussionMessage } from "@/queries/mutations/useCreateDiscussionMessage.tsx";
import type { DiscussionMessage } from "@ludocode/types";
import { LessonChatPanelFrame } from "./LessonChatPanelFrame";

type LessonDiscussionDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animated?: boolean;
};

type ThreadNode = DiscussionMessage & {
  children: ThreadNode[];
};

export function LessonDiscussionDrawer({
  open,
  onOpenChange,
  animated = true,
}: LessonDiscussionDrawerProps) {
  const { currentExercise } = useLessonExercise();
  const [content, setContent] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const discussionEntityId = currentExercise.id;

  const {
    data: discussion,
    isLoading,
    isError,
  } = useQuery(qo.discussion(discussionEntityId, "EXERCISE"));
  const { data: currentUser } = useQuery(qo.currentUser());

  const createMessage = useCreateDiscussionMessage(
    discussionEntityId,
    "EXERCISE",
  );
  const thread = useMemo(
    () => buildThread(discussion?.children ?? []),
    [discussion?.children],
  );

  useEffect(() => {
    setContent("");
    setReplyToId(null);
  }, [discussionEntityId]);

  const handleSend = () => {
    const trimmed = content.trim();
    if (!trimmed || createMessage.isPending) return;

    createMessage.mutate(
      {
        entityId: discussionEntityId,
        discussionTopic: "EXERCISE",
        parentId: replyToId,
        content: trimmed,
      },
      {
        onSuccess: () => {
          setContent("");
          setReplyToId(null);
        },
      },
    );
  };

  return (
    <LessonChatPanelFrame
      open={open}
      onOpenChange={onOpenChange}
      title="Exercise Discussion"
      Icon={MessageCircle}
      animated={animated}
      desktopPanelClassName="top-14 right-11 bottom-26 h-auto"
    >
      <div className="flex h-full min-h-0 flex-col px-4 py-3">
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {isLoading && (
            <p className="text-sm text-ludo-white-dim">Loading discussion...</p>
          )}

          {isError && (
            <p className="text-sm text-red-300">
              We could not load this discussion right now.
            </p>
          )}

          {!isLoading && !isError && thread.length === 0 && (
            <div className="rounded-lg border border-dashed border-ludo-border p-4">
              <p className="text-sm text-ludo-white-bright">No messages yet.</p>
              <p className="mt-1 text-xs text-ludo-white-dim">
                Start the thread with the first message for this exercise.
              </p>
            </div>
          )}

          {!isLoading && !isError && thread.length > 0 && (
            <div className="space-y-3">
              {thread.map((node) => (
                <MessageThreadNode
                  key={node.id}
                  node={node}
                  depth={0}
                  currentUserId={currentUser?.id}
                  onReply={setReplyToId}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="mt-3 border-t border-ludo-border px-0 py-3 shrink-0">
          {replyToId && (
            <div className="mb-2 flex items-center justify-between rounded-md border border-ludo-border bg-ludo-surface px-2 py-1.5 text-xs text-ludo-white-dim">
              <span>Replying to a message</span>
              <button
                type="button"
                onClick={() => setReplyToId(null)}
                className="text-ludo-white hover:text-ludo-white-bright hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add to the exercise discussion..."
            className="min-h-20 resize-none border-ludo-border bg-ludo-background text-ludo-white-bright focus-visible:border-ludo-border focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            maxLength={1500}
          />

          <div className="mt-2 flex items-center justify-end">
            <LudoButton
              variant="alt"
              className="h-8 px-4"
              onClick={handleSend}
              disabled={!content.trim() || createMessage.isPending}
              isLoading={createMessage.isPending}
            >
              Send
            </LudoButton>
          </div>
        </footer>
      </div>
    </LessonChatPanelFrame>
  );
}

function MessageThreadNode({
  node,
  depth,
  currentUserId,
  onReply,
}: {
  node: ThreadNode;
  depth: number;
  currentUserId?: string;
  onReply: (id: string) => void;
}) {
  const timestamp = formatTimestamp(node.createdAt);
  const hasReplies = node.children.length > 0;
  const [repliesOpen, setRepliesOpen] = useState(false);

  return (
    <div className={depth > 0 ? "ml-3 border-l border-ludo-border pl-2" : ""}>
      <article className="rounded-md border border-ludo-border bg-ludo-surface/50 p-2">
        <div className="mb-0.5 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-ludo-white-bright">
            {shortAuthor(node.authorName)}
          </span>
          <span className="text-[11px] text-ludo-white-dim">{timestamp}</span>
        </div>
        <p className="whitespace-pre-wrap text-[13px] text-ludo-white">
          {node.content}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <button
            type="button"
            className="text-[11px] font-medium uppercase tracking-wide text-ludo-accent-muted hover:text-ludo-accent hover:cursor-pointer"
            onClick={() => onReply(node.id)}
          >
            Reply
          </button>

          {hasReplies && (
            <button
              type="button"
              className="text-[11px] font-medium uppercase tracking-wide text-ludo-white-dim hover:text-ludo-white hover:cursor-pointer"
              onClick={() => setRepliesOpen((prev) => !prev)}
            >
              {repliesOpen
                ? `Hide Replies (${node.children.length})`
                : `Replies (${node.children.length})`}
            </button>
          )}
        </div>
      </article>

      {hasReplies && repliesOpen && (
        <div className="mt-1.5 space-y-1.5">
          {node.children.map((child) => (
            <MessageThreadNode
              key={child.id}
              node={child}
              depth={depth + 1}
              currentUserId={currentUserId}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function buildThread(messages: DiscussionMessage[]): ThreadNode[] {
  const byId = new Map<string, ThreadNode>();

  for (const message of messages) {
    byId.set(message.id, { ...message, children: [] });
  }

  const roots: ThreadNode[] = [];

  for (const node of byId.values()) {
    const parent = node.parentId ? byId.get(node.parentId) : undefined;
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return sortThreadNodes(roots);
}

function sortThreadNodes(nodes: ThreadNode[]): ThreadNode[] {
  return nodes
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((node) => ({
      ...node,
      children: sortThreadNodes(node.children),
    }));
}

function shortAuthor(authorName: string): string {
  if (!authorName) return "Anonymous";
  if (authorName.length <= 20) return authorName;
  return `${authorName.slice(0, 6)}...${authorName.slice(-4)}`;
}

function formatTimestamp(timestamp: number): string {
  const normalized =
    timestamp > 1_000_000_000_000 ? timestamp : timestamp * 1000;
  return new Date(normalized).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
