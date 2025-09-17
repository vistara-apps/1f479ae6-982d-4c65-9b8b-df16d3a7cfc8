'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertBanner } from '@/components/ui/AlertBanner';
import { StatDisplay } from '@/components/ui/StatDisplay';
import { EmptyState, ErrorState, NoPositionsEmpty } from '@/components/ui/EmptyState';
import { DashboardLoading, WalletConnectionLoading } from '@/components/ui/LoadingStates';
import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton';
import { Wallet, TrendingUp, Shield, Gift } from 'lucide-react';

export default function DemoPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-heading1 text-gradient mb-2">UI/UX Improvements Demo</h1>
          <p className="text-text-secondary">
            Showcasing all the enhanced components and interactions
          </p>
        </div>

        {/* Button Variations */}
        <Card className="animate-slide-up">
          <h2 className="text-heading2 text-text-primary mb-4">Enhanced Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" loading>Loading...</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </Card>

        {/* Alert Banners */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-heading2 text-text-primary mb-4">Alert System</h2>
          <div className="space-y-4">
            <AlertBanner
              variant="warning"
              title="Market Volatility Alert"
              message="AVAX price has dropped 5% in the last hour. Monitor your positions closely."
              dismissible
            />
            <AlertBanner
              variant="success"
              title="Transaction Confirmed"
              message="Your GHO borrow transaction has been successfully processed."
              dismissible
            />
            <AlertBanner
              variant="danger"
              title="Liquidation Risk"
              message="Your position health factor is below 1.5. Consider adding more collateral."
              dismissible
            />
          </div>
        </Card>

        {/* Stats Display */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-heading2 text-text-primary mb-4">Enhanced Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatDisplay
              label="Total Value Locked"
              value={125000}
              change={5.2}
              format="currency"
              trend="up"
            />
            <StatDisplay
              label="Health Factor"
              value={2.45}
              change={-2.1}
              format="number"
              trend="down"
            />
            <StatDisplay
              label="APY"
              value={8.5}
              change={12.5}
              format="percentage"
              trend="up"
            />
          </div>
        </Card>

        {/* Loading States */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-heading2 text-text-primary mb-4">Loading States</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-heading3 text-text-primary mb-2">Skeleton Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SkeletonCard />
                <div className="space-y-4 p-4 bg-surface rounded-lg">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-heading3 text-text-primary mb-2">Component Loading</h3>
              <WalletConnectionLoading />
            </div>
          </div>
        </Card>

        {/* Empty States */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-heading2 text-text-primary mb-4">Empty & Error States</h2>
          <div className="space-y-6">
            <EmptyState
              icon={Wallet}
              title="No Wallet Connected"
              description="Connect your wallet to start managing your GHO positions and earn rewards."
              action={{
                label: "Connect Wallet",
                onClick: () => alert("Wallet connection demo")
              }}
            />
            <ErrorState
              title="Connection Failed"
              description="Unable to connect to the network. Please check your internet connection and try again."
              onRetry={() => alert("Retry demo")}
            />
          </div>
        </Card>

        {/* Micro-interactions */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-heading2 text-text-primary mb-4">Micro-interactions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-200 active:scale-95 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">Hover Effect</h3>
                  <p className="text-text-secondary text-sm">Smooth scaling</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 bg-accent/10 rounded-lg hover:bg-accent/20 transition-all duration-200 active:scale-95 animate-glow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">Glow Animation</h3>
                  <p className="text-text-secondary text-sm">Subtle pulse effect</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 bg-success/10 rounded-lg hover:bg-success/20 transition-all duration-200 active:scale-95 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">Shadow Lift</h3>
                  <p className="text-text-secondary text-sm">Elevation on hover</p>
                </div>
              </div>
            </button>
          </div>
        </Card>

        {/* Color System */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-heading2 text-text-primary mb-4">Enhanced Color System</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-text-secondary">Primary</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-text-secondary">Accent</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-text-secondary">Success</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warning rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-text-secondary">Warning</p>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-heading2 text-text-primary mb-4">Typography Scale</h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-heading1 text-text-primary">Heading 1 - Main titles</h1>
              <h2 className="text-heading2 text-text-primary">Heading 2 - Section titles</h2>
              <h3 className="text-heading3 text-text-primary">Heading 3 - Subsections</h3>
            </div>
            <div className="space-y-2">
              <p className="text-xl text-text-primary">Extra large body text</p>
              <p className="text-lg text-text-primary">Large body text</p>
              <p className="text-base text-text-primary">Regular body text</p>
              <p className="text-small text-text-secondary">Small supporting text</p>
            </div>
            <div>
              <p className="text-gradient text-xl font-bold">Gradient text effect</p>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}