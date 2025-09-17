import { AppShell } from '@/components/layout/AppShell';
import { WalletConnection } from '@/components/features/WalletConnection';
import { DashboardOverview } from '@/components/features/DashboardOverview';
import { QuickActions } from '@/components/features/QuickActions';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Section with Wallet Connection */}
        <section className="gradient-bg rounded-xl p-6 text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-heading1 text-gradient">GHO Guardian</h1>
            <p className="text-text-secondary">
              Navigate Aave GHO with confidence
            </p>
          </div>
          <WalletConnection />
        </section>

        {/* Dashboard Overview */}
        <DashboardOverview />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </AppShell>
  );
}
