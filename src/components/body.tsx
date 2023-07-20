import * as React from "react";
import HistoryTable from "./historytable/history-table";
import MealTable from "./mealtable/meal-table";
import AddHistory from "./historytable/addhistory/add-history";
import AddMeal from "./mealtable/add-meal";
import IngredientTable from "./ingredienttable/ingredient-table";
import AddIngredient from "./ingredienttable/add-ingredient";
import MealSearch from "./mealsearch/meal-search";

function Body() {
  return (
    <div className="w-full py-1">
      <div className="space-y-6 py-4">
        {/* <Badge variant={"secondary"} className="rounded-sm">
          🎉
          <span className="ml-2 mr-2">Neue Features</span>
          <ArrowRight className="h-3 w-3" />
        </Badge> */}
        {/* SEARCH */}
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">Empfehlung</h1>
          <MealSearch />
        </div>
        <AddHistory />
        <div className="flex flex-col flex-wrap gap-9 lg:flex-row">
          {/* HISTORY */}
          <div className="flex-1 basis-full space-y-3">
            <h1 className="text-lg font-semibold">Historie</h1>
            <HistoryTable />
          </div>
          {/* MEALS */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold">Gerichte</h1>
              <AddMeal />
            </div>
            <MealTable />
          </div>
          {/* INGREDIENTS */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold">Zutaten</h1>
              <AddIngredient />
            </div>
            <IngredientTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
