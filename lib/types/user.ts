/**
 * The three roles a HireLoop account can hold. Kept in sync with the
 * role config in `lib/auth.ts`.
 */
export const USER_ROLES = ["admin", "recruiter", "seeker"] as const

export type UserRole = (typeof USER_ROLES)[number]

/**
 * Row data the admin users table needs — the subset of better-auth's
 * `UserWithRole` rendered in the users management UI. Legacy accounts
 * may be missing the optional fields.
 */
export type AdminUserRecord = {
  id: string
  name: string
  email: string
  emailVerified?: boolean
  image?: string | null
  role?: string
  banned?: boolean | null
  createdAt?: Date
}

/**
 * Normalizes a stored role string into a known `UserRole`. Missing or
 * unknown values fall back to "seeker", matching how the rest of the
 * app treats legacy users (see the auth config's `defaultValue`).
 */
export const toUserRole = (role?: string | null): UserRole =>
  (USER_ROLES as readonly string[]).includes(role ?? "")
    ? (role as UserRole)
    : "seeker"
