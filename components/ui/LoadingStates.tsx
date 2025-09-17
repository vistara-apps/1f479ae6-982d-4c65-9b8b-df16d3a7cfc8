import { Card } from './Card';
import { SkeletonCard, SkeletonStat, SkeletonText, SkeletonAvatar } from './Skeleton';

export function DashboardLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section Loading */}
      <Card variant="highlight" className="text-center space-y-4">
        <div className="space-y-2">
          <div className="h-8 bg-gray-700 rounded-lg w-48 mx-auto loading-shimmer" />
          <div className="h-4 bg-gray-700 rounded w-64 mx-auto loading-shimmer" />
        </div>
        <div className="h-12 bg-gray-700 rounded-lg w-40 mx-auto loading-shimmer" />
      </Card>

      {/* Stats Grid Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <SkeletonStat />
          </Card>
        ))}
      </div>

      {/* Position Overview Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export function WalletConnectionLoading() {
  return (
    <Card className="text-center space-y-4 animate-scale-in">
      <div className="flex items-center justify-center">
        <SkeletonAvatar size="lg" />
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-gray-700 rounded w-32 mx-auto loading-shimmer" />
        <div className="h-4 bg-gray-700 rounded w-48 mx-auto loading-shimmer" />
      </div>
      <div className="h-12 bg-gray-700 rounded-lg w-full loading-shimmer" />
    </Card>
  );
}

export function StatDisplayLoading() {
  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="h-3 bg-gray-700 rounded w-20 loading-shimmer" />
        <div className="h-3 bg-gray-700 rounded w-12 loading-shimmer" />
      </div>
      <div className="h-6 bg-gray-700 rounded w-24 loading-shimmer" />
    </div>
  );
}

export function AlertBannerLoading() {
  return (
    <div className="rounded-lg p-4 border bg-surface animate-slide-up" style={{ borderColor: 'hsl(var(--border))' }}>
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 bg-gray-700 rounded flex-shrink-0 mt-0.5 loading-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-32 loading-shimmer" />
          <div className="h-3 bg-gray-700 rounded w-full loading-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function QuickActionsLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="space-y-4">
        <div className="h-8 bg-gray-700 rounded w-48 loading-shimmer" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-bg/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg loading-shimmer" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-24 loading-shimmer" />
                </div>
              </div>
              <div className="h-3 bg-gray-700 rounded w-full loading-shimmer" />
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        <div className="h-8 bg-gray-700 rounded w-32 loading-shimmer" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PositionItemLoading() {
  return (
    <div className="flex items-center justify-between p-3 bg-bg rounded-lg animate-fade-in">
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="sm" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-24 loading-shimmer" />
          <div className="h-3 bg-gray-700 rounded w-16 loading-shimmer" />
        </div>
      </div>
      <div className="text-right space-y-2">
        <div className="h-4 bg-gray-700 rounded w-16 loading-shimmer" />
        <div className="h-3 bg-gray-700 rounded w-12 loading-shimmer" />
      </div>
    </div>
  );
}