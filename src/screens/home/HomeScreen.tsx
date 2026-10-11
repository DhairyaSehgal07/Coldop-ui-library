export function HomeScreen() {
  return (
    <main className="flex h-full min-h-dvh flex-col bg-background px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pr-[max(1.5rem,env(safe-area-inset-right))] pb-[max(1.25rem,env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))]">
      <header className="pt-6">
        <h1 className="font-heading text-[1.75rem] leading-none font-medium tracking-tight text-foreground">
          Coldop
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cold storage inventory
        </p>
      </header>
    </main>
  )
}
