import type {
  ApplicationPayload,
  ApplicationRecord,
} from "@/lib/types/application"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const applyJob = async (data: ApplicationPayload) => {
  const res = await fetch(`${baseUrl}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}



export const updateApplicationStatus = async (id:string,data:{status:string}) => {
  const res = await fetch(`${baseUrl}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}




export const getApplyJob = async (query = ""): Promise<ApplicationRecord[]> => {
  const res = await fetch(`${baseUrl}/applications/${query}`)
  return res.json()
}
export const getApplicationsCount = async (
  query = ""
): Promise<{ count: number }> => {
  const res = await fetch(`${baseUrl}/applications/count?${query}`)
  return res.json()
}

/**
 * Fetch the applications submitted for one job. The API does not expose
 * a per-job filter yet, so all applications are fetched and filtered
 * here. Returns `[]` when the API is unreachable or unusable, so pages
 * can render an empty state instead of crashing.
 */
export const getApplicationsByJob = async (
  jobId: string
): Promise<ApplicationRecord[]> => {
  try {
    const res = await fetch(`${baseUrl}/applications/`)

    if (!res.ok) {
      return []
    }

    const applications = (await res.json()) as ApplicationRecord[]

    if (!Array.isArray(applications)) {
      return []
    }

    return applications.filter((application) => application.jobId === jobId)
  } catch (error) {
    console.error(`Failed to fetch applications for job ${jobId}:`, error)
    return []
  }
}
