import { Rocket, TrendingUp, Zap, type LucideIcon } from "lucide-react"

export type PlanId = "starter" | "growth" | "premium"

export type Billing = "monthly" | "yearly"

export type Plan = {
  id: PlanId
  name: string
  icon: LucideIcon
  monthly: number
  featured?: boolean
  features: string[]
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Rocket,
    monthly: 0,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    icon: TrendingUp,
    monthly: 17,
    featured: true,
    features: [
      "Daily AI match brief (top 10)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    icon: Zap,
    monthly: 99,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
]

/** Plan used when a checkout URL has no (or an unknown) ?plan= param. */
export const DEFAULT_PLAN_ID: PlanId = "growth"

export function resolvePlan(id?: string): Plan {
  const plan = PLANS.find((candidate) => candidate.id === id)
  if (plan) {
    return plan
  }

  return PLANS.find((candidate) => candidate.id === DEFAULT_PLAN_ID) as Plan
}

export function resolveBilling(value?: string): Billing {
  return value === "yearly" ? "yearly" : "monthly"
}

/** Price per month for the given billing cycle (yearly pre-pay gets -25%). */
export function monthlyPrice(plan: Plan, billing: Billing): number {
  return billing === "yearly" ? Math.round(plan.monthly * 0.75) : plan.monthly
}
