"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <CollapsiblePrimitive.CollapsibleContent
    className={cn(
      "overflow-hidden [&[data-state='closed']]:animate-slide-up [&[data-state='open']]:animate-slide-down",
      className,
    )}
  >
    {children}
  </CollapsiblePrimitive.CollapsibleContent>
);

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
