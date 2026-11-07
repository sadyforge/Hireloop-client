import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import type { StandardSchemaV1 } from "@standard-schema/spec"

const client = new MongoClient(process.env.DB_URL as string)
const db = client.db("hireloop")

/** Roles a user can be created with via the sign-up form. */
export type UserRole = "seeker" | "recruiter" | "admin"

const ROLE_VALUES: string[] = ["seeker", "recruiter", "admin"]

function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && ROLE_VALUES.includes(value)
}

/** Standard Schema that only accepts one of the known roles. */
const roleInputValidator = {
  "~standard": {
    version: 1,
    vendor: "hireloop",
    validate(value: unknown) {
      if (isUserRole(value)) {
        return { value }
      }
      return {
        issues: [
          {
            message: "Role must be one of: seeker, recruiter, admin",
          },
        ],
      }
    },
  },
} satisfies StandardSchemaV1<unknown, UserRole>

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      // Accepts the role chosen on the sign-up form. Anything the client
      // omits (e.g. GitHub social sign-up) defaults to "seeker".
      role: {
        type: ["seeker", "recruiter", "admin"],
        defaultValue: "seeker",
        validator: { input: roleInputValidator },
      },
    },
  },
  // Only register the GitHub provider when its credentials are configured,
  // otherwise better-auth would receive undefined credentials.
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        socialProviders: {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        },
      }
    : {}),
  database: mongodbAdapter(db, {
    client,
  }),
})
