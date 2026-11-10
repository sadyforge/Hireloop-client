
import { getApplyJob } from "@/lib/actions/application"
import {
    BriefcaseBusiness,
    Bookmark,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    FileText,
    Search,
} from "lucide-react"

type Application = {
    _id: string
    jobId?: string
    jobTitle?: string
    companyName?: string
    title?: string
    company?: string
    jobType?: string
    remote?: boolean
    location?: string
    status?: string
    appliedAt?: string | Date
    createdAt?: string | Date
    jobDetails?: {
        title?: string
        company?: string
        jobType?: string
        remote?: boolean
        location?: string
    }
    job?: {
        title?: string
        company?: string
        jobType?: string
        remote?: boolean
        location?: string
    }
}

const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
        case "shortlisted":
            return "border-blue-500/20 bg-blue-500/10 text-blue-400"
        case "review":
        case "under review":
            return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
        case "rejected":
            return "border-red-500/20 bg-red-500/10 text-red-400"
        case "offered":
            return "border-green-500/20 bg-green-500/10 text-green-400"
        case "interview":
            return "border-orange-500/20 bg-orange-500/10 text-orange-400"
        default:
            return "border-zinc-700 bg-zinc-800/70 text-zinc-400"
    }
}

const formatDate = (date?: string | Date) => {
    if (!date) return "Recently"

    const appliedDate = new Date(date)

    if (Number.isNaN(appliedDate.getTime())) return "Recently"

    const now = new Date()
    const diff = Math.floor(
        (now.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diff <= 0) return "Today"
    if (diff === 1) return "1 day ago"
    if (diff < 7) return `${diff} days ago`
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`

    return appliedDate.toLocaleDateString()
}

const SeekerApplicants = async () => {
    const applicationJob = await getApplyJob()

    const applications: Application[] = Array.isArray(applicationJob)
        ? applicationJob
        : []

    const totalApplied = applications.length

    const shortlisted = applications.filter(
        (app) => app.status?.toLowerCase() === "shortlisted"
    ).length

    const interviews = applications.filter((app) =>
        app.status?.toLowerCase().includes("interview")
    ).length

    const offered = applications.filter(
        (app) => app.status?.toLowerCase() === "offered"
    ).length

    const successRate = totalApplied
        ? Math.round((offered / totalApplied) * 100)
        : 0

    return (
        <div className="min-h-screen bg-[#0d0d0f] p-4 text-white md:p-6">

            {/* Search */}
            <div className="mb-8 flex items-center justify-between">
                <div className="relative w-full max-w-md">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                        type="text"
                        placeholder="Search applications..."
                        className="h-10 w-full rounded-lg border border-zinc-800 bg-[#111114] pl-9 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-600"
                    />
                </div>

                <div className="hidden items-center gap-4 text-zinc-400 sm:flex">
                    <Bookmark size={17} />
                    <FileText size={17} />
                </div>
            </div>

            {/* Header */}
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-xl font-semibold">My Applications</h1>
                    <p className="mt-1 text-xs text-zinc-500">
                        Track your job applications and interview progress in real-time.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex rounded-lg border border-zinc-800 bg-[#151518] p-1">
                        <button className="rounded-md bg-zinc-800 px-4 py-2 text-xs text-white">
                            Active
                        </button>
                        <button className="rounded-md px-4 py-2 text-xs text-zinc-500 hover:text-white">
                            Archived
                        </button>
                    </div>

                    <button className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black transition hover:bg-zinc-200">
                        <Download size={14} />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <div className="rounded-xl border border-zinc-800 bg-[#151518] p-4">
                    <p className="text-xs text-zinc-500">Total Applied</p>
                    <h2 className="mt-2 text-2xl font-semibold">
                        {totalApplied}
                    </h2>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#151518] p-4">
                    <p className="text-xs text-zinc-500">Shortlisted</p>
                    <h2 className="mt-2 text-2xl font-semibold">
                        {shortlisted}
                    </h2>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#151518] p-4">
                    <p className="text-xs text-zinc-500">Interviews</p>
                    <h2 className="mt-2 text-2xl font-semibold text-orange-400">
                        {interviews}
                    </h2>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#151518] p-4">
                    <p className="text-xs text-zinc-500">Success Rate</p>
                    <h2 className="mt-2 text-2xl font-semibold text-green-400">
                        {successRate}%
                    </h2>
                </div>
            </div>

            {/* Applications Table */}
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#151518]">

                <div className="hidden grid-cols-[2fr_1.3fr_1fr_1fr_70px] gap-4 border-b border-zinc-800 px-5 py-3 text-xs text-zinc-500 md:grid">
                    <span>Job Title</span>
                    <span>Company</span>
                    <span>Applied</span>
                    <span>Status</span>
                    <span className="text-right">Action</span>
                </div>

                {applications.length > 0 ? (
                    applications.map((application) => {
                        const title =
                            application.jobTitle ||
                            application.jobDetails?.title ||
                            application.job?.title ||
                            application.title ||
                            "Untitled Job"

                        const company =
                            application.companyName ||
                            application.jobDetails?.company ||
                            application.job?.company ||
                            application.company ||
                            "Unknown Company"

                        const jobType =
                            application.jobDetails?.jobType ||
                            application.job?.jobType ||
                            application.jobType ||
                            "Full-time"

                        const isRemote =
                            application.jobDetails?.remote ??
                            application.job?.remote ??
                            application.remote

                        const location =
                            application.jobDetails?.location ||
                            application.job?.location ||
                            application.location

                        const status = application.status || "Applied"

                        return (
                            <div
                                key={application._id}
                                className="grid grid-cols-1 gap-3 border-b border-zinc-800/80 px-5 py-4 transition hover:bg-zinc-800/20 last:border-b-0 md:grid-cols-[2fr_1.3fr_1fr_1fr_70px] md:items-center md:gap-4"
                            >
                                {/* Job */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800">
                                        <BriefcaseBusiness
                                            size={16}
                                            className="text-zinc-400"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate text-sm font-medium text-zinc-200">
                                            {title}
                                        </h3>
                                        <p className="mt-1 text-xs text-zinc-500">
                                            {jobType} • {isRemote ? "Remote" : "On-site"}
                                        </p>
                                    </div>
                                </div>

                                {/* Company */}
                                <div className="text-sm text-zinc-400">
                                    <span className="mr-2 text-xs text-zinc-500 md:hidden">
                                        Company:
                                    </span>
                                    {company}
                                    {location && (
                                        <p className="mt-1 text-xs text-zinc-500">
                                            {location}
                                        </p>
                                    )}
                                </div>

                                {/* Applied */}
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <CalendarDays size={13} className="md:hidden" />
                                    {formatDate(
                                        application.appliedAt ||
                                        application.createdAt
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <span
                                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(status)}`}
                                    >
                                        {status}
                                    </span>
                                </div>

                                {/* Action */}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 text-xs text-zinc-400 transition hover:text-white"
                                    >
                                        <Eye size={14} />
                                        Details
                                    </button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
                            <BriefcaseBusiness
                                size={24}
                                className="text-zinc-500"
                            />
                        </div>
                        <h3 className="text-sm font-medium text-zinc-200">
                            No applications yet
                        </h3>
                        <p className="mt-2 text-xs text-zinc-500">
                            Your job applications will appear here.
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="flex flex-col items-center justify-between gap-3 border-t border-zinc-800 px-5 py-3 sm:flex-row">
                    <p className="text-xs text-zinc-500">
                        Showing {applications.length} of {totalApplied} applications
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            disabled
                            className="rounded-md border border-zinc-800 p-2 text-zinc-500 disabled:opacity-50"
                        >
                            <ChevronLeft size={14} />
                        </button>

                        <button className="h-8 w-8 rounded-md bg-white text-xs font-medium text-black">
                            1
                        </button>

                        <button
                            disabled
                            className="rounded-md border border-zinc-800 p-2 text-zinc-500 disabled:opacity-50"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeekerApplicants
