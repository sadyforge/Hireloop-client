const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const updateUserRole = async (userId:string,role:"seeker"|"recruiter"|"admin") => {
  const res = await fetch(`${baseUrl}/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({role} ),
  })
  return res.json()
}
