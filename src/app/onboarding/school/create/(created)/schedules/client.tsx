"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronsUpDown,
  CircleSlash,
  Copy,
  GripVertical,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSchedules } from "./action";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
} from "framer-motion";
import { randomBytes } from "crypto";
import {
  Command,
  CommandGroup,
  CommandGroups,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import moment from "moment";

type Schedule = { id: string; name: string; abbr: string; periods: Period[] };
type Period = {
  id: string;
  selection: string;
  startLocal: string;
  endLocal: string;
};

export type RawPeriod = {
  id: string;
  name: string;
  groupName: string;
  type: string;
};

export default function CreateSchoolPeriodsClient({
  periods,
}: {
  periods: RawPeriod[];
}) {
  const { pending } = useFormStatus();
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: randomBytes(16).toString(),
      name: "Default Schedule",
      abbr: "DEF",
      periods: [],
    },
  ]);

  return (
    <>
      <form action={createSchedules}>
        <CardContent className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add Schedules</h2>
          <Reorder.Group
            axis="y"
            values={schedules}
            onReorder={setSchedules}
            className="flex flex-col gap-2"
          >
            <AnimatePresence mode="popLayout">
              {schedules.map((schedule, idx) => (
                <motion.div
                  key={schedule.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Schedule
                    schedule={schedule}
                    idx={idx}
                    schedules={schedules}
                    setSchedules={setSchedules}
                    selectablePeriods={periods}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </Reorder.Group>
          <Button
            onClick={() => {
              setSchedules([
                ...schedules,
                {
                  id: randomBytes(16).toString(),
                  name: `Schedule ${schedules.length + 1}`,
                  abbr: "NEW",
                  periods: [],
                },
              ]);
            }}
            variant="secondary"
          >
            <Plus />
            New Schedule
          </Button>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending} className="flex gap-2">
            Create Schedules <ArrowRight />
          </Button>
        </CardFooter>
      </form>
    </>
  );
}

function Schedule({
  schedule,
  idx,
  setSchedules,
  schedules,
  selectablePeriods,
}: {
  schedule: Schedule;
  idx: number;
  setSchedules: (value: Schedule[]) => void;
  schedules: Schedule[];
  selectablePeriods: RawPeriod[];
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item value={schedule} dragListener={false} dragControls={controls}>
      <input
        type="hidden"
        name="utcOffset"
        value={moment().local().format("Z")}
      />
      <div className="flex flex-col gap-2 rounded-sm border bg-background px-4 py-2">
        <div className="flex flex-col-reverse items-center gap-2 sm:flex-row">
          <h3 className="truncate text-lg font-bold">
            [{schedules[idx]?.abbr}] {schedules[idx]?.name}
          </h3>
          <div className="flex w-full flex-1 justify-between gap-2 sm:justify-end">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => {
                setSchedules(schedules.filter((_, i) => i !== idx));
              }}
            >
              <CircleSlash />
            </Button>
            <Button
              onClick={() => {
                setSchedules([
                  ...schedules.slice(0, idx + 1),
                  {
                    id: randomBytes(16).toString(),
                    name: `${schedules[idx]?.name ?? ""} (Copy)`,
                    abbr: `${schedules[idx]?.abbr ?? "NEW"}`,
                    periods: [...schedule.periods],
                  },
                  ...schedules.slice(idx + 1),
                ]);
              }}
              variant="ghost"
              size="icon"
            >
              <Copy />
            </Button>
            <Button
              onClick={() => {
                if (idx === 0) return;
                setSchedules(
                  schedules.map((p, i) => {
                    if (i === idx) {
                      return schedules[idx - 1];
                    }
                    if (i === idx - 1) {
                      return schedules[idx];
                    }
                    return p;
                  }) as Schedule[],
                );
              }}
              variant="ghost"
              size="icon"
            >
              <ArrowUp />
            </Button>
            <Button
              onClick={() => {
                if (idx === schedules.length - 1) return;
                setSchedules(
                  schedules.map((p, i) => {
                    if (i === idx) {
                      return schedules[i + 1];
                    }
                    if (i === idx + 1) {
                      return schedules[i - 1];
                    }
                    return p;
                  }) as Schedule[],
                );
              }}
              variant="ghost"
              size="icon"
            >
              <ArrowDown />
            </Button>
            <Button
              onPointerDown={(e) => controls.start(e)}
              variant="ghost"
              size="icon"
              className="cursor-grab"
            >
              <GripVertical />
            </Button>
          </div>
        </div>
        <Label>
          Name
          <Input
            name={`schedules[${idx}].name`}
            maxLength={16}
            defaultValue={schedule.name}
            onChange={(e) => {
              setSchedules(
                schedules.map((p, i) => {
                  if (i === idx) {
                    return {
                      ...p,
                      name: e.target.value,
                    };
                  }
                  return p;
                }),
              );
            }}
            required
          />
        </Label>
        <Label>
          Abbreviation
          <Input
            name={`schedules[${idx}].abbr`}
            defaultValue={schedule.abbr}
            maxLength={3}
            onChange={(e) => {
              setSchedules(
                schedules.map((p, i) => {
                  if (i === idx) {
                    return {
                      ...p,
                      abbr: e.target.value,
                    };
                  }
                  return p;
                }),
              );
            }}
            required
          />
        </Label>
        <div className="mt-4 flex flex-col gap-2">
          <Reorder.Group
            axis="y"
            values={schedule.periods}
            onReorder={(value) => {
              setSchedules(
                schedules.map((p, i) => {
                  if (i === idx) {
                    return {
                      ...p,
                      periods: value,
                    };
                  }
                  return p;
                }),
              );
            }}
            className="flex flex-col gap-2"
          >
            <AnimatePresence mode="popLayout">
              {schedule.periods.map((period, subIdx) => (
                <motion.div
                  key={period.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Period
                    period={period}
                    idx={idx}
                    subIdx={subIdx}
                    schedules={schedules}
                    setSchedules={setSchedules}
                    selectablePeriods={selectablePeriods}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </Reorder.Group>
          <Button
            onClick={() => {
              setSchedules(
                schedules.map((p, i) => {
                  if (i === idx) {
                    return {
                      ...p,
                      periods: [
                        ...p.periods,
                        {
                          id: randomBytes(16).toString(),
                          selection: "",
                          startLocal: "",
                          endLocal: "",
                        },
                      ],
                    };
                  }
                  return p;
                }),
              );
            }}
            variant="secondary"
          >
            <Plus />
            New Period
          </Button>
        </div>
      </div>
    </Reorder.Item>
  );
}

function Period({
  period,
  idx,
  subIdx,
  setSchedules,
  schedules,
  selectablePeriods,
}: {
  period: Period;
  idx: number;
  subIdx: number;
  setSchedules: (value: Schedule[]) => void;
  schedules: Schedule[];
  selectablePeriods: RawPeriod[];
}) {
  const controls = useDragControls();
  const [open, setOpen] = useState(false);

  return (
    <Reorder.Item value={period} dragListener={false} dragControls={controls}>
      <div className="rounded-md border bg-background px-4 py-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col-reverse items-center gap-2 sm:flex-row">
            <input
              type="hidden"
              name={`schedules[${idx}].periods[${subIdx}].id`}
              value={schedules[idx]!.periods[subIdx]!.selection}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full flex-1 justify-between sm:w-auto"
                >
                  {schedules[idx]!.periods[subIdx]!.selection
                    ? selectablePeriods.find(
                        (p) =>
                          p.id == schedules[idx]!.periods[subIdx]!.selection,
                      )?.name
                    : "Select Period..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="left-0 z-10 w-[var(--radix-popper-anchor-width)] p-0 sm:w-[min(calc(100vw-2rem),30ch)]"
                align="start"
              >
                <Command>
                  <CommandInput placeholder="Search periods..." />
                  <CommandGroups>
                    {(() => {
                      const availablePeriods = selectablePeriods.filter((p) => {
                        return (
                          p.id == schedules[idx]!.periods[subIdx]!.selection ||
                          !schedules[idx]!.periods.some(
                            (per) => per.selection == p.id,
                          )
                        );
                      });
                      if (availablePeriods.length != 0) {
                        return (
                          <CommandGroup>
                            {availablePeriods.map((period) => (
                              <CommandItem
                                key={period.id}
                                value={period.id}
                                onSelect={(currentValue) => {
                                  setSchedules(
                                    schedules.map((p, i) => {
                                      if (i == idx) {
                                        return {
                                          ...p,
                                          periods: [
                                            ...p.periods.slice(0, subIdx),
                                            {
                                              id: p.periods[subIdx]!.id,
                                              selection:
                                                schedules[idx]!.periods[subIdx]!
                                                  .selection == currentValue
                                                  ? ""
                                                  : currentValue,
                                              startLocal: "",
                                              endLocal: "",
                                            },
                                            ...p.periods.slice(subIdx + 1),
                                          ],
                                        };
                                      }
                                      return p;
                                    }),
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    schedules[idx]!.periods[subIdx]!
                                      .selection == period.id
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                <div className="flex flex-col justify-start gap-2">
                                  {period.name}
                                  {period.groupName != period.name && (
                                    <span className="text-xs text-muted-foreground">
                                      ({period.groupName})
                                    </span>
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        );
                      } else {
                        return (
                          <p className="py-8 text-center text-sm text-muted-foreground">
                            Period not listed
                            <br />
                            (limit one per schedule)
                          </p>
                        );
                      }
                    })()}
                  </CommandGroups>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex w-full justify-between gap-2 sm:w-[unset] sm:justify-end">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  setSchedules(
                    schedules.map((p, i) => {
                      if (i == idx) {
                        return {
                          ...p,
                          periods: p.periods.filter((_, i) => i !== subIdx),
                        };
                      }
                      return p;
                    }),
                  );
                }}
              >
                <CircleSlash />
              </Button>
              <Button
                onClick={() => {
                  if (subIdx === 0) return;
                  setSchedules(
                    schedules.map((p, i) => {
                      if (i == idx) {
                        return {
                          ...p,
                          periods: [
                            ...p.periods.slice(0, subIdx - 1),
                            p.periods[subIdx]!,
                            p.periods[subIdx - 1]!,
                            ...p.periods.slice(subIdx + 1),
                          ],
                        };
                      }
                      return p;
                    }),
                  );
                }}
                variant="ghost"
                size="icon"
              >
                <ArrowUp />
              </Button>
              <Button
                onClick={() => {
                  if (subIdx === schedules[idx]!.periods.length - 1) return;
                  setSchedules(
                    schedules.map((p, i) => {
                      if (i == idx) {
                        return {
                          ...p,
                          periods: [
                            ...p.periods.slice(0, subIdx),
                            p.periods[subIdx + 1]!,
                            p.periods[subIdx]!,
                            ...p.periods.slice(subIdx + 2),
                          ],
                        };
                      }
                      return p;
                    }),
                  );
                }}
                variant="ghost"
                size="icon"
              >
                <ArrowDown />
              </Button>
              <Button
                onPointerDown={(e) => controls.start(e)}
                variant="ghost"
                size="icon"
                className="cursor-grab"
              >
                <GripVertical />
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-bold">Start Time</h4>
              <InputOTP
                maxLength={6}
                minLength={4}
                name={`schedules[${idx}].periods[${subIdx}].startLocal`}
                defaultValue={schedules[idx]?.periods[subIdx]?.startLocal}
              >
                <InputOTPGroup>
                  <InputOTPSlot className="h-8 w-8" index={0} />
                  <InputOTPSlot className="h-8 w-8" index={1} />
                </InputOTPGroup>
                <div>:</div>
                <InputOTPGroup>
                  <InputOTPSlot className="h-8 w-8" index={2} />
                  <InputOTPSlot className="h-8 w-8" index={3} />
                </InputOTPGroup>
                <div>:</div>
                <InputOTPGroup>
                  <InputOTPSlot className="h-8 w-8" index={4} />
                  <InputOTPSlot className="h-8 w-8" index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="muted">Format as local military time</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-bold">End Time</h4>
              <InputOTP
                maxLength={6}
                minLength={4}
                name={`schedules[${idx}].periods[${subIdx}].endLocal`}
                defaultValue={schedules[idx]?.periods[subIdx]?.endLocal}
              >
                <InputOTPGroup>
                  <InputOTPSlot className="h-8 w-8" index={0} />
                  <InputOTPSlot className="h-8 w-8" index={1} />
                </InputOTPGroup>
                <div>:</div>
                <InputOTPGroup>
                  <InputOTPSlot className="h-8 w-8" index={2} />
                  <InputOTPSlot className="h-8 w-8" index={3} />
                </InputOTPGroup>
                <div>:</div>
                <InputOTPGroup>
                  <InputOTPSlot className="h-8 w-8" index={4} />
                  <InputOTPSlot className="h-8 w-8" index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="muted">Format as local military time</p>
            </div>
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
}
