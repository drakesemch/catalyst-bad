"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <div className="realtive sticky top-0 z-20 flex justify-center p-2">
    <div className="absolute inset-0 h-[calc(100%+4rem)] bg-[linear-gradient(to_bottom,color-mix(in_lch,hsl(var(--background))_30%,transparent)_20%,transparent_90%)] backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "relative z-10 flex max-w-[120ch] flex-1 items-center justify-start [&>*]:w-full",
        className,
      )}
      {...props}
    >
      <NavigationMenuList>{children}</NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  </div>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex w-full flex-1 list-none items-center justify-start space-x-1",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex gap-2 h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-[calc(1*15rem)] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-[calc(2*15rem)]",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & {
    href?: string;
  }
>(({ className, href, children, ...props }, ref) => (
  <>
    {href ? (
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuPrimitive.Link
          className={cn(navigationMenuTriggerStyle(), className)}
          {...props}
          ref={ref}
        >
          {children}
        </NavigationMenuPrimitive.Link>
      </Link>
    ) : (
      <NavigationMenuPrimitive.Link {...props} ref={ref}>
        {children}
      </NavigationMenuPrimitive.Link>
    )}
  </>
));

NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-start")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-3.5 h-[var(--radix-navigation-menu-viewport-height)] overflow-hidden rounded-md bg-popover/50 text-popover-foreground shadow-lg backdrop-blur transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

function NavigationMenuGrid({
  header,
  children,
  columns = 1,
  className,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  columns?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `grid w-full grid-cols-1 md:grid-cols-${columns + 1} gap-2 ${/*grid-rows-${(children as React.ReactNode[]).length + 1}*/ 0} ${/*md:grid-rows-${(children as React.ReactNode[]).length}*/ 0} md:grid-rows-${Math.ceil((children as React.ReactNode[]).length / columns)} p-4`,
        className,
      )}
    >
      <div
        className={`flex flex-col content-stretch md:row-span-${Math.ceil((children as React.ReactNode[]).length / columns)} [&>*]:h-full`}
      >
        <NavigationMenuLink asChild>{header}</NavigationMenuLink>
      </div>
      {React.Children.map(children, (child) => (
        <NavigationMenuLink asChild>{child}</NavigationMenuLink>
      ))}
    </div>
  );
}

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavigationMenuGrid,
};
