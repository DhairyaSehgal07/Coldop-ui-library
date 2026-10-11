import { useEffect, useRef, useState } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { motion, useReducedMotion } from "motion/react"

import { navigation } from "@/app/navigation"

const highlightSpring = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
} as const

const HIGHLIGHT_SIZE = 44

export function BottomNav() {
  const reduced = useReducedMotion() === true
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const barRef = useRef<HTMLDivElement>(null)
  const [x, setX] = useState(0)
  const activeIndex = Math.max(
    0,
    navigation.findIndex((item) => item.to === pathname),
  )

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const measure = () => {
      const link = bar.querySelectorAll("a").item(activeIndex)
      if (!link) return
      setX(link.offsetLeft + (link.offsetWidth - HIGHLIGHT_SIZE) / 2)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(bar)
    return () => observer.disconnect()
  }, [activeIndex])

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-3 md:hidden"
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div
        ref={barRef}
        className="pointer-events-auto relative flex w-full max-w-sm items-center justify-between rounded-full border border-border/80 bg-background/80 px-2 py-1.5 shadow-[0_10px_40px_-12px_oklch(0.25_0.03_155/0.35)] backdrop-blur-xl"
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-2 left-0 size-11 rounded-[1.25rem] bg-foreground/10"
          initial={false}
          animate={{ x }}
          transition={reduced ? { duration: 0 } : highlightSpring}
        />
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              activeOptions={{ exact: true }}
              className="relative flex size-12 items-center justify-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
            >
              {({ isActive }) => (
                <motion.span
                  className={
                    isActive
                      ? "relative text-primary"
                      : "relative text-muted-foreground"
                  }
                  animate={reduced ? undefined : { scale: isActive ? 1.06 : 1 }}
                  whileTap={reduced ? undefined : { scale: 0.92 }}
                  transition={highlightSpring}
                >
                  <Icon
                    className="size-6"
                    strokeWidth={isActive ? 2.25 : 1.75}
                  />
                </motion.span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
