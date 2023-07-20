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
  value: { value: string | undefined; label: string | undefined }[];
  setValue: (value: string | undefined, label: string | undefined) => void;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
};

export function ComboboxMulti({
  options,
  placeholder,
  value,
  setValue,
  className,
}: ComboboxInput) {
  const [input, setInput] = React.useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[160px] justify-between px-3 font-normal",
            !value.length && "text-muted-foreground",
            className
          )}
        >
          <span className="w-full truncate text-start">
            {value.length
              ? value.map((entry) => entry.label).join(", ")
              : "Zutaten wählen..."}
          </span>
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
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  const { value, label } =
                    options.find((entry) => {
                      return entry.value == option.value;
                    }) ?? {};
                  setValue(value, label);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.find((entry) => entry.value == option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
