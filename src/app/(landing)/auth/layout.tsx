import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (session) redirect("/app");
  return <div className="grid h-screen place-items-center">{children}</div>;
}
