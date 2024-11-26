import { useMemo } from 'react';
import { Line, Activity, TrendingUp } from 'lucide-react';
import { useBurnoutStore } from '../../stores/burnoutStore';
import { format, subDays } from 'date-fns';

interface MetricChartProps {
  metricId: string;
  days?: number;
}

export function MetricChart({ metricId, days = 7 }: MetricChartProps) {
  const { dailyLogs, metrics, getAverageMetric } = useBurnoutStore();
  const metric = metrics.find(m => m.id === metricId);
  
  const chartData = useMemo(() => {
    const now = new Date();
    const data = new Array(days).fill(null).map((_, index) => {
      const date = subDays(now, days - 1 - index);
      const log = dailyLogs.find(l => 
        format(new Date(l.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      return {
        date,
        value: log?.metrics[metricId] || null
      };
    });
    return data;
  }, [dailyLogs, metricId, days]);

  const average = getAverageMetric(metricId, days);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Activity className={`h-5 w-5 text-${metric?.color}-600`} />
          <h3 className="font-semibold text-gray-900">{metric?.label} Trend</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="h-4 w-4" />
          <span>Avg: {average.toFixed(1)}%</span>
        </div>
      </div>

      <div className="relative h-40">
        <div className="absolute inset-0 flex items-end justify-between">
          {chartData.map((point, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              {point.value !== null && (
                <div 
                  className={`w-2 rounded-t bg-${metric?.color}-600 transition-all duration-300`}
                  style={{ height: `${point.value}%` }}
                />
              )}
              <span className="text-xs text-gray-500 mt-2">
                {format(point.date, 'MM/dd')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 