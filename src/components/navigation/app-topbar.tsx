import { useRouterState } from "@tanstack/react-router"
import { LogOut, Moon, Sun, User } from "lucide-react"
import { useState, useSyncExternalStore } from "react"

import { navigation } from "@/app/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const THEME_KEY = "coldop-theme"

type ThemeMode = "light" | "dark"

const demoUser = {
  name: "Store Admin",
  mobileNumber: "98765 43210",
  role: "Admin",
}

function resolvePageTitle(pathname: string) {
  return navigation.find((item) => item.to === pathname)?.label ?? "Coldop"
}

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return initials || "?"
}

function applyTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle("dark", mode === "dark")
}

function readStoredTheme(): ThemeMode | null {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === "light" || stored === "dark") return stored
  return null
}

if (typeof document !== "undefined") {
  const stored = readStoredTheme()
  if (stored) applyTheme(stored)
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function getThemeSnapshot(): ThemeMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

function useThemeMode() {
  return useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light" as const)
}

function setTheme(mode: ThemeMode) {
  applyTheme(mode)
  localStorage.setItem(THEME_KEY, mode)
}

function ThemeToggle() {
  const isClient = useIsClient()
  const resolvedMode = useThemeMode()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!isClient) {
    return (
      <Button variant="ghost" size="icon" disabled aria-label="Theme">
        <Sun className="text-muted-foreground" />
      </Button>
    )
  }

  const isDark = resolvedMode === "dark"

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <Tooltip>
        <TooltipTrigger
          delay={600}
          disabled={menuOpen}
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  aria-label="Change theme"
                >
                  {isDark ? <Moon /> : <Sun />}
                </Button>
              }
            />
          }
        />
        <TooltipContent side="bottom">Theme</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={resolvedMode}
            onValueChange={(value) => {
              if (value === "light" || value === "dark") setTheme(value)
            }}
          >
            <DropdownMenuRadioItem value="light">
              <Sun />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <Moon />
              Dark
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AppTopbar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const pageTitle = resolvePageTitle(pathname)

  return (
    <header className="bg-background flex shrink-0 border-b px-4 pt-[env(safe-area-inset-top)]">
      <div className="flex h-14 min-w-0 flex-1 items-center gap-1">
        <SidebarTrigger className="-ml-1 hidden md:inline-flex" />
        <div
          role="separator"
          aria-orientation="vertical"
          className="bg-muted-foreground/25 mx-2 hidden h-6 w-px shrink-0 rounded-full md:block"
        />
        <h1
          className="font-heading truncate text-lg font-medium tracking-tight"
          title={pageTitle}
        >
          {pageTitle}
        </h1>
      </div>

      <div className="ml-3 flex h-14 shrink-0 items-center gap-2">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-9 gap-2 px-2" />
            }
          >
            <Avatar className="size-7">
              <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                {getInitials(demoUser.name)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden max-w-24 truncate text-sm font-medium lg:inline">
              {demoUser.name}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">{demoUser.name}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {demoUser.mobileNumber}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {demoUser.role}
                  </Badge>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
