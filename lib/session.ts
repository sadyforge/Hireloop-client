import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

/** Reads the better-auth session inside server components/layouts. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

/**
 * Server guard: unauthenticated visitors are redirected to the sign-in page.
 * Role checks are intentionally not enforced, so a signed-in user can open
 * every role's dashboard while testing; the sidebar still follows the
 * signed-in account's role.
 */
export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/sign-in")
  }

  return session
}
