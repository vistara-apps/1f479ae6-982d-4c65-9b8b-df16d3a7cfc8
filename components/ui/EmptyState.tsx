import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Card } from './Card';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn('text-center py-12', className)}>
      <div className="space-y-4 animate-fade-in">
        {Icon && (
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-700/20 rounded-full flex items-center justify-center">
              <Icon className="w-8 h-8 text-text-secondary" />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="text-heading2 text-text-primary font-semibold">
            {title}
          </h3>
          <p className="text-text-secondary max-w-md mx-auto">
            {description}
          </p>
        </div>
        
        {action && (
          <Button onClick={action.onClick} className="mt-4">
            {action.label}
          </Button>
        )}
      </div>
    </Card>
  );
}

// Specific empty state components
export function NoPositionsEmpty({ onConnect }: { onConnect: () => void }) {
  return (
    <EmptyState
      title="No Positions Found"
      description="You don't have any active positions yet. Connect your wallet and start borrowing GHO to see your positions here."
      action={{
        label: 'Connect Wallet',
        onClick: onConnect,
      }}
    />
  );
}

export function NoAlertsEmpty() {
  return (
    <EmptyState
      title="No Alerts"
      description="You're all caught up! We'll notify you here when there are important updates about your positions or the market."
    />
  );
}

export function NoTransactionsEmpty() {
  return (
    <EmptyState
      title="No Transactions"
      description="Your transaction history will appear here once you start interacting with the protocol."
    />
  );
}

export function NoRewardsEmpty() {
  return (
    <EmptyState
      title="No Rewards Available"
      description="Keep using GHO Guardian to earn rewards. Your claimable rewards will appear here when available."
    />
  );
}

export function SearchEmpty({ query }: { query: string }) {
  return (
    <EmptyState
      title="No Results Found"
      description={`We couldn't find anything matching "${query}". Try adjusting your search terms.`}
    />
  );
}

export function ErrorState({ 
  title = "Something went wrong",
  description = "We encountered an error while loading this content. Please try again.",
  onRetry 
}: { 
  title?: string; 
  description?: string; 
  onRetry?: () => void; 
}) {
  return (
    <Card className="text-center py-12 border-destructive/20 bg-destructive/5">
      <div className="space-y-4 animate-fade-in">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-heading2 text-text-primary font-semibold">
            {title}
          </h3>
          <p className="text-text-secondary max-w-md mx-auto">
            {description}
          </p>
        </div>
        
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}