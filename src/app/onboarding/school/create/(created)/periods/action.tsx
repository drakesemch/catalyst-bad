"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
// import { pages } from "../../../../pages";

export async function createPeriods(formData: FormData) {
  const periods: {
    name: string;
    type: string;
    options: string[];
    idx: number;
  }[] = [];
  Object.entries(Object.fromEntries(formData.entries())).forEach(
    ([key, val]) => {
      const nameRegexp = new RegExp("periods\\[(\\d+)\\].name");
      const typeRegexp = new RegExp("periods\\[(\\d+)\\].type");
      const optionsRegexp = new RegExp(
        "periods\\[(\\d+)\\].options\\[(\\d+)\\]",
      );
      if (nameRegexp.test(key)) {
        const index = Number(nameRegexp.exec(key)?.[1]);
        periods[index] = {
          name: val as string,
          type: periods[index]?.type ?? "none",
          options: periods[index]?.options ?? [],
          idx: index,
        };
      }
      if (typeRegexp.test(key)) {
        const index = Number(typeRegexp.exec(key)?.[1]);
        periods[index] = {
          name: periods[index]?.name ?? "Unnamed Period",
          type: val as string,
          options: periods[index]?.options ?? [],
          idx: index,
        };
      }
      if (optionsRegexp.test(key)) {
        const index = Number(optionsRegexp.exec(key)?.[1]);
        const optionIndex = Number(optionsRegexp.exec(key)?.[2]);
        if (!periods[index]) {
          periods[index] = {
            name: "Unnamed Period",
            type: "none",
            options: [],
            idx: index,
          };
        }
        periods[index]!.options[optionIndex] = String(val);
      }
    },
  );
  console.log("period", periods);
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

  for (const period of periods) {
    if (period.type != "single-select") {
      await db.period.create({
        data: {
          name: period.name,
          groupName: period.name,
          type: period.type,
          order: period.idx,
          school: {
            connect: {
              id: school.id,
            },
          },
        },
      });
    }
    if (period.type == "single-select" && period.options.length > 0) {
      const defaultOption = await db.period.create({
        data: {
          name: period.options.at(0)!,
          groupName: period.name,
          type: period.type,
          order: period.idx,
          school: {
            connect: {
              id: school.id,
            },
          },
        },
      });

      for (const option of period.options.slice(1)) {
        await db.period.create({
          data: {
            name: option,
            groupName: period.name,
            type: period.type,
            order: period.idx,
            groupId: defaultOption.groupId,
            school: {
              connect: {
                id: school.id,
              },
            },
          },
        });
      }
    }
  }

  redirect("/onboarding/school/create/schedules");
}
