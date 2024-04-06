import { db } from "@/server/db";
import CoursesClientPage from "./client";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { canvas } from "@/server/canvas";

export default async function CoursesPage() {
  const auth = await getServerAuthSession();
  const user = await db.user.findUnique({
    where: { id: auth?.user.id },
  });
  if (!user) {
    redirect("/auth");
  }
  const courses = await canvas.getCourses();
  const periods = await db.period.findMany({
    where: { schoolId: user.schoolId! },
    orderBy: { order: "asc" },
  });
  return <CoursesClientPage courses={courses} periods={periods} />;
}
