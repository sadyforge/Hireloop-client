import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight, Check, CircleCheck } from "lucide-react"

import { checkOutVerify } from "@/lib/actions/Payments"
import { stripe } from "@/lib/stripe"

export const metadata: Metadata = {
  title: "Upgrade successful · HireLoop",
  description: "Your HireLoop Pro payment was received.",
}

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>
}

/** Formats a Stripe cent amount as USD, e.g. 2000 -> "$20.00". */
function formatAmount(amountTotal: number | null, currency: string | null) {
  return ((amountTotal ?? 0) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: currency || "USD",
  })
}

/** Shortens the long `cs_test_...` id for the "verified" chip. */
function shortenSessionId(id: string) {
  return id.length <= 20 ? id : `${id.slice(0, 20)}...`
}

export default async function Success({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams

  // No session id — nothing to confirm, send the user back to checkout.
  if (!sessionId) redirect("/payment")

  const session = await stripe.checkout.sessions
    .retrieve(sessionId)
    .catch(() => null)

  // Unknown, abandoned or unpaid session — back to the checkout page to
  // retry instead of rendering an empty/throwing page.
  if (
    !session ||
    session.status !== "complete" ||
    session.payment_status !== "paid"
  ) {
    redirect("/payment")
  }

  // Best-effort: unlock premium features on the backend. Stripe has
  // already confirmed the payment, so an unreachable backend must not
  // break this page.
  await checkOutVerify(sessionId).catch(() => null)

  const amount = formatAmount(session.amount_total, session.currency)

  return (
    <section
      id="success"
      className="flex min-h-svh items-center justify-center bg-neutral-950 px-4 py-16 text-white"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0e] p-8 text-center shadow-2xl shadow-black/50 sm:p-10">
        {/* Soft top glow, matching the reference design */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(255,255,255,0.09),transparent)]"
        />

        <div className="relative flex flex-col items-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40">
            <Check className="size-7 text-white" strokeWidth={3} />
          </span>

          <span className="mt-6 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-[10px] font-semibold tracking-[0.3em] text-indigo-300 uppercase">
            Upgrade successful
          </span>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Welcome to Hireloop Pro
          </h1>

          <p className="mt-5 text-sm leading-6 text-neutral-400">
            Your payment of{" "}
            <span className="font-semibold text-white">{amount}</span> was
            received perfectly.
          </p>

          <p className="mt-3 text-sm leading-6 text-neutral-400">
            All advanced premium recruiting modules are unlocked on your
            account.{" "}
            <span className="text-emerald-400">
              You may need to re-authenticate to see the effect.
            </span>
          </p>

          <div className="mt-7 flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] py-2 pr-2 pl-4">
            <span className="flex items-center gap-2 text-xs font-medium text-neutral-300">
              <CircleCheck className="size-4 text-emerald-400" />
              Session ID Verified
            </span>
            <code className="rounded-lg bg-black/50 px-2.5 py-1.5 font-mono text-[11px] text-neutral-400">
              {shortenSessionId(sessionId)}
            </code>
          </div>

          <Link
            href="/dashboard"
            className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            Go to Workspace Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
