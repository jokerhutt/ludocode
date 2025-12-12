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
import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "./utils/session";

const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useAppSession();

  console.log(" SESSION DATA: " + JSON.stringify(session));

  if (!session.data.id) {
    return null;
  }

  console.log("session data exists")

  return {
    id: session.data.id,
    firstName: session.data.firstName,
    lastName: session.data.lastName,
    pfpSrc: session.data.pfpSrc,
    email: session.data.email,
    hasOnboarded: session.data.hasOnboarded,
    createdAt: session.data.createdAt,
  };
});

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
    const user = await fetchUser();
    await sleep(300);
    return { user };
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
