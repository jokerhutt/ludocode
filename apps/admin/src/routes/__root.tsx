import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async () => {
    await sleep(300);
  },
  component: RootComponent,
});

function RootComponent() {
  return (
      <div className="w-dvw min-h-dvh max-h-dvh h-dvh overflow-auto scrollbar-ludo-accent bg-ludo-background">
        <Outlet />
      </div>
  );
}
