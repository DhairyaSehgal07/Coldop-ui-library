import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router"

import { navigation } from "@/app/navigation"
import { RootLayout } from "@/app/root-layout"

const rootRoute = createRootRoute({
  component: RootLayout,
})

const sectionRoutes = navigation.map((item) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: item.to,
    component: item.screen,
  }),
)

const routeTree = rootRoute.addChildren(sectionRoutes)

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
