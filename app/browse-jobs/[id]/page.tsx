import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CircleCheck,
  Clock,
  MapPin,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { getJobById } from "@/lib/api/jobs"

import ApplyButton from "./ApplyButton"
import ShareButton from "./ShareButton"

type JobDetailsPageProps = {
  params: Promise<{ id: string }>
}

/* Formatting helpers ----------------------------------------------------- */

/** Split a multi-line textarea value into clean bullet points. */
const toBulletPoints = (text?: string) =>
  (text ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean)

const formatMoney = (value?: number | string) => {
  const amount = Number(value)

  if (!Number.isFinite(amount) || amount <= 0) {
    return null
  }

  return `$${amount.toLocaleString("en-US")}`
}

const salaryLabel = (period?: string) => {
  switch (period?.toLowerCase()) {
    case "per hour":
      return "Hourly Salary"
    case "per month":
      return "Monthly Salary"
    default:
      return "Annual Salary"
  }
}

const formatDeadline = (deadline?: string) => {
  if (!deadline) {
    return null
  }

  const date = new Date(deadline)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const companyInitials = (company: string) =>
  company
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

/* UI building blocks ----------------------------------------------------- */

type StatCardProps = {
  icon: LucideIcon
  label: string
  value: string
}

const StatCard = ({ icon: Icon, label, value }: StatCardProps) => (
  <div className="rounded-xl border border-zinc-800 bg-[#131316] p-4">
    <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
      <Icon size={14} className="text-indigo-400" />
      {label}
    </div>

    <p className="mt-2 text-sm font-semibold text-white">{value}</p>
  </div>
)

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item, index) => (
      <li
        key={index}
        className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-400"
      >
        <CircleCheck size={15} className="mt-0.5 shrink-0 text-indigo-400" />
        {item}
      </li>
    ))}
  </ul>
)

const OverviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-t border-zinc-800 py-3 first:border-t-0">
    <span className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
      {label}
    </span>

    <span className="text-sm font-medium text-zinc-200">{value}</span>
  </div>
)

/* Page ------------------------------------------------------------------- */

export async function generateMetadata({ params }: JobDetailsPageProps) {
  const { id } = await params
  const job = await getJobById(id)

  return {
    title: job ? `${job.title} at ${job.company}` : "Job Details",
    description: job
      ? `${job.title} opening at ${job.company} — apply on HireLoop.`
      : "Browse this opening on HireLoop.",
  }
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    notFound()
  }

  const isRemote = job.isRemote ?? job.remote
  const responsibilities = toBulletPoints(job.responsibilities)
  const requirements = toBulletPoints(job.requirements)
  const deadline = formatDeadline(job.deadline)

  const salaryMin = formatMoney(job.salaryMin)
  const salaryMax = formatMoney(job.salaryMax)
  const salary =
    salaryMin && salaryMax
      ? `${salaryMin} - ${salaryMax}`
      : (salaryMin ?? salaryMax ?? "Not disclosed")

  const stats: StatCardProps[] = [
    {
      icon: Wallet,
      label: salaryLabel(job.salaryPeriod),
      value: salary,
    },
    {
      icon: MapPin,
      label: "Location",
      value: job.location || (isRemote ? "Remote" : "Not specified"),
    },
    {
      icon: Clock,
      label: "Job Type",
      value: job.jobType || "Not specified",
    },
    {
      icon: CalendarDays,
      label: "Apply By",
      value: deadline ?? "Open until filled",
    },
  ]

  const overviewRows = [
    { label: "Industry", value: job.category || "Other" },
    { label: "Location", value: job.location || "Worldwide" },
    { label: "Work Mode", value: isRemote ? "Remote" : "On-site" },
    { label: "Job Type", value: job.jobType || "Not specified" },
  ]

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to Jobs
        </Link>

        {/* Header */}
        <header className="mt-4 flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#131316] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-sm font-bold text-indigo-400">
              {companyInitials(job.company)}
            </div>

            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                {job.title}
              </h1>

              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                <span>{job.company}</span>

                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <BadgeCheck size={14} />
                  Verified Employer
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ShareButton />

            <ApplyButton job={job} />
          </div>
        </header>

        {/* Content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main column */}
          <div className="min-w-0 space-y-6">
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>

            <section className="rounded-xl border border-zinc-800 bg-[#131316] p-6">
              <h2 className="text-lg font-semibold text-white">
                Job Description
              </h2>

              {responsibilities.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold text-white">
                    Responsibilities
                  </h3>

                  <BulletList items={responsibilities} />
                </div>
              )}

              {requirements.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-3 text-sm font-semibold text-white">
                    Requirements
                  </h3>

                  <BulletList items={requirements} />
                </div>
              )}

              {responsibilities.length === 0 && requirements.length === 0 && (
                <p className="mt-4 text-sm text-zinc-500">
                  The recruiter has not added details for this role yet.
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-zinc-800 bg-[#131316] p-5">
              <h2 className="text-sm font-semibold text-white">
                Company Overview
              </h2>

              <div className="mt-4 flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-[#131316] text-sm font-bold text-indigo-400">
                  {companyInitials(job.company)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {job.company}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {job.category || "Company"}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                {overviewRows.map((row) => (
                  <OverviewRow key={row.label} {...row} />
                ))}
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950 p-3.5">
                <BriefcaseBusiness
                  size={15}
                  className="mt-0.5 shrink-0 text-indigo-400"
                />

                <p className="text-xs leading-relaxed text-zinc-400">
                  Now hiring: <span className="text-zinc-200">{job.title}</span>
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default JobDetailsPage
