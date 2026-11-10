const JobDetailsLoading = () => {
  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-3 w-24 animate-pulse rounded-md bg-zinc-800" />

        {/* Header */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-zinc-800 bg-[#131316] p-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 animate-pulse rounded-xl bg-zinc-800" />

            <div>
              <div className="h-5 w-56 animate-pulse rounded-md bg-zinc-800" />
              <div className="mt-2.5 h-3 w-40 animate-pulse rounded-md bg-zinc-800" />
            </div>
          </div>

          <div className="hidden h-10 w-28 animate-pulse rounded-lg bg-zinc-800 sm:block" />
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-zinc-800 bg-[#131316] p-4"
            >
              <div className="h-3 w-20 animate-pulse rounded-md bg-zinc-800" />
              <div className="mt-3 h-3.5 w-32 animate-pulse rounded-md bg-zinc-800" />
            </div>
          ))}
        </div>

        {/* Description + Sidebar */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-xl border border-zinc-800 bg-[#131316] p-6">
            <div className="h-5 w-40 animate-pulse rounded-md bg-zinc-800" />

            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-full animate-pulse rounded-md bg-zinc-800"
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#131316] p-5">
            <div className="h-3.5 w-36 animate-pulse rounded-md bg-zinc-800" />

            <div className="mt-4 h-20 animate-pulse rounded-lg bg-zinc-800" />

            <div className="mt-4 space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-full animate-pulse rounded-md bg-zinc-800"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default JobDetailsLoading
