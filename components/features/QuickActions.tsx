'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PaymentFlow } from './PaymentFlow';
import { 
  ShoppingCart, 
  Gift, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Users,
  ArrowRight,
  CreditCard
} from 'lucide-react';

export function QuickActions() {
  const [showPaymentDemo, setShowPaymentDemo] = useState(false);
  
  const actions = [
    {
      title: 'Shop with GHO',
      description: 'Spend your GHO at partner merchants',
      icon: ShoppingCart,
      color: 'bg-green-500',
      href: '/spend',
    },
    {
      title: 'GHO Rewards',
      description: 'Earn rewards on your GHO usage',
      icon: Gift,
      color: 'bg-yellow-500',
      href: '/rewards',
    },
    {
      title: 'x402 Payment Demo',
      description: 'Test x402 payment flow with USDC',
      icon: CreditCard,
      color: 'bg-blue-500',
      action: () => setShowPaymentDemo(true),
    },
  ];

  const features = [
    {
      title: 'Guided Borrowing',
      description: 'Get intelligent suggestions for optimal borrowing strategies',
      icon: Shield,
      action: 'Start Borrowing',
    },
    {
      title: 'Simulation Mode',
      description: 'Test different scenarios before making real transactions',
      icon: TrendingUp,
      action: 'Run Simulation',
    },
    {
      title: 'Liquidation Protection',
      description: 'Get alerts before your positions are at risk',
      icon: Shield,
      action: 'Setup Alerts',
    },
    {
      title: 'Referral Program',
      description: 'Invite friends and earn rewards together',
      icon: Users,
      action: 'Get Referral Link',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Link our for GHO Section */}
      <Card className="bg-gradient-to-r from-surface to-surface/50">
        <div className="space-y-4">
          <h2 className="text-heading1 text-text-primary">Link our for GHO</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((action, index) => (
              <div
                key={index}
                className="bg-bg/50 rounded-lg p-4 hover:bg-bg/70 transition-colors duration-200 cursor-pointer group"
                onClick={() => {
                  if (action.action) {
                    action.action();
                  } else if (action.href) {
                    window.location.href = action.href;
                  }
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-text-primary font-semibold">{action.title}</h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors duration-200" />
                </div>
                <p className="text-small text-text-secondary">{action.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Core Features */}
      <div className="space-y-4">
        <h2 className="text-heading1 text-text-primary">Core Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-heading2 text-text-primary">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                {feature.action}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Subscription CTA */}
      <Card variant="highlight" className="text-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-heading1 text-text-primary">Upgrade to Pro</h3>
          <p className="text-text-secondary">
            Get unlimited simulations, advanced analytics, and priority alerts
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-small text-text-secondary">Free</div>
            <div className="text-heading2 text-text-primary">$0/mo</div>
          </div>
          <ArrowRight className="w-5 h-5 text-text-secondary" />
          <div className="text-center">
            <div className="text-small text-text-secondary">Pro</div>
            <div className="text-heading2 text-primary">$5/mo</div>
          </div>
          <ArrowRight className="w-5 h-5 text-text-secondary" />
          <div className="text-center">
            <div className="text-small text-text-secondary">Premium</div>
            <div className="text-heading2 text-accent">$15/mo</div>
          </div>
        </div>
        
        <Button size="lg" className="w-full md:w-auto">
          Upgrade Now
        </Button>
      </Card>

      {/* x402 Payment Demo Modal */}
      {showPaymentDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-heading1 text-text-primary">x402 Payment Demo</h2>
              <button
                onClick={() => setShowPaymentDemo(false)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            
            <PaymentFlow
              amount="10.50"
              recipient="0x742d35Cc6634C0532925a3b8D4C9db96590c6C8B"
              description="Test x402 payment flow with USDC on Base"
              onSuccess={(payment) => {
                console.log('Payment successful:', payment);
              }}
              onError={(error) => {
                console.error('Payment failed:', error);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
