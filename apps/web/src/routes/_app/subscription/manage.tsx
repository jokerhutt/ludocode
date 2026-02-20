import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/subscription/manage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/subscription/manage"!</div>
}
