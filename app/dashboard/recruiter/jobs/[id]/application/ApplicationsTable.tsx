"use client"

import { useState } from "react"

import StatusSelect from "@/app/components/applications/StatusSelect"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ApplicationRecord } from "@/lib/types/application"
import { cn } from "@/lib/utils"
import { updateApplicationStatus } from "@/lib/actions/application"

type ApplicationsTableProps = {
  applications: ApplicationRecord[]
}

const headClass =
  "h-auto px-5 py-3 text-xs font-medium tracking-wide text-white/50 uppercase"

const cellClass = "px-5 py-4"

const formatAppliedDate = (date?: string) => {
  if (!date) {
    return "—"
  }

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return "—"
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Applicant list for one job. Statuses live in local state so the
 * recruiter sees every change immediately; persisting them to the
 * database is handled in `handleStatusChange` once the backend exposes
 * an update endpoint.
 */
const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  const [statuses, setStatuses] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      applications.map((application) => [
        application._id,
        application.status ?? "Applied",
      ])
    )
  )

  const handleStatusChange =async (applicationId: string, status: string) => {
    
    const result=await updateApplicationStatus(applicationId,{status})
    console.log(result,'update result')
    if(result.modifiedCount>0){

      setStatuses((current) => ({ ...current, [applicationId]: status }))
    }


  }

  if (applications.length === 0) {
    return (
      <p className="rounded-2xl border border-white/10 bg-[#101010]/95 px-5 py-16 text-center text-sm text-white/50">
        No applications have been submitted for this job yet.
      </p>
    )
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010]/95 shadow-[inset_0_3px_10px_rgba(255,255,255,0.04)]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className={cn(headClass, "w-[30%]")}>
                Applicant
              </TableHead>
              <TableHead className={cn(headClass, "w-[28%]")}>Email</TableHead>
              <TableHead className={cn(headClass, "w-[22%]")}>
                Applied
              </TableHead>
              <TableHead className={cn(headClass, "w-[20%]")}>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.map((application) => {
              const status =
                statuses[application._id] ?? application.status ?? "Applied"

              return (
                <TableRow
                  key={application._id}
                  className="border-white/5 hover:bg-white/[0.03]"
                >
                  <TableCell className={cn(cellClass, "text-[#EDEDEF]")}>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#5C53FE]/15 text-sm font-semibold text-[#8B85FF]"
                        aria-hidden
                      >
                        {(application.userName ?? "?").charAt(0).toUpperCase()}
                      </span>

                      <span className="truncate font-medium">
                        {application.userName || "Unknown applicant"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className={cn(cellClass, "text-white/70")}>
                    {application.email}
                  </TableCell>

                  <TableCell className={cn(cellClass, "text-white/70")}>
                    {formatAppliedDate(application.appliedAt)}
                  </TableCell>

                  <TableCell className={cellClass}>
                    <StatusSelect
                      value={status}
                      onValueChange={(nextStatus) =>
                        handleStatusChange(application._id, nextStatus)
                      }
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default ApplicationsTable
