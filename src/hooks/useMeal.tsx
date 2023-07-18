import { useContext } from "react";
import { MealContext } from "~/context/MealContext";

const useMeal = () => {
  return useContext(MealContext);
};

export default useMeal;
