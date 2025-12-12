import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import type { LessonSubmission } from "./types/Exercise/LessonSubmissions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ErrorPage } from "./features/Error/ErrorPage";

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  defaultErrorComponent: () => <ErrorPage errorCode={500} />,
  defaultNotFoundComponent: () => <ErrorPage errorCode={404} />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface HistoryState {
    submission?: LessonSubmission;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
