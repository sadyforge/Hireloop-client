import {
  ArrowUpRight,
  Bookmark,
  Building2,
  FileText,
  Search,
  Target,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react"

type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

const FEATURES: Feature[] = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: Search,
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: TrendingUp,
  },
  {
    title: "Top Companies",
    description: "Apply to trusted companies that are hiring.",
    icon: Building2,
  },
  {
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: Bookmark,
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process.",
    icon: Zap,
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: FileText,
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: Target,
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: ArrowUpRight,
  },
]

function FeaturesSection() {
  return (
    <section className="bg-neutral-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-indigo-400"
          />
          <span className="text-[11px] font-medium tracking-[0.35em] text-indigo-300 uppercase">
            Features Job
          </span>
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-indigo-400"
          />
        </div>

        <h2 className="mx-auto mt-4 max-w-xs text-center text-3xl font-semibold tracking-tight text-balance sm:max-w-sm sm:text-4xl">
          Everything you need to succeed
        </h2>

        {/* Feature grid */}
        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02]">
                <feature.icon className="h-5 w-5 text-indigo-300" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeaturesSection }
