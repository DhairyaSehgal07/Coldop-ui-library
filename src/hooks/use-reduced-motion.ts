import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function getPrefersReducedMotion() {
  return window.matchMedia(QUERY).matches
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(getPrefersReducedMotion)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const onChange = () => setReduced(media.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  return reduced
}
