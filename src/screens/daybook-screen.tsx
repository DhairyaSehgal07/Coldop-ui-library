import { useMemo, useState } from "react"

import { DaybookToolbar } from "@/components/daybook/daybook-toolbar"
import { GatePassList } from "@/components/daybook/gate-pass-list"
import {
  gatePasses,
  type DirectionFilter,
  type SortKey,
  type StatusFilter,
} from "@/screens/gate-passes"
import { cn } from "cn"

const numberFormat = new Intl.NumberFormat("en-IN")

export function DaybookScreen() {
  const [query, setQuery] = useState("")
  const [direction, setDirection] = useState<DirectionFilter>("all")
  const [status, setStatus] = useState<StatusFilter>("any")
  const [sort, setSort] = useState<SortKey>("time")

  const book = useMemo(() => {
    let bagsIn = 0
    let bagsOut = 0
    let open = 0

    for (const pass of gatePasses) {
      if (pass.direction === "incoming") bagsIn += pass.bags
      else bagsOut += pass.bags
      if (pass.status === "open") open += 1
    }

    return { total: gatePasses.length, bagsIn, bagsOut, open }
  }, [])

  const passes = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return gatePasses
      .filter((pass) => {
        if (direction !== "all" && pass.direction !== direction) return false
        if (status !== "any" && pass.status !== status) return false
        if (!needle) return true

        return (
          pass.party.toLowerCase().includes(needle) ||
          pass.vehicle.toLowerCase().includes(needle) ||
          pass.number.toLowerCase().includes(needle) ||
          pass.variety.toLowerCase().includes(needle) ||
          pass.account.toLowerCase().includes(needle) ||
          String(pass.serial).includes(needle)
        )
      })
      .sort((a, b) => {
        if (sort === "party") return a.party.localeCompare(b.party)
        return new Date(b.time).getTime() - new Date(a.time).getTime()
      })
  }, [direction, query, sort, status])

  const narrowed = passes.length !== book.total

  return (
    <div className="flex min-h-full flex-col gap-5 bg-muted/40 px-4 py-5 md:px-8 md:py-6">
      <section aria-label="Daybook summary" className="overflow-hidden rounded-2xl border bg-card">
        <dl className="grid grid-cols-2 sm:grid-cols-4">
          <SummaryFigure label="Passes" value={book.total} />
          <SummaryFigure label="Bags in" value={book.bagsIn} accent className="border-l" />
          <SummaryFigure
            label="Bags out"
            value={book.bagsOut}
            className="border-t sm:border-t-0 sm:border-l"
          />
          <SummaryFigure label="Open" value={book.open} className="border-t border-l sm:border-t-0" />
        </dl>
        {narrowed ? (
          <p className="border-t px-4 py-2 text-xs text-muted-foreground tabular-nums md:px-5">
            Showing {numberFormat.format(passes.length)} of {numberFormat.format(book.total)}
          </p>
        ) : null}
      </section>

      <DaybookToolbar
        query={query}
        onQueryChange={setQuery}
        direction={direction}
        onDirectionChange={setDirection}
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onSortChange={setSort}
      />
      <GatePassList passes={passes} />
    </div>
  )
}

function SummaryFigure({
  label,
  value,
  accent,
  className,
}: {
  label: string
  value: number
  accent?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex flex-col-reverse px-4 py-3.5 md:px-5 md:py-4", className)}>
      <dt className="mt-0.5 text-xs text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "font-heading text-2xl font-medium tracking-tight tabular-nums",
          accent && "text-primary",
        )}
      >
        {numberFormat.format(value)}
      </dd>
    </div>
  )
}
