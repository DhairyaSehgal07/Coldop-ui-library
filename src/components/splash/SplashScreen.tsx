import { useEffect } from "react"
import { motion } from "motion/react"

import { ColdopMark } from "@/components/brand/ColdopMark"
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"

const HOLD_MS = 1600
const REDUCED_HOLD_MS = 520
const EXIT_EASE = [0.4, 0, 1, 1] as const
const ENTER_EASE = [0.22, 1, 0.36, 1] as const

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
}

const reducedContainerVariants = {
  hidden: {},
  show: { transition: { duration: 0.2 } },
}

const markVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 24, mass: 0.7 },
  },
}

const wordmarkVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ENTER_EASE },
  },
}

const taglineVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ENTER_EASE },
  },
}

const reducedChildVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
}

type SplashScreenProps = {
  onHoldComplete: () => void
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-splash select-none"
      initial={{ opacity: reduced ? 0 : 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
      transition={{ duration: reduced ? 0.2 : 0.4, ease: EXIT_EASE }}
      role="img"
      aria-label="Coldop, cold storage inventory"
    >
      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        animate="show"
        variants={reduced ? reducedContainerVariants : containerVariants}
        aria-hidden="true"
      >
        <motion.div
          className="text-white"
          variants={reduced ? reducedChildVariants : markVariants}
        >
          <ColdopMark className="size-20" />
        </motion.div>
        <motion.p
          className="mt-6 font-heading text-[2.75rem] leading-none font-medium whitespace-nowrap text-white"
          variants={reduced ? reducedChildVariants : wordmarkVariants}
        >
          Coldop
        </motion.p>
        <motion.p
          className="mt-3 text-sm text-white/70"
          variants={reduced ? reducedChildVariants : taglineVariants}
        >
          Cold storage inventory
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
