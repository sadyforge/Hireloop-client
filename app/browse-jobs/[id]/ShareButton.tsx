"use client"

import { Share2 } from "lucide-react"
import toast from "react-hot-toast"

const ShareButton = () => {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Job link copied to clipboard")
    } catch {
      toast.error("Could not copy the job link")
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share this job"
      title="Share this job"
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-zinc-700 hover:text-white"
    >
      <Share2 size={16} />
    </button>
  )
}

export default ShareButton
