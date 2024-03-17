import {
  Blocks,
  CircleSlash,
  Code,
  Gamepad2,
  GanttChart,
  Hammer,
  Inbox,
  List,
  LocateOff,
  Megaphone,
  MessageCircle,
  Moon,
  Music2,
  Notebook,
  NotebookPen,
  Package,
  PackagePlus,
  Paintbrush,
  Percent,
  Plug,
  UsersRound,
  Video,
  Webhook,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Core Functionality",
      Icon: Package,
      id: "core",
      description:
        "Catalyst provides all the core functionality that you already know and love and sprinkles in some suprises and quality of life features.",
      subFeatures: [
        {
          title: "Courses",
          Icon: List,
          id: "courses",
          description:
            "All of your courses are available in Catalyst, presented in a much needed redesign for ease of use and for quickly finding your courses.",
        },
        {
          title: "Assignments",
          Icon: Notebook,
          id: "assignments",
          description:
            "All of your assignments will also be visible. You can submit assignments and view feedback as normal. However, you will get a better and redesigned experience.",
        },
        {
          title: "Modules",
          Icon: Package,
          id: "modules",
          description:
            "Modules will be more organized and easier to navigate. Honestly, modules are modules and not much can be done, but we made minor adjustments.",
        },
        {
          title: "Grades",
          Icon: Percent,
          id: "grades",
          description:
            "Grades will be completely overhauled and will provide a better experience. You will be able to preview your test grades easier than ever before.",
        },
        {
          title: "Inbox",
          Icon: Inbox,
          id: "inbox",
          description:
            "The Inbox will feel less cluttered and more organized. You will also be able to see your messages faster. Other apps will feel slow in comparison.",
        },
        {
          title: "Announcements",
          Icon: Megaphone,
          id: "announcements",
          description:
            "Announcements are going to be tidied up and quicker to find what you are looking for. You will also be able to see announcements from all your courses in one place.",
        },
        {
          title: "Discussions",
          Icon: UsersRound,
          id: "discussions",
          description:
            "Discussions will be easier to navigate and you will be able to see all your discussions in one place.",
        },
      ],
    },
    {
      title: "Unavailable Core Functionality",
      Icon: CircleSlash,
      id: "no-core",
      description:
        "Although Catalyst provides most core features, it can't provide all of the core functionality due to limitations.",
      subFeatures: [
        {
          title: "Studio",
          Icon: Video,
          id: "video",
          description:
            "Studio is a feature that Catalyst could provide, but isn't worth it as it's not used by many students. It may be something that we implement later, however, it isn't one of our top priorities.",
        },
        {
          title: "Tests and Quizzes",
          Icon: NotebookPen,
          id: "test",
          description:
            "Tests and Quizzes are a feature that cannot be implemented due to limitations and security concerns. This is a feature that is not worth the risk of implementation. However, it allows you to go back to the original site to take the test or quiz.",
        },
      ],
    },
    {
      title: "Additional Functionality",
      Icon: PackagePlus,
      id: "catalyst",
      description:
        "In addition to the core functionality you'd expect, Catalyst also provides a few additional features.",
      subFeatures: [
        {
          title: "Messages",
          Icon: MessageCircle,
          id: "messages",
          description:
            "Messages will make it easier than ever to be able to chat with friends about school work.",
        },
        {
          title: "Schedules",
          Icon: GanttChart,
          id: "schedules",
          description:
            "Schedules is a must-have feature for students that have schedules. You no longer have to keep track of when clases start and when classes end as it will all be managed by Catalyst.",
        },
        {
          title: "Improved UI",
          Icon: LocateOff,
          id: "ui",
          description:
            "Catalyst provides all the core functionality that you already know and love and sprinkles in some suprises and quality of life features.",
        },
        {
          title: "Dark Mode",
          Icon: Moon,
          id: "darkmode",
          description:
            "Catalyst provides all the core functionality that you already know and love and sprinkles in some suprises and quality of life features.",
        },
      ],
    },
    {
      title: "Unreleased Functionality",
      Icon: CircleSlash,
      id: "unreleased",
      description:
        "We want to include the features below, however they may take a little bit to implement, our main priority is to get as much core functionality as possible, and implement these cool additional features later.",
      subFeatures: [
        {
          title: "Games",
          Icon: Gamepad2,
          id: "games",
          description:
            "Get bored? Play some games! Catalyst provides both single-player and multi-player games for when you just need a break and want to play some games. You can play games with friends or by yourself. It's a great way to relax and have fun.",
        },
        {
          title: "Music",
          Icon: Music2,
          id: "music",
          description:
            "Need to jam out? Catalyst provides a music player that links to your favorite music streaming service. In addition, you will also have access to our own library of music. You can listen to music while you work, or just listen to music in general.",
        },
        {
          title: "Tools",
          Icon: Hammer,
          id: "tools",
          description:
            "Catalyst provides more tools than you can think of, we provide grade calculators, study tools, and more.",
        },
      ],
    },
    {
      title: "Extensibility",
      Icon: Blocks,
      id: "extensibility",
      description:
        "We feel that it is important to be able to modify and extend our applications as you and our community see fit. We want to provide you with as many opportunities as possible to make Catalyst your own. This feature may take a little bit to implement, but we will make sure that it is implemented before version 1.0.0.",
      subFeatures: [
        {
          title: "Plugins",
          Icon: Plug,
          id: "plugins",
          description:
            "Plugins allow you to add additional functionality to the application that doesn't already exist.",
        },
        {
          title: "Themes",
          Icon: Paintbrush,
          id: "themes",
          description:
            "Themes allow you to style the application the way you want to make it your own.",
        },
        {
          title: "API",
          Icon: Code,
          id: "api",
          description:
            "We will provide APIs for you to create 3rd party applications that can interact with Catalyst.",
        },
        {
          title: "Webhooks",
          Icon: Webhook,
          id: "webhooks",
          description:
            "Webhooks will also allow you to connect with other applications and services.",
        },
        {
          title: "Integrations",
          Icon: PackagePlus,
          id: "integrations",
          description:
            "Integrations are important to allow other applications to connect and interact with Catalyst, including music and other services.",
        },
      ],
    },
  ];
  return (
    <div className="p-8 pt-16">
      <h1 className="h1">Features</h1>
      <div className="mt-2 h-1 w-8 rounded-full bg-primary/50" />
      {features.map((feature, idx) => (
        <div key={feature.title} className={idx == 0 ? "mt-8" : "mt-16"}>
          <h2
            className="h2 inline-flex items-center gap-2 px-2"
            id={feature.id}
          >
            <feature.Icon className="!h-[1em] !w-[1em]" /> {feature.title}
          </h2>
          <p className="muted mt-2">{feature.description}</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {feature.subFeatures.map((subFeature) => (
              <div
                key={subFeature.title}
                className="flex min-h-64 flex-col justify-end gap-2 rounded-lg border p-4"
              >
                <subFeature.Icon className="!size-[3rem]" />
                <h3
                  className="h3 mb-2 inline-flex items-center gap-2"
                  id={`${feature.id}.${subFeature.id}`}
                >
                  {subFeature.title}
                </h3>
                <p className="muted">{subFeature.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
