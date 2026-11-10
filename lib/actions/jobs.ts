import type { CreateJobPayload } from "@/lib/types/job"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const createJob = async (data: CreateJobPayload) => {
  const res = await fetch(`${baseUrl}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
    method: "DELETE",
  })
  return res.json()
}
