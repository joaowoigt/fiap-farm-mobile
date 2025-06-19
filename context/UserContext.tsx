import Goals from "@/domain/models/farm/goals/Goals";
import Production from "@/domain/models/farm/production/Production";
import SalesItem from "@/domain/models/farm/sales/SalesItem";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContex";
import { getUserUseCaseImpl } from "@/domain/useCases/farm/GetUserUseCaseImpl";
const getUserUseCase = getUserUseCaseImpl;

const emptyGoals: Goals = { productionGoals: [], salesGoals: [] };

interface IUserContext {
  productionList: Production[];
  salesList: SalesItem[];
  goals: Goals;
  fetchUserData?: () => void;
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

  const contextValue: IUserContext = {
    productionList,
    salesList,
    goals,
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
