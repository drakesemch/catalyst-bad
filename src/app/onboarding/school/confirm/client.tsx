"use client";

import { Check, CircleSlash } from "lucide-react";

import { Button } from "~/components/ui/button";
import { selectSchool } from "./action";
import { CardContent, CardFooter } from "~/components/ui/card";
import { useFormStatus } from "react-dom";
import type { School } from "@prisma/client";

export default function ConfirmSchoolClientPage({
  school,
}: {
  school: School;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <form action={selectSchool}>
        <input type="hidden" name="school" value={school.id} />
        <CardContent>
          <h2 className="h4 font-semibold">Confirm School</h2>
          <div className="muted pt-2">
            Please confirm the information below before proceeding.
            <table className="mt-2 table">
              <tbody>
                <tr>
                  <td className="font-semibold">Name</td>
                  <td>{school.name}</td>
                </tr>
                <tr>
                  <td className="font-semibold">District</td>
                  <td>{school.district ?? "None"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Address</td>
                  <td>{school.address}</td>
                </tr>
                <tr>
                  <td className="font-semibold">City</td>
                  <td>{school.city}</td>
                </tr>
                <tr>
                  <td className="font-semibold">State</td>
                  <td>{school.state}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Canvas URL</td>
                  <td>
                    <Button
                      variant="link"
                      href={school.canvasUrl}
                      className="h-auto p-0 text-xs"
                    >
                      {school.canvasUrl}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={pending}
            href="/onboarding/school"
            variant="secondary"
            className="flex gap-2"
          >
            Change <CircleSlash />
          </Button>
          <Button type="submit" disabled={pending} className="flex gap-2">
            Procceed <Check />
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
