"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { countDistinct } from "drizzle-orm";
import { type Result, schema } from "./schema";

export async function doesUserExist(_: Result | null, formData: FormData) {
  const [email] = [formData.get("email") as string | null];
  const form = schema.safeParse({
    email,
  });

  if (!form.success) {
    return {
      success: false,
      errors: form.error.flatten().fieldErrors,
      redirect: false,
      create: false,
    };
  } else {
    if (
      ((await db.select({ value: countDistinct(users.email) }).from(users)).at(
        0,
      )?.value ?? 0) > 0
    ) {
      return {
        success: true,
        errors: {},
        redirect: true,
        create: false,
      };
    } else {
      return {
        success: true,
        errors: {},
        redirect: true,
        create: true,
      };
    }
  }
}
