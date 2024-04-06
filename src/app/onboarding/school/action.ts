"use server";

import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

export async function getSchools(inp: string) {
  const schools = await db.school.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              verified: true,
            },
            {
              verified: false,
              permissions: {
                some: {
                  userId: (await getServerAuthSession())!.user.id,
                  role: "OWNER",
                },
              },
            },
          ],
        },
        {
          OR: [
            {
              name: {
                contains: inp,
                mode: "insensitive",
              },
            },
            {
              id: {
                contains: inp,
              },
            },
            {
              address: {
                contains: inp,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
    take: 5,
  });
  return schools;
}

export async function selectSchool(formData: FormData) {
  redirect(
    "/onboarding/school/confirm?school=" + String(formData.get("school")),
  );
}
