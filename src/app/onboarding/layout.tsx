import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen place-items-center p-4">
      <Card className="w-[50ch]">
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
