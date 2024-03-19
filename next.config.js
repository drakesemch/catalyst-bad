await import("./src/env.js");

import { withSentryConfig } from "@sentry/nextjs";

export default withSentryConfig(
  {},
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
