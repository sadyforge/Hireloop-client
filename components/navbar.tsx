
"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authClient, useSession } from "@/lib/auth-client"
import toast from "react-hot-toast"

function HireLoopLogo({ className }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-2xl font-bold tracking-tight",
        className
      )}
    >
      <span className="text-blue-500">hire</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mx-[0.05em] size-[1.15em] shrink-0"
      >
        <defs>
          <radialGradient id="hireloop-orb" cx="32%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#ffa03c" />
            <stop offset="100%" stopColor="#ff4d00" />
          </radialGradient>
        </defs>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
        />
        <circle cx="12" cy="12" r="6.25" fill="url(#hireloop-orb)" />
        <circle cx="10" cy="9.75" r="1.75" fill="#fff" opacity="0.55" />
      </svg>
      <span className="text-orange-500">hop</span>
    </span>
  )
}

function Navbar() {
  const [open, setOpen] = React.useState(false)
  const { data: session, isPending } = useSession()
  const user = session?.user

  const NAV_LINKS = [
    { href: "/browse-jobs", label: "Browse Jobs" },
    { href: "/company", label: "Company" },
    { href: "/pricing", label: "Pricing" },
    {
      href: user?.role
        ? `/dashboard/${user.role}`
        : "/dashboard/seeker",
      label: "Dashboard",
    },
  ] as const

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      setOpen(false)
      toast.success("Successfully user Logout")
    } catch {
      toast.error("Logout failed. Please try again.")
    }
  }

  return (
    <header className="sticky top-0 z-50 p-2">
      <nav className="flex flex-col overflow-hidden rounded-xl border border-neutral-800/70 bg-neutral-950 shadow-lg shadow-black/20">
        <div className="flex h-16 items-center justify-between px-4 sm:px-5 md:px-6">
          <Link href="/" aria-label="HireLoop home">
            <HireLoopLogo />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="text-white">Welcome, {user.name}</div>
                <Button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              !isPending && (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-indigo-500 text-white hover:bg-indigo-400"
                    )}
                  >
                    Get Started
                  </Link>
                </>
              )
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-300 hover:bg-neutral-800 hover:text-white md:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>

        {open && (
          <div className="flex flex-col gap-1 border-t border-neutral-800 px-4 pt-3 pb-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800/70 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <div aria-hidden="true" className="my-2 h-px bg-neutral-800" />

            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-white">
                  Welcome, {user.name}
                </div>
                <Button
                  onClick={handleSignOut}
                  className="justify-start text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              !isPending && (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-indigo-400 transition-colors hover:bg-neutral-800/70 hover:text-indigo-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "mt-2 w-full justify-center bg-indigo-500 text-white hover:bg-indigo-400"
                    )}
                  >
                    Get Started
                  </Link>
                </>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export { Navbar, HireLoopLogo }
