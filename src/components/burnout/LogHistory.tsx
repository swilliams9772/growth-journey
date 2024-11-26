import { useMemo } from 'react';
import { format } from 'date-fns';
import { useBurnoutStore } from '../../stores/burnoutStore';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function LogHistory() {
  const { dailyLogs, metrics } = useBurnoutStore();

  const sortedLogs = useMemo(() => {
    return [...dailyLogs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7); // Show last 7 days
  }, [dailyLogs]);

  const getTrendIcon = (current: number, previous: number) => {
    const difference = current - previous;
    if (difference > 5) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (difference < -5) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent History</h2>
      <div className="space-y-4">
        {sortedLogs.map((log, index) => (
          <div key={log.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">
                {format(new Date(log.date), 'MMM d, yyyy')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium text-${metric.color}-600`}>
                      {log.metrics[metric.id]}%
                    </span>
                    {index < sortedLogs.length - 1 && 
                      getTrendIcon(
                        log.metrics[metric.id],
                        sortedLogs[index + 1].metrics[metric.id]
                      )}
                  </div>
                </div>
              ))}
            </div>
            {log.notes && (
              <p className="text-sm text-gray-600 mt-2">{log.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 