import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { ErrorPage } from "@/features/error/ErrorPage.tsx";
import type { ErrorComponentProps } from "@tanstack/react-router";

export function SentryRouteErrorComponent({ error }: ErrorComponentProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return <ErrorPage errorCode={500} />;
}
