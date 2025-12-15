import { LudoButton } from "../LudoButton";
import { PathButton } from "../module/PathButton";

type DesignPageProps = {};

export function DesignPage({}: DesignPageProps) {
  return (
    <div className="grid col-span-full overflow-y-auto min-h-0 p-8 h-full grid-cols-12">
      <div className="col-span-1 lg:bg-ludoGrayDark lg:col-span-2"></div>
      <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-center justify-center min-w-0">
        <PathButton lessonState="LOCKED" />
      </div>
      <div className="col-span-1 lg:bg-ludoGrayDark lg:col-span-2"></div>
    </div>
  );
}
