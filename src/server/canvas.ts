import { env } from "~/env";
import { getServerAuthSession } from "./auth";
import { db } from "./db";
import { createDecipheriv } from "crypto";
import moment from "moment";
import type { Period, PeriodTimes } from "@prisma/client";

const classificationCSV = `Persistent,BVW Counseling
Physical Education,Health Wellness (online)-Haggerty-SU
Persistent,BVW Library 2022-2023
Persistent,PRMS Counseling
Activity,Sources of Strength
Math,1. Advanced Math O'Neal-Q4
Arts,6th Grade Band
Math,2021 Advanced Integrated Mathematics 7-O'Neal-Q3
Activity,2021 Summer Band
Math,Advanced Integrated Mathematics 6-White-Q1
Math,Advanced Integrated Mathematics 6-White-Q2
Math,Advanced Integrated Mathematics 6-White-Q3
Math,Advanced Integrated Mathematics 6-White-Q4
Math,Advanced Integrated Mathematics 7-Mitchem-Q1
Persistent,Advisory -9th Grade-Hoyt-YR
Math,Algebra 1 Qtr 1-Fleer-Q1
Math,Algebra 1 Qtr 2-Fleer-Q2
Math,Algebra 1 Qtr 3-Fleer-Q3
Math,Algebra 1 Qtr 4-Fleer-Q4
Arts,Art 6 (Q2)
Arts,Band 6 Quarter 4-Gamble-Q4
Arts,Band 6-Gamble-Q1
Arts,Band 6-Q3
Arts,Band 7 Quarter 3-Gamble-Q3
Arts,Band 7 Quarter 4-Gamble-Q4
Arts,Band 8 Quarter 1-Gamble-Q1
Arts,Band 8 Quarter 2-Gamble-Q2
Arts,Band 8 Quarter 3-Gamble-Q3
Arts,Band 8 Quarter 4-Gamble-Q4
Arts,CHE 5th Grade Art
Language,E.L.A. 7 Q3-Kennedy
English,ELA 7 Q2 Virtual
English,ELA Q4 Kennedy
Arts,Elementary Band Grade 5-Gamble-YR
Other,Elementary Foreign Language Spanish Grade 4-Davidson-YR
Other,Elementary General Classroom Grade 4-Schwabauer-YR
Other,Elementary General Classroom Grade 5-Auvigne-YR
Math,Elementary Mathematics Grade 5-Auvigne-YR
English,English Language Arts 6 Quarter 1-Mensendiek-Q1
English,English Language Arts 6 Quarter 2-Mensendiek-Q2
English,English Language Arts 6 Quarter 3-Mensendiek-Q3
English,English Language Arts 6 Quarter 4-Mensendiek-Q4
English,English Language Arts 8 Quarter 1-Secrest-Q1
English,English Language Arts 8 Quarter 2-Secrest-Q2
English,English Language Arts 8 Quarter 3-Secrest-Q3
English,English Language Arts 8 Quarter 4-Secrest-Q4
Persistent,Flex Class-Fleer-YR
Persistent,Flex Class-Kennedy-YR
Persistent,Flex Class-Stanfield-YR
Science,Hnrs Biology-Hall-S2
Science,Hnrs Biology-Skakal-S1
Math,Hnrs Geometry-Young-S1
Math,Hnrs Geometry-Young-S2
English,Honors ELA 9 - Fall 2022
Physical Education,Virtual Physical Education 7-Maasen-Q2
Physical Education,Virtual Physical Education 7-Maasen-Q1
Persistent,Intervention 7-Kennedy-YR
Technology,Introduction to Engineering Design-Vodehnal-S1
Technology,Introduction to Engineering Design-Vodehnal-S2
Persistent,Jag Hub 2022-23
Physical Education,Physical Education 6-Long-Q1
Physical Education,Physical Education 6-Long-Q2
Physical Education,Physical Education 8-Rutherford-Q1
Physical Education,Physical Education 8-Rutherford-Q2
Physical Education,Physical Education-Lowe-S1
Physical Education,Physical Education-Lowe-S2
Technology,Pre-Engineering Robotics 7-Shatzer-Q4
Technology,Pre-Engineering & Robotics 7-Shatzer-Q3
Technology,Pre-engineering 6-Shatzer-Q4
Technology,Pre-engineering 8-Shatzer-Q3
Technology,Pre-engineering 8-Shatzer-Q4
Science,Science - Jackson - Q3
Science,Science 6 Quarter 1-Stanfield-Q1
Science,Science 6 Quarter 2-Stanfield-Q2
Science,Science 6 Quarter 3-Stanfield-Q3
Science,Science 6 Quarter 4-Stanfield-Q4
Science,Science 7 Quarter 1-Durick-Q1
Science,Science 7 Quarter 2-Durick-Q2
Science,Science 7: Q3
Science,Science 7: Q4
Science,Science 8 Quarter 1-Jackson-Q1
Science,Science 8 Quarter 2-Jackson-Q2
Science,Science 8 Quarter 4-Jackson-Q4
Social Studies,Social Studies 6 Quarter 1-Stanfield-Q1
Social Studies,Social Studies 6 Quarter 2-Stanfield-Q2
Social Studies,Social Studies 6 Quarter 3-Stanfield-Q3
Social Studies,Social Studies 6 Quarter 4-Stanfield-Q4
Social Studies,Social Studies 7 Q 3-Kennedy
Social Studies,Social Studies 7 Quarter 4-Kennedy-Q4
Social Studies,Social Studies 8 Quarter 1-Modelski-Q1
Social Studies,Social Studies 8 Quarter 3-Modelski-Q3
Language,Spanish 1A-Payne-Q3
Language,Spanish 1A-Payne-Q4
Language,Spanish 1B-Landeras-S2
Language,Spanish 1B-Vater-S1
Language,Spanish 2-Kessens-S1
Language,Spanish 2-Kessens-S2
Language,Spanish 3.0-Horstick-S1
Language,Spanish 3.0-Horstick-S2
Arts,Symphonic Band - 2023
Technology,Technology Explorations 6-Anderson-Q1
Social Studies,VEd Social Studies 7 - Q1
Social Studies,Ved Social Studies 7 Q2
Math,Virtual Advanced Mathematics 7-Mitchem-Q2
English,Virtual ELA - Q1
Arts,VirtualED - 7th Grade Band
Arts,VirtualED Band 7 - Q2
Arts,Theatre 6-Shute-Q3
Language,Elementary Reading Grade 4-Schwabauer-YR
Activity,BVW Esports`;

