'use client';

import { useState, useEffect } from 'react';
import { useWalletClient, useAccount } from 'wagmi';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  CreditCard, 
  Check, 
  AlertCircle, 
  Loader2, 
  DollarSign,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { PaymentService, PaymentRequest, PaymentResponse, PaymentError } from '@/lib/payment';

interface PaymentFlowProps {
  amount: string;
  recipient: string;
  description?: string;
  onSuccess?: (payment: PaymentResponse) => void;
  onError?: (error: PaymentError) => void;
}

export function PaymentFlow({ 
  amount, 
  recipient, 
  description, 
  onSuccess, 
  onError 
}: PaymentFlowProps) {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const [paymentService] = useState(() => new PaymentService());
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'confirming' | 'success' | 'error'>('idle');
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
  const [error, setError] = useState<PaymentError | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string>('0.00');
  const [gasFee, setGasFee] = useState<string>('0.001');
  const [transactionHash, setTransactionHash] = useState<string>('');

  // Update payment service when wallet client changes
  useEffect(() => {
    if (walletClient) {
      paymentService.setWalletClient(walletClient);
    }
  }, [walletClient, paymentService]);

  // Load USDC balance and estimate gas
  useEffect(() => {
    if (address && walletClient) {
      loadPaymentInfo();
    }
  }, [address, walletClient]);

  const loadPaymentInfo = async () => {
    if (!address || !walletClient) return;

    try {
      const [balance, fee] = await Promise.all([
        paymentService.getUSDCBalance(address),
        paymentService.estimateGasFee({ amount, recipient, description })
      ]);
      
      setUsdcBalance(balance);
      setGasFee(fee);
    } catch (error) {
      console.error('Failed to load payment info:', error);
    }
  };

  const handlePayment = async () => {
    if (!walletClient || !address) return;

    setPaymentState('processing');
    setError(null);

    try {
      const paymentRequest: PaymentRequest = {
        amount,
        recipient,
        description,
        metadata: {
          timestamp: Date.now(),
          userAddress: address,
        },
      };

      const paymentResponse = await paymentService.initializePayment(paymentRequest);
      setPayment(paymentResponse);
      setTransactionHash(paymentResponse.transactionHash);
      setPaymentState('confirming');

      // Poll for confirmation
      const checkStatus = async () => {
        try {
          const status = await paymentService.checkPaymentStatus(paymentResponse.transactionHash);
          
          if (status.status === 'confirmed') {
            setPaymentState('success');
            setPayment(status);
            onSuccess?.(status);
          } else if (status.status === 'failed') {
            throw new PaymentError('TRANSACTION_FAILED', 'Transaction failed on blockchain');
          } else {
            // Still pending, check again
            setTimeout(checkStatus, 3000);
          }
        } catch (error) {
          console.error('Status check failed:', error);
          setPaymentState('error');
          const paymentError = error instanceof PaymentError 
            ? error 
            : new PaymentError('STATUS_CHECK_FAILED', 'Failed to check transaction status');
          setError(paymentError);
          onError?.(paymentError);
        }
      };

      // Start status checking after a short delay
      setTimeout(checkStatus, 2000);

    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentState('error');
      const paymentError = error instanceof PaymentError 
        ? error 
        : new PaymentError('PAYMENT_FAILED', 'Payment initialization failed');
      setError(paymentError);
      onError?.(paymentError);
    }
  };

  const resetPayment = () => {
    setPaymentState('idle');
    setPayment(null);
    setError(null);
    setTransactionHash('');
  };

  if (!isConnected) {
    return (
      <Card className="text-center space-y-4">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto">
          <CreditCard className="w-8 h-8 text-text-secondary" />
        </div>
        <div>
          <h3 className="text-heading2 text-text-primary">Connect Wallet</h3>
          <p className="text-text-secondary">Please connect your wallet to make payments</p>
        </div>
      </Card>
    );
  }

  if (paymentState === 'success' && payment) {
    return (
      <Card variant="highlight" className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-heading2 text-text-primary">Payment Successful!</h3>
          <p className="text-text-secondary">
            {description || 'Your payment has been processed successfully'}
          </p>
        </div>

        <div className="bg-black/20 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-text-secondary">Amount:</span>
            <span className="text-text-primary font-semibold">${amount} USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Recipient:</span>
            <span className="text-text-primary font-mono text-sm">
              {recipient.slice(0, 6)}...{recipient.slice(-4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Status:</span>
            <span className="text-green-400 font-semibold">Confirmed</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetPayment}
            className="flex-1"
          >
            New Payment
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(`https://basescan.org/tx/${payment.transactionHash}`, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View
          </Button>
        </div>
      </Card>
    );
  }

  if (paymentState === 'error' && error) {
    return (
      <Card variant="danger" className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-heading2 text-text-primary">Payment Failed</h3>
          <p className="text-text-secondary">{error.message}</p>
          {error.code && (
            <p className="text-xs text-text-secondary opacity-70">
              Error Code: {error.code}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetPayment}
            className="flex-1"
          >
            Try Again
          </Button>
          {transactionHash && (
            <Button
              variant="outline"
              onClick={() => window.open(`https://basescan.org/tx/${transactionHash}`, '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (paymentState === 'confirming') {
    return (
      <Card variant="highlight" className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-heading2 text-text-primary">Confirming Payment</h3>
          <p className="text-text-secondary">
            Waiting for blockchain confirmation...
          </p>
        </div>

        <div className="bg-black/20 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Transaction:</span>
            <button
              onClick={() => window.open(`https://basescan.org/tx/${transactionHash}`, '_blank')}
              className="text-primary hover:text-accent transition-colors duration-200 flex items-center gap-1"
            >
              <span className="font-mono text-sm">
                {transactionHash.slice(0, 8)}...{transactionHash.slice(-6)}
              </span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="text-xs text-text-secondary">
          This may take a few moments to confirm on the Base network
        </div>
      </Card>
    );
  }

  // Default payment form
  const hasInsufficientBalance = parseFloat(usdcBalance) < parseFloat(amount);

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-heading2 text-text-primary">Payment Details</h3>
          <p className="text-text-secondary">{description || 'USDC Payment'}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-surface rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Amount:</span>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-heading2 text-text-primary font-bold">${amount}</span>
              <span className="text-text-secondary">USDC</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Recipient:</span>
            <span className="text-text-primary font-mono text-sm">
              {recipient.slice(0, 8)}...{recipient.slice(-8)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Network:</span>
            <span className="text-text-primary">Base</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Est. Gas Fee:</span>
            <span className="text-text-primary">~{gasFee} ETH</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Your USDC Balance:</span>
            <span className={`font-semibold ${hasInsufficientBalance ? 'text-red-400' : 'text-green-400'}`}>
              ${usdcBalance} USDC
            </span>
          </div>
          {hasInsufficientBalance && (
            <p className="text-red-400 text-sm mt-2">
              Insufficient USDC balance for this payment
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={paymentState === 'processing' || hasInsufficientBalance}
        loading={paymentState === 'processing'}
        className="w-full flex items-center gap-2"
        size="lg"
      >
        {paymentState === 'processing' ? (
          'Processing Payment...'
        ) : (
          <>
            Pay ${amount} USDC
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>

      {hasInsufficientBalance && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => window.open('https://app.uniswap.org/#/swap?outputCurrency=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&chain=base', '_blank')}
            className="flex items-center gap-2"
          >
            Get USDC on Base
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      )}
    </Card>
  );
}