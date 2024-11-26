import { useState } from 'react';
import { X } from 'lucide-react';
import { useBurnoutStore } from '../../stores/burnoutStore';

interface DailyLogFormProps {
  onClose: () => void;
}

export function DailyLogForm({ onClose }: DailyLogFormProps) {
  const { metrics, addDailyLog } = useBurnoutStore();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: '',
    metrics: Object.fromEntries(
      metrics.map(metric => [metric.id, metric.value])
    ),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDailyLog({
      date: new Date(formData.date),
      notes: formData.notes,
      metrics: formData.metrics,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Daily Log Entry</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {metrics.map((metric) => (
            <div key={metric.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {metric.label}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.metrics[metric.id]}
                onChange={(e) => 
                  setFormData({
                    ...formData,
                    metrics: {
                      ...formData.metrics,
                      [metric.id]: Number(e.target.value),
                    },
                  })
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0</span>
                <span>{formData.metrics[metric.id]}%</span>
                <span>100</span>
              </div>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="How are you feeling today?"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 