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
import { ArrowLeft, Link, UserRoundPlus } from "lucide-react";

export default function SignIn(props: { searchParams: { email?: string } }) {
  return (
    <main className="grid h-[calc(100vh-3.5625rem)] place-items-center">
      <Card className="w-[28rem]">
        <CardHeader>
          <CardTitle>Account doesn{"'"}t exist</CardTitle>
          <CardDescription>Let{"'"}s get you set up!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="small">
            Using email:{" "}
            <span className="snippet !text-xs">{props.searchParams.email}</span>
          </p>
          <p className="text-xs text-destructive">
            Your email has not been sent to any servers yet, if this is a wrong
            email address or you have changed your mind, you can safely leave
            this page.
          </p>
          <div className="mb-4 flex h-32 flex-col gap-4 md:-mb-2 md:flex-row">
            <Button
              variant="outline"
              className="flex h-full flex-1 flex-col gap-2"
            >
              <Link className="!size-[1.5rem]" />
              Link to another account
            </Button>
            <Button
              variant="secondary"
              className="flex h-full flex-1 flex-col gap-2"
            >
              <UserRoundPlus className="!size-[1.5rem]" />
              Create this account
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            href={`/account?email=${props.searchParams.email}`}
            className="h-14 w-full"
            variant="destructive"
          >
            <ArrowLeft />
            Change email
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
