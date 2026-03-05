import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
import { ErrorPage } from "@/features/error/ErrorPage.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/constants/environment/env.ts";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async () => {
    await sleep(300);
  },
  component: RootComponent,
  errorComponent: () => <ErrorPage errorCode={500} />,
  notFoundComponent: () => <ErrorPage errorCode={404} />,
});

function RootComponent() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="w-dvw min-h-dvh max-h-dvh h-dvh overflow-auto scrollbar-ludo-accent bg-ludo-background">
        <Outlet />
      </div>
    </GoogleOAuthProvider>
  );
}
