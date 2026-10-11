import { AnimatePresence } from "motion/react"

import { SplashScreen } from "@/components/splash/SplashScreen"
import { useSplash } from "@/hooks/use-splash"
import { HomeScreen } from "@/screens/home/HomeScreen"

export default function App() {
  const { visible, dismiss } = useSplash()

  return (
    <div className="h-dvh overflow-hidden overscroll-none">
      <HomeScreen />
      <AnimatePresence>
        {visible ? (
          <SplashScreen key="splash" onHoldComplete={dismiss} />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
