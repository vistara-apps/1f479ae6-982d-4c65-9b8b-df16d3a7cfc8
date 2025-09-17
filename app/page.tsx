import { AppShell } from '@/components/layout/AppShell';
import { WalletConnection } from '@/components/features/WalletConnection';
import { DashboardOverview } from '@/components/features/DashboardOverview';
import { QuickActions } from '@/components/features/QuickActions';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Section with Wallet Connection */}
        <section className="gradient-bg rounded-xl p-6 text-center space-y-4 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-heading1 text-gradient animate-glow">GHO Guardian</h1>
            <p className="text-text-secondary">
              Navigate Aave GHO with confidence
            </p>
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <WalletConnection />
          </div>
        </section>

        {/* Dashboard Overview */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <DashboardOverview />
        </div>

        {/* Quick Actions */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <QuickActions />
        </div>
      </div>
    </AppShell>
  );
}
