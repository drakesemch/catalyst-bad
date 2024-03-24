"use server";

import { createCipheriv } from "crypto";
import { redirect } from "next/navigation";
import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export type ErrorURL = {
  success: boolean;
  error?: "EMPTY" | "INVALID_URL" | "INVALID_HOSTNAME" | "INVALID_PATH";
};

export type ErrorToken = {
  success: boolean;
  error?:
    | "EMPTY"
    | "INVALID_TYPE"
    | "INVALID_TOKEN"
    | "USED_EXAMPLE"
    | "INVALID_URL";
};

export async function verifyURL(inpURL: string): Promise<ErrorURL> {
  if (inpURL === "") return { success: false, error: "EMPTY" };
  let url: URL;
  try {
    url = new URL(inpURL);
  } catch (err) {
    if (err instanceof TypeError) {
      return {
        success: false,
        error: "INVALID_URL",
      };
    }
  }
  url = new URL(inpURL);
  if (url.protocol !== "https:") {
    return {
      success: false,
      error: "INVALID_HOSTNAME",
    };
  }
  if (!url.hostname.includes(".instructure.com")) {
    return {
      success: false,
      error: "INVALID_HOSTNAME",
    };
  }
  if (url.pathname !== "/") {
    return {
      success: false,
      error: "INVALID_PATH",
    };
  }
  return { success: true };
}

export async function verifyToken(
  inpURL: string,
  token: string,
): Promise<ErrorToken> {
  if (
    !(
      (await verifyURL(inpURL)).success ||
      (await verifyURL(inpURL)).error == "INVALID_PATH"
    )
  )
    return {
      success: false,
      error: "INVALID_URL",
    };
  const url: URL = new URL(inpURL);
  if (token === "") return { success: false, error: "EMPTY" };
  if (!new RegExp("^\\d{5}@[a-zA-Z0-9]{64}$").test(token)) {
    return { success: false, error: "INVALID_TYPE" };
  }
  if (
    token ===
    "10968@R48fsV4K2Ttj83knxm3qw4CyNFpuE1ZrEhzmlL5dIkmAt1XnI8ulM3AyzxqkWowA"
  ) {
    return { success: false, error: "USED_EXAMPLE" };
  }
  url.pathname = "/api/v1/users/self";
  url.searchParams.append("access_token", token);
  try {
    return await fetch(url.toString()).then((res) => {
      if (res.ok) {
        return { success: true };
      }
      return { success: false, error: "INVALID_TOKEN" };
    });
  } catch (err) {
    return { success: false, error: "INVALID_TOKEN" };
  }
}

export async function saveCanvasCredentials(formData: FormData) {
  let url = formData.get("url") as string;
  const token = formData.get("token") as string;
  const urlAsURL = new URL(url);
  urlAsURL.pathname = "/";
  url = urlAsURL.toString();
  console.log("a");
  if (!url || !(await verifyURL(url)).success) return;
  console.log("b", url, token, await verifyToken(url, token));
  if (!token || (await verifyToken(url, token)).success === false) return;
  console.log("c");

  const session = await getServerAuthSession();
  if (!session) return;
  const cipher = createCipheriv(
    "aes256",
    env.NEXTAUTH_ENCRYPTION_KEY,
    env.NEXTAUTH_ENCRYPTION_IV,
  );
  const enryptedToken =
    cipher.update(token, "utf8", "base64") + cipher.final("base64");
  await db.user.update({
    where: { id: session.user.id },
    data: {
      canvasURL: url,
      canvasToken: enryptedToken,
    },
  });
  redirect("/app");
}
