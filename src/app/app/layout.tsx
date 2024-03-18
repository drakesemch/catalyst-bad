import { AppNav } from "@/components/site/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <AppNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
