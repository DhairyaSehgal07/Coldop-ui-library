import { RouterProvider } from "@tanstack/react-router"
import { AnimatePresence } from "motion/react"

import { router } from "@/app/router"
import { SplashScreen } from "@/components/splash/SplashScreen"
import { useSplash } from "@/hooks/use-splash"

export default function App() {
  const { visible, dismiss } = useSplash()

  return (
    <>
      <RouterProvider router={router} />
      <AnimatePresence>
        {visible ? (
          <SplashScreen key="splash" onHoldComplete={dismiss} />
        ) : null}
      </AnimatePresence>
    </>
  )
}
