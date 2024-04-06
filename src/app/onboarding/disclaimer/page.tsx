"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { acceptDisclaimer } from "./action";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, CircleSlash } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function DisclaimerPage() {
  const { pending } = useFormStatus();
  const [checked, setChecked] = useState(false);

  return (
    <>
      <form action={acceptDisclaimer}>
        <CardContent>
          Disclaimer
          <p className="muted pt-2">
            Catalyst is meant to enhance your experience with Canvas. We are not
            affiliated with Instructure or the Canvas business.
          </p>
          <p className="muted pt-2">
            During the beta period, we are not responsible for any data loss,
            missed subissions, or any other issues that may arise from using
            Catalyst. We are constantly working to improve the service and will
            do our best to ensure that you have a great experience.
          </p>
          <Label className="mt-2 flex cursor-pointer flex-row items-center gap-2 text-sm">
            <Checkbox
              id="terms"
              name="terms"
              onCheckedChange={() => setChecked(!checked)}
            />
            Accept to the terms of using this application
          </Label>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending} className="flex gap-2">
            {!checked ? (
              <>
                Close Account <CircleSlash />
              </>
            ) : (
              <>
                Accept <ArrowRight />
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
