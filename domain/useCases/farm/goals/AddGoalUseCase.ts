import { GoalType } from "@/data/firebase/goals/firebase-goals-repository";
import Goal from "../../../models/farm/goals/Goal";

export interface AddGoalUseCase {
  execute: (userId: string, newGoal: Goal, type: GoalType) => Promise<boolean>;
}
