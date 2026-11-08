// Fetch the root page HTML from the running dev server and check whether
// the Navbar markup is present in the SSR output.
const res = await fetch("http://localhost:3000/", { headers: { accept: "text/html" } })
console.log("status:", res.status)
const html = await res.text()
for (const marker of ["Browse Jobs", "Company", "Pricing", "Sign In", "Get Started", "hire", "sticky top-0"]) {
  console.log(`contains "${marker}":`, html.includes(marker))
}
// Print around the header element if present
const idx = html.indexOf("<header")
console.log("header snippet:", idx === -1 ? "(no <header> in HTML!)" : html.slice(idx, idx + 300))

// Sanity: does this server run the NEW code? /dashboard should 307 to /sign-in
// (auth guard added recently); stale pre-change servers return 404 instead.
const dash = await fetch("http://localhost:3000/dashboard", { redirect: "manual" })
console.log("/dashboard status:", dash.status)
console.log("/dashboard location:", dash.headers.get("location"))
