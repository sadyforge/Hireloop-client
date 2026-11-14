import Link from "next/link"
import { Plus, MapPin, Pencil, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"
import { getSession } from "@/lib/session"

export type JobStatus="active"|"expired"
export type Job = {
    _id: string
    title: string
    company: string
    category: string
    jobType: string
    remote: boolean
    location: string
    deadline: string
    salaryMin: number
    salaryMax: number
    salaryPeriod: string
    responsibilities: string
    requirements: string
    applicants:number
    status: JobStatus
}

const formatCompensation = (job: Job) =>
    `৳${job.salaryMin.toLocaleString()} – ৳${job.salaryMax.toLocaleString()} / ${job.salaryPeriod.replace("per ", "")}`

const formatDeadline = (deadline: string) =>
    new Date(`${deadline}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    })

const headingClass =
    "px-3 py-3.5 text-xs font-medium tracking-wide text-white/50 uppercase"

const cellClass = "px-3 py-4"

const badgeClass =
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium"

const typePillClass =
    "inline-flex items-center whitespace-nowrap rounded-lg border border-white/10 bg-[#1A1A1F] px-2.5 py-1 text-xs text-white/80"

const iconButtonClass =
    "flex size-8 items-center justify-center rounded-md border border-white/10 bg-[#1A1A1F] text-white/60 transition-colors"

const applicationsLinkClass =
    "flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md border border-white/10 bg-[#1A1A1F] px-2.5 text-xs text-white/60 transition-colors hover:border-indigo-500/50 hover:text-indigo-400"

const cellVis = {
    company: "hidden md:table-cell",
    type: "hidden lg:table-cell",
    salary: "hidden lg:table-cell",
    deadline: "hidden md:table-cell",
} satisfies Record<string, string>

export default async function ManageJobsPage() {
    const session=await getSession()
    const jobs: Job[] = await getJobs(`recruiterId=${session?.user.id}`)

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8">

            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm">
                <span className="text-white/50">Manage Jobs</span>
                <span className="text-white/30">/</span>
                <span className="text-white/90">Job Listings & Postings</span>
            </nav>

            {/* Page Heading */}
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                    <h1 className="font-heading text-[28px] leading-[1.15] font-bold tracking-tight text-white">
                        Manage Job Posts
                    </h1>

                    <p className="text-sm text-white/60">
                        Review your job listings and manage your job postings.
                    </p>
                </div>

                <Link
                    href="/dashboard/recruiter/jobs/new"
                    className={cn(
                        buttonVariants(),
                        "bg-[#5C53FE] text-white hover:bg-[#7B74FF]"
                    )}
                >
                    <Plus className="size-4" />
                    New Job Post
                </Link>
            </header>

            {/* Jobs Table */}
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010]/95 shadow-[inset_0_3px_10px_rgba(255,255,255,0.04)]">

                <div className="overflow-x-auto">
                    <table className="w-full table-fixed text-left text-sm">

                        <thead>
                            <tr className="border-b border-white/10">
                                <th className={cn(headingClass, "px-5", "lg:w-[17%]")}>
                                    Job Title & Dept
                                </th>

                                <th className={cn(headingClass, cellVis.company, "lg:w-[15%]")}>
                                    Company & Location
                                </th>

                                <th className={cn(headingClass, cellVis.type, "lg:w-[10%]")}>
                                    Job Type
                                </th>

                                <th className={cn(headingClass, cellVis.salary, "lg:w-[14%]")}>
                                    Compensation
                                </th>

                                <th className={cn(headingClass, cellVis.deadline, "lg:w-[13%]")}>
                                    Deadline
                                </th>

                                <th className={cn(headingClass, "lg:w-[10%]")}>
                                    Work Mode
                                </th>

                                <th className={cn(headingClass, "px-5", "lg:w-[21%]")}>
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <tr
                                        key={job._id}
                                        className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                                    >
                                        {/* Job Title */}
                                        <td className={cn(cellClass, "px-5")}>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="hidden size-10 shrink-0 items-center justify-center rounded-lg bg-[#5C53FE]/15 text-sm font-semibold text-[#8B85FF] sm:flex"
                                                    aria-hidden
                                                >
                                                    {job.title.charAt(0).toUpperCase()}
                                                </span>

                                                <div className="flex min-w-0 flex-col gap-1">
                                                    <span className="truncate font-medium text-[#EDEDEF]">
                                                        {job.title}
                                                    </span>

                                                    <span className="truncate text-xs text-white/50">
                                                        {job.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Company & Location */}
                                        <td className={cn(cellClass, cellVis.company)}>
                                            <div className="flex min-w-0 flex-col gap-1">
                                                <span className="truncate text-[#EDEDEF]">
                                                    {job.company}
                                                </span>

                                                <span className="flex items-center gap-1 truncate text-xs text-white/50">
                                                    <MapPin className="size-3 shrink-0" />
                                                    {job.location}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Job Type */}
                                        <td className={cn(cellClass, cellVis.type)}>
                                            <span className={typePillClass}>
                                                {job.jobType}
                                            </span>
                                        </td>

                                        {/* Salary */}
                                        <td className={cn(cellClass, cellVis.salary)}>
                                            <span className="whitespace-nowrap text-white/80">
                                                {formatCompensation(job)}
                                            </span>
                                        </td>

                                        {/* Deadline */}
                                        <td className={cn(cellClass, cellVis.deadline)}>
                                            <span className="whitespace-nowrap text-[#EDEDEF]">
                                                {formatDeadline(job.deadline)}
                                            </span>
                                        </td>

                                        {/* Work Mode */}
                                        <td className={cellClass}>
                                            <span
                                                className={cn(
                                                    badgeClass,
                                                    job.remote
                                                        ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-300"
                                                        : "border-white/10 bg-white/5 text-white/60"
                                                )}
                                            >
                                                {job.remote ? "Remote" : "On-site"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className={cn(cellClass, "px-5")}>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/dashboard/recruiter/jobs/${job._id}/application`}
                                                    className={
                                                        applicationsLinkClass
                                                    }
                                                >
                                                    <Users className="size-3.5" />
                                                    View Applications
                                                </Link>

                                                <button
                                                    type="button"
                                                    aria-label="Edit job"
                                                    className={cn(
                                                        iconButtonClass,
                                                        "hover:border-indigo-500/50 hover:text-indigo-400"
                                                    )}
                                                >
                                                    <Pencil className="size-4" />
                                                </button>
{/* 
                                                <button
                                                    type="button"
                                                    aria-label="Delete job"
                                                    className={cn(
                                                        iconButtonClass,
                                                        "hover:border-red-500/50 hover:text-red-400"
                                                    )}
                                                >
                                                    <Trash2 className="size-4" />
                                                </button> */}

                                                <DeleteJobDialog job={job}/>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-5 py-16 text-center text-sm text-white/50"
                                    >
                                        No jobs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </section>

            {/* Job Count */}
            <div className="mt-4 text-sm text-white/50">
                Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
            </div>

        </div>
    )
}