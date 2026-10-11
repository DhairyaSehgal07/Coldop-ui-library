type SectionScreenProps = {
  title: string
}

export function SectionScreen({ title }: SectionScreenProps) {
  return (
    <div className="px-6 pt-[max(1.5rem,env(safe-area-inset-top))] md:px-8 md:pt-2">
      <h1 className="font-heading text-[1.75rem] leading-none font-medium tracking-tight text-foreground">
        {title}
      </h1>
    </div>
  )
}

export function DaybookScreen() {
  return <SectionScreen title="Daybook" />
}

export function PeopleScreen() {
  return <SectionScreen title="People" />
}

export function AnalyticsScreen() {
  return <SectionScreen title="Analytics" />
}

export function FinancesScreen() {
  return <SectionScreen title="Finances" />
}

export function MoreScreen() {
  return <SectionScreen title="More" />
}
