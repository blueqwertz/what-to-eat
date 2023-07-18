"use client";

import * as React from "react";
import "@/utils/delocale";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { api } from "~/utils/api";

type DatePickerProps = {
  defaultDate?: Date;
  id: string;
};

export function DateChanger({ defaultDate, id }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultDate ?? new Date()
  );

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  const ctx = api.useContext();

  const { mutate: updateEntry } = api.history.updateEntry.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
    },
    onSuccess: () => {
      ctx.history.getAll.invalidate();
      setLoading(false);
      setChecked(true);
      setTimeout(() => {
        setChecked(false);
      }, 800);
    },
  });

  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex h-8 w-8 items-center justify-center border p-0 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
            ) : checked ? (
              <Check className="h-4 w-4 text-lime-500" />
            ) : (
              <CalendarIcon className="h-4 w-4" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="mx-3 w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => {
              setDate(day ?? new Date());
              updateEntry({
                data: {
                  id,
                  date: day,
                },
              });
            }}
            initialFocus
            locale={de}
          />
        </PopoverContent>
      </Popover>
      <span className="w-[150px]">
        {date ? dayjs(date).format("dd, DD. MMMM") : <span>Datum wählen</span>}
      </span>
    </div>
  );
}
