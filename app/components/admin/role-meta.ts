import type { UserRole } from "@/lib/types/user"

type RoleMeta = {
  /** Human-readable name shown in selects, tabs and stat cards. */
  label: string
  /** Tailwind text color for the role's accent text. */
  text: string
  /** Tailwind background color for the small role dot. */
  dot: string
  /** Tailwind background for tinted tiles behind the role's icon. */
  tint: string
}

/**
 * Single source of truth for how each role is presented across the
 * admin users UI (role select, filter tabs and stat cards).
 */
export const roleMeta: Record<UserRole, RoleMeta> = {
  admin: {
    label: "Admin",
    text: "text-[#A78BFA]",
    dot: "bg-[#A78BFA]",
    tint: "bg-[#A78BFA]/15",
  },
  recruiter: {
    label: "Recruiter",
    text: "text-sky-400",
    dot: "bg-sky-400",
    tint: "bg-sky-400/15",
  },
  seeker: {
    label: "Seeker",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    tint: "bg-emerald-400/15",
  },
}
