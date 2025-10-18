import { ModuleAsideLeft } from "./ModuleAsideLeft";
import { ModuleAsideRight } from "./ModuleAsideRight";
import { PathButton } from "./PathButton";
import { PathRow } from "./PathRow";

export function ModulePage() {
  const mockLessons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="grid grid-cols-12 bg-ludoGrayDark">
      <ModuleAsideLeft />
      <div className="col-start-5 col-end-9 overflow-auto lg:col-start-6 lg:col-end-8 flex flex-col gap-10 lg:gap-8 items-center py-6 min-w-0">
        {mockLessons.map((_, i) => (
          <PathRow key={i} index={i}>
            <PathButton />
          </PathRow>
        ))}
      </div>
      <ModuleAsideRight />
    </div>
  );
}
