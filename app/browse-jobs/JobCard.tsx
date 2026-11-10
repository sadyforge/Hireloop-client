import Link from "next/link"
import {
    Bookmark,
    BriefcaseBusiness,
    MapPin,
    DollarSign,
} from "lucide-react"

type Job = {
    _id: string
    title: string
    company: string
    location: string
    jobType: string
    isRemote?: boolean
    remote?: boolean
    salaryMin?: number
    salaryMax?: number
    salaryPeriod?: string
}

const JobCard = ({ job }: { job: Job }) => {
    const isRemote = job.isRemote ?? job.remote

    return (
        <Link
            href={`/browse-jobs/${job._id}`}
            className="block rounded-xl border border-zinc-800 bg-[#131316] p-4 transition hover:border-zinc-700"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                        <BriefcaseBusiness
                            size={20}
                            className="text-zinc-400"
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            {job.title}
                        </h3>

                        <p className="mt-1 text-xs text-zinc-500">
                            {job.company} • {job.location}
                        </p>
                    </div>
                </div>

                <span
                    aria-label="Save job"
                    className="text-zinc-500 transition hover:text-white"
                >
                    <Bookmark size={17} />
                </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                {job.salaryMin !== undefined &&
                    job.salaryMax !== undefined && (
                        <span className="flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-300">
                            <DollarSign size={12} />
                            {job.salaryMin.toLocaleString()} -{" "}
                            {job.salaryMax.toLocaleString()}
                            {job.salaryPeriod && ` / ${job.salaryPeriod}`}
                        </span>
                    )}

                <span className="flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-400">
                    <BriefcaseBusiness size={12} />
                    {job.jobType}
                </span>

                <span className="flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-400">
                    <MapPin size={12} />
                    {isRemote ? "Remote" : "On-site"}
                </span>
            </div>
        </Link>
    )
}

export default JobCard