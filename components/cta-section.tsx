import Link from "next/link"

const GRID_STROKE = 1
// Meridian (vertical) and latitude (horizontal) grid ellipses.
const MERIDIANS = [70, 140, 210, 280, 350] as const
const LATITUDES = [90, 180, 270, 360] as const

function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      <div className="relative flex min-h-[520px] flex-col items-center justify-center px-4 sm:min-h-[560px]">
        {/* Wireframe dome */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-[min(100vw,1100px)]"
        >
          <svg viewBox="0 0 1200 500" role="presentation" className="w-full">
            <defs>
              <radialGradient id="cta-dome" cx="50%" cy="26%" r="62%">
                <stop offset="0%" stopColor="#b3b8ff" />
                <stop offset="22%" stopColor="#8a83f2" />
                <stop offset="45%" stopColor="#5b4ec4" />
                <stop offset="70%" stopColor="#2c2372" />
                <stop offset="100%" stopColor="#120d2b" />
              </radialGradient>
            </defs>

            {/* Dome surface */}
            <ellipse
              cx="600"
              cy="500"
              rx="600"
              ry="470"
              fill="url(#cta-dome)"
            />

            {/* Latitude lines (horizontal grid) */}
            {LATITUDES.map((ry) => (
              <ellipse
                key={`lat-${ry}`}
                cx="600"
                cy="500"
                rx="600"
                ry={ry}
                fill="none"
                stroke="#0a0618"
                strokeOpacity="0.35"
                strokeWidth={GRID_STROKE}
              />
            ))}

            {/* Meridian lines (vertical grid) */}
            {MERIDIANS.map((rx) => (
              <ellipse
                key={`mer-${rx}`}
                cx="600"
                cy="500"
                rx={rx}
                ry="470"
                fill="none"
                stroke="#0a0618"
                strokeOpacity="0.35"
                strokeWidth={GRID_STROKE}
              />
            ))}

            {/* Outer rim */}
            <ellipse
              cx="600"
              cy="500"
              rx="600"
              ry="470"
              fill="none"
              stroke="#b3b8ff"
              strokeOpacity="0.25"
              strokeWidth={GRID_STROKE}
            />
          </svg>
        </div>

        {/* Bloom behind the apex */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/2 h-72 w-[min(90vw,860px)] -translate-x-1/2 rounded-[100%] bg-indigo-500/30 blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your next role is
            <br />
            already looking for you
          </h2>
          <p className="mt-4 text-sm text-neutral-200/80">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
            >
              Create a free account
            </Link>
            <Link
              href="#pricing"
              className="rounded-lg border border-white/20 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export { CtaSection }
