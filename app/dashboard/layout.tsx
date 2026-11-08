import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashBoardSidebar } from "@/app/components/DashBoardSidebar"
import { requireAuth } from "@/lib/session"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Bounce unauthenticated visitors to the sign-in page.
  await requireAuth()

  return (
    <SidebarProvider>
      <DashBoardSidebar  />
      <main className="bg-[#0B0B14]">
        <SidebarTrigger  />
        {children}
      </main>
    </SidebarProvider>
  )
}
