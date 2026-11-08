import { redirect } from "next/navigation"

import { isUserRole, type UserRole } from "@/lib/auth"
import { getSession } from "@/lib/session"

export default async function DashboardIndexPage() {
  const session = await getSession()

  if (!session) {
    redirect("/sign-in")
  }

  // Send each role to its own dashboard home; users with no stored role are
  // treated as seekers, matching the sign-up default.
  const value: unknown = session.user.role
  const role: UserRole = isUserRole(value) ? value : "seeker"

  redirect(`/dashboard/${role}`)
}
