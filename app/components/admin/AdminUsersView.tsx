"use client"

import { useMemo, useState } from "react"
import { Building2, ShieldCheck, UserRound, Users } from "lucide-react"

import {
  toUserRole,
  type AdminUserRecord,
  type UserRole,
} from "@/lib/types/user"

import { UserStatCards, type UserStat } from "./UserStatCards"
import { UsersTable } from "./UsersTable"
import { updateUserRole } from "@/lib/actions/user"

type AdminUsersViewProps = {
  /** All users fetched on the server. */
  users: AdminUserRecord[]
}

const shareOfTotal = (count: number, total: number) =>
  `${((count / total) * 100).toFixed(1)}%`

/**
 * Client shell for the admin users management page. Owns the per-row
 * role state so role changes are reflected immediately; persisting
 * them to the database is handled in `handleRoleChange` once the
 * update logic is implemented.
 */
export function AdminUsersView({ users }: AdminUsersViewProps) {
  const [roles, setRoles] = useState<Record<string, UserRole>>(() =>
    Object.fromEntries(users.map((user) => [user.id, toUserRole(user.role)]))
  )

  // TODO: persist the role change to the backend (e.g. via
  // `authClient.admin.setRole`) once the update logic is implemented.
  // For now the change is only reflected in the local UI state.
  const handleRoleChange =async (userId: string, role: UserRole) => {
    setRoles((current) => ({ ...current, [userId]: role }))
    const res=await updateUserRole(userId,role)
    console.log('res after update',res)
    if(res.modifiedCount>0){
      console.log("Role updated successfully")
    }
  }

  const stats = useMemo<UserStat[]>(() => {
    const total = users.length
    const countByRole: Record<UserRole, number> = {
      admin: 0,
      recruiter: 0,
      seeker: 0,
    }

    for (const user of users) {
      countByRole[roles[user.id]] += 1
    }

    return [
      {
        id: "total",
        label: "Total Users",
        value: total,
        icon: Users,
        iconClass: "bg-[#5C53FE]/15 text-[#8B85FF]",
      },
      {
        id: "admins",
        label: "Admins",
        value: countByRole.admin,
        badge: shareOfTotal(countByRole.admin, total),
        icon: ShieldCheck,
        iconClass: "bg-[#A78BFA]/15 text-[#A78BFA]",
      },
      {
        id: "recruiters",
        label: "Recruiters",
        value: countByRole.recruiter,
        badge: shareOfTotal(countByRole.recruiter, total),
        icon: Building2,
        iconClass: "bg-sky-400/15 text-sky-400",
      },
      {
        id: "seekers",
        label: "Seekers",
        value: countByRole.seeker,
        badge: shareOfTotal(countByRole.seeker, total),
        icon: UserRound,
        iconClass: "bg-emerald-400/15 text-emerald-400",
      },
    ]
  }, [users, roles])

  return (
    <div className="flex flex-col gap-6">
      <UserStatCards stats={stats} />

      <UsersTable users={users} roles={roles} onRoleChange={handleRoleChange} />
    </div>
  )
}
