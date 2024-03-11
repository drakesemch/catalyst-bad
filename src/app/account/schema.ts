import { z } from "zod";

export const schema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid Email",
    }),
});

export type Result = {
  errors: {
    email?: string[] | undefined;
  };
  success: boolean;
  redirect: boolean;
  create: boolean;
};
