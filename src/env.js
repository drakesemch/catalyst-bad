import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) =>
          !str.includes(
            "postgresql://USERNAME:PASSWORD@HOST:PORT/DB_NAME?sslmode=verify-full",
          ),
        "Please change the URL to your own database URL. We recommend using CockroachDB or something similar.",
      ),
    SENTRY_AUTH_TOKEN: z.string().length(64, {
      message: "Sentry Auth Token should be 64 characters long",
    }),
    SENTRY_ORG: z.string(),
    SENTRY_PROJECT: z.string(),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string({
            required_error:
              "NEXTAUTH_SECRET is strongly recommended in production",
          })
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    GOOGLE_CLIENT_ID: z
      .string()
      .length(73, {
        message: "Google Client ID should be 73 characters long",
      })
      .refine((str) => str.includes("apps.googleusercontent.com"), {
        message:
          "Google Client ID must be a URL and contain 'apps.googleusercontent.com'",
      })
      .refine(
        (str) =>
          !str.includes(
            "0000000000000-abcdefghijklmnopqrstuvwxyz012345.apps.googleusercontent.com",
          ),
        {
          message:
            "Please change the Google Client ID to your own; if you need one, please visit Google Cloud API Console.",
        },
      ),
    GOOGLE_CLIENT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z
      .string()
      .length(95, {
        message: "Sentry DSN should be 95 characters long",
      })
      .refine(
        (str) =>
          !str.includes(
            "https://abcdefghijklmnopqrstuvwxyz012345@abcdefghijklmnopq.ingest.us.sentry.io/0000000000000000",
          ),
        {
          message:
            "Please change the NEXT_PUBLIC_SENTRY_DSN to your own; if you need one, please visit https://sentry.io.",
        },
      ),
    NEXT_PUBLIC_POSTHOG_KEY: z
      .string()
      .length(47, {
        message: "PostHog key is be 47 characters long",
      })
      .refine((str) => str.startsWith("phc_"), {
        message: "PostHog key must start with 'phc_'",
      })
      .refine(
        (str) =>
          !str.includes("phc_abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG"),
      ),
    NEXT_PUBLIC_POSTHOG_API_HOST: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    NEXT_PUBLIC_POSTHOG_UI_HOST: z.string().url({
      message: "PostHog host must be a URL",
    }),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_API_HOST: process.env.NEXT_PUBLIC_POSTHOG_API_HOST,
    NEXT_PUBLIC_POSTHOG_UI_HOST: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
