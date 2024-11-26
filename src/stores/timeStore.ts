import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TimeBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: 'focus' | 'meeting' | 'break' | 'other';
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: string;
}

interface TimeStore {
  timeBlocks: TimeBlock[];
  tasks: Task[];
  addTimeBlock: (block: Omit<TimeBlock, 'id'>) => void;
  updateTimeBlock: (id: string, block: Partial<TimeBlock>) => void;
  deleteTimeBlock: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
}

export const useTimeStore = create<TimeStore>()(
  persist(
    (set) => ({
      timeBlocks: [],
      tasks: [],
      addTimeBlock: (block) =>
        set((state) => ({
          timeBlocks: [...state.timeBlocks, { ...block, id: crypto.randomUUID() }],
        })),
      updateTimeBlock: (id, block) =>
        set((state) => ({
          timeBlocks: state.timeBlocks.map((b) =>
            b.id === id ? { ...b, ...block } : b
          ),
        })),
      deleteTimeBlock: (id) =>
        set((state) => ({
          timeBlocks: state.timeBlocks.filter((b) => b.id !== id),
        })),
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
        })),
      updateTask: (id, task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      toggleTaskComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
    }),
    {
      name: 'time-store',
    }
  )
); 