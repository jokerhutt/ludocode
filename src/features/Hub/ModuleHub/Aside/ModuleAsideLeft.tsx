import { AsideComponent } from "@/components/LudoComponents/Layouts/Aside/AsideComponent";

type ModuleAsideLeftProps = {};

export function ModuleAsideLeft({}: ModuleAsideLeftProps) {
  return (
    <AsideComponent orientation="LEFT" innerClassName="px-6">
      <div></div>
    </AsideComponent>
  );
}
