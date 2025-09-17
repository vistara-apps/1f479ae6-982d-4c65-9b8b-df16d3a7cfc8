'use client';

import { Card } from '@/components/ui/Card';
import { StatDisplay } from '@/components/ui/StatDisplay';
import { AlertBanner } from '@/components/ui/AlertBanner';
import { TrendingUp, Shield, DollarSign, Gift } from 'lucide-react';

export function DashboardOverview() {
  // Mock data - in real app, this would come from API/blockchain
  const stats = [
    {
      label: 'Total Collateral',
      value: 12500,
      change: 5.2,
      format: 'currency' as const,
      trend: 'up' as const,
    },
    {
      label: 'Borrowed GHO',
      value: 8750,
      change: -2.1,
      format: 'currency' as const,
      trend: 'down' as const,
    },
    {
      label: 'Health Factor',
      value: 2.45,
      change: 8.3,
      format: 'number' as const,
      trend: 'up' as const,
    },
    {
      label: 'Available Rewards',
      value: 125.50,
      change: 12.5,
      format: 'currency' as const,
      trend: 'up' as const,
    },
  ];

  const alerts = [
    {
      variant: 'warning' as const,
      title: 'Market Volatility Alert',
      message: 'AVAX price has dropped 5% in the last hour. Monitor your positions closely.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {alerts.map((alert, index) => (
        <AlertBanner
          key={index}
          variant={alert.variant}
          title={alert.title}
          message={alert.message}
          dismissible
        />
      ))}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <StatDisplay
              label={stat.label}
              value={stat.value}
              change={stat.change}
              format={stat.format}
              trend={stat.trend}
            />
          </Card>
        ))}
      </div>

      {/* Position Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-heading2 text-text-primary">Active Positions</h3>
                <p className="text-small text-text-secondary">Your current lending positions</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <div>
                    <div className="text-text-primary font-medium">AVAX Collateral</div>
                    <div className="text-small text-text-secondary">125.5 AVAX</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-text-primary font-medium">$12,500</div>
                  <div className="text-small text-success">+5.2%</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    G
                  </div>
                  <div>
                    <div className="text-text-primary font-medium">GHO Borrowed</div>
                    <div className="text-small text-text-secondary">8,750 GHO</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-text-primary font-medium">$8,750</div>
                  <div className="text-small text-danger">-2.1%</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-heading2 text-text-primary">Recent Activity</h3>
                <p className="text-small text-text-secondary">Your latest transactions</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div>
                    <div className="text-text-primary font-medium">Borrowed GHO</div>
                    <div className="text-small text-text-secondary">2 hours ago</div>
                  </div>
                </div>
                <div className="text-text-primary font-medium">+2,500 GHO</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <div className="text-text-primary font-medium">Deposited AVAX</div>
                    <div className="text-small text-text-secondary">1 day ago</div>
                  </div>
                </div>
                <div className="text-text-primary font-medium">+50 AVAX</div>
              </div>

              <div className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div>
                    <div className="text-text-primary font-medium">Claimed Rewards</div>
                    <div className="text-small text-text-secondary">3 days ago</div>
                  </div>
                </div>
                <div className="text-text-primary font-medium">+25.5 GHO</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
