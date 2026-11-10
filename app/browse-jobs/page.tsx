"use client"

import React, { Suspense, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getJobs } from "@/lib/api/jobs"
import type { Job } from "@/lib/types/job"
import { Search, BriefcaseBusiness } from "lucide-react"
import JobCard from "@/app/browse-jobs/JobCard"

const jobTypes = [
  { label: "Full-time", value: "full-time", count: "1.2k" },
  { label: "Part-time", value: "part-time", count: "432" },
  { label: "Contract", value: "contract", count: "150" },
  { label: "Freelance", value: "freelance", count: "85" },
]

const workModes = [
  { label: "Remote", value: "true" },
  { label: "On-site", value: "false" },
]

const jobCategories = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Business & Finance",
  "Customer Support",
  "Education",
  "Other",
]

const BrowseJobsContent = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Search input synced with the URL
  const urlSearch = searchParams.get("search") || ""

  const [search, setSearch] = useState(urlSearch)

  // Re-sync the input when the URL changes outside the form (e.g. back navigation)
  const [syncedSearch, setSyncedSearch] = useState(urlSearch)

  if (urlSearch !== syncedSearch) {
    setSyncedSearch(urlSearch)
    setSearch(urlSearch)
  }

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  const query = searchParams.toString()

  // Get Selected Filters From URL
  const category = searchParams.get("category") || ""
  const selectedTypes = searchParams.getAll("type")
  const selectedModes = searchParams.getAll("mode")

  // Fetch Jobs According To URL
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)

        const data = await getJobs(query)
        setJobs(data)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [query])

  // Update URL Parameters
  const updateURL = (params: URLSearchParams) => {
    const queryString = params.toString()

    const url = `${pathname}${queryString ? `?${queryString}` : ""}`

    console.log("Updated Filters:", {
      search: params.get("search") || "",
      category: params.get("category") || "",
      jobTypes: params.getAll("type"),
      workModes: params.getAll("mode"),
      url,
    })

    router.replace(url, { scroll: false })
  }

  // Search Submit
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (search.trim()) {
      params.set("search", search.trim())
    } else {
      params.delete("search")
    }

    updateURL(params)
  }

  // Job Category Change
  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set("category", value)
    } else {
      params.delete("category")
    }

    updateURL(params)
  }

  // Job Type Change
  const handleJobTypeChange = (value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())

    const types = params.getAll("type")

    params.delete("type")

    const updatedTypes = checked
      ? [...types, value]
      : types.filter((type) => type !== value)

    updatedTypes.forEach((type) => {
      params.append("type", type)
    })

    updateURL(params)
  }

  // Work Mode Change
  const handleWorkModeChange = (value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())

    const modes = params.getAll("mode")

    params.delete("mode")

    const updatedModes = checked
      ? [...modes, value]
      : modes.filter((mode) => mode !== value)

    updatedModes.forEach((mode) => {
      params.append("mode", mode)
    })

    updateURL(params)
  }

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-[#131316] p-3 sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3">
            <Search size={17} className="text-zinc-500" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title, keywords..."
              className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Search Jobs
          </button>
        </form>

        {/* Content */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
          {/* Sidebar Filters */}
          <aside className="h-fit rounded-xl border border-zinc-800 bg-[#131316] p-4">
            <h3 className="mb-5 text-sm font-semibold text-white">Filters</h3>

            {/* Job Category */}
            <div>
              <h4 className="mb-3 text-xs font-medium text-zinc-300">
                Job Category
              </h4>

              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
              >
                <option value="">All Categories</option>

                {jobCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-5 border-t border-zinc-800" />

            {/* Job Type */}
            <div>
              <h4 className="mb-3 text-xs font-medium text-zinc-300">
                Job Type
              </h4>

              <div className="space-y-3">
                {jobTypes.map((type) => (
                  <label
                    key={type.value}
                    className="flex cursor-pointer items-center justify-between text-xs text-zinc-400"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={type.value}
                        checked={selectedTypes.includes(type.value)}
                        onChange={(e) =>
                          handleJobTypeChange(e.target.value, e.target.checked)
                        }
                        className="accent-indigo-500"
                      />
                      {type.label}
                    </span>

                    <span className="text-zinc-600">{type.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="my-5 border-t border-zinc-800" />

            {/* Work Mode */}
            <div>
              <h4 className="mb-3 text-xs font-medium text-zinc-300">
                Work Mode
              </h4>

              <div className="space-y-3">
                {workModes.map((mode) => (
                  <label
                    key={mode.value}
                    className="flex cursor-pointer items-center gap-2 text-xs text-zinc-400"
                  >
                    <input
                      type="checkbox"
                      value={mode.value}
                      checked={selectedModes.includes(mode.value)}
                      onChange={(e) =>
                        handleWorkModeChange(e.target.value, e.target.checked)
                      }
                      className="accent-indigo-500"
                    />
                    {mode.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Jobs Section */}
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-white">
                Found {jobs.length} Professional Jobs
              </h2>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-xs text-zinc-500">
                  Sort by:
                </label>

                <select
                  id="sort"
                  className="rounded-lg border border-zinc-800 bg-[#131316] px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="py-16 text-center text-sm text-zinc-500">
                  Loading jobs...
                </div>
              ) : jobs.length > 0 ? (
                jobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-[#131316] py-16 text-center">
                  <BriefcaseBusiness size={35} className="mb-3 text-zinc-600" />

                  <h3 className="text-sm font-semibold text-white">
                    No Jobs Found
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">
                    Try changing your search or filters.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

const BrowseJobsPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
      <BrowseJobsContent />
    </Suspense>
  )
}

export default BrowseJobsPage
