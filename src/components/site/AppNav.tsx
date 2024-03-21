import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuGrid,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuHamburger,
} from "~/components/ui/navigation-menu";

import { Button } from "~/components/ui/button";
import {
  ArrowRight,
  FlaskConical,
  MessageCircle,
  Newspaper,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function AppNav() {
  return (
    <NavigationMenu>
      <NavigationMenuHamburger
        mobile={
          <>
            <Button variant="ghost" className="justify-start">
              <FlaskConical /> Catalyst <ArrowRight className="ml-auto" />
            </Button>
            <Button variant="ghost" className="justify-start">
              <MessageCircle /> Contact <ArrowRight className="ml-auto" />
            </Button>
            <Button variant="ghost" className="justify-start" href="/blog">
              <Newspaper /> Blog
            </Button>
          </>
        }
      >
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <FlaskConical /> Catalyst
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
                  <h1>Catalyst</h1>
                  <p className="muted whitespace-break-spaces">
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
                  <p className="muted whitespace-break-spaces">
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
                  <p className="muted whitespace-break-spaces">
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
                  <p className="muted whitespace-break-spaces">
                    Well... it{"'"}s free!
                  </p>
                </div>
              </Button>
            </NavigationMenuGrid>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <MessageCircle /> Contact
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGrid
              header={
                <Button variant="secondary" className="backdrop-blur-none">
                  <div className="flex h-full w-full flex-col content-start justify-end gap-2 pt-16 text-left text-xl">
                    <MessageCircle />
                    <h1>Contact</h1>
                    <p className="muted whitespace-break-spaces">
                      Ways to send feedback, get support, and contact us.
                    </p>
                  </div>
                </Button>
              }
            >
              <Button variant="ghost" className="h-auto justify-start">
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Send Feedback</div>
                  <p className="muted whitespace-break-spaces">
                    Give us feedback on what went well / didn{"'"}t go so well.
                  </p>
                </div>
              </Button>
              <Button variant="ghost" className="h-auto justify-start">
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Support</div>
                  <p className="muted whitespace-break-spaces">
                    Get help using the application.
                  </p>
                </div>
              </Button>
              <Button variant="ghost" className="h-auto justify-start">
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Contact</div>
                  <p className="muted whitespace-break-spaces">
                    Create a ticket and/or send us an email!
                  </p>
                </div>
              </Button>
            </NavigationMenuGrid>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/blog">
            <Newspaper />
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuHamburger>
      <div className="!ml-auto" />
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Button href="/account">Sign In</Button>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
