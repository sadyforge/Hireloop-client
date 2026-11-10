
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useSession } from "@/lib/auth-client"
import { applyJob } from "@/lib/actions/application"
import toast from "react-hot-toast"

import type { Job } from "@/lib/types/job"

type ApplyButtonProps = {
  job: Job
}

const ApplyButton = ({ job }: ApplyButtonProps) => {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const user = session?.user
  const [loading, setLoading] = useState(false)

  const handleApply = async () => {
    if (isPending) {
      return
    }

    if (!user) {
      router.push(
        `/sign-in?redirectTo=${encodeURIComponent(`/browse-jobs/${job._id}`)}`
      )
      return
    }

    if (user.role !== "seeker") {
      toast.error("Only job seekers can apply to a job")
      return
    }

    const application = {
      jobId: job._id,

      // All job information
      jobDetails: { ...job },

      // Job information for easy access
      jobTitle: job.title,
      companyName: job.company,

      // User information
      userId: user.id,
      email: user.email,
      userName: user.name,

      // Application information
      status: "Applied",
      appliedAt: new Date().toISOString(),
    }

    setLoading(true)

    try {
      const res = await applyJob(application)

      if (res) {
        toast.success("Successfully submitted application")
        router.push("/browse-jobs")
      } else {
        toast.error("Failed to submit application")
      }
    } catch (error) {
      console.error("Application error:", error)
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleApply}
      disabled={loading}
      className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Applying..." : "Apply Now"}
    </button>
  )
}

export default ApplyButton
