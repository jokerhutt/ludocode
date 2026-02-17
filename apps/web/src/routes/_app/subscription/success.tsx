import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/subscription/success')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/subscription/success"!</div>
}
