import { GoalType } from "@/data/firebase/goals/firebase-goals-repository";
import Goal from "@/domain/models/farm/goals/Goal";
import Goals from "@/domain/models/farm/goals/Goals";
import Production from "@/domain/models/farm/production/Production";
import SalesItem from "@/domain/models/farm/sales/SalesItem";
import { getUserUseCaseImpl } from "@/domain/useCases/farm/GetUserUseCaseImpl";
import { addGoalUseCaseImpl } from "@/domain/useCases/farm/goals/AddGoalUseCaseImpl";
import { addProductionUseCaseImpl } from "@/domain/useCases/farm/production/AddProductionUseCaseImpls";
import { addSalesItemUseCaseImpl } from "@/domain/useCases/farm/sales/AddSalesItemUseCaseImpl";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContex";

const getUserUseCase = getUserUseCaseImpl;
const addProductionUseCase = addProductionUseCaseImpl;
const addSalesItemUseCase = addSalesItemUseCaseImpl;
const addGoalUseCase = addGoalUseCaseImpl;

const emptyGoals: Goals = { productionGoals: [], salesGoals: [] };

interface IUserContext {
  productionList: Production[];
  salesList: SalesItem[];
  goals: Goals;
  fetchUserData: () => void;
  addProduction: (production: Production) => Promise<boolean>;
  addSalesItem: (salesItem: SalesItem) => Promise<boolean>;
  addGoal: (goal: Goal, goalType: "production" | "sales") => Promise<boolean>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { UID } = useAuth();
  const [productionList, setProductionList] = useState<Production[]>([]);
  const [salesList, setSalesList] = useState<SalesItem[]>([]);
  const [goals, setGoals] = useState<Goals>(emptyGoals);

  const fetchUserData = async () => {
    try {
      const userData = await getUserUseCase.execute(UID);
      if (userData) {
        setProductionList(userData.production || []);
        setSalesList(userData.sales || []);
        setGoals(userData.goals || emptyGoals);
        console.log(
          "User data fetched successfully production:",
          userData.production
        );
        console.log("User data fetched successfully sales:", userData.sales);
        console.log("User data fetched successfully goals:", userData.goals);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  const addProduction = async (production: Production) => {
    try {
      const result = await addProductionUseCase.execute(UID, production);
      if (result) {
        // Reload user data to ensure consistency with backend
        await fetchUserData();
      }
      return result;
    } catch (error) {
      console.error("Failed to add production:", error);
      return false;
    }
  };
  const addSalesItem = async (salesItem: SalesItem) => {
    try {
      const result = await addSalesItemUseCase.execute(UID, salesItem);
      if (result) {
        // Reload user data to ensure consistency with backend
        await fetchUserData();
      }
      return result;
    } catch (error) {
      console.error("Failed to add sales item:", error);
      return false;
    }
  };

  const addGoal = async (goal: Goal, goalType: "production" | "sales") => {
    try {
      // Convert goalType to GoalType enum
      const goalTypeEnum =
        goalType === "production" ? GoalType.production : GoalType.sales;

      const result = await addGoalUseCase.execute(UID, goal, goalTypeEnum);
      if (result) {
        // Reload user data to ensure consistency with backend
        await fetchUserData();
      }
      return result;
    } catch (error) {
      console.error("Failed to add goal:", error);
      return false;
    }
  };

  const contextValue: IUserContext = {
    productionList,
    salesList,
    goals,
    addProduction,
    addSalesItem,
    addGoal,
    fetchUserData,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
