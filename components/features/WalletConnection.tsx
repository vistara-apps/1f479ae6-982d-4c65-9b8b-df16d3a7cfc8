'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { WalletConnectionLoading } from '@/components/ui/LoadingStates';
import { ErrorState } from '@/components/ui/EmptyState';
import { Wallet, User, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import { formatAddress, copyToClipboard } from '@/lib/utils';

export function WalletConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('500');
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    // Simulate wallet connection
    setTimeout(() => {
      // Simulate random connection failure
      if (Math.random() < 0.1) {
        setError('Failed to connect wallet. Please try again.');
        setIsConnecting(false);
        return;
      }
      
      setIsConnected(true);
      setAddress('0x742d35Cc6634C0532925a3b8D4C9db96590c6C8B');
      setIsConnecting(false);
    }, 2000);
  };

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(address);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleConnect();
  };

  // Show loading state
  if (isConnecting) {
    return <WalletConnectionLoading />;
  }

  // Show error state
  if (error) {
    return (
      <ErrorState
        title="Connection Failed"
        description={error}
        onRetry={handleRetry}
      />
    );
  }

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
            <span className="text-sm" aria-label={`Wallet address: ${address}`}>
              {formatAddress(address)}
            </span>
            <button
              onClick={handleCopyAddress}
              className="p-1 hover:bg-white/10 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={copySuccess ? "Address copied!" : "Copy wallet address"}
              title={copySuccess ? "Address copied!" : "Copy wallet address"}
            >
              <Copy className={`w-4 h-4 ${copySuccess ? 'text-success' : ''}`} />
            </button>
            <button 
              className="p-1 hover:bg-white/10 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="View on block explorer"
              title="View on block explorer"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          {copySuccess && (
            <p className="text-success text-sm animate-fade-in" role="status">
              Address copied to clipboard!
            </p>
          )}
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
