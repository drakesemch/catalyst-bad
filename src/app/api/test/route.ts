import { db } from "@/server/db";
import { readFileSync } from "fs";

export const GET = async () => {
  const schoolName = "Blue Valley West High School";
  const csv = readFileSync(
    "/Users/dsemchyshyn/Documents/Code/catalyst/no-save/schedules.csv",
    "utf8",
  )
    .split("\n")
    .map((line) => line.split(",")) as unknown as string[][];
  const school = await db.school.findUnique({
    where: { name: schoolName },
  });
  if (!school) {
    return new Response("School not found", { status: 404 });
  }
  const toTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return `${(hours! + 5).toString().padStart(2, "0")}:${minutes!.toString().padStart(2, "0")}:00`;
  };
  const uniqueSchedules: { name: string; id: string }[] = [];
  const fakeInputIds: { fake: number; real: string; line: number }[] = [];
  const fakeValueIds: { fake: number; real: string; line: number }[] = [];
  for (const line of csv) {
    if (uniqueSchedules.find((schedule) => schedule.name == line[0])) continue;
    const row = await db.schedule.create({
      data: {
        name: line[0]!,
        school: {
          connect: { id: school.id },
        },
      },
    });
    uniqueSchedules.push({ name: line[0]!, id: row.id });
  }
  let line_count = -1;
  for await (const line of csv) {
    line_count++;
    if (fakeInputIds.find((input) => input.fake === Number(line[5]!))) continue;
    const schedule = uniqueSchedules.find(
      (schedule) => schedule.name == line[0],
    );
    const period = await db.period.create({
      data: {
        schedule: {
          connect: { id: schedule!.id },
        },
        selectionName: line[1]!,
        name: line[2]!,
        start: toTime(line[3]!),
        end: toTime(line[4]!),
        sharedInputId: undefined,
        sharedValueId: undefined,
        type: line[7]!.trim(),
        school: {
          connect: { id: school.id },
        },
      },
    });

    if (!fakeValueIds.find((value) => value.fake == Number(line[6]!))) {
      fakeValueIds.push({
        fake: Number(line[6]!),
        real: period.sharedValueId,
        line: line_count,
      });
    }
    fakeInputIds.push({
      fake: Number(line[5]!),
      real: period.sharedInputId,
      line: line_count,
    });
  }
  line_count = -1;
  for await (const line of csv) {
    line_count++;
    if (fakeValueIds.find((input) => input.fake == Number(line[6]!))) continue;
    const schedule = uniqueSchedules.find(
      (schedule) => schedule.name == line[0],
    );
    const period = await db.period.create({
      data: {
        schedule: {
          connect: { id: schedule!.id },
        },
        selectionName: line[1]!,
        name: line[2]!,
        start: toTime(line[3]!),
        end: toTime(line[4]!),
        sharedInputId: fakeInputIds.find(
          (input) => input.fake === Number(line[5]!),
        )?.real,
        sharedValueId: fakeValueIds.find(
          (value) => value.fake === Number(line[6]!),
        )?.real,
        type: line[7]!.trim(),
        school: {
          connect: { id: school.id },
        },
      },
    });
    fakeValueIds.push({
      fake: Number(line[6]!),
      real: period.sharedValueId,
      line: line_count,
    });
  }
  line_count = -1;
  for await (const line of csv) {
    line_count++;
    if (
      !!fakeInputIds.find((input) => input.line == line_count) ||
      !!fakeValueIds.find((value) => value.line == line_count)
    )
      continue;
    const schedule = uniqueSchedules.find(
      (schedule) => schedule.name == line[0],
    );
    await db.period.create({
      data: {
        schedule: {
          connect: { id: schedule!.id },
        },
        selectionName: line[1]!,
        name: line[2]!,
        start: toTime(line[3]!),
        end: toTime(line[4]!),
        sharedInputId: fakeInputIds.find(
          (input) => input.fake == Number(line[5]!),
        )?.real,
        sharedValueId: fakeValueIds.find(
          (value) => value.fake == Number(line[6]!),
        )?.real,
        type: line[7]!.trim(),
        school: {
          connect: { id: school.id },
        },
      },
    });
  }

  return new Response("hello world!");
};
