import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
import { ErrorPage } from "@/features/error/ErrorPage.tsx";
import { SentryRouteErrorComponent } from "@/features/error/SentryRouteErrorComponent.tsx";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async () => {
    await sleep(300);
  },
  component: RootComponent,
  errorComponent: SentryRouteErrorComponent,
  notFoundComponent: () => <ErrorPage errorCode={404} />,
});

function RootComponent() {
  return (
    <div className="w-dvw min-h-dvh max-h-dvh h-dvh overflow-auto scrollbar-ludo-accent bg-ludo-background">
      <Outlet />
    </div>
  );
}
