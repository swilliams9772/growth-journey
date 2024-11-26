import { useState } from 'react';
import { Clock, List, Calendar, PieChart, Plus, Check, Trash2 } from 'lucide-react';
import { useTimeStore } from '../stores/timeStore';
import { TimeBlockForm } from '../components/time/TimeBlockForm';

export function TimePage() {
  const [showTimeBlockForm, setShowTimeBlockForm] = useState(false);
  const { timeBlocks, tasks, toggleTaskComplete, deleteTask, addTask } = useTimeStore();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask({
        title: newTask,
        priority: 'medium',
        completed: false,
      });
      setNewTask('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Time Management</h1>
        <p className="mt-2 text-gray-600">Optimize your time and increase productivity</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Time Blocks Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Daily Schedule</h2>
            <button
              onClick={() => setShowTimeBlockForm(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add Block
            </button>
          </div>
          
          <div className="space-y-3">
            {timeBlocks.map((block) => (
              <div
                key={block.id}
                className={`p-3 rounded-lg border ${
                  block.completed ? 'bg-gray-50 border-gray-200' : 'border-indigo-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{block.title}</h3>
                    <p className="text-sm text-gray-600">
                      {block.startTime} - {block.endTime}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    block.category === 'focus' ? 'bg-blue-100 text-blue-800' :
                    block.category === 'meeting' ? 'bg-purple-100 text-purple-800' :
                    block.category === 'break' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {block.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tasks</h2>
          
          <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
          </form>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  task.completed ? 'bg-gray-50 border-gray-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className={`h-5 w-5 rounded border ${
                      task.completed
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-gray-300'
                    } flex items-center justify-center`}
                  >
                    {task.completed && <Check className="h-4 w-4" />}
                  </button>
                  <span className={task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}>
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showTimeBlockForm && (
        <TimeBlockForm onClose={() => setShowTimeBlockForm(false)} />
      )}
    </div>
  );
} 