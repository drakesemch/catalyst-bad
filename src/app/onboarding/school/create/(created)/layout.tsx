import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export default async function CreateSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth");
  if (
    (await db.schoolPermissions.count({
      where: {
        userId: session.user.id,
        role: "OWNER",
        school: {
          verified: false,
        },
      },
    })) != 1
  ) {
    redirect("/onboarding/school");
  }

  return children;
}
