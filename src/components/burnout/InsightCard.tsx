import { Brain, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { useBurnoutStore } from '../../stores/burnoutStore';

export function InsightCard() {
  const { metrics, getAverageMetric, getTrend } = useBurnoutStore();

  const getInsightMessage = () => {
    const lowestMetric = metrics.reduce((prev, curr) => {
      const prevAvg = getAverageMetric(prev.id, 7);
      const currAvg = getAverageMetric(curr.id, 7);
      return prevAvg < currAvg ? prev : curr;
    });

    const trend = getTrend(lowestMetric.id, 7);
    const average = getAverageMetric(lowestMetric.id, 7);

    if (average < 50) {
      return {
        title: `Low ${lowestMetric.label}`,
        message: `Your ${lowestMetric.label.toLowerCase()} has been consistently low. Consider taking a break or adjusting your workload.`,
        icon: AlertTriangle,
        color: 'red'
      };
    }

    if (trend === 'declining') {
      return {
        title: `Declining ${lowestMetric.label}`,
        message: `Your ${lowestMetric.label.toLowerCase()} is showing a downward trend. Try implementing some recovery strategies.`,
        icon: TrendingDown,
        color: 'yellow'
      };
    }

    return {
      title: 'Maintaining Balance',
      message: 'Your energy levels are generally stable. Keep up the good work!',
      icon: Brain,
      color: 'green'
    };
  };

  const insight = getInsightMessage();
  const Icon = insight.icon;

  return (
    <div className={`bg-${insight.color}-50 rounded-lg p-6`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full bg-${insight.color}-100`}>
          <Icon className={`h-6 w-6 text-${insight.color}-600`} />
        </div>
        <div>
          <h3 className={`text-lg font-semibold text-${insight.color}-900 mb-1`}>
            {insight.title}
          </h3>
          <p className={`text-${insight.color}-700`}>{insight.message}</p>
        </div>
      </div>
    </div>
  );
} 