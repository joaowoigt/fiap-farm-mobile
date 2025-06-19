import { GoalType } from "@/data/firebase/goals/firebase-goals-repository";
import Goal from "../models/farm/goals/Goal";

export interface GoalsRepository {
  addGoalToUser(
    userId: string,
    newGoal: Goal,
    goalType: GoalType
  ): Promise<boolean>;
}
