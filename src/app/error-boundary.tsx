import { Component, type ReactNode } from "react"

import { Button } from "@/components/ui/button"

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  hasError: boolean
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-heading text-xl font-medium">Something went wrong</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Reload Coldop and try again.
        </p>
        <Button type="button" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </div>
    )
  }
}
