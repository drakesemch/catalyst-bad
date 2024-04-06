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
  Book,
  FlaskConical,
  Home,
  MessageCircle,
  Newspaper,
} from "lucide-react";
import { AppButton } from "~/components/site/app-button";
import { canvas } from "~/server/canvas";
import moment from "moment";

export async function AppNav() {
  const periods = (await canvas.getCourseListWithSchedule())?.filter(
    (period) => {
      return (
        period.type != "single-select" || period.name == period.value?.name
      );
    },
  );

  return (
    <NavigationMenu>
      <HamburgerMenu
        mobile={
          <>
            <HamburgerMenuItem>
              <HamburgerMenuTrigger>
                <FlaskConical className="!size-[1rem]" /> Catalyst
                <ArrowRight className="ml-auto !size-[1rem]" />
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
                <MessageCircle className="!size-[1rem]" /> Contact
                <ArrowRight className="ml-auto !size-[1rem]" />
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
              <Newspaper className="!size-[1rem]" /> Blog
            </HamburgerMenuLink>
            <AppButton className="mt-4 w-full" />
          </>
        }
      >
        <NavigationMenuLink asChild>
          <Button variant="ghost" size="icon" href="/app">
            <Home />
          </Button>
        </NavigationMenuLink>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <FlaskConical className="!size-[1rem]" /> Catalyst
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGrid
              header={
                <Button
                  variant="secondary"
                  href="/app"
                  className="flex h-full w-full flex-col items-start justify-end gap-2 pt-16 text-left text-xl"
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
                href="/app"
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Dashboard</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Get an overview of all of your tasks and courses.
                  </p>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="h-auto justify-start"
                href="/about"
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">About</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Version and information about the application.
                  </p>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="h-auto justify-start"
                href="/about"
              >
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Clear Cache</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Clear cached information.
                  </p>
                </div>
              </Button>
              <Button variant="ghost" className="h-auto justify-start" href="/">
                <div className="flex flex-col gap-1 text-left">
                  <div className="font-bold">Exit App</div>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Exit to the main website.
                  </p>
                </div>
              </Button>
            </NavigationMenuGrid>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Book className="!size-[1rem]" /> Courses
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGrid
              columns={2}
              className="w-[40ch]"
              header={
                <Button
                  variant="secondary"
                  className="flex h-full w-full flex-col items-start justify-end gap-2 pt-16 text-left text-xl"
                >
                  <Book />
                  <h1 className="!text-lg font-bold">Courses</h1>
                  <p className="muted !mt-0 whitespace-break-spaces">
                    Quickly jump from course to course.
                  </p>
                </Button>
              }
            >
              {periods?.map((period) => {
                if (period.type == "course") {
                  return (
                    <Button
                      variant="ghost"
                      className="h-auto justify-start"
                      key={period.id}
                      href={`/app/courses/${period.value?.id}`}
                    >
                      <div className="flex flex-col gap-1 text-left">
                        <div className="font-bold">
                          {period.value?.classification ?? "Unknown"}
                        </div>
                        <p className="muted !mt-0 whitespace-break-spaces">
                          {period.value?.course_code ?? "Unknown"}
                        </p>
                        {period.start && (
                          <div className="flex items-center gap-1">
                            <p className="muted !mt-0 whitespace-break-spaces">
                              {moment
                                .utc(
                                  moment().format("YYYY-MM-DD") +
                                    " " +
                                    period.start,
                                )
                                .local()
                                .format("h:mm A")}
                            </p>
                            -
                            <p className="muted !mt-0 whitespace-break-spaces">
                              {moment
                                .utc(
                                  moment.utc().format("YYYY-MM-DD") +
                                    " " +
                                    period.end,
                                )
                                .local()
                                .format("h:mm A")}
                            </p>
                          </div>
                        )}
                        {!period.start && (
                          <p className="muted !mt-0 whitespace-break-spaces">
                            N/A
                          </p>
                        )}
                      </div>
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      variant="ghost"
                      className="h-auto justify-start !opacity-100"
                      key={period.id}
                      disabled
                    >
                      <div className="flex flex-col gap-1 text-left">
                        <div className="font-bold">
                          {period.groupName ?? "Unknown"}
                        </div>
                        <p className="muted !mt-0 whitespace-break-spaces">
                          {period.value?.name ?? "Unknown"}
                        </p>
                        {period.start && (
                          <div className="flex items-center gap-1">
                            <p className="muted !mt-0 whitespace-break-spaces">
                              {moment
                                .utc(
                                  moment().format("YYYY-MM-DD") +
                                    " " +
                                    period.start,
                                )
                                .local()
                                .format("h:mm A")}
                            </p>
                            -
                            <p className="muted !mt-0 whitespace-break-spaces">
                              {moment
                                .utc(
                                  moment.utc().format("YYYY-MM-DD") +
                                    " " +
                                    period.end,
                                )
                                .local()
                                .format("h:mm A")}
                            </p>
                          </div>
                        )}
                        {!period.start && (
                          <p className="muted !mt-0 whitespace-break-spaces">
                            N/A
                          </p>
                        )}
                      </div>
                    </Button>
                  );
                }
              })}
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
