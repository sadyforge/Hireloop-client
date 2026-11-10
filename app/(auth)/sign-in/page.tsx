import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign In · HireLoop",
  description:
    "Sign in to your HireLoop account to track jobs and applications.",
}

type SignInPageProps = {
  searchParams: Promise<{ redirectTo?: string }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { redirectTo } = await searchParams

  return <AuthForm mode="sign-in" redirectTo={redirectTo} />
}
