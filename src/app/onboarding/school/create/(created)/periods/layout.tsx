import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export default async function CreateSchoolPeriodsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth");
  const school = await db.school.findFirst({
    where: {
      permissions: {
        some: {
          userId: session.user.id,
          role: "OWNER",
        },
      },
    },
  });
  if (!school) {
    redirect("/onboarding/school");
  }
  const periods = await db.period.findMany({
    where: {
      schoolId: school.id,
    },
    select: {
      id: true,
      name: true,
      groupName: true,
      type: true,
    },
  });
  if (periods.length > 0) {
    redirect("/onboarding/school/create/schedules");
  }

  return children;
}
