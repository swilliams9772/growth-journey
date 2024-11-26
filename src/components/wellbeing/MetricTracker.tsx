import { useState } from 'react';
import { Heart, Brain, Sun, Activity } from 'lucide-react';
import { useWellbeingStore, WellnessMetric } from '../../stores/wellbeingStore';

const metricConfig = {
  physical: {
    icon: Heart,
    color: 'red',
    label: 'Physical Health',
  },
  mental: {
    icon: Brain,
    color: 'blue',
    label: 'Mental Health',
  },
  emotional: {
    icon: Sun,
    color: 'yellow',
    label: 'Emotional Balance',
  },
  energy: {
    icon: Activity,
    color: 'green',
    label: 'Energy Level',
  },
};

export function MetricTracker() {
  const { metrics, addMetric } = useWellbeingStore();
  const [activeMetric, setActiveMetric] = useState<WellnessMetric['category']>('physical');

  const handleMetricUpdate = (value: number) => {
    addMetric({
      category: activeMetric,
      value,
      date: new Date().toISOString(),
    });
  };

  const getLatestMetric = (category: WellnessMetric['category']) => {
    const categoryMetrics = metrics.filter((m) => m.category === category);
    return categoryMetrics[categoryMetrics.length - 1]?.value || 0;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Wellness Metrics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {(Object.keys(metricConfig) as Array<keyof typeof metricConfig>).map((category) => {
          const { icon: Icon, color, label } = metricConfig[category];
          const value = getLatestMetric(category);
          
          return (
            <button
              key={category}
              onClick={() => setActiveMetric(category)}
              className={`p-4 rounded-lg border transition-colors ${
                activeMetric === category
                  ? `border-${color}-500 bg-${color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`h-5 w-5 text-${color}-500`} />
                <span className="font-medium text-gray-900">{label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}%</div>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Update {metricConfig[activeMetric].label}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          defaultValue={getLatestMetric(activeMetric)}
          onChange={(e) => handleMetricUpdate(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
} 