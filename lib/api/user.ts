const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

/**
 * `GET /users/:id/premium` responds with `{ "premium": true | false }`.
 * Client-safe: plain fetch against the public API base URL, so it can
 * be imported from client components (no server-only dependencies).
 */
export const getUserPremiumById = async (
  userId: string
): Promise<{ premium: boolean }> => {
  const response = await fetch(`${baseUrl}/users/${userId}/premium`)
  return response.json()
}
