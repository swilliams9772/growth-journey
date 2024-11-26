import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useWellbeingStore } from '../../stores/wellbeingStore';
import { format, startOfWeek, addDays } from 'date-fns';

export function HabitTracker() {
  const { habits, addHabit, toggleHabitCompletion } = useWellbeingStore();
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ title: '', frequency: 'daily' as const });

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.title.trim()) {
      addHabit(newHabit);
      setNewHabit({ title: '', frequency: 'daily' });
      setShowAddHabit(false);
    }
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(new Date()), i);
    return format(date, 'yyyy-MM-dd');
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Habit Tracker</h2>
        <button
          onClick={() => setShowAddHabit(true)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Habit
        </button>
      </div>

      {showAddHabit && (
        <form onSubmit={handleAddHabit} className="mb-6 space-y-4">
          <div>
            <input
              type="text"
              value={newHabit.title}
              onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
              placeholder="New habit..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddHabit(false)}
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-900">{habit.title}</h3>
              <span className="text-sm text-gray-500">{habit.frequency}</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((date) => (
                <button
                  key={date}
                  onClick={() => toggleHabitCompletion(habit.id, date)}
                  className={`p-2 rounded-md flex items-center justify-center ${
                    habit.completedDates.includes(date)
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {habit.completedDates.includes(date) && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 