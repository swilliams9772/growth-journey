export type GoalStatus = 'not-started' | 'in-progress' | 'completed';

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline?: Date;
  status: GoalStatus;
  milestones: Milestone[];
  category: 'stem' | 'community' | 'leadership' | 'personal';
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}