import { ludoNavigation } from "../../routes/ludoNavigation";
import { router } from "../../routes/router";
import type { LudoModule } from "../../Types/Catalog/LudoModule";
import { mockModules } from "../../Types/mockData/mockExercises";

type ModulesListProps = { modules: LudoModule[] };

export function ModulesList({ modules }: ModulesListProps) {
  return (
    <div className="border rounded-xl border-ludoGrayLight flex flex-col items-center">
      <div className="border-b rounded-t-xl bg-ludoGrayLight border-ludoGrayLight w-full">
        <p className="text-white text-xl font-bold p-2 text-center">
          Python Developer
        </p>
      </div>
      {modules.map((module) => (
        <div
          key={module.id}
          onClick={() =>
            router.navigate(
              ludoNavigation.module(module.courseId, module.orderIndex)
            )
          }
          className="text-white hover:cursor-pointer hover:bg-ludoGrayLight/20 w-full px-2 py-4 text-lg border-b border-b-ludoGrayLight"
        >
          <p>
            {module.orderIndex}.{module.title}
          </p>
        </div>
      ))}
    </div>
  );
}
