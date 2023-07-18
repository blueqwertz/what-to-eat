import { TimeOfDay } from "@prisma/client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type MealProviderProps = {
  children: ReactNode;
};

type MealProps = {
  meal: {
    mealId: string | undefined;
    date: Date | undefined;
    timeOfDay: TimeOfDay | undefined;
  };
  setMeal: Dispatch<
    SetStateAction<{
      mealId: string | undefined;
      date: Date | undefined;
      timeOfDay: TimeOfDay | undefined;
    }>
  >;
};

export const MealContext = createContext({} as MealProps);

export function MealContextProvider({ children }: MealProviderProps) {
  const [meal, setMeal] = useState<{
    mealId: string | undefined;
    date: Date | undefined;
    timeOfDay: TimeOfDay | undefined;
  }>({
    mealId: undefined,
    date: new Date(),
    timeOfDay: undefined,
  });

  return (
    <MealContext.Provider value={{ meal, setMeal }}>
      {children}
    </MealContext.Provider>
  );
}
