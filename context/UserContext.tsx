import Goals from "@/domain/models/farm/goals/Goals";
import Production from "@/domain/models/farm/production/Production";
import SalesItem from "@/domain/models/farm/sales/SalesItem";
import { getUserUseCaseImpl } from "@/domain/useCases/farm/GetUserUseCaseImpl";
import { addProductionUseCaseImpl } from "@/domain/useCases/farm/production/AddProductionUseCaseImpls";
import { addSalesItemUseCaseImpl } from "@/domain/useCases/farm/sales/AddSalesItemUseCaseImpl";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContex";

const getUserUseCase = getUserUseCaseImpl;
const addProductionUseCase = addProductionUseCaseImpl;
const addSalesItemUseCase = addSalesItemUseCaseImpl;

const emptyGoals: Goals = { productionGoals: [], salesGoals: [] };

interface IUserContext {
  productionList: Production[];
  salesList: SalesItem[];
  goals: Goals;
  fetchUserData: () => void;
  addProduction: (production: Production) => Promise<boolean>;
  addSalesItem: (salesItem: SalesItem) => Promise<boolean>;
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
        setProductionList((prev) => [...prev, production]);
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
        setSalesList((prev) => {
          // Procura por um item existente com o mesmo produto (nome e tipo)
          const existingItemIndex = prev.findIndex(
            (item) =>
              item.product.name === salesItem.product.name &&
              item.product.type === salesItem.product.type
          );

          if (existingItemIndex !== -1) {
            // Se existe um item com o mesmo produto, atualiza a quantidade e o income
            const updatedList = [...prev];
            const existingItem = updatedList[existingItemIndex];

            // Calcula nova quantidade
            const newQuantity = existingItem.quantity + salesItem.quantity;

            // Calcula novo income baseado no valor unitário atual do produto
            const newIncome = salesItem.product.unitValue * newQuantity;

            // Atualiza o item existente
            updatedList[existingItemIndex] = {
              ...existingItem,
              quantity: newQuantity,
              income: newIncome,
              product: {
                ...existingItem.product,
                // Mantém o valor unitário atualizado
                unitValue: salesItem.product.unitValue,
              },
            };

            console.log(
              `Updated existing sales item: ${salesItem.product.name}, New quantity: ${newQuantity}, New income: ${newIncome}`
            );
            return updatedList;
          } else {
            // Se não existe, adiciona um novo item
            console.log(
              `Added new sales item: ${salesItem.product.name}, Quantity: ${salesItem.quantity}, Income: ${salesItem.income}`
            );
            return [...prev, salesItem];
          }
        });
      }
      return result;
    } catch (error) {
      console.error("Failed to add sales item:", error);
      return false;
    }
  };
  const contextValue: IUserContext = {
    productionList,
    salesList,
    goals,
    addProduction,
    addSalesItem,
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
