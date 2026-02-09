import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/courses/$courseId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/courses/$courseId"!</div>;
}
