import * as React from "react";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";
import HistoryTable from "./historytable/historytable";
import MealTable from "./mealtable/mealtable";
import AddMeal from "./historytable/addmeal/addmeal";

function Body() {
  return (
    <div className="w-full py-1">
      <div className="space-y-6 py-4">
        {/* <Badge variant={"secondary"} className="rounded-sm">
          🎉
          <span className="ml-2 mr-2">Neue Features</span>
          <ArrowRight className="h-3 w-3" />
        </Badge> */}
        <AddMeal />
        <div className="flex flex-col flex-wrap gap-9 lg:flex-row">
          {/* HISTORY */}
          <div className="flex-1 space-y-3">
            <h1 className="text-lg font-semibold">Historie</h1>
            <HistoryTable />
          </div>
          {/* MEALS */}
          <div className="flex-1 space-y-3">
            <h1 className="text-lg font-semibold">Gerichte</h1>
            <MealTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
