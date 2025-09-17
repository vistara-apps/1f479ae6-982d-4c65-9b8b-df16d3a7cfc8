import { cn } from '@/lib/utils';
import { CardProps } from '@/lib/types';

export function Card({ 
  variant = 'default', 
  className = '', 
  children,
  style
}: CardProps) {
  const baseStyles = 'rounded-xl p-6 shadow-card border transition-all duration-200';
  
  const variants = {
    default: 'bg-surface border-gray-700/50',
    highlight: 'bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20',
    warning: 'bg-warning/10 border-warning/20',
    danger: 'bg-danger/10 border-danger/20',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} style={style}>
      {children}
    </div>
  );
}
