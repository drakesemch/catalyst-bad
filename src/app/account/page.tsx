"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { doesUserExist } from "./action";
import { useRouter } from "next/navigation";
import type { Result } from "./schema";

export default function SignIn(props: { searchParams: { email?: string } }) {
  const [state, formAction] = useFormState(doesUserExist, null);

  return (
    <main className="grid h-[calc(100vh-3.5625rem)] place-items-center">
      <form action={formAction}>
        <Form defaultEmail={props.searchParams.email} state={state} />
      </form>
    </main>
  );
}

function Form({
  defaultEmail,
  state,
}: {
  defaultEmail?: string;
  state: Result | null;
}) {
  const { pending } = useFormStatus();
  const formData = new FormData();
  const inp = React.useRef<HTMLInputElement>(null);

  const router = useRouter();

  React.useEffect(
    () => {
      console.log(state?.formData);
      if (state?.redirect) {
        if (state.create)
          router.push(
            `/account/get-started?email=${inp.current?.value ?? defaultEmail}`,
          );
        else router.push(`/account/credentials`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state?.redirect],
  );

  return (
    <Card className="w-[28rem]">
      <CardHeader>
        <CardTitle>Continue with Catalyst</CardTitle>
        <CardDescription>Enter an email to get started!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Label className="flex flex-col gap-2">
          Your Email
          <Input
            name="email"
            defaultValue={defaultEmail}
            disabled={pending}
            ref={inp}
          />
          <RenderError error={state?.errors?.email} />
        </Label>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" disabled={pending}>
          Continue
          {pending ? <Loader className="animate-spin" /> : <ArrowRight />}
        </Button>
      </CardFooter>
    </Card>
  );
}

function RenderError({ error }: { error?: string[] }) {
  if (error) {
    return <p className="text-xs text-destructive">{error[0]}</p>;
  }
  return null;
}
