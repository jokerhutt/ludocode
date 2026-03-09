import { Howler } from "howler";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen.ts";
import { ErrorPage } from "@/features/error/ErrorPage.tsx";
import type { LessonSubmissionRequest } from "packages/types/Exercise/LessonSubmissions.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

window.addEventListener("pagehide", () => {
  Howler.stop();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    Howler.stop();
  }
});

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
    submission?: LessonSubmissionRequest;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>,
);
