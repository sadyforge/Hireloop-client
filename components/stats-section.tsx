import {
  Briefcase,
  Building2,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react"

type Stat = {
  value: string
  label: string
  icon: LucideIcon
}

const STATS: Stat[] = [
  { value: "50K", label: "Active Jobs", icon: Briefcase },
  { value: "12K", label: "Companies", icon: Building2 },
  { value: "2M", label: "Job Seekers", icon: Users },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
]

const STARS: ReadonlyArray<{
  l: number
  t: number
  s: number
  o: number
}> = [
  { l: 4, t: 12, s: 1, o: 0.55 },
  { l: 9, t: 30, s: 2, o: 0.35 },
  { l: 6, t: 58, s: 1, o: 0.45 },
  { l: 14, t: 8, s: 2, o: 0.6 },
  { l: 19, t: 22, s: 1, o: 0.5 },
  { l: 16, t: 48, s: 2, o: 0.3 },
  { l: 26, t: 11, s: 1, o: 0.7 },
  { l: 31, t: 27, s: 2, o: 0.4 },
  { l: 29, t: 62, s: 1, o: 0.5 },
  { l: 39, t: 6, s: 2, o: 0.55 },
  { l: 43, t: 24, s: 1, o: 0.65 },
  { l: 41, t: 55, s: 2, o: 0.3 },
  { l: 52, t: 14, s: 1, o: 0.6 },
  { l: 56, t: 36, s: 2, o: 0.35 },
  { l: 54, t: 70, s: 1, o: 0.45 },
  { l: 65, t: 9, s: 2, o: 0.55 },
  { l: 69, t: 29, s: 1, o: 0.6 },
  { l: 66, t: 58, s: 2, o: 0.3 },
  { l: 77, t: 19, s: 1, o: 0.7 },
  { l: 81, t: 41, s: 2, o: 0.4 },
  { l: 79, t: 66, s: 1, o: 0.5 },
  { l: 88, t: 8, s: 2, o: 0.6 },
  { l: 92, t: 33, s: 1, o: 0.55 },
  { l: 90, t: 60, s: 2, o: 0.35 },
  { l: 96, t: 76, s: 1, o: 0.45 },
  { l: 95, t: 15, s: 1, o: 0.6 },
]

function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-16 text-white sm:py-20">
      {/* Star field */}
      {STARS.map((star, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white"
          style={{
            left: `${star.l}%`,
            top: `${star.t}%`,
            width: star.s,
            height: star.s,
            opacity: star.o,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Globe */}
        <div className="relative mx-auto flex h-[300px] w-full max-w-[840px] items-center justify-center sm:h-[360px]">
          {/* Atmosphere glow */}
          <div
            aria-hidden="true"
            className="absolute top-4 left-1/2 h-72 w-[min(110%,900px)] -translate-x-1/2 rounded-[100%] bg-indigo-500/25 blur-3xl"
          />
          {/* Rim glow */}
          <div
            aria-hidden="true"
            className="absolute top-2 left-1/2 aspect-square w-[min(100%,840px)] -translate-x-1/2 rounded-full bg-indigo-400/30 blur-xl"
          />
          {/* Globe body */}
          <div
            aria-hidden="true"
            className="absolute top-3 left-1/2 aspect-square w-[min(100%,840px)] -translate-x-1/2 rounded-full bg-[radial-gradient(130%_130%_at_50%_0%,#9aa3ff_0%,#6d76e8_15%,#3f4796_34%,#23264a_54%,#10111d_74%,#0a0a11_100%)]"
          />

          {/* Headline */}
          <h2 className="relative z-10 pt-16 text-center text-2xl font-light tracking-tight text-neutral-300 sm:text-3xl">
            Assisting over{" "}
            <span className="font-semibold text-white">15,000 job seekers</span>
            <br />
            find their dream positions.
          </h2>

          {/* Fade into the page background */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-neutral-950"
          />
        </div>

        {/* Stats */}
        <div className="relative mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex h-32 flex-col justify-between rounded-lg border border-white/5 bg-neutral-900/80 p-4"
            >
              <stat.icon className="h-4 w-4 text-neutral-400" />
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-neutral-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { StatsSection }
