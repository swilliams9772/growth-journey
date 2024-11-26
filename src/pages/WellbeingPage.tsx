import { MetricTracker } from '../components/wellbeing/MetricTracker';
import { HabitTracker } from '../components/wellbeing/HabitTracker';
import { MoodJournal } from '../components/wellbeing/MoodJournal';

export function WellbeingPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Well-being Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor and improve your overall well-being</p>
      </header>

      <div className="space-y-6">
        <MetricTracker />
        <div className="grid md:grid-cols-2 gap-6">
          <HabitTracker />
          <MoodJournal />
        </div>
      </div>
    </div>
  );
} 