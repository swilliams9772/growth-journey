import { useState } from 'react';
import { X } from 'lucide-react';
import { TimeBlock, useTimeStore } from '../../stores/timeStore';

interface TimeBlockFormProps {
  onClose: () => void;
  initialBlock?: TimeBlock;
}

export function TimeBlockForm({ onClose, initialBlock }: TimeBlockFormProps) {
  const addTimeBlock = useTimeStore((state) => state.addTimeBlock);
  const updateTimeBlock = useTimeStore((state) => state.updateTimeBlock);

  const [formData, setFormData] = useState({
    title: initialBlock?.title || '',
    startTime: initialBlock?.startTime || '',
    endTime: initialBlock?.endTime || '',
    category: initialBlock?.category || 'focus',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialBlock) {
      updateTimeBlock(initialBlock.id, formData);
    } else {
      addTimeBlock({ ...formData, completed: false } as TimeBlock);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialBlock ? 'Edit Time Block' : 'New Time Block'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as TimeBlock['category'] })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="focus">Focus Time</option>
              <option value="meeting">Meeting</option>
              <option value="break">Break</option>
              <option value="other">Other</option>
            </select>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 