import { cn } from "@/lib/utils";

export function Background({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 -ml-[max(calc((100vw-120ch+4rem)/2),0px)] w-screen overflow-hidden bg-background contrast-more:hidden",
        className,
      )}
    >
      <Filters />
      <div className="relative h-full w-full blur-[8vw]">
        <div className="animate-blob-1 absolute right-[50%] top-[30%] h-[24vw] w-[24vw] rounded-full bg-green-200 [transform-origin:calc(50%-300px)] motion-reduce:animate-none dark:bg-green-800" />
        <div className="animate-blob-2 absolute right-[40%] top-[50%] h-[18vw] w-[18vw] rounded-full bg-green-400 [transform-origin:calc(50%-100px)] motion-reduce:animate-none dark:bg-green-600" />
        <div className="animate-blob-3 absolute right-[20%] top-[40%] h-[42vw] w-[42vw] rounded-full bg-green-500 [transform-origin:calc(50%-200px)] motion-reduce:animate-none dark:bg-green-500" />
        <div className="animate-blob-4 absolute right-[10%] top-[20%] h-[23vw] w-[23vw] rounded-full bg-green-300 [transform-origin:calc(50%+400px)] motion-reduce:animate-none dark:bg-green-700" />
        <div className="animate-blob-5 absolute right-[30%] top-[10%] h-[40vw] w-[40vw] rounded-full bg-green-400 [transform-origin:calc(50%+200px)] motion-reduce:animate-none dark:bg-green-600" />
        <div className="animate-blob-1 absolute right-[60%] top-[20%] h-[32vw] w-[32vw] rounded-full bg-green-600 [transform-origin:calc(50%+100px)] motion-reduce:animate-none dark:bg-green-400" />
        <div className="animate-blob-2 absolute right-[70%] top-[60%] h-[41vw] w-[41vw] rounded-full bg-green-300 [transform-origin:calc(50%+300px)] motion-reduce:animate-none dark:bg-green-700" />
        <div className="animate-blob-3 absolute right-[80%] top-[40%] h-[20vw] w-[20vw] rounded-full bg-green-200 [transform-origin:calc(50%+400px)] motion-reduce:animate-none dark:bg-green-800" />
        <div className="animate-blob-4 absolute right-[90%] top-[70%] h-[16vw] w-[16vw] rounded-full bg-green-100 [transform-origin:calc(50%+200px)] motion-reduce:animate-none dark:bg-green-900" />
        <div className="animate-blob-5 absolute right-[70%] top-[80%] h-[12vw] w-[12vw] rounded-full bg-green-400 [transform-origin:calc(50%+100px)] motion-reduce:animate-none dark:bg-green-600" />
      </div>
      <div className="absolute inset-0 bg-background/60" />
      <Grain />
    </div>
  );
}

export function Grain({
  className,
  children,
}: {
  className?: string;
  opacity?: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        filter: `url(#grain) brightness(0)`,
        mixBlendMode: "soft-light",
      }}
    >
      {children}
    </div>
  );
}

export function Filters() {
  return (
    <svg
      // xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      // xmlns:svgjs="http://svgjs.dev/svgjs"
      viewBox="0 0 10000 10000"
      width="0"
      height="0"
      className="overflow-hidden"
    >
      <defs>
        <filter
          id="grain"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            seed="94"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="turbulence"
            result="colormatrix"
          />
          <feComponentTransfer
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="colormatrix"
            result="componentTransfer"
          >
            <feFuncR type="linear" slope="3"></feFuncR>
            <feFuncG type="linear" slope="3"></feFuncG>
            <feFuncB type="linear" slope="3"></feFuncB>
          </feComponentTransfer>
          <feColorMatrix
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="componentTransfer"
            result="colormatrix2"
            type="matrix"
            values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 15 -7"
          />
        </filter>
      </defs>
    </svg>
  );
}
