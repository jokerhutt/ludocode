import type { ReactNode } from "react";

type CurriculumListBodyProps = { children: ReactNode };

export function CurriculumListBody({ children }: CurriculumListBodyProps) {
  return (
        <div className="w-full flex h-full overflow-y-auto scrollbar-ludo-accent min-h-0 p-4 bg-ludo-surface flex-col">

      {children}
    </div>
  );
}

type CurriculumListHeaderProps = { children: ReactNode };

export function CurriculumListHeader({ children }: CurriculumListHeaderProps) {
  return (
    <div className="flex justify-between border-b-3 border-b-ludo-border h-14 px-4 py-2 items-center">
      {children}
    </div>
  );
}

type CurriculumListFooterProps = { children: ReactNode };

export function CurriculumListFooter({ children }: CurriculumListFooterProps) {
  return (
    <div className="flex justify-between border-t-3 border-t-ludo-border text-ludoAltText  h-14 px-4 py-2 items-center">
      {children}
    </div>
  );
}
