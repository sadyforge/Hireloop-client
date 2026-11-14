import { auth } from "@/lib/auth"
import { headers } from "next/headers"

/**
 * Server-only user management helpers. Everything in this module
 * depends on better-auth (and MongoDB), so it must never be imported
 * from a client component — client-side calls belong in
 * `lib/api/user.ts` instead.
 */

/**
 * Lists every registered account via the better-auth admin plugin.
 * Responds with `{ users, total }` and requires an admin session.
 */
export const getUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name", // The field to sort by.
      sortDirection: "desc", // The direction to sort by.
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  })
  return users
}
