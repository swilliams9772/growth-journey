import { Goal } from '../../types/goal';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
}

const categoryColors = {
  stem: 'bg-purple-100 text-purple-800',
  community: 'bg-green-100 text-green-800',
  leadership: 'bg-blue-100 text-blue-800',
  personal: 'bg-orange-100 text-orange-800',
};

export function GoalCard({ goal, onEdit }: GoalCardProps) {
  const completedMilestones = goal.milestones.filter((m) => m.completed).length;
  const progress = (completedMilestones / goal.milestones.length) * 100;

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
      onClick={() => onEdit(goal)}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[goal.category]}`}>
          {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
        </span>
        <StatusIcon status={goal.status} />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{goal.description}</p>
      
      {goal.deadline && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span>{new Date(goal.deadline).toLocaleDateString()}</span>
        </div>
      )}

      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{completedMilestones}/{goal.milestones.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: Goal['status'] }) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'in-progress':
      return <Circle className="w-5 h-5 text-blue-500" />;
    default:
      return <Circle className="w-5 h-5 text-gray-400" />;
  }
}