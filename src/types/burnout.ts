export interface BurnoutMetric {
  id: string;
  label: string;
  value: number;
  icon: string; // We'll store icon name as string since we can't serialize icon components
  color: string;
  lastUpdated: Date;
}

export interface DailyLog {
  id: string;
  date: Date;
  notes: string;
  metrics: Record<string, number>; // Maps metric ids to their values
} 