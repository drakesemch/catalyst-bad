import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";

export async function AppButton({ className }: { className?: string }) {
  const session = await getServerAuthSession();

  return (
    <span>
      {!session ? (
        <Button href="/auth" className={className}>
          Get Started
        </Button>
      ) : (
        <Button href="/app" className={className}>
          Go to app
        </Button>
      )}
    </span>
  );
}
