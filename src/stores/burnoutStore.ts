import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BurnoutMetric, DailyLog } from '../types/burnout';

interface BurnoutStore {
  metrics: BurnoutMetric[];
  dailyLogs: DailyLog[];
  updateMetric: (id: string, value: number) => void;
  addDailyLog: (log: Omit<DailyLog, 'id'>) => void;
  getAverageMetric: (id: string, days: number) => number;
  getTrend: (id: string, days: number) => 'improving' | 'declining' | 'stable';
}

export const useBurnoutStore = create<BurnoutStore>()(
  persist(
    (set, get) => ({
      metrics: [
        {
          id: 'mental',
          label: 'Mental Energy',
          value: 75,
          icon: 'Brain',
          color: 'indigo',
          lastUpdated: new Date(),
        },
        {
          id: 'physical',
          label: 'Physical Energy',
          value: 65,
          icon: 'Activity',
          color: 'green',
          lastUpdated: new Date(),
        },
        {
          id: 'emotional',
          label: 'Emotional Balance',
          value: 80,
          icon: 'Sun',
          color: 'yellow',
          lastUpdated: new Date(),
        },
        {
          id: 'recovery',
          label: 'Recovery Status',
          value: 70,
          icon: 'Battery',
          color: 'blue',
          lastUpdated: new Date(),
        },
      ],
      dailyLogs: [],

      updateMetric: (id: string, value: number) =>
        set((state) => ({
          metrics: state.metrics.map((metric) =>
            metric.id === id
              ? { ...metric, value, lastUpdated: new Date() }
              : metric
          ),
        })),

      addDailyLog: (log) =>
        set((state) => ({
          dailyLogs: [
            ...state.dailyLogs,
            { ...log, id: crypto.randomUUID() },
          ],
        })),

      getAverageMetric: (id: string, days: number) => {
        const state = get();
        const now = new Date();
        const cutoff = new Date(now.setDate(now.getDate() - days));

        const relevantLogs = state.dailyLogs.filter(
          (log) => new Date(log.date) >= cutoff
        );

        if (relevantLogs.length === 0) return 0;

        const sum = relevantLogs.reduce(
          (acc, log) => acc + (log.metrics[id] || 0),
          0
        );
        return sum / relevantLogs.length;
      },

      getTrend: (id: string, days: number) => {
        const state = get();
        const now = new Date();
        const cutoff = new Date(now.setDate(now.getDate() - days));

        const relevantLogs = state.dailyLogs
          .filter((log) => new Date(log.date) >= cutoff)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (relevantLogs.length < 2) return 'stable';

        const firstValue = relevantLogs[0].metrics[id] || 0;
        const lastValue =
          relevantLogs[relevantLogs.length - 1].metrics[id] || 0;
        const difference = lastValue - firstValue;

        if (difference > 5) return 'improving';
        if (difference < -5) return 'declining';
        return 'stable';
      },
    }),
    {
      name: 'burnout-store',
    }
  )
); 