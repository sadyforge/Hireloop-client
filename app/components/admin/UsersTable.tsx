"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  USER_ROLES,
  type AdminUserRecord,
  type UserRole,
} from "@/lib/types/user"
import { cn } from "@/lib/utils"

import { RoleSelect } from "./RoleSelect"
import { roleMeta } from "./role-meta"

type UsersTableProps = {
  /** Every user fetched on the server. */
  users: AdminUserRecord[]
  /** Role currently shown for each user, keyed by user id. */
  roles: Record<string, UserRole>
  /** Called when a row's role toggle picks a new role. */
  onRoleChange: (userId: string, role: UserRole) => void
}

const headClass =
  "h-auto px-5 py-3 text-xs font-medium tracking-wide text-white/50 uppercase"

const cellClass = "px-5 py-4"

const cardClass =
  "overflow-hidden rounded-2xl border border-white/10 bg-[#101010]/95 shadow-[inset_0_3px_10px_rgba(255,255,255,0.04)]"

const tabClass =
  "rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors"

const cellVis = {
  verified: "hidden md:table-cell",
  joined: "hidden lg:table-cell",
} satisfies Record<string, string>

type RoleFilter = "all" | UserRole

const formatJoinedDate = (date?: Date | string | null) => {
  if (!date) {
    return "—"
  }

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return "—"
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Users list for the admin dashboard. Search and the role filter tabs
 * are client-side only; the role column is a per-row toggle wired to
 * the parent through `onRoleChange`.
 */
export function UsersTable({ users, roles, onRoleChange }: UsersTableProps) {
  const [query, setQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all")

  const visibleUsers = useMemo(() => {
    const search = query.trim().toLowerCase()

    return users.filter((user) => {
      const matchesRole = roleFilter === "all" || roles[user.id] === roleFilter
      const matchesSearch =
        search === "" ||
        (user.name ?? "").toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)

      return matchesRole && matchesSearch
    })
  }, [users, roles, query, roleFilter])

  const roleFilterTabs: { key: RoleFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: users.length },
    ...USER_ROLES.map((role) => ({
      key: role,
      label: roleMeta[role].label,
      count: users.filter((user) => roles[user.id] === role).length,
    })),
  ]

  return (
    <section className={cardClass}>
      {/* Card header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-heading text-lg font-bold text-white">
            Platform Users
          </h2>
          <p className="text-xs text-white/50">
            {users.length} registered{" "}
            {users.length === 1 ? "account" : "accounts"}
          </p>
        </div>

        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or email…"
            aria-label="Search users"
            className="w-full border-white/10 bg-[#1A1A1F] pr-3 pl-9 text-sm text-white placeholder:text-white/40 focus-visible:border-white/20 focus-visible:ring-white/10 sm:w-64"
          />
        </div>
      </div>

      {/* Role filter tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 px-5 py-3">
        {roleFilterTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setRoleFilter(tab.key)}
            aria-pressed={roleFilter === tab.key}
            className={cn(
              tabClass,
              roleFilter === tab.key
                ? "bg-white/10 text-white"
                : "text-white/50 hover:bg-white/5 hover:text-white/80"
            )}
          >
            {tab.label}
            <span className="ml-1.5 tabular-nums">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className={cn(headClass, "w-[34%]")}>User</TableHead>
              <TableHead className={cn(headClass, "w-[22%]")}>Role</TableHead>
              <TableHead className={cn(headClass, cellVis.verified, "w-[14%]")}>
                Verified
              </TableHead>
              <TableHead className={cn(headClass, cellVis.joined, "w-[16%]")}>
                Joined
              </TableHead>
              <TableHead className={headClass}>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visibleUsers.length > 0 ? (
              visibleUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-white/5 hover:bg-white/[0.03]"
                >
                  {/* User */}
                  <TableCell className={cn(cellClass, "text-[#EDEDEF]")}>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#5C53FE]/15 text-sm font-semibold text-[#8B85FF]"
                        aria-hidden
                      >
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </span>

                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate font-medium">
                          {user.name || user.email}
                        </span>
                        <span className="truncate text-xs text-white/50">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role toggle */}
                  <TableCell className={cellClass}>
                    <RoleSelect
                      value={roles[user.id]}
                      onValueChange={(nextRole) =>
                        onRoleChange(user.id, nextRole)
                      }
                    />
                  </TableCell>

                  {/* Email verification */}
                  <TableCell className={cn(cellClass, cellVis.verified)}>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 text-xs",
                        user.emailVerified
                          ? "text-emerald-400"
                          : "text-white/50"
                      )}
                    >
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-current"
                      />
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </span>
                  </TableCell>

                  {/* Joined */}
                  <TableCell
                    className={cn(cellClass, "text-white/70", cellVis.joined)}
                  >
                    {formatJoinedDate(user.createdAt)}
                  </TableCell>

                  {/* Account status */}
                  <TableCell className={cellClass}>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 text-xs",
                        user.banned ? "text-red-400" : "text-emerald-400"
                      )}
                    >
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-current"
                      />
                      {user.banned ? "Banned" : "Active"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="px-5 py-16 text-center text-sm text-white/50"
                >
                  No users match your search or filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-5 py-3 text-xs text-white/50">
        Showing {visibleUsers.length} of {users.length}{" "}
        {users.length === 1 ? "user" : "users"}
      </div>
    </section>
  )
}
