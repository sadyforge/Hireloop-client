"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  CreditCard,
  Loader2,
  Lock,
  Mail,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  monthlyPrice,
  resolveBilling,
  resolvePlan,
  type Billing,
} from "@/lib/plans"
import { cn } from "@/lib/utils"

// Shared input styling (kept in sync with the auth forms).
const INPUT_CLASS =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white transition-colors outline-none placeholder:text-neutral-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/30"

const INPUT_WITH_ICON_CLASS =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pr-3 pl-10 text-sm text-white transition-colors outline-none placeholder:text-neutral-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/30"

const COUNTRIES = [
  { code: "BD", name: "Bangladesh" },
  { code: "IN", name: "India" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
]

function usd(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  if (digits.length <= 2) {
    return digits
  }
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

type PaymentDetailsProps = {
  planParam?: string
  billingParam?: string
}

function PaymentDetails({ planParam, billingParam }: PaymentDetailsProps) {
  const router = useRouter()
  const plan = resolvePlan(planParam)
  const billing: Billing = resolveBilling(billingParam)
  const perMonth = monthlyPrice(plan, billing)
  const totalDue = billing === "yearly" ? perMonth * 12 : perMonth

  const [cardNumber, setCardNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  function handleSubmit() {
    // The form POSTs to /api/checkout_sessions, which answers with a 303
    // redirect to the Stripe Checkout URL — the browser then navigates
    // there. Just flag the button as busy while the request is in flight.
    setSubmitting(true)
  }

  const PlanIcon = plan.icon

  return (
    <section className="flex min-h-svh flex-col bg-neutral-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-4xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Order summary */}
          <aside className="rounded-xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-[11px] font-medium tracking-[0.35em] text-neutral-500 uppercase">
              Order summary
            </p>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  HireLoop {plan.name}
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  {billing === "yearly"
                    ? "Billed yearly · cancel anytime"
                    : "Billed monthly · cancel anytime"}
                </p>
              </div>
              <PlanIcon className="h-6 w-6 shrink-0 text-indigo-300" />
            </div>

            <ul className="mt-6 flex flex-col gap-2.5">
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

            <dl className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-400">{plan.name} plan</dt>
                <dd>
                  {usd(perMonth)}
                  <span className="text-neutral-500">/month</span>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-400">Billing</dt>
                <dd>
                  {billing === "yearly" ? "Yearly · save 25%" : "Monthly"}
                </dd>
              </div>
              <div className="flex justify-between gap-4 font-semibold">
                <dt>Total due today</dt>
                <dd>{usd(totalDue)}</dd>
              </div>
            </dl>
          </aside>

          {/* Checkout form */}
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold tracking-tight">Checkout</h1>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] text-neutral-300 uppercase">
                Sandbox
              </span>
            </div>

            <form
              action="/api/checkout_sessions"
              method="POST"
              onSubmit={handleSubmit}
              className="mt-7 flex flex-col gap-5"
            >
              {/* Contact information */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-neutral-300">
                  Contact information
                </span>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={INPUT_WITH_ICON_CLASS}
                  />
                </div>
              </div>

              {/* Payment method */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-300">
                    Payment method
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
                    <Lock className="h-3 w-3" />
                    Secured by Stripe
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <CreditCard className="h-4 w-4 text-neutral-400" />
                    <span className="text-sm font-medium">Card</span>
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="card-number" className="sr-only">
                        Card number
                      </label>
                      <div className="relative">
                        <CreditCard className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                        <input
                          id="card-number"
                          name="card-number"
                          value={cardNumber}
                          onChange={(event) =>
                            setCardNumber(formatCardNumber(event.target.value))
                          }
                          
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="1234 1234 1234 1234"
                          className={INPUT_WITH_ICON_CLASS}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="expiry" className="sr-only">
                          Expiry date
                        </label>
                        <input
                          id="expiry"
                          name="expiry"
                          value={expiry}
                          onChange={(event) =>
                            setExpiry(formatExpiry(event.target.value))
                          }
                          
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM / YY"
                          className={INPUT_CLASS}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="cvc" className="sr-only">
                          CVC
                        </label>
                        <input
                          id="cvc"
                          name="cvc"
                          
                          inputMode="numeric"
                          pattern="[0-9]{3,4}"
                          maxLength={4}
                          autoComplete="cc-csc"
                          placeholder="CVC"
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cardholder-name" className="sr-only">
                        Cardholder name
                      </label>
                      <input
                        id="cardholder-name"
                        name="cardholder-name"
                        
                        autoComplete="cc-name"
                        placeholder="Full name on card"
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="country" className="sr-only">
                        Country or region
                      </label>
                      <select
                        id="country"
                        name="country"
                        defaultValue="BD"
                        autoComplete="country"
                        className={cn(INPUT_CLASS, "appearance-none")}
                      >
                        {COUNTRIES.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="mt-1 w-full justify-center bg-indigo-500 hover:bg-indigo-400"
              >
                {submitting ? <Loader2 className="animate-spin" /> : null}
                {submitting ? "Processing…" : `Pay ${usd(totalDue)}`}
              </Button>

              <p className="text-center text-[11px] text-neutral-500">
                You&apos;ll be redirected to Stripe&apos;s secure checkout to
                complete your payment.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export { PaymentDetails }
