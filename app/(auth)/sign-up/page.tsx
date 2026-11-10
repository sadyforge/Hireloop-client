import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign Up · HireLoop",
  description:
    "Create a HireLoop account to apply to curated job opportunities.",
}

type SignUpPageProps = {
  searchParams: Promise<{ redirectTo?: string }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { redirectTo } = await searchParams

  return <AuthForm mode="sign-up" redirectTo={redirectTo} />
}
