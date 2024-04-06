"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CircleSlash,
  Copy,
  GripVertical,
  Plus,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createPeriods } from "./action";
import { Button } from "~/components/ui/button";
import { CardContent, CardFooter } from "~/components/ui/card";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Period = { id: string; name: string; type: string; options: string[] };

export default function CreateSchoolPeriods() {
  const { pending } = useFormStatus();
  const [periods, setPeriods] = useState<Period[]>([
    {
      id: randomBytes(16).toString(),
      name: "Period 1",
      type: "course",
      options: [],
    },
    {
      id: randomBytes(16).toString(),
      name: "Period 2",
      type: "course",
      options: [],
    },
    {
      id: randomBytes(16).toString(),
      name: "Period 3",
      type: "course",
      options: [],
    },
  ]);

  return (
    <>
      <form action={createPeriods}>
        <CardContent className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add Periods</h2>
          <Reorder.Group
            axis="y"
            values={periods}
            onReorder={setPeriods}
            className="flex flex-col gap-2"
          >
            <AnimatePresence mode="popLayout">
              {periods.map((period, idx) => (
                <motion.div
                  key={period.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Period
                    period={period}
                    idx={idx}
                    periods={periods}
                    setPeriods={setPeriods}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </Reorder.Group>
          <Button
            onClick={() => {
              setPeriods([
                ...periods,
                {
                  id: randomBytes(16).toString(),
                  name: `Period ${periods.length + 1}`,
                  type: "course",
                  options: [],
                },
              ]);
            }}
            variant="secondary"
          >
            <Plus />
            New Period
          </Button>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending} className="flex gap-2">
            Create Periods <ArrowRight />
          </Button>
        </CardFooter>
      </form>
    </>
  );
}

function Period({
  period,
  idx,
  setPeriods,
  periods,
}: {
  period: Period;
  idx: number;
  setPeriods: (value: Period[]) => void;
  periods: Period[];
}) {
  const controls = useDragControls();
  const [name, setName] = useState(period.name);

  return (
    <Reorder.Item value={period} dragListener={false} dragControls={controls}>
      <div className="flex flex-col gap-2 rounded-sm border bg-background p-2">
        <div className="flex items-center gap-2">
          <h3 className="flex-1 text-lg font-bold">{name}</h3>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => {
              setPeriods(periods.filter((_, i) => i !== idx));
            }}
          >
            <CircleSlash />
          </Button>
          <Button
            onClick={() => {
              setPeriods([
                ...periods.slice(0, idx + 1),
                {
                  id: randomBytes(16).toString(),
                  name: `${name} (Copy)`,
                  type: period.type,
                  options: period.options,
                },
                ...periods.slice(idx + 1),
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
              setPeriods(
                periods.map((p, i) => {
                  if (i === idx) {
                    return periods[idx - 1];
                  }
                  if (i === idx - 1) {
                    return periods[idx];
                  }
                  return p;
                }) as Period[],
              );
            }}
            variant="ghost"
            size="icon"
          >
            <ArrowUp />
          </Button>
          <Button
            onClick={() => {
              if (idx === periods.length - 1) return;
              setPeriods(
                periods.map((p, i) => {
                  if (i === idx) {
                    return periods[i + 1];
                  }
                  if (i === idx + 1) {
                    return periods[i - 1];
                  }
                  return p;
                }) as Period[],
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
          >
            <GripVertical />
          </Button>
        </div>
        <Label>
          Name
          <Input
            name={`periods[${idx}].name`}
            defaultValue={period.name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Label>
        <Label>
          Type
          <input
            type="hidden"
            name={`periods[${idx}].type`}
            value={period.type}
          />
          <Select
            defaultValue={period.type}
            onValueChange={(val) => {
              setPeriods(
                periods.map((p, i) => {
                  if (i === idx) {
                    return { ...p, type: val };
                  }
                  return p;
                }),
              );
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a period type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="single-select">Single-Select</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Label>
        {period.type === "single-select" && (
          <div className="mt-4 flex flex-col gap-2">
            {period.options.map((option, subIdx) => (
              <Label key={subIdx}>
                Option {subIdx + 1}
                <div className="flex gap-2">
                  <Input
                    name={`periods[${idx}].options[${subIdx}]`}
                    defaultValue={option}
                    className="flex-1"
                    onChange={(e) =>
                      setPeriods(
                        periods.map((p, i) => {
                          if (i === idx) {
                            return {
                              ...p,
                              options: p.options.map((s, j) =>
                                j === subIdx ? e.target.value : s,
                              ),
                            };
                          }
                          return p;
                        }),
                      )
                    }
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setPeriods(
                        periods.map((p, i) => {
                          if (i === idx) {
                            return {
                              ...p,
                              options: p.options.filter((_, j) => j !== subIdx),
                            };
                          }
                          return p;
                        }),
                      );
                    }}
                  >
                    <CircleSlash />
                  </Button>
                </div>
              </Label>
            ))}
            <Button
              onClick={() => {
                setPeriods(
                  periods.map((p, i) => {
                    if (i === idx) {
                      return { ...p, options: [...p.options, ""] };
                    }
                    return p;
                  }),
                );
              }}
              variant="secondary"
            >
              <Plus />
              New Option
            </Button>
          </div>
        )}
      </div>
    </Reorder.Item>
  );
}
