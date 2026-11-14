import { getUsers } from "@/app/api/user"
import { AdminUsersView } from "@/app/components/admin/AdminUsersView"

/**
 * Admin users management: overview stats plus a searchable table with
 * a per-row role toggle. The role changes are handled client-side for
 * now — persisting them is implemented separately.
 */
export default async function AdminUsersPage() {
  const { users = [] } = await getUsers()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <span className="text-white/50">Admin</span>
        <span className="text-white/30">/</span>
        <span className="text-white/90">User Management</span>
      </nav>

      {/* Page heading */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-[28px] leading-[1.15] font-bold tracking-tight text-white">
            User Management
          </h1>
          <p className="text-sm text-white/60">
            All registered accounts and their roles.
          </p>
        </div>
      </header>

      <AdminUsersView users={users} />
    </div>
  )
}
