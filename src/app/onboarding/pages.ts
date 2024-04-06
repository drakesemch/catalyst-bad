import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function pages() {
  const session = await getServerAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session!.user.id,
    },
  });

  return [
    {
      path: "/onboarding/disclaimer",
      complete: user!.agreedDisclaimer,
    },
    {
      path: "/onboarding/school",
      complete: user!.schoolId != null,
    },
    {
      path: "/onboarding/canvas",
      complete: user!.canvasToken != null,
    },
    {
      path: "/onboarding/courses",
      complete: user!.completedCourses,
    },
  ];
}
