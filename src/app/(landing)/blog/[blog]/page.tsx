import { storage } from "@/server/storage";

import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { parseMeta } from "../helpers";
import rehypeShiki from "@shikijs/rehype";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const revalidate = 30;

export default async function BlogPage({
  params: { blog },
}: {
  params: { blog: string };
}) {
  const fileData = (
    await storage.getFile(
      (await storage.listFiles()).find(
        (itm) => itm.name == "blog-" + blog + ".md",
      )?.key ?? "",
    )
  ).at(0);
  if (
    fileData?.content?.type == undefined ||
    fileData.content.type !== "text/markdown"
  )
    return notFound();
  const data = (await fileData?.content.text()) ?? "";

  const metadata = parseMeta(data);

  const file = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .use(rehypeShiki, {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      })
      .process(data.split("---\n").slice(2).join("\n")),
  )
    .replaceAll(new RegExp("(?<=<h1)(?=>)", "gm"), ' class="h1"')
    .replaceAll(new RegExp("(?<=<h2)(?=>)", "gm"), ' class="h2"')
    .replaceAll(new RegExp("(?<=<h3)(?=>)", "gm"), ' class="h3"')
    .replaceAll(new RegExp("(?<=<h4)(?=>)", "gm"), ' class="h4"')
    .replaceAll(new RegExp("(?<=<p)(?=>)", "gm"), ' class="p"')
    .replaceAll(new RegExp("(?<=<blockquote)(?=>)", "gm"), ' class="quote"')
    .replaceAll(new RegExp("(?<=<ul)(?=>)", "gm"), ' class="list"')
    .replaceAll(new RegExp("(?<=<code)(?=>)", "gm"), ' class="inline snippet"')
    .replaceAll(new RegExp("(?<=<pre)(?=>)", "gm"), ' class="snippet"')
    .replaceAll(
      new RegExp('(?<=tabindex="0"><code class=")inline snippet(?=">)', "gm"),
      "block w-full overflow-auto",
    )
    .replaceAll(new RegExp("(?<=<table)(?=>)", "gm"), ' class="table"')
    .replaceAll(new RegExp('<span class="line"></span>', "gm"), "");

  return (
    <section className="p-8 pt-16">
      <Button
        variant="link"
        href="/blog"
        className="flex w-full justify-start gap-2 p-0 py-2"
      >
        <ArrowLeft className="!size-[1rem]" />
        View all Blogs
      </Button>
      <h1 className="h1">{metadata.title}</h1>
      <div className="mt-2 h-1 w-8 rounded-full bg-primary/50" />
      <div className="mt-2 flex flex-wrap items-center gap-2 text-muted-foreground">
        <span className="flex-1 text-nowrap">{metadata.author}</span>
        <Separator orientation="vertical" className="h-[1rem] w-0.5" />
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{moment(metadata.postDate + " GMT").calendar()}</span>
          </TooltipTrigger>
          <TooltipContent>
            {moment(metadata.postDate + " GMT").format("LLLL")}
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="!mt-1">{metadata.description}</p>
      <Separator className="mt-4" />
      <div dangerouslySetInnerHTML={{ __html: file }} className="mt-4"></div>
    </section>
  );
}
