import { AsideComponent } from "@/components/design-system/layouts/aside/aside-component.tsx";

type ModuleAsideLeftProps = {};

export function ModuleAsideLeft({}: ModuleAsideLeftProps) {
  return (
    <AsideComponent orientation="LEFT" innerClassName="px-6">
      <div></div>
    </AsideComponent>
  );
}
