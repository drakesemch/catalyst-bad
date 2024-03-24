import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuGrid,
  NavigationMenuTrigger,
  NavigationMenuLink,
  HamburgerMenu,
  HamburgerMenuItem,
  HamburgerMenuTrigger,
  HamburgerMenuContent,
  HamburgerMenuLink,
} from "~/components/ui/navigation-menu";

import { Button } from "~/components/ui/button";
import {
  ArrowRight,
  FlaskConical,
  MessageCircle,
  Newspaper,
} from "lucide-react";
import { AppButton } from "~/components/site/app-button";

export function Nav() {
  return (
    <NavigationMenu>
      <HamburgerMenu
        mobile={
          <>
            <HamburgerMenuItem>
              <HamburgerMenuTrigger>
                <FlaskConical /> Catalyst <ArrowRight className="ml-auto" />
              </HamburgerMenuTrigger>
              <HamburgerMenuContent>
                <Button variant="ghost" className="justify-start" href="/">
                  Home
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  href="/features"
                >
                  Features
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  href="/about-us"
                >
                  About Us
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  href="/pricing"
                >
                  Pricing
                </Button>
              </HamburgerMenuContent>
            </HamburgerMenuItem>
            <HamburgerMenuItem>
              <HamburgerMenuTrigger>
                <MessageCircle /> Contact <ArrowRight className="ml-auto" />
              </HamburgerMenuTrigger>
              <HamburgerMenuContent>
                <Button variant="ghost" className="justify-start">
                  Contact
                </Button>
                <Button variant="ghost" className="justify-start">
                  Send Feedback
                </Button>
                <Button variant="ghost" className="justify-start">
                  Support
                </Button>
                <Button variant="ghost" className="justify-start">
                  Contact Us
                </Button>
              </HamburgerMenuContent>
            </HamburgerMenuItem>
            <HamburgerMenuLink href="/blog">
              <Newspaper /> Blog
            </HamburgerMenuLink>
            <AppButton className="mt-4 w-full" />
          </>
        }
      >
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <FlaskConical className="!size-[1rem]" /> Catalyst
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGrid
              header={
                <Button
                  variant="secondary"
                  href="/"
                  className="flex h-full w-full flex-col items-start justify-end gap-2 pt-16 text-left text-xl backdrop-blur-none"
                >
                  <FlaskConical />
                  <h1 className="!text-lg font-bold">Catalyst</h1>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    A reimagined canvas for students
                  </p>
                </Button>
              }
            >
              <Button
                variant="ghost"
                className="h-auto justify-start"
                href="/features"
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Features</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    All the cool shit we have.
                  </p>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="h-auto justify-start"
                href="/about"
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">About Us</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Who we are and what we do.
                  </p>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="h-auto justify-start"
                href="/pricing"
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Pricing</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Well... it{"'"}s free!
                  </p>
                </div>
              </Button>
            </NavigationMenuGrid>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <MessageCircle className="!size-[1rem]" /> Contact
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGrid
              header={
                <Button variant="secondary" className="backdrop-blur-none">
                  <div className="flex h-full w-full flex-col content-start justify-end gap-2 pt-16 text-left text-xl">
                    <MessageCircle />
                    <h1 className="!text-lg font-bold">Contact</h1>
                    <p className="muted !mt-0 whitespace-break-spaces">
                      Ways to send feedback, get support, and contact us.
                    </p>
                  </div>
                </Button>
              }
            >
              <Button variant="ghost" className="h-auto justify-start">
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Send Feedback</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Give us feedback on what went well / didn{"'"}t go so well.
                  </p>
                </div>
              </Button>
              <Button variant="ghost" className="h-auto justify-start">
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Support</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Get help using the application.
                  </p>
                </div>
              </Button>
              <Button variant="ghost" className="h-auto justify-start">
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Contact Us</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Create a ticket and/or send us an email!
                  </p>
                </div>
              </Button>
            </NavigationMenuGrid>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/blog">
            <Newspaper className="!size-[1rem]" />
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </HamburgerMenu>
      <div className="!ml-auto" />
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <span>
            <AppButton className="w-full" />
          </span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
