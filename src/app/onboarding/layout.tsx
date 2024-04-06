import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { pages } from "./pages";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const url = new URL(
    headersList.get("x-url") ??
      headersList.get("referer") ??
      "http://localhost:3000/onboarding",
  );

  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth");
  }

  let skip = false;

  (await pages()).forEach((page) => {
    if (!skip && !page.complete) {
      skip = true;
      if (!url.pathname.startsWith(page.path || "")) {
        redirect(page.path);
      }
    }
  });

  if ((await pages()).every((page) => page.complete)) {
    redirect("/app");
  }

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <Card className="w-[min(50ch,100%)]">
        <CardHeader>
          <CardTitle>Onboarding</CardTitle>
          <CardDescription>
            Let{"'"}s finish setting up your account.
          </CardDescription>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
}
