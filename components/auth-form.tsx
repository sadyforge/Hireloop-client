"use client"

import * as React from "react"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import type { UserRole } from "@/lib/auth"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type Mode = "sign-in" | "sign-up"

const ROLE_OPTIONS = [
  { value: "seeker", label: "Job Seeker", icon: Users },
  { value: "recruiter", label: "Recruiter", icon: User },
  { value: "admin", label: "Admin", icon: Shield },
] satisfies { value: UserRole; label: string; icon: LucideIcon }[]

type AuthSubmit = (data: Record<string, string>) => Promise<void>

type SignUpData = Record<string, string> & { role: UserRole }
// const router=useRouter()

// Signup function
async function handleSignUp(data: SignUpData): Promise<boolean> {
 
  const { data: response, error } = await authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    callbackURL: "/",
  })

  console.log("signup response", response, error)
  if(!error){
   window.location.href="/"
  }

  if (error) {
    toast.error(error.message || "Something went wrong. Please try again.")
    return false
  }

  return true
}

// Signin function
async function handleSignIn(data: Record<string, string>) {
  const { data: response, error } = await authClient.signIn.email({
    email: data.email,
    password: data.password,
    callbackURL: "/",
  })

  console.log("signin response", response, error)
}

type AuthFormProps = {
  mode: Mode
  /** Optional custom submit handler; defaults to the better-auth email flow. */
  onSubmit?: AuthSubmit
}

const META: Record<Mode, { title: string; subtitle: string; submit: string }> =
  {
    "sign-in": {
      title: "Welcome back",
      subtitle: "Sign in to your HireLoop account",
      submit: "Sign In",
    },
    "sign-up": {
      title: "Create your account",
      subtitle: "Three minutes to set up. Matches start arriving today.",
      submit: "Create Account",
    },
  }

function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const router=useRouter()
  const isSignUp = mode === "sign-up"
  const [showPassword, setShowPassword] = React.useState(false)
  const [role, setRole] = React.useState<UserRole>("seeker")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as Record<string, string>

    if (onSubmit) {
      await onSubmit(data)
      return
    }

    if (isSignUp) {
      const role = ROLE_OPTIONS.find(
        (option) => option.value === data.role
      )?.value

      if (!role) {
        toast.error("Please choose an account type")
        return
      }

      const created = await handleSignUp({ ...data, role })
      if (created) {
        toast.success("Successfully User create")
        router.push("/")

      }
    } else {
      await handleSignIn(data)
      toast.success("Successfully login user")
    }
  }

  return (
    <section className="flex min-h-[calc(100svh-5rem)] items-center justify-center bg-neutral-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl font-semibold tracking-tight">
            {META[mode].title}
          </h1>
          <p className="mt-1 text-sm text-neutral-400">{META[mode].subtitle}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          data-mode={mode}
          className="mt-7 flex flex-col gap-4"
        >
          {isSignUp && (
            <fieldset className="flex flex-col gap-2 border-0 p-0">
              <legend className="sr-only">Joining HireLoop as</legend>
              <span className="text-xs font-medium text-neutral-300">
                Joining HireLoop as
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {ROLE_OPTIONS.map((option) => {
                  const selected = role === option.value
                  return (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer flex-col items-center gap-2 rounded-xl border bg-white/[0.03] px-2 py-4 text-center transition-colors",
                        selected
                          ? "border-indigo-400/70 bg-indigo-500/10"
                          : "border-white/10 hover:border-white/20"
                      )}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={selected}
                        onChange={() => setRole(option.value)}
                        className="sr-only"
                      />
                      <option.icon
                        className={cn(
                          "h-5 w-5",
                          selected ? "text-indigo-300" : "text-neutral-400"
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          selected ? "text-white" : "text-neutral-400"
                        )}
                      >
                        {option.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          )}

          {isSignUp && (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-neutral-300"
              >
                Full name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pr-3 pl-10 text-sm text-white transition-colors outline-none placeholder:text-neutral-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-neutral-300"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pr-3 pl-10 text-sm text-white transition-colors outline-none placeholder:text-neutral-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-medium text-neutral-300"
              >
                Password
              </label>
              {isSignUp && (
                <span className="text-[11px] text-neutral-500">
                  At least 8 characters
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={isSignUp ? 8 : undefined}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pr-10 pl-10 text-sm text-white transition-colors outline-none placeholder:text-neutral-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500 transition-colors hover:text-neutral-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-1 w-full justify-center bg-indigo-500 hover:bg-indigo-400"
          >
            {META[mode].submit}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          {isSignUp ? "Already have an account?" : "New to HireLoop?"}{" "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            {isSignUp ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </div>
    </section>
  )
}

export { AuthForm }
