"use client";

import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { selectSchool } from "./action";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import type { Period } from "@prisma/client";
import type { Course } from "@/server/canvas";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Fuse from "fuse.js";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandGroups,
} from "@/components/ui/command";
import { selectCourses } from "./action";

export default function CoursesClientPage({
  courses,
  periods,
}: {
  courses: Course[];
  periods: Period[];
}) {
  const { pending } = useFormStatus();

  const skipInputs: string[] = [];

  return (
    <>
      <form action={selectCourses}>
        <CardContent>
          {periods.length == 0 && (
            <p className="block w-[50ch] text-center text-xs text-muted-foreground">
              No periods found. Please contact your school administrator.
            </p>
          )}
          <div className="flex flex-col gap-2">
            {periods
              .sort((a, b) => {
                return a.order >= b.order ? 1 : -1;
              })
              .map((period) => {
                switch (period.type) {
                  case "course":
                    if (skipInputs.includes(period.groupId)) return null;
                    skipInputs.push(period.groupId);
                    return (
                      <PeriodSelect
                        key={period.id}
                        period={period}
                        courses={courses}
                      />
                    );
                  case "single-select":
                    if (skipInputs.includes(period.groupId)) return null;
                    skipInputs.push(period.groupId);
                    const inputs = periods.filter(
                      (p) => p.groupId == period.groupId,
                    );
                    return (
                      <OptionSelect
                        key={period.id}
                        period={period}
                        inputs={inputs}
                      />
                    );
                }
              })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending} className="flex gap-2">
            Next <ArrowRight />
          </Button>
        </CardFooter>
      </form>
    </>
  );
}

function PeriodSelect({
  period,
  courses,
}: {
  period: Period;
  courses: Course[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  let fuse: Fuse<Course> | null = null;
  useEffect(() => {
    fuse = new Fuse(courses, {
      keys: ["classification", "original_name"],
      includeScore: true,
      threshold: 0.4,
    });
  });

  return (
    <>
      <input
        type="hidden"
        name={`period:${period.groupId}`}
        value={`course:${value || "null"}`}
      />
      <div key={period.id}>
        <h2>{period.name}</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[50ch] justify-between"
            >
              {value
                ? courses.find((course) => String(course.id) == value)
                    ?.original_name
                : "[No course]"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-h-[calc(var(--radix-popper-available-height)-1rem)] w-[var(--radix-popper-anchor-width)] overflow-auto p-0">
            <Command
              filter={(value, search) => {
                return (
                  fuse?.search(search).find((result) => {
                    return String(result.item.id) == value;
                  })?.score ?? 0
                );
              }}
            >
              <CommandInput placeholder="Search course..." />
              <CommandEmpty>No courses found.</CommandEmpty>
              <CommandGroups>
                {courses.length != 0 && (
                  <CommandGroup>
                    {courses.map((course) => (
                      <CommandItem
                        key={course.id}
                        value={String(course.id)}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value == String(course.id)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <div className="flex flex-col justify-start gap-2">
                          <p>{course.classification ?? "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">
                            {course.original_name}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandGroups>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

function OptionSelect({
  period,
  inputs,
}: {
  period: Period;
  inputs: Period[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="hidden"
        name={`period:${period.groupId}`}
        value={`value:${value || "null"}`}
      />
      <div key={period.id}>
        <h2>{period.groupName}</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[50ch] justify-between"
            >
              {value
                ? inputs.find((input) => input.id == value)?.name
                : "Select option..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-h-[calc(var(--radix-popper-available-height)-1rem)] w-[var(--radix-popper-anchor-width)] overflow-auto p-0">
            <Command>
              <CommandInput placeholder="Search option..." />
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroups>
                {inputs.length != 0 && (
                  <CommandGroup>
                    {inputs.map((input) => (
                      <CommandItem
                        key={input.id}
                        value={input.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value == input.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <div className="flex flex-col justify-start gap-2">
                          <p>{input.name}</p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandGroups>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
