import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowRight,
  Clock,
  MapPin,
  Wallet,
  type LucideIcon,
} from "lucide-react"

type Job = {
  title: string
  description: string
  location: string
  workType: string
  salary: string
}

const JOBS: Job[] = [
  {
    title: "Frontend Developer",
    description:
      "Build polished, accessible interfaces for a product used by thousands of job seekers every day.",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "£25–£40/hour",
  },
  {
    title: "React Engineer",
    description:
      "Own end-to-end features across our matching platform, from design handoff to production release.",
    location: "London, UK",
    workType: "Remote",
    salary: "£30–£45/hour",
  },
  {
    title: "UI Engineer",
    description:
      "Craft motion and design systems that keep the HireLoop experience fast, clear, and delightful.",
    location: "Berlin, Germany",
    workType: "On-site",
    salary: "€28–€42/hour",
  },
  {
    title: "Backend Developer",
    description:
      "Design and scale the APIs that power job matching, applications, and candidate insights.",
    location: "Toronto, Canada",
    workType: "Hybrid",
    salary: "$45–$60/hour",
  },
  {
    title: "Full-Stack Developer",
    description:
      "Ship features across the whole stack — Next.js front end, Node services, and MongoDB data.",
    location: "Amsterdam, NL",
    workType: "Remote",
    salary: "€32–€48/hour",
  },
  {
    title: "Product Engineer",
    description:
      "Turn candidate and recruiter feedback into product improvements shipped every single week.",
    location: "San Francisco, USA",
    workType: "Hybrid",
    salary: "$50–$70/hour",
  },
]

function Badge({
  icon: Icon,
  children,
  iconClassName,
}: {
  icon: LucideIcon
  children: ReactNode
  iconClassName?: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-neutral-200">
      <Icon className={`h-3 w-3 ${iconClassName ?? "text-neutral-400"}`} />
      {children}
    </span>
  )
}

function JobDiscoverySection() {
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
            Smart Job Discovery
          </span>
          <span
            aria-hidden="true"
            className="size-1 rounded-full bg-indigo-400"
          />
        </div>

        <h2 className="mx-auto mt-4 max-w-md text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          The roles you&rsquo;d never find by searching
        </h2>

        {/* Job cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {JOBS.map((job) => (
            <article
              key={job.title}
              className="flex h-full flex-col rounded-xl border border-white/5 bg-neutral-900/70 p-5 transition-colors hover:border-white/15"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {job.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
                {job.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge icon={MapPin}>{job.location}</Badge>
                <Badge icon={Clock}>{job.workType}</Badge>
                <Badge icon={Wallet} iconClassName="text-indigo-300">
                  {job.salary}
                </Badge>
              </div>

              <Link
                href={`/jobs?query=${encodeURIComponent(job.title)}`}
                className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-medium text-white/90 transition-colors hover:text-white"
              >
                Apply Now
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/jobs"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
          >
            View all job openings
          </Link>
        </div>
      </div>
    </section>
  )
}

export { JobDiscoverySection }
