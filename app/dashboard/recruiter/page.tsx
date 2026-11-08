import { requireAuth } from "@/lib/session"

export default async function RecruiterDashboardPage() {
  const session = await requireAuth()

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Recruiter dashboard</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Signed in as {session.user.email} (
        {String(session.user.role ?? "seeker")})
      </p>
    </div>
  )
}
