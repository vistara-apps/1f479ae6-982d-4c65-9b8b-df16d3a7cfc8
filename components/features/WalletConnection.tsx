'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Wallet, User, Copy, ExternalLink } from 'lucide-react';
import { formatAddress, copyToClipboard } from '@/lib/utils';

export function WalletConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('500');

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setAddress('0x742d35Cc6634C0532925a3b8D4C9db96590c6C8B');
      setIsConnecting(false);
    }, 2000);
  };

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(address);
    if (success) {
      // Could show a toast notification here
      console.log('Address copied to clipboard');
    }
  };

  if (isConnected) {
    return (
      <Card variant="highlight" className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-heading2 text-text-primary">Wallet Connected</h3>
          <div className="flex items-center justify-center gap-2 text-text-secondary">
            <span className="text-sm">{formatAddress(address)}</span>
            <button
              onClick={handleCopyAddress}
              className="p-1 hover:bg-white/10 rounded transition-colors duration-200"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-white/10 rounded transition-colors duration-200">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-4">
          <div className="text-small text-text-secondary">GHO Balance</div>
          <div className="text-heading1 text-text-primary font-bold">{balance} GHO</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="text-center space-y-4">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center border border-gray-700">
          <Wallet className="w-8 h-8 text-text-secondary" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-heading2 text-text-primary">Connect Wallet</h3>
        <p className="text-text-secondary">
          Connect your wallet to start managing your GHO positions
        </p>
      </div>

      <Button
        onClick={handleConnect}
        loading={isConnecting}
        className="w-full"
        size="lg"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    </Card>
  );
}
