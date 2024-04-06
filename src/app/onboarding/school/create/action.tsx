"use server";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { pages } from "../../pages";
import { type ZodError, z } from "zod";

const states = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const schema = z.object({
  school: z.string(),
  address: z.string(),
  city: z.string(),
  state: z
    .string()
    .refine((state) => Object.keys(states).includes(state.toUpperCase())),
  district: z.string(),
  canvasUrl: z
    .string()
    .url()
    .refine((url) => new URL(url).hostname.endsWith("instructure.com")),
});

export async function createSchool(formData: FormData) {
  const { school, address, city, state, district, canvasUrl } =
    Object.fromEntries(Array.from(formData.entries()));

  const form = schema.safeParse({
    school,
    address,
    city,
    state,
    district,
    canvasUrl,
  });

  if (!form.success) {
    return {
      success: false,
      error: form.error.errors.flat(),
    };
  }

  const canvasURL = new URL(form.data.canvasUrl);
  canvasURL.pathname = "/";

  const session = await getServerAuthSession();
  if (!session) redirect("/auth");

  const schoolRow = await db.school.create({
    data: {
      name: form.data.school,
      address: form.data.address,
      city: form.data.city,
      state: form.data.state.toUpperCase(),
      district: form.data.district,
      canvasUrl: String(canvasURL),
    },
  });

  await db.schoolPermissions.create({
    data: {
      schoolId: schoolRow.id,
      userId: session.user.id,
      role: "OWNER",
    },
  });

  redirect("/onboarding/school/create/periods");
}
