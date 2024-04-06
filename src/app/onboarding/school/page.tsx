"use client";

import { ArrowRight, Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  // CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { getSchools, selectSchool } from "./action";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import type { School } from "@prisma/client";

export default function SchoolClientPage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { pending } = useFormStatus();

  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    (async () => {
      setSchools(await getSchools(""));
    })().catch((_) => {
      setSchools([]);
    });
  }, []);

  return (
    <>
      <form action={selectSchool}>
        <input type="hidden" name="school" value={value} />
        <CardContent>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[50ch] justify-between"
              >
                {value
                  ? schools.find((school) => school.id === value)?.name
                  : "Select school..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search school..."
                  onInput={(inp) => {
                    (async () => {
                      setSchools(await getSchools(inp.currentTarget.value));
                    })().catch((_) => {
                      setSchools([]);
                    });
                  }}
                />
                {(() => {
                  if (schools.length != 0) {
                    return (
                      <CommandGroup>
                        {schools.map((school) => (
                          <CommandItem
                            key={school.id}
                            value={school.id}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === school.id
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            <div className="flex flex-col justify-start gap-2">
                              {school.name}{" "}
                              {school.district && (
                                <span className="text-xs text-muted-foreground">
                                  ({school.district})
                                </span>
                              )}
                              <p className="text-xs text-muted-foreground">
                                {school.address}, {school.city}, {school.state}
                              </p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    );
                  } else {
                    return (
                      <p className="py-8 text-center text-sm text-muted-foreground">
                        No schools found
                      </p>
                    );
                  }
                })()}
                <div className="m-2 flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground">
                    School not listed? Add one!
                  </p>
                  <Button variant="secondary" href="./school/create">
                    <Plus /> Add new school
                  </Button>
                </div>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={pending || !value}
            className="flex gap-2"
          >
            Next <ArrowRight />
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
