"use server";

import { redirect } from "next/navigation";
import { pages } from "../pages";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

export async function selectCourses(formData: FormData) {
  const periods = [...formData.entries()]
    .filter((key) => key[0].startsWith("period:"))
    .map((key) => [key[0].replace("period:", ""), key[1]]) as unknown as [
    string,
    string,
  ][];
  const userId = (await getServerAuthSession())?.user.id;
  if (!userId) {
    redirect("/auth");
  }

  for (const [periodId, valueId] of periods) {
    await db.course.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        groupId: periodId,
        value: valueId,
      },
    });
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      completedCourses: true,
    },
  });

  redirect(
    (await pages()).at(
      (await pages()).findIndex((page) => page.path == "/courses") + 1,
    )?.path ?? "/app",
  );
}
