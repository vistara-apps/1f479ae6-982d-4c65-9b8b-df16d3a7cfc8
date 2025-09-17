import { cn } from '@/lib/utils';
import { StatDisplayProps } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils';

export function StatDisplay({
  label,
  value,
  change,
  format = 'number',
  trend = 'neutral',
  className = '',
}: StatDisplayProps) {
  const formatValue = (val: string | number) => {
    const numValue = typeof val === 'string' ? parseFloat(val) : val;
    
    switch (format) {
      case 'currency':
        return formatCurrency(numValue);
      case 'percentage':
        return formatPercentage(numValue);
      default:
        return formatNumber(numValue);
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-danger" />;
      default:
        return <Minus className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-danger';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-small text-text-secondary">{label}</span>
        {change !== undefined && (
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={cn('text-small', getTrendColor())}>
              {change > 0 ? '+' : ''}{formatPercentage(change)}
            </span>
          </div>
        )}
      </div>
      <div className="text-heading2 text-text-primary font-bold">
        {formatValue(value)}
      </div>
    </div>
  );
}
