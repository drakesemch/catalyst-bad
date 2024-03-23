import { redirect } from "next/navigation";
import CanvasOnboardingClientPage from "./client";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

export default async function CanvasOnboardingPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (user?.canvasURL && user?.canvasToken) {
    redirect("/app");
  }
  return <CanvasOnboardingClientPage />;
}
