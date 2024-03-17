export function Footer() {
  return (
    <>
      <footer className="relative bottom-0 z-10 m-auto mb-4 mt-8 h-[30rem] max-w-[min(calc(120ch-2rem),calc(100vw-2rem))] rounded-b-lg rounded-t-3xl bg-secondary/30 p-16">
        <h2 className="h1">Catalyst</h2>
        <h3 className="muted mt-2 !text-sm">
          A reimagined canvas for students
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="mt-4 flex flex-col gap-2">
            <h4 className="h3">Main</h4>
          </div>
        </div>
      </footer>
    </>
  );
}
