import { Outlet, useMatches } from "@tanstack/react-router";
import { MainContentWrapper } from "./Grids/MainContentWrapper";
import { SubGridWrapper } from "./Grids/SubGridWrapper";
import { StaticHeader } from "../components/Molecules/Header/StaticHeader";

export function DefaultSectionLayout() {
  const matches = useMatches();
  const active = matches[matches.length - 1];
  const title =
    (active?.staticData as { headerTitle?: string })?.headerTitle ?? "LudoCode";

  return (
    <SubGridWrapper>
      <StaticHeader title={title} />
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
    </SubGridWrapper>
  );
}
