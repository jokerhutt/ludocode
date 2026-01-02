import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/constants/environment/env";

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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="w-dvw min-h-dvh max-h-dvh h-dvh overflow-auto scrollbar-ludoYellow bg-ludoGrayDark">
        <Outlet />
      </div>
    </GoogleOAuthProvider>
  );
}
