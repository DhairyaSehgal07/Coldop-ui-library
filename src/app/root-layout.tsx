import { Outlet } from "@tanstack/react-router"

import { AppSidebar } from "@/components/navigation/app-sidebar"
import { AppTopbar } from "@/components/navigation/app-topbar"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"

export function RootLayout() {
  const isMobile = useIsMobile()

  return (
    <TooltipProvider>
      <SidebarProvider className="h-dvh">
        {isMobile ? null : <AppSidebar />}
        <SidebarInset className="min-h-0">
          <AppTopbar />
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[calc(4rem+max(0.75rem,env(safe-area-inset-bottom))+0.75rem)] md:pb-8">
            <Outlet />
          </div>
          {isMobile ? <BottomNav /> : null}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
