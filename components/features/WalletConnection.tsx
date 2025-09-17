'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Wallet, User, Copy, ExternalLink } from 'lucide-react';
import { formatAddress, copyToClipboard } from '@/lib/utils';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { base } from 'wagmi/chains';

export function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
    chainId: base.id,
  });

  const handleConnect = async () => {
    const coinbaseConnector = connectors.find(connector => 
      connector.name.toLowerCase().includes('coinbase')
    );
    if (coinbaseConnector) {
      connect({ connector: coinbaseConnector });
    } else {
      // Fallback to first available connector
      connect({ connector: connectors[0] });
    }
  };

  const handleCopyAddress = async () => {
    if (address) {
      const success = await copyToClipboard(address);
      if (success) {
        // Could show a toast notification here
        console.log('Address copied to clipboard');
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (isConnected && address) {
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
            <button 
              onClick={() => window.open(`https://basescan.org/address/${address}`, '_blank')}
              className="p-1 hover:bg-white/10 rounded transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-4">
          <div className="text-small text-text-secondary">ETH Balance</div>
          <div className="text-heading1 text-text-primary font-bold">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
          </div>
        </div>

        <Button
          onClick={handleDisconnect}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Disconnect
        </Button>
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
        loading={isPending}
        className="w-full"
        size="lg"
      >
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    </Card>
  );
}
