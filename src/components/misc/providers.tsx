"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { TooltipProvider } from "../ui/tooltip";
import { ClerkProvider, MultisessionAppSupport } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { env } from "@/env";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Analytics>
      <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <MultisessionAppSupport>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </MultisessionAppSupport>
      </ClerkProvider>
    </Analytics>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
