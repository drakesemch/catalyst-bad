import { Footer } from "~/components/site/footer";
import { Nav } from "~/components/site/nav";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="relative z-10 m-auto max-w-[calc(120ch-4rem)] bg-background">
        {children}
      </main>
      <Footer />
    </>
  );
}
