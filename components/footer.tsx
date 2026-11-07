import Link from "next/link"

import { HireLoopLogo } from "@/components/navbar"

type FooterLink = { label: string; href: string }

const COLUMNS: ReadonlyArray<{ heading: string; links: FooterLink[] }> = [
  {
    heading: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Waitlist AI", href: "#" },
      { label: "Companies", href: "#" },
      { label: "Salary data", href: "#" },
    ],
  },
  {
    heading: "Navigations",
    links: [
      { label: "Help center", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Enquiry", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Brand Guideline", href: "#" },
      { label: "Newsroom", href: "#" },
    ],
  },
]

const SOCIALS: ReadonlyArray<{
  label: string
  href: string
  className: string
  svg: React.ReactNode
}> = [
  {
    label: "Facebook",
    href: "#",
    className: "bg-neutral-700 text-neutral-200 hover:bg-neutral-600",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.022 4.388 11.017 10.125 11.927v-8.436H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.436C19.612 23.09 24 18.095 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    className: "bg-violet-600 text-white hover:bg-violet-500",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    className: "bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-neutral-950 pt-16 pb-8 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="HireLoop home">
              <HireLoopLogo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-neutral-300">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-sm font-semibold text-indigo-300">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Socials */}
          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${social.className}`}
              >
                {social.svg}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400">
            <span>Copyright 2026 - Programming Hero</span>
            <span className="flex flex-wrap items-center gap-x-2">
              <Link href="#" className="transition-colors hover:text-white">
                Terms &amp; Policy
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="#" className="transition-colors hover:text-white">
                Privacy Guideline
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
