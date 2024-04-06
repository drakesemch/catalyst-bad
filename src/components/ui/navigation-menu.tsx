"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ArrowLeft, ChevronDown, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./button";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useEffect } from "react";
import { Separator } from "./separator";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <div className="realtive fixed bottom-0 z-20 flex w-full justify-center p-2 sm:sticky sm:top-0">
    <div className="absolute bottom-0 h-[calc(100%+4rem)] w-full bg-[linear-gradient(to_top,color-mix(in_lch,hsl(var(--background))_30%,transparent)_20%,transparent_90%)] backdrop-blur-xl [mask-image:linear-gradient(to_top,black_50%,transparent)] contrast-more:!h-[100%] contrast-more:!bg-background contrast-more:!blur-0 contrast-more:![mask-image:unset] sm:top-0 sm:bg-[linear-gradient(to_bottom,color-mix(in_lch,hsl(var(--background))_30%,transparent)_20%,transparent_90%)] sm:[mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />
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
  "group inline-flex gap-2 h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
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
    {children}
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
      "left-0 top-0 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute",
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
        "origin-top-center relative mt-3.5 h-[var(--radix-navigation-menu-viewport-height)] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
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
    <div className="flex gap-2 p-4">
      <div className="w-[20ch] flex-1">
        <NavigationMenuLink asChild>{header}</NavigationMenuLink>
      </div>
      <div
        className={cn(
          `grid grid-cols-${columns} max-h-[min(80ch,50vh)] w-[20ch] gap-2 overflow-auto`,
          className,
        )}
      >
        {React.Children.map(children, (child) => (
          <NavigationMenuLink asChild>{child}</NavigationMenuLink>
        ))}
      </div>
    </div>
  );
}

const HamburgerMenuContext = React.createContext<{
  mainMenu: boolean;
  renderContent: React.ReactNode;
  setMainMenu: (_mainMenu: boolean) => void;
  setRenderContent: (_content: React.ReactNode) => void;
}>({
  mainMenu: true,
  renderContent: <></>,
  setMainMenu: (_mainMenu: boolean) => {
    /* */
  },
  setRenderContent: (_content: React.ReactNode) => {
    /* */
  },
});

const HamburgerMenuItemContext = React.createContext<{
  content: React.ReactNode;
  setContent: (_content: React.ReactNode) => void;
}>({
  content: <></>,
  setContent: (_content: React.ReactNode) => {
    /* */
  },
});

function HamburgerMenu({
  mobile,
  children,
}: {
  mobile: React.ReactNode;
  children: React.ReactNode;
}) {
  const [mainMenu, setMainMenu] = React.useState(true);
  const [renderContent, setRenderContent] = React.useState<React.ReactNode>(
    <></>,
  );
  const mainMenuRef = React.useRef<HTMLDivElement>(null);
  const secondaryMenuRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [viewportHeight, setViewportHeight] = React.useState("0px");

  useEffect(() => {
    if (mainMenu) {
      setTimeout(() => {
        setViewportHeight(
          (document.querySelector("#main-menu-ref")?.clientHeight ?? 0) + "px",
        );
        document.querySelectorAll("#main-menu-ref a").forEach((el) => {
          el.addEventListener("click", () => {
            setMainMenu(true);
            setOpen(false);
          });
        });
      });
    } else {
      setTimeout(() => {
        setViewportHeight(
          (document.querySelector("#secondary-menu-ref")?.clientHeight ?? 0) +
            "px",
        );
        document.querySelectorAll("#secondary-menu-ref a").forEach((el) => {
          el.addEventListener("click", () => {
            setMainMenu(true);
            setOpen(false);
          });
        });
      });
    }
  }, [mainMenu, open]);

  return (
    <>
      <div className="hidden gap-2 sm:flex">{children}</div>
      <Drawer
        open={open}
        onClose={() => {
          setMainMenu(true);
        }}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
        }}
      >
        <DrawerTrigger asChild>
          <Button className="flex sm:hidden" size="icon" variant="secondary">
            <Menu className="!size-[1rem]" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <HamburgerMenuContext.Provider
            value={{
              mainMenu,
              renderContent,
              setMainMenu,
              setRenderContent,
            }}
          >
            <div className="max-h-[min(80vh,20rem)] overflow-scroll">
              <div
                className="max-h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden transition-all duration-300"
                style={{
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                  ["--radix-navigation-menu-viewport-height" as any]:
                    viewportHeight,
                }}
                id="hamburger-menu-viewport"
              >
                <div
                  className={cn(
                    "bottom-0 flex w-[calc((100%-0.0625rem)*2)] origin-left items-start gap-1 transition-all duration-300",
                    !mainMenu ? "-translate-x-[50%]" : "transition-0",
                  )}
                >
                  <div
                    className="flex flex-1 flex-col gap-2 p-4"
                    ref={mainMenuRef}
                    id="main-menu-ref"
                  >
                    {mobile}
                  </div>
                  <div
                    className="flex flex-1 flex-col gap-2 p-4"
                    ref={secondaryMenuRef}
                    id="secondary-menu-ref"
                  >
                    {renderContent}
                    <Separator />
                    <div className="sticky bottom-0">
                      <Button
                        variant="ghost"
                        className="flex w-full justify-start gap-2"
                        onClick={() => {
                          setMainMenu(true);
                        }}
                      >
                        <ArrowLeft className="!size-[1rem]" /> Go back
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HamburgerMenuContext.Provider>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function HamburgerMenuItem({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<React.ReactNode>(<></>);
  return (
    <HamburgerMenuItemContext.Provider value={{ content, setContent }}>
      {children}
    </HamburgerMenuItemContext.Provider>
  );
}

function HamburgerMenuTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setMainMenu, setRenderContent } =
    React.useContext(HamburgerMenuContext);
  const { content } = React.useContext(HamburgerMenuItemContext);
  return (
    <Button
      variant="ghost"
      className={cn("flex justify-start gap-2 text-left", className)}
      onClick={() => {
        setMainMenu(false);
        setRenderContent(content);
      }}
    >
      {children}
    </Button>
  );
}

function HamburgerMenuLink({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Button
      variant="ghost"
      className={cn("flex justify-start gap-2 text-left", className)}
      href={href}
    >
      {children}
    </Button>
  );
}

function HamburgerMenuContent({ children }: { children: React.ReactNode }) {
  const { setContent } = React.useContext(HamburgerMenuItemContext);
  useEffect(() => {
    setContent(children);
  }, [children]);
  return null;
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
  HamburgerMenu,
  NavigationMenuGrid,
  HamburgerMenuItem,
  HamburgerMenuTrigger,
  HamburgerMenuLink,
  HamburgerMenuContent,
};
