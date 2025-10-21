import { AsideComponent } from "../../Layouts/Aside/AsideComponent";
import type { LudoModule } from "../../Types/Catalog/LudoModule";
import { ModulesList } from "./ModulesList";

type ModuleAsideRightProps = {modules: LudoModule[]};

export function ModuleAsideRight({modules}: ModuleAsideRightProps) {

  return (
    <AsideComponent orientation="RIGHT" paddingX="pl-6">
        <ModulesList modules={modules}/>
    </AsideComponent>
  );
}
