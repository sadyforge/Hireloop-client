import type { Metadata } from "next"

import { PaymentDetails } from "./payment-details"

export const metadata: Metadata = {
  title: "Checkout · HireLoop",
  description: "Pay for your HireLoop plan via Stripe's secure checkout.",
}

type PaymentPageProps = {
  searchParams: Promise<{ canceled?: string; billing?: string }>
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const { canceled, billing } = await searchParams

  return <PaymentDetails planParam={canceled} billingParam={billing} />
}
