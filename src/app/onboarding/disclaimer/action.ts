"use server";

import { redirect } from "next/navigation";
import { pages } from "../pages";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

export async function acceptDisclaimer(formData: FormData) {
  const agreed = (formData.get("terms") as string) == "on";
  const userId = (await getServerAuthSession())?.user.id;
  if (!userId) {
    redirect("/auth");
  }

  if (agreed) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        agreedDisclaimer: true,
      },
    });

    redirect(
      (await pages()).at(
        (await pages()).findIndex((page) => page.path == "/disclaimer") + 1,
      )?.path ?? "/app",
    );
  } else {
    await db.user.delete({
      where: {
        id: userId,
      },
    });
    redirect("/");
  }
}
