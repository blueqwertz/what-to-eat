import "@/utils/delocale";
import { MealContextProvider } from "~/context/MealContext";
import MealCombo from "./add-history-combo";
import MealDate from "./add-history-date";
import MealTime from "./add-history-time";
import MealButton from "./add-history-button";
import { Badge } from "~/components/ui/badge";

function AddHistory() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium">Was gab&apos;s zu essen?</span>
        <Badge variant={"outline"} className="text-xs text-muted-foreground">
          Hier eintragen!
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

export default AddHistory;
