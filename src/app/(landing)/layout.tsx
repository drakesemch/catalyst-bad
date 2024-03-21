import { Footer } from "~/components/site/Footer";
import { Nav } from "~/components/site/Nav";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="bg-background relative z-10 m-auto max-w-[calc(120ch-4rem)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
