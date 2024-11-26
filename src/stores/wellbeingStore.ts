import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WellnessMetric {
  id: string;
  category: 'physical' | 'mental' | 'emotional' | 'energy';
  value: number;
  date: string;
}

export interface Habit {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  completedDates: string[];
}

export interface MoodEntry {
  id: string;
  mood: 'great' | 'good' | 'okay' | 'low' | 'bad';
  notes: string;
  date: string;
}

interface WellbeingStore {
  metrics: WellnessMetric[];
  habits: Habit[];
  moodEntries: MoodEntry[];
  addMetric: (metric: Omit<WellnessMetric, 'id'>) => void;
  updateMetric: (id: string, value: number) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'completedDates'>) => void;
  toggleHabitCompletion: (id: string, date: string) => void;
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  getMetricHistory: (category: WellnessMetric['category'], days: number) => WellnessMetric[];
}

export const useWellbeingStore = create<WellbeingStore>()(
  persist(
    (set, get) => ({
      metrics: [],
      habits: [],
      moodEntries: [],
      
      addMetric: (metric) =>
        set((state) => ({
          metrics: [...state.metrics, { ...metric, id: crypto.randomUUID() }],
        })),
        
      updateMetric: (id, value) =>
        set((state) => ({
          metrics: state.metrics.map((m) =>
            m.id === id ? { ...m, value } : m
          ),
        })),
        
      addHabit: (habit) =>
        set((state) => ({
          habits: [...state.habits, { ...habit, id: crypto.randomUUID(), completedDates: [] }],
        })),
        
      toggleHabitCompletion: (id, date) =>
        set((state) => ({
          habits: state.habits.map((h) => {
            if (h.id !== id) return h;
            const completedDates = h.completedDates.includes(date)
              ? h.completedDates.filter((d) => d !== date)
              : [...h.completedDates, date];
            return { ...h, completedDates };
          }),
        })),
        
      addMoodEntry: (entry) =>
        set((state) => ({
          moodEntries: [...state.moodEntries, { ...entry, id: crypto.randomUUID() }],
        })),
        
      getMetricHistory: (category, days) => {
        const metrics = get().metrics;
        const now = new Date();
        const cutoff = new Date(now.setDate(now.getDate() - days));
        return metrics.filter(
          (m) => m.category === category && new Date(m.date) >= cutoff
        );
      },
    }),
    {
      name: 'wellbeing-store',
    }
  )
); 