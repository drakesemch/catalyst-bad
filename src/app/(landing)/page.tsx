import { Background } from "@/components/misc/effects";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Blocks,
  Code,
  FlaskConical,
  Gamepad2,
  GanttChart,
  Hammer,
  Inbox,
  List,
  MessageCircle,
  Music2,
  Notebook,
  Package,
  PackagePlus,
  Paintbrush,
  Percent,
  Webhook,
} from "lucide-react";

export default function HomePage() {
  const fatures = [
    {
      title: "Core Functionality",
      description:
        "Catalyst provides all the core functionality that you already know and love and sprinkles in some suprises and quality of life features.",
      Icon: Package,
      href: "/features#core",
      subtitles: [
        {
          title: "Courses",
          Icon: List,
          href: "/features#core.courses",
        },
        {
          title: "Assignments",
          Icon: Notebook,
          href: "/features#core.assignments",
        },
        {
          title: "Modules",
          Icon: Package,
          href: "/features#core.modules",
        },
        {
          title: "Grades",
          Icon: Percent,
          href: "/features#core.grades",
        },
        {
          title: "Inbox",
          Icon: Inbox,
          href: "/features#core.inbox",
        },
      ],
    },
    {
      title: "Additional Functionality",
      description:
        "In addition to the core functionality you'd expect, Catalyst also provides a few additional features.",
      Icon: PackagePlus,
      href: "/features#catalyst",
      subtitles: [
        {
          title: "Messages",
          Icon: MessageCircle,
          href: "/features#catalyst.messages",
        },
        {
          title: "Schedules",
          Icon: GanttChart,
          href: "/features#catalyst.schedules",
        },
        {
          title: "Games",
          Icon: Gamepad2,
          href: "/features#catalyst.games",
        },
        {
          title: "Music",
          Icon: Music2,
          href: "/features#catalyst.music",
        },
        {
          title: "Tools",
          Icon: Hammer,
          href: "/features#catalyst.tools",
        },
      ],
    },
    {
      title: "Extensibility",
      description:
        "We want to make sure that Catalyst will be the right application for you, so we've made it easy to extend.",
      Icon: Blocks,
      href: "/features#extend",
      subtitles: [
        {
          title: "Themes",
          Icon: Paintbrush,
          href: "/features#extend.themes",
        },
        {
          title: "Plugins",
          Icon: Package,
          href: "/features#extend.plugins",
        },
        {
          title: "API",
          Icon: Code,
          href: "/features#extend.api",
        },
        {
          title: "Webhooks",
          Icon: Webhook,
          href: "/features#extend.webhooks",
        },
        {
          title: "Integrations",
          Icon: PackagePlus,
          href: "/features#extend.integrations",
        },
      ],
    },
  ];
  return (
    <>
      <section className="-mt-[3.5625rem] h-screen w-full">
        <div className="relative flex h-full w-full items-center justify-start">
          <div className="z-10 flex flex-col gap-2 pl-10">
            <h1 className="text-lg font-bold">Welcome to</h1>
            <h1 className="h1 flex gap-2">
              <div className="grid size-[1em] place-items-center rounded-full bg-secondary/50">
                <FlaskConical className="!size-[.5em]" />
              </div>
              Catalyst
            </h1>
            <div className="mt-2 h-1 w-8 rounded-full bg-primary/50" />
            <p className="text-sm text-foreground/50">
              Say hello to a reimagined canvas for students.
            </p>
            <div className="flex gap-2">
              <Button variant="secondary" href="#features">
                Learn More
              </Button>
              <Button href="/account">Sign In</Button>
            </div>
          </div>
          <Background />
        </div>
      </section>
      <section className="p-8" id="features">
        <h2 className="h3">App Features</h2>
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
          {fatures.map((feature) => (
            <div
              key={feature.title}
              className="flex min-h-96 flex-col justify-end gap-2 rounded-lg border p-4"
            >
              <feature.Icon className="!size-[3rem]" />
              <h2 className="h3">{feature.title}</h2>
              <p className="text-sm text-foreground/50">
                {feature.description}
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {feature.subtitles.map((subfeature) => (
                  <Button
                    key={subfeature.title}
                    variant="outline"
                    className="justify-start text-xs"
                    href={subfeature.href}
                  >
                    <subfeature.Icon className="!size-[1em]" />{" "}
                    {subfeature.title}
                  </Button>
                ))}
                <Button className="justify-start text-xs" href={feature.href}>
                  <ArrowRight className="!size-[1em]" /> See More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
