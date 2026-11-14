const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const checkOutVerify = async (sessionId: string) => {
  const res = await fetch(`${baseUrl}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(sessionId),
  })
  return res.json()
}

