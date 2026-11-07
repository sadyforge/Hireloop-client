
import Link from "next/link"
import { Flame, Globe, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

const TRENDING_SEARCHES = [
  "Product Designers",
  "AI Engineering",
  "DevOps Engineer",
] as const

const STARS: ReadonlyArray<{ l: number; t: number; s: number; o: number }> = [
  { l: 6, t: 12, s: 1, o: 0.7 },
  { l: 13, t: 26, s: 2, o: 0.4 },
  { l: 7, t: 44, s: 1, o: 0.55 },
  { l: 11, t: 63, s: 2, o: 0.3 },
  { l: 4, t: 78, s: 1, o: 0.5 },
  { l: 18, t: 9, s: 1, o: 0.8 },
  { l: 24, t: 30, s: 1, o: 0.45 },
  { l: 21, t: 52, s: 2, o: 0.35 },
  { l: 27, t: 71, s: 1, o: 0.6 },
  { l: 33, t: 16, s: 2, o: 0.5 },
  { l: 37, t: 38, s: 1, o: 0.7 },
  { l: 31, t: 58, s: 1, o: 0.4 },
  { l: 36, t: 79, s: 2, o: 0.3 },
  { l: 46, t: 11, s: 1, o: 0.75 },
  { l: 44, t: 31, s: 2, o: 0.45 },
  { l: 49, t: 55, s: 1, o: 0.6 },
  { l: 52, t: 74, s: 1, o: 0.35 },
  { l: 60, t: 12, s: 2, o: 0.55 },
  { l: 63, t: 33, s: 1, o: 0.7 },
  { l: 58, t: 57, s: 1, o: 0.4 },
  { l: 67, t: 70, s: 2, o: 0.3 },
  { l: 74, t: 18, s: 1, o: 0.8 },
  { l: 72, t: 41, s: 2, o: 0.45 },
  { l: 80, t: 60, s: 1, o: 0.5 },
  { l: 78, t: 80, s: 1, o: 0.4 },
  { l: 88, t: 24, s: 2, o: 0.6 },
  { l: 85, t: 48, s: 1, o: 0.5 },
  { l: 90, t: 66, s: 2, o: 0.35 },
  { l: 94, t: 38, s: 1, o: 0.65 },
  { l: 95, t: 78, s: 1, o: 0.4 },
]

const NAVBAR_HEIGHT = 88

function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-neutral-950 text-white">

      {/* Background Image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/space-earth.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 65%",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/40" />

        {/* Stars */}
        {STARS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.l}%`,
              top: `${star.t}%`,
              width: star.s,
              height: star.s,
              opacity: star.o,
            }}
          />
        ))}

        {/* Purple Glow */}
        <div className="absolute -bottom-40 left-1/2 h-80 w-[min(140vw,1100px)] -translate-x-1/2 rounded-[100%] bg-indigo-500/25 blur-3xl" />
      </div>

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-1 flex-col items-center px-4 text-center"
        style={{ paddingTop: NAVBAR_HEIGHT + 40 }}
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-2 pr-4 pl-3 text-sm backdrop-blur-md">
          <Flame className="size-4 text-orange-500" />

          <span className="font-semibold text-orange-400">
            50,000+
          </span>

          <span className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
            New jobs this month
          </span>
        </span>

        {/* Heading */}
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-xl text-sm text-neutral-300 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Job Search */}
        <form
          action="/jobs"
          className="mt-8 flex w-full max-w-2xl flex-col rounded-lg border border-white/15 bg-white/[0.06] backdrop-blur-xl sm:flex-row"
        >
          <label className="flex items-center gap-2.5 px-4 py-3 sm:flex-1">
            <span className="sr-only">
              Job title, skill, or company
            </span>

            <Search className="size-4 shrink-0 text-neutral-400" />

            <input
              type="text"
              name="query"
              placeholder="Job title, skill, or company..."
              className="w-full bg-transparent text-sm text-neutral-200 outline-none placeholder:text-neutral-400"
            />
          </label>

          <div
            aria-hidden="true"
            className="hidden h-6 w-px bg-white/10 sm:block sm:self-center"
          />

          <label className="flex items-center gap-2.5 border-t border-white/10 px-4 py-3 sm:flex-1 sm:border-t-0">
            <span className="sr-only">
              Location or Remote
            </span>

            <Globe className="size-4 shrink-0 text-neutral-400" />

            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-neutral-200 outline-none placeholder:text-neutral-400"
            />
          </label>

          <div className="border-t border-white/10 p-1.5 sm:border-t-0 sm:pl-0">
            <Button
              type="submit"
              size="icon"
              aria-label="Search jobs"
              className="size-10 w-full shrink-0 self-center rounded-lg bg-indigo-500 hover:bg-indigo-400 sm:w-10"
            >
              <Search className="text-white" />
            </Button>
          </div>
        </form>

        {/* Trending Searches */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-neutral-400">
            Trending:
          </span>

          {TRENDING_SEARCHES.map((term) => (
            <Link
              key={term}
              href={`/jobs?query=${encodeURIComponent(term)}`}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-neutral-200 backdrop-blur-md transition-colors hover:bg-white/[0.12] hover:text-white"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Hero }
