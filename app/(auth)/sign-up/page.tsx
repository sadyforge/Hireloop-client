import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign Up · HireLoop",
  description:
    "Create a HireLoop account to apply to curated job opportunities.",
}

export default function SignUpPage() {
  return <AuthForm mode="sign-up" />
}
