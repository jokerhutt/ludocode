import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { router } from "@/main.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button.tsx";
import type { SubjectsDraftSnapshot } from "@ludocode/types";

type SubjectsPaneProps = {
  className?: string;
  subjects: SubjectsDraftSnapshot[];
};

export function SubjectsPane({ className, subjects }: SubjectsPaneProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-ludo-white font-semibold tracking-wide">
          Subjects
        </h2>

        <ShadowLessButton
          onClick={() => router.navigate(adminNavigation.subjects.toSubjects())}
        >
          Manage
        </ShadowLessButton>
      </div>

      {subjects.length === 0 ? (
        <div className="text-sm text-ludo-white opacity-60">
          No subjects available.
        </div>
      ) : (
        <div className="flex flex-col rounded-lg border border-ludo-accent-muted/20 divide-y divide-ludo-accent-muted/20">
          {subjects.map((subject) => (
            <div key={subject.id} className="px-5 py-4 flex flex-col gap-1">
              <p className="text-ludo-white-bright font-medium">
                {subject.name}
              </p>

              <p className="text-xs text-ludo-white">/{subject.slug}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
