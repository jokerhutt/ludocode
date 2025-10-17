import { Outlet } from "@tanstack/react-router";
import { GlobalFooter } from "../components/Footer/GlobalFooter";
import { TutorialHeader } from "../features/Tutorial/TutorialHeader";

export function LessonLayout() {
  return (
    <div className="grid h-dvh grid-rows-[1fr_auto]">
      <TutorialHeader total={1} position={1} />
      <main className="min-h-0 overflow-auto">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}
