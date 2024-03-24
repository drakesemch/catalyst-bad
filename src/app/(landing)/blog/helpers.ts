export const parseMeta = (content: string) => {
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
