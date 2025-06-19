import Production from "../../../domain/models/farm/production/Production";
import { ProductionRepository } from "../../../domain/repositories/production-repository";
import { doc, Firestore, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../clientApp";
import Goal from "../../../domain/models/farm/goals/Goal";

export class FirebaseProductionRepository implements ProductionRepository {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async addProductionToUser(
    userId: string,
    production: Production
  ): Promise<boolean> {
    try {
      const userDocRef = doc(this.db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.error("User document does not exist");
        return false;
      }

      const userData = userDocSnap.data();
      if (!userData.production) {
        userData.production = [];
      }

      const goalsIndex = userData.goals?.productionGoals.findIndex(
        (goal: Goal) => goal.type === production.product.type
      );
      if (goalsIndex !== -1 && production.status === "done") {
        userData.goals.productionGoals[goalsIndex].current =
          parseInt(userData.goals.productionGoals[goalsIndex].current) +
          production.quantity;
      }

      userData.production.push(production);
      await setDoc(userDocRef, userData, { merge: true });
      return true;
    } catch (error) {
      console.error("Error adding production to user:", error);
      return false;
    }
  }
}

export const firebaseProductionRepository = new FirebaseProductionRepository(
  db
);
