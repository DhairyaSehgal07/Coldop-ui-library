import { useEffect, useMemo, useRef } from "react"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion"
import type { GatePass } from "@/screens/gate-passes"
import { cn } from "cn"

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
})

const dayFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
})

const numberFormat = new Intl.NumberFormat("en-IN")

const cardSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.7,
}

type GatePassListProps = {
  passes: GatePass[]
}

type DayGroup = {
  key: string
  label: string
  bagsIn: number
  bagsOut: number
  rows: { pass: GatePass; index: number }[]
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

function dayLabel(date: Date, today: number) {
  const day = startOfDay(date)
  if (day === today) return "Today"
  if (day === today - 86_400_000) return "Yesterday"
  return dayFormatter.format(date)
}

function groupPasses(passes: GatePass[], today: number): DayGroup[] {
  const groups = new Map<number, DayGroup>()
  let index = 0

  for (const pass of passes) {
    const date = new Date(pass.time)
    const key = startOfDay(date)
    let group = groups.get(key)

    if (!group) {
      group = {
        key: String(key),
        label: dayLabel(date, today),
        bagsIn: 0,
        bagsOut: 0,
        rows: [],
      }
      groups.set(key, group)
    }

    if (pass.direction === "incoming") group.bagsIn += pass.bags
    else group.bagsOut += pass.bags
    group.rows.push({ pass, index })
    index += 1
  }

  return [...groups.values()].sort((a, b) => Number(b.key) - Number(a.key))
}

function ownershipLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function GatePassList({ passes }: GatePassListProps) {
  const reduced = usePrefersReducedMotion()
  const firstPaint = useRef(true)
  const groups = useMemo(() => groupPasses(passes, startOfDay(new Date())), [passes])

  useEffect(() => {
    firstPaint.current = false
  }, [])

  return (
    <div className="@container overflow-hidden rounded-2xl border bg-card">
      {passes.length === 0 ? (
        <p className="px-4 py-16 text-center text-sm text-muted-foreground">
          No gate passes match these filters.
        </p>
      ) : (
        groups.map((group, groupIndex) => (
          <section key={group.key} className={cn(groupIndex > 0 && "border-t")}>
            <div className="flex items-baseline justify-between gap-3 border-b bg-muted/25 px-4 py-2.5 md:px-5">
              <h2 className="font-heading text-sm font-medium tracking-tight">{group.label}</h2>
              <p className="text-xs text-muted-foreground tabular-nums">
                {numberFormat.format(group.bagsIn)} in · {numberFormat.format(group.bagsOut)} out
              </p>
            </div>
            <ul className="divide-y">
              <AnimatePresence mode="popLayout" initial>
                {group.rows.map(({ pass, index }) => (
                  <PassRow
                    key={pass.id}
                    pass={pass}
                    index={index}
                    reduced={reduced}
                    stagger={firstPaint.current && !reduced}
                  />
                ))}
              </AnimatePresence>
            </ul>
          </section>
        ))
      )}
    </div>
  )
}

function PassRow({
  pass,
  index,
  reduced,
  stagger,
}: {
  pass: GatePass
  index: number
  reduced: boolean
  stagger: boolean
}) {
  const incoming = pass.direction === "incoming"
  const Icon = incoming ? ArrowDownLeft : ArrowUpRight
  const place = pass.lot ? `Lot ${pass.lot}` : pass.vehicle
  const detail = [pass.variety, place].join(" · ")
  const reference = [
    ownershipLabel(pass.ownership),
    `${incoming ? "IGP" : "OGP"} #${pass.serial}`,
    timeFormatter.format(new Date(pass.time)),
    incoming && pass.manualCount != null ? `Manual ${pass.manualCount}` : null,
  ]
    .filter(Boolean)
    .join(" · ")
  const enter = reduced ? { opacity: 0 } : { opacity: 0, y: 8 }
  const shown = reduced ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <motion.li
      layout
      initial={enter}
      animate={shown}
      exit={{ opacity: 0 }}
      transition={{
        layout: reduced ? { duration: 0 } : cardSpring,
        opacity: { duration: 0.2 },
        y: reduced ? { duration: 0 } : cardSpring,
        delay: stagger ? index * 0.04 : 0,
      }}
      className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-muted/30 @min-[720px]:grid @min-[720px]:grid-cols-[auto_minmax(0,1.05fr)_minmax(0,1.7fr)_4.5rem_auto] @min-[720px]:items-center @min-[720px]:gap-x-6 @min-[720px]:px-5 @min-[720px]:py-3.5"
    >
      <span
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg @min-[720px]:mt-0",
          incoming ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
        )}
      >
        <Icon className="size-3.5" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 @min-[720px]:contents">
        <div className="flex items-start justify-between gap-3 @min-[720px]:block">
          <div className="min-w-0">
            <p className="truncate font-heading text-[15px] font-medium tracking-tight" title={pass.party}>
              {pass.party}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">Acct {pass.account}</p>
          </div>
          <BagCount pass={pass} className="flex @min-[720px]:hidden" />
        </div>

        <div className="flex items-end justify-between gap-3 @min-[720px]:contents">
          <div className="min-w-0">
            <p className="text-sm text-foreground/80">{detail}</p>
            <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">{reference}</p>
          </div>
          <div className="@min-[720px]:justify-self-end">
            {pass.status === "open" ? (
              <span className="inline-flex h-5 items-center rounded-full bg-primary/10 px-2 text-[11px] font-medium text-primary">
                Open
              </span>
            ) : null}
          </div>
        </div>

        <BagCount pass={pass} className="hidden @min-[720px]:flex" />
      </div>
    </motion.li>
  )
}

function BagCount({ pass, className }: { pass: GatePass; className?: string }) {
  const incoming = pass.direction === "incoming"

  return (
    <div className={cn("shrink-0 flex-col items-end leading-none @min-[720px]:justify-self-end", className)}>
      <span
        className={cn(
          "font-heading text-xl font-medium tracking-tight tabular-nums",
          incoming ? "text-primary" : "text-foreground",
        )}
      >
        {numberFormat.format(pass.bags)}
      </span>
      <span className="mt-1 text-[11px] text-muted-foreground">{incoming ? "bags" : "issued"}</span>
    </div>
  )
}
