import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";

type PaginationBarProps = {
  page: number;
  totalPages: number;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function PaginationBar({
  page,
  totalPages,
  hasNext,
  onPrev,
  onNext,
}: PaginationBarProps) {
  if (totalPages <= 1) return null;

  const isFirstPage = page === 0;

  return (
    <div className="flex items-center justify-end gap-3">
      <LudoButton
        className="h-9 w-fit px-4 text-sm"
        clickable={!isFirstPage}
        disabled={isFirstPage}
        onClick={onPrev}
      >
        Previous
      </LudoButton>
      <span className="text-xs font-medium tabular-nums text-ludo-white">
        {page + 1} / {totalPages}
      </span>
      <LudoButton
        className="h-9 w-fit px-4 text-sm"
        clickable={hasNext}
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
      </LudoButton>
    </div>
  );
}
