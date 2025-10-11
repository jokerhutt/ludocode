import { createRouter, createRouterConfig, createRoute, Outlet, createRootRoute } from '@tanstack/react-router'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Hello World</div>
})



const routeTree = rootRoute.addChildren([indexRoute])
const router = createRouter({routeTree})
