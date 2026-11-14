"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { USER_ROLES, toUserRole, type UserRole } from "@/lib/types/user"
import { cn } from "@/lib/utils"

import { roleMeta } from "./role-meta"

type RoleSelectProps = {
  /** Role currently assigned to the row's user. */
  value: UserRole
  /** Called with the newly selected role. */
  onValueChange: (role: UserRole) => void
  className?: string
}

/**
 * Per-row role toggle for the admin users table. The parent owns the
 * value so it can persist (or roll back) the change wherever the
 * update logic allows.
 */
export function RoleSelect({
  value,
  onValueChange,
  className,
}: RoleSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(nextRole) => {
        if (typeof nextRole === "string") {
          onValueChange(toUserRole(nextRole))
        }
      }}
    >
      <SelectTrigger
        aria-label="User role"
        className={cn(
          "w-32 border-white/10 bg-[#1A1A1F] text-xs hover:bg-white/5 focus-visible:border-white/20 focus-visible:ring-white/10 data-[placeholder]:text-white/40",
          roleMeta[value].text,
          className
        )}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="border border-white/10 bg-[#141419] text-white ring-white/10">
        {USER_ROLES.map((role) => (
          <SelectItem
            key={role}
            value={role}
            className="focus:bg-white/10 focus:text-white data-highlighted:bg-white/10 data-highlighted:text-white"
          >
            <span
              aria-hidden
              className={cn("size-1.5 rounded-full", roleMeta[role].dot)}
            />
            {roleMeta[role].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
