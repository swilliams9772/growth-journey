import { useState } from 'react';
import { Smile, Frown, Meh, Plus, Calendar } from 'lucide-react';
import { useWellbeingStore, MoodEntry } from '../../stores/wellbeingStore';
import { format } from 'date-fns';

const moodConfig = {
  great: {
    icon: Smile,
    color: 'green',
    label: 'Great',
  },
  good: {
    icon: Smile,
    color: 'blue',
    label: 'Good',
  },
  okay: {
    icon: Meh,
    color: 'yellow',
    label: 'Okay',
  },
  low: {
    icon: Meh,
    color: 'orange',
    label: 'Low',
  },
  bad: {
    icon: Frown,
    color: 'red',
    label: 'Bad',
  },
};

export function MoodJournal() {
  const { moodEntries, addMoodEntry } = useWellbeingStore();
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<MoodEntry, 'id'>>({
    mood: 'okay',
    notes: '',
    date: new Date().toISOString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodEntry(newEntry);
    setShowForm(false);
    setNewEntry({
      mood: 'okay',
      notes: '',
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Mood Journal</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="h-4 w-4" />
          New Entry
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div className="grid grid-cols-5 gap-2">
            {(Object.entries(moodConfig) as [MoodEntry['mood'], typeof moodConfig[keyof typeof moodConfig]][]).map(
              ([mood, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setNewEntry({ ...newEntry, mood })}
                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 ${
                      newEntry.mood === mood
                        ? `border-${config.color}-500 bg-${config.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`h-6 w-6 text-${config.color}-500`} />
                    <span className="text-sm font-medium text-gray-900">
                      {config.label}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={newEntry.notes}
              onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="How are you feeling today?"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save Entry
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {moodEntries
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
          .map((entry) => {
            const { icon: Icon, color } = moodConfig[entry.mood];
            return (
              <div key={entry.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`h-5 w-5 text-${color}-500`} />
                  <span className="font-medium text-gray-900">
                    {moodConfig[entry.mood].label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(entry.date), 'MMM d, yyyy')}
                  </span>
                </div>
                {entry.notes && (
                  <p className="text-gray-600 text-sm">{entry.notes}</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
} 