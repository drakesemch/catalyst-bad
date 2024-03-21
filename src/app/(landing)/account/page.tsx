"use client";

import { GoogleLogo, MicrosoftLogo } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <Card className="w-[min(100%-2rem,40ch)]">
      <CardHeader>
        <CardTitle className="text-center">Continue with Catalyst</CardTitle>
        <CardDescription className="text-center">
          Please continue using a social provider
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => signIn("google")}>
            <GoogleLogo className="size-[1em]" />
            Google
          </Button>
          <Button variant="secondary">
            <MicrosoftLogo className="size-[1em]" />
            Microsoft
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
