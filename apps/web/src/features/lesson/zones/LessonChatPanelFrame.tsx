import { useIsMobile } from "@ludocode/hooks";
import type { ReactNode } from "react";
import { X, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@ludocode/design-system/cn-utils";

type LessonChatPanelFrameProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  Icon: LucideIcon;
  children: ReactNode;
  animated?: boolean;
  keepMounted?: boolean;
  desktopPanelClassName?: string;
  mobilePanelClassName?: string;
};

export function LessonChatPanelFrame({
  open,
  onOpenChange,
  title,
  Icon,
  children,
  animated = true,
  keepMounted = false,
  desktopPanelClassName,
  mobilePanelClassName,
}: LessonChatPanelFrameProps) {
  const isMobile = useIsMobile({});

  const transition = animated
    ? { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const }
    : { duration: 0 };

  if (keepMounted) {
    return (
      <>
        {isMobile && (
          <motion.button
            type="button"
            aria-label={`Close ${title.toLowerCase()} panel`}
            className={cn(
              "fixed inset-0 z-40 bg-black/50",
              !open && "pointer-events-none",
            )}
            onClick={() => onOpenChange(false)}
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={
              animated ? { duration: 0.2, ease: "easeInOut" } : { duration: 0 }
            }
          />
        )}

        <motion.aside
          aria-hidden={!open}
          initial={false}
          animate={
            isMobile
              ? { y: open ? "0%" : "100%", opacity: open ? 1 : 0.9 }
              : { x: open ? "0%" : "100%" }
          }
          transition={transition}
          className={cn(
            isMobile
              ? "fixed inset-x-0 bottom-0 z-50 h-[75vh] max-h-[75vh] rounded-t-xl border-t border-ludo-border bg-ludo-background"
              : "fixed right-0 top-0 z-40 h-dvh w-95 border-l border-ludo-border bg-ludo-background",
            !open && "pointer-events-none",
            isMobile ? mobilePanelClassName : desktopPanelClassName,
          )}
        >
          <div className="flex h-full flex-col">
            <header className="flex items-center justify-between border-b border-ludo-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-ludo-white" />
                <p className="text-sm font-semibold uppercase tracking-wide text-ludo-white-bright">
                  {title}
                </p>
              </div>
              <button
                type="button"
                aria-label={`Close ${title.toLowerCase()} panel`}
                onClick={() => onOpenChange(false)}
                className="rounded-md p-1 text-ludo-white hover:bg-ludo-surface hover:cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
          </div>
        </motion.aside>
      </>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {open && (
        <>
          {isMobile && (
            <motion.button
              type="button"
              aria-label={`Close ${title.toLowerCase()} panel`}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => onOpenChange(false)}
              initial={animated ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={animated ? { opacity: 0 } : { opacity: 1 }}
              transition={
                animated
                  ? { duration: 0.2, ease: "easeInOut" }
                  : { duration: 0 }
              }
            />
          )}

          <motion.aside
            initial={
              animated
                ? isMobile
                  ? { y: "100%", opacity: 0.9 }
                  : { x: "100%" }
                : false
            }
            animate={isMobile ? { y: "0%", opacity: 1 } : { x: "0%" }}
            exit={
              animated
                ? isMobile
                  ? { y: "100%", opacity: 0.9 }
                  : { x: "100%" }
                : isMobile
                  ? { y: "0%", opacity: 1 }
                  : { x: "0%" }
            }
            transition={transition}
            className={cn(
              isMobile
                ? "fixed inset-x-0 bottom-0 z-50 h-[75vh] max-h-[75vh] rounded-t-xl border-t border-ludo-border bg-ludo-background"
                : "fixed right-0 top-0 z-40 h-dvh w-95 border-l border-ludo-border bg-ludo-background",
              isMobile ? mobilePanelClassName : desktopPanelClassName,
            )}
          >
            <div className="flex h-full flex-col">
              <header className="flex items-center justify-between border-b border-ludo-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-ludo-white" />
                  <p className="text-sm font-semibold uppercase tracking-wide text-ludo-white-bright">
                    {title}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Close ${title.toLowerCase()} panel`}
                  onClick={() => onOpenChange(false)}
                  className="rounded-md p-1 text-ludo-white hover:bg-ludo-surface hover:cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
