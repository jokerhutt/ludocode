import { HeaderWithBar } from "../../components/Molecules/Header/HeaderWithBar";
import { SegmentedProgress } from "../../components/Molecules/Progress/SegmentedProgress";
import { ExitButton } from "@/components/Atoms/Button/ExitButton";

type HeaderWithProgressProps = {
  total: number;
  position: number;
  onExit?: () => void;
};

export function HeaderWithProgress({
  total,
  position,
  onExit,
}: HeaderWithProgressProps) {
  const completed = position + 1;

  return (
    <HeaderWithBar className="px-4" device="Both">
      <div className="col-start-1 col-end-2 flex items-center h-full">
        <ExitButton onClick={() => onExit?.()} />
      </div>
      <div className="flex items-center justify-center col-start-3 col-end-11 lg:col-start-4 lg:col-end-10">
        <SegmentedProgress total={total} completed={completed} />
      </div>
    </HeaderWithBar>
  );
}
