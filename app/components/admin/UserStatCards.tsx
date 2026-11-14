import type { LucideIcon } from "lucide-react"

export type UserStat = {
  id: string
  label: string
  value: number
  /** Optional right-aligned badge, e.g. share of all users. */
  badge?: string
  icon: LucideIcon
  /** Tile colors behind the icon, e.g. "bg-[#5C53FE]/15 text-[#8B85FF]". */
  iconClass: string
}

type UserStatCardsProps = {
  stats: UserStat[]
}

const cardClass =
  "rounded-2xl border border-white/10 bg-[#101010]/95 p-5 shadow-[inset_0_3px_10px_rgba(255,255,255,0.04)]"

const badgeClass =
  "rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60"

/**
 * Overview tiles at the top of the users management page — one card
 * per stat, mirroring the dashboard overview style.
 */
export function UserStatCards({ stats }: UserStatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.id} className={cardClass}>
          <div className="flex items-start justify-between">
            <span
              className={`flex size-10 items-center justify-center rounded-lg ${stat.iconClass}`}
              aria-hidden
            >
              <stat.icon className="size-5" />
            </span>

            {stat.badge && <span className={badgeClass}>{stat.badge}</span>}
          </div>

          <p className="mt-4 text-sm text-white/60">{stat.label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-white">
            {stat.value.toLocaleString()}
          </p>
        </article>
      ))}
    </div>
  )
}
