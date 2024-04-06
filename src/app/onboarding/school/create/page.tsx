"use client";

import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createSchool } from "./action";
import { Button } from "~/components/ui/button";
import { CardContent, CardFooter } from "~/components/ui/card";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandGroups,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import { cn } from "~/lib/utils";

const states = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

export default function CanvasPage() {
  const { pending } = useFormStatus();

  return (
    <>
      <form action={createSchool}>
        <CardContent className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Connect a School to Catalyst</h2>
          <Label>
            School Name
            <Input name="school" placeholder="East High School" />
          </Label>
          <Label>
            School Address
            <Input name="address" placeholder="840 S 1300 E" />
          </Label>
          <Label>
            City
            <Input name="city" placeholder="Salt Lake City" />
          </Label>
          <Label>
            State
            <StatePicker />
          </Label>
          <Label>
            School Distrcit
            <Input
              name="district"
              placeholder="Salt Lake City School District"
            />
          </Label>
          <Label>
            Canvas URL
            <Input
              name="canvasUrl"
              placeholder="https://canvas.instructure.com/"
            />
          </Label>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending} className="flex gap-2">
            Create School <ArrowRight />
          </Button>
        </CardFooter>
      </form>
    </>
  );
}

function StatePicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<keyof typeof states | "">("");

  return (
    <>
      <input type="hidden" name="state" value={value} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[50ch] justify-between"
          >
            {value
              ? states[value.toUpperCase() as keyof typeof states]
              : "Select state..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0">
          <Command>
            <CommandInput placeholder="Search state..." />
            <CommandGroups>
              <CommandGroup>
                {Object.entries(states).map(([code, state]) => (
                  <CommandItem
                    key={state}
                    value={code}
                    onSelect={(currentValue) => {
                      setValue(
                        currentValue == value
                          ? ""
                          : (currentValue as keyof typeof states),
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.toUpperCase() == code
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {code} - {state}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandGroups>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
