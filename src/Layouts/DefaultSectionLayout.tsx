import { Outlet, useMatches } from "@tanstack/react-router";
import { DefaultHeader } from "../components/Header/DefaultHeader";

export function DefaultSectionLayout() {
  const matches = useMatches();
  const active = matches[matches.length - 1];
  const title =
    (active?.staticData as { headerTitle?: string })?.headerTitle ??
    "LudoCode";

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-0">
      <DefaultHeader title={title}/>
      <main className="min-h-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
