import { qo } from "@/queries/definitions/queries";
import { LanguageLayout } from "@/layouts/language/LanguageLayout";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/language")({
  loader: async ({ context }) => languagePageLoader(context.queryClient),
  component: LanguageLayout,
});

export async function languagePageLoader(queryClient: QueryClient) {
  await queryClient.ensureQueryData(qo.runtimes());
  await queryClient.ensureQueryData(qo.languages());
  await queryClient.ensureQueryData(qo.allCourses());
}
