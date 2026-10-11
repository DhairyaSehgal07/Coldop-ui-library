import { useEffect, useState } from "react"
import { motion } from "motion/react"

import { ColdopMark } from "@/components/brand/ColdopMark"
import { SPLASH_COLOR } from "@/lib/pwa"

const HOLD_MS = 1600
const REDUCED_HOLD_MS = 520
const EXIT_EASE = [0.4, 0, 1, 1] as const
const ENTER_EASE = [0.22, 1, 0.36, 1] as const

type SplashScreenProps = {
  onHoldComplete: () => void
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(media.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  return reduced
}

export function SplashScreen({ onHoldComplete }: SplashScreenProps) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const hold = window.setTimeout(
      onHoldComplete,
      reduced ? REDUCED_HOLD_MS : HOLD_MS,
    )
    return () => window.clearTimeout(hold)
  }, [onHoldComplete, reduced])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center select-none"
      style={{ backgroundColor: SPLASH_COLOR }}
      initial={{ opacity: reduced ? 0 : 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
      transition={{ duration: reduced ? 0.2 : 0.4, ease: EXIT_EASE }}
      aria-hidden="true"
    >
      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: reduced
            ? { opacity: 1, transition: { duration: 0.2 } }
            : { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
        }}
      >
        <motion.div
          className="text-white"
          variants={
            reduced
              ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
              : {
                  hidden: { opacity: 0, scale: 0.86, filter: "blur(8px)" },
                  show: {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                      mass: 0.7,
                    },
                  },
                }
          }
        >
          <ColdopMark className="size-20" />
        </motion.div>
        <motion.p
          className="mt-6 font-heading text-[2.75rem] leading-none font-medium whitespace-nowrap text-white"
          variants={
            reduced
              ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
              : {
                  hidden: { opacity: 0, y: 12, letterSpacing: "0.2em" },
                  show: {
                    opacity: 1,
                    y: 0,
                    letterSpacing: "-0.03em",
                    transition: { duration: 0.55, ease: ENTER_EASE },
                  },
                }
          }
        >
          Coldop
        </motion.p>
        <motion.p
          className="mt-3 text-sm text-white/70"
          variants={
            reduced
              ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
              : {
                  hidden: { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: ENTER_EASE },
                  },
                }
          }
        >
          Cold storage inventory
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
