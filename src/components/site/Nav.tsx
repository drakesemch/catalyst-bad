import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuGrid,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { MessageCircle, Newspaper, TestTube2 } from "lucide-react";

export function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          <TestTube2 /> Catalyst
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuGrid
            header={
              <Button
                variant="secondary"
                href="/"
                className="flex h-full w-full flex-col items-start justify-end gap-2 pt-16 text-left text-xl"
              >
                <TestTube2 />
                <h1>Catalyst</h1>
                <p className="muted whitespace-break-spaces">
                  A reimagined workspace for students
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
              <Button variant="secondary">
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
            <Button variant="ghost" className="h-auto justify-start">
              <div className="flex flex-col gap-1 text-left">
                <div className="font-bold">Social Contact</div>
                <p className="muted whitespace-break-spaces">
                  Page of socials to contact us.
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
      <div className="!ml-auto" />
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Button href="/account">Get Started</Button>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
