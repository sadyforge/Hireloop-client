/**
 * A job record as returned by the HireLoop API
 * (`GET /jobs` and `GET /jobs/:id`).
 *
 * Fields the API may not always fill are optional. Older records use
 * `isRemote` instead of `remote`, so both are kept and callers should
 * fall back: `job.isRemote ?? job.remote`.
 */
export type Job = {
  _id: string
  title: string
  company: string
  category: string
  jobType: string
  location: string
  remote?: boolean
  isRemote?: boolean
  deadline?: string
  salaryMin?: number
  salaryMax?: number
  salaryPeriod?: string
  responsibilities?: string
  requirements?: string
}

/** State of the "Post a New Job" form — text inputs keep values as strings. */
export type JobFormData = {
  title: string
  company: string
  category: string
  jobType: string
  remote: boolean
  location: string
  deadline: string
  salaryMin: string
  salaryMax: string
  salaryPeriod: string
  responsibilities: string
  requirements: string
}

/** What actually gets sent to `POST /jobs` — the form converts salaries to numbers before submitting. */
export type CreateJobPayload = Omit<JobFormData, "salaryMin" | "salaryMax"> & {
  salaryMin: number
  salaryMax: number
}
