"use client";

import * as React from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "../ui/tooltip";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { env } from "~/env";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TRPCReactProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider client={posthog}>
            <TooltipProvider>{children}</TooltipProvider>
          </PostHogProvider>
        </NextThemesProvider>
      </TRPCReactProvider>
    </>
  );
}
