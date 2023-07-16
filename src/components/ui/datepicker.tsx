import * as React from "react";
import "@/utils/delocale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { de } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";

type DatePickerProps = {
  defaultDate?: Date;
  className?: string;
};

export function DatePicker({ defaultDate, className }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultDate ?? new Date()
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[250px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            dayjs(date).format("DD. MMMM YYYY")
          ) : (
            <span>Datum wählen</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={de}
        />
      </PopoverContent>
    </Popover>
  );
}
