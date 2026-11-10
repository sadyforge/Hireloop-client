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