export type Course = {
  id: number;
  name: string;
  original_name: string;
  account_id: number;
  uuid: string;
  start_at: string;
  grading_standard_id: number;
  is_public: boolean;
  created_at: string;
  course_code: string;
  classification: string;
  default_view: string;
  root_account_id: number;
  enrollment_term_id: number;
  license: string;
  grade_passback_setting: string;
  end_at: string;
  public_syllabus: boolean;
  public_syllabus_to_auth: boolean;
  storage_quota_mb: number;
  is_public_to_auth_users: boolean;
  homeroom_course: boolean;
  course_color: string;
  friendly_name: string;
  apply_assignment_group_weights: boolean;
  calendar: {
    ics: string;
  };
  time_zone: string;
  blueprint: boolean;
  template: boolean;
  enrollments: {
    type: string;
    role: string;
    role_id: number;
    user_id: number;
    enrollment_state: string;
    limit_privileges_to_course_section: boolean;
  }[];
  hide_final_grades: boolean;
  workflow_state: string;
  restrict_enrollments_to_course_dates: boolean;
};

export type LinkedPeriod = Period &
  PeriodTimes &
  (
    | {
        type: "course";
        value: Course | null;
      }
    | {
        type: "single-select";
        value: { id: string; name: string } | null;
      }
  );

export type CourseCache = {
  name: string;
  classification: string;
};

const courseCache: CourseCache[] = [];

async function getUser() {
  const user = await db.user.findUnique({
    where: {
      id: (await getServerAuthSession())?.user.id,
    },
  });
  return user;
}

async function getAPI() {
  const user = await getUser();
  if (!user) return null;
  const school = await db.school.findUnique({
    where: {
      id: user.schoolId!,
    },
  });
  if (!user?.canvasToken || !school?.canvasUrl) return null;
  const encryptedToken = user.canvasToken;
  const decipher = createDecipheriv(
    "aes256",
    env.NEXTAUTH_ENCRYPTION_KEY,
    env.NEXTAUTH_ENCRYPTION_IV,
  );
  const token =
    decipher.update(encryptedToken, "base64", "utf8") + decipher.final("utf8");
  return {
    token: token,
    url: new URL(school.canvasUrl),
  };
}

async function getCourses(): Promise<Course[]> {
  const api = await getAPI();
  if (api == null) return [];
  api.url.pathname = "/api/v1/courses";
  api.url.searchParams.append("enrollment_state", "active");
  return await fetch(api.url, {
    headers: {
      Authorization: `Bearer ${api.token}`,
    },
  }).then(async (res) => {
    if (!res.ok) return [];
    return Promise.all(
      ((await res.json()) as unknown as Course[]).map(async (course) => ({
        ...course,
        original_name: course?.original_name ?? course.name,
        classification: await generateCourseClassification(
          course.original_name ?? course.name,
        ),
      })),
    ) as unknown as Course[];
  });
}

async function getSchedules() {
  const user = await getUser();
  if (!user) return null;
  return await db.schedule.findMany({
    where: {
      schoolId: user.schoolId!,
    },
  });
}

