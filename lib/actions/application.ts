import type { ApplicationPayload } from "@/lib/types/application"

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


export const getApplyJob = async () => {
 const res=await fetch(`${baseUrl}/applications`)
 return res.json()
}
