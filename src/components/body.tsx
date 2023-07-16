import * as React from "react";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";
import HistoryTable from "./historytable/historytable";
import MealTable from "./mealtable/mealtable";

function Body() {
  return (
    <div className="w-full py-1">
      <div className="space-y-6 py-4">
        {/* <Badge variant={"secondary"} className="rounded-sm">
          🎉
          <span className="ml-2 mr-2">Neue Features</span>
          <ArrowRight className="h-3 w-3" />
        </Badge> */}
        <div className="flex flex-wrap gap-6">
          {/* HISTORY */}
          <div className="flex-1 space-y-3">
            <h1 className="text-2xl font-semibold">Historie</h1>
            <HistoryTable />
          </div>
          {/* MEALS */}
          <div className="flex-1 space-y-3">
            <h1 className="text-2xl font-semibold">Essen</h1>
            <MealTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
