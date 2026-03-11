import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/subscription/manage")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/subscription/manage"!</div>;
}
