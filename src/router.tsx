import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
// @ts-ignore
import { routeTree } from "./routeTree.gen";
import { ErrorPage } from "@/features/Error/ErrorPage";
import type { LessonSubmission } from "./types/Exercise/LessonSubmissions";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultErrorComponent: () => <ErrorPage errorCode={500} />,
    defaultNotFoundComponent: () => <ErrorPage errorCode={404} />,
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }

  interface HistoryState {
    submission?: LessonSubmission;
  }
}
