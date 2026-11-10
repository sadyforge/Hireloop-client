import type { Job } from "@/lib/types/job"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

/**
 * Fetch the job list. The result is left untyped on purpose: the public
 * browse page and the recruiter table render different views of the same
 * records, so each caller types the result itself.
 */
export const getJobs = async (query = "") => {
  const res = await fetch(`${baseUrl}/jobs?${query}`)
  return res.json()
}

/**
 * Fetch a single job. Returns `null` when the job does not exist or the
 * API is unreachable, so callers can render a "not found" state instead
 * of crashing.
 */
export const getJobById = async (jobId: string): Promise<Job | null> => {
  try {
    const res = await fetch(`${baseUrl}/jobs/${jobId}`)

    if (!res.ok) {
      return null
    }

    return (await res.json()) as Job
  } catch (error) {
    console.error(`Failed to fetch job ${jobId}:`, error)
    return null
  }
}
