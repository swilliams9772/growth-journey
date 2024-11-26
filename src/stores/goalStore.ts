import { create } from 'zustand';
import { Goal } from '../types/goal';

interface GoalStore {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, { ...goal, id: crypto.randomUUID() }],
    })),
  updateGoal: (id, updatedGoal) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedGoal } : goal
      ),
    })),
  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
    })),
  toggleMilestone: (goalId, milestoneId) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              milestones: goal.milestones.map((milestone) =>
                milestone.id === milestoneId
                  ? { ...milestone, completed: !milestone.completed }
                  : milestone
              ),
            }
          : goal
      ),
    })),
}));