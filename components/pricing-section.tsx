"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"

import { PLANS, type Billing } from "@/lib/plans"
import { cn } from "@/lib/utils"

function PricingSection() {
  const [billing, setBilling] = React.useState<Billing>("monthly")

  return (
    <section id="pricing" className="bg-neutral-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-indigo-400"
          />
          <span className="text-[11px] font-medium tracking-[0.35em] text-indigo-300 uppercase">
            Pricing
          </span>
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-indigo-400"
          />
        </div>

        <h2 className="mx-auto mt-4 max-w-md text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Pay for the leverage, not the listings
        </h2>

        {/* Billing toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] p-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                billing === "monthly"
                  ? "bg-white text-neutral-950"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                billing === "yearly"
                  ? "bg-white text-neutral-950"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                  billing === "yearly"
                    ? "bg-violet-500/15 text-violet-600"
                    : "bg-violet-500/20 text-violet-300"
                )}
              >
                -25%
              </span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const price =
              billing === "yearly"
                ? Math.round(plan.monthly * 0.75)
                : plan.monthly

            return (
              <article
                key={plan.name}
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-6",
                  plan.featured
                    ? "border-white/40 bg-neutral-900"
                    : "border-white/10 bg-neutral-900/60"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02]">
                      <plan.icon
                        className={cn(
                          "h-4 w-4",
                          plan.monthly > 0
                            ? "text-indigo-300"
                            : "text-neutral-300"
                        )}
                      />
                    </span>
                    <h3 className="text-sm font-semibold">{plan.name}</h3>
                  </div>
                  <p className="text-2xl font-semibold tracking-tight">
                    ${price}
                    <span className="text-[10px] font-normal text-neutral-400">
                      /month
                    </span>
                  </p>
                </div>

                <p className="mt-6 text-xs text-neutral-400">
                  Start building your insights hub:
                </p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-xs text-neutral-300"
                    >
                      <Plus className="mt-0.5 h-3 w-3 shrink-0 text-neutral-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sign-up"
                  className={cn(
                    "mt-8 flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                    plan.featured
                      ? "bg-white text-neutral-950 hover:bg-neutral-200"
                      : "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.1]"
                  )}
                >
                  Choose This Plan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { PricingSection }
