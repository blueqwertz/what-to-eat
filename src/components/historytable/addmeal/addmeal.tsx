import "@/utils/delocale";
import { MealContextProvider } from "~/context/MealContext";
import MealCombo from "./mealcombo";
import MealDate from "./mealdate";
import MealTime from "./mealtime";
import MealButton from "./mealbutton";
import { Badge } from "~/components/ui/badge";

function AddMeal() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium">Was gab's zu essen?</span>
        <Badge variant={"outline"} className="text-xs text-muted-foreground">
          Gleich eintragen!
        </Badge>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 rounded-md border px-2 py-2 text-sm">
        <MealContextProvider>
          <MealCombo />
          <MealDate />
          <MealTime />
          <MealButton />
        </MealContextProvider>
      </div>
    </div>
  );
}

export default AddMeal;
