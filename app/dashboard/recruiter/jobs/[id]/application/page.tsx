import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { getJobById } from "@/lib/api/jobs"
import { getApplicationsByJob } from "@/lib/actions/application"
import type { ApplicationRecord } from "@/lib/types/application"
import { cn } from "@/lib/utils"

import ApplicationsTable from "./ApplicationsTable"

type JobApplicationsPageProps = {
  params: Promise<{ id: string }>
}

/* Summary building blocks ------------------------------------------------ */

type StatCardProps = {
  label: string
  value: number
  valueClass?: string
}

const StatCard = ({ label, value, valueClass }: StatCardProps) => (
  <div className="rounded-xl border border-white/10 bg-[#101010]/95 p-4">
    <p className="text-xs text-white/50">{label}</p>

    <p className={cn("mt-2 text-2xl font-semibold text-white", valueClass)}>
      {value}
    </p>
  </div>
)

const countByStatus = (applications: ApplicationRecord[], status: string) =>
  applications.filter(
    (application) => application.status?.toLowerCase() === status.toLowerCase()
  ).length

/* Page ------------------------------------------------------------------- */

const JobApplicationsPage = async ({ params }: JobApplicationsPageProps) => {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    notFound()
  }

  const applications = await getApplicationsByJob(id)

  const stats = [
    { label: "Total Applicants", value: applications.length },
    {
      label: "Shortlisted",
      value: countByStatus(applications, "Shortlisted"),
      valueClass: "text-blue-400",
    },
    {
      label: "Interviews",
      value: countByStatus(applications, "Interview"),
      valueClass: "text-orange-400",
    },
    {
      label: "Offers",
      value: countByStatus(applications, "Offered"),
      valueClass: "text-emerald-400",
    },
  ]

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/dashboard/recruiter/jobs"
          className="text-white/50 transition-colors hover:text-white"
        >
          Manage Jobs
        </Link>
        <span className="text-white/30">/</span>
        <span className="text-white/50">{job.title}</span>
        <span className="text-white/30">/</span>
        <span className="text-white/90">Applications</span>
      </nav>

      {/* Page Heading */}
      <header className="mb-8">
        <Link
          href="/dashboard/recruiter/jobs"
          className="inline-flex w-fit items-center gap-2 text-xs font-medium text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-3.5" />
          Back to Manage Jobs
        </Link>

        <h1 className="mt-3 font-heading text-[28px] leading-[1.15] font-bold tracking-tight text-white">
          Applications for {job.title}
        </h1>

        <p className="mt-1.5 text-sm text-white/60">
          Review the applicants for the {job.title} role at {job.company} and
          update their status.
        </p>
      </header>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Applicants */}
      <ApplicationsTable applications={applications} />

      {/* Applicant Count */}
      <div className="mt-4 text-sm text-white/50">
        Showing {applications.length}{" "}
        {applications.length === 1 ? "applicant" : "applicants"}
      </div>
    </div>
  )
}

export default JobApplicationsPage
