/// <reference types="vite/client" />

import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from "@tanstack/react-router";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import appCss from "@/App.css?url";
import { ErrorPage } from "@/features/Error/ErrorPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  beforeLoad: async () => {
    await sleep(300);
  },
  errorComponent: () => (
    <RootDocument>
      <ErrorPage errorCode={500} />
    </RootDocument>
  ),
  notFoundComponent: () => <ErrorPage errorCode={404} />,
  component: RootComponent,
});

function RootComponent() {
  const { queryClient } = useRouteContext({ from: Route.id });

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="h-full bg-ludoGrayDark overscroll-none">
        <div className="w-dvw min-h-dvh max-h-dvh h-dvh overflow-auto scrollbar-ludoYellow">
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  );
}
