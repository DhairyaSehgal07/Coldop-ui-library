import { ArrowDownLeft, ArrowUpRight, ListFilter, RefreshCw, Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "cn"
import type { DirectionFilter, SortKey, StatusFilter } from "@/screens/gate-passes"

const directions: {
  value: DirectionFilter
  label: string
  icon?: typeof ArrowDownLeft
}[] = [
  { value: "all", label: "All" },
  { value: "incoming", label: "Incoming", icon: ArrowDownLeft },
  { value: "outgoing", label: "Outgoing", icon: ArrowUpRight },
]

const statuses: { value: StatusFilter; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "open", label: "Open" },
  { value: "completed", label: "Completed" },
]

const sortLabels: Record<SortKey, string> = {
  time: "Time",
  party: "Party",
}

type DaybookToolbarProps = {
  query: string
  onQueryChange: (value: string) => void
  direction: DirectionFilter
  onDirectionChange: (value: DirectionFilter) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  sort: SortKey
  onSortChange: (value: SortKey) => void
}

export function DaybookToolbar({
  query,
  onQueryChange,
  direction,
  onDirectionChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}: DaybookToolbarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [draftStatus, setDraftStatus] = useState<StatusFilter>(status)
  const [refreshing, setRefreshing] = useState(false)
  const filtersActive = status !== "any"

  function refresh() {
    if (refreshing) return
    setRefreshing(true)
    onQueryChange("")
    onDirectionChange("all")
    onStatusChange("any")
    onSortChange("time")
    setDraftStatus("any")
    setFiltersOpen(false)
    window.setTimeout(() => setRefreshing(false), 600)
  }

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
      <div className="relative min-w-0 lg:flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by party, vehicle, pass…"
          aria-label="Search gate passes"
          className="border-border bg-card pl-9 shadow-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Direction"
          className="flex h-9 shrink-0 items-center rounded-full border bg-card p-0.5"
        >
          {directions.map((item) => {
            const selected = direction === item.value
            const Icon = item.icon

            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onDirectionChange(item.value)}
                className={cn(
                  "inline-flex h-8 items-center gap-1 rounded-full px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
                  selected
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {Icon ? <Icon className="size-3.5" /> : null}
                {item.label}
              </button>
            )
          })}
        </div>

        <Sheet
          open={filtersOpen}
          onOpenChange={(open) => {
            setFiltersOpen(open)
            if (open) setDraftStatus(status)
          }}
        >
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Filters"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen(true)}
            className={cn(
              "shrink-0 bg-card",
              filtersActive && "border-transparent bg-primary/15 text-primary hover:bg-primary/20",
            )}
          >
            <ListFilter />
          </Button>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-3 px-6 pb-2">
              <p className="text-sm font-medium">Status</p>
              <div className="flex flex-wrap gap-2">
                {statuses.map((item) => {
                  const selected = draftStatus === item.value

                  return (
                    <Button
                      key={item.value}
                      type="button"
                      variant="outline"
                      size="sm"
                      aria-pressed={selected}
                      onClick={() => setDraftStatus(item.value)}
                      className={cn(
                        "rounded-full border-border bg-background",
                        selected &&
                          "border-transparent bg-primary/15 text-primary hover:bg-primary/20",
                      )}
                    >
                      {item.label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <SheetFooter className="flex-row">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setDraftStatus("any")}
              >
                Clear
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={() => {
                  onStatusChange(draftStatus)
                  setFiltersOpen(false)
                }}
              >
                Apply
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Select
          value={sort}
          onValueChange={(value) => {
            if (value === "time" || value === "party") onSortChange(value)
          }}
        >
          <SelectTrigger
            size="sm"
            aria-label="Sort gate passes"
            className="h-9 shrink-0 border-border bg-card px-3"
          >
            <span className="text-muted-foreground">Sort</span>
            <SelectValue>{sortLabels[sort]}</SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="time">Time</SelectItem>
            <SelectItem value="party">Party</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Refresh"
          disabled={refreshing}
          onClick={refresh}
          className="shrink-0 bg-card"
        >
          <RefreshCw className={cn(refreshing && "animate-spin")} />
        </Button>
      </div>
    </div>
  )
}
