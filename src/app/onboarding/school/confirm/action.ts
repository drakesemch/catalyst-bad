"use server";

import { redirect } from "next/navigation";
import { pages } from "../../pages";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

export async function selectSchool(formData: FormData) {
  const school = formData.get("school") as string;
  console.log("school", school);
  const userId = (await getServerAuthSession())?.user.id;
  if (!userId) {
    redirect("/auth");
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      schoolId: school,
    },
  });

  redirect(
    (await pages()).at(
      (await pages()).findIndex((page) => page.path == "/school") + 1,
    )?.path ?? "/app",
  );
}
