"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import moment from "moment";
// import { pages } from "../../../../pages";

export async function createSchedules(formData: FormData) {
  const utcOffset = formData.get("utcOffset") as string;
  const schedules: {
    name: string;
    abbr: string;
    periods: {
      id: string;
      startLocal: string;
      endLocal: string;
    }[];
  }[] = [];

  Object.entries(Object.fromEntries(formData.entries())).forEach(
    ([key, val]) => {
      const nameRegexp = new RegExp("schedules\\[(\\d+)\\].name");
      const abbrRegexp = new RegExp("schedules\\[(\\d+)\\].abbr");
      const periodRegexp = new RegExp(
        "schedules\\[(\\d+)\\].periods\\[(\\d+)\\].id",
      );
      const startLocalRegexp = new RegExp(
        "schedules\\[(\\d+)\\].periods\\[(\\d+)\\].startLocal",
      );
      const endLocalRegexp = new RegExp(
        "schedules\\[(\\d+)\\].periods\\[(\\d+)\\].endLocal",
      );
      if (nameRegexp.test(key)) {
        const index = Number(nameRegexp.exec(key)?.[1]);
        schedules[index] = {
          name: val as string,
          abbr: schedules[index]?.abbr ?? "",
          periods: schedules[index]?.periods ?? [],
        };
      }
      if (abbrRegexp.test(key)) {
        const index = Number(abbrRegexp.exec(key)?.[1]);
        schedules[index] = {
          name: schedules[index]?.name ?? "Unnamed Schedule",
          abbr: val as string,
          periods: schedules[index]?.periods ?? [],
        };
      }
      if (periodRegexp.test(key)) {
        const index = Number(periodRegexp.exec(key)?.[1]);
        const periodIndex = Number(periodRegexp.exec(key)?.[2]);
        if (!schedules[index]) {
          schedules[index] = {
            name: "Unnamed Schedule",
            abbr: "",
            periods: [],
          };
        }
        schedules[index]!.periods[periodIndex] = {
          id: val as string,
          startLocal: "",
          endLocal: "",
        };
      }
      if (startLocalRegexp.test(key)) {
        const index = Number(startLocalRegexp.exec(key)?.[1]);
        const periodIndex = Number(startLocalRegexp.exec(key)?.[2]);
        if (!schedules[index]) {
          schedules[index] = {
            name: "Unnamed Schedule",
            abbr: "",
            periods: [],
          };
        }
        schedules[index]!.periods[periodIndex] = {
          id: schedules[index]?.periods[periodIndex]?.id ?? "",
          startLocal: val as string,
          endLocal: "",
        };
      }
      if (endLocalRegexp.test(key)) {
        const index = Number(endLocalRegexp.exec(key)?.[1]);
        const periodIndex = Number(endLocalRegexp.exec(key)?.[2]);
        if (!schedules[index]) {
          schedules[index] = {
            name: "Unnamed Schedule",
            abbr: "",
            periods: [],
          };
        }
        schedules[index]!.periods[periodIndex] = {
          id: schedules[index]?.periods[periodIndex]?.id ?? "",
          startLocal: schedules[index]?.periods[periodIndex]?.startLocal ?? "",
          endLocal: val as string,
        };
      }
    },
  );

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

  for (const schedule of schedules) {
    const newSchedule = await db.schedule.create({
      data: {
        name: schedule.name,
        abbr: schedule.abbr,
        school: {
          connect: {
            id: school.id,
          },
        },
      },
    });
    for (const period of schedule.periods) {
      const start = moment(period.startLocal, "HH:mm:ss")
        .utcOffset(utcOffset)
        .utc()
        .format("HH:mm:ss");
      const end = moment(period.endLocal, "HH:mm:ss")
        .utcOffset(utcOffset)
        .utc()
        .format("HH:mm:ss");
      await db.periodTimes.create({
        data: {
          start: start,
          end: end,
          schedule: {
            connect: {
              id: newSchedule.id,
            },
          },
          period: {
            connect: {
              id: period.id,
            },
          },
        },
      });
    }
  }

  redirect("/onboarding/school/");
}
