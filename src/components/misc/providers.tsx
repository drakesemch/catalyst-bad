"use client";

import * as React from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "../ui/tooltip";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { env } from "~/env";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_API_HOST,
    ui_host: env.NEXT_PUBLIC_POSTHOG_UI_HOST,
  });
}

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
}
