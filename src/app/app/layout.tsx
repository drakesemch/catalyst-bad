import { AppNav } from "~/components/site/app-nav";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { pages } from "../onboarding/pages";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await autoRedirect();
  return (
    <div className="flex h-screen flex-col">
      <AppNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}

async function autoRedirect() {
  const session = await getServerAuthSession();
  if (session == null) {
    redirect("/auth");
  } else if ((await pages()).some((page) => !page.complete)) {
    redirect("/onboarding");
  }
}
