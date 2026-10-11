import { useCallback, useState } from "react"

import { clearSplashBackdrop, rememberSplash, shouldShowSplash } from "@/lib/pwa"

export function useSplash() {
  const [visible, setVisible] = useState(shouldShowSplash)

  const dismiss = useCallback(() => {
    rememberSplash()
    setVisible(false)
    clearSplashBackdrop()
  }, [])

  return { visible, dismiss }
}
