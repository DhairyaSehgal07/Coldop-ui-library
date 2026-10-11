import {
  BookOpen,
  ChartColumn,
  Menu,
  User,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import type { ReactElement } from "react"

import {
  AnalyticsScreen,
  DaybookScreen,
  FinancesScreen,
  MoreScreen,
  PeopleScreen,
} from "@/screens/section-screen"

export type NavPath = "/" | "/people" | "/analytics" | "/finances" | "/more"

export type NavItem = {
  to: NavPath
  label: string
  icon: LucideIcon
  screen: () => ReactElement
}

export const navigation: NavItem[] = [
  { to: "/", label: "Daybook", icon: BookOpen, screen: DaybookScreen },
  { to: "/people", label: "People", icon: User, screen: PeopleScreen },
  { to: "/analytics", label: "Analytics", icon: ChartColumn, screen: AnalyticsScreen },
  { to: "/finances", label: "Finances", icon: Wallet, screen: FinancesScreen },
  { to: "/more", label: "More", icon: Menu, screen: MoreScreen },
]
