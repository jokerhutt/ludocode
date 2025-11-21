import { AsideComponent } from "../../Layouts/Aside/AsideComponent";

type ModuleAsideLeftProps = {};

export function ModuleAsideLeft({}: ModuleAsideLeftProps) {
  return (
    <AsideComponent orientation="LEFT" paddingX="pl-6">
      <div></div>
    </AsideComponent>
  );
}