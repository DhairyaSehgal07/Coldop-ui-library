import {
  APP_CANVAS_COLOR,
  SPLASH_COLOR,
  SPLASH_SEEN_KEY,
} from "@/lib/splash-tokens"

export { APP_CANVAS_COLOR, SPLASH_COLOR, SPLASH_SEEN_KEY }

const SPLASH_CLASS = "coldop-splash"

export function isInstalledPwa() {
  const iosNavigator = navigator as Navigator & { standalone?: boolean }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    iosNavigator.standalone === true
  )
}

function hasSeenSplash() {
  try {
    return sessionStorage.getItem(SPLASH_SEEN_KEY) === "1"
  } catch {
    return false
  }
}

export function shouldShowSplash() {
  if (hasSeenSplash()) return false
  if (import.meta.env.DEV) return true
  return isInstalledPwa()
}

function setThemeColor(color: string) {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", color)
}

export function paintSplashBackdrop() {
  if (!shouldShowSplash()) {
    document.documentElement.classList.remove(SPLASH_CLASS)
    setThemeColor(APP_CANVAS_COLOR)
    return
  }

  document.documentElement.classList.add(SPLASH_CLASS)
  setThemeColor(SPLASH_COLOR)
}

export function clearSplashBackdrop() {
  document.documentElement.classList.remove(SPLASH_CLASS)
  setThemeColor(APP_CANVAS_COLOR)
}

export function rememberSplash() {
  try {
    sessionStorage.setItem(SPLASH_SEEN_KEY, "1")
  } catch {
    // Private mode can block storage; the splash will simply play again next launch.
  }
}
