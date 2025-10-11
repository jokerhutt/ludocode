import { createRouter, createRouterConfig, createRoute, Outlet, createRootRoute } from '@tanstack/react-router'
import { TutorialPage } from '../features/Tutorial/TutorialPage'
import { ExerciseComponent } from '../features/Exercise/ExerciseComponent'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Hello World</div>
})

export const tutorialRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `/tutorial/$tutorialId/exercise/$position`,
    component: TutorialPage
})

const routeTree = rootRoute.addChildren([indexRoute, tutorialRoute])
export const router = createRouter({routeTree})
