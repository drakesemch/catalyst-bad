await import("./src/env.js");

import { withSentryConfig } from "@sentry/nextjs";

export default withSentryConfig(
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    experimental: {
      serverActions: {
        allowedOrigins: ["141h4rk5-3000.use2.devtunnels.ms", "localhost:3000"],
      },
    },
  },
  {
    silent: true,
    org: "blue-flame-tb",
    project: "javascript-nextjs",
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
