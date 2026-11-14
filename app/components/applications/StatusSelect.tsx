"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { APPLICATION_STATUSES } from "@/lib/types/application"
import { cn } from "@/lib/utils"

/** Trigger text color per status, tuned for the dark recruiter dashboard. */
const statusTriggerClasses: Record<string, string> = {
  applied: "text-white/70",
  reviewed: "text-yellow-400",
  shortlisted: "text-blue-400",
  interview: "text-orange-400",
  offered: "text-emerald-400",
  rejected: "text-red-400",
}

type StatusSelectProps = {
  /** Current status of the application. */
  value: string
  /** Called with the newly chosen status. */
  onValueChange: (status: string) => void
  className?: string
}

/**
 * Controlled dropdown listing every application status. The parent owns
 * the value so it can persist (or roll back) the change where the API
 * allows it.
 */
const StatusSelect = ({
  value,
  onValueChange,
  className,
}: StatusSelectProps) => {
  const triggerColor =
    statusTriggerClasses[value.toLowerCase()] ?? statusTriggerClasses.applied

  return (
    <Select
      value={value}
      onValueChange={(nextStatus) => {
        if (typeof nextStatus === "string") {
          onValueChange(nextStatus)
        }
      }}
    >
      <SelectTrigger
        aria-label="Application status"
        className={cn(
          "w-36 border-white/10 bg-[#1A1A1F] text-xs hover:bg-white/5 focus-visible:border-white/20 focus-visible:ring-white/10 data-[placeholder]:text-white/40",
          triggerColor,
          className
        )}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="border border-white/10 bg-[#141419] text-white ring-white/10">
        {APPLICATION_STATUSES.map((status) => (
          <SelectItem
            key={status}
            value={status}
            className="focus:bg-white/10 focus:text-white data-highlighted:bg-white/10 data-highlighted:text-white"
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default StatusSelect
