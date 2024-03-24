import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { storage } from "~/server/storage";
import moment from "moment";
import { Separator } from "~/components/ui/separator";
import { ArrowRight } from "lucide-react";

export const revalidate = 30;

export default async function BlogPage() {
  const parseMeta = (content: string) => {
    const meta = content.match(/---\n(.*?)\n---/s)?.[1];
    if (!meta) return {};
    const metadata = Object.fromEntries(
      meta.split("\n").map((line) => {
        const [key, ...value] = line.split(":");
        return [key!.trim(), value.join(":").trim()];
      }),
    ) as unknown as {
      title?: string;
      description?: string;
      author?: string;
      postDate?: string;
      updateDate?: string;
    };
    return {
      ...metadata,
    };
  };

  const posts = await Promise.all(
    (await storage.listFiles())
      .filter(
        (file) => file.name.startsWith("blog-") && file.name.endsWith(".md"),
      )
      .map(async (file) => {
        const data = (await storage.getFiles(file.key)).at(0)!;
        return {
          ...file,
          name: file.name.replace("blog-", "").replace(".md", ""),
          ...parseMeta(await data.content.text()),
        };
      }),
  );

  return (
    <section className="p-8 pt-16">
      <h1 className="h1">Blog</h1>
      <div className="mt-2 h-1 w-8 rounded-full bg-primary/50" />
      <div className="grid w-full grid-cols-1 flex-wrap pt-8 md:grid-cols-2">
        {posts.map((post) => (
          <Button
            key={post.name}
            variant="outline"
            className="h-auto"
            href={`/blog/${post.name}`}
          >
            <Card className="w-full items-center border-0 bg-transparent p-0 shadow-none">
              <CardHeader>
                <CardTitle className="h2 w-full">{post.title}</CardTitle>
                <CardDescription className="flex flex-wrap gap-2">
                  <span className="flex-1 text-nowrap">{post.author}</span>
                  <Separator
                    orientation="vertical"
                    className="h-[1rem] w-0.5"
                  />
                  {moment(post.postDate + " GMT").calendar()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.description}</p>
              </CardContent>
              <CardFooter className="justify-end">
                <Button className="flex gap-2">
                  View Blog <ArrowRight className="!size-[1rem]" />
                </Button>
              </CardFooter>
            </Card>
          </Button>
        ))}
      </div>
    </section>
  );
}
