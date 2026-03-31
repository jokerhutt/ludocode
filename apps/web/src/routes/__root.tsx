import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient, useQuery } from "@tanstack/react-query";
import { ErrorPage } from "@/features/error/ErrorPage.tsx";
import { SentryRouteErrorComponent } from "@/features/error/SentryRouteErrorComponent.tsx";
import { MaintenancePage } from "@/features/maintenance/MaintenancePage.tsx";
import { qo } from "@/queries/definitions/queries.ts";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ context }) => {
    await sleep(300);
    const maintenance = await context.queryClient
      .ensureQueryData(qo.maintenance())
      .catch(() => ({ enabled: false }));
    return { maintenance };
  },
  component: RootComponent,
  errorComponent: SentryRouteErrorComponent,
  notFoundComponent: () => <ErrorPage errorCode={404} />,
});

function RootComponent() {
  const { data: maintenance } = useQuery(qo.maintenance());

  if (maintenance?.enabled) {
    return <MaintenancePage />;
  }

  return (
    <div className="w-dvw min-h-dvh max-h-dvh h-dvh overflow-auto scrollbar-ludo-accent bg-ludo-background">
      <Outlet />
    </div>
  );
}
