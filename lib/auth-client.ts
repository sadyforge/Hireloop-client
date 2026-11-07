import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    // Infers extra user fields (e.g. `role`) from the server config so
    // they show up typed in the client API.
    inferAdditionalFields<typeof auth>(),
  ],
})

// Destructure from the configured client so requests hit `BETTER_AUTH_URL`.
export const { signIn, signUp, useSession } = authClient
