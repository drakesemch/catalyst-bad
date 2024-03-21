await import("./src/env.js");

import { withSentryConfig } from "@sentry/nextjs";
import { env } from "./src/env.js";

/** @type {import('next').NextConfig} */
const nextConfig = {};
export default withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: env.SENTRY_ORG,
    project: env.SENTRY_PROJECT,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
);
