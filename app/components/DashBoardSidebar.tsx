"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { authClient, useSession } from "@/lib/auth-client"

import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  CreditCard,
  Settings,
  Bookmark,
  FileText,
  ClipboardList,
  LogOut,
  PlusCircleIcon,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"

type UserRole = "admin" | "seeker" | "recruiter"

type MenuItem = {
  id: number
  name: string
  url: string
  icon: LucideIcon
}

const menuItemByRole: Record<UserRole, MenuItem[]> = {
  admin: [
    { id: 1, name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: 2, name: "Users", url: "/dashboard/users", icon: Users },
    { id: 3, name: "Companies", url: "/dashboard/companies", icon: Building2 },
    { id: 4, name: "Jobs", url: "/dashboard/jobs", icon: BriefcaseBusiness },
    { id: 5, name: "Payments", url: "/dashboard/payments", icon: CreditCard },
    { id: 6, name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],

  seeker: [
    { id: 1, name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { id: 2, name: "Jobs", url: "/dashboard/browse-jobs", icon: BriefcaseBusiness },
    { id: 3, name: "Saved Jobs", url: "/dashboard/saved-jobs", icon: Bookmark },
    { id: 4, name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { id: 5, name: "Billing", url: "/dashboard/billing", icon: CreditCard },
    { id: 6, name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],

  recruiter: [
    { id: 1, name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { id: 2, name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseBusiness },
    { id: 3, name: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircleIcon },
    { id: 4, name: "Applications", url: "/dashboard/applications", icon: ClipboardList },
    { id: 5, name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],
}

export function DashBoardSidebar() {
  const { data: session, isPending } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push("/sign-in")
    router.refresh()
  }

  // `role` is missing on legacy users created before the field existed, so
  // anything other than a known role falls back to the seeker menu (this
  // matches how the server treats them on /dashboard).
  const role = session?.user.role

  const menuItems =
    role === "admin" || role === "recruiter"
      ? menuItemByRole[role]
      : menuItemByRole.seeker

  return (
    <Sidebar >
      <SidebarHeader>
        {/* <div className="px-2 py-3 text-2xl font-bold">
          <span className="text-sky-400">hire</span>
          <span className="text-orange-400">loop</span>
        </div> */}
      </SidebarHeader >

      <SidebarContent >
        <SidebarGroup>
          <SidebarMenu>
            {!isPending &&
              menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    render={<Link href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="min-w-0 px-1 py-1.5">
          {isPending ? (
            <p className="truncate text-xs text-neutral-400">Loading…</p>
          ) : (
            <>
              <p className="truncate text-sm font-medium text-white">
                {session?.user.name ?? "Signed out"}
              </p>
              <p className="truncate text-xs text-neutral-400">
                {session?.user.email}
              </p>
              <p className="mt-1 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-neutral-200">
                role: {role ?? "seeker"}
              </p>
            </>
          )}
        </div>
        {!isPending && session && (
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-md px-1 py-1.5 text-xs text-neutral-300 transition-colors hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}