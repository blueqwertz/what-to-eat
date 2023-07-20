import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./separator";

type ComboboxInput = {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
};

export function Combobox({
  options,
  placeholder,
  value,
  setValue,
  className,
}: ComboboxInput) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[160px] justify-between px-3 font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          {value
            ? options.find((framework) => framework.value === value)?.label
            : `${placeholder ?? "Item"} wählen`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="start">
        <Command value={input} onValueChange={setInput}>
          <CommandInput placeholder={`${placeholder ?? "Item"} suchen`} />
          <CommandEmpty>
            {`Keine ${placeholder ?? "Items"} gefunden.`}
          </CommandEmpty>
          <CommandGroup className="max-h-[250px] overflow-y-scroll">
            {options.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={() => {
                  setValue(
                    framework.value === value ? undefined : framework.value
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
