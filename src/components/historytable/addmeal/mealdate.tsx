import * as React from "react";

import { DatePicker } from "../../ui/datepicker";
import useMeal from "~/hooks/useMeal";
import { checkIsOnDemandRevalidate } from "next/dist/server/api-utils";

function MealDate() {
  const { meal, setMeal } = useMeal();
  return (
    <DatePicker
      date={meal.date}
      setDate={(value) => {
        setMeal((prev) => {
          return {
            ...prev,
            date: value ?? new Date(),
          };
        });
      }}
      className="w-auto flex-1"
    />
  );
}

export default MealDate;
