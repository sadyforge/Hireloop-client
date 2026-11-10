import Link from "next/link"
import { ArrowLeft, BriefcaseBusiness } from "lucide-react"

export default function JobNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 text-white">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-[#131316] p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
          <BriefcaseBusiness size={24} className="text-zinc-600" />
        </div>

        <h1 className="mt-5 text-lg font-semibold">Job Not Found</h1>

        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          This job may have been removed or the link you followed is incorrect.
        </p>

        <Link
          href="/browse-jobs"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <ArrowLeft size={15} />
          Back to Jobs
        </Link>
      </div>
    </main>
  )
}
