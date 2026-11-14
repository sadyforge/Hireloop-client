import type { Job } from "@/lib/types/job"

/**
 * What gets sent to `POST /applications` and stored in the MongoDB
 * `applications` collection — the job fields are copied from the
 * listing so the recruiter dashboard does not need to join on `jobId`.
 */
export type ApplicationPayload = {
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
}

/**
 * Statuses a recruiter can set on an applicant while reviewing, in the
 * order an application usually moves through the hiring pipeline.
 */
export const APPLICATION_STATUSES = [
  "Applied",
  "Reviewed",
  "Shortlisted",
  "Interview",
  "Offered",
  "Rejected",
] as const

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]

/**
 * What `GET /applications` returns: the payload plus the Mongo `_id`.
 * Older records may be missing the newer fields, so they are optional.
 */
export type ApplicationRecord = ApplicationPayload & {
  _id: string
  userName?: string
  status?: string
  appliedAt?: string
  jobDetails?: Partial<Job>
}
