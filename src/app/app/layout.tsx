// import { AppNav } from "@/components/site/app-nav";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await autoRedirect();
  return (
    <div className="flex h-screen flex-col">
      {/* <AppNav /> */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

async function autoRedirect() {
  const session = await getServerAuthSession();
  if (session == null) {
    redirect("/auth");
  } else {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user) {
      redirect("/auth");
    }
    if (user.canvasToken == null) {
      redirect("/onboarding/canvas");
    }
    prisma.$disconnect().catch((err) => {
      throw new Error(err as string);
    });
  }
}
