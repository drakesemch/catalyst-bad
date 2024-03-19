import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";
import { env } from "@/env";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [],
  //   providers: [
  //     Google({
  //       clientId: env.GOOGLE_CLIENT_ID,
  //       clientSecret: env.GOOGLE_CLIENT_SECRET,
  //     }),
  //   ],
});
