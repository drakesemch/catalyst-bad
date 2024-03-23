import { Background } from "~/components/misc/effects";
import { Nav } from "~/components/site/nav";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Nav />
      <div className="w-full">
        <Background className="ml-0 w-full" />
      </div>
      <main className="absolute inset-0 m-auto flex max-w-[40ch] flex-col justify-center gap-2">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="h3">Page Not Found</h2>
        <div className="mt-2 h-1 w-8 rounded-full bg-primary/50" />
        <p className="muted">
          Hmmm... It seems like that page doesn{"'"}t exists :/
        </p>
        <p className="muted">
          If it is from an internal site, it wouldn{"'"}t supprise me if we
          screwed up, and will be reported to our team.
        </p>
        <p className="muted">
          If you are coming from an external source, or coming from a link,
          please ensure that the URL is typed correctly. In the meantime you can
          go back to the home page.
        </p>
        <div className="flex">
          <Button href="/" className="px-8">
            Go Home
          </Button>
        </div>
      </main>
    </>
  );
}
