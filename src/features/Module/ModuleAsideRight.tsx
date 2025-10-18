import { AsideComponent } from "../../Layouts/Aside/AsideComponent";
import { ModulesList } from "./ModulesList";

type ModuleAsideRightProps = {};

export function ModuleAsideRight({}: ModuleAsideRightProps) {

  return (
    <AsideComponent orientation="RIGHT" paddingX="pl-6">
        <ModulesList/>
    </AsideComponent>
  );
}