async function getSchedule(date?: string) {
  const user = await getUser();
  if (!user) return null;
  const scheduleOnDate = await db.scheduleDate.findFirst({
    where: {
      schoolId: user.schoolId!,
      date: date ?? moment().format("YYYY-MM-DD"),
    },
  });
  if (!scheduleOnDate) return null;
  const schedule = await db.schedule.findUnique({
    where: {
      id: scheduleOnDate.scheduleId,
    },
  });
  if (!schedule) return null;
  const scheduleTimes = await db.periodTimes.findMany({
    where: {
      scheduleId: schedule.id,
    },
  });
  return { ...schedule, periods: [...scheduleTimes] };
}

async function getScheduleWithValues(date?: string) {
  const schedule = (await getSchedule(date)) as unknown as {
    periods: LinkedPeriod[];
    id: string;
    schoolId: string;
    name: string;
    abbr: string;
  } | null;
  if (!schedule) return null;
  const courses = await getCourses();

  for (const period of schedule.periods) {
    const value = (
      await db.course.findUnique({
        where: {
          userId: (await getUser())?.id,
          id: period.periodId,
        },
      })
    )?.value;
    if (value?.startsWith("value:")) {
      period.value = await db.period.findFirst({
        where: {
          id: value.replace("value:", ""),
        },
      });
    } else if (value?.startsWith("course:")) {
      period.type = "course";
      period.value =
        courses.find(
          (course) => String(course.id) == value.replace("course:", ""),
        ) ?? null;
    }
  }

  return schedule;
}

// get all periods for the user and then populate the current schedule with the periods
async function getCourseListWithSchedule(date?: string) {
  const user = await getUser();
  if (!user) return null;
  const schedule = await getScheduleWithValues(date);
  const courses = await getCourses();
  const periods = (await db.period.findMany({
    where: {
      schoolId: user.schoolId!,
    },
  })) as unknown as LinkedPeriod[];

  for (let idx = 0; idx < periods.length; idx++) {
    let period = periods[idx]!;
    const schedulePeriod = schedule?.periods.find(
      (p) => p.periodId == period.id,
    );
    if (schedulePeriod) {
      period = { ...schedulePeriod, ...period };
    }
    const value = (
      await db.course.findFirst({
        where: {
          userId: user.id,
          groupId: period.groupId,
        },
      })
    )?.value;
    if (value?.startsWith("value:")) {
      period.value = await db.period.findFirst({
        where: {
          id: value.replace("value:", ""),
        },
      });
    } else if (value?.startsWith("course:")) {
      period.type = "course";
      period.value =
        courses.find(
          (course) => String(course.id) == value.replace("course:", ""),
        ) ?? null;
    }
    periods[idx] = period ?? null;
  }

  return periods;
}

async function generateCourseClassification(course: string) {
  let classification;
  classification = courseCache.find((c) => c.name === course)?.classification;
  if (classification) return classification;
  classification = (
    await db.courseClassification.findUnique({
      where: { name: course },
    })
  )?.classification;
  if (classification) {
    courseCache.push({
      classification,
      name: course,
    });
    return classification;
  }
  if ((await db.courseClassification.count()) <= 0) {
    const csv = classificationCSV
      .split("\n")
      .map((line) => line.split(",")) as unknown as string[][];
    await db.courseClassification.createMany({
      data: csv.map((line) => ({
        name: line[1] ?? "unset",
        classification: line[0] ?? "no class",
      })),
    });
  }
  const aiRequest = await fetch("https://api.cohere.ai/v1/classify", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.COHERE_API_KEY}`,
      "Content-Type": "application/json",
      "Request-Source": "playground",
    },
    body: JSON.stringify({
      model: "embed-english-v2.0",
      inputs: [course],
      examples: (await db.courseClassification.findMany()).map((course) => ({
        label: course.classification,
        text: course.name,
      })),
    }),
  });
  if (!aiRequest.ok && aiRequest.status !== 429) {
    console.error(
      "Course Classification Error: " +
        aiRequest.status +
        ": " +
        aiRequest.statusText,
    );
    return null;
  } else if (aiRequest.status === 429) {
    console.error("Course Classification Error: Rate Limited");
    return null;
  }
  const aiResponse = (await aiRequest.json()) as unknown as {
    classifications: { prediction: string }[];
  };
  classification = aiResponse.classifications.at(0)?.prediction;
  if (!classification) return null;
  await db.courseClassification.create({
    data: {
      name: course,
      classification: classification,
      saved: false,
    },
  });
  courseCache.push({ name: course, classification: classification });
  return classification;
}

const canvas = {
  getAPI,
  getCourses,
  getSchedules,
  getSchedule,
  getScheduleWithValues,
  getCourseListWithSchedule,
};

export { canvas };
