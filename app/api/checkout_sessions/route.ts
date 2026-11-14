import { NextResponse } from "next/server"
import { headers } from "next/headers"

import { stripe } from "@/lib/stripe"
import { getSession } from "@/lib/core/server"

export async function POST() {
  try {
    const userSession = await getSession()
    const headersList = await headers()
    // `origin` is missing on some server-to-server requests; fall back to
    // the dev URL so the success/cancel URLs are never `null/...`.
    const origin = headersList.get("origin") ?? "http://localhost:3000"

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1Ub3EXFIgdFO9aeFrEZmTRxe",
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userSession?.user?.email,
      metadata: {
        // Stripe rejects `undefined` — use null when there is no session user.
        userId: userSession?.user?.id ?? null,
      },
      // The success page lives at /payment/success (app/payment/success).
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: "hire_loop_web_001",
    })

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL")
    }
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
