import { useState } from 'react';
import { Brain, Battery, Activity, Coffee, Sun, TrendingUp, TrendingDown, Minus, PlusCircle } from 'lucide-react';
import { useBurnoutStore } from '../stores/burnoutStore';
import { DailyLogForm } from '../components/burnout/DailyLogForm';
import { LogHistory } from '../components/burnout/LogHistory';
import { MetricChart } from '../components/burnout/MetricChart';
import { InsightCard } from '../components/burnout/InsightCard';

export function BurnoutPage() {
  const { metrics, updateMetric, getTrend } = useBurnoutStore();
  const [showLogForm, setShowLogForm] = useState(false);
  
  const getTrendIcon = (id: string) => {
    const trend = getTrend(id, 7);
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return Brain;
      case 'Activity':
        return Activity;
      case 'Sun':
        return Sun;
      case 'Battery':
        return Battery;
      default:
        return Brain;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Burnout Management</h1>
          <p className="mt-2 text-gray-600">
            Monitor and manage your energy levels to prevent burnout
          </p>
        </div>
        <button
          onClick={() => setShowLogForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="h-4 w-4" />
          New Log Entry
        </button>
      </header>

      <div className="mb-8">
        <InsightCard />
      </div>

      {/* Energy Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map((metric) => {
          const IconComponent = getIconComponent(metric.icon);
          return (
            <div
              key={metric.id}
              className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
              onClick={() => {
                const newValue = prompt('Enter new value (0-100):', metric.value.toString());
                if (newValue && !isNaN(+newValue)) {
                  updateMetric(metric.id, Math.min(100, Math.max(0, +newValue)));
                }
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <IconComponent className={`h-8 w-8 text-${metric.color}-600`} />
                <div className="flex items-center gap-2">
                  <span className={`text-${metric.color}-600 font-medium`}>
                    {metric.value}%
                  </span>
                  {getTrendIcon(metric.id)}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{metric.label}</h3>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-${metric.color}-600 rounded-full h-2 transition-all duration-500`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {metrics.map(metric => (
          <MetricChart key={metric.id} metricId={metric.id} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button className="flex items-center justify-center gap-2 p-3 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
            <Coffee className="h-5 w-5" />
            Take a Break
          </button>
          <button className="flex items-center justify-center gap-2 p-3 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Activity className="h-5 w-5" />
            Quick Exercise
          </button>
          <button className="flex items-center justify-center gap-2 p-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Brain className="h-5 w-5" />
            Mindful Moment
          </button>
        </div>
      </div>

      {/* Add Log History before Daily Tips */}
      <div className="mb-8">
        <LogHistory />
      </div>

      {/* Daily Tips */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Wellness Tips</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <Sun className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Morning Routine</h4>
              <p className="text-gray-600">Start your day with 10 minutes of mindfulness or light stretching</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Battery className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Energy Management</h4>
              <p className="text-gray-600">Take regular breaks using the Pomodoro Technique (25 min work, 5 min rest)</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Brain className="h-5 w-5 text-indigo-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Mental Clarity</h4>
              <p className="text-gray-600">Practice task batching to reduce mental context switching</p>
            </div>
          </li>
        </ul>
      </div>

      {showLogForm && <DailyLogForm onClose={() => setShowLogForm(false)} />}
    </div>
  );
} 