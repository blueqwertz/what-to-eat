import * as React from "react";
import { api } from "~/utils/api";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import IngredientCombo from "./ingredientcombo";
import { unitMap } from "~/utils/enumMaps";

type IngredientPopoverType = {
  id: string;
  count: number;
};

function IngredientPopover({ id, count }: IngredientPopoverType) {
  const { data: ingredientsInMeal, isLoading } =
    api.meals.getIngredients.useQuery({
      data: { id },
    });

  if (isLoading) {
    return (
      <Button className="h-8 w-8 p-0" variant={"outline"}>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="h-8 w-8 p-0" variant={"outline"}>
          {count < 10 ? count : "9+"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="min-w-fit">
        <Table className="overflow-hidden rounded-lg">
          <TableCaption>Zutaten für dieses Gericht.</TableCaption>
          <TableBody>
            {ingredientsInMeal?.map((entry) => {
              return (
                <TableRow key={entry.ingredient.id}>
                  <TableCell className="py-3 font-medium">
                    {entry.ingredient.name}
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    {entry.count} {unitMap[entry.unit]}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell className="py-3 font-medium">
                <IngredientCombo filter={ingredientsInMeal} />
              </TableCell>
              <TableCell className="flex gap-1 py-3 text-right">
                <Input />
                <Select>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="g" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GRAMM">g</SelectItem>
                    <SelectItem value="MILLILITER">ml</SelectItem>
                    <SelectItem value="SPOONS">Lö.</SelectItem>
                    <SelectItem value="PIECES">St.</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
}

export default IngredientPopover;
